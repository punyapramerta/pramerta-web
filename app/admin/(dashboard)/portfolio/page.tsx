"use client";

import { useState, useEffect, useTransition, useCallback, useRef } from "react";
import Image from "next/image";
import { getPortfolioItems, deletePortfolioItem, updatePortfolioItem, addPortfolioItem } from "@/app/admin/portfolioActions";
import type { PortfolioItem } from "@/lib/repositories/dataRepository";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

type FormState = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  location: string;
  excerpt: string;
  imagePlaceholder: string;
  background: string;
  highlightChallenge: string;
  challenges: string;
  solution: string;
  results: string;
  metrics: string;
  image: string;
};

const EMPTY_FORM: FormState = {
  slug: "",
  title: "",
  client: "",
  industry: "",
  location: "",
  excerpt: "",
  imagePlaceholder: "hvac",
  background: "",
  highlightChallenge: "",
  challenges: "",
  solution: "",
  results: "",
  metrics: "",
  image: "",
};

function itemToForm(item: PortfolioItem): FormState {
  return {
    slug: item.slug,
    title: item.title,
    client: item.client,
    industry: item.industry,
    location: item.location,
    excerpt: item.excerpt,
    imagePlaceholder: item.imagePlaceholder,
    background: item.background,
    highlightChallenge: item.highlightChallenge,
    challenges: item.challenges.join("\n"),
    solution: item.solution.join("\n"),
    results: item.results.join("\n"),
    metrics: item.metrics.map((m) => `${m.label}|${m.value}`).join("\n"),
    image: item.image ?? "",
  };
}

