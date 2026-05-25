"use client";

import { useState } from "react";

export default function AdminHomePage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Perubahan berhasil disimpan! (Mode Demo)");
    }, 1000);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-extrabold text-gray-900 mb-2">Edit Beranda (Home)</h1>
          <p className="text-gray-500">Kelola teks dan konten yang tampil di halaman utama.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 disabled:opacity-70"
        >
          {isSaving ? (
             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span className="material-symbols-outlined text-sm">save</span>
              Simpan Perubahan
            </>
          )}
        </button>
      </div>

      <div className="space-y-8">
        {/* Hero Section Edit */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 font-bold text-gray-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">view_carousel</span>
            Hero Section
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">Badge Text</label>
              <input type="text" defaultValue="Authorized Distributor FRIMEC & Gree" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none" />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">Judul Utama</label>
              <textarea rows={2} defaultValue="Solusi HVAC Industri yang Tepat, Cepat, dan Terpercaya" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none" />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">Deskripsi</label>
              <textarea rows={3} defaultValue="Kami adalah perusahaan engineering HVAC yang berfokus pada inovasi dan teknologi terkini. Melayani procurement, instalasi, maintenance, serta ducting untuk berbagai sektor industri di seluruh Indonesia." className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none" />
            </div>
          </div>
        </div>

        {/* About Section Edit */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 font-bold text-gray-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">info</span>
            Tentang Kami (About)
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">Judul Section</label>
              <input type="text" defaultValue="Memberikan Solusi HVAC Terbaik di Setiap Industri" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none" />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">Paragraf 1</label>
              <textarea rows={3} defaultValue="Sejak tahun 2018, PT. Pratama Amerta Solusi (PAS HVAC) telah menjadi mitra terpercaya dalam penyediaan solusi HVAC canggih..." className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none" />
            </div>
          </div>
        </div>

        {/* Testimonials Section Edit */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 font-bold text-gray-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">forum</span>
            Testimoni Klien
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-bold text-gray-700 block">Daftar Testimoni</label>
              <button className="bg-primary/10 text-primary hover:bg-primary hover:text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">add</span> Tambah Testimoni
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Nama Klien</th>
                    <th className="px-4 py-3">Perusahaan</th>
                    <th className="px-4 py-3">Kutipan</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-bold text-gray-900">Budi Hartanto</td>
                    <td className="px-4 py-3 text-gray-600">PT. Wilmar Group</td>
                    <td className="px-4 py-3 text-gray-500 truncate max-w-[200px]">Tim PAS HVAC sangat profesional...</td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-blue-600 hover:text-blue-800 mx-1"><span className="material-symbols-outlined text-[16px]">edit</span></button>
                      <button className="text-red-600 hover:text-red-800 mx-1"><span className="material-symbols-outlined text-[16px]">delete</span></button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-bold text-gray-900">Sari Kusuma</td>
                    <td className="px-4 py-3 text-gray-600">PT. Semen Indonesia Group</td>
                    <td className="px-4 py-3 text-gray-500 truncate max-w-[200px]">Textile duct yang dipasang PAS HVAC...</td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-blue-600 hover:text-blue-800 mx-1"><span className="material-symbols-outlined text-[16px]">edit</span></button>
                      <button className="text-red-600 hover:text-red-800 mx-1"><span className="material-symbols-outlined text-[16px]">delete</span></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
