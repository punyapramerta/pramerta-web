import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQ from "@/components/home/FAQ";

export const metadata: Metadata = {
  title: "Precision Air Conditioning (PAC) | PAS HVAC",
  description:
    "Solusi Precision Air Conditioning (PAC) untuk Data Center, Cleanroom & Laboratorium. Menjaga suhu stabil ±1°C dan kelembapan ±5% RH dengan operasi 24/7 kontinu. PT. Pratama Amerta Solusi.",
  keywords: [
    "Precision Air Conditioning",
    "PAC Data Center Indonesia",
    "Pendingin Cleanroom",
    "AC Presisi Laboratorium",
    "Precision Cooling Surabaya",
    "PAC HVAC Indonesia",
    "PAS HVAC PAC",
  ],
  alternates: { canonical: "https://www.pramerta.co.id/products/pac" },
  openGraph: {
    title: "Precision Air Conditioning (PAC) | PAS HVAC",
    description:
      "Solusi pendinginan presisi 24/7 untuk data center, cleanroom & laboratorium. Suhu stabil ±1°C, kelembapan ±5% RH.",
    url: "https://www.pramerta.co.id/products/pac",
  },
};

const features = [
  {
    icon: "thermostat",
    title: "Sensible Heat Dominan",
    description:
      "Dirancang khusus menangani beban panas dominan (sensible heat) pada data center dan cleanroom — menurunkan temperatur secara cepat dan stabil, menangani beban panas konstan 24 jam.",
  },
  {
    icon: "tune",
    title: "Presisi & Stabilitas Tinggi",
    description:
      "Menjaga suhu stabil (±1°C) dan kelembapan (±5% RH). Dicapai melalui sensor presisi tinggi, sistem kontrol tertutup (closed loop), dan modulasi kapasitas otomatis.",
  },
  {
    icon: "water_drop",
    title: "Kontrol Kelembapan Aktif",
    description:
      "Dilengkapi sistem humidifikasi, dehumidifikasi, dan reheat control untuk mencegah risiko kondensasi & korosi (kelembapan tinggi) maupun electrostatic discharge ESD (kelembapan rendah).",
  },
  {
    icon: "air",
    title: "Airflow Terarah & Optimal",
    description:
      "Menggunakan high air volume dan targeted airflow. Mendukung implementasi hot aisle–cold aisle (data center) dan laminar flow (cleanroom) untuk distribusi udara yang optimal.",
  },
  {
    icon: "backup",
    title: "Reliability & Redundancy",
    description:
      "Dirancang untuk operasi 24/7 dengan keandalan tinggi. Sistem cadangan redundancy N+1 memastikan jika satu unit gagal, sistem tetap berjalan tanpa gangguan.",
  },
  {
    icon: "air_purifier_gen",
    title: "Filtrasi Bertingkat",
    description:
      "Mendukung sistem filtrasi berlapis: Pre-filter, Medium filter, hingga HEPA / ULPA filter untuk cleanroom. Memenuhi standar kebersihan udara industri yang ketat.",
  },
];

const comparisonRows = [
  { param: "Tujuan", hvac: "Kenyamanan manusia", pac: "Kebutuhan kritikal" },
  { param: "Suhu", hvac: "Fluktuatif", pac: "Stabil (±1°C)" },
  { param: "Kelembapan", hvac: "Tidak terkontrol", pac: "Presisi (±5% RH)" },
  { param: "Operasi", hvac: "Tidak kontinu", pac: "24/7 Non-stop" },
  { param: "Airflow", hvac: "Rendah", pac: "Tinggi & terarah" },
  { param: "Reliability", hvac: "Standar", pac: "Tinggi + Redundancy" },
];

const applications = [
  { icon: "dns", title: "Data Center", desc: "Server room, colocation, edge computing" },
  { icon: "science", title: "Cleanroom", desc: "Farmasi, semikonduktor, elektronik" },
  { icon: "biotech", title: "Laboratorium", desc: "Riset, QC, pengujian material" },
  { icon: "precision_manufacturing", title: "Ruang Kritikal Industri", desc: "Kontrol proses produksi presisi" },
];

const WA_NUMBER = "628155503777";

