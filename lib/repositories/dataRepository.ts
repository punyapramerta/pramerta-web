import _portfolioJson from "@/lib/data/portfolioData.json";

export const WA_NUMBER = "628155503777";

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
  title: "Solusi HVAC Industri yang Tepat, Cepat, dan Terpercaya",
  accentWord: "Tepat, Cepat,",
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
    badge: "Konsultasi Gratis",
    title: "Siap Meningkatkan Sistem HVAC Industri Anda?",
    description:
      "Hubungi konsultan teknis kami hari ini untuk mendapatkan penawaran khusus atau survei lokasi gratis.",
    benefits: [
      { icon: "call", text: "031-995-48097", description: "Telepon Office" },
      { icon: "mail", text: "Sales@pramerta.co.id", description: "Email Sales" },
    ],
  },
  right: {
    title: "Minta Penawaran Cepat",
    subtitle: "Ceritakan kebutuhan HVAC Anda...",
    successTitle: "Permintaan Terkirim!",
    successDescription: "Terima kasih, tim kami akan segera menghubungi Anda.",
    submitButton: "Kirim Penawaran",
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
  },
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
