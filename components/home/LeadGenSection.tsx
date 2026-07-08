"use client";

import { useLeadForm } from "@/hooks/useLeadForm";
import { leadFormData, companyData } from "@/lib/repositories/dataRepository";
import { cn } from "@/lib/utils";

export default function LeadGenSection() {
  const { register, onSubmit, submitted, errors, isSubmitting } = useLeadForm("footer");
  const data = leadFormData.left;

  const waLink = `https://wa.me/${companyData.contact.whatsapp}?text=${encodeURIComponent("Halo PAS HVAC, saya ingin berkonsultasi mengenai solusi HVAC untuk kebutuhan industri kami.")}`;

  return (
    <section id="contact" className="py-16 px-8" style={{ background: "#f4f7ff" }}>
      <div className="max-w-7xl mx-auto">
        {/* Blue container */}
        <div className="rounded-3xl overflow-hidden relative shadow-2xl shadow-primary/30" style={{ background: "#1A3EB4" }}>
          {/* Decorative circle */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 -mr-40 -mt-40" style={{ background: "white" }}></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side: CTA text + contact info */}
            <div className="p-10 lg:p-14 text-white space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Konsultasi Gratis</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold font-headline leading-tight">
                {data.title}
              </h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-md">
                {data.description}
              </p>
              
              <div className="space-y-4 pt-4">
                {data.benefits.map((benefit) => (
                  <div key={benefit.text} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-white text-xl fill-1">{benefit.icon}</span>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{benefit.description}</div>
                      <div className="font-bold text-sm text-white">{benefit.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Form Card */}
            <div className="p-10 lg:p-14 flex items-center">
              <div className="bg-white rounded-2xl p-8 shadow-2xl text-on-surface w-full">
                {submitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                      <span className="material-symbols-outlined text-3xl">check_circle</span>
                    </div>
                    <h3 className="text-xl font-bold font-headline">Pesan Terkirim!</h3>
                    <p className="text-on-surface-variant text-sm">Tim kami akan segera menghubungi Anda kembali.</p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-3">
                    <input 
                      aria-label="Nama Lengkap"
                      {...register("nama")}
                      className={cn(
                        "w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none",
                        errors.nama && "border-red-300 ring-2 ring-red-100"
                      )} 
                      placeholder="Nama Lengkap" 
                      type="text"
                    />
                    <input 
                      aria-label="Nama Perusahaan"
                      {...register("perusahaan")}
                      className={cn(
                        "w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none",
                        errors.perusahaan && "border-red-300 ring-2 ring-red-100"
                      )} 
                      placeholder="Nama Perusahaan" 
                      type="text"
                    />
                    <input 
                      aria-label="Nomor WhatsApp"
                      {...register("whatsapp")}
                      className={cn(
                        "w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none",
                        errors.whatsapp && "border-red-300 ring-2 ring-red-100"
                      )} 
                      placeholder="Nomor WhatsApp" 
                      type="tel"
                    />
                    <select 
                      aria-label="Kebutuhan"
                      {...register("kebutuhan")}
                      className={cn(
                        "w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none cursor-pointer",
                        errors.kebutuhan && "border-red-300 ring-2 ring-red-100"
                      )}
                    >
                      <option value="">Pilih Jenis Produk</option>
                      {leadFormData.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    
                    <div className="pt-2 space-y-3">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-black transition-all active:scale-[0.98]"
                      >
                        {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                      </button>
                      <a 
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-all active:scale-[0.98]"
                        style={{ background: "#25D366" }}
                      >
                        <span className="material-symbols-outlined text-lg">chat</span>
                        WhatsApp Us
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
