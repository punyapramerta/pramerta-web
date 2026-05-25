"use client";

import { useState } from "react";

const LAST_UPDATED = "12 Mei 2026";
const MEETING_DATE = "13 Mei 2026";

type Status = "done" | "partial" | "todo" | "blocked";

interface Task {
  name: string;
  status: Status;
  note?: string;
}

interface Phase {
  id: string;
  phase: string;
  title: string;
  progress: number;
  icon: string;
  color: string;
  tasks: Task[];
}

const phases: Phase[] = [
  {
    id: "design",
    phase: "FASE 1",
    title: "Desain & Identitas Brand",
    progress: 100,
    icon: "palette",
    color: "#0056D2",
    tasks: [
      { name: "Logo & brand identity (PAS HVAC)", status: "done" },
      { name: "Color system & typography", status: "done" },
      { name: "Navbar responsif (desktop & mobile)", status: "done" },
      { name: "Footer dengan info cabang Surabaya & Jakarta", status: "done" },
      { name: "Hero background image", status: "done" },
      { name: "Favicon / app icon", status: "done" },
    ],
  },
  {
    id: "homepage",
    phase: "FASE 2",
    title: "Halaman Beranda (Homepage)",
    progress: 95,
    icon: "home",
    color: "#0056D2",
    tasks: [
      { name: "Hero section dengan form lead capture", status: "done" },
      { name: "Stats bar (7+ tahun, 150+ klien, 500+ proyek)", status: "done" },
      { name: "About section dengan ISO badge", status: "done" },
      { name: "Product teaser (4 produk unggulan)", status: "done" },
      { name: "Portfolio section (3 proyek terbaru)", status: "done" },
      { name: "Testimonials section (3 klien)", status: "done" },
      { name: "Certifications section (SNI, SMACNA, ISO, KBLI)", status: "done" },
      { name: "Client logos carousel", status: "done" },
      { name: "Lead gen section + form", status: "done" },
      { name: "OG Image untuk social sharing", status: "partial", note: "File placeholder, perlu diganti foto asli" },
    ],
  },
  {
    id: "content",
    phase: "FASE 3",
    title: "Halaman Produk & Portfolio",
    progress: 85,
    icon: "inventory_2",
    color: "#7C3AED",
    tasks: [
      { name: "Halaman Portfolio listing (dengan sidebar)", status: "done" },
      { name: "Halaman detail Portfolio (study case)", status: "partial", note: "Template sudah ada, konten masih dummy" },
      { name: "Halaman Produk PAC (Precision Air Conditioning)", status: "done" },
      { name: "Halaman produk AHU, Chiller, Ducting", status: "done", note: "Semua halaman produk utama sudah live" },
      { name: "Konten 3 studi kasus porfolio nyata", status: "todo", note: "Perlu foto & narasi proyek asli dari klien" },
      { name: "Foto produk resolusi tinggi", status: "partial", note: "Beberapa sudah ada, beberapa masih placeholder" },
    ],
  },
  {
    id: "blog",
    phase: "FASE 4",
    title: "Blog & Konten Edukasi",
    progress: 55,
    icon: "article",
    color: "#0891B2",
    tasks: [
      { name: "Halaman listing blog (9 artikel placeholder)", status: "done" },
      { name: "Halaman detail artikel blog", status: "done" },
      { name: "Sidebar blog dengan form konsultasi", status: "done" },
      { name: "Artikel blog asli ditulis & dipublish", status: "partial", note: "2 artikel utama (AHU/Chiller) sudah ditulis 800+ kata" },
      { name: "Foto / thumbnail blog artikel", status: "todo", note: "Semua masih placeholder icon" },
      { name: "Sistem manajemen artikel (CMS live)", status: "todo", note: "CMS admin masih mode demo" },
    ],
  },
  {
    id: "whatsapp",
    phase: "FASE 5",
    title: "Integrasi WhatsApp & Lead Gen",
    progress: 100,
    icon: "chat",
    color: "#16A34A",
    tasks: [
      { name: "Nomor WA terpusat: +6281-5550-3777", status: "done" },
      { name: "Form Hero → WA dengan pesan kontekstual", status: "done" },
      { name: "Form Contact Section → WA", status: "done" },
      { name: "Form Lead Gen Bottom → WA", status: "done" },
      { name: "Form Sidebar Portfolio → WA", status: "done" },
      { name: "Form Sidebar Blog → WA", status: "done" },
      { name: "Semua tombol CTA → WA (per konteks)", status: "done" },
      { name: "Floating WhatsApp Button (semua halaman)", status: "done" },
    ],
  },
  {
    id: "seo",
    phase: "FASE 6",
    title: "SEO & Analytics",
    progress: 80,
    icon: "search",
    color: "#EA580C",
    tasks: [
      { name: "Meta title & description semua halaman", status: "done" },
      { name: "Schema JSON-LD (Organization, Article, Breadcrumb)", status: "done" },
      { name: "Sitemap.xml otomatis", status: "done" },
      { name: "Robots.txt", status: "done" },
      { name: "Canonical URL", status: "done" },
      { name: "Google Analytics 4 (GA4) terpasang", status: "done" },
      { name: "Google Search Console verifikasi", status: "partial", note: "Perlu domain live untuk submit sitemap" },
      { name: "Core Web Vitals optimasi gambar", status: "partial", note: "hero-bg.jpg perlu dikompresi (2MB)" },
      { name: "Alt text semua gambar produk", status: "partial", note: "Beberapa sudah ada, perlu review" },
    ],
  },
  {
    id: "admin",
    phase: "FASE 7",
    title: "Admin CMS (Back Office)",
    progress: 40,
    icon: "admin_panel_settings",
    color: "#DC2626",
    tasks: [
      { name: "Halaman login admin", status: "done" },
      { name: "Dashboard admin UI", status: "done" },
      { name: "Editor konten homepage (UI)", status: "done" },
      { name: "Manajemen blog (UI)", status: "done" },
      { name: "Manajemen portfolio (UI)", status: "done" },
      { name: "Analytics dashboard (UI)", status: "done" },
      { name: "Backend database (simpan data nyata)", status: "todo", note: "CMS masih mode demo, belum ada database" },
      { name: "Upload gambar via CMS", status: "todo", note: "Perlu storage backend (Supabase/S3)" },
      { name: "Autentikasi admin yang aman", status: "partial", note: "Middleware ada, perlu koneksi auth provider" },
    ],
  },
  {
    id: "golive",
    phase: "FASE 8",
    title: "Go Live & Deployment",
    progress: 0,
    icon: "rocket_launch",
    color: "#9333EA",
    tasks: [
      { name: "Pilih & setup hosting (Vercel/VPS)", status: "todo" },
      { name: "Setup domain pramerta.co.id", status: "todo" },
      { name: "SSL certificate (HTTPS)", status: "todo" },
      { name: "Environment variables produksi", status: "todo" },
      { name: "Kompresi & optimasi gambar produksi", status: "todo" },
      { name: "Uji coba semua form & WA link", status: "todo" },
      { name: "Submit sitemap ke Google Search Console", status: "todo" },
      { name: "Uji coba mobile & cross-browser", status: "todo" },
    ],
  },
];

