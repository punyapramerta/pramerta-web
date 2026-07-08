"use client";

import { useId } from "react";
import { useLeadForm } from "@/hooks/useLeadForm";
import { useAppData } from "@/hooks/useAppData";

export default function BlogSidebarForm() {
  const formId = useId();
  const { leadForm } = useAppData();
  const { 
    register, 
    onSubmit, 
    submitted, 
    errors, 
    isSubmitting 
  } = useLeadForm("blog_sidebar");

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl border border-neutral-100 p-8 shadow-sm text-center">
        <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-primary-600">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-extrabold text-neutral-900 mb-2">Pesan Terkirim!</h3>
        <p className="text-sm text-neutral-500">Tim engineer kami akan segera menghubungi Anda melalui WhatsApp.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-neutral-100 p-8 shadow-xl shadow-primary-500/5">
      <h3 className="text-xl font-headline font-extrabold text-neutral-900 mb-2 leading-tight">
        Dapatkan Penawaran Khusus
      </h3>
      <p className="text-sm text-neutral-500 mb-6 font-body leading-relaxed">
        Konsultasikan kebutuhan sistem pendingin industrial Anda dengan ahli kami.
      </p>

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor={`${formId}-nama`} className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1.5">Nama Lengkap</label>
          <input
            id={`${formId}-nama`}
            {...register("nama")}
            type="text"
            placeholder="Cth: John Doe"
            className="w-full px-4 py-3 text-sm font-bold border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-neutral-50 placeholder:text-neutral-400 transition-all"
          />
          {errors.nama && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.nama.message}</p>}
        </div>

        <div>
          <label htmlFor={`${formId}-whatsapp`} className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1.5">Nomor WhatsApp</label>
          <input
            id={`${formId}-whatsapp`}
            {...register("whatsapp")}
            type="tel"
            placeholder="Cth: 08123456789"
            className="w-full px-4 py-3 text-sm font-bold border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-neutral-50 placeholder:text-neutral-400 transition-all"
          />
          {errors.whatsapp && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.whatsapp.message}</p>}
        </div>

        <div>
          <label htmlFor={`${formId}-kebutuhan`} className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1.5">Kebutuhan</label>
          <div className="relative">
            <select
              id={`${formId}-kebutuhan`}
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
          className="w-full bg-primary hover:bg-primary/90 text-white font-extrabold py-3.5 px-6 rounded-xl transition-all duration-300 text-sm mt-2 active:scale-[0.98] disabled:opacity-60 shadow-lg shadow-primary/20"
        >
          {isSubmitting ? "Mengirim..." : "Kirim Permintaan"}
        </button>
      </form>
    </div>
  );
}
