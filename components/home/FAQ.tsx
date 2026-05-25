"use client";

import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

const defaultFaqs: FAQItem[] = [
  {
    question: "Apa spesialisasi layanan HVAC dari PT. Pratama Amerta Solusi?",
    answer: "Kami berspesialisasi dalam penyediaan, fabrikasi, instalasi, dan pemeliharaan sistem tata udara (HVAC) untuk sektor komersial dan industri berskala menengah-besar. Fokus kami mencakup Air Handling Unit (AHU), Chiller System, VRF System, serta ducting (Sheet Metal & Textile Duct).",
  },
  {
    question: "Apakah PAS HVAC melayani proyek di luar Surabaya dan Jakarta?",
    answer: "Ya, kami melayani proyek instalasi dan konsultasi HVAC di seluruh wilayah Indonesia, mulai dari area industri di Jawa, Sumatera, hingga area pertambangan dan smelter di Indonesia Timur.",
  },
  {
    question: "Apa saja merek peralatan HVAC yang didistribusikan oleh PAS HVAC?",
    answer: "Kami adalah Authorized Distributor untuk merek FRIMEC (solusi AHU dan Chiller industrial) serta GREE (khusus untuk sistem VRF komersial). Namun, untuk ducting dan aksesoris lainnya, kami menggunakan material standar pabrikasi kami yang mematuhi standar SMACNA.",
  },
  {
    question: "Apakah PAS HVAC menyediakan garansi purna jual?",
    answer: "Tentu. Setiap pemasangan baru dari PAS HVAC dilindungi dengan garansi unit dan kompresor dari pabrikan (biasanya 1 hingga 3 tahun tergantung merek), serta garansi instalasi langsung dari kami. Kami juga menawarkan kontrak pemeliharaan berkala (Preventive Maintenance).",
  },
  {
    question: "Bagaimana cara mendapatkan penawaran untuk proyek saya?",
    answer: "Anda dapat menghubungi kami melalui tombol 'WhatsApp' di situs ini atau mengisi formulir konsultasi di halaman utama. Tim engineer kami akan mempelajari kebutuhan beban pendinginan Anda, melakukan survei lapangan bila diperlukan, dan memberikan penawaran RAB (Rencana Anggaran Biaya) secara komprehensif.",
  },
];

interface FAQProps {
  items?: FAQItem[];
  title?: string;
  description?: string;
  badge?: string;
  className?: string;
}

export default function FAQ({
  items = defaultFaqs,
  title = "Frequently Asked Questions",
  description = "Temukan jawaban atas pertanyaan umum seputar layanan pemasangan HVAC, produk, dan garansi dari PAS HVAC.",
  badge = "Pertanyaan Umum",
  className = "py-20 bg-white",
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section className={className}>
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-4">
              <span className="material-symbols-outlined text-blue-600 text-sm">help</span>
              <span className="text-blue-700 text-[10px] font-extrabold uppercase tracking-widest">
                {badge}
              </span>
            </div>
          )}
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              {description}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border transition-all duration-300 rounded-2xl overflow-hidden ${
                  isOpen ? "border-blue-500 shadow-md bg-white" : "border-gray-200 bg-gray-50 hover:bg-white"
                }`}
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className={`font-bold text-base md:text-lg ${isOpen ? "text-blue-700" : "text-slate-800"}`}>
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "bg-blue-100 text-blue-600 rotate-180" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">expand_more</span>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed text-sm md:text-base border-t border-gray-100 mt-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
