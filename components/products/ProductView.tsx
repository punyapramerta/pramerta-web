import Link from "next/link";
import FAQ from "@/components/home/FAQ";
import type { Product } from "@/lib/supabase/queries";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type Props = {
  product: Product;
  otherProducts?: Product[];
  hideNavigation?: boolean;
};

export default function ProductView({ product, otherProducts = [], hideNavigation = false }: Props) {
  const WA_NUMBER = "628155503777";
  const waMessage = encodeURIComponent(
    `Halo PAS HVAC, saya ingin konsultasi mengenai ${product.name} untuk proyek kami.`
  );

  const features = product.features || [];
  const applications = product.applications || [];
  const specs = product.details || [];
  const faqs = product.faqs || [];

  return (
    <>
      {!hideNavigation && <Navbar />}
      <main className={hideNavigation ? "bg-white h-full" : ""}>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-24">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1d4ed8 0%, transparent 50%)",
            }}
          />
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 mb-8 text-sm">
              {!hideNavigation ? (
                <>
                  <Link href="/" className="text-blue-300/70 hover:text-blue-300 transition-colors">Beranda</Link>
                  <span className="text-blue-700">/</span>
                  <span className="text-blue-300/70 cursor-default">Produk</span>
                </>
              ) : (
                <>
                  <span className="text-blue-300/70">Beranda</span>
                  <span className="text-blue-700">/</span>
                  <span className="text-blue-300/70">Produk</span>
                </>
              )}
              <span className="text-blue-700">/</span>
              <span className="text-blue-300 font-semibold">{product.name || "Nama Produk"}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-400/10 border border-blue-400/30 rounded-full">
                  <span className="material-symbols-outlined text-blue-400 text-base">verified</span>
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">{product.category || "Kategori"} {product.badge ? `· ${product.badge}` : ''}</span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                  {product.name || "Nama Produk"}
                </h1>

                <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
                  {product.description || "Deskripsi singkat produk..."}
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href={hideNavigation ? "#" : `https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                    target={hideNavigation ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    Konsultasi Gratis
                  </a>
                  {specs.length > 0 && (
                    <a
                      href="#spesifikasi"
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">expand_more</span>
                      Lihat Spesifikasi
                    </a>
                  )}
                </div>

                {/* Always show Stats Cards, position depends on image */}
                {product.image && (
                  <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
                    {[
                      { value: "Custom", label: "Design", icon: "architecture" },
                      { value: "Quality", label: "Terjamin", icon: "verified" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-all">
                        <span className="material-symbols-outlined text-blue-400 text-3xl">{stat.icon}</span>
                        <div>
                          <div className="text-lg font-extrabold text-white leading-none mb-1">{stat.value}</div>
                          <div className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Image or Stats Placeholder */}
              {product.image ? (
                <div className="flex justify-center lg:justify-end relative">
                  <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full w-3/4 h-3/4 mx-auto my-auto -z-10"></div>
                  <img src={product.image} alt={product.imageAlt || product.name} className="rounded-2xl max-h-[450px] object-contain shadow-2xl bg-white p-6 border border-white/20 relative z-10" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "Custom", label: "Design", icon: "architecture" },
                    { value: "Quality", label: "Terjamin", icon: "verified" },
                    { value: "Sertifikasi", label: "Standar SNI", icon: "workspace_premium" },
                    { value: "Support", label: "Tim Ahli", icon: "support_agent" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
                      <span className="material-symbols-outlined text-blue-400 text-3xl mb-2 block">{stat.icon}</span>
                      <div className="text-2xl font-extrabold text-white mb-1">{stat.value}</div>
                      <div className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Content Section (Mengapa Product) */}
        {product.content && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <div className="text-blue-600 font-bold text-xs tracking-[0.3em] uppercase mb-3">Mengapa {product.name}?</div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                  Solusi Udara Terbaik untuk Gedung Skala Besar
                </h2>
                <div className="text-slate-500 leading-relaxed text-left max-w-4xl mx-auto bg-blue-50 p-6 md:p-8 rounded-2xl border border-blue-100 whitespace-pre-wrap shadow-sm">
                  {product.content}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        {features.length > 0 && (
          <section id="fitur" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="text-center mb-12">
                <div className="text-blue-600 font-bold text-xs tracking-[0.3em] uppercase mb-3">Fitur Unggulan</div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
                  Mengapa Memilih {product.name} Kami?
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((f: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                      <span className="material-symbols-outlined text-blue-600 text-2xl">{f.icon || "star"}</span>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-lg mb-2">{f.title || "Fitur"}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{f.description || "Deskripsi"}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Specifications Table */}
        {specs.length > 0 && (
          <section id="spesifikasi" className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-4 md:px-8">
              <div className="text-center mb-12">
                <div className="text-blue-600 font-bold text-xs tracking-[0.3em] uppercase mb-3">Spesifikasi Teknis</div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
                  Parameter {product.name}
                </h2>
              </div>

              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="px-6 py-4 font-bold text-sm w-1/3">Parameter</th>
                      <th className="px-6 py-4 font-bold text-sm bg-blue-600">Spesifikasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {specs.map((row: any, i: number) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        <td className="px-6 py-4 font-bold text-slate-700 text-sm">{row.label}</td>
                        <td className="px-6 py-4 font-semibold text-blue-700 text-sm bg-blue-50/30">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Applications */}
        {applications.length > 0 && (
          <section className="py-20 bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="text-center mb-12">
                <div className="text-blue-400 font-bold text-xs tracking-[0.3em] uppercase mb-3">Aplikasi</div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
                  Sektor Industri yang Sesuai
                </h2>
                <p className="text-slate-400 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                  {product.name} telah diimplementasikan di berbagai sektor industri dan komersial dengan performa yang teruji.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {applications.map((app: any, idx: number) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-all">
                    <span className="material-symbols-outlined text-blue-400 text-3xl mb-3 block">{app.icon || "business"}</span>
                    <h3 className="font-extrabold text-white text-sm mb-1">{app.title || "Industri"}</h3>
                    <p className="text-slate-400 text-[11px] leading-snug">{app.desc || "Deskripsi singkat"}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Internal Links to Other Products */}
        {otherProducts.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="text-center mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Produk Lainnya</p>
                <h2 className="text-2xl font-extrabold text-slate-900">Solusi HVAC Lengkap dari PAS HVAC</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {otherProducts.map((p) => (
                  <Link
                    key={p.slug}
                    href={hideNavigation ? "#" : p.href}
                    className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                  >
                    {p.image ? (
                      <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden p-1">
                        <img src={p.image} alt={p.name} className="object-contain w-full h-full" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                        <span className="material-symbols-outlined text-blue-600 text-xl">category</span>
                      </div>
                    )}
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm mb-1 group-hover:text-blue-700 transition-colors">{p.name}</div>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{p.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <FAQ 
            items={faqs.map(f => ({ question: f.question || "Tanya?", answer: f.answer || "Jawab." }))} 
            title={`FAQ: ${product.name}`} 
            description="Pertanyaan yang sering diajukan mengenai produk ini." 
            badge="Tanya Jawab" 
            className="py-16 bg-white" 
          />
        )}

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
              Butuh {product.name} untuk Proyek Anda?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Tim engineering PAS HVAC siap membantu perhitungan teknis, desain sistem, pengadaan, instalasi, hingga commissioning.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={hideNavigation ? "#" : `https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                target={hideNavigation ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="bg-white text-blue-700 px-10 py-4 rounded-xl font-extrabold text-sm hover:bg-blue-50 transition-all shadow-xl flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                Konsultasi via WhatsApp
              </a>
              <a
                href={hideNavigation ? "#" : "tel:03199548097"}
                className="bg-white/10 border border-white/30 text-white px-10 py-4 rounded-xl font-extrabold text-sm hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">call</span>
                031-995-48097
              </a>
            </div>
          </div>
        </section>
      </main>
      {!hideNavigation && <Footer />}
    </>
  );
}
