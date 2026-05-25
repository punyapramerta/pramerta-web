import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQ from "@/components/home/FAQ";

export const metadata: Metadata = {
  title: "Sheet Metal Ducting & Textile Duct | PAS HVAC Surabaya",
  description:
    "Fabrikasi dan instalasi Sheet Metal Ducting (BJLS) & Textile/Fabric Duct profesional di Surabaya & Jakarta. Standar SMACNA, material premium, tim berpengalaman. PT. Pratama Amerta Solusi.",
  keywords: [
    "Sheet Metal Ducting Surabaya",
    "Ducting HVAC Indonesia",
    "Textile Duct Indonesia",
    "Fabric Duct HVAC",
    "BJLS Ducting",
    "Kontraktor Ducting Surabaya",
    "Ducting AC Jakarta",
    "PAS HVAC Ducting",
  ],
  alternates: { canonical: "https://www.pramerta.co.id/products/ducting" },
  openGraph: {
    title: "Sheet Metal Ducting & Textile Duct | PAS HVAC Surabaya",
    description:
      "Fabrikasi dan instalasi ducting BJLS & textile duct standar SMACNA. Proyek gedung, pabrik, dan fasilitas kesehatan.",
    url: "https://www.pramerta.co.id/products/ducting",
  },
};

const WA_NUMBER = "628155503777";

const ductingTypes = [
  {
    icon: "layers",
    title: "Sheet Metal Ducting (BJLS)",
    badge: "Paling Umum",
    badgeColor: "bg-orange-100 text-orange-700",
    description:
      "Baja Lembaran Lapis Seng (BJLS) adalah material ducting paling banyak digunakan dalam proyek HVAC industri dan komersial di Indonesia. Tahan lama, kuat, dan dapat dibentuk ke berbagai ukuran sesuai layout gedung.",
    specs: [
      "Material: BJLS 0.5mm – 1.2mm (sesuai standar SMACNA)",
      "Bentuk: Rectangular, circular, atau oval",
      "Finishing: Galvanized zinc coating (standard) atau stainless steel (food grade/pharma)",
      "Insulation: Luar/dalam dengan glasswool/rockwool + aluminium foil",
      "Tekanan: Low, Medium, High Pressure System",
    ],
  },
  {
    icon: "texture",
    title: "Textile / Fabric Duct",
    badge: "Distribusi Merata",
    badgeColor: "bg-blue-100 text-blue-700",
    description:
      "Textile duct (fabric duct) terbuat dari kain poliester berpori yang memungkinkan distribusi udara secara merata ke seluruh area secara natural. Ideal untuk gudang, fasilitas olahraga, pabrik makanan, dan ruang dengan langit-langit tinggi.",
    specs: [
      "Material: 100% poliester, anti-bakteri, tahan api (FR)",
      "Diameter: 160mm – 1250mm",
      "Kecepatan udara: 0.1–1.0 m/s (sangat rendah, bebas draft)",
      "Warna: Custom sesuai brand/interior",
      "Pemasangan: Rail suspension system (mudah dibongkar & dicuci)",
    ],
  },
  {
    icon: "precision_manufacturing",
    title: "PU Panel Ducting",
    badge: "Insulasi Tinggi",
    badgeColor: "bg-green-100 text-green-700",
    description:
      "Ducting dari panel Polyurethane (PU) foam dengan lapisan aluminium di kedua sisi. Insulasi termal sangat baik, bobot ringan, dan permukaan dalam yang halus mengoptimalkan aliran udara. Ideal untuk cold storage dan ruang bersuhu rendah.",
    specs: [
      "Material: PU foam density 40kg/m³ + double-sided aluminium foil",
      "Ketebalan: 20mm, 25mm, 30mm",
      "Nilai insulasi: R-value 2.5–4.5 (lebih baik dari BJLS)",
      "Bobot: ~3–4 kg/m² (lebih ringan dari sheet metal)",
      "Cocok untuk: Cold room, cold storage, process cooling",
    ],
  },
];

