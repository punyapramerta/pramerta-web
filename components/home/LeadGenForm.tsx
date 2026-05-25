"use client";

import { useLeadForm } from "@/hooks/useLeadForm";
import { useAppData } from "@/hooks/useAppData";

export default function LeadGenForm() {
  const { leadForm, company } = useAppData();
  const { 
    register, 
    onSubmit, 
    submitted, 
    errors, 
    isSubmitting 
  } = useLeadForm("bottom");

  return (
    <section className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #042358 0%, #0056D2 50%, #546E7A 100%)" }}>

      {/* Orbs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #0056D2, transparent)" }} />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #A93802, transparent)" }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT: Benefits ── */}
          <div className="text-white">
            <span className="glass-pill inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-[10px] font-bold text-white tracking-[0.1em] uppercase border border-white/10">
              <span className="w-2 h-2 rounded-full bg-tertiary-400 animate-pulse shrink-0" />
              {leadForm.left.badge}
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold leading-[1.1] mb-6 tracking-tight">
              {leadForm.left.title.split("Terbaik")[0]}
              <span className="block text-tertiary-400">Terbaik untuk Bisnis Anda?</span>
            </h2>
            <p className="text-white/70 mb-10 leading-relaxed font-body text-lg">
              {leadForm.left.description}
            </p>

            <ul className="space-y-4">
              {leadForm.left.benefits.map((b) => (
                <li key={b.text}>
                  <div className="glass flex items-center gap-4 rounded-2xl px-5 py-4 border border-white/5 hover:bg-white/10 transition-all duration-300 group">
                    <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">{b.icon}</span>
                    <span className="text-sm font-bold text-white/90">{b.text}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-12 pt-10 border-t border-white/10">
              <p className="text-[10px] text-white/40 mb-5 font-extrabold uppercase tracking-widest">Atau hubungi kami langsung:</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/${company.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#22bf5b] text-white text-sm font-extrabold px-6 py-4 rounded-2xl transition-all shadow-xl shadow-[#25D366]/20 active:scale-[0.98]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.528 5.836L.057 23.999l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.005-1.373l-.36-.214-3.727.977.995-3.636-.235-.374A9.818 9.818 0 1112 21.818z" />
                  </svg>
                  Chat WhatsApp
                </a>
                <a
                  href={`tel:${company.contact.office.replace(/-/g, "")}`}
                  className="inline-flex items-center gap-3 glass hover:bg-white/10 text-white text-sm font-extrabold px-6 py-4 rounded-2xl border border-white/10 transition-all active:scale-[0.98]"
                >
                  <span className="text-lg">📞</span> {company.contact.office}
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Glass Form ── */}
          <div className="glass-form rounded-[2.5rem] p-8 md:p-10 shadow-3xl shadow-black/30 relative overflow-hidden">
            {/* Top light beam decoration */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary-500 via-tertiary-400 to-secondary-500 opacity-60" />

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-primary-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary-500/10">
                  <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold text-neutral-900 mb-3">{leadForm.right.successTitle}</h3>
                <p className="text-neutral-500 font-medium leading-relaxed">{leadForm.right.successDescription}</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-extrabold text-neutral-900 mb-2 tracking-tight">{leadForm.right.title}</h3>
                <p className="text-sm text-neutral-500 font-medium mb-8 leading-relaxed">{leadForm.right.subtitle}</p>

                <form onSubmit={onSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        {...register("nama")}
                        type="text"
                        placeholder="Nama Anda"
                        className="w-full px-5 py-4 text-sm font-bold border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-neutral-50 placeholder:text-neutral-400 transition-all font-body"
                      />
                      {errors.nama && <p className="text-red-500 text-[10px] mt-1.5 font-bold ml-2 uppercase tracking-wide">{errors.nama.message}</p>}
                    </div>
                    <div>
                      <input
                        {...register("perusahaan")}
                        type="text"
                        placeholder="Nama Perusahaan"
                        className="w-full px-5 py-4 text-sm font-bold border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-neutral-50 placeholder:text-neutral-400 transition-all font-body"
                      />
                      {errors.perusahaan && <p className="text-red-500 text-[10px] mt-1.5 font-bold ml-2 uppercase tracking-wide">{errors.perusahaan.message}</p>}
                    </div>
                  </div>

                  <div>
                    <input
                      {...register("whatsapp")}
                      type="tel"
                      placeholder="Nomor WhatsApp"
                      className="w-full px-5 py-4 text-sm font-bold border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-neutral-50 placeholder:text-neutral-400 transition-all font-body"
                    />
                    {errors.whatsapp && <p className="text-red-500 text-[10px] mt-1.5 font-bold ml-2 uppercase tracking-wide">{errors.whatsapp.message}</p>}
                  </div>

                  <div>
                    <select
                      {...register("kebutuhan")}
                      className="w-full px-5 py-4 text-sm font-bold border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-neutral-50 text-neutral-900 transition-all appearance-none cursor-pointer font-body"
                    >
                      <option value="">-- Pilih Jenis Kebutuhan --</option>
                      {leadForm.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {errors.kebutuhan && <p className="text-red-500 text-[10px] mt-1.5 font-bold ml-2 uppercase tracking-wide">{errors.kebutuhan.message}</p>}
                  </div>

                  <div>
                    <textarea
                      {...register("pesan")}
                      rows={3}
                      placeholder="Keterangan tambahan (kapasitas, lokasi, dll)"
                      className="w-full px-5 py-4 text-sm font-bold border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-neutral-50 placeholder:text-neutral-400 resize-none transition-all font-body"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-extrabold py-4.5 px-6 rounded-2xl transition-all duration-300 text-sm mt-3 text-white shadow-xl shadow-tertiary-500/40 hover:shadow-2xl hover:bg-tertiary-600 active:scale-[0.98] disabled:opacity-60 disabled:transform-none"
                    style={{ background: "#A93802" }}
                  >
                    {isSubmitting ? "Mengirim..." : leadForm.right.submitButton}
                  </button>

                  <div className="flex items-center gap-4 py-2">
                    <div className="flex-1 h-px bg-neutral-200" />
                    <span className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-widest">Atau</span>
                    <div className="flex-1 h-px bg-neutral-200" />
                  </div>

                  <a
                    href={`https://wa.me/${company.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full border-2 border-primary-800 text-primary-800 hover:bg-primary-800 hover:text-white hover:border-primary-800 font-extrabold py-4 px-6 rounded-2xl transition-all duration-300 text-sm active:scale-[0.98]"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.528 5.836L.057 23.999l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.005-1.373l-.36-.214-3.727.977.995-3.636-.235-.374A9.818 9.818 0 1112 21.818z" />
                    </svg>
                    {leadForm.right.whatsappButton}
                  </a>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
