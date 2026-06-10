import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing in environment variables");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const body = await request.json();
    const { purpose, audience, keyword, tone, title } = body;

    if (!keyword) {
      return NextResponse.json({ error: "Keyword is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
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
            content: { type: SchemaType.STRING, description: "Konten lengkap artikel dalam format HTML (gunakan <h2>, <h3>, <p>, <ul>). Minimal 1000 kata. Harus sangat komprehensif." },
          },
          required: ["title", "slug", "excerpt", "metaTitle", "metaDesc", "content"],
        },
      },
    });

    const prompt = `
      Bertindaklah sebagai Senior SEO Content Writer & HVAC Engineer.
      Buatlah draf artikel SEO yang mendalam dalam bahasa Indonesia.
      
      Kata Kunci Utama: "${keyword}"
      Topik/Judul Preferensi: "${title || "Buatkan judul click-worthy berdasarkan keyword"}"
      Tujuan Artikel: ${purpose || "Edukasi & SEO"}
      Target Audience: ${audience || "B2B, Plant Manager, Engineer, Procurement"}
      Tone of Voice: ${tone || "Profesional, Teknis, Persuasif"}
      
      KONTEKS PERUSAHAAN (PENTING! Selalu sisipkan ini dengan natural):
      Nama Perusahaan: PAS HVAC (PT. Pratama Amerta Solusi).
      Keahlian: Kontraktor HVAC Industri (Cleanroom, Rumah Sakit, Data Center, Pabrik).
      Status: Authorized Distributor FRIMEC (AHU) & GREE (Chiller, VRF) di Indonesia.

      PANDUAN SEO & GEO (Generative Engine Optimization):
      1. Paragraf pertama wajib mengandung "Direct Answer" (Bottom Line Up Front) untuk menjawab langsung niat pencarian (search intent).
      2. Panjang artikel minimal 1000 kata. Harus berbobot, bahas spesifikasi, standar industri (SMACNA, ASHRAE, dll jika relevan).
      3. Format Content wajib menggunakan tag HTML semantik:
         - Jangan pakai tag <html>, <head>, atau <body>. Langsung mulai dengan isi konten.
         - Gunakan <h2> dan <h3> untuk memecah subtopik agar mudah di-*skimming*.
         - Gunakan <ul>/<li> untuk listicle keuntungan atau fitur.
         - Beri penekanan <strong> pada frasa penting.
      4. Akhiri dengan paragraf "Kesimpulan & Call to Action (CTA)" yang persuasif, ajak untuk konsultasi RFQ / Site Survey gratis dengan PAS HVAC.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const data = JSON.parse(text);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate article" }, { status: 500 });
  }
}
