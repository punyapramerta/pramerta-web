import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

const BUCKET = "blog-images";
const ALLOWED_EXT = ["jpg", "jpeg", "png", "webp", "avif", "svg"];

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const slug = formData.get("slug") as string | null;

  if (!file || !slug) {
    return NextResponse.json({ error: "Missing file or slug" }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  if (!ALLOWED_EXT.includes(ext)) {
    return NextResponse.json({ error: "Format tidak didukung. Gunakan JPG, PNG, WEBP, AVIF, atau SVG." }, { status: 400 });
  }

  const supabase = createServerClient();
  const filename = `${slug}.${ext}`;

  // Remove existing images for this slug
  for (const e of ALLOWED_EXT) {
    await supabase.storage.from(BUCKET).remove([`${slug}.${e}`]);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return NextResponse.json({ url: data.publicUrl });
}

export async function DELETE(req: NextRequest) {
  const { slug } = await req.json();
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const supabase = createServerClient();
  await supabase.storage
    .from(BUCKET)
    .remove(ALLOWED_EXT.map((e) => `${slug}.${e}`));

  return NextResponse.json({ success: true });
}
