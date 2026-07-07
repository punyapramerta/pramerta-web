import _portfolioJson from "@/lib/data/portfolioData.json";

export const WA_NUMBER = "6285880006888";

export const companyData = {
  name: "PT. Pratama Amerta Solusi",
  brand: "PAS HVAC",
  since: 2018,
  contact: {
    whatsapp: WA_NUMBER,
    office: "031-995-48097",
    email: "Sales@pramerta.co.id",
  },
  platforms: ["FRIMEC", "Gree"],
};

export const heroData = {
  badge: "Authorized Distributor FRIMEC & Gree",
  title: "Solusi Tata Udara Industri & Kontraktor HVAC Terpercaya",
  accentWord: "Kontraktor HVAC",
  description:
    "Kami adalah perusahaan engineering HVAC yang berfokus pada inovasi dan teknologi terkini. Melayani procurement, instalasi, maintenance, Precision Air Conditioning (PAC), serta ducting untuk berbagai sektor industri — mulai dari data center, cleanroom, hingga laboratorium.",
  bullets: [
    { icon: "verified", text: "Authorized Distributor FRIMEC & Gree" },
    { icon: "engineering", text: "Tim Teknisi Tersertifikasi" },
    { icon: "speed", text: "Pengiriman & Instalasi Cepat" },
  ],
  socialProof: {
    count: "150+",
    text: "Happy Customer",
  },
};

export const aboutData = {
  badge: "Tentang Kami",
  title: "Memberikan Solusi HVAC Terbaik di Setiap Industri",
  description1:
    "Sejak tahun 2018, PT. Pratama Amerta Solusi (PAS HVAC) telah menjadi mitra terpercaya dalam penyediaan solusi HVAC canggih. Kami adalah perusahaan engineering yang digerakkan oleh inovasi, dengan spesialisasi pada sistem pendingin udara industri termasuk Precision Air Conditioning (PAC) untuk ruang kritikal.",
  description2:
    "Sebagai distributor resmi FRIMEC (Eropa) dan Gree, kami menyediakan Air Handling Unit, Chiller, VRF System, Precision Air Conditioning (PAC) untuk Data Center & Cleanroom, Sheet Metal Ducting, hingga Textile Duct untuk kebutuhan manufaktur, F&B, energi, dan sipil.",
  points: [
    "Authorized Distributor FRIMEC & Gree",
    "Teknisi Tersertifikasi & Berpengalaman",
    "Layanan Procurement hingga After-Sales",
  ],
};

export const testimonialsData = [
  {
    stars: 5,
    quote:
      "Tim PAS HVAC sangat profesional. Instalasi chiller untuk gedung pabrik kami selesai tepat waktu dan hasilnya sangat memuaskan.",
    name: "Budi Hartanto",
    title: "Facility Manager",
    company: "PT. Wilmar Group",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2CGi-SMKlMessttzxaqnH0pBkw_YQQgJbmlH-sm1JDx-gQutfkyO6sWnlHE8O8c6gA2btqHx-gO-AokqNjmfgVwseOCaOcY43_QfUR7OwfPg8WwnaWjc7UIEl43dCOyCsWSlZtHq0v84xdPT_Zc4z7S0FaJf-2AKbn2955u20tGAHgJmxfn6onioeR42rRKmUJjuY-mpGo4sHyqLZ-c52tq6z7-fsBuAGduY5L8o3hHXJPY0UaljnCvDYUWaKnNnmO-Uq8L185oC9",
  },
  {
    stars: 5,
    quote:
      "Textile duct yang dipasang PAS HVAC di warehouse kami distribusi udaranya sangat merata. Kualitas produk FRIMEC benar-benar terbukti.",
    name: "Sari Kusuma",
    title: "Engineering Head",
    company: "PT. Semen Indonesia Group",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDlDIdALW0q0_sj_kMVcGwfInT_DWKzoQ8qKtHPGjNQ-eIpFyYF-lQwfg-d5mmOrSpf96QDupKs1G0Ra56wffRuUc-FZeoLBejtmVqb_KifQ29h9dhMuzREECpUNkYc-SiPutKkiEK5x9f19gBDesxF2D4PSv71y7zK-GjRpVFvZa7Kzhl0vKG1DJjjk-A3WnKvpi6EgeuxOVxVMDI4C_q6R0-M3d12q-16jJnrVfQ3UPvNTWqkVrcI1fiDEC4muKtSziOG4tTiOxL1",
  },
  {
    stars: 5,
    quote:
      "Preventive maintenance contract dari PAS HVAC sangat membantu kami menjaga uptime produksi. Respon cepat dan teknisinya kompeten.",
    name: "Andri Wibowo",
    title: "Maintenance Director",
    company: "PT. Pertamina Group",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdLyXRDL_sOPCDCNtpB5icthFopeBbT6ZYovAfrEWJOEYfqhlE3Jz1JbSVho4-W1f-ozh0Wx_qIXvDLAYViXJ50xacuoAcS2-a1UNgp4pmlSwPbxCocVC5_8ly6VufAno7IKeNjFqi5LK7iYmaPPcnWaAPidlmG8MEGluScDqnts6xL46z1q-ChBiKI9yBs9dgHfAryRp29-s49qYnBnvoF3RS7ulaXWYXw-1sGJWNA3rNwzTWTTMOfq6UKCKngTWkWJoJ2ZJbANGZ",
  },
];

