# Tutorial: Cara Mengganti Tulisan di Website

Selamat! Website Anda sekarang sudah menggunakan arsitektur **3-Layer** yang rapi. Ini memudahkan Anda untuk mengubah isi konten (tulisan, testimoni, data perusahaan) tanpa harus menyentuh kode tampilan yang rumit.

Semua data tersentralisasi di satu file "Database" (Data Repository).

## Lokasi File Utama
Untuk mengubah tulisan, Anda hanya perlu membuka file berikut:
👉 `lib/repositories/dataRepository.ts`

---

## Panduan Mengubah Konten

### 1. Mengubah Data Perusahaan & Kontak
Cari bagian `companyData`. Anda bisa mengubah nomor WhatsApp, nama perusahaan, atau tahun berdiri.
```typescript
export const companyData = {
  name: "PT. Pratama Amerta Solusi",
  brand: "PAS HVAC",
  // ...
  contact: {
    whatsapp: "6231995480097", // Ganti dengan nomor WA baru (awali dengan 62)
    surabaya: "031-995-48097",
    jakarta: "0856-4992-3048",
  },
};
```

### 2. Mengubah Tulisan di Bagian Atas (Hero)
Cari bagian `heroData`. Anda bisa mengubah judul utama, deskripsi, atau poin-poin keunggulan.
```typescript
export const heroData = {
  badge: "✓ Distributor Resmi FRIMEC & GREE",
  title: "Solusi HVAC Industrial yang Tepat & Andal",
  accentWord: "Industrial", // Kata yang akan berwarna biru/bergaris bawah
  description: "Chiller, AHU, VRF System, dan Ducting...",
  // ...
};
```

### 3. Mengubah Produk Unggulan
Cari bagian `productsData`. Anda bisa mengubah detail produk yang ditampilkan di halaman depan.
```typescript
export const productsData = [
  {
    category: "CHILLER",
    name: "Nama Produk Baru",
    description: "Deskripsi produk...",
    specs: ["Spek 1", "Spek 2"],
    // ...
  },
];
```

### 4. Mengubah Angka Statistik
Cari bagian `statsData`. Angka-angka ini akan otomatis berhitung naik saat layar digulir.
```typescript
export const statsData = [
  { value: 2018, suffix: "", label: "Tahun Berdiri", icon: "📅" },
  { value: 150, suffix: "+", label: "Klien Puas", icon: "🏭" },
  // ...
];
```

### 5. Mengubah Testimoni Klien
Cari bagian `testimonialsData`. Anda bisa menambah, menghapus, atau mengubah testimoni yang ada.
```typescript
export const testimonialsData = [
  {
    stars: 5,
    quote: "Isi testimoni baru di sini...",
    name: "Nama Pengirim",
    title: "Jabatan",
    company: "Nama Perusahaan",
    // initial & grad untuk tampilan avatar
  },
];
```

### 6. Mengubah Logo Client (Marquee)
Cari bagian `clientsData`. Logo/nama client yang berjalan di halaman depan bisa diubah di sini.
```typescript
export const clientsData = [
  { name: "Nama Perusahaan", abbr: "Singkatan\nBaris2" },
  // ...
];
```

### 7. Mengubah Sertifikasi
Cari bagian `certsData`. Anda bisa mengubah list sertifikasi yang dimiliki perusahaan.
```typescript
export const certsData = [
  { name: "ISO 9001:2015", subtitle: "Quality Management", icon: "🏆", grad: "..." },
  // ...
];
```

### 8. Mengubah Layanan di Form Kontak
Cari bagian `leadFormData.options`. List ini akan otomatis muncul di pilihan *dropdown* pada form kontak.
```typescript
export const leadFormData = {
  // ...
  options: [
    "Chiller",
    "Air Handling Unit (AHU)",
    // Tambah pilihan baru di sini
  ],
};
```

---

## Catatan Penting
- **Simpan format tanda kutip**: Pastikan tulisan selalu diapit oleh tanda kutip ganda (`"..."`) atau kutip satu (`'...'`).
- **Tanda Koma**: Pastikan setiap item di dalam list dipisahkan oleh tanda koma (`,`).
- **Simpan File**: Setelah mengubah, tekan `Ctrl + S` atau `Cmd + S` untuk menyimpan. Perubahan akan langsung terlihat di website (jika dalam mode development).

Jika ada kendala, jangan ragu untuk bertanya!
