"use client";

import { useState, useEffect, useTransition, useRef } from "react";
import {
  getBlogPosts,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost,
  toggleBlogPostStatus,
  type BlogPost,
} from "@/app/admin/blogActions";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const EMPTY_FORM: BlogPost = {
  slug: "",
  title: "",
  category: "",
  readTime: "",
  author: "Tim Engineer PAS HVAC",
  content: "",
  excerpt: "",
  imageUrl: "",
  metaTitle: "",
  metaDesc: "",
  targetKeyword: "",
  status: "draft",
  publishedAt: null,
};

const CATEGORIES = ["Panduan", "Edukasi", "Produk", "Maintenance", "Regulasi", "Insight", "Teknologi"];

const categoryStyles: Record<string, string> = {
  Panduan: "bg-blue-50 text-blue-700",
  Edukasi: "bg-purple-50 text-purple-700",
  Produk: "bg-neutral-100 text-neutral-700",
  Maintenance: "bg-emerald-50 text-emerald-700",
  Regulasi: "bg-orange-50 text-orange-700",
  Insight: "bg-rose-50 text-rose-700",
  Teknologi: "bg-cyan-50 text-cyan-700",
};



export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [mode, setMode] = useState<"none" | "add" | "edit">("none");
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [form, setForm] = useState<BlogPost>(EMPTY_FORM);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Content Editor States
  type ArticleBlock = { id: string; type: "intro" | "h2" | "h3" | "p" | "ul" | "quote"; content: string };
  const [contentMode, setContentMode] = useState<"html" | "visual">("html");
  const [blocks, setBlocks] = useState<ArticleBlock[]>([]);

  // Image Drag State
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const dragStartY = useRef<number>(0);
  const dragStartPos = useRef<number>(50);



  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !form.slug) {
      if (!form.slug) setFeedback({ type: "error", msg: "Isi Slug terlebih dahulu sebelum upload gambar." });
      return;
    }
    
    // Check file size (max 4MB for Vercel Serverless limits)
    if (file.size > 4 * 1024 * 1024) {
      setFeedback({ type: "error", msg: "Ukuran gambar terlalu besar. Maksimal 4 MB." });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("slug", form.slug);
      fd.append("keyword", slugify(form.targetKeyword || form.title || form.slug));
      
      const res = await fetch("/api/blog/upload", { method: "POST", body: fd });
      
      let json;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        json = await res.json();
      } else {
        const text = await res.text();
        throw new Error(`Upload gagal (${res.status}): Server mengembalikan format yang tidak valid. (Mungkin file terlalu besar)`);
      }
      
      if (!res.ok) throw new Error(json.error ?? "Upload gagal");
      setField("imageUrl", json.url);
      setFeedback({ type: "success", msg: "Gambar berhasil diupload." });
    } catch (err) {
      setFeedback({ type: "error", msg: err instanceof Error ? err.message : "Upload gagal." });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleImageDelete = async () => {
    if (!form.slug) return;
    setUploading(true);
    try {
      await fetch("/api/blog/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: form.slug, keyword: slugify(form.targetKeyword || form.title || form.slug) }),
      });
      setField("imageUrl", "");
    } finally {
      setUploading(false);
    }
  };

  const load = async () => {
    setLoading(true);
    try {
      const data = await getBlogPosts();
      setPosts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const setField = (key: keyof BlogPost, value: any) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && mode === "add") next.slug = slugify(value);
      return next;
    });
  };

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditSlug(null);
    setMode("add");
    setFeedback(null);
    setContentMode("visual");
    setBlocks([]);
  };

  const openEdit = (post: BlogPost) => {
    setForm(post);
    setEditSlug(post.slug);
    setMode("edit");
    setFeedback(null);
    setContentMode("html");
    setBlocks([]);
  };

  const blocksToHtml = (currentBlocks: ArticleBlock[]) => {
    return currentBlocks.map(b => {
      if (!b.content.trim()) return "";
      switch (b.type) {
        case "intro": return `<p class="text-xl font-medium text-neutral-700 mb-8 leading-relaxed">${b.content}</p>`;
        case "h2": return `<h2 class="text-2xl sm:text-3xl font-bold text-neutral-900 mt-12 mb-6">${b.content}</h2>`;
        case "h3": return `<h3 class="text-xl font-bold text-neutral-800 mt-8 mb-4">${b.content}</h3>`;
        case "p": return `<p class="mb-6 text-neutral-600 leading-relaxed">${b.content}</p>`;
        case "ul": 
          const listItems = b.content.split("\n").filter(l => l.trim() !== "").map(l => `<li>${l.replace(/^- /, "")}</li>`).join("");
          return `<ul class="list-disc pl-6 mb-8 space-y-3 text-neutral-600">${listItems}</ul>`;
        case "quote":
          return `<div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-8"><p class="text-blue-900 font-medium italic text-lg leading-relaxed">"${b.content}"</p><p class="text-blue-600 text-sm font-bold mt-3">— Tim Engineer PAS HVAC</p></div>`;
        default: return "";
      }
    }).filter(Boolean).join("\n");
  };

  const updateBlocksToForm = (newBlocks: ArticleBlock[]) => {
    setBlocks(newBlocks);
    setField("content", blocksToHtml(newBlocks));
  };

  const addBlock = (type: ArticleBlock["type"]) => {
    updateBlocksToForm([...blocks, { id: Math.random().toString(36).slice(2, 9), type, content: "" }]);
  };

  const updateBlock = (id: string, newContent: string) => {
    updateBlocksToForm(blocks.map(b => b.id === id ? { ...b, content: newContent } : b));
  };

  const removeBlock = (id: string) => {
    updateBlocksToForm(blocks.filter(b => b.id !== id));
  };
  
  const moveBlock = (index: number, direction: -1 | 1) => {
    const newBlocks = [...blocks];
    if (index + direction >= 0 && index + direction < newBlocks.length) {
      const temp = newBlocks[index];
      newBlocks[index] = newBlocks[index + direction];
      newBlocks[index + direction] = temp;
      updateBlocksToForm(newBlocks);
    }
  };



  const handleSave = (saveStatus: "draft" | "published", clearSchedule: boolean = false) => {
    if (!form.title || !form.slug) {
      setFeedback({ type: "error", msg: "Judul dan slug wajib diisi." });
      return;
    }
    const postToSave: BlogPost = { ...form, status: saveStatus };
    if (clearSchedule) {
      postToSave.publishedAt = null;
    }
    startTransition(async () => {
      let result;
      if (mode === "edit" && editSlug) {
        result = await updateBlogPost(editSlug, postToSave);
      } else {
        result = await addBlogPost(postToSave);
      }
      if (result.success) {
        setFeedback({ type: "success", msg: mode === "edit" ? "Artikel berhasil diupdate." : "Artikel berhasil ditambahkan." });
        await load();
        setMode("none");
      } else {
        setFeedback({ type: "error", msg: result.error ?? "Terjadi kesalahan." });
      }
    });
  };

  const handleDelete = (slug: string) => {
    startTransition(async () => {
      const result = await deleteBlogPost(slug);
      if (result.success) {
        setPosts((prev) => prev.filter((p) => p.slug !== slug));
        setDeleteConfirm(null);
        if (mode === "edit" && editSlug === slug) setMode("none");
      } else {
        setFeedback({ type: "error", msg: result.error ?? "Gagal menghapus." });
      }
    });
  };

  const handleToggleStatus = (slug: string, status: "draft" | "published") => {
    startTransition(async () => {
      const result = await toggleBlogPostStatus(slug, status);
      if (result.success) {
        await load();
      } else {
        setFeedback({ type: "error", msg: result.error ?? "Gagal mengubah status." });
      }
    });
  };

  if (mode !== "none") {
    return (
      <div className="max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-headline font-extrabold text-gray-900 mb-1">
              {mode === "add" ? "Tambah Artikel Baru" : "Edit Artikel"}
            </h1>
            <p className="text-gray-500 text-sm">Tulis dan kelola konten blog untuk optimasi SEO.</p>
          </div>
          <button onClick={() => setMode("none")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 font-bold transition-colors">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Kembali ke Daftar
          </button>
        </div>

        {feedback && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${feedback.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {feedback.msg}
          </div>
        )}


        {/* FORM BIASA / HASIL GENERATE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h3 className="font-bold text-lg border-b pb-3 text-gray-800">Detail Artikel</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Judul Artikel (H1) *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                placeholder="Judul artikel..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Slug URL *</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setField("slug", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Kategori</label>
              <select
                value={form.category}
                onChange={(e) => setField("category", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
              >
                <option value="">-- Pilih Kategori --</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Waktu Baca</label>
              <input
                type="text"
                value={form.readTime}
                onChange={(e) => setField("readTime", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                placeholder="Misal: 5 Menit Baca"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Jadwal Publish (Opsional)</label>
              <input
                type="datetime-local"
                value={form.publishedAt ? new Date(new Date(form.publishedAt).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ""}
                onChange={(e) => setField("publishedAt", e.target.value ? new Date(e.target.value).toISOString() : null)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
              />
              <p className="text-[10px] text-gray-400 mt-1">Kosongkan untuk publish instan. Isi tanggal untuk dijadwalkan.</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Penulis</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setField("author", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Excerpt (Ringkasan Pendek)</label>
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={(e) => setField("excerpt", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition resize-none"
                placeholder="Ringkasan singkat artikel..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Gambar Hero / Featured Image *</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
                onChange={handleImageUpload}
                className="hidden"
              />
              {form.imageUrl ? (
                <div 
                  className={`relative aspect-video w-full rounded-3xl overflow-hidden border border-gray-200 bg-gray-50 group ${isDraggingImage ? 'cursor-grabbing' : 'cursor-grab'}`}
                  onMouseDown={(e) => {
                    if (uploading) return;
                    setIsDraggingImage(true);
                    dragStartY.current = e.clientY;
                    dragStartPos.current = form.imagePositionY ?? 50;
                  }}
                  onMouseMove={(e) => {
                    if (!isDraggingImage) return;
                    const deltaY = e.clientY - dragStartY.current;
                    // Membalik deltaY agar terasa natural: geser mouse ke atas -> fokus gambar ke bawah (persen naik)
                    let newPos = dragStartPos.current - (deltaY * 0.2);
                    newPos = Math.max(0, Math.min(100, Math.round(newPos)));
                    setField("imagePositionY", newPos);
                  }}
                  onMouseUp={() => setIsDraggingImage(false)}
                  onMouseLeave={() => setIsDraggingImage(false)}
                >
                  <img
                    src={form.imageUrl}
                    alt="preview"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                    style={{ objectPosition: `50% ${form.imagePositionY ?? 50}%` }}
                    draggable={false}
                  />
                  {!isDraggingImage && (
                    <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-3 py-2 rounded-xl font-bold tracking-wide flex items-center gap-1.5 opacity-80 backdrop-blur-sm pointer-events-none z-10">
                      <span className="material-symbols-outlined text-[16px]">swipe_vertical</span> 
                      Geser Gambar
                    </div>
                  )}
                  <div className={`absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center gap-3 z-20 ${isDraggingImage ? 'hidden' : 'opacity-0 group-hover:opacity-100'}`}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      disabled={uploading}
                      className="bg-white text-gray-800 font-bold text-xs px-4 py-2 rounded-lg shadow-lg flex items-center gap-1.5 hover:bg-gray-50 disabled:opacity-50 transition-transform hover:scale-105 active:scale-95"
                    >
                      <span className="material-symbols-outlined text-sm">upload</span>
                      {uploading ? "Mengupload..." : "Ganti Gambar"}
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageDelete();
                      }}
                      disabled={uploading}
                      className="bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-lg flex items-center gap-1.5 hover:bg-red-700 disabled:opacity-50 transition-transform hover:scale-105 active:scale-95"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                      Hapus
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading || !form.slug}
                  className="w-full border-2 border-dashed border-gray-200 rounded-xl py-8 flex flex-col items-center gap-2 text-gray-400 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gray-50"
                >
                  <span className="material-symbols-outlined text-3xl">
                    {uploading ? "hourglass_empty" : "add_photo_alternate"}
                  </span>
                  <span className="text-sm font-bold">
                    {uploading ? "Mengupload gambar..." : "Klik untuk upload gambar Hero"}
                  </span>
                  <span className="text-xs">JPG, PNG, WEBP · Pastikan Slug sudah terisi</span>
                </button>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Konten Artikel Lengkap</label>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setContentMode("visual")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${contentMode === "visual" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Mode Visual (Per Part)
                </button>
                <button
                  onClick={() => setContentMode("html")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${contentMode === "html" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Mode HTML Mentah
                </button>
              </div>
            </div>

            {contentMode === "visual" ? (
              <div className="space-y-2 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                {blocks.length === 0 && (
                  <div className="text-center py-10 bg-white border border-dashed border-gray-200 rounded-xl text-gray-400">
                    <span className="material-symbols-outlined text-3xl mb-2">view_agenda</span>
                    <p className="text-sm font-bold">Belum ada konten.</p>
                    <p className="text-xs">Mulai dengan menambahkan blok di bawah.</p>
                  </div>
                )}
                {blocks.map((block, i) => (
                  <div key={block.id} className="relative group bg-white border border-transparent hover:border-gray-200 focus-within:border-primary/30 rounded-2xl p-6 transition-all shadow-sm">
                    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity flex items-center gap-1 bg-white border border-gray-200 rounded-lg shadow-sm p-1 z-10">
                      <button onClick={() => moveBlock(i, -1)} disabled={i === 0} className="p-1.5 hover:bg-gray-50 rounded text-gray-400 hover:text-primary disabled:opacity-30"><span className="material-symbols-outlined text-[16px] block">arrow_upward</span></button>
                      <button onClick={() => moveBlock(i, 1)} disabled={i === blocks.length - 1} className="p-1.5 hover:bg-gray-50 rounded text-gray-400 hover:text-primary disabled:opacity-30"><span className="material-symbols-outlined text-[16px] block">arrow_downward</span></button>
                      <div className="w-px h-4 bg-gray-200 mx-1"></div>
                      <button onClick={() => removeBlock(block.id)} className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-600"><span className="material-symbols-outlined text-[16px] block">delete</span></button>
                    </div>
                    
                    {block.type === 'intro' && (
                      <textarea 
                        rows={3} 
                        value={block.content} 
                        onChange={(e) => updateBlock(block.id, e.target.value)} 
                        className="w-full text-xl font-medium text-neutral-700 leading-relaxed resize-y focus:outline-none bg-transparent placeholder:text-gray-300" 
                        placeholder="Tulis paragraf pembuka (Intro) di sini..." 
                      />
                    )}
                    {block.type === 'h2' && (
                      <input 
                        type="text" 
                        value={block.content} 
                        onChange={(e) => updateBlock(block.id, e.target.value)} 
                        className="w-full text-2xl sm:text-3xl font-bold text-neutral-900 focus:outline-none bg-transparent placeholder:text-gray-300" 
                        placeholder="Tulis Subjudul H2..." 
                      />
                    )}
                    {block.type === 'h3' && (
                      <input 
                        type="text" 
                        value={block.content} 
                        onChange={(e) => updateBlock(block.id, e.target.value)} 
                        className="w-full text-xl font-bold text-neutral-800 focus:outline-none bg-transparent placeholder:text-gray-300" 
                        placeholder="Tulis Subjudul H3..." 
                      />
                    )}
                    {block.type === 'p' && (
                      <textarea 
                        rows={4} 
                        value={block.content} 
                        onChange={(e) => updateBlock(block.id, e.target.value)} 
                        className="w-full text-neutral-600 leading-relaxed resize-y focus:outline-none bg-transparent placeholder:text-gray-300" 
                        placeholder="Tulis isi paragraf di sini..." 
                      />
                    )}
                    {block.type === 'ul' && (
                      <div className="flex gap-3">
                        <span className="material-symbols-outlined text-neutral-400 mt-1">list</span>
                        <textarea 
                          rows={4} 
                          value={block.content} 
                          onChange={(e) => updateBlock(block.id, e.target.value)} 
                          className="w-full text-neutral-600 leading-relaxed resize-y focus:outline-none bg-transparent placeholder:text-gray-300" 
                          placeholder="List item 1&#10;List item 2&#10;List item 3..." 
                        />
                      </div>
                    )}
                    {block.type === 'quote' && (
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                        <textarea 
                          rows={3} 
                          value={block.content} 
                          onChange={(e) => updateBlock(block.id, e.target.value)} 
                          className="w-full text-blue-900 font-medium italic text-lg leading-relaxed resize-y focus:outline-none bg-transparent placeholder:text-blue-300" 
                          placeholder="Tulis isi kutipan / quote penting..." 
                        />
                        <p className="text-blue-600 text-sm font-bold mt-3">— Tim Engineer PAS HVAC</p>
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex flex-wrap gap-2 pt-4 justify-center">
                  <button type="button" onClick={() => addBlock("intro")} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-white shadow-sm border border-gray-200 hover:border-primary transition-all"><span className="material-symbols-outlined text-[16px] text-gray-400">format_quote</span> + Intro</button>
                  <button type="button" onClick={() => addBlock("h2")} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-white shadow-sm border border-gray-200 hover:border-primary transition-all"><span className="material-symbols-outlined text-[16px] text-gray-400">title</span> + H2</button>
                  <button type="button" onClick={() => addBlock("h3")} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-white shadow-sm border border-gray-200 hover:border-primary transition-all"><span className="material-symbols-outlined text-[16px] text-gray-400">text_fields</span> + H3</button>
                  <button type="button" onClick={() => addBlock("p")} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-white shadow-sm border border-gray-200 hover:border-primary transition-all"><span className="material-symbols-outlined text-[16px] text-gray-400">notes</span> + Paragraf</button>
                  <button type="button" onClick={() => addBlock("ul")} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-white shadow-sm border border-gray-200 hover:border-primary transition-all"><span className="material-symbols-outlined text-[16px] text-gray-400">format_list_bulleted</span> + Bullet List</button>
                  <button type="button" onClick={() => addBlock("quote")} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-blue-700 hover:bg-blue-50 shadow-sm border border-blue-200 hover:border-blue-400 transition-all bg-white"><span className="material-symbols-outlined text-[16px] text-blue-400">format_quote</span> + Quote Block</button>
                </div>
              </div>
            ) : (
              <textarea
                rows={16}
                value={form.content}
                onChange={(e) => setField("content", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition font-mono resize-y bg-gray-50 leading-relaxed"
                placeholder="<h2>Judul Bagian</h2><p>Isi paragraf...</p>"
              />
            )}
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-bold text-lg mb-4 text-gray-800">On-Page SEO Optimization</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Meta Title (Max 60 chars)</label>
                <input
                  type="text"
                  value={form.metaTitle}
                  onChange={(e) => setField("metaTitle", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                />
                <p className="text-[10px] text-gray-400 mt-1">Saat ini: {form.metaTitle.length} karakter</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Target Keyword Spesifik</label>
                <input
                  type="text"
                  value={form.targetKeyword}
                  onChange={(e) => setField("targetKeyword", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Meta Description (Max 160 chars)</label>
                <textarea
                  rows={2}
                  value={form.metaDesc}
                  onChange={(e) => setField("metaDesc", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition resize-none"
                />
                <p className="text-[10px] text-gray-400 mt-1">Saat ini: {form.metaDesc.length} karakter</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 flex gap-3">
            <button
              onClick={() => handleSave("draft")}
              disabled={isPending}
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold px-6 py-3 rounded-xl transition-all text-sm disabled:opacity-50"
            >
              Simpan sbg Draft
            </button>
            <button
              onClick={() => {
                if (!form.publishedAt || new Date(form.publishedAt) <= new Date()) {
                  setFeedback({ type: "error", msg: "Pilih tanggal dan jam di masa depan pada kolom Jadwal Publish terlebih dahulu." });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  return;
                }
                handleSave("published");
              }}
              disabled={isPending}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200 font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 text-sm disabled:opacity-50 shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">schedule</span>
              Jadwalkan
            </button>
            <button
              onClick={() => handleSave("published", true)}
              disabled={isPending}
              className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 text-sm disabled:opacity-50 shadow-md"
            >
              <span className="material-symbols-outlined text-sm">{mode === "edit" ? "update" : "publish"}</span>
              {isPending ? "Menyimpan..." : mode === "edit" ? "Update (Instan)" : "Publish (Instan)"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-extrabold text-gray-900 mb-2">Artikel Blog</h1>
          <p className="text-gray-500">Kelola artikel SEO, panduan teknis, dan insight industri HVAC.</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-primary hover:bg-primary/90 text-white font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 text-sm shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Buat Artikel AI
        </button>
      </div>

      {feedback && (
        <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${feedback.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {feedback.msg}
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-400 font-bold">Memuat data artikel...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <span className="material-symbols-outlined text-5xl block mb-3">article</span>
          <p className="font-bold">Belum ada artikel SEO. Yuk buat menggunakan Gemini AI!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="bg-white rounded-2xl border border-gray-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {post.category && (
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${categoryStyles[post.category] ?? "bg-gray-100 text-gray-600"}`}>
                      {post.category}
                    </span>
                  )}
                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${post.status === "published" ? (post.publishedAt && new Date(post.publishedAt) > new Date() ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700") : "bg-yellow-50 text-yellow-700"}`}>
                    {post.status === "published" ? (post.publishedAt && new Date(post.publishedAt) > new Date() ? "Scheduled" : "Published") : "Draft"}
                  </span>
                </div>
                <h3 className="font-extrabold text-gray-900 text-sm leading-snug line-clamp-1">{post.title}</h3>
                <p className="text-[11px] text-gray-400 mt-0.5 font-mono">/blog/{post.slug}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleToggleStatus(post.slug, post.status)}
                  disabled={isPending}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all disabled:opacity-50 ${post.status === "published" ? "border-yellow-200 text-yellow-700 hover:bg-yellow-50" : "border-green-200 text-green-700 hover:bg-green-50"}`}
                >
                  {post.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => openEdit(post)}
                  className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
                >
                  <span className="material-symbols-outlined text-[14px]">edit</span>
                  Edit
                </button>
                {deleteConfirm === post.slug ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDelete(post.slug)}
                      disabled={isPending}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all disabled:opacity-50"
                    >
                      Yakin Hapus?
                    </button>
                    <button onClick={() => setDeleteConfirm(null)} className="text-xs font-bold px-2 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                      Batal
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(post.slug)}
                    className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-100 text-red-600 hover:bg-red-50 transition-all"
                  >
                    <span className="material-symbols-outlined text-[14px]">delete</span>
                    Hapus
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
