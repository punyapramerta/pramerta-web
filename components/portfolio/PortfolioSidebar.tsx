"use client";

import Link from "next/link";
import { useLeadForm } from "@/hooks/useLeadForm";
import { useAppData } from "@/hooks/useAppData";

const recentArticles = [
  {
    slug: "cara-memilih-chiller-yang-tepat",
    category: "Panduan",
    title: "Cara Memilih Chiller yang Tepat untuk Industri Manufaktur",
    date: "15 April 2025",
  },
  {
    slug: "perbedaan-ahu-dan-fcu",
    category: "Edukasi",
    title: "Perbedaan Air Handling Unit (AHU) dan Fan Coil Unit (FCU)",
    date: "10 April 2025",
  },
  {
    slug: "keunggulan-vrf-system",
    category: "Produk",
    title: "Keunggulan VRF System untuk Gedung Komersial Besar",
    date: "5 April 2025",
  }
];

export default function PortfolioSidebar() {
  const { leadForm } = useAppData();
  const { 
    register, 
    onSubmit, 
    submitted, 
    errors, 
    isSubmitting 
  } = useLeadForm("portfolio_sidebar");

  return (
    <aside className="w-full lg:w-1/3 xl:w-[30%] space-y-8">
      <div className="sticky top-24 space-y-8">
        
        {/* Portfolio Form */}
        {submitted ? (
          <div className="bg-white rounded-3xl border border-neutral-100 p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-primary-600">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <h3 className="text-xl font-extrabold text-neutral-900 mb-2">Pesan Terkirim!</h3>
            <p className="text-sm text-neutral-500">Tim engineer kami akan segera menghubungi Anda melalui WhatsApp.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-neutral-100 p-8 shadow-xl shadow-primary-500/5">
            <h3 className="text-xl font-headline font-extrabold text-neutral-900 mb-2 leading-tight">
              Konsultasi Proyek Anda
            </h3>
            <p className="text-sm text-neutral-500 mb-6 font-body leading-relaxed">
              Diskusikan kebutuhan instalasi atau maintenance sistem tata udara dengan engineer kami.
            </p>

            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1.5">Nama Lengkap</label>
                <input
                  {...register("nama")}
                  type="text"
                  placeholder="Cth: John Doe"
                  className="w-full px-4 py-3 text-sm font-bold border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-neutral-50 placeholder:text-neutral-400 transition-all"
                />
                {errors.nama && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.nama.message}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1.5">Nomor WhatsApp</label>
                <input
                  {...register("whatsapp")}
                  type="tel"
                  placeholder="Cth: 08123456789"
                  className="w-full px-4 py-3 text-sm font-bold border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-neutral-50 placeholder:text-neutral-400 transition-all"
                />
                {errors.whatsapp && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.whatsapp.message}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1.5">Kebutuhan</label>
                <div className="relative">
                  <select
                    {...register("kebutuhan")}
                    className="w-full px-4 py-3 text-sm font-bold border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-neutral-50 text-neutral-900 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">-- Pilih --</option>
                    {leadForm.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">expand_more</span>
                </div>
                {errors.kebutuhan && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.kebutuhan.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-tertiary-600 hover:bg-tertiary-700 text-white font-extrabold py-3.5 px-6 rounded-xl transition-all duration-300 text-sm mt-2 active:scale-[0.98] disabled:opacity-60 shadow-lg shadow-tertiary-500/20"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Permintaan"}
              </button>
            </form>
          </div>
        )}
        
        {/* Latest Articles */}
        <div className="bg-white rounded-3xl border border-neutral-200/60 p-6 shadow-sm">
          <h3 className="text-[14px] font-extrabold text-neutral-900 uppercase tracking-widest mb-6 border-b border-neutral-100 pb-4">
            Insight Terbaru
          </h3>
          
          <div className="space-y-5">
            {recentArticles.map((article) => (
              <Link 
                href={`/blog/${article.slug}`} 
                key={article.slug} 
                className="group flex gap-4 items-center"
              >
                <div className="w-20 h-20 rounded-xl bg-neutral-100 shrink-0 overflow-hidden relative">
                   <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
                   <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-300">
                     feed
                   </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-primary uppercase tracking-wider mb-1 block">
                    {article.category}
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900 leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-[10px] text-neutral-400 font-medium">
                    {article.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/blog" className="block w-full text-center mt-6 py-3 rounded-xl border-2 border-neutral-100 text-xs font-extrabold text-neutral-600 hover:bg-neutral-50 hover:border-neutral-200 uppercase tracking-widest transition-all">
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </aside>
  );
}
