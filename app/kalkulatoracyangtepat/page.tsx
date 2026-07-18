import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LeadGenSection from "@/components/home/LeadGenSection";
import CalculatorForm from "./CalculatorForm";
import { getPublishedBlogPostsPaginated } from "@/app/admin/blogActions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kalkulator Kebutuhan AC (PK) | Pramerta HVAC",
  description:
    "Hitung kebutuhan kapasitas AC (PK) ruangan Anda dengan akurat. Temukan panduan dan tips memilih sistem pendingin (HVAC) yang tepat dan hemat energi.",
  alternates: {
    canonical: "https://www.pramerta.co.id/kalkulatoracyangtepat",
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

export default async function KalkulatorACPage() {
  // Fetch 3 latest blog posts
  const { posts } = await getPublishedBlogPostsPaginated(1, 3);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-50 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-neutral-900 mb-4 tracking-tight">
              Kalkulator Kebutuhan AC
            </h1>
            <p className="text-neutral-500 font-body text-lg leading-relaxed">
              Ketahui kapasitas pendinginan (PK) ideal untuk ruangan Anda secara akurat agar sirkulasi udara lebih optimal dan efisien.
            </p>
          </div>

          {/* Calculator Section */}
          <section className="mb-24 max-w-5xl mx-auto">
            <CalculatorForm />
          </section>

          {/* SEO Optimized Tips Section */}
          <section className="mb-24 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-neutral-100 max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-headline font-extrabold text-neutral-900 mb-4">
                Panduan Memilih AC & HVAC yang Tepat
              </h2>
              <p className="text-neutral-500 font-body">
                Memilih kapasitas pendingin tidak hanya soal luas ruangan, tetapi juga dipengaruhi oleh banyak faktor eksternal.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">straighten</span>
                </div>
                <h3 className="text-lg font-extrabold text-neutral-900 mb-2">Mengapa PK Harus Sesuai?</h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-body">
                  AC yang kekecilan (PK terlalu rendah) akan bekerja lebih keras dan boros listrik karena terus menyala. Sebaliknya, AC yang kebesaran akan cepat mati-nyala (short-cycling) sehingga suhu dingin tidak merata dan kelembapan tidak terkontrol.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">sunny</span>
                </div>
                <h3 className="text-lg font-extrabold text-neutral-900 mb-2">Faktor Beban Panas (Heat Load)</h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-body">
                  Nilai BTU/h di atas (konstanta 550) adalah standar. Anda mungkin butuh PK lebih besar jika ruangan menghadap matahari sore, memiliki banyak jendela kaca (minim insulasi), atau ditempati banyak orang seperti ruang meeting kantor.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">apartment</span>
                </div>
                <h3 className="text-lg font-extrabold text-neutral-900 mb-2">Kapan Butuh AC Sentral / VRF?</h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-body">
                  Jika perhitungan menunjukkan kebutuhan di atas 6 PK atau Anda ingin mendinginkan gedung bertingkat, solusi seperti AC Sentral (Chiller) atau VRF System jauh lebih efisien secara energi dibandingkan memasang puluhan AC split konvensional.
                </p>
              </div>
            </div>
          </section>

          {/* Latest Articles Section */}
          {posts.length > 0 && (
            <section className="max-w-7xl mx-auto">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-headline font-extrabold text-neutral-900 mb-2">
                    Artikel Terbaru Kami
                  </h2>
                  <p className="text-neutral-500 font-body">
                    Pelajari lebih lanjut insight seputar industri tata udara.
                  </p>
                </div>
                <Link
                  href="/blog"
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-extrabold text-primary hover:text-primary-700 transition-colors"
                >
                  Lihat Semua Artikel
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white rounded-3xl border border-neutral-200/60 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary-900/5 transition-all duration-300 hover:-translate-y-1"
                  >
                    <article className="flex flex-col flex-1">
                      {/* Image Container */}
                      <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                        {post.imageUrl ? (
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ objectPosition: `50% ${post.imagePositionY ?? 50}%` }}
                          />
                        ) : (
                          <span className="material-symbols-outlined text-5xl text-neutral-300 group-hover:scale-110 group-hover:text-primary-300 transition-all duration-500 relative z-0">
                            image
                          </span>
                        )}
                        <div className="absolute top-4 left-4 z-20">
                          <span
                            className={`text-[9px] font-extrabold px-3 py-1.5 rounded-lg border uppercase tracking-wider bg-white/90 backdrop-blur-sm ${
                              categoryStyles[post.category] ?? "text-neutral-600"
                            }`}
                          >
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Container */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-3 text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest">
                          {post.publishedAt && (
                            <span>
                              {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-headline font-extrabold text-neutral-900 mb-3 leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-sm text-neutral-500 leading-relaxed font-body line-clamp-3 mb-6 flex-1">
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

              {/* Mobile View All Link */}
              <div className="mt-8 text-center sm:hidden">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center w-full py-4 rounded-xl border border-neutral-200 bg-white text-sm font-extrabold text-neutral-700 hover:bg-neutral-50 transition-colors gap-2"
                >
                  Lihat Semua Artikel
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </section>
          )}
        </div>
      </main>
      <LeadGenSection />
      <Footer />
    </>
  );
}