export const leadFormData = {
  left: {
    badge: "Konsultasi Gratis & Site Survey",
    title: "Mencari Kontraktor HVAC B2B Terpercaya?",
    description:
      "Dapatkan solusi tata udara industri yang optimal. Hubungi konsultan teknis kami hari ini untuk request quotation (RFQ) atau survei lokasi gratis.",
    benefits: [
      { icon: "call", text: "0858-8000-6888", description: "Sales HVAC (Bu Vava)" },
      { icon: "mail", text: "Sales@pramerta.co.id", description: "Email Sales" },
    ],
  },
  right: {
    title: "Request for Quotation (RFQ)",
    subtitle: "Ceritakan kebutuhan proyek HVAC Anda...",
    successTitle: "Permintaan Terkirim!",
    successDescription: "Terima kasih, tim sales engineer kami akan segera memproses RFQ Anda.",
    submitButton: "Kirim Request (RFQ)",
    whatsappButton: "WhatsApp Us",
  },
  options: [
    "Air Handling Unit (AHU)",
    "Chiller System",
    "VRF / Residential AC",
    "Precision Air Conditioning (PAC)",
    "Sheet Metal Ducting",
    "Textile / Fabric Duct",
    "Maintenance & Service",
    "Procurement Parts",
    "Lainnya",
  ],
};

export const certsData = [
  { name: "SNI", subtitle: "Indonesian Standard", icon: "verified", description: "Memenuhi Standar Nasional Indonesia untuk kualitas produk dan layanan HVAC." },
  { name: "SMACNA", subtitle: "Ducting Standard", icon: "engineering", description: "Standar fabrikasi ducting sheet metal mengacu pada SMACNA International." },
  { name: "ISO 9001:2015", subtitle: "Quality Management", icon: "workspace_premium", description: "Sistem manajemen mutu tersertifikasi ISO untuk proses kerja yang konsisten." },
  { name: "KBLI", subtitle: "Certified Business", icon: "apartment", description: "Klasifikasi baku bidang usaha resmi terdaftar di Indonesia." },
];

export const clientsData = [
  { name: "APP Sinarmas", image: "/images/clients/sinarmas.jpeg" },
  { name: "Indonesia Power", image: "/images/clients/indonesia-power.jpeg" },
  { name: "Pertamina Hulu Energi", image: "/images/clients/pertamina.jpeg" },
  { name: "Jasuindo", image: "/images/clients/jasuindo.jpeg" },
  { name: "PT Agrofarm", image: "/images/clients/agrofarm.jpeg" },
  { name: "Prihoda", image: "/images/clients/prihoda.jpeg" },
];

