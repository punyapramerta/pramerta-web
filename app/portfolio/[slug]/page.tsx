import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortfolioSidebar from "@/components/portfolio/PortfolioSidebar";
import { portfolioData } from "@/lib/repositories/dataRepository";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioData.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Portfolio PAS HVAC`,
    description: project.excerpt,
  };
}

export function generateStaticParams() {
  return portfolioData.map((p) => ({ slug: p.slug }));
}

export default async function SinglePortfolioPage({ params }: Props) {
  const { slug } = await params;
  const project = portfolioData.find((p) => p.slug === slug);
  if (!project) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pramerta.co.id" },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://www.pramerta.co.id/portfolio" },
      { "@type": "ListItem", position: 3, name: project.title, item: `https://www.pramerta.co.id/portfolio/${project.slug}` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.excerpt,
    image: "https://www.pramerta.co.id/images/hero-bg.jpg",
    author: { "@type": "Organization", name: "PT. Pratama Amerta Solusi", url: "https://www.pramerta.co.id" },
    publisher: {
      "@type": "Organization",
      name: "PT. Pratama Amerta Solusi",
      logo: { "@type": "ImageObject", url: "https://www.pramerta.co.id/images/logo.png" },
    },
    datePublished: "2026-04-10T08:00:00+07:00",
    dateModified: "2026-05-22T08:00:00+07:00",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Navbar />
      <main className="min-h-screen bg-[#F9FAFB] pt-24 pb-0">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* LEFT COLUMN: Portfolio Detail Content */}
            <article className="w-full lg:w-2/3 xl:w-[70%]">

              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-widest mb-8">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span>/</span>
                <Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
                <span>/</span>
                <span className="text-primary">Study Case</span>
              </nav>

              {/* Header Info */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-primary">corporate_fare</span>
                    <span className="text-xs font-extrabold text-neutral-500 uppercase tracking-widest">{project.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-neutral-400">factory</span>
                    <span className="text-xs font-bold text-neutral-400">{project.industry}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-neutral-400">location_on</span>
                    <span className="text-xs font-bold text-neutral-400">{project.location}</span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-neutral-900 leading-tight mb-8">
                  {project.title}
                </h1>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="bg-white p-4 rounded-2xl border border-neutral-100">
                      <div className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1">{m.label}</div>
                      <div className="text-lg font-bold text-neutral-900">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Image */}
              <div className="aspect-21/9 w-full bg-neutral-200 rounded-3xl mb-12 overflow-hidden relative flex flex-col items-center justify-center border border-neutral-200/50 gap-3">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <>
                    <span className="material-symbols-outlined text-6xl text-neutral-400">{project.imagePlaceholder}</span>
                    {project.imageNote && (
                      <p className="text-xs text-neutral-400 font-medium px-6 text-center">{project.imageNote}</p>
                    )}
                  </>
                )}
              </div>

              {/* Content */}
              <div className="prose prose-lg prose-neutral max-w-none font-body text-neutral-600 leading-relaxed">

                <h2 className="text-2xl font-headline font-extrabold text-neutral-900 mb-4">Latar Belakang Proyek</h2>
                <p className="mb-8">{project.background}</p>

                <h2 className="text-2xl font-headline font-extrabold text-neutral-900 mt-12 mb-4">Tantangan Teknis</h2>
                <ul className="list-disc pl-6 space-y-3 mb-8">
                  {project.challenges.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>

                <blockquote className="border-l-4 border-primary pl-6 py-2 my-10 bg-primary/5 rounded-r-xl pr-6">
                  <p className="text-lg font-bold text-primary italic m-0">
                    "{project.highlightChallenge}"
                  </p>
                </blockquote>

                <h2 className="text-2xl font-headline font-extrabold text-neutral-900 mt-12 mb-4">Solusi dari Tim PAS HVAC</h2>
                <ol className="list-decimal pl-6 space-y-3 mb-8">
                  {project.solution.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>

                <h2 className="text-2xl font-headline font-extrabold text-neutral-900 mt-12 mb-4">Hasil yang Dicapai</h2>
                <ul className="list-disc pl-6 space-y-3 mb-8">
                  {project.results.map((r, i) => (
                    <li key={i} className="font-semibold text-neutral-700">{r}</li>
                  ))}
                </ul>

              </div>

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Share Project:</span>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-all">
                      <span className="material-symbols-outlined text-[18px]">share</span>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-all">
                      <span className="material-symbols-outlined text-[18px]">link</span>
                    </button>
                  </div>
                </div>
                <Link href="/portfolio" className="text-xs font-bold uppercase tracking-widest text-primary hover:underline flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                  Semua Portfolio
                </Link>
              </div>

            </article>

            {/* RIGHT COLUMN: Sidebar */}
            <PortfolioSidebar />

          </div>
        </div>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden bg-primary mt-20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-white mb-6">
              Siap Membangun Proyek Anda Selanjutnya?
            </h2>
            <p className="text-lg text-white/80 font-body mb-10 max-w-2xl mx-auto">
              Percayakan instalasi sistem tata udara fasilitas Anda pada tim engineer PAS HVAC yang tersertifikasi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/628155503777?text=${encodeURIComponent("Halo PAS HVAC, saya tertarik untuk membangun proyek HVAC serupa dan ingin konsultasi gratis.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#22bf5b] text-white font-extrabold px-8 py-4 rounded-xl transition-all shadow-xl shadow-[#25D366]/20 active:scale-95 text-sm uppercase tracking-widest"
              >
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
