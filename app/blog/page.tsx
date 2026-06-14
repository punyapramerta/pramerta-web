import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { getPublishedBlogPosts } from "@/app/admin/blogActions";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog HVAC | Insight Industri & Solusi Sistem Pendingin",
  description:
    "Temukan artikel mendalam, panduan, dan insight terbaru seputar industri HVAC, instalasi chiller, AHU, dan solusi pendinginan industrial terbaik.",
  alternates: {
    canonical: "https://www.pramerta.co.id/blog",
  },
};

const categoryStyles: Record<string, string> = {
  Panduan: "bg-blue-50 text-blue-700 border-blue-100",
  Edukasi: "bg-purple-50 text-purple-700 border-purple-100",
  Produk: "bg-neutral-100 text-neutral-700 border-neutral-200",
  Maintenance: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Regulasi: "bg-orange-50 text-orange-700 border-orange-100",
  Insight: "bg-rose-50 text-rose-700 border-rose-100",
  Teknologi: "bg-cyan-50 text-cyan-700 border-cyan-100",
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F9FAFB]">
        
        {/* ── HERO SECTION ── */}
        <section className="relative pt-32 pb-24 overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/bloghero-bg.jpeg')" }}>
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6 text-tertiary-300 border border-tertiary-400/30 bg-tertiary-500/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-400 animate-pulse" />
              Pusat Pengetahuan HVAC
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-headline font-extrabold mb-6 tracking-tight leading-[1.1] max-w-4xl mx-auto">
              Insight & Solusi Sistem <br className="hidden md:block" />
              <span className="text-white">Pendingin Industrial</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto font-body leading-relaxed mb-8">
              Temukan strategi optimasi energi, panduan pemilihan chiller & AHU, hingga update teknologi tata udara terbaru langsung dari engineer spesialis kami.
            </p>
          </div>
        </section>

        {/* ── MAIN CONTENT (2 COLUMNS) ── */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-10">
              
              {/* LEFT COLUMN: Blog Posts */}
              <div className="w-full lg:w-2/3 xl:w-[70%]">
                
                {/* Blog Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                  {posts.length === 0 && (
                    <div className="col-span-3 py-20 text-center text-neutral-400">
                      <span className="material-symbols-outlined text-5xl block mb-3">article</span>
                      <p className="font-bold">Belum ada artikel yang dipublikasikan.</p>
                    </div>
                  )}
                  {posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col bg-white rounded-3xl border border-neutral-200/60 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary-900/5 transition-all duration-300 hover:-translate-y-1"
                    >
                      <article className="flex flex-col flex-1">
                      {/* Image Container (1:1 Ratio) */}
                      <div className="aspect-square bg-neutral-100 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                        {post.imageUrl ? (
                          <img src={post.imageUrl} alt={post.title} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: `50% ${post.imagePositionY ?? 50}%` }} />
                        ) : (
                          <span className="material-symbols-outlined text-5xl text-neutral-300 group-hover:scale-110 group-hover:text-primary-300 transition-all duration-500 relative z-0">image</span>
                        )}
                        {/* Tags floating on image */}
                        <div className="absolute top-4 left-4 z-20">
                          <span className={`text-[9px] font-extrabold px-3 py-1.5 rounded-lg border uppercase tracking-wider bg-white/90 backdrop-blur-sm ${categoryStyles[post.category] ?? "text-neutral-600"}`}>
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Container */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-3 text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest">
                          {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>}
                          {post.publishedAt && post.readTime && <span className="w-1 h-1 rounded-full bg-neutral-300" />}
                          {post.readTime && <span>{post.readTime}</span>}
                        </div>

                        <h2 className="text-lg font-headline font-extrabold text-neutral-900 mb-3 leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        
                        <p className="text-sm text-neutral-500 leading-relaxed mb-6 font-body line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>

                        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between mt-auto">
                          <span className="text-[11px] font-extrabold text-primary-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform flex items-center gap-2">
                            Baca Selengkapnya
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </span>
                        </div>
                      </div>
                      </article>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-16 flex items-center justify-center gap-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-400 hover:bg-neutral-50 transition-colors cursor-not-allowed">
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20">
                    1
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300 font-bold transition-colors">
                    2
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300 font-bold transition-colors">
                    3
                  </button>
                  <span className="px-2 text-neutral-400">...</span>
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: Sidebar */}
              <BlogSidebar />

            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="py-20 relative overflow-hidden bg-primary mt-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-white mb-6">
              Siap Mengoptimalkan Sistem HVAC Anda?
            </h2>
            <p className="text-lg text-white/80 font-body mb-10 max-w-2xl mx-auto">
              Dapatkan konsultasi gratis dan penawaran terbaik untuk kebutuhan instalasi, pengadaan, maupun maintenance dari tim ahli PAS HVAC.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`https://wa.me/628155503777?text=${encodeURIComponent("Halo PAS HVAC, saya ingin konsultasi gratis mengenai kebutuhan HVAC saya.")}`} target="_blank" rel="noopener noreferrer" 
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#22bf5b] text-white font-extrabold px-8 py-4 rounded-xl transition-all shadow-xl shadow-[#25D366]/20 active:scale-95 text-sm uppercase tracking-widest">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.528 5.836L.057 23.999l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.005-1.373l-.36-.214-3.727.977.995-3.636-.235-.374A9.818 9.818 0 1112 21.818z" />
                </svg>
                Konsultasi via WhatsApp
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
