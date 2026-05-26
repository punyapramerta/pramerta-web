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
  const [pendingStatus, setPendingStatus] = useState<"draft" | "published" | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !form.slug) {
      if (!form.slug) setFeedback({ type: "error", msg: "Isi Slug terlebih dahulu sebelum upload gambar." });
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("slug", form.slug);
      const res = await fetch("/api/blog/upload", { method: "POST", body: fd });
      const json = await res.json();
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
        body: JSON.stringify({ slug: form.slug }),
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

  const setField = (key: keyof BlogPost, value: string) => {
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
  };

  const openEdit = (post: BlogPost) => {
    setForm(post);
    setEditSlug(post.slug);
    setMode("edit");
    setFeedback(null);
  };

  const handleSave = (saveStatus: "draft" | "published") => {
    if (!form.title || !form.slug) {
      setFeedback({ type: "error", msg: "Judul dan slug wajib diisi." });
      return;
    }
    const postToSave: BlogPost = { ...form, status: saveStatus };
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
      <div className="max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-headline font-extrabold text-gray-900 mb-1">
              {mode === "add" ? "Tambah Artikel Baru" : "Edit Artikel"}
            </h1>
            <p className="text-gray-500 text-sm">Tulis dan kelola konten blog.</p>
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

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Judul Artikel *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                placeholder="Judul artikel..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Slug *</label>
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
                placeholder="5 Menit Baca"
              />
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
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Excerpt</label>
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={(e) => setField("excerpt", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition resize-none"
                placeholder="Ringkasan singkat artikel..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Gambar Featured</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
                onChange={handleImageUpload}
                className="hidden"
              />
              {form.imageUrl ? (
                <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                  <img
                    src={form.imageUrl}
                    alt="preview"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors group flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-800 font-bold text-xs px-4 py-2 rounded-lg shadow-lg flex items-center gap-1.5 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-sm">upload</span>
                      {uploading ? "Mengupload..." : "Ganti Gambar"}
                    </button>
                    <button
                      type="button"
                      onClick={handleImageDelete}
                      disabled={uploading}
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-lg flex items-center gap-1.5 hover:bg-red-700 disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                      Hapus
                    </button>
                  </div>
                  <div className="p-2 bg-gray-50 border-t border-gray-200">
                    <p className="text-[10px] text-gray-400 truncate font-mono">{form.imageUrl}</p>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading || !form.slug}
                  className="w-full border-2 border-dashed border-gray-200 rounded-xl py-8 flex flex-col items-center gap-2 text-gray-400 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-3xl">
                    {uploading ? "hourglass_empty" : "add_photo_alternate"}
                  </span>
                  <span className="text-sm font-bold">
                    {uploading ? "Mengupload gambar..." : "Klik untuk upload gambar"}
                  </span>
                  <span className="text-xs">JPG, PNG, WEBP, AVIF, SVG · Maks 5MB</span>
                  {!form.slug && (
                    <span className="text-xs text-orange-500 font-bold">⚠ Isi Slug terlebih dahulu</span>
                  )}
                </button>
              )}
              <div className="mt-2">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Atau masukkan URL manual</label>
                <input
                  type="text"
                  value={form.imageUrl ?? ""}
                  onChange={(e) => setField("imageUrl", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition font-mono text-gray-600"
                  placeholder="/images/blog/nama-gambar.svg atau https://..."
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Konten Artikel (HTML)</label>
            <textarea
              rows={18}
              value={form.content}
              onChange={(e) => setField("content", e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition font-mono resize-y"
              placeholder="<p>Konten HTML artikel...</p>"
            />
          </div>

          <div className="border-t border-gray-100 pt-5">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">SEO Meta</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Meta Title</label>
                <input
                  type="text"
                  value={form.metaTitle}
                  onChange={(e) => setField("metaTitle", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Target Keyword</label>
                <input
                  type="text"
                  value={form.targetKeyword}
                  onChange={(e) => setField("targetKeyword", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Meta Description</label>
                <textarea
                  rows={2}
                  value={form.metaDesc}
                  onChange={(e) => setField("metaDesc", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => handleSave("draft")}
              disabled={isPending}
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold px-6 py-2.5 rounded-xl transition-all text-sm disabled:opacity-50"
            >
              Simpan Draft
            </button>
            <button
              onClick={() => handleSave("published")}
              disabled={isPending}
              className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 text-sm disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">publish</span>
              {isPending ? "Menyimpan..." : "Publish"}
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
          <p className="text-gray-500">Kelola semua artikel yang ditampilkan di halaman blog.</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-primary hover:bg-primary/90 text-white font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 text-sm"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Artikel Baru
        </button>
      </div>

      {feedback && (
        <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${feedback.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {feedback.msg}
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-400 font-bold">Memuat artikel...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <span className="material-symbols-outlined text-5xl block mb-3">article</span>
          <p className="font-bold">Belum ada artikel. Buat yang pertama!</p>
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
                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${post.status === "published" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                    {post.status === "published" ? "Published" : "Draft"}
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