const services = [
  {
    icon: "design_services",
    title: "Desain & Engineering",
    description:
      "Perhitungan beban udara (air load calculation), desain layout ducting menggunakan software AutoCAD MEP, serta kalkulasi tekanan statik dan kecepatan udara optimal sesuai standar SMACNA dan ASHRAE.",
  },
  {
    icon: "factory",
    title: "Fabrikasi Workshop",
    description:
      "Workshop fabrikasi in-house dengan mesin Pittsburgh lock seamer, plasma cutting, dan bending machine. Semua komponen diproduksi dengan presisi tinggi sebelum dikirim ke lapangan, meminimalkan waktu pemasangan.",
  },
  {
    icon: "construction",
    title: "Instalasi Profesional",
    description:
      "Tim instalasi berpengalaman, dilengkapi peralatan lengkap dan APD standar. Pekerjaan sesuai jadwal proyek, koordinasi dengan ME kontraktor lain, dan dokumentasi as-built drawing setelah selesai.",
  },
  {
    icon: "verified",
    title: "Quality Control & Testing",
    description:
      "Setiap sistem ducting diuji dengan duct leakage test sesuai standar SMACNA sebelum diserahkan. Laporan pengujian disertakan sebagai dokumen garansi kualitas untuk klien.",
  },
  {
    icon: "edit_note",
    title: "Modifikasi & Retrofitting",
    description:
      "Layanan modifikasi ducting eksisting: perluasan jalur, penambahan grille/diffuser, balancing udara, atau penggantian seksi yang sudah bocor/rusak. Bisa dikerjakan saat gedung beroperasi dengan meminimalkan gangguan.",
  },
  {
    icon: "cleaning_services",
    title: "Cleaning & Maintenance",
    description:
      "Layanan pembersihan ducting berkala (duct cleaning service) menggunakan vacuum dan brush system. Penting untuk higienitas udara di gedung perkantoran, hotel, dan fasilitas kesehatan.",
  },
];

const smacnaStandards = [
  { label: "Rectangular Duct", value: "SMACNA HVAC Duct Construction Standards" },
  { label: "Round & Oval Duct", value: "SMACNA Round Industrial Duct Construction" },
  { label: "Ketebalan Material", value: "Sesuai tabel SMACNA berdasarkan tekanan & ukuran" },
  { label: "Duct Leakage Class", value: "Class 1, 2, 3, atau 6 (sesuai spesifikasi proyek)" },
  { label: "Insulasi", value: "ASTM C553, C612, atau C1290" },
  { label: "Sertifikasi Welder", value: "Tim installer tersertifikasi SMACNA-trained" },
];

const applications = [
  { icon: "apartment", title: "Gedung Perkantoran", desc: "Distribusi udara AC sentral ke seluruh lantai" },
  { icon: "factory", title: "Pabrik Makanan & Minuman", desc: "Food-grade stainless steel ducting, anti-bakteri" },
  { icon: "local_hospital", title: "Rumah Sakit", desc: "Tekanan negatif/positif untuk ruang isolasi & OT" },
  { icon: "fitness_center", title: "Fasilitas Olahraga", desc: "Textile duct untuk GOR, kolam renang, gym" },
  { icon: "warehouse", title: "Gudang & Cold Storage", desc: "PU panel ducting untuk distribusi cold chain" },
  { icon: "school", title: "Sekolah & Universitas", desc: "Distribusi udara merata tanpa noise berlebih" },
];

