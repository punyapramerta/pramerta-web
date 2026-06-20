import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import sharp from "sharp";

const BUCKET = "blog-images"; // Reusing the existing bucket for simplicity
const ALLOWED_EXT = ["jpg", "jpeg", "png", "webp", "avif", "svg"];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    if (!ALLOWED_EXT.includes(ext)) {
      return NextResponse.json({ error: "Format tidak didukung. Gunakan JPG, PNG, WEBP, AVIF, atau SVG." }, { status: 400 });
    }

    const supabase = createServerClient();
    
    // Generate unique filename
    const uniqueId = Date.now().toString() + "-" + Math.random().toString(36).substring(2, 7);
    const isSvg = ext === "svg";
    const finalExt = isSvg ? "svg" : "webp";
    const filename = `client-logos/logo-${uniqueId}.${finalExt}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    
    let finalBuffer: Buffer = buffer;
    let finalContentType = file.type;
    
    if (!isSvg) {
      // Compress and convert to webp if not SVG
      finalBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();
      finalContentType = "image/webp";
    }

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(filename, finalBuffer, {
        contentType: finalContentType,
        upsert: true,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
    return NextResponse.json({ url: `${data.publicUrl}?t=${Date.now()}` });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