function formToItem(form: FormState): PortfolioItem {
  return {
    slug: form.slug,
    title: form.title,
    client: form.client,
    industry: form.industry,
    location: form.location,
    excerpt: form.excerpt,
    imagePlaceholder: form.imagePlaceholder,
    background: form.background,
    highlightChallenge: form.highlightChallenge,
    challenges: form.challenges.split("\n").map((s) => s.trim()).filter(Boolean),
    solution: form.solution.split("\n").map((s) => s.trim()).filter(Boolean),
    results: form.results.split("\n").map((s) => s.trim()).filter(Boolean),
    metrics: form.metrics
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        const [label, value] = s.split("|");
        return { label: label?.trim() ?? "", value: value?.trim() ?? "" };
      }),
    image: form.image || undefined,
  };
}

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const [mode, setMode] = useState<"none" | "add" | "edit">("none");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formError, setFormError] = useState("");

  const [refreshKey, setRefreshKey] = useState(0);

  // Image state
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [removeImage, setRemoveImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [deleteTarget, setDeleteTarget] = useState<PortfolioItem | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await getPortfolioItems();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  function openAdd() {
    setForm({ ...EMPTY_FORM });
    setImagePreview("");
    setImageFile(null);
    setRemoveImage(false);
    setFormError("");
    setMode("add");
  }

  function openEdit(item: PortfolioItem) {
    const f = itemToForm(item);
    setForm(f);
    setImagePreview(item.image ?? "");
    setImageFile(null);
    setRemoveImage(false);
    setEditingSlug(item.slug);
    setFormError("");
    setMode("edit");
  }

  function closeModal() {
    setMode("none");
    setEditingSlug(null);
    setFormError("");
    setImageFile(null);
    setImagePreview("");
    setRemoveImage(false);
  }

  function handleFormChange(key: keyof FormState, value: string) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && mode === "add") {
        next.slug = slugify(value);
      }
      return next;
    });
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setRemoveImage(false);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setImagePreview("");
    setRemoveImage(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function uploadImageIfNeeded(slug: string): Promise<string | undefined> {
    if (removeImage) {
      await fetch("/api/portfolio/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      return undefined;
    }
    if (!imageFile) return form.image || undefined;
    setImageUploading(true);
    const fd = new FormData();
    fd.append("file", imageFile);
    fd.append("slug", slug);
    const res = await fetch("/api/portfolio/upload", { method: "POST", body: fd });
    setImageUploading(false);
    if (!res.ok) throw new Error("Upload gagal");
    const { url } = await res.json();
    return url;
  }

  function handleSave() {
    if (!form.title.trim() || !form.slug.trim() || !form.client.trim()) {
      setFormError("Judul, slug, dan klien wajib diisi.");
      return;
    }
    startTransition(async () => {
      try {
        const imageUrl = await uploadImageIfNeeded(form.slug);
        const item = formToItem({ ...form, image: imageUrl ?? "" });
        if (mode === "add") {
          const res = await addPortfolioItem(item);
          if (!res.success) { setFormError(res.error ?? "Gagal menyimpan."); return; }
          setEditingSlug(form.slug);
          setMode("edit");
        } else {
          const res = await updatePortfolioItem(editingSlug!, item);
          if (!res.success) { setFormError(res.error ?? "Gagal menyimpan."); return; }
        }
        await refresh();
        setRefreshKey(k => k + 1);
        
        // Use a simple non-blocking notification or standard alert
        alert("Portofolio berhasil disimpan!");
      } catch {
        setFormError("Terjadi kesalahan saat upload gambar.");
      }
    });
  }

  function handleDelete(item: PortfolioItem) {
    setDeleteTarget(item);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    const slug = deleteTarget.slug;
    startTransition(async () => {
      await fetch("/api/portfolio/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      await deletePortfolioItem(slug);
      setDeleteTarget(null);
      await refresh();
    });
  }

  if (mode !== "none") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-2rem)] overflow-hidden">
        {/* LEFT: EDITOR */}
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
            <div>
              <h1 className="text-xl font-headline font-extrabold text-gray-900">
                {mode === "add" ? "Tambah Portofolio" : "Edit Portofolio"}
              </h1>
              <button onClick={closeModal} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 font-bold transition-colors mt-2">
                <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                Kembali ke Daftar
              </button>
            </div>
            <button
              onClick={handleSave}
              disabled={isPending || imageUploading}
              className="bg-primary hover:bg-primary/90 text-white font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2 disabled:opacity-70 shadow-md text-sm"
            >
              {isPending || imageUploading ? (
                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  Simpan
                </>
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-bold px-4 py-2 rounded-lg">
                {formError}
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <label className="text-xs font-bold text-gray-600 block mb-2">Gambar Proyek</label>
              <div className="relative rounded-xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 aspect-[16/7] flex items-center justify-center">
                {imagePreview ? (
                  <>
                    <Image
                      src={imagePreview}
                      alt="preview"
                      fill
                      className="object-cover"
                      unoptimized={imagePreview.startsWith("blob:")}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-white text-gray-800 font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 hover:bg-gray-100"
                      >
                        <span className="material-symbols-outlined text-sm">upload</span>
                        Ganti
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 hover:bg-red-700"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                        Hapus
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-2 text-gray-400 hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-4xl">add_photo_alternate</span>
                    <span className="text-sm font-bold">Klik untuk upload gambar</span>
                    <span className="text-xs">JPG, PNG, WebP — maks 5MB</span>
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                className="hidden"
                onChange={handleFileSelect}
              />
              {imageUploading && (
                <p className="text-xs text-primary font-bold mt-1">Mengupload gambar...</p>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-bold text-gray-600 block mb-1">Judul Proyek *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none text-sm"
                  placeholder="Judul proyek"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Slug (URL) *</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => handleFormChange("slug", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none text-sm font-mono"
                  placeholder="url-proyek"
                  readOnly={mode === "edit"}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Klien *</label>
                <input
                  type="text"
                  value={form.client}
                  onChange={(e) => handleFormChange("client", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none text-sm"
                  placeholder="Nama klien"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Industri</label>
                <input
                  type="text"
                  value={form.industry}
                  onChange={(e) => handleFormChange("industry", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none text-sm"
                  placeholder="Contoh: F&amp;B, Rumah Sakit"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Lokasi</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => handleFormChange("location", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none text-sm"
                  placeholder="Contoh: Surabaya"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Excerpt (ringkasan singkat)</label>
                <textarea
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => handleFormChange("excerpt", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Latar Belakang</label>
                <textarea
                  rows={3}
                  value={form.background}
                  onChange={(e) => handleFormChange("background", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">
                  Tantangan <span className="font-normal text-gray-400">(satu per baris)</span>
                </label>
                <textarea
                  rows={3}
                  value={form.challenges}
                  onChange={(e) => handleFormChange("challenges", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none text-sm"
                  placeholder="Tantangan 1&#10;Tantangan 2"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Kutipan Tantangan Utama</label>
                <input
                  type="text"
                  value={form.highlightChallenge}
                  onChange={(e) => handleFormChange("highlightChallenge", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">
                  Solusi <span className="font-normal text-gray-400">(satu per baris)</span>
                </label>
                <textarea
                  rows={2}
                  value={form.solution}
                  onChange={(e) => handleFormChange("solution", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none text-sm"
                  placeholder="Langkah solusi 1&#10;Langkah solusi 2"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">
                  Hasil <span className="font-normal text-gray-400">(satu per baris)</span>
                </label>
                <textarea
                  rows={2}
                  value={form.results}
                  onChange={(e) => handleFormChange("results", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none text-sm"
                  placeholder="Hasil 1&#10;Hasil 2"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">
                  Metrik <span className="font-normal text-gray-400">(format: Label|Nilai, satu per baris)</span>
                </label>
                <textarea
                  rows={4}
                  value={form.metrics}
                  onChange={(e) => handleFormChange("metrics", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none text-sm font-mono"
                  placeholder="Penurunan Suhu|10–20%&#10;Hemat Biaya|10%"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: PREVIEW */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col relative h-full">
          <div className="bg-gray-900 text-white px-4 py-2 flex justify-between items-center text-xs font-mono z-10 shrink-0">
            <div className="flex gap-2 items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            </div>
            <span>Live Preview (Zoom 50%)</span>
            <button onClick={() => setRefreshKey(k => k+1)} className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">refresh</span> Reload
            </button>
          </div>
          <div className="flex-1 relative overflow-hidden bg-gray-100">
            <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50">
              {mode === "add" && !editingSlug ? (
                <div className="flex items-center justify-center w-full h-full bg-white flex-col gap-4">
                  <span className="material-symbols-outlined text-6xl text-gray-300">preview</span>
                  <p className="text-gray-500 text-lg font-bold">Simpan data terlebih dahulu untuk melihat Live Preview</p>
                </div>
              ) : (
                <iframe 
                  key={refreshKey}
                  src={`/portfolio/${form.slug}?preview=${refreshKey}`} 
                  className="w-full h-full border-none bg-white"
                  title="Portfolio Preview"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-extrabold text-gray-900 mb-2">Manajemen Portofolio</h1>
          <p className="text-gray-500">Tambah, edit, atau hapus data studi kasus portofolio.</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-primary text-white hover:bg-primary/90 font-bold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Tambah Portofolio
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 font-bold">Memuat data...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Proyek</th>
                  <th className="px-6 py-4">Klien</th>
                  <th className="px-6 py-4">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item.slug} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {item.image ? (
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-gray-400 text-xl">{item.imagePlaceholder}</span>
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-gray-900">{item.title}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">{item.excerpt}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.client}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-gray-400">Belum ada data portofolio.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-red-600">warning</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Hapus Portofolio?</h3>
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-700">{deleteTarget.title}</strong> akan dihapus secara permanen beserta gambarnya.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                disabled={isPending}
                className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {isPending ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