export default function DuctingProductPage() {
  const waMessage = encodeURIComponent(
    "Halo PAS HVAC, saya ingin konsultasi mengenai Sheet Metal Ducting atau Textile Duct untuk proyek kami."
  );

  const ductingFaqs = [
    {
      question: "Apa keunggulan menggunakan ducting standar SMACNA?",
      answer: "Standar SMACNA memastikan ketebalan material, metode penyambungan, dan perkuatan (reinforcement) sesuai dengan tekanan udara aktual. Ini mencegah kebocoran udara ekstrim (air leakage), vibrasi bising (noise), dan keruntuhan struktural ducting dalam jangka panjang.",
    },
    {
      question: "Kapan sebaiknya menggunakan Textile/Fabric Duct daripada BJLS?",
      answer: "Textile Duct sangat ideal untuk ruangan tanpa plafon dengan langit-langit tinggi (exposed ceiling) seperti warehouse, fasilitas olahraga, dan pabrik makanan. Udara didistribusikan secara merata melalui pori-pori kain tanpa menimbulkan draft yang mengganggu, serta lebih ringan dan mudah dicuci.",
    },
    {
      question: "Apakah PAS HVAC menerima jasa modifikasi ducting gedung lama?",
      answer: "Ya, kami melayani retrofitting dan modifikasi jalur ducting eksisting. Ini termasuk penambahan percabangan baru, balancing aliran udara, perbaikan kebocoran, hingga penggantian material insulasi yang sudah rusak.",
    },
    {
      question: "Bagaimana cara PAS HVAC memastikan ducting tidak bocor?",
      answer: "Kami melakukan Duct Leakage Test (uji kebocoran) setelah instalasi selesai, menggunakan alat presisi yang mengukur tingkat kebocoran berdasarkan tekanan statis uji. Hasil test disertakan dalam laporan handover proyek.",
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 py-24">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ea580c 0%, transparent 50%)",
            }}
          />
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 mb-8 text-sm">
              <Link href="/" className="text-orange-300/70 hover:text-orange-300 transition-colors">Beranda</Link>
              <span className="text-orange-700">/</span>
              <Link href="/products/ahu" className="text-orange-300/70 hover:text-orange-300 transition-colors">Produk</Link>
              <span className="text-orange-700">/</span>
              <span className="text-orange-300 font-semibold">Sheet Metal Ducting</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-400/10 border border-orange-400/30 rounded-full">
                  <span className="material-symbols-outlined text-orange-400 text-base">verified</span>
                  <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">Standar SMACNA</span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                  Sheet Metal<br />
                  <span className="text-orange-400">Ducting</span> &amp; Textile Duct
                </h1>

                <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
                  Fabrikasi dan instalasi sistem ducting presisi untuk <strong className="text-white">distribusi udara HVAC</strong> — BJLS, stainless steel, PU panel, hingga textile/fabric duct. Standar SMACNA, garansi kualitas.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-500 hover:bg-orange-400 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    Konsultasi Gratis
                  </a>
                  <a
                    href="#tipe-ducting"
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">expand_more</span>
                    Lihat Tipe Ducting
                  </a>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "SMACNA", label: "Standar Konstruksi", icon: "verified" },
                  { value: "3 Tipe", label: "Material Tersedia", icon: "layers" },
                  { value: "In-house", label: "Workshop Fabrikasi", icon: "factory" },
                  { value: "Tested", label: "Duct Leakage Test", icon: "task_alt" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
                    <span className="material-symbols-outlined text-orange-400 text-3xl mb-2 block">{stat.icon}</span>
                    <div className="text-2xl font-extrabold text-white mb-1">{stat.value}</div>
                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Types Section */}
        <section id="tipe-ducting" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="text-orange-600 font-bold text-xs tracking-[0.3em] uppercase mb-3">Pilihan Material</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
                Tiga Tipe Ducting yang Kami Sediakan
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Setiap proyek memiliki kebutuhan unik. Kami menyediakan tiga pilihan material ducting dengan kelebihan masing-masing — dari ducting industri berat hingga distribusi udara yang estetis untuk ruang publik.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {ductingTypes.map((type) => (
                <div key={type.title} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="bg-slate-900 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="material-symbols-outlined text-orange-400 text-3xl">{type.icon}</span>
                      <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${type.badgeColor}`}>{type.badge}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white">{type.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-slate-500 text-sm leading-relaxed mb-5">{type.description}</p>
                    <div className="space-y-2">
                      <p className="text-xs font-extrabold text-orange-700 uppercase tracking-wider mb-3">📋 Spesifikasi</p>
                      {type.specs.map((spec) => (
                        <div key={spec} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="material-symbols-outlined text-orange-400 text-base shrink-0 mt-0.5">check_small</span>
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="text-orange-600 font-bold text-xs tracking-[0.3em] uppercase mb-3">Layanan Kami</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
                End-to-End Ducting Solution
              </h2>
              <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
                Dari desain awal hingga pengujian akhir — kami mengelola seluruh proses ducting sehingga Anda tidak perlu berkoordinasi dengan banyak vendor.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div key={s.title} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-orange-100 transition-colors">
                    <span className="material-symbols-outlined text-orange-600 text-2xl">{s.icon}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SMACNA Standards */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="text-orange-600 font-bold text-xs tracking-[0.3em] uppercase mb-3">Standar Kualitas</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
                Mengapa Standar SMACNA Penting?
              </h2>
              <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                SMACNA (Sheet Metal and Air Conditioning Contractors' National Association) adalah standar internasional yang mengatur konstruksi, material, dan pengujian ducting HVAC. Kepatuhan terhadap standar ini memastikan keamanan, efisiensi, dan umur panjang sistem ducting Anda.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="px-6 py-4 font-bold text-sm">Aspek</th>
                    <th className="px-6 py-4 font-bold text-sm text-center bg-orange-600">Standar PAS HVAC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {smacnaStandards.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-6 py-4 font-bold text-slate-700 text-sm">{row.label}</td>
                      <td className="px-6 py-4 text-center font-semibold text-orange-700 text-sm bg-orange-50/30">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="text-orange-400 font-bold text-xs tracking-[0.3em] uppercase mb-3">Aplikasi</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
                Ducting untuk Berbagai Jenis Proyek
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {applications.map((app) => (
                <div key={app.title} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-all">
                  <span className="material-symbols-outlined text-orange-400 text-3xl mb-3 block">{app.icon}</span>
                  <h3 className="font-extrabold text-white text-sm mb-1">{app.title}</h3>
                  <p className="text-slate-400 text-[11px] leading-snug">{app.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Produk Lainnya</p>
              <h2 className="text-2xl font-extrabold text-slate-900">Solusi HVAC Lengkap dari PAS HVAC</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { href: "/products/ahu", icon: "air", title: "Air Handling Unit (AHU)", desc: "Sistem pengolahan & distribusi udara terpusat untuk gedung skala besar." },
                { href: "/products/chiller", icon: "ac_unit", title: "Chiller & VRF System", desc: "Sistem pendingin sentral efisiensi tinggi untuk gedung komersial & industri." },
                { href: "/products/pac", icon: "memory", title: "Precision Air Conditioning", desc: "Pendinginan presisi untuk data center, cleanroom, dan laboratorium." },
              ].map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                >
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors">
                    <span className="material-symbols-outlined text-orange-600 text-xl">{p.icon}</span>
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 text-sm mb-1 group-hover:text-orange-700 transition-colors">{p.title}</div>
                    <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ
          items={ductingFaqs}
          title="FAQ: Instalasi Ducting"
          description="Pertanyaan umum terkait fabrikasi dan instalasi ducting HVAC."
          badge="Tanya Jawab"
          className="py-16 bg-white"
        />

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-800">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
              Butuh Fabrikasi & Instalasi Ducting?
            </h2>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
              Dari desain, fabrikasi workshop, instalasi, hingga testing — tim PAS HVAC siap menangani proyek ducting Anda dari awal hingga commissioning.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-orange-700 px-10 py-4 rounded-xl font-extrabold text-sm hover:bg-orange-50 transition-all shadow-xl flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                Konsultasi via WhatsApp
              </a>
              <a
                href="tel:03199548097"
                className="bg-white/10 border border-white/30 text-white px-10 py-4 rounded-xl font-extrabold text-sm hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">call</span>
                031-995-48097
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Sheet Metal Ducting & Textile Duct",
            "description":
              "Fabrikasi dan instalasi Sheet Metal Ducting (BJLS) & Textile/Fabric Duct standar SMACNA untuk proyek HVAC di Indonesia.",
            "brand": { "@type": "Brand", "name": "PAS HVAC" },
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "areaServed": "ID",
              "seller": {
                "@type": "Organization",
                "name": "PT. Pratama Amerta Solusi",
                "url": "https://www.pramerta.co.id",
              },
            },
          }),
        }}
      />
    </>
  );
}
