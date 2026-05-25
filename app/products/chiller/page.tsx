import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQ from "@/components/home/FAQ";

export const metadata: Metadata = {
  title: "Chiller & VRF System | PAS HVAC Surabaya",
  description:
    "Solusi Chiller System dan VRF (Variable Refrigerant Flow) terpercaya untuk gedung komersial, pabrik, dan hotel di Surabaya & Jakarta. Efisiensi energi tinggi, COP optimal, garansi purna jual. PT. Pratama Amerta Solusi.",
  keywords: [
    "Chiller System Indonesia",
    "Chiller HVAC Surabaya",
    "VRF System Indonesia",
    "Water Chiller Industri",
    "Air Cooled Chiller",
    "Water Cooled Chiller",
    "Chiller Jakarta",
    "PAS HVAC Chiller",
  ],
  alternates: { canonical: "https://www.pramerta.co.id/products/chiller" },
  openGraph: {
    title: "Chiller & VRF System | PAS HVAC Surabaya",
    description:
      "Chiller System dan VRF untuk gedung komersial & industri. Efisiensi tinggi, instalasi profesional, garansi purna jual.",
    url: "https://www.pramerta.co.id/products/chiller",
  },
};

const WA_NUMBER = "628155503777";

const chillerTypes = [
  {
    icon: "ac_unit",
    title: "Air-Cooled Chiller",
    badge: "Paling Umum",
    badgeColor: "bg-blue-100 text-blue-700",
    description:
      "Menggunakan udara luar sebagai media pembuang panas (heat rejection). Lebih mudah diinstal, tidak memerlukan cooling tower, dan cocok untuk fasilitas dengan keterbatasan pasokan air. Ideal untuk kapasitas 30–500 TR.",
    pros: ["Tidak perlu cooling tower", "Instalasi lebih mudah & cepat", "Biaya maintenance lebih rendah", "Cocok untuk kapasitas menengah"],
    cons: ["Efisiensi sedikit lebih rendah", "Butuh ruang outdoor yang cukup"],
  },
  {
    icon: "water",
    title: "Water-Cooled Chiller",
    badge: "Efisiensi Tinggi",
    badgeColor: "bg-green-100 text-green-700",
    description:
      "Menggunakan air dari cooling tower sebagai media pembuang panas. Jauh lebih efisien secara energi untuk kapasitas besar (COP hingga 6.5+). Pilihan terbaik untuk gedung bertingkat, hotel bintang, dan industri skala besar.",
    pros: ["COP lebih tinggi (hemat listrik 20-30%)", "Cocok kapasitas 200 TR ke atas", "Performa stabil di cuaca panas", "Umur pakai lebih panjang"],
    cons: ["Membutuhkan cooling tower & water treatment", "Biaya instalasi lebih tinggi"],
  },
  {
    icon: "device_hub",
    title: "VRF / VRV System",
    badge: "Fleksibel",
    badgeColor: "bg-purple-100 text-purple-700",
    description:
      "Variable Refrigerant Flow (VRF) menggunakan refrigeran sebagai media pendingin langsung ke indoor unit. Sangat fleksibel — satu outdoor unit dapat melayani puluhan indoor unit di zona berbeda, masing-masing dapat dikontrol independen.",
    pros: ["Kontrol zona independen", "Hemat energi (partial load operation)", "Desain estetis, tak butuh ruang mesin besar", "Cocok untuk hotel, kantor, dan retail"],
    cons: ["Biaya unit awal lebih tinggi", "Memerlukan teknisi khusus VRF"],
  },
];

