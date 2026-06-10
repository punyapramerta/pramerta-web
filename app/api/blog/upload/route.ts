import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import sharp from "sharp";

const BUCKET = "blog-images";
const ALLOWED_EXT = ["jpg", "jpeg", "png", "webp", "avif", "svg"];

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const slug = formData.get("slug") as string | null;
  const keyword = formData.get("keyword") as string | null;

  if (!file || !slug) {
    return NextResponse.json({ error: "Missing file or slug" }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  if (!ALLOWED_EXT.includes(ext)) {
    return NextResponse.json({ error: "Format tidak didukung. Gunakan JPG, PNG, WEBP, AVIF, atau SVG." }, { status: 400 });
  }

  const supabase = createServerClient();
  const baseName = keyword || slug;
  
  // Use .webp for everything except SVG
  const isSvg = ext === "svg";
  const finalExt = isSvg ? "svg" : "webp";
  const filename = `${baseName}.${finalExt}`;

  // Remove existing images for this slug or keyword to avoid orphans
  const pathsToRemove: string[] = [];
  for (const e of ALLOWED_EXT) {
    pathsToRemove.push(`${slug}.${e}`);
    if (keyword && keyword !== slug) pathsToRemove.push(`${keyword}.${e}`);
  }
  await supabase.storage.from(BUCKET).remove(pathsToRemove);

  const buffer = Buffer.from(await file.arrayBuffer());
  
  let finalBuffer: Buffer = buffer;
  let finalContentType = file.type;
  
  if (!isSvg) {
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
  return NextResponse.json({ url: data.publicUrl });
}

export async function DELETE(req: NextRequest) {
  const { slug, keyword } = await req.json();
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const supabase = createServerClient();
  const pathsToRemove: string[] = [];
  
  for (const e of ALLOWED_EXT) {
    pathsToRemove.push(`${slug}.${e}`);
    if (keyword && keyword !== slug) pathsToRemove.push(`${keyword}.${e}`);
  }

  await supabase.storage
    .from(BUCKET)
    .remove(pathsToRemove);

  return NextResponse.json({ success: true });
}
