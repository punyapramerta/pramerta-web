import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public/images/portfolio");

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const slug = formData.get("slug") as string | null;

  if (!file || !slug) {
    return NextResponse.json({ error: "Missing file or slug" }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const allowed = ["jpg", "jpeg", "png", "webp", "avif"];
  if (!allowed.includes(ext)) {
    return NextResponse.json({ error: "Format tidak didukung" }, { status: 400 });
  }

  // Remove any existing image for this slug
  for (const e of allowed) {
    const existing = path.join(UPLOAD_DIR, `${slug}.${e}`);
    if (fs.existsSync(existing)) fs.unlinkSync(existing);
  }

  const filename = `${slug}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer);

  return NextResponse.json({ url: `/images/portfolio/${filename}` });
}

export async function DELETE(req: NextRequest) {
  const { slug } = await req.json();
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const allowed = ["jpg", "jpeg", "png", "webp", "avif"];
  for (const e of allowed) {
    const target = path.join(UPLOAD_DIR, `${slug}.${e}`);
    if (fs.existsSync(target)) fs.unlinkSync(target);
  }

  return NextResponse.json({ success: true });
}