const features = [
  {
    icon: "bolt",
    title: "Efisiensi Energi Optimal",
    description:
      "Sistem chiller kami menggunakan kompresor inverter dan VFD untuk menyesuaikan kapasitas dengan beban pendinginan aktual. COP (Coefficient of Performance) tinggi berarti tagihan listrik lebih rendah — penghematan signifikan dalam jangka panjang.",
  },
  {
    icon: "eco",
    title: "Refrigeran Ramah Lingkungan",
    description:
      "Menggunakan refrigeran generasi terbaru (R-32, R-134a, R-410A, R-1234ze) dengan GWP (Global Warming Potential) rendah, sesuai regulasi Montreal Protocol dan standar lingkungan internasional.",
  },
  {
    icon: "sensors",
    title: "Monitoring & BMS Integration",
    description:
      "Terintegrasi penuh dengan Building Management System (BMS) via protokol BACnet, Modbus, atau LON. Monitoring real-time: COP, beban pendinginan, konsumsi daya, alarm, dan riwayat performa.",
  },
  {
    icon: "build_circle",
    title: "Preventive Maintenance Program",
    description:
      "Program PM terjadwal oleh tim teknisi tersertifikasi: pengecekan refrigeran, cleaning kondenser & evaporator, kalibrasi sensor, pengujian safety device. Menjaga performa optimal dan memperpanjang umur unit.",
  },
  {
    icon: "engineering",
    title: "Desain Sistem Terintegrasi",
    description:
      "Tidak hanya supply unit — kami merancang sistem lengkap: hydronic piping, pompa sirkulasi, cooling tower, panel kontrol, expansion tank, dan integrasi dengan sistem AHU atau FCU di seluruh gedung.",
  },
  {
    icon: "support_agent",
    title: "Garansi & After-Sales",
    description:
      "Garansi unit 1–2 tahun (tergantung merek), spare part original, dan layanan darurat 24/7 untuk pelanggan kontrak. Tim service kami tersebar di Surabaya dan Jakarta untuk respons cepat.",
  },
];

const applications = [
  { icon: "apartment", title: "Gedung Bertingkat", desc: "High-rise office, mixed-use development" },
  { icon: "hotel", title: "Hotel & Resort", desc: "Bintang 3–5, convention center, resort" },
  { icon: "shopping_bag", title: "Pusat Perbelanjaan", desc: "Mall, department store, supermarket" },
  { icon: "local_hospital", title: "Rumah Sakit", desc: "Sistem chiller untuk seluruh area klinis" },
  { icon: "factory", title: "Industri & Pabrik", desc: "Proses produksi yang membutuhkan pendinginan stabil" },
  { icon: "school", title: "Gedung Pendidikan", desc: "Universitas, sekolah, auditorium besar" },
];

const comparisonRows = [
  { param: "Media Pendingin", airCooled: "Udara luar", waterCooled: "Air (cooling tower)", vrf: "Refrigeran langsung" },
  { param: "Efisiensi (COP)", airCooled: "3.0 – 4.5", waterCooled: "5.0 – 6.5+", vrf: "3.5 – 5.0 (variabel)" },
  { param: "Kapasitas Ideal", airCooled: "30 – 500 TR", waterCooled: "200 TR ke atas", vrf: "5 – 100 HP" },
  { param: "Cooling Tower", airCooled: "Tidak diperlukan", waterCooled: "Wajib ada", vrf: "Tidak diperlukan" },
  { param: "Fleksibilitas Zona", airCooled: "Terbatas", waterCooled: "Terbatas (AHU/FCU)", vrf: "Sangat fleksibel" },
  { param: "Biaya Awal", airCooled: "Sedang", waterCooled: "Tinggi", vrf: "Tinggi" },
  { param: "Biaya Operasional", airCooled: "Sedang", waterCooled: "Rendah (kapasitas besar)", vrf: "Rendah (partial load)" },
];

