"use client";

import { useState, useId } from "react";
import { useLeadForm } from "@/hooks/useLeadForm";
import { useAppData } from "@/hooks/useAppData";
import { cn } from "@/lib/utils";
import { WA_NUMBER } from "@/lib/repositories/dataRepository";

export default function Hero() {
  const formId = useId();
  const { hero, leadForm } = useAppData();
  const { 
    register, 
    handleSubmit,
    submitDirectly,
    getValues,
    submitted, 
    errors, 
    isSubmitting 
  } = useLeadForm("hero");

  const [showPopup, setShowPopup] = useState(false);

  const onFirstStep = () => {
    setShowPopup(true);
  };

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
              <form onSubmit={handleSubmit(onFirstStep)} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label htmlFor={`${formId}-nama`} className="text-[10px] font-bold text-outline uppercase tracking-widest">Nama Lengkap</label>
                    <input 
                      id={`${formId}-nama`}
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
                    <label htmlFor={`${formId}-perusahaan`} className="text-[10px] font-bold text-outline uppercase tracking-widest">Nama Perusahaan</label>
                    <input 
                      id={`${formId}-perusahaan`}
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
                  <label htmlFor={`${formId}-whatsapp`} className="text-[10px] font-bold text-outline uppercase tracking-widest">Nomor WhatsApp</label>
                  <input 
                    id={`${formId}-whatsapp`}
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
                  <label htmlFor={`${formId}-kebutuhan`} className="text-[10px] font-bold text-outline uppercase tracking-widest">Kebutuhan HVAC</label>
                  <div className="relative">
                    <select 
                      id={`${formId}-kebutuhan`}
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

      {/* Confirmation & Description Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-headline font-extrabold text-on-surface">Detail Kebutuhan</h3>
              <button type="button" onClick={() => setShowPopup(false)} className="text-gray-400 hover:text-gray-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Ceritakan sedikit detail tentang kebutuhan sistem tata udara di tempat Anda agar kami dapat memberikan solusi yang paling tepat.
            </p>
            
            <div className="space-y-1.5 mb-6">
              <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Deskripsi Singkat (Opsional)</label>
              <textarea 
                {...register("pesan")}
                rows={4}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm p-3 transition-all outline-none resize-none"
                placeholder="Contoh: Kami membutuhkan pendingin untuk area produksi seluas 500m2..."
              ></textarea>
            </div>

            <div className="flex gap-3">
              <button 
                type="button"
                onClick={() => setShowPopup(false)}
                className="flex-1 bg-white border border-gray-200 text-gray-700 py-3.5 rounded-lg font-bold hover:bg-gray-50 transition-all text-sm"
              >
                Batal
              </button>
              <button 
                type="button"
                disabled={isSubmitting}
                onClick={async () => {
                  await submitDirectly(getValues());
                  setShowPopup(false);
                }}
                className="flex-[2] bg-[#25D366] text-white py-3.5 rounded-lg font-bold hover:bg-[#22bf5b] transition-all flex justify-center items-center gap-2 shadow-lg shadow-[#25D366]/20 text-sm disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.528 5.836L.057 23.999l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.005-1.373l-.36-.214-3.727.977.995-3.636-.235-.374A9.818 9.818 0 1112 21.818z"/>
                </svg>
                Konsultasi Gratis
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
