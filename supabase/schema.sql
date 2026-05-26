-- ============================================================
-- PAS HVAC — Supabase Schema & Seed
-- Jalankan seluruh file ini di Supabase SQL Editor
-- ============================================================

-- ─── TABLES ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS portfolios (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT UNIQUE NOT NULL,
  title            TEXT NOT NULL,
  client           TEXT NOT NULL,
  industry         TEXT,
  location         TEXT,
  excerpt          TEXT,
  image_placeholder TEXT DEFAULT 'hvac',
  image_url        TEXT,
  image_note       TEXT,
  background       TEXT,
  highlight_challenge TEXT,
  challenges       TEXT[],
  solution         TEXT[],
  results          TEXT[],
  metrics          JSONB,
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT UNIQUE NOT NULL,
  title            TEXT NOT NULL,
  category         TEXT,
  read_time        TEXT,
  author           TEXT DEFAULT 'Tim Engineer PAS HVAC',
  content          TEXT,
  excerpt          TEXT,
  meta_title       TEXT,
  meta_desc        TEXT,
  target_keyword   TEXT,
  status           TEXT DEFAULT 'draft',
  published_at     TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS leads (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama      TEXT NOT NULL,
  whatsapp  TEXT NOT NULL,
  kebutuhan TEXT,
  pesan     TEXT,
  source    TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stars      INTEGER DEFAULT 5,
  quote      TEXT NOT NULL,
  name       TEXT NOT NULL,
  title      TEXT,
  company    TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  category    TEXT,
  badge       TEXT,
  badge_class TEXT,
  name        TEXT NOT NULL,
  description TEXT,
  image_url   TEXT,
  image_alt   TEXT,
  href        TEXT,
  details     JSONB,
  sort_order  INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS client_logos (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  image_url  TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS certifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  subtitle    TEXT,
  icon        TEXT,
  description TEXT,
  sort_order  INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS site_settings (
  key   TEXT PRIMARY KEY,
  value JSONB NOT NULL
);

-- ─── AUTO-UPDATE updated_at ───────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER portfolios_updated_at
  BEFORE UPDATE ON portfolios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────

ALTER TABLE portfolios    ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts    ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads         ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials  ENABLE ROW LEVEL SECURITY;
ALTER TABLE products      ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_logos  ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read (semua orang bisa lihat)
CREATE POLICY "public_read_portfolios"    ON portfolios    FOR SELECT USING (true);
CREATE POLICY "public_read_blog_posts"    ON blog_posts    FOR SELECT USING (true);
CREATE POLICY "public_read_testimonials"  ON testimonials  FOR SELECT USING (true);
CREATE POLICY "public_read_products"      ON products      FOR SELECT USING (true);
CREATE POLICY "public_read_client_logos"  ON client_logos  FOR SELECT USING (true);
CREATE POLICY "public_read_certifications" ON certifications FOR SELECT USING (true);
CREATE POLICY "public_read_site_settings" ON site_settings FOR SELECT USING (true);

-- Leads: public boleh INSERT, tidak boleh SELECT
CREATE POLICY "public_insert_leads" ON leads FOR INSERT WITH CHECK (true);

-- ─── STORAGE BUCKETS ─────────────────────────────────────────
-- Jalankan ini jika belum buat bucket dari Dashboard

INSERT INTO storage.buckets (id, name, public) VALUES
  ('portfolio-images', 'portfolio-images', true),
  ('blog-images',      'blog-images',      true),
  ('client-logos',     'client-logos',     true),
  ('product-images',   'product-images',   true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public_read_portfolio_images" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio-images');
CREATE POLICY "public_read_blog_images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "public_read_client_logos" ON storage.objects
  FOR SELECT USING (bucket_id = 'client-logos');
CREATE POLICY "public_read_product_images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

-- ─── SEED: PORTFOLIOS ────────────────────────────────────────

INSERT INTO portfolios (slug, title, client, industry, location, excerpt, image_placeholder, image_url, image_note, background, highlight_challenge, challenges, solution, results, metrics) VALUES
(
  'ducting-air-cool-pt-wilmar',
  'Ducting Air Cool untuk Flour Plant',
  'PT Wilmar Tbk',
  'F&B (Flour Plant)',
  'Gresik Plant',
  'Instalasi sistem blower Fresh Air dengan unit Air Cool untuk mengatasi suhu ruangan panas di flour plant tanpa mempengaruhi kualitas produk tepung.',
  'air_purifier',
  '/images/portfolio/ducting-air-cool-pt-wilmar.jpeg',
  'Tampilan instalasi ducting (mesin disamarkan sesuai permintaan klien)',
  'Fasilitas flour plant PT Wilmar Tbk di Gresik menghadapi kendala suhu ruangan yang panas. Pemasangan AC konvensional tidak memungkinkan karena dapat mempengaruhi hasil produk tepung sekaligus membutuhkan konsumsi daya dan biaya operasional yang besar.',
  'Suhu ruangan yang panas tidak dapat diatasi dengan AC konvensional tanpa merusak kualitas produk tepung.',
  ARRAY['Diperlukan unit pendingin ruangan untuk menurunkan suhu', 'Pemasangan AC konvensional berisiko mempengaruhi kualitas produk tepung', 'Konsumsi daya dan biaya operasional AC konvensional sangat besar'],
  ARRAY['Memasang mesin Blower untuk Fresh Air menggunakan unit Air Cool yang sesuai dengan kondisi produksi flour plant'],
  ARRAY['Suhu ruangan turun hingga 10–20%', 'Konsumsi daya listrik lebih hemat dibandingkan sistem refrigran konvensional', 'Penghematan biaya operasional mencapai 10–20%'],
  '[{"label":"Penurunan Suhu","value":"10–20%"},{"label":"Hemat Biaya","value":"10–20%"},{"label":"Tipe Unit","value":"Air Cool"},{"label":"Lokasi","value":"Gresik"}]'
),
(
  'ducting-chiller-pt-bina-karya-prima',
  'Ducting Chiller dengan Akses Perawatan Fan',
  'PT Bina Karya Prima',
  'F&B',
  'Gresik Plant',
  'Perancangan sistem ducting untuk mengarahkan udara panas unit Chiller keluar gedung, dilengkapi manhole khusus untuk kemudahan perawatan fan.',
  'hvac',
  '/images/portfolio/ducting-chiller-pt-bina-karya-prima.jpeg',
  NULL,
  'PT Bina Karya Prima menghadapi masalah di mana pembuangan udara dari unit Chiller menyebabkan suhu dalam gedung meningkat secara signifikan. Diperlukan solusi ducting yang tidak hanya efektif tetapi juga mempertimbangkan kebutuhan perawatan rutin.',
  'Pada ducting diperlukan akses khusus untuk perawatan Fan unit Chiller tanpa membongkar seluruh instalasi.',
  ARRAY['Diperlukan ducting untuk mengarahkan udara panas keluar gedung', 'Desain ducting harus menyediakan akses untuk perawatan Fan unit Chiller'],
  ARRAY['Menyediakan manhole pada ducting tepat di atas unit Fan Chiller sehingga mudah diakses oleh teknisi saat perawatan berkala'],
  ARRAY['Suhu ruangan berhasil turun hingga 20–30%', 'Akses perawatan Fan Chiller tersedia tanpa perlu membongkar ducting'],
  '[{"label":"Penurunan Suhu","value":"20–30%"},{"label":"Fitur","value":"Manhole Akses"},{"label":"Tipe","value":"Ducting Chiller"},{"label":"Lokasi","value":"Gresik"}]'
),
(
  'dust-collector-chiller-pt-unipack-plasindo',
  'Dust Collector Chiller untuk Industri Plastik',
  'PT Unipack Plasindo',
  'Plastic & Packaging',
  'Surabaya',
  'Solusi Dust Collector khusus pada unit Chiller untuk mengeliminasi polusi debu micro-PVC saat proses cleaning, tanpa mengganggu performa pendinginan.',
  'factory',
  '/images/portfolio/dust-collector-chiller-pt-unipack-plasindo.jpeg',
  NULL,
  'Unit Chiller milik PT Unipack Plasindo di Surabaya mengalami masalah akumulasi debu micro-PVC yang menempel dan menimbulkan polusi udara setiap kali proses cleaning dilakukan. Kondisi ini membahayakan lingkungan kerja dan tidak memenuhi standar kebersihan industri.',
  'Tidak boleh ada debu micro-PVC yang berterbangan saat proses cleaning chiller berlangsung.',
  ARRAY['Penggunaan Dust Collector pada unit Chiller tidak umum digunakan di industri', 'Instalasi Dust Collector tidak boleh mengganggu performa dan kapasitas pendinginan Chiller'],
  ARRAY['Memasang Dust Collector dengan perhitungan teknis yang tepat agar kompatibel dengan unit Chiller yang sudah terpasang'],
  ARRAY['Debu yang berterbangan saat proses cleaning chiller berkurang hingga 95%', 'Performa Chiller tetap optimal tanpa penurunan kapasitas pendinginan'],
  '[{"label":"Reduksi Debu","value":"95%"},{"label":"Industri","value":"Plastic & Packaging"},{"label":"Tipe","value":"Dust Collector"},{"label":"Lokasi","value":"Surabaya"}]'
),
(
  'cleanroom-ducting-ruang-operasi-mata',
  'Ducting Cleanroom Ruang Operasi Mata',
  'CV Citra Terang Mandiri',
  'Rumah Sakit',
  'Sidoarjo',
  'Instalasi sistem tata udara cleanroom bertekanan positif dengan multi-stage filtration (Pre-Filter, Medium Filter, HEPA) untuk ruang operasi mata bersuhu di bawah 24°C.',
  'local_hospital',
  NULL,
  NULL,
  'CV Citra Terang Mandiri membutuhkan solusi tata udara untuk ruang operasi mata di Sidoarjo. Ruangan menghadapi tantangan suhu tinggi akibat peralatan operasi, dengan persyaratan ketat terhadap kebersihan udara dan tekanan ruangan yang harus memenuhi standar medis.',
  'Pekerjaan harus diselesaikan dengan kondisi ruangan penempatan ducting yang sangat terbatas, sambil memenuhi semua persyaratan teknis suhu, kebersihan, dan tekanan.',
  ARRAY['Target suhu ruangan harus berada di bawah 24°C', 'Udara yang masuk ke ruangan harus memenuhi standar kebersihan medis yang tinggi', 'Ruangan harus memiliki tekanan positif untuk mencegah kontaminasi dari luar', 'Ruang penempatan ducting sangat terbatas'],
  ARRAY['Melakukan perhitungan teknis yang presisi agar suhu dan tekanan positif yang diinginkan dapat terpenuhi', 'Menambahkan Pre-Filter, Medium Filter, dan HEPA Filter sebagai sistem penyaring udara bertingkat'],
  ARRAY['Suhu ruangan tercapai hingga 18°C (melampaui target <24°C)', 'Efisiensi kebersihan udara di dalam ruangan mencapai 99,9%', 'Tekanan positif yang disyaratkan terpenuhi sesuai standar medis'],
  '[{"label":"Suhu Tercapai","value":"18°C"},{"label":"Kebersihan Udara","value":"99,9%"},{"label":"Tekanan","value":"Positif ✓"},{"label":"Lokasi","value":"Sidoarjo"}]'
);

-- ─── SEED: TESTIMONIALS ──────────────────────────────────────

INSERT INTO testimonials (stars, quote, name, title, company, sort_order) VALUES
(5, 'Tim PAS HVAC sangat profesional. Instalasi chiller untuk gedung pabrik kami selesai tepat waktu dan hasilnya sangat memuaskan.', 'Budi Hartanto', 'Facility Manager', 'PT. Wilmar Group', 1),
(5, 'Textile duct yang dipasang PAS HVAC di warehouse kami distribusi udaranya sangat merata. Kualitas produk FRIMEC benar-benar terbukti.', 'Sari Kusuma', 'Engineering Head', 'PT. Semen Indonesia Group', 2),
(5, 'Preventive maintenance contract dari PAS HVAC sangat membantu kami menjaga uptime produksi. Respon cepat dan teknisinya kompeten.', 'Andri Wibowo', 'Maintenance Director', 'PT. Pertamina Group', 3);

-- ─── SEED: PRODUCTS ──────────────────────────────────────────

INSERT INTO products (slug, category, badge, badge_class, name, description, image_url, image_alt, href, details, sort_order) VALUES
('ahu', 'Air Handling Unit', 'FRIMEC', 'bg-primary/10 text-primary', 'Air Handling Unit', 'AHU berkualitas Eropa dengan desain kompak, instalasi mudah, dan efisiensi energi tinggi untuk berbagai aplikasi industri dan komersial.', '/images/page3_img2.jpeg', 'Air Handling Unit FRIMEC', '/products/ahu', '[{"label":"Tipe","value":"Packaged / Modular"},{"label":"Principal","value":"FRIMEC Group"}]', 1),
('chiller', 'Chiller System', 'GREE', 'bg-tertiary-container/10 text-tertiary', 'Chiller & VRF System', 'Sistem pendingin udara komersial dari Gree dengan teknologi inverter terdepan. VRF multi-split efisiensi tinggi untuk gedung besar.', '/images/page4_img3.jpeg', 'Gree Air Handling Unit', '/products/chiller', '[{"label":"Tipe","value":"Screw / Modular"},{"label":"Principal","value":"Gree Electric"}]', 2),
('pac', 'Precision Cooling', 'PAC', 'bg-cyan-100 text-cyan-700', 'Precision Air Conditioning', 'Solusi pendinginan presisi 24/7 untuk data center, cleanroom, dan laboratorium. Menjaga suhu stabil (±1°C) dan kelembapan presisi (±5% RH).', '/images/page4_img3.jpeg', 'Precision Air Conditioning PAC Data Center', '/products/pac', '[{"label":"Operasi","value":"24/7 Kontinu"},{"label":"Stabilitas","value":"±1°C / ±5% RH"}]', 3),
('ducting', 'Ducting System', 'SMACNA Std', 'bg-secondary-container/30 text-secondary', 'Sheet Metal & Textile Duct', 'Produksi ducting presisi tinggi dengan mesin otomatis sesuai standar SMACNA. Tersedia Sheet Metal BJLS/SUS/ALU dan Textile Duct.', '/images/page5_img1.jpeg', 'Sheet Metal Ducting', '/products/ducting', '[{"label":"Material","value":"BJLS / SUS / ALU"},{"label":"Standar","value":"SMACNA"}]', 4);

-- ─── SEED: CLIENT LOGOS ──────────────────────────────────────

INSERT INTO client_logos (name, image_url, sort_order) VALUES
('APP Sinarmas',         '/images/clients/sinarmas.jpeg',        1),
('Indonesia Power',      '/images/clients/indonesia-power.jpeg', 2),
('Pertamina Hulu Energi','/images/clients/pertamina.jpeg',       3),
('Jasuindo',             '/images/clients/jasuindo.jpeg',        4),
('PT Agrofarm',          '/images/clients/agrofarm.jpeg',        5),
('Prihoda',              '/images/clients/prihoda.jpeg',         6);

-- ─── SEED: CERTIFICATIONS ────────────────────────────────────

INSERT INTO certifications (name, subtitle, icon, description, sort_order) VALUES
('SNI',          'Indonesian Standard', 'verified',          'Memenuhi Standar Nasional Indonesia untuk kualitas produk dan layanan HVAC.', 1),
('SMACNA',       'Ducting Standard',    'engineering',       'Standar fabrikasi ducting sheet metal mengacu pada SMACNA International.',   2),
('ISO 9001:2015','Quality Management',  'workspace_premium', 'Sistem manajemen mutu tersertifikasi ISO untuk proses kerja yang konsisten.', 3),
('KBLI',         'Certified Business',  'apartment',         'Klasifikasi baku bidang usaha resmi terdaftar di Indonesia.',                4);

-- ─── SEED: SITE SETTINGS ─────────────────────────────────────

INSERT INTO site_settings (key, value) VALUES
('company', '{"name":"PT. Pratama Amerta Solusi","brand":"PAS HVAC","since":2018,"whatsapp":"628155503777","office":"031-995-48097","email":"Sales@pramerta.co.id","platforms":["FRIMEC","Gree"]}'),
('stats',   '[{"value":7,"suffix":"+","label":"Tahun Pengalaman","icon":"history"},{"value":150,"suffix":"+","label":"Happy Customer","icon":"group"},{"value":500,"suffix":"+","label":"Proyek Selesai","icon":"done_all"}]'),
('lead_form_options', '["Air Handling Unit (AHU)","Chiller System","VRF / Residential AC","Precision Air Conditioning (PAC)","Sheet Metal Ducting","Textile / Fabric Duct","Maintenance & Service","Procurement Parts","Lainnya"]');

-- ─── SEED: BLOG POSTS ────────────────────────────────────────

INSERT INTO blog_posts (slug, title, category, read_time, author, excerpt, status, published_at) VALUES
('cara-memilih-chiller-yang-tepat', 'Cara Memilih Chiller yang Tepat untuk Kebutuhan Industri Anda', 'Panduan', '5 Menit Baca', 'Tim Engineer PAS HVAC', 'Panduan teknis memilih kapasitas dan jenis chiller yang sesuai untuk efisiensi energi optimal di lingkungan industri.', 'published', '2025-04-15'),
('perbedaan-ahu-dan-fcu', 'Perbedaan Air Handling Unit (AHU) dan Fan Coil Unit (FCU)', 'Edukasi', '4 Menit Baca', 'Tim Engineer PAS HVAC', 'Penjelasan teknis perbedaan AHU dan FCU, kapan menggunakan masing-masing, dan keunggulannya untuk sistem HVAC industri.', 'published', '2025-04-10');