export default function PACProductPage() {
  const waMessage = encodeURIComponent(
    "Halo PAS HVAC, saya ingin konsultasi mengenai Precision Air Conditioning (PAC) untuk kebutuhan kami."
  );

  const pacFaqs = [
    {
      question: "Apa perbedaan PAC (Precision Air Conditioning) dengan AC komersial?",
      answer: "AC komersial dirancang untuk kenyamanan manusia (fokus pada suhu), sedangkan PAC dirancang khusus untuk mendinginkan mesin IT/server secara kontinu 24/7. PAC memiliki kontrol suhu sangat presisi (±1°C) dan kontrol kelembapan (±5% RH) yang mutlak dibutuhkan di ruang server.",
    },
    {
      question: "Apakah PAC mutlak diperlukan untuk Data Center?",
      answer: "Sangat mutlak. Server IT menghasilkan beban panas sensibel (panas kering) yang sangat tinggi. Jika didinginkan dengan AC biasa, ruangan akan menjadi terlalu kering (memicu listrik statis) atau terlalu lembap (memicu kondensasi/karat). PAC mengatasi hal ini secara otomatis.",
    },
    {
      question: "Berapa kapasitas pendinginan PAC yang tersedia?",
      answer: "Kami menyediakan berbagai rentang kapasitas (biasanya 5 kW hingga 100+ kW per unit) baik dengan sistem Direct Expansion (DX) yang mandiri, maupun Chilled Water (CW) yang terhubung dengan Chiller utama gedung.",
    },
    {
      question: "Di mana saja aplikasi sistem PAC selain data center?",
      answer: "Selain ruang server/IT, PAC sangat esensial untuk laboratorium presisi, ruang metrologi, fasilitas manufaktur semikonduktor, cleanroom, dan ruang penyimpanan arsip/benda seni bernilai tinggi.",
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 py-24">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #06b6d4 0%, transparent 50%), radial-gradient(circle at 80% 20%, #0891b2 0%, transparent 50%)" }}
          />
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Link href="/" className="text-cyan-300/70 hover:text-cyan-300 text-sm transition-colors">Beranda</Link>
              <span className="text-cyan-700">/</span>
              <span className="text-cyan-300 text-sm font-semibold">Precision Air Conditioning (PAC)</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-400/10 border border-cyan-400/30 rounded-full">
                  <span className="material-symbols-outlined text-cyan-400 text-base">verified</span>
                  <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Precision Cooling Solution</span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                  Precision Air<br />
                  <span className="text-cyan-400">Conditioning</span> (PAC)
                </h1>

                <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
                  Solusi pendinginan presisi untuk <strong className="text-white">Data Center, Cleanroom & Laboratorium</strong> — menjaga stabilitas, melindungi investasi Anda 24 jam non-stop.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    Konsultasi Gratis
                  </a>
                  <a
                    href="#fitur"
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">expand_more</span>
                    Pelajari Fitur
                  </a>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "±1°C", label: "Stabilitas Suhu", icon: "thermostat" },
                  { value: "±5% RH", label: "Presisi Kelembapan", icon: "water_drop" },
                  { value: "24/7", label: "Operasi Kontinu", icon: "schedule" },
                  { value: "N+1", label: "Redundancy System", icon: "backup" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
                    <span className="material-symbols-outlined text-cyan-400 text-3xl mb-2 block">{stat.icon}</span>
                    <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why PAC Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="text-cyan-600 font-bold text-xs tracking-[0.3em] uppercase mb-3">Mengapa PAC?</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                HVAC Biasa Tidak Cukup untuk Ruang Kritikal
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Ruang kritikal membutuhkan lebih dari sekadar "dingin". Dibutuhkan stabilitas tanpa fluktuasi, presisi suhu & kelembapan, dan kemampuan bekerja 24/7 tanpa henti.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 rounded-2xl p-8 mb-8">
              <h3 className="font-extrabold text-slate-900 text-lg mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-red-500">warning</span>
                Ketidakstabilan sistem pendingin dapat menyebabkan:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Kerusakan perangkat & equipment", "Penurunan performa sistem produksi", "Kegagalan proses & downtime"].map((risk) => (
                  <div key={risk} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                    <span className="material-symbols-outlined text-red-500 shrink-0">cancel</span>
                    <span className="text-sm font-semibold text-slate-700">{risk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="fitur" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="text-cyan-600 font-bold text-xs tracking-[0.3em] uppercase mb-3">Fitur Unggulan</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
                PAC Dirancang untuk Kebutuhan Kritikal
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.title} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                  <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-cyan-100 transition-colors">
                    <span className="material-symbols-outlined text-cyan-600 text-2xl">{f.icon}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="text-cyan-600 font-bold text-xs tracking-[0.3em] uppercase mb-3">Perbandingan</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
                Apa Bedanya HVAC Biasa & PAC?
              </h2>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="px-6 py-4 font-bold text-sm">Parameter</th>
                    <th className="px-6 py-4 font-bold text-sm text-center">HVAC / AC Biasa</th>
                    <th className="px-6 py-4 font-bold text-sm text-center bg-cyan-600">PAC (Presisi)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {comparisonRows.map((row, i) => (
                    <tr key={row.param} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-6 py-4 font-bold text-slate-700 text-sm">{row.param}</td>
                      <td className="px-6 py-4 text-center text-slate-500 text-sm">{row.hvac}</td>
                      <td className="px-6 py-4 text-center font-bold text-cyan-700 text-sm bg-cyan-50">{row.pac}</td>
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
              <div className="text-cyan-400 font-bold text-xs tracking-[0.3em] uppercase mb-3">Aplikasi</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
                Solusi untuk Berbagai Ruang Kritikal
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {applications.map((app) => (
                <div key={app.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
                  <span className="material-symbols-outlined text-cyan-400 text-4xl mb-3 block">{app.icon}</span>
                  <h3 className="font-extrabold text-white text-base mb-1">{app.title}</h3>
                  <p className="text-slate-400 text-xs">{app.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ 
          items={pacFaqs} 
          title="FAQ: Precision Cooling" 
          description="Pertanyaan teknis seputar sistem pendinginan presisi (PAC)." 
          badge="Tanya Jawab" 
          className="py-16 bg-white" 
        />

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-700">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
              Butuh Solusi PAC untuk Fasilitas Anda?
            </h2>
            <p className="text-cyan-100 text-lg mb-8 max-w-2xl mx-auto">
              Tim engineering PAS HVAC siap membantu menganalisis kebutuhan, merancang sistem PAC yang tepat, dan memberikan penawaran kompetitif.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-cyan-700 px-10 py-4 rounded-xl font-extrabold text-sm hover:bg-cyan-50 transition-all shadow-xl flex items-center gap-2"
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
            "name": "Precision Air Conditioning (PAC)",
            "description":
              "Solusi pendinginan presisi untuk Data Center, Cleanroom & Laboratorium. Menjaga suhu stabil ±1°C dan kelembapan ±5% RH dengan operasi 24/7 kontinu.",
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
