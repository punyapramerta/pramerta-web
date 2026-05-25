"use client";

import { useState } from "react";

export default function AdminProductsPage() {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="max-w-6xl">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-extrabold text-gray-900 mb-2">Manajemen Produk</h1>
          <p className="text-gray-500">Kelola daftar produk yang tampil di halaman Home dan halaman Produk.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`${isAdding ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-primary text-white hover:bg-primary/90'} font-bold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2`}
        >
          {isAdding ? (
            <>Batal</>
          ) : (
            <>
              <span className="material-symbols-outlined text-sm">add</span>
              Tambah Produk
            </>
          )}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 animate-in fade-in slide-in-from-top-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Tambah Produk Baru</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">Nama Produk</label>
                <input type="text" placeholder="Contoh: Air Handling Unit" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-1">Kategori</label>
                  <input type="text" placeholder="Kategori" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-1">Badge / Merek</label>
                  <input type="text" placeholder="Contoh: FRIMEC" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none" />
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">Deskripsi Singkat</label>
                <textarea rows={3} placeholder="Deskripsi untuk teaser home..." className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">Gambar Produk</label>
                <div className="h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-2xl mb-1">upload</span>
                  <span className="text-xs font-bold">Pilih File Gambar</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-2">Spesifikasi Utama (Details)</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" placeholder="Label (Contoh: Tipe)" className="w-1/3 px-3 py-1.5 text-sm rounded-lg border border-gray-200 focus:border-primary outline-none" />
                  <input type="text" placeholder="Nilai (Contoh: Modular)" className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-gray-200 focus:border-primary outline-none" />
                </div>
                <button className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                  <span className="material-symbols-outlined text-[14px]">add</span> Tambah Baris Detail
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
             <button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-2.5 rounded-xl transition-all">
                Simpan Produk
             </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Produk</th>
                <th className="px-6 py-4">Kategori / Badge</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-gray-400">image</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Air Handling Unit</div>
                    <div className="text-sm text-gray-500 max-w-sm truncate">AHU berkualitas Eropa dengan desain kompak, instalasi mudah, dan efisiensi...</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-700">Air Handling Unit</div>
                  <span className="inline-block mt-1 bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">FRIMEC</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-gray-400">image</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Chiller & VRF System</div>
                    <div className="text-sm text-gray-500 max-w-sm truncate">Sistem pendingin udara komersial dari Gree dengan teknologi inverter terdepan...</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-700">Chiller System</div>
                  <span className="inline-block mt-1 bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">GREE</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
