"use client";

import { useLeadForm } from "@/hooks/useLeadForm";
import { useAppData } from "@/hooks/useAppData";
import { cn } from "@/lib/utils";
import { WA_NUMBER } from "@/lib/repositories/dataRepository";

export default function Hero() {
  const { hero, leadForm } = useAppData();
  const { 
    register, 
    onSubmit, 
    submitted, 
    errors, 
    isSubmitting 
  } = useLeadForm("hero");

  return (
    <section className="relative overflow-hidden py-28 flex items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
      {/* Subtle overlay for the background image */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-6 bg-white/75 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-white/60 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
            <span className="material-symbols-outlined text-primary text-base fill-1">verified</span>
            <span className="text-xs font-bold font-label uppercase tracking-widest text-primary">
              {hero.badge}
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-[3.5rem] font-extrabold font-headline leading-[1.1] tracking-tight text-on-background">
            {hero.title.split(hero.accentWord)[0]}
            <span className="text-primary"> {hero.accentWord}</span>
            {hero.title.split(hero.accentWord)[1]}
          </h1>
          
          <p className="text-base text-on-surface-variant max-w-xl leading-relaxed">
            {hero.description}
          </p>
          
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo PAS HVAC, saya ingin melihat katalog produk HVAC Anda.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-on-primary px-7 py-3 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
            >
              Lihat Katalog Produk
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo PAS HVAC, saya ingin konsultasi teknis mengenai kebutuhan HVAC kami.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary border border-primary/20 px-7 py-3 rounded-lg font-bold text-sm hover:bg-primary/5 transition-all active:scale-95"
            >
              Konsultasi Teknis
            </a>
          </div>
        </div>

        {/* Right Content: Lead Capture Form Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/10 p-8 border border-gray-100">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
              </div>
              <h3 className="text-2xl font-bold font-headline">{leadForm.right.successTitle}</h3>
              <p className="text-on-surface-variant">{leadForm.right.successDescription}</p>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-extrabold font-headline mb-6 text-on-surface">{leadForm.right.title}</h3>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Nama Lengkap</label>
                    <input 
                      {...register("nama")}
                      className={cn(
                        "w-full bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm p-3 transition-all outline-none",
                        errors.nama && "border-red-400 ring-red-100"
                      )} 
                      placeholder="John Doe" 
                      type="text"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Nama Perusahaan</label>
                    <input 
                      {...register("perusahaan")}
                      className={cn(
                        "w-full bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm p-3 transition-all outline-none",
                        errors.perusahaan && "border-red-400 ring-red-100"
                      )} 
                      placeholder="PT. Industri Maju" 
                      type="text"
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Nomor WhatsApp</label>
                  <input 
                    {...register("whatsapp")}
                    className={cn(
                      "w-full bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm p-3 transition-all outline-none",
                      errors.whatsapp && "border-red-400 ring-red-100"
                    )} 
                    placeholder="0812 3456 789" 
                    type="tel"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Kebutuhan HVAC</label>
                  <div className="relative">
                    <select 
                      {...register("kebutuhan")}
                      className={cn(
                        "w-full bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm p-3 transition-all outline-none appearance-none cursor-pointer",
                        errors.kebutuhan && "border-red-400 ring-red-100"
                      )}
                    >
                      <option value="">Pilih Jenis Produk</option>
                      {leadForm.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-lg">expand_more</span>
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-on-primary py-3.5 rounded-lg font-bold mt-2 hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-primary/20 text-sm"
                >
                  {isSubmitting ? "Mengirim..." : leadForm.right.submitButton}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
