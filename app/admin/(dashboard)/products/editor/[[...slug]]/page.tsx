"use client";

import { useState, useEffect, useTransition, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProducts, addProduct, updateProduct } from "@/app/admin/productActions";
import type { Product } from "@/lib/supabase/queries";
import ProductView from "@/components/products/ProductView";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

type FormState = {
  slug: string;
  category: string;
  badge: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  details: { label: string; value: string }[];
  content: string;
  features: { icon: string; title: string; description: string }[];
  applications: { icon: string; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDesc: string;
  targetKeyword: string;
};

const EMPTY_FORM: FormState = {
  slug: "",
  category: "",
  badge: "",
  name: "",
  description: "",
  image: "",
  imageAlt: "",
  details: [],
  content: "",
  features: [],
  applications: [],
  faqs: [],
  metaTitle: "",
  metaDesc: "",
  targetKeyword: "",
};

function itemToForm(item: Product): FormState {
  return {
    slug: item.slug,
    category: item.category,
    badge: item.badge,
    name: item.name,
    description: item.description,
    image: item.image,
    imageAlt: item.imageAlt || "",
    details: item.details || [],
    content: item.content || "",
    features: item.features || [],
    applications: item.applications || [],
    faqs: item.faqs || [],
    metaTitle: item.metaTitle || "",
    metaDesc: item.metaDesc || "",
    targetKeyword: item.targetKeyword || "",
  };
}

function formToItem(form: FormState): Product {
  return {
    slug: form.slug,
    category: form.category,
    badge: form.badge,
    badgeClass: "bg-primary/10 text-primary",
    name: form.name,
    description: form.description,
    image: form.image,
    imageAlt: form.imageAlt || form.name,
    imageCover: false,
    href: `/products/${form.slug}`,
    details: form.details,
    content: form.content,
    features: form.features,
    applications: form.applications,
    faqs: form.faqs,
    metaTitle: form.metaTitle,
    metaDesc: form.metaDesc,
    targetKeyword: form.targetKeyword,
  };
}

export default function ProductEditorPage() {
  const router = useRouter();
  const params = useParams();
  
  // Safe extraction of slug from useParams
  const slugArray = params?.slug as string[] | undefined;
  const slugParam = slugArray?.[0];
  
  // If slugParam is "new", it's add mode. Otherwise, if it exists, it's edit mode.
  const mode = slugParam && slugParam !== "new" ? "edit" : "add";

  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [activeTab, setActiveTab] = useState<"basic" | "content" | "seo">("basic");

  // Image state
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [removeImage, setRemoveImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    if (mode === "edit" && slugParam) {
      const data = await getProducts();
      const product = data.find((p) => p.slug === slugParam);
      if (product) {
        setForm(itemToForm(product));
        setImagePreview(product.image ?? "");
      } else {
        setFormError("Produk tidak ditemukan.");
      }
    }
    setLoading(false);
  }, [mode, slugParam]);

  useEffect(() => { loadData(); }, [loadData]);

  function handleFormChange(key: keyof FormState, value: any) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "name" && mode === "add") {
        next.slug = slugify(value);
      }
      return next;
    });
  }

  // --- Dynamic Array Handlers ---
  const handleAddDetail = () => setForm((prev) => ({ ...prev, details: [...prev.details, { label: "", value: "" }] }));
  const handleRemoveDetail = (index: number) => setForm((prev) => ({ ...prev, details: prev.details.filter((_, i) => i !== index) }));
  const handleDetailChange = (index: number, key: "label" | "value", val: string) => setForm((prev) => {
    const newArr = [...prev.details];
    newArr[index] = { ...newArr[index], [key]: val };
    return { ...prev, details: newArr };
  });

  const handleAddFeature = () => setForm((prev) => ({ ...prev, features: [...prev.features, { icon: "star", title: "", description: "" }] }));
  const handleRemoveFeature = (index: number) => setForm((prev) => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  const handleFeatureChange = (index: number, key: "icon" | "title" | "description", val: string) => setForm((prev) => {
    const newArr = [...prev.features];
    newArr[index] = { ...newArr[index], [key]: val };
    return { ...prev, features: newArr };
  });

  const handleAddApp = () => setForm((prev) => ({ ...prev, applications: [...prev.applications, { icon: "business", title: "", desc: "" }] }));
  const handleRemoveApp = (index: number) => setForm((prev) => ({ ...prev, applications: prev.applications.filter((_, i) => i !== index) }));
  const handleAppChange = (index: number, key: "icon" | "title" | "desc", val: string) => setForm((prev) => {
    const newArr = [...prev.applications];
    newArr[index] = { ...newArr[index], [key]: val };
    return { ...prev, applications: newArr };
  });

  const handleAddFaq = () => setForm((prev) => ({ ...prev, faqs: [...prev.faqs, { question: "", answer: "" }] }));
  const handleRemoveFaq = (index: number) => setForm((prev) => ({ ...prev, faqs: prev.faqs.filter((_, i) => i !== index) }));
  const handleFaqChange = (index: number, key: "question" | "answer", val: string) => setForm((prev) => {
    const newArr = [...prev.faqs];
    newArr[index] = { ...newArr[index], [key]: val };
    return { ...prev, faqs: newArr };
  });
  // --------------------------------

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setRemoveImage(false);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    // Temporary set to form to immediately update live preview
    setForm((prev) => ({ ...prev, image: url }));
  }

  function handleRemoveImage() {
    setImageFile(null);
    setImagePreview("");
    setRemoveImage(true);
    setForm((prev) => ({ ...prev, image: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function uploadImageIfNeeded(slug: string): Promise<string | undefined> {
    if (removeImage) {
      await fetch("/api/products/upload", {
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
    const res = await fetch("/api/products/upload", { method: "POST", body: fd });
    setImageUploading(false);
    if (!res.ok) throw new Error("Upload gagal");
    const { url } = await res.json();
    return url;
  }

  function handleSave() {
    if (!form.name.trim() || !form.slug.trim() || !form.category.trim()) {
      setFormError("Nama Produk, slug, dan Kategori wajib diisi.");
      setActiveTab("basic");
      return;
    }
    startTransition(async () => {
      try {
        setFormError("");
        const imageUrl = await uploadImageIfNeeded(form.slug);
        const item = formToItem({ ...form, image: imageUrl ?? "" });
        if (mode === "add") {
          const res = await addProduct(item);
          if (!res.success) { setFormError(res.error ?? "Gagal menyimpan."); return; }
        } else {
          const res = await updateProduct(slugParam!, item);
          if (!res.success) { setFormError(res.error ?? "Gagal menyimpan."); return; }
        }
        router.push("/admin/products");
        router.refresh();
      } catch {
        setFormError("Terjadi kesalahan saat upload gambar.");
      }
    });
  }

  if (loading) {
    return <div className="p-12 text-center text-gray-400 font-bold">Memuat data editor...</div>;
  }

  // Convert current form to Product object for Live Preview
  const livePreviewProduct = formToItem(form);

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] -mx-2 -my-4 overflow-hidden">
      {/* Editor Header */}
      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 flex items-center justify-between shrink-0 z-10 shadow-sm mb-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 bg-gray-50 text-gray-500 hover:text-gray-800 rounded-lg transition-colors border border-gray-200">
            <span className="material-symbols-outlined text-sm block">arrow_back</span>
          </Link>
          <div>
            <h1 className="text-xl font-headline font-extrabold text-gray-900">
              {mode === "add" ? "Buat Halaman Produk Baru" : `Edit: ${form.name}`}
            </h1>
            <p className="text-xs text-gray-500">Live Preview Editor</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {formError && <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">{formError}</span>}
          <Link
            href="/admin/products"
            className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-200"
          >
            Batal
          </Link>
          <button
            onClick={handleSave}
            disabled={isPending || imageUploading}
            className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-all shadow-md disabled:opacity-50 flex items-center gap-2"
          >
            {isPending || imageUploading ? "Menyimpan..." : "Simpan Produk"}
          </button>
        </div>
      </div>

      {/* Split Screen Content */}
      <div className="flex-1 flex gap-6 overflow-hidden">
        
        {/* LEFT COLUMN: EDITOR */}
        <div className="w-1/2 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm z-10 overflow-hidden">
          {/* Tabs */}
          <div className="flex px-4 pt-4 border-b border-gray-100 shrink-0 overflow-x-auto custom-scrollbar">
            {[
              { id: "basic", label: "Info Dasar", icon: "info" },
              { id: "content", label: "Fitur & Spek", icon: "view_list" },
              { id: "seo", label: "Konten & SEO", icon: "search" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 pb-3 px-4 border-b-2 font-bold text-xs uppercase tracking-widest transition-colors ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-200"}`}
              >
                <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {/* TAB: BASIC INFO & IMAGE */}
            {activeTab === "basic" && (
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Nama Produk (H1) *</label>
                  <input 
                    type="text" 
                    value={form.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    placeholder="Contoh: Air Handling Unit" 
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-primary outline-none" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Slug (URL) *</label>
                  <input 
                    type="text" 
                    value={form.slug}
                    onChange={(e) => handleFormChange("slug", e.target.value)}
                    placeholder="air-handling-unit" 
                    className={`w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-primary outline-none font-mono text-xs ${mode === 'edit' ? 'bg-gray-50 text-gray-500' : ''}`} 
                    readOnly={mode === "edit"}
                    title={mode === "edit" ? "Slug tidak dapat diubah setelah produk dibuat" : ""}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Kategori *</label>
                    <input 
                      type="text" 
                      value={form.category}
                      onChange={(e) => handleFormChange("category", e.target.value)}
                      placeholder="Kategori" 
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-primary outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Badge / Merek</label>
                    <input 
                      type="text" 
                      value={form.badge}
                      onChange={(e) => handleFormChange("badge", e.target.value)}
                      placeholder="Contoh: FRIMEC" 
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-primary outline-none" 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Deskripsi Singkat (Teaser)</label>
                  <textarea 
                    rows={3} 
                    value={form.description}
                    onChange={(e) => handleFormChange("description", e.target.value)}
                    placeholder="Deskripsi singkat yang tampil di halaman utama produk..." 
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-primary outline-none resize-y" 
                  />
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-3">Gambar Utama Produk</label>
                  <div className="relative h-48 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center overflow-hidden mb-4">
                    {imagePreview ? (
                      <>
                        <Image
                          src={imagePreview}
                          alt="preview"
                          fill
                          className="object-contain p-2"
                          unoptimized={imagePreview.startsWith("blob:")}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-white text-gray-800 font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 hover:bg-gray-100 shadow-lg"
                          >
                            <span className="material-symbols-outlined text-sm">upload</span> Ganti
                          </button>
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 hover:bg-red-700 shadow-lg"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span> Hapus
                          </button>
                        </div>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center gap-2 text-gray-400 hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
                        <span className="text-xs font-bold">Pilih File Gambar</span>
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
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Alt Text Gambar</label>
                    <input 
                      type="text" 
                      value={form.imageAlt}
                      onChange={(e) => handleFormChange("imageAlt", e.target.value)}
                      placeholder="Deskripsi gambar untuk SEO" 
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-primary outline-none" 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CONTENT & FEATURES */}
            {activeTab === "content" && (
              <div className="space-y-8">
                {/* Spesifikasi / Details */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">Spesifikasi Teknis</h3>
                      <p className="text-[11px] text-gray-500">Tabel spesifikasi di halaman detail.</p>
                    </div>
                    <button type="button" onClick={handleAddDetail} className="bg-white border border-gray-200 text-gray-700 hover:text-primary hover:border-primary text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">add</span> Baris
                    </button>
                  </div>
                  <div className="space-y-2">
                    {form.details.length === 0 && <p className="text-xs text-gray-400 text-center py-2">Belum ada spesifikasi.</p>}
                    {form.details.map((detail, index) => (
                      <div key={index} className="flex gap-2">
                        <input type="text" value={detail.label} onChange={(e) => handleDetailChange(index, "label", e.target.value)} placeholder="Parameter" className="w-1/3 px-3 py-2 text-xs rounded-lg border border-gray-200 focus:border-primary outline-none" />
                        <input type="text" value={detail.value} onChange={(e) => handleDetailChange(index, "value", e.target.value)} placeholder="Nilai" className="flex-1 px-3 py-2 text-xs rounded-lg border border-gray-200 focus:border-primary outline-none" />
                        <button type="button" onClick={() => handleRemoveDetail(index)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"><span className="material-symbols-outlined text-[16px]">delete</span></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fitur Unggulan */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">Fitur Unggulan</h3>
                      <p className="text-[11px] text-gray-500">Kelebihan produk.</p>
                    </div>
                    <button type="button" onClick={handleAddFeature} className="bg-white border border-gray-200 text-gray-700 hover:text-primary hover:border-primary text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">add</span> Fitur
                    </button>
                  </div>
                  <div className="space-y-3">
                    {form.features.length === 0 && <p className="text-xs text-gray-400 text-center py-2">Belum ada fitur.</p>}
                    {form.features.map((feature, index) => (
                      <div key={index} className="flex gap-3 bg-white p-3 rounded-xl border border-gray-200 items-start shadow-sm">
                        <div className="w-20">
                          <input type="text" value={feature.icon} onChange={(e) => handleFeatureChange(index, "icon", e.target.value)} placeholder="Icon" className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 focus:border-primary outline-none font-mono text-center" />
                          <span className="material-symbols-outlined text-gray-400 text-2xl block text-center mt-2">{feature.icon || "star"}</span>
                        </div>
                        <div className="flex-1 space-y-2">
                          <input type="text" value={feature.title} onChange={(e) => handleFeatureChange(index, "title", e.target.value)} placeholder="Judul Fitur" className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-primary outline-none font-bold" />
                          <textarea rows={2} value={feature.description} onChange={(e) => handleFeatureChange(index, "description", e.target.value)} placeholder="Deskripsi fitur..." className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 focus:border-primary outline-none resize-y" />
                        </div>
                        <button type="button" onClick={() => handleRemoveFeature(index)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"><span className="material-symbols-outlined text-[16px] block">close</span></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Aplikasi Industri */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">Aplikasi / Industri</h3>
                    </div>
                    <button type="button" onClick={handleAddApp} className="bg-white border border-gray-200 text-gray-700 hover:text-primary hover:border-primary text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">add</span> Aplikasi
                    </button>
                  </div>
                  <div className="space-y-3">
                    {form.applications.length === 0 && <p className="text-xs text-gray-400 text-center py-2">Belum ada data aplikasi.</p>}
                    {form.applications.map((app, index) => (
                      <div key={index} className="flex gap-2 bg-white p-3 rounded-xl border border-gray-200 items-start shadow-sm">
                        <input type="text" value={app.icon} onChange={(e) => handleAppChange(index, "icon", e.target.value)} placeholder="Icon" className="w-16 px-2 py-2 text-xs rounded-lg border border-gray-200 focus:border-primary outline-none font-mono text-center" />
                        <div className="flex-1 space-y-2">
                          <input type="text" value={app.title} onChange={(e) => handleAppChange(index, "title", e.target.value)} placeholder="Sektor (Misal: Rumah Sakit)" className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-primary outline-none font-bold" />
                          <input type="text" value={app.desc} onChange={(e) => handleAppChange(index, "desc", e.target.value)} placeholder="Deskripsi singkat..." className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 focus:border-primary outline-none" />
                        </div>
                        <button type="button" onClick={() => handleRemoveApp(index)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"><span className="material-symbols-outlined text-[16px] block">close</span></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQs */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">FAQ Produk</h3>
                    </div>
                    <button type="button" onClick={handleAddFaq} className="bg-white border border-gray-200 text-gray-700 hover:text-primary hover:border-primary text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">add</span> FAQ
                    </button>
                  </div>
                  <div className="space-y-3">
                    {form.faqs.length === 0 && <p className="text-xs text-gray-400 text-center py-2">Belum ada FAQ.</p>}
                    {form.faqs.map((faq, index) => (
                      <div key={index} className="flex gap-3 bg-white p-3 rounded-xl border border-gray-200 items-start shadow-sm">
                        <div className="flex-1 space-y-2">
                          <input type="text" value={faq.question} onChange={(e) => handleFaqChange(index, "question", e.target.value)} placeholder="Pertanyaan?" className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-primary outline-none font-bold" />
                          <textarea rows={2} value={faq.answer} onChange={(e) => handleFaqChange(index, "answer", e.target.value)} placeholder="Jawaban..." className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 focus:border-primary outline-none resize-y" />
                        </div>
                        <button type="button" onClick={() => handleRemoveFaq(index)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors mt-6"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SEO & KONTEN */}
            {activeTab === "seo" && (
              <div className="space-y-8">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Deskripsi Panjang (SEO Text)</label>
                  <p className="text-[11px] text-gray-400 mb-3">Teks narasi panjang ini akan muncul setelah judul produk, sangat bagus untuk penjelasan komprehensif dan SEO.</p>
                  <textarea 
                    rows={12} 
                    value={form.content}
                    onChange={(e) => handleFormChange("content", e.target.value)}
                    placeholder="Solusi pengolahan udara terpusat untuk gedung komersial, rumah sakit..." 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none resize-y leading-relaxed text-sm" 
                  />
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm">Meta Data (SEO)</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Meta Title</label>
                      <input 
                        type="text" 
                        value={form.metaTitle}
                        onChange={(e) => handleFormChange("metaTitle", e.target.value)}
                        placeholder="Air Handling Unit (AHU) | PAS HVAC" 
                        className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 focus:border-primary outline-none" 
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Target Keyword</label>
                      <input 
                        type="text" 
                        value={form.targetKeyword}
                        onChange={(e) => handleFormChange("targetKeyword", e.target.value)}
                        placeholder="Air Handling Unit Surabaya" 
                        className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 focus:border-primary outline-none" 
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Meta Description</label>
                      <textarea 
                        rows={3} 
                        value={form.metaDesc}
                        onChange={(e) => handleFormChange("metaDesc", e.target.value)}
                        placeholder="Solusi AHU custom untuk gedung komersial, rumah sakit..." 
                        className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 focus:border-primary outline-none resize-none" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE PREVIEW */}
        <div className="w-1/2 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          {/* Browser Mockup Header */}
          <div className="bg-gray-50 border-b border-gray-200 p-3 flex items-center gap-3 shrink-0">
             <div className="flex gap-1.5 pl-1">
               <div className="w-3 h-3 rounded-full bg-red-400"></div>
               <div className="w-3 h-3 rounded-full bg-amber-400"></div>
               <div className="w-3 h-3 rounded-full bg-green-400"></div>
             </div>
             <div className="bg-white border border-gray-200 rounded-md px-4 py-1.5 text-[11px] text-gray-500 font-mono w-full max-w-sm mx-auto flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                https://www.pramerta.co.id/products/{form.slug || "slug"}
             </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-white custom-scrollbar relative">
            <div className="pointer-events-none select-none">
              <ProductView product={livePreviewProduct} hideNavigation={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