const statusConfig: Record<Status, { label: string; color: string; bg: string; icon: string }> = {
  done: { label: "Selesai", color: "#16A34A", bg: "#F0FDF4", icon: "check_circle" },
  partial: { label: "Sebagian", color: "#D97706", bg: "#FFFBEB", icon: "pending" },
  todo: { label: "Belum", color: "#6B7280", bg: "#F9FAFB", icon: "radio_button_unchecked" },
  blocked: { label: "Blocked", color: "#DC2626", bg: "#FEF2F2", icon: "block" },
};

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  );
}

function PhaseCard({ phase, defaultOpen }: { phase: Phase; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const done = phase.tasks.filter((t) => t.status === "done").length;
  const partial = phase.tasks.filter((t) => t.status === "partial").length;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        className="w-full text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${phase.color}15` }}
              >
                <span className="material-symbols-outlined" style={{ color: phase.color, fontSize: "22px" }}>
                  {phase.icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-extrabold uppercase tracking-widest mb-0.5" style={{ color: phase.color }}>
                  {phase.phase}
                </div>
                <div className="font-extrabold text-gray-900 text-base leading-tight">{phase.title}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="hidden sm:block text-right">
                <div className="text-2xl font-extrabold" style={{ color: phase.color }}>{phase.progress}%</div>
                <div className="text-[10px] text-gray-400 font-bold">
                  {done}/{phase.tasks.length} selesai
                  {partial > 0 && ` · ${partial} sebagian`}
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-400 transition-transform duration-200" style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}>
                expand_more
              </span>
            </div>
          </div>
          <div className="mt-4">
            <ProgressBar value={phase.progress} color={phase.color} />
          </div>
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-50 px-6 pb-6">
          <div className="pt-4 space-y-2">
            {phase.tasks.map((task, i) => {
              const s = statusConfig[task.status];
              return (
                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <span className="material-symbols-outlined text-[18px] flex-shrink-0 mt-0.5" style={{ color: s.color }}>
                    {s.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-800">{task.name}</span>
                      <span
                        className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ color: s.color, background: s.bg }}
                      >
                        {s.label}
                      </span>
                    </div>
                    {task.note && (
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">💡 {task.note}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SEO READINESS DATA ─────────────────────────────────────────────────────

type SeoStatus = "pass" | "warn" | "fail";

interface SeoItem {
  label: string;
  status: SeoStatus;
  detail: string;
}

interface SeoCategory {
  icon: string;
  title: string;
  items: SeoItem[];
}

const seoCategories: SeoCategory[] = [
  {
    icon: "code",
    title: "Teknikal SEO",
    items: [
      { label: "Sitemap.xml otomatis & dinamis", status: "pass", detail: "Dibuat via next-sitemap, include semua halaman & blog slug." },
      { label: "Robots.txt terkonfigurasi", status: "pass", detail: "Mengizinkan semua crawler, memblokir /admin." },
      { label: "Canonical URL di setiap halaman", status: "pass", detail: "Tag canonical sudah terpasang di metadata Next.js." },
      { label: "HTTPS / SSL Certificate", status: "fail", detail: "Belum aktif — menunggu deployment ke domain production." },
      { label: "URL ramah SEO (slug deskriptif)", status: "pass", detail: "Contoh: /blog/cara-memilih-chiller-yang-tepat" },
      { label: "Tidak ada broken links (404)", status: "pass", detail: "Semua link produk (AHU, Chiller, PAC, Ducting) sudah aktif dan tidak mengarah ke hashtag #." },
      { label: "Mobile-friendly / Responsif", status: "pass", detail: "Layout responsif dengan breakpoint Tailwind md/lg/xl." },
      { label: "Core Web Vitals — LCP", status: "warn", detail: "hero-bg.jpg berukuran 2MB, perlu dikompresi ke <300KB." },
      { label: "Core Web Vitals — CLS / FID", status: "pass", detail: "Layout stabil, tidak ada elemen yang shifting saat load." },
    ],
  },
  {
    icon: "tune",
    title: "On-Page SEO",
    items: [
      { label: "Title tag unik di setiap halaman", status: "pass", detail: "Template: '[Judul] | PAS HVAC', max ~60 karakter." },
      { label: "Meta description di setiap halaman", status: "pass", detail: "Semua halaman punya deskripsi 120–160 karakter." },
      { label: "H1 tunggal per halaman", status: "pass", detail: "Satu H1 jelas per halaman, tidak ada duplikat." },
      { label: "Hierarki heading (H1→H2→H3)", status: "pass", detail: "Struktur heading konsisten di semua halaman." },
      { label: "Alt text gambar produk", status: "warn", detail: "Produk utama sudah ada, beberapa gambar konten masih kosong." },
      { label: "Keyword target di konten", status: "pass", detail: "Halaman produk baru sudah teroptimasi dengan keyword 'AHU Surabaya', 'Chiller Indonesia', dsb." },
      { label: "Internal linking antar halaman", status: "pass", detail: "Halaman produk memiliki internal linking kuat satu sama lain di section 'Produk Lainnya'." },
      { label: "Konten blog minimal 800 kata/artikel", status: "warn", detail: "Baru 2 artikel yang memiliki >800 kata konten edukatif, sisanya masih diproses." },
    ],
  },
  {
    icon: "schema",
    title: "Structured Data (Schema.org)",
    items: [
      { label: "Organization schema (company info)", status: "pass", detail: "Name, URL, logo, contactPoint, sameAs sudah terpasang di root layout." },
      { label: "BreadcrumbList schema", status: "pass", detail: "Terpasang di halaman Portfolio & Blog." },
      { label: "Article schema (blog)", status: "pass", detail: "Terpasang di detail artikel blog & portfolio study case." },
      { label: "LocalBusiness schema", status: "pass", detail: "Terpasang HVACBusiness (turunan LocalBusiness) untuk pencarian lokal Surabaya/Jakarta." },
      { label: "Product schema (halaman produk)", status: "pass", detail: "Halaman PAC, AHU, Chiller, dan Ducting sudah dilengkapi Product Schema komplit." },
      { label: "FAQ schema untuk pertanyaan umum", status: "pass", detail: "FAQ Component dan FAQPage schema telah ditambahkan di Homepage." },
    ],
  },
  {
    icon: "share",
    title: "Social Media & Open Graph",
    items: [
      { label: "Open Graph title & description", status: "pass", detail: "Terpasang di root metadata dan setiap halaman." },
      { label: "OG Image (1200×630px)", status: "warn", detail: "Path sudah ada (/images/og-image.jpg) tapi file perlu diganti foto profesional." },
      { label: "Twitter Card metadata", status: "pass", detail: "summary_large_image terpasang." },
      { label: "URL share-able & canonical", status: "pass", detail: "Semua URL bersih dan konsisten." },
    ],
  },
  {
    icon: "article",
    title: "Konten & Kata Kunci",
    items: [
      { label: "Target keyword primer: 'HVAC Surabaya'", status: "warn", detail: "Ada di meta tapi belum dominan di body konten halaman." },
      { label: "Target keyword: 'Air Handling Unit Indonesia'", status: "pass", detail: "Ada di deskripsi produk AHU dan konten artikel blog." },
      { label: "Target keyword: 'Chiller System Industri'", status: "pass", detail: "Telah dioptimasi pada halaman produk Chiller & VRF System." },
      { label: "Konten long-form (1000+ kata)", status: "warn", detail: "Sudah mulai ada artikel panduan chiller (1000+ kata), namun perlu lebih banyak untuk topik lain." },
      { label: "Topical authority (cluster konten)", status: "warn", detail: "Artikel utama sudah dibuat, butuh artikel pendukung (cluster) untuk memperkuat authority." },
      { label: "Bahasa Indonesia alami & natural", status: "pass", detail: "Copywriting homepage & produk sudah baik dan tidak terkesan dipaksakan." },
    ],
  },
  {
    icon: "analytics",
    title: "Monitoring & Tools",
    items: [
      { label: "Google Analytics 4 (GA4) terpasang", status: "pass", detail: "Script GA4 sudah terpasang via env variable NEXT_PUBLIC_GA_MEASUREMENT_ID." },
      { label: "Google Search Console terhubung", status: "warn", detail: "Verifikasi via meta tag sudah siap, butuh domain live untuk submit sitemap." },
      { label: "Sitemap sudah disubmit ke GSC", status: "fail", detail: "Belum bisa disubmit — domain production belum aktif." },
      { label: "Tracking event lead form", status: "pass", detail: "Event GA4 dipanggil di leadService.ts setiap form submit." },
      { label: "Laporan keyword ranking", status: "fail", detail: "Belum bisa diukur — website belum live & terindeks Google." },
    ],
  },
];

const seoStatusConfig: Record<SeoStatus, { label: string; color: string; bg: string; icon: string }> = {
  pass: { label: "Lulus", color: "#16A34A", bg: "#F0FDF4", icon: "check_circle" },
  warn: { label: "Perlu Perbaikan", color: "#D97706", bg: "#FFFBEB", icon: "warning" },
  fail: { label: "Belum", color: "#DC2626", bg: "#FEF2F2", icon: "cancel" },
};

function SeoReadiness() {
  const [openCat, setOpenCat] = useState<string | null>(null);

  // Total score
  const allItems = seoCategories.flatMap((c) => c.items);
  const totalPass = allItems.filter((i) => i.status === "pass").length;
  const totalWarn = allItems.filter((i) => i.status === "warn").length;
  const totalFail = allItems.filter((i) => i.status === "fail").length;
  const seoScore = Math.round((totalPass * 100 + totalWarn * 50) / allItems.length);

  const scoreColor =
    seoScore >= 75 ? "#16A34A" : seoScore >= 50 ? "#D97706" : "#DC2626";
  const scoreLabel =
    seoScore >= 75 ? "Baik" : seoScore >= 50 ? "Perlu Perbaikan" : "Kritis";

  return (
    <div className="space-y-4">
      {/* SEO Score Card */}
      <div
        className="rounded-2xl p-6 text-white"
        style={{ background: "linear-gradient(135deg, #EA580C 0%, #F97316 100%)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Score Gauge */}
          <div className="flex-shrink-0 text-center">
            <div
              className="w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 border-white/30 mx-auto"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <span className="text-3xl font-extrabold leading-none">{seoScore}</span>
              <span className="text-[10px] font-extrabold opacity-70 uppercase tracking-wider">/ 100</span>
            </div>
            <div className="mt-2 text-xs font-extrabold uppercase tracking-widest opacity-80">{scoreLabel}</div>
          </div>
          {/* Breakdown */}
          <div className="flex-1 space-y-3">
            <p className="text-sm font-bold opacity-90">
              Skor SEO dihitung dari {allItems.length} poin audit teknis. Pass = 100 poin, Perlu Perbaikan = 50 poin, Belum = 0 poin.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "✅ Lulus", value: totalPass, bg: "rgba(22,163,74,0.3)" },
                { label: "⚠️ Perbaikan", value: totalWarn, bg: "rgba(217,119,6,0.3)" },
                { label: "❌ Belum", value: totalFail, bg: "rgba(220,38,38,0.3)" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: s.bg }}>
                  <div className="text-xl font-extrabold">{s.value}</div>
                  <div className="text-[9px] font-bold uppercase tracking-wider opacity-80">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-5">
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${seoScore}%`, background: "white" }}
            />
          </div>
        </div>
      </div>

      {/* Per Category */}
      <div className="space-y-3">
        {seoCategories.map((cat) => {
          const isOpen = openCat === cat.title;
          const catPass = cat.items.filter((i) => i.status === "pass").length;
          const catWarn = cat.items.filter((i) => i.status === "warn").length;
          const catScore = Math.round((catPass * 100 + catWarn * 50) / cat.items.length);
          const catColor = catScore >= 75 ? "#16A34A" : catScore >= 50 ? "#D97706" : "#DC2626";

          return (
            <div key={cat.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                className="w-full text-left p-5"
                onClick={() => setOpenCat(isOpen ? null : cat.title)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${catColor}18` }}
                  >
                    <span className="material-symbols-outlined text-[20px]" style={{ color: catColor }}>
                      {cat.icon}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-extrabold text-gray-900 text-sm">{cat.title}</span>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-sm font-extrabold" style={{ color: catColor }}>{catScore}%</span>
                        <span
                          className="material-symbols-outlined text-gray-400 transition-transform duration-200"
                          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", fontSize: "20px" }}
                        >
                          expand_more
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${catScore}%`, background: catColor }}
                      />
                    </div>
                    <div className="mt-1.5 flex gap-3 text-[10px] text-gray-400 font-bold">
                      <span className="text-green-600">✓ {catPass} lulus</span>
                      {catWarn > 0 && <span className="text-amber-600">⚠ {catWarn} perbaikan</span>}
                      {cat.items.filter((i) => i.status === "fail").length > 0 && (
                        <span className="text-red-500">✗ {cat.items.filter((i) => i.status === "fail").length} belum</span>
                      )}
                    </div>
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-gray-50 px-5 pb-5">
                  <div className="pt-3 space-y-1">
                    {cat.items.map((item, j) => {
                      const s = seoStatusConfig[item.status];
                      return (
                        <div key={j} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
                          <span
                            className="material-symbols-outlined text-[18px] flex-shrink-0 mt-0.5"
                            style={{ color: s.color }}
                          >
                            {s.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-0.5">
                              <span className="text-sm font-semibold text-gray-800">{item.label}</span>
                              <span
                                className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full"
                                style={{ color: s.color, background: s.bg }}
                              >
                                {s.label}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">{item.detail}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* SEO Action Items */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
        <p className="text-xs font-extrabold text-amber-700 uppercase tracking-widest mb-3">
          ⚡ Top 5 Aksi SEO dengan Dampak Terbesar
        </p>
        <div className="space-y-2">
          {[
            { rank: "01", action: "Tulis 9 artikel blog 800–1500 kata dengan target keyword spesifik", impact: "Traffic organik" },
            { rank: "02", action: "Tambahkan LocalBusiness schema (nama, alamat Surabaya & Jakarta, telp)", impact: "Pencarian lokal" },
            { rank: "03", action: "Kompresi hero-bg.jpg dari 2MB → <300KB (gunakan WebP)", impact: "Core Web Vitals" },
            { rank: "04", action: "Buat halaman produk AHU, Chiller, VRF, Ducting dengan konten 500+ kata", impact: "Keyword ranking" },
            { rank: "05", action: "Submit sitemap.xml ke Google Search Console setelah domain live", impact: "Indexing speed" },
          ].map((a) => (
            <div key={a.rank} className="flex items-start gap-3">
              <span className="text-[10px] font-extrabold text-amber-400 w-6 flex-shrink-0 mt-0.5">{a.rank}</span>
              <div>
                <span className="text-sm text-amber-900 font-semibold">{a.action}</span>
                <span className="ml-2 text-[9px] font-extrabold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {a.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProgressPage() {

  const totalTasks = phases.reduce((a, p) => a + p.tasks.length, 0);
  const doneTasks = phases.reduce((a, p) => a + p.tasks.filter((t) => t.status === "done").length, 0);
  const partialTasks = phases.reduce((a, p) => a + p.tasks.filter((t) => t.status === "partial").length, 0);
  const todoTasks = phases.reduce((a, p) => a + p.tasks.filter((t) => t.status === "todo").length, 0);
  const overallProgress = Math.round(
    phases.reduce((a, p) => a + p.progress, 0) / phases.length
  );

  const nextSteps = [
    { priority: "🔴 TINGGI", item: "Tulis & upload 9 artikel blog asli", detail: "Konten edukasi HVAC untuk mendatangkan traffic organik dari Google" },
    { priority: "🔴 TINGGI", item: "Foto & narasi 3 studi kasus portfolio nyata", detail: "Case study proyek real dari klien: manufaktur, gedung, RS" },
    { priority: "🟡 SEDANG", item: "Buat halaman produk AHU, Chiller, VRF, Ducting", detail: "Masing-masing produk perlu halaman sendiri dengan spesifikasi detail" },
    { priority: "🟡 SEDANG", item: "Optimasi gambar hero (hero-bg.jpg 2MB → <300KB)", detail: "Penting untuk page speed dan Core Web Vitals" },
    { priority: "🟡 SEDANG", item: "Setup database untuk CMS (Supabase/Firebase)", detail: "Agar klien bisa edit konten secara mandiri tanpa developer" },
    { priority: "🟢 RENDAH", item: "Setup domain & hosting (Vercel + pramerta.co.id)", detail: "Deploy ke production, connect domain, setup SSL" },
    { priority: "🟢 RENDAH", item: "Submit sitemap ke Google Search Console", detail: "Butuh domain live terlebih dahulu" },
    { priority: "🟢 RENDAH", item: "OG Image untuk social sharing (1200×630px)", detail: "Foto profesional perusahaan atau produk unggulan" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#F4F7FF", fontFamily: "var(--font-manrope, sans-serif)" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #042358 0%, #0056D2 100%)" }} className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
            </div>
            <span className="text-white/60 text-xs font-extrabold uppercase tracking-widest">Website Audit Report</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight">
            Progress Website PAS HVAC
          </h1>
          <p className="text-white/70 text-sm mb-6">
            PT. Pratama Amerta Solusi · Persiapan Meeting {MEETING_DATE} · Update: {LAST_UPDATED}
          </p>

          {/* Overall Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Overall Progress", value: `${overallProgress}%`, icon: "analytics", color: "#60A5FA" },
              { label: "Task Selesai", value: `${doneTasks}`, icon: "check_circle", color: "#34D399" },
              { label: "Sebagian Jadi", value: `${partialTasks}`, icon: "pending", color: "#FBBF24" },
              { label: "Belum Mulai", value: `${todoTasks}`, icon: "schedule", color: "#F87171" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur rounded-2xl p-4">
                <span className="material-symbols-outlined text-2xl mb-1 block" style={{ color: s.color }}>{s.icon}</span>
                <div className="text-2xl font-extrabold text-white">{s.value}</div>
                <div className="text-white/50 text-[10px] font-bold uppercase tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Overall Progress Bar */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Progress Keseluruhan</span>
              <span className="text-white font-extrabold text-sm">{overallProgress}% dari 8 Fase</span>
            </div>
            <div className="h-4 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${overallProgress}%`, background: "linear-gradient(90deg, #34D399, #60A5FA)" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">

        {/* Legend */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-3">Keterangan Status</p>
          <div className="flex flex-wrap gap-4">
            {Object.entries(statusConfig).map(([key, s]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]" style={{ color: s.color }}>{s.icon}</span>
                <span className="text-sm font-semibold text-gray-600">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phase Cards */}
        <div>
          <h2 className="text-lg font-extrabold text-gray-900 mb-4">📋 Detail Per Fase</h2>
          <div className="space-y-3">
            {phases.map((p, i) => (
              <PhaseCard key={p.id} phase={p} defaultOpen={i < 2} />
            ))}
          </div>
        </div>

        {/* ── SEO READINESS ── */}
        <div>
          <h2 className="text-lg font-extrabold text-gray-900 mb-1">🔍 Kesiapan SEO (Search Engine Optimization)</h2>
          <p className="text-sm text-gray-400 mb-5">Audit teknis SEO berdasarkan standar Google & best practices industri untuk website B2B HVAC.</p>
          <SeoReadiness />
        </div>

        {/* Next Steps */}
        <div>
          <h2 className="text-lg font-extrabold text-gray-900 mb-4">🚀 Yang Perlu Dilakukan Sebelum Go Live</h2>
          <div className="space-y-3">
            {nextSteps.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4">
                <div className="text-xl flex-shrink-0 mt-0.5">{s.priority.split(" ")[0]}</div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-extrabold text-gray-900 text-sm">{s.item}</span>
                    <span
                      className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        color: s.priority.includes("TINGGI") ? "#DC2626" : s.priority.includes("SEDANG") ? "#D97706" : "#16A34A",
                        background: s.priority.includes("TINGGI") ? "#FEF2F2" : s.priority.includes("SEDANG") ? "#FFFBEB" : "#F0FDF4",
                      }}
                    >
                      {s.priority.includes("TINGGI") ? "Prioritas Tinggi" : s.priority.includes("SEDANG") ? "Prioritas Sedang" : "Nice to Have"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Box */}
        <div
          className="rounded-3xl p-8 text-white"
          style={{ background: "linear-gradient(135deg, #042358 0%, #0056D2 100%)" }}
        >
          <h2 className="text-xl font-extrabold mb-4">📌 Kesimpulan untuk Meeting</h2>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>✅ <strong className="text-white">Infrastruktur website sudah ~65% selesai.</strong> Semua halaman utama sudah bisa diakses dan semua tombol sudah terhubung ke WhatsApp +6281-5550-3777.</p>
            <p>⚠️ <strong className="text-white">Konten adalah kunci utama yang belum ada.</strong> Artikel blog, foto produk nyata, dan studi kasus portfolio asli sangat dibutuhkan agar website bisa mendatangkan traffic dan konversi.</p>
            <p>🗄️ <strong className="text-white">Database CMS perlu diaktifkan</strong> agar klien bisa mengelola konten secara mandiri tanpa harus ke developer setiap saat.</p>
            <p>🚀 <strong className="text-white">Estimasi go live: 3–4 minggu</strong> setelah konten tersedia dan hosting/domain dikonfigurasi.</p>
          </div>
          <div className="mt-6 pt-6 border-t border-white/20 text-xs text-white/40 font-bold uppercase tracking-widest">
            PAS HVAC · pramerta.co.id · Disiapkan untuk Meeting {MEETING_DATE}
          </div>
        </div>

      </div>
    </div>
  );
}