export default function ChillerProductPage() {
  const waMessage = encodeURIComponent(
    "Halo PAS HVAC, saya ingin konsultasi mengenai Chiller & VRF System untuk proyek kami."
  );

  const chillerFaqs = [
    {
      question: "Apa bedanya Air-Cooled Chiller dan Water-Cooled Chiller?",
      answer: "Air-Cooled membuang panas menggunakan fan ke udara sekitar (praktis, tidak butuh air, cocok untuk rooftop). Water-Cooled membuang panas melalui air ke cooling tower (jauh lebih efisien secara energi untuk kapasitas >200 TR, butuh ruang mesin dan water treatment).",
    },
    {
      question: "Apakah VRF System cocok untuk gedung perkantoran?",
      answer: "Sangat cocok. VRF (Variable Refrigerant Flow) memberikan fleksibilitas tertinggi. Setiap zona/ruangan dapat diatur suhunya secara independen, dan kompresor inverter memastikan konsumsi listrik sangat efisien terutama saat partial load.",
    },
    {
      question: "Berapa lama garansi sistem Chiller & VRF dari PAS HVAC?",
      answer: "Garansi unit standar pabrik (FRIMEC / Gree) umumnya mencakup 1-2 tahun untuk spare part dan kompresor. Kami juga menyertakan garansi instalasi dan opsi perpanjangan melalui kontrak maintenance.",
    },
    {
      question: "Apakah sistem ini bisa terhubung ke BMS (Building Management System)?",
      answer: "Ya, sebagian besar sistem chiller komersial yang kami suplai mendukung integrasi penuh dengan protokol standar seperti BACnet, Modbus, atau LON untuk monitoring real-time dari ruang kontrol utama.",
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 py-24">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, #14b8a6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #0f766e 0%, transparent 50%)",
            }}
          />
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 mb-8 text-sm">
              <Link href="/" className="text-teal-300/70 hover:text-teal-300 transition-colors">Beranda</Link>
              <span className="text-teal-700">/</span>
              <Link href="/products/ahu" className="text-teal-300/70 hover:text-teal-300 transition-colors">Produk</Link>
              <span className="text-teal-700">/</span>
              <span className="text-teal-300 font-semibold">Chiller & VRF System</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-400/10 border border-teal-400/30 rounded-full">
                  <span className="material-symbols-outlined text-teal-400 text-base">verified</span>
                  <span className="text-teal-400 text-xs font-bold uppercase tracking-widest">Sistem Pendingin Sentral</span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                  Chiller &amp;<br />
                  <span className="text-teal-400">VRF System</span>
                </h1>

                <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
                  Solusi sistem pendingin sentral berskala besar untuk <strong className="text-white">gedung komersial, hotel, rumah sakit, dan industri</strong> — efisiensi energi tinggi, andal, dan dapat dikustomisasi.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    Konsultasi Gratis
                  </a>
                  <a
                    href="#tipe-chiller"
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">expand_more</span>
                    Bandingkan Tipe
                  </a>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "6.5+", label: "COP Water-Cooled", icon: "bolt" },
                  { value: "30–40%", label: "Penghematan Listrik", icon: "savings" },
                  { value: "500+", label: "Proyek Terselesaikan", icon: "task_alt" },
                  { value: "24/7", label: "Support Tersedia", icon: "support_agent" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
                    <span className="material-symbols-outlined text-teal-400 text-3xl mb-2 block">{stat.icon}</span>
                    <div className="text-2xl font-extrabold text-white mb-1">{stat.value}</div>
                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tipe Chiller Section */}
        <section id="tipe-chiller" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="text-teal-600 font-bold text-xs tracking-[0.3em] uppercase mb-3">Pilih Tipe yang Tepat</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
                Tiga Tipe Sistem Chiller yang Kami Sediakan
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Pemilihan tipe chiller yang tepat sangat bergantung pada kapasitas yang dibutuhkan, ketersediaan air, luas ruang mesin, dan anggaran investasi. Tim engineer kami siap membantu Anda memilih.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {chillerTypes.map((type) => (
                <div key={type.title} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="bg-slate-900 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="material-symbols-outlined text-teal-400 text-3xl">{type.icon}</span>
                      <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${type.badgeColor}`}>{type.badge}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white">{type.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-slate-500 text-sm leading-relaxed mb-5">{type.description}</p>
                    <div className="space-y-2 mb-4">
                      <p className="text-xs font-extrabold text-green-700 uppercase tracking-wider">✓ Keunggulan</p>
                      {type.pros.map((pro) => (
                        <div key={pro} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="material-symbols-outlined text-green-500 text-base shrink-0 mt-0.5">check_circle</span>
                          {pro}
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-extrabold text-amber-700 uppercase tracking-wider">⚠ Pertimbangan</p>
                      {type.cons.map((con) => (
                        <div key={con} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="material-symbols-outlined text-amber-500 text-base shrink-0 mt-0.5">info</span>
                          {con}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="text-teal-600 font-bold text-xs tracking-[0.3em] uppercase mb-3">Perbandingan</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
                Air-Cooled vs Water-Cooled vs VRF
              </h2>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="px-5 py-4 font-bold text-sm">Parameter</th>
                    <th className="px-5 py-4 font-bold text-sm text-center">Air-Cooled</th>
                    <th className="px-5 py-4 font-bold text-sm text-center bg-teal-600">Water-Cooled</th>
                    <th className="px-5 py-4 font-bold text-sm text-center">VRF/VRV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {comparisonRows.map((row, i) => (
                    <tr key={row.param} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-5 py-3.5 font-bold text-slate-700 text-sm">{row.param}</td>
                      <td className="px-5 py-3.5 text-center text-slate-500 text-sm">{row.airCooled}</td>
                      <td className="px-5 py-3.5 text-center font-bold text-teal-700 text-sm bg-teal-50">{row.waterCooled}</td>
                      <td className="px-5 py-3.5 text-center text-slate-500 text-sm">{row.vrf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="text-teal-600 font-bold text-xs tracking-[0.3em] uppercase mb-3">Layanan Lengkap</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
                Lebih dari Sekadar Supply Unit
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.title} className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-teal-100 transition-colors">
                    <span className="material-symbols-outlined text-teal-600 text-2xl">{f.icon}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="text-teal-400 font-bold text-xs tracking-[0.3em] uppercase mb-3">Aplikasi</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
                Solusi Chiller untuk Berbagai Sektor
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {applications.map((app) => (
                <div key={app.title} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-all">
                  <span className="material-symbols-outlined text-teal-400 text-3xl mb-3 block">{app.icon}</span>
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
                { href: "/products/ducting", icon: "air", title: "Sheet Metal Ducting", desc: "Fabricasi dan instalasi ducting BJLS & textile duct standar SMACNA." },
                { href: "/products/pac", icon: "memory", title: "Precision Air Conditioning", desc: "Pendinginan presisi untuk data center, cleanroom, dan laboratorium." },
              ].map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                >
                  <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-teal-100 transition-colors">
                    <span className="material-symbols-outlined text-teal-600 text-xl">{p.icon}</span>
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 text-sm mb-1 group-hover:text-teal-700 transition-colors">{p.title}</div>
                    <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ 
          items={chillerFaqs} 
          title="FAQ: Chiller & VRF System" 
          description="Temukan jawaban atas pertanyaan teknis seputar sistem pendingin sentral." 
          badge="Tanya Jawab" 
          className="py-16 bg-white" 
        />

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-800">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
              Butuh Solusi Chiller untuk Gedung Anda?
            </h2>
            <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">
              Tim engineering PAS HVAC siap membantu analisis beban, pemilihan tipe chiller, kalkulasi ROI energi, hingga instalasi dan commissioning.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-teal-700 px-10 py-4 rounded-xl font-extrabold text-sm hover:bg-teal-50 transition-all shadow-xl flex items-center gap-2"
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
            "name": "Chiller & VRF System",
            "description":
              "Solusi Chiller System dan VRF untuk gedung komersial, hotel, rumah sakit, dan industri di Indonesia. Air-Cooled, Water-Cooled, dan VRF tersedia.",
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
