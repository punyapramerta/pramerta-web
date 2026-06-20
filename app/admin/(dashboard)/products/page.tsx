"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProducts, deleteProduct } from "@/app/admin/productActions";
import type { Product } from "@/lib/supabase/queries";

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await getProducts();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  function confirmDelete() {
    if (!deleteTarget) return;
    const slug = deleteTarget.slug;
    startTransition(async () => {
      await fetch("/api/products/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      await deleteProduct(slug);
      setDeleteTarget(null);
      await refresh();
    });
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-extrabold text-gray-900 mb-2">Manajemen Produk</h1>
          <p className="text-gray-500">Kelola daftar produk dan buat halaman detail khusus untuk setiap produk.</p>
        </div>
        <Link
          href="/admin/products/editor/new"
          className="bg-primary text-white hover:bg-primary/90 font-bold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Tambah Produk
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 font-bold">Memuat data...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Produk</th>
                  <th className="px-6 py-4">Kategori / Badge</th>
                  <th className="px-6 py-4">URL Slug</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item.slug} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-4">
                      {item.image ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-100 bg-white">
                          <Image
                            src={item.image}
                            alt={item.imageAlt || item.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-gray-400">image</span>
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500 max-w-sm truncate">{item.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-700">{item.category}</div>
                      <span className="inline-block mt-1 bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                      /products/{item.slug}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/admin/products/editor/${item.slug}`}
                        className="inline-flex p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-2 align-middle"
                        title="Edit dengan Live Preview"
                      >
                        <span className="material-symbols-outlined text-sm">edit_document</span>
                      </Link>
                      <button 
                        onClick={() => setDeleteTarget(item)}
                        className="inline-flex p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors align-middle"
                        title="Hapus"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400">Belum ada data produk.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-red-600">warning</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Hapus Produk?</h3>
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-700">{deleteTarget.name}</strong> akan dihapus secara permanen beserta gambarnya.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                disabled={isPending}
                className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors disabled:opacity-60 shadow-md"
              >
                {isPending ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
