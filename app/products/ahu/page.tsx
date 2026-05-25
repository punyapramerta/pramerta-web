import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQ from "@/components/home/FAQ";

export const metadata: Metadata = {
  title: "Air Handling Unit (AHU) | PAS HVAC Surabaya",
  description:
    "Solusi Air Handling Unit (AHU) terpercaya untuk gedung komersial, rumah sakit, industri manufaktur di Surabaya & Jakarta. Desain custom, instalasi profesional, garansi purna jual. PT. Pratama Amerta Solusi.",
  keywords: [
    "Air Handling Unit",
    "AHU HVAC Indonesia",
    "Air Handling Unit Surabaya",
    "AHU Industri",
    "Air Handling Unit Jakarta",
    "Kontraktor HVAC AHU",
    "PAS HVAC AHU",
  ],
  alternates: { canonical: "https://www.pramerta.co.id/products/ahu" },
  openGraph: {
    title: "Air Handling Unit (AHU) | PAS HVAC Surabaya",
    description:
      "Solusi AHU custom untuk gedung komersial, rumah sakit & industri. Desain presisi, instalasi oleh tim tersertifikasi.",
    url: "https://www.pramerta.co.id/products/ahu",
  },
};

const WA_NUMBER = "628155503777";

const features = [
  {
    icon: "air",
    title: "Penanganan Udara Terpusat",
    description:
      "AHU mengolah udara secara terpusat — menyaring, mendinginkan atau memanaskan, melembabkan, dan mendistribusikan udara bersih ke seluruh zona gedung melalui sistem ducting. Cocok untuk gedung bertingkat dengan multiple zone.",
  },
  {
    icon: "filter_alt",
    title: "Sistem Filtrasi Bertingkat",
    description:
      "Dilengkapi filter pre-filter, medium filter, hingga HEPA opsional. Menyaring debu, partikel halus, bakteri, dan kontaminan udara. Penting untuk rumah sakit, laboratorium, dan fasilitas yang membutuhkan kualitas udara tinggi.",
  },
  {
    icon: "water_drop",
    title: "Kontrol Kelembapan",
    description:
      "Sistem humidifier dan dehumidifier terintegrasi untuk menjaga kelembapan relatif (RH) dalam rentang ideal 40–60% RH. Mencegah kondensasi, korosi, dan ketidaknyamanan penghuni.",
  },
  {
    icon: "heat_pump",
    title: "Efisiensi Energi VFD",
    description:
      "Fan motor dilengkapi Variable Frequency Drive (VFD) untuk mengatur kecepatan putaran sesuai kebutuhan beban aktual. Penghematan konsumsi listrik hingga 30–40% dibandingkan sistem on/off konvensional.",
  },
  {
    icon: "settings",
    title: "Custom Engineering",
    description:
      "Setiap unit AHU kami dirancang custom sesuai kebutuhan spesifik proyek: kapasitas airflow (CFM/m³/h), tekanan statik, jumlah coil, jenis filter, material casing (galvanized/stainless steel), dan konfigurasi layout ruang.",
  },
  {
    icon: "build",
    title: "Instalasi & Commissioning",
    description:
      "Tim engineer bersertifikat kami menangani instalasi lengkap: ductwork, electrical connection, kontrol otomasi BMS, uji operasi, dan commissioning. Garansi spare part dan layanan maintenance berkala tersedia.",
  },
];

const applications = [
  { icon: "apartment", title: "Gedung Perkantoran", desc: "High-rise office, coworking space, commercial building" },
  { icon: "local_hospital", title: "Rumah Sakit & Klinik", desc: "OT, ICU, NICU, farmasi, laboratorium medis" },
  { icon: "factory", title: "Industri Manufaktur", desc: "Pabrik farmasi, elektronik, makanan & minuman" },
  { icon: "hotel", title: "Hospitality", desc: "Hotel bintang, resort, convention center" },
  { icon: "school", title: "Pendidikan & Publik", desc: "Universitas, auditorium, pusat perbelanjaan" },
  { icon: "warehouse", title: "Cold Storage & Gudang", desc: "Warehouse berpendingin, cold chain logistics" },
];