export const productsData = [
  {
    category: "Air Handling Unit",
    badge: "FRIMEC",
    badgeClass: "bg-primary/10 text-primary",
    name: "Air Handling Unit",
    description:
      "AHU berkualitas Eropa dengan desain kompak, instalasi mudah, dan efisiensi energi tinggi untuk berbagai aplikasi industri dan komersial.",
    details: [
      { label: "Tipe", value: "Packaged / Modular" },
      { label: "Principal", value: "FRIMEC Group" },
    ],
    image: "/images/page3_img2.jpeg",
    imageAlt: "Air Handling Unit FRIMEC",
    imageCover: false,
    href: "/products/ahu",
    content: "Air Handling Unit (AHU) dari FRIMEC dirancang khusus untuk memenuhi standar distribusi sirkulasi udara skala besar yang membutuhkan penyaringan, pendinginan, serta pemanasan yang optimal. Dilengkapi efisiensi tinggi, struktur modular, serta sertifikasi standar mutu global, menjadikannya pilihan andal untuk ruang komersial, fasilitas kesehatan, maupun pabrik industrial.",
    features: [
      { icon: "ac_unit", title: "Pendinginan Optimal", description: "Performa pertukaran panas terbaik dengan koil berdesain presisi tinggi." },
      { icon: "build", title: "Instalasi Fleksibel", description: "Sistem modular memudahkan instalasi pada berbagai layout bangunan." },
      { icon: "bolt", title: "Hemat Energi", description: "Menggunakan motor kipas berstandar IE3 untuk efisiensi listrik." },
    ],
    applications: [
      { icon: "local_hospital", title: "Rumah Sakit", desc: "Sirkulasi udara higienis untuk ruang operasi." },
      { icon: "store", title: "Mall / Retail", desc: "Tata udara nyaman untuk area publik luas." },
      { icon: "factory", title: "Pabrik", desc: "Ventilasi optimal bagi fasilitas produksi." },
    ],
    faqs: [
      { question: "Apakah AHU FRIMEC mendukung custom filter?", answer: "Ya, kami menyediakan opsi integrasi HEPA filter untuk ruangan berstandar kebersihan tinggi." },
      { question: "Berapa kapasitas aliran udara (CFM) maksimal yang tersedia?", answer: "Kapasitas modular kami sangat bervariasi, dari ratusan hingga puluhan ribu CFM sesuai desain." },
    ],
    metaTitle: "Air Handling Unit (AHU) FRIMEC | PAS HVAC",
    metaDesc: "Distributor AHU FRIMEC resmi. Menghadirkan efisiensi tata udara untuk industri dan komersial dengan desain modular presisi.",
    targetKeyword: "Air Handling Unit AHU Surabaya",
  },
  {
    category: "Chiller System",
    badge: "GREE",
    badgeClass: "bg-tertiary-container/10 text-tertiary",
    name: "Chiller & VRF System",
    description:
      "Sistem pendingin udara komersial dari Gree dengan teknologi inverter terdepan. VRF multi-split efisiensi tinggi untuk gedung besar.",
    details: [
      { label: "Tipe", value: "Screw / Modular" },
      { label: "Principal", value: "Gree Electric" },
    ],
    image: "/images/page4_img3.jpeg",
    imageAlt: "Gree Air Handling Unit",
    imageCover: false,
    href: "/products/chiller",
    content: "Gree Chiller dan VRF System dirancang untuk menghadirkan kenyamanan termal terpusat dalam skala gedung bertingkat. Menggunakan inovasi kompresor inverter yang bekerja secara pintar menyesuaikan beban pendinginan gedung, investasi produk HVAC ini memastikan biaya operasional (OPEX) lebih rendah secara berkelanjutan.",
    features: [
      { icon: "precision_manufacturing", title: "Kompresor Inverter", description: "Menghemat konsumsi listrik hingga 30% pada beban parsial." },
      { icon: "thermostat", title: "Kontrol Presisi", description: "Suhu ruangan terkontrol stabil, menghindari fluktuasi drastis." },
      { icon: "device_thermostat", title: "Ramah Lingkungan", description: "Refrigerant generasi terbaru yang tidak merusak lapisan ozon." },
    ],
    applications: [
      { icon: "apartment", title: "Gedung Perkantoran", desc: "Solusi AC terpusat untuk efisiensi ruang dan energi." },
      { icon: "hotel", title: "Hotel & Resort", desc: "Kenyamanan tanpa suara bising pada kamar tidur." },
    ],
    faqs: [
      { question: "Apakah sistem VRF bisa dikontrol terpusat?", answer: "Sangat bisa, Gree VRF mendukung sistem kontrol terpusat via software manajemen gedung." },
    ],
    metaTitle: "Chiller & VRF System GREE | Solusi HVAC Terpusat",
    metaDesc: "GREE Chiller dan Sistem VRF untuk bangunan bertingkat. Efisien energi, canggih, dan ramah lingkungan.",
    targetKeyword: "Gree VRF Chiller Indonesia",
  },
  {
    category: "Precision Cooling",
    badge: "PAC",
    badgeClass: "bg-cyan-100 text-cyan-700",
    name: "Precision Air Conditioning",
    description:
      "Solusi pendinginan presisi 24/7 untuk data center, cleanroom, dan laboratorium. Menjaga suhu stabil (±1°C) dan kelembapan presisi (±5% RH) dengan sistem kontrol tertutup.",
    details: [
      { label: "Operasi", value: "24/7 Kontinu" },
      { label: "Stabilitas", value: "±1°C / ±5% RH" },
    ],
    image: "/images/page4_img3.jpeg",
    imageAlt: "Precision Air Conditioning PAC Data Center",
    imageCover: false,
    href: "/products/pac",
    content: "Berbeda dengan AC kenyamanan biasa, Precision Air Conditioning (PAC) didesain khusus bekerja non-stop 24/7. Produk PAC kami menjamin tingkat kestabilan temperatur serta kelembaban (RH) secara ketat, guna melindungi aset krusial bernilai tinggi dari panas berlebih, korsleting, ataupun kerusakan komponen mikro.",
    features: [
      { icon: "monitor_weight", title: "Sensible Heat Ratio Tinggi", description: "Mampu mendinginkan peralatan IT, bukan sekadar ruang udara." },
      { icon: "dew_point", title: "Kontrol Kelembapan", description: "Sensor pelembap & dehumidifikasi aktif mencegah penumpukan statis." },
      { icon: "cycle", title: "24/7 Reliability", description: "Dirancang beroperasi kontinu sepanjang tahun tanpa henti." },
    ],
    applications: [
      { icon: "dns", title: "Data Center", desc: "Pendinginan konstan untuk server farm." },
      { icon: "science", title: "Laboratorium", desc: "Kontrol iklim ruangan untuk eksperimen sensitif." },
      { icon: "memory", title: "Ruang Kontrol (CCR)", desc: "Menjaga stabilitas instrumen pabrik." },
    ],
    faqs: [
      { question: "Apa bedanya PAC dengan AC komersial biasa?", answer: "PAC berfokus pada sensible cooling (mendinginkan mesin), beroperasi 24/7, dan mengontrol kelembapan dengan presisi sangat tinggi." },
    ],
    metaTitle: "Precision Air Conditioning (PAC) untuk Data Center",
    metaDesc: "Jaga stabilitas server dan alat sensitif Anda dengan Precision Air Conditioning. Suhu presisi, operasional non-stop 24/7.",
    targetKeyword: "Precision Air Conditioning PAC",
  },
  {
    category: "Ducting System",
    badge: "SMACNA Std",
    badgeClass: "bg-secondary-container/30 text-secondary",
    name: "Sheet Metal & Textile Duct",
    description:
      "Produksi ducting presisi tinggi dengan mesin otomatis sesuai standar SMACNA. Tersedia Sheet Metal BJLS/SUS/ALU dan Textile Duct distribusi merata.",
    details: [
      { label: "Material", value: "BJLS / SUS / ALU" },
      { label: "Standar", value: "SMACNA" },
    ],
    image: "/images/page5_img1.jpeg",
    imageAlt: "Sheet Metal Ducting",
    imageCover: true,
    href: "/products/ducting",
    content: "Sebagai komponen vital dalam sirkulasi udara (HVAC), instalasi saluran udara (Ducting) memerlukan akurasi fabrikasi tingkat tinggi. PAS HVAC menyediakan manufaktur ducting Sheet Metal bermaterial unggul (BJLS, Stainless, Aluminium) menggunakan sistem automasi modern, hingga solusi cerdas Textile/Fabric Duct yang menawarkan distribusi udara tanpa draft.",
    features: [
      { icon: "precision_manufacturing", title: "Fabrikasi Otomatis", description: "Pemotongan dan perakitan mesin presisi mengurangi tingkat kebocoran." },
      { icon: "air", title: "Distribusi Rata (Textile)", description: "Teknologi pori mikro untuk sebaran udara menyeluruh tanpa embusan kasar." },
      { icon: "verified", title: "Standar SMACNA", description: "Ketahanan dan dimensi yang diakui regulasi internasional." },
    ],
    applications: [
      { icon: "factory", title: "Industri Manufaktur", desc: "Ekstraksi panas dan ventilasi pabrik." },
      { icon: "storefront", title: "F&B / Restoran", desc: "Exhaust ducting khusus dapur komersial." },
      { icon: "sports_gymnastics", title: "Fasilitas Olahraga", desc: "Aplikasi Textile Duct yang estetis dan efisien." },
    ],
    faqs: [
      { question: "Berapa ketebalan BJLS yang disediakan?", answer: "Kami menyediakan ketebalan bervariasi mulai dari Bwg 0.5 hingga Bwg 1.2, menyesuaikan ukuran ducting dan tekanan (pressure)." },
      { question: "Apakah melayani jasa instalasinya juga?", answer: "Tentu, kami menangani end-to-end mulai dari desain dimensi, fabrikasi mesin, hingga instalasi di lapangan." },
    ],
    metaTitle: "Fabrikasi Sheet Metal Ducting & Textile Duct | PAS HVAC",
    metaDesc: "Pembuatan saluran udara (ducting) standar SMACNA. Berpengalaman untuk proyek industri, komersial, dengan BJLS dan Textile Duct.",
    targetKeyword: "Fabrikasi Ducting BJLS SMACNA",
  }
];

export const statsData = [
  { value: 7, suffix: "+", label: "Tahun Pengalaman", icon: "history" },
  { value: 150, suffix: "+", label: "Happy Customer", icon: "group" },
  { value: 500, suffix: "+", label: "Proyek Selesai", icon: "done_all" },
];

export type PortfolioItem = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  location: string;
  excerpt: string;
  imagePlaceholder: string;
  background: string;
  challenges: string[];
  highlightChallenge: string;
  solution: string[];
  results: string[];
  metrics: { label: string; value: string }[];
  imageNote?: string;
  image?: string;
};

export const portfolioData: PortfolioItem[] = _portfolioJson as PortfolioItem[];
