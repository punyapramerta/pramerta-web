import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortfolioSidebar from "@/components/portfolio/PortfolioSidebar";

export const metadata: Metadata = {
  title: "Portfolio | Solusi Tata Udara untuk Industri Jasa & Manufaktur",
  description:
    "Lihat berbagai proyek sukses kami dalam menghadirkan solusi instalasi chiller, AHU, dan sistem HVAC untuk kebutuhan industri jasa dan manufaktur.",
};

import { portfolioData } from "@/lib/repositories/dataRepository";

export default function PortfolioPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pramerta.co.id" },
      { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://www.pramerta.co.id/portfolio" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="min-h-screen bg-[#F9FAFB]">
        
        {/* ── HERO SECTION ── */}
        <section className="relative pt-32 pb-24 overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
          {/* Subtle overlay for the background image to ensure text legibility */}
          <div className="absolute inset-0 bg-primary-900/80 pointer-events-none"></div>
          
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-tertiary-500/20 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/2 -left-20 w-72 h-72 bg-primary-500/30 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6 text-tertiary-300 border border-tertiary-400/30 bg-tertiary-500/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-400 animate-pulse" />
              Project Showcase
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-headline font-extrabold mb-6 tracking-tight leading-[1.1] max-w-4xl mx-auto">
              Solusi Tata Udara untuk <br className="hidden md:block" />
              <span className="text-white">Industri Jasa & Manufaktur</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto font-body leading-relaxed mb-8">
              Jelajahi rekam jejak sukses kami dalam menghadirkan sistem HVAC yang efisien, handal, dan berstandar internasional untuk berbagai skala bisnis.
            </p>
          </div>
        </section>

        {/* ── MAIN CONTENT (2 COLUMNS) ── */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-10">
              
              {/* LEFT COLUMN: Portfolio List */}
              <div className="w-full lg:w-2/3 xl:w-[70%]">
                
                <div className="space-y-8">
                  {portfolioData.map((project) => (
                    <Link
                      href={`/portfolio/${project.slug}`}
                      key={project.slug}
                      className="group flex flex-col sm:flex-row bg-white rounded-3xl border border-neutral-200/60 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                    >
                      {/* Image Container */}
                      <div className="sm:w-1/3 aspect-4/3 sm:aspect-auto bg-neutral-100 relative overflow-hidden flex items-center justify-center shrink-0">
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <span className="material-symbols-outlined text-5xl text-neutral-300 group-hover:scale-110 group-hover:text-white transition-all duration-500 relative z-0">
                            {project.imagePlaceholder}
                          </span>
                        )}
                      </div>

                      {/* Content Container */}
                      <div className="p-6 sm:p-8 flex flex-col flex-1 justify-center">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="material-symbols-outlined text-[14px] text-primary">corporate_fare</span>
                          <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest">
                            {project.client}
                          </span>
                        </div>

                        <h2 className="text-xl md:text-2xl font-headline font-extrabold text-neutral-900 mb-3 leading-snug group-hover:text-primary transition-colors">
                          {project.title}
                        </h2>
                        
                        <p className="text-sm text-neutral-500 leading-relaxed mb-6 font-body line-clamp-3">
                          {project.excerpt}
                        </p>

                        <div className="mt-auto">
                          <span className="inline-flex items-center gap-2 bg-primary/5 text-primary text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                            Baca Selengkapnya
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN: Sidebar */}
              <PortfolioSidebar />

            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="py-20 relative overflow-hidden bg-primary mt-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-white mb-6">
              Siap Membangun Proyek Anda Selanjutnya?
            </h2>
            <p className="text-lg text-white/80 font-body mb-10 max-w-2xl mx-auto">
              Percayakan instalasi sistem tata udara fasilitas Anda pada tim engineer PAS HVAC yang tersertifikasi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`https://wa.me/628155503777?text=${encodeURIComponent("Halo PAS HVAC, saya tertarik untuk membangun proyek HVAC serupa dan ingin konsultasi gratis.")}`} target="_blank" rel="noopener noreferrer" 
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#22bf5b] text-white font-extrabold px-8 py-4 rounded-xl transition-all shadow-xl shadow-[#25D366]/20 active:scale-95 text-sm uppercase tracking-widest">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.528 5.836L.057 23.999l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.005-1.373l-.36-.214-3.727.977.995-3.636-.235-.374A9.818 9.818 0 1112 21.818z" />
                </svg>
                Konsultasi Gratis Via WhatsApp
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
