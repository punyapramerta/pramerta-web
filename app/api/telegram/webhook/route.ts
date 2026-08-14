import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { createServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import {
  sendTelegramMessage,
  sendTelegramChatAction,
  answerTelegramCallbackQuery,
  getAudienceKeyboard,
  getPurposeKeyboard,
  getAdminEditKeyboard,
} from "@/lib/telegram";

type TelegramSession = {
  chat_id: number;
  step: "idle" | "awaiting_topic" | "awaiting_audience" | "awaiting_purpose";
  data: {
    topic?: string;
    audience?: string;
    purpose?: string;
  };
};

async function getSession(chatId: number): Promise<TelegramSession> {
  if (!isSupabaseConfigured()) {
    return { chat_id: chatId, step: "idle", data: {} };
  }
  const supabase = createServerClient();
  const { data } = await supabase
    .from("telegram_sessions")
    .select("*")
    .eq("chat_id", chatId)
    .single();

  if (!data) {
    return { chat_id: chatId, step: "idle", data: {} };
  }
  return {
    chat_id: data.chat_id,
    step: data.step || "idle",
    data: data.data || {},
  };
}

async function setSession(chatId: number, step: TelegramSession["step"], sessionData: TelegramSession["data"]) {
  if (!isSupabaseConfigured()) return;
  const supabase = createServerClient();
  await supabase.from("telegram_sessions").upsert({
    chat_id: chatId,
    step,
    data: sessionData,
    updated_at: new Date().toISOString(),
  });
}

async function isUserAuthorized(userId: number): Promise<boolean> {
  // 1. Check static env whitelist if configured
  const allowedEnv = process.env.TELEGRAM_ALLOWED_USER_IDS;
  if (allowedEnv && allowedEnv.trim() !== "") {
    const ids = allowedEnv.split(",").map((id) => id.trim());
    if (ids.includes(userId.toString())) return true;
  }

  // 2. Check dynamic database authorization (telegram_users table)
  if (!isSupabaseConfigured()) return true;
  const supabase = createServerClient();
  const { data } = await supabase
    .from("telegram_users")
    .select("user_id")
    .eq("user_id", userId)
    .eq("is_active", true)
    .single();

  return !!data;
}

async function authorizeUserInDB(userId: number, username?: string, firstName?: string) {
  if (!isSupabaseConfigured()) return;
  const supabase = createServerClient();
  await supabase.from("telegram_users").upsert({
    user_id: userId,
    username: username || null,
    first_name: firstName || null,
    is_active: true,
  });
}

function getExpectedAdminPin(): string {
  return process.env.TELEGRAM_ADMIN_PIN || process.env.ADMIN_PASSWORD || "pramerta2026";
}

export async function POST(request: Request) {
  try {
    // 1. Verify Secret Token if configured
    const secretTokenHeader = request.headers.get("x-telegram-bot-api-secret-token");
    const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
    if (expectedSecret && secretTokenHeader !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized webhook secret" }, { status: 401 });
    }

    const update = await request.json();

    // Handle Callback Query (Inline Keyboard Buttons)
    if (update.callback_query) {
      const cb = update.callback_query;
      const chatId = cb.message?.chat?.id;
      const userId = cb.from?.id;
      const data = cb.data as string;

      if (chatId && userId) {
        await answerTelegramCallbackQuery(cb.id);

        const authorized = await isUserAuthorized(userId);
        if (!authorized) {
          await sendTelegramMessage(chatId, "🔐 *Akses Terproteksi:* Silakan masukkan PIN Admin terlebih dahulu.");
          return NextResponse.json({ ok: true });
        }

        const session = await getSession(chatId);

        if (data.startsWith("aud:")) {
          const audienceChoice = data.replace("aud:", "");
          const finalAudience = audienceChoice === "default" ? "B2B, Plant Manager, Engineer, Procurement" : audienceChoice;
          const updatedData = { ...session.data, audience: finalAudience };
          await setSession(chatId, "awaiting_purpose", updatedData);

          await sendTelegramMessage(
            chatId,
            `🎯 *Target Audiens:* ${finalAudience}\n\n*Langkah 3 dari 3:* Apa *Tujuan Utama Artikel* ini?\nPilih opsi dari tombol di bawah atau ketik tujuan khusus:`,
            { reply_markup: getPurposeKeyboard() }
          );
          return NextResponse.json({ ok: true });
        }

        if (data.startsWith("purp:")) {
          const purposeChoice = data.replace("purp:", "");
          const updatedData = { ...session.data, purpose: purposeChoice };
          await setSession(chatId, "idle", {});

          // Trigger generation
          await handleArticleGeneration(chatId, updatedData);
          return NextResponse.json({ ok: true });
        }
      }
      return NextResponse.json({ ok: true });
    }

    // Handle Normal Message
    const message = update.message;
    if (!message || !message.chat) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const userId = message.from?.id;
    const username = message.from?.username;
    const firstName = message.from?.first_name;
    const text = (message.text || "").trim();

    if (!userId) {
      return NextResponse.json({ ok: true });
    }

    // Check if User is Authorized
    const authorized = await isUserAuthorized(userId);

    if (!authorized) {
      // Check if user is attempting to log in with PIN
      const expectedPin = getExpectedAdminPin();
      const cleanInputPin = text.replace(/^\/login\s*/i, "").trim();

      if (cleanInputPin === expectedPin || text === expectedPin) {
        await authorizeUserInDB(userId, username, firstName);
        await sendTelegramMessage(
          chatId,
          `🎉 *Autentikasi Berhasil!*\n\nAkun Telegram Anda (*${firstName || "Admin"}*) telah sukses didaftarkan sebagai Admin Pramerta.\n\nKetik \`/buat\` untuk mulai membuat draf artikel baru!`
        );
        return NextResponse.json({ ok: true });
      }

      await sendTelegramMessage(
        chatId,
        `🔐 *Akses Terproteksi Bot Pramerta*\n\nSilakan masukkan **PIN / Kode Sandi Admin** untuk mengaktifkan akses akun Telegram Anda:\n\n_(Ketik PIN Admin Anda lalu kirimkan ke chat ini)_`
      );
      return NextResponse.json({ ok: true });
    }

    // User is Authorized — Process Commands
    if (text === "/start" || text === "/buat" || text === "/new") {
      await setSession(chatId, "awaiting_topic", {});
      await sendTelegramMessage(
        chatId,
        `👋 *Selamat Datang di Bot Generator Artikel Pramerta (PAS HVAC)*\n\nSaya akan memandu Anda membuat draf artikel blog berkualitas tinggi sesuai *Standard Penulisan Pramerta*.\n\n*Langkah 1 dari 3:*\nSilakan ketik *Topik atau Kata Kunci Utama* artikel yang ingin dibuat.\n_(Contoh: "Precision Air Conditioning untuk Data Center")_`
      );
      return NextResponse.json({ ok: true });
    }

    if (text === "/batal" || text === "/cancel") {
      await setSession(chatId, "idle", {});
      await sendTelegramMessage(chatId, "❌ *Proses dibatalkan.* Ketik `/buat` kapan saja untuk memulai kembali.");
      return NextResponse.json({ ok: true });
    }

    const session = await getSession(chatId);

    // Flow Step 1: Awaiting Topic
    if (session.step === "awaiting_topic") {
      if (!text) {
        await sendTelegramMessage(chatId, "⚠️ Mohon ketik kata kunci atau topik artikel.");
        return NextResponse.json({ ok: true });
      }

      const updatedData = { ...session.data, topic: text };
      await setSession(chatId, "awaiting_audience", updatedData);

      await sendTelegramMessage(
        chatId,
        `👍 *Topik dicatat:* "${text}"\n\n*Langkah 2 dari 3:* Siapa *Target Audiens* artikel ini?\nPilih opsi dari tombol di bawah atau ketik target audiens khusus:`,
        { reply_markup: getAudienceKeyboard() }
      );
      return NextResponse.json({ ok: true });
    }

    // Flow Step 2: Awaiting Audience (Typed text)
    if (session.step === "awaiting_audience") {
      const audienceInput = text || "B2B, Plant Manager, Engineer, Procurement";
      const updatedData = { ...session.data, audience: audienceInput };
      await setSession(chatId, "awaiting_purpose", updatedData);

      await sendTelegramMessage(
        chatId,
        `🎯 *Target Audiens:* ${audienceInput}\n\n*Langkah 3 dari 3:* Apa *Tujuan Utama Artikel* ini?\nPilih opsi dari tombol di bawah atau ketik tujuan khusus:`,
        { reply_markup: getPurposeKeyboard() }
      );
      return NextResponse.json({ ok: true });
    }

    // Flow Step 3: Awaiting Purpose (Typed text)
    if (session.step === "awaiting_purpose") {
      const purposeInput = text || "Edukasi & SEO";
      const updatedData = { ...session.data, purpose: purposeInput };
      await setSession(chatId, "idle", {});

      await handleArticleGeneration(chatId, updatedData);
      return NextResponse.json({ ok: true });
    }

    // Default reply if no active session
    await sendTelegramMessage(
      chatId,
      `🤖 *Bot Pramerta Artikel Generator*\n\nKetik \`/buat\` untuk memulai pembuatan draf artikel baru, atau ketik \`/batal\` untuk membatalkan.`
    );
    return NextResponse.json({ ok: true });

  } catch (error: any) {
    console.error("Telegram Webhook Error:", error);
    return NextResponse.json({ error: error.message || "Webhook processing error" }, { status: 500 });
  }
}

// ─── ARTICLE GENERATION HANDLER ──────────────────────────────

async function handleArticleGeneration(
  chatId: number,
  sessionData: { topic?: string; audience?: string; purpose?: string }
) {
  const { topic, audience, purpose } = sessionData;

  if (!topic) {
    await sendTelegramMessage(chatId, "❌ Terjadi kesalahan: Kata kunci/topik tidak ditemukan. Ketik `/buat` untuk ulang.");
    return;
  }

  await sendTelegramMessage(
    chatId,
    `⏳ *Sedang meracik draf artikel sesuai Standard Penulisan Pramerta...*\n\n⚙️ _Memproses via Gemini AI & menyimpan draf ke database Supabase... Mohon tunggu sebentar (sekitar 10-20 detik)._`
  );
  await sendTelegramChatAction(chatId, "typing");

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    await sendTelegramMessage(chatId, "❌ Error: GEMINI_API_KEY belum dikonfigurasi di server.");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          title: { type: SchemaType.STRING, description: "Judul artikel SEO friendly (H1)" },
          slug: { type: SchemaType.STRING, description: "URL slug dari judul, huruf kecil dipisah strip" },
          excerpt: { type: SchemaType.STRING, description: "Ringkasan pendek 2-3 kalimat" },
          metaTitle: { type: SchemaType.STRING, description: "Meta title optimal maksimal 60 karakter" },
          metaDesc: { type: SchemaType.STRING, description: "Meta description maksimal 160 karakter untuk CTR tinggi" },
          content: { type: SchemaType.STRING, description: "Konten lengkap artikel dalam format HTML semantik dengan Tailwind CSS" },
        },
        required: ["title", "slug", "excerpt", "metaTitle", "metaDesc", "content"],
      },
    },
  });

  const prompt = `
    Bertindaklah sebagai Senior SEO Content Writer & HVAC Engineer untuk PAS HVAC (PT. Pratama Amerta Solusi).
    Tulis artikel blog B2B HVAC profesional, edukatif, dan meyakinkan dalam bahasa Indonesia.

    Kata Kunci Utama: "${topic}"
    Target Audience: ${audience || "B2B, Plant Manager, Engineer, Procurement"}
    Tujuan Artikel: ${purpose || "Edukasi & SEO"}
    Tone of Voice: Profesional, informatif, B2B, meyakinkan, tetap mudah dipahami.

    KONTEKS PERUSAHAAN (PENTING! Selalu sisipkan secara natural):
    Nama Perusahaan: PAS HVAC (PT. Pratama Amerta Solusi).
    Keahlian: Kontraktor HVAC Industri (Cleanroom, Rumah Sakit, Data Center, Pabrik).
    Status: Authorized Distributor FRIMEC (AHU) & GREE (Chiller, VRF) di Indonesia.

    ATURAN STRUKTUR DAN TAILWIND CSS HTML (SANGAT PENTING):
    Keluarkan output HTML semantik murni (TANPA markdown backticks) dengan Tailwind CSS classes wajib berikut:
    1. Intro: <p class="text-xl font-medium text-neutral-700 mb-8 leading-relaxed">...</p>
    2. H2: <h2 class="text-2xl sm:text-3xl font-bold text-neutral-900 mt-12 mb-6">...</h2>
    3. H3: <h3 class="text-xl font-bold text-neutral-800 mt-8 mb-4">...</h3>
    4. Paragraf Biasa: <p class="mb-6 text-neutral-600 leading-relaxed">...</p>
    5. List Points: <ul class="list-disc pl-6 mb-8 space-y-3 text-neutral-600"><li>...</li></ul>
    6. Quote Block Engineer (Wajib selipkan 1 quote block):
       <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-8">
         <p class="text-blue-900 font-medium italic text-lg leading-relaxed">"..."</p>
         <p class="text-blue-600 text-sm font-bold mt-3">— Tim Engineer PAS HVAC</p>
       </div>

    ATURAN ISI ARTIKEL:
    - Paragraf pertama wajib "Direct Answer" (Bottom Line Up Front).
    - Panjang artikel minimal 1000 kata. Berbobot, sertakan standar/spesifikasi HVAC jika relevan.
    - Paragraf akhir berupa penutup persuasif yang mengajak pembaca konsultasi / site survey gratis dengan PAS HVAC.
  `;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  const articleData = JSON.parse(responseText);

  // Ensure unique slug
  let slug = articleData.slug || topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const supabase = createServerClient();

  // Check if slug exists
  const { data: existingPost } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("slug", slug)
    .single();

  if (existingPost) {
    slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
  }

  // Insert draft post to Supabase
  const newPostRow = {
    slug,
    title: articleData.title,
    category: "Edukasi",
    read_time: "5 Menit Baca",
    author: "Tim Engineer PAS HVAC",
    content: articleData.content,
    excerpt: articleData.excerpt,
    meta_title: articleData.metaTitle,
    meta_desc: articleData.metaDesc,
    target_keyword: topic,
    status: "draft",
    image_url: null, // Explicitly null per user instruction
    published_at: null,
  };

  const { error: dbError } = await supabase.from("blog_posts").insert(newPostRow);

  if (dbError) {
    console.error("Supabase Insert Error:", dbError);
    await sendTelegramMessage(chatId, `❌ Gagal menyimpan draf ke database: ${dbError.message}`);
    return;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://pramerta.com";
  const adminUrl = `${siteUrl}/admin`;

  const successMessage =
    `✅ *Draf Artikel Berhasil Dibuat!*\n\n` +
    `📌 *Judul:* ${articleData.title}\n` +
    `🔑 *Keyword Utama:* \`${topic}\` \n` +
    `📝 *Status:* Draft (Tersedia di Halaman Admin)\n\n` +
    `⚠️ *Peringatan / Catatan:*\n` +
    `Artikel ini telah disimpan sebagai draf. Sebelum di-publish, mohon **dicek ulang / dirapikan** dan **ditambahkan Gambar Cover (Featured Image)** di halaman Admin Web.\n\n` +
    `👇 *Klik tombol di bawah untuk langsung mengedit:*`;

  await sendTelegramMessage(chatId, successMessage, {
    reply_markup: getAdminEditKeyboard(adminUrl),
  });
}