const specs = [
  { param: "Kapasitas Airflow", value: "500 – 50.000 CFM (custom)" },
  { param: "Tekanan Statik", value: "50 – 1.000 Pa (ESP)" },
  { param: "Efisiensi Filter", value: "G4 / F7 / F9 / HEPA H13" },
  { param: "Tipe Coil", value: "Chilled Water / DX Refrigerant" },
  { param: "Material Casing", value: "Galvanized / Stainless Steel / Aluminium" },
  { param: "Drive Fan", value: "Direct Drive / Belt Drive + VFD" },
  { param: "Kontrol", value: "Manual / DDC / BMS Integration" },
  { param: "Sertifikasi", value: "SNI, SMACNA, ISO 9001" },
];

export default function AHUProductPage() {
  const waMessage = encodeURIComponent(
    "Halo PAS HVAC, saya ingin konsultasi mengenai Air Handling Unit (AHU) untuk proyek kami."
  );

  const ahuFaqs = [
    {
      question: "Apa fungsi utama dari Air Handling Unit (AHU)?",
      answer: "AHU berfungsi untuk mengambil udara luar (fresh air), menyaring partikel/debu, mendinginkan udara menggunakan cooling coil (terhubung ke Chiller), dan mendistribusikannya ke seluruh gedung. Sangat ideal untuk area berskala besar.",
    },
    {
      question: "Apa perbedaan AHU dengan AC komersial biasa?",
      answer: "AHU mampu mengontrol asupan udara segar (fresh air) dari luar gedung, sementara AC biasa hanya mensirkulasi udara di dalam ruangan. Ini mencegah 'Sick Building Syndrome' dengan memastikan pasokan oksigen tercukupi.",
    },
    {
      question: "Apakah PAS HVAC menyediakan AHU standar medis / Cleanroom?",
      answer: "Ya, kami melayani pengadaan dan instalasi Hygienic AHU yang dirancang khusus untuk ruang operasi (OK), laboratorium, dan industri farmasi. Unit ini dilengkapi integrasi HEPA Filter dan UV-C Sterilizer.",
    },
    {
      question: "Bagaimana proses maintenance AHU?",
      answer: "Pemeliharaan rutin sangat penting untuk menjaga kualitas udara (IAQ) dan efisiensi. Ini mencakup penggantian pre-filter dan medium filter, pembersihan cooling coil, pengecekan V-belt motor, serta kalibrasi sensor VFD.",
    },
  ];

  return (
    <>
      <Navbar />
      <main>
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
              <Link href="/" className="text-blue-300/70 hover:text-blue-300 transition-colors">Beranda</Link>
              <span className="text-blue-700">/</span>
              <Link href="/products/pac" className="text-blue-300/70 hover:text-blue-300 transition-colors">Produk</Link>
              <span className="text-blue-700">/</span>
              <span className="text-blue-300 font-semibold">Air Handling Unit (AHU)</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-400/10 border border-blue-400/30 rounded-full">
                  <span className="material-symbols-outlined text-blue-400 text-base">verified</span>
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Sistem HVAC Terpusat</span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                  Air Handling Unit<br />
                  <span className="text-blue-400">(AHU)</span>
                </h1>

                <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
                  Solusi pengolahan udara terpusat untuk <strong className="text-white">gedung komersial, rumah sakit, dan industri manufaktur</strong> — distribusi udara bersih, hemat energi, dan fully customizable.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    Konsultasi Gratis
                  </a>
                  <a
                    href="#spesifikasi"
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">expand_more</span>
                    Lihat Spesifikasi
                  </a>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "Custom", label: "Airflow Design", icon: "air" },
                  { value: "VFD", label: "Hemat Energi 30%", icon: "bolt" },
                  { value: "HEPA", label: "Filter Tersedia", icon: "filter_alt" },
                  { value: "BMS", label: "Integrasi Otomasi", icon: "settings" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
                    <span className="material-symbols-outlined text-blue-400 text-3xl mb-2 block">{stat.icon}</span>
                    <div className="text-2xl font-extrabold text-white mb-1">{stat.value}</div>
                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why AHU Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="text-blue-600 font-bold text-xs tracking-[0.3em] uppercase mb-3">Mengapa AHU?</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Solusi Udara Terpusat untuk Gedung Skala Besar
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Air Handling Unit adalah jantung dari sistem HVAC terpusat. Berbeda dengan unit AC split yang menangani satu ruangan, AHU mengolah udara secara besar-besaran dan mendistribusikannya melalui jaringan ducting ke ratusan titik di seluruh gedung — memberikan kontrol kualitas udara, suhu, dan kelembapan yang konsisten di setiap zona.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: "hub", title: "Sistem Terpusat", desc: "Satu unit AHU dapat melayani puluhan hingga ratusan ruangan sekaligus melalui sistem ducting yang terintegrasi." },
                { icon: "savings", title: "Biaya Operasional Lebih Rendah", desc: "Dengan VFD dan kontrol BMS, konsumsi listrik dapat ditekan 25–40% dibanding sistem terpisah." },
                { icon: "health_and_safety", title: "Kualitas Udara Terjamin", desc: "Filtrasi bertingkat memastikan udara bersih dari debu, bakteri, dan polutan sebelum didistribusikan." },
              ].map((item) => (
                <div key={item.title} className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                  <span className="material-symbols-outlined text-blue-600 text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="font-extrabold text-slate-900 text-base mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="fitur" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="text-blue-600 font-bold text-xs tracking-[0.3em] uppercase mb-3">Fitur Unggulan</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
                AHU PAS HVAC: Dirancang untuk Performa Maksimal
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.title} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                    <span className="material-symbols-outlined text-blue-600 text-2xl">{f.icon}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specifications Table */}
        <section id="spesifikasi" className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="text-blue-600 font-bold text-xs tracking-[0.3em] uppercase mb-3">Spesifikasi Teknis</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
                Parameter AHU yang Kami Tangani
              </h2>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="px-6 py-4 font-bold text-sm">Parameter</th>
                    <th className="px-6 py-4 font-bold text-sm text-center bg-blue-600">Kapabilitas PAS HVAC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {specs.map((row, i) => (
                    <tr key={row.param} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-6 py-4 font-bold text-slate-700 text-sm">{row.param}</td>
                      <td className="px-6 py-4 text-center font-semibold text-blue-700 text-sm bg-blue-50/30">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-center text-sm text-slate-400 mt-4">
              * Semua spesifikasi dapat dikustomisasi sesuai kebutuhan proyek Anda. Hubungi tim engineering kami untuk konsultasi.
            </p>
          </div>
        </section>

        {/* Applications */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="text-blue-400 font-bold text-xs tracking-[0.3em] uppercase mb-3">Aplikasi</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
                AHU untuk Berbagai Sektor Industri
              </h2>
              <p className="text-slate-400 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                Pengalaman lebih dari 7 tahun melayani proyek AHU di Surabaya, Jakarta, dan seluruh Indonesia — dari gedung 5 lantai hingga pabrik farmasi skala besar.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {applications.map((app) => (
                <div key={app.title} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-all">
                  <span className="material-symbols-outlined text-blue-400 text-3xl mb-3 block">{app.icon}</span>
                  <h3 className="font-extrabold text-white text-sm mb-1">{app.title}</h3>
                  <p className="text-slate-400 text-[11px] leading-snug">{app.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Links to Other Products */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Produk Lainnya</p>
              <h2 className="text-2xl font-extrabold text-slate-900">Solusi HVAC Lengkap dari PAS HVAC</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { href: "/products/chiller", icon: "ac_unit", title: "Chiller & VRF System", desc: "Sistem pendingin sentral untuk gedung bertingkat dan industri besar." },
                { href: "/products/ducting", icon: "air", title: "Sheet Metal Ducting", desc: "Fabricasi dan instalasi ducting BJLS & textile duct standar SMACNA." },
                { href: "/products/pac", icon: "memory", title: "Precision Air Conditioning", desc: "Pendinginan presisi untuk data center, cleanroom, dan laboratorium." },
              ].map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <span className="material-symbols-outlined text-blue-600 text-xl">{p.icon}</span>
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 text-sm mb-1 group-hover:text-blue-700 transition-colors">{p.title}</div>
                    <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ 
          items={ahuFaqs} 
          title="FAQ: Air Handling Unit" 
          description="Pertanyaan yang sering diajukan seputar instalasi dan fungsi AHU." 
          badge="Tanya Jawab" 
          className="py-16 bg-white" 
        />

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
              Butuh AHU untuk Gedung atau Pabrik Anda?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Tim engineering PAS HVAC siap membantu perhitungan beban, desain sistem, pengadaan, instalasi, hingga commissioning AHU Anda.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-700 px-10 py-4 rounded-xl font-extrabold text-sm hover:bg-blue-50 transition-all shadow-xl flex items-center gap-2"
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
            "name": "Air Handling Unit (AHU)",
            "description":
              "Solusi Air Handling Unit (AHU) untuk gedung komersial, rumah sakit, dan industri manufaktur. Custom engineering, instalasi profesional, standar SNI & SMACNA.",
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
