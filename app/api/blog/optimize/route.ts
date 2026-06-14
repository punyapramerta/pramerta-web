import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing in environment variables");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const body = await request.json();
    const { rawText, keyword, title } = body;

    if (!rawText) {
      return NextResponse.json({ error: "Raw text is required" }, { status: 400 });
    }
    if (!keyword) {
      return NextResponse.json({ error: "Keyword is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            title: { type: SchemaType.STRING, description: "Judul artikel SEO friendly (H1) berdasarkan teks mentah" },
            slug: { type: SchemaType.STRING, description: "URL slug dari judul, huruf kecil dipisah strip" },
            excerpt: { type: SchemaType.STRING, description: "Ringkasan pendek 2-3 kalimat dari artikel" },
            metaTitle: { type: SchemaType.STRING, description: "Meta title optimal maksimal 60 karakter" },
            metaDesc: { type: SchemaType.STRING, description: "Meta description maksimal 160 karakter untuk CTR tinggi" },
            content: { type: SchemaType.STRING, description: "Konten lengkap artikel dalam format HTML (gunakan <h2>, <h3>, <p>, <ul>). Harus mempertahankan esensi dari teks mentah asli namun lebih SEO Friendly." },
          },
          required: ["title", "slug", "excerpt", "metaTitle", "metaDesc", "content"],
        },
      },
    });

    const prompt = `
      Bertindaklah sebagai Senior SEO Content Editor & Copywriter.
      Tugas Anda adalah merapikan, memformat ulang, dan mengoptimalkan teks artikel mentah (copy-paste) menjadi artikel SEO HTML yang siap dipublish.
      
      Kata Kunci Utama: "${keyword}"
      Topik/Judul Preferensi: "${title || "Buatkan judul click-worthy berdasarkan keyword dan isi teks"}"
      
      TEKS MENTAH DARI USER:
      =======================
      ${rawText}
      =======================
      
      KONTEKS PERUSAHAAN (Sisipkan/Sempurnakan bila relevan):
      Nama Perusahaan: PAS HVAC (PT. Pratama Amerta Solusi).
      Keahlian: Kontraktor HVAC Industri (Cleanroom, Rumah Sakit, Data Center, Pabrik).
      Status: Authorized Distributor FRIMEC (AHU) & GREE (Chiller, VRF) di Indonesia.

      PANDUAN OPTIMASI & FORMATTING:
      1. Pertahankan esensi, informasi penting, dan pesan utama dari TEKS MENTAH di atas.
      2. Perbaiki tata bahasa, ejaan, dan buat alurnya lebih enak dibaca (engaging).
      3. Optimasi struktur dengan menyisipkan "Kata Kunci Utama" secara natural (tidak spam).
      4. Format Content wajib menggunakan tag HTML semantik DENGAN TAILWIND CSS:
         - HANYA kembalikan HTML murni TANPA markdown backticks (\`\`\`html ... \`\`\`).
         - Paragraf intro: <p class="text-xl font-medium text-neutral-700 mb-8 leading-relaxed">
         - Subjudul H2: <h2 class="text-2xl sm:text-3xl font-bold text-neutral-900 mt-12 mb-6">
         - Subjudul H3: <h3 class="text-xl font-bold text-neutral-800 mt-8 mb-4">
         - Paragraf biasa: <p class="mb-6 text-neutral-600 leading-relaxed">
         - Unordered list: <ul class="list-disc pl-6 mb-8 space-y-3 text-neutral-600">
         - Beri penekanan <strong class="font-bold text-neutral-800"> pada frasa penting.
      5. Jika TEKS MENTAH belum memiliki paragraf "Kesimpulan & Call to Action (CTA)", tolong tambahkan paragraf CTA yang persuasif untuk mengajak konsultasi dengan PAS HVAC.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const data = JSON.parse(text);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Gemini Optimization Error:", error);
    return NextResponse.json({ error: error.message || "Failed to optimize article" }, { status: 500 });
  }
}
