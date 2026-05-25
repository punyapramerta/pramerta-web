 "Solusi Tata Udara untuk Industri Manufaktur & Jasa").
Section 2 (Main Content - 2 Kolom):
Kiri: Daftar 3 proyek (dummy data) yang disajikan dalam bentuk Card modern (gambar utama, judul proyek, deksripsi singkat, dan tombol "Read More").
Kanan: Memanggil komponen <PortfolioSidebar />.
Section 3 (CTA): Blok Call to Action khusus dengan tulisan "Konsultasi gratis di Whatsapp" dan tombol WhatsApp hijau yang sangat menonjol.
3. Halaman Detail Portofolio (Single Post)
[NEW] app/portfolio/[slug]/page.tsx
Membuat rute dinamis untuk menampilkan full case study.
Layout: Sama seperti daftar portofolio (2-kolom).
Kiri: Konten lengkap portofolio (Header info, Gambar besar proyek, dan teks deskripsi study case seperti latar belakang proyek dan hasil instalasi).
Kanan: Menampilkan <PortfolioSidebar /> yang sama.
Bawah: Menampilkan CTA WhatsApp yang sama.
4. Update Navigasi
[MODIFY] components/layout/Navbar.tsx
Menambahkan link "Portfolio" di menu utama.
Open Questions
Apakah untuk form di sidebar Portfolio ini tetap dihubungkan ke fitur WhatsApp lead generator yang sama dengan di blog, hanya beda tag pelacakannya? (Saya akan asumsikan sama, menggunakan useLeadForm).