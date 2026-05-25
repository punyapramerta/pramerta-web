import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { blogPosts } from "@/lib/data/blogData";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug];
  if (post) {
    return {
      title: `${post.title} - Blog PAS HVAC`,
      description: `Artikel informatif tentang ${post.title} oleh ${post.author}.`,
    };
  }
  return {
    title: "Membaca Artikel - Blog HVAC",
    description: "Artikel informatif seputar industri HVAC.",
  };
}

export default function SinglePostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug] || {
    category: "Panduan",
    title: "Artikel Belum Tersedia (Placeholder)",
    date: "Akan Datang",
    readTime: "-",
    author: "Tim PAS HVAC",
    content: "<p>Konten untuk artikel ini sedang dalam proses penulisan oleh tim kami.</p>"
  };
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F9FAFB] pt-24 pb-0">
        
        {/* Main Layout Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* LEFT COLUMN: Article Content */}
            <article className="w-full lg:w-2/3 xl:w-[70%]">
              
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-widest mb-8">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                <span>/</span>
                <span className="text-primary">Insight</span>
              </nav>

              {/* Header Info */}
              <div className="mb-8">
                <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-widest border border-primary/20 mb-4">
                  {post.category}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-neutral-900 leading-tight mb-6">
                  {post.title}
                </h1>
                
                <div className="flex items-center gap-4 text-sm font-bold text-neutral-500 uppercase tracking-widest border-b border-neutral-200 pb-8">
                  <span>{post.date}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                  <span>{post.readTime}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-lg">person</span>
                    {post.author}
                  </span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="aspect-[16/9] w-full bg-neutral-200 rounded-3xl mb-12 overflow-hidden relative flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-neutral-400">
                  image
                </span>
              </div>

              {/* Article Body (Dynamic Content) */}
              <div 
                className="prose prose-lg prose-neutral max-w-none font-body text-neutral-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share / Tags section (Optional placeholder) */}
              <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Share:</span>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-all">
                      <span className="material-symbols-outlined text-[18px]">share</span>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-all">
                      <span className="material-symbols-outlined text-[18px]">link</span>
                    </button>
                  </div>
                </div>
              </div>

            </article>

            {/* RIGHT COLUMN: Sidebar */}
            <BlogSidebar />
            
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <section className="py-20 relative overflow-hidden bg-primary mt-20">
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
