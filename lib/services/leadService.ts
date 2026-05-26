import { event } from "@/lib/gtag";
import { WA_NUMBER } from "@/lib/repositories/dataRepository";
import { supabase } from "@/lib/supabase/client";

export interface LeadFormData {
  nama: string;
  perusahaan?: string;
  whatsapp: string;
  kebutuhan: string;
  pesan?: string;
}

export const leadService = {
  /**
   * Send lead data to WhatsApp and trigger analytics
   */
  async submitLead(
    data: LeadFormData,
    source: "hero" | "footer" | "bottom" | "blog_sidebar" | "portfolio_sidebar" | "portfolio_bottom"
  ): Promise<void> {
    // 1. Save to Supabase (fire-and-forget, don't block WhatsApp on failure)
    supabase.from("leads").insert({
      nama: data.nama,
      whatsapp: data.whatsapp,
      kebutuhan: data.kebutuhan,
      pesan: data.pesan ?? null,
      source,
    }).then(({ error }) => {
      if (error) console.error("Lead insert failed:", error.message);
    });

    // 2. Trigger Analytics
    event({
      action: `lead_form_${source}`,
      category: "lead_gen",
      label: data.kebutuhan,
    });

    // 2. Format Message
    let message = "";
    if (source === "hero") {
      message = `Halo PAS HVAC,\n\nNama: ${data.nama}\nPerusahaan: ${data.perusahaan}\nKebutuhan: ${data.kebutuhan}\n\nSaya ingin mendapatkan penawaran harga. Mohon dihubungi kembali.\n\nNo. WA: ${data.whatsapp}`;
    } else if (source === "blog_sidebar" || source === "portfolio_sidebar" || source === "portfolio_bottom") {
      // Short sidebar/bottom form — no perusahaan or pesan fields
      message = `Halo PAS HVAC,\n\nNama: ${data.nama}\nNo. WA: ${data.whatsapp}\nKebutuhan: ${data.kebutuhan}\n\nSaya tertarik dengan layanan Anda. Mohon dihubungi kembali. Terima kasih.`;
    } else {
      message = `Halo PAS HVAC,\n\nNama: ${data.nama}\nPerusahaan: ${data.perusahaan}\nNo. WA: ${data.whatsapp}\nKebutuhan: ${data.kebutuhan}${
        data.pesan ? `\n\nKeterangan: ${data.pesan}` : ""
      }\n\nMohon berikan penawaran harga terbaik. Terima kasih.`;
    }

    const encodedMsg = encodeURIComponent(message);
    
    // 3. Open WhatsApp
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodedMsg}`, "_blank");
  },
};
