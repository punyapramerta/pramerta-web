"use client";

import Link from "next/link";
import { useAppData } from "@/hooks/useAppData";
import { WA_NUMBER } from "@/lib/repositories/dataRepository";

export default function ProductTeaser() {
  const { products } = useAppData();

  return (
    <section id="product" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <div className="text-primary font-bold text-xs tracking-[0.3em] uppercase">Produk Unggulan</div>
            <h2 className="text-3xl lg:text-4xl font-extrabold font-headline leading-tight text-on-background">Dirancang untuk Kondisi Ekstrim</h2>
          </div>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo PAS HVAC, saya ingin melihat katalog produk HVAC lengkap Anda.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-primary font-bold hover:underline transition-all text-sm"
          >
            Semua Produk <span className="material-symbols-outlined text-base">grid_view</span>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div key={product.name} className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-7 transition-all hover:shadow-xl hover:-translate-y-1">
              {product.href && product.href !== "#" && (
                <Link href={product.href} className="absolute inset-0 z-10" aria-label={`Lihat detail ${product.name}`} />
              )}
              {/* Product image */}
              <div className="relative mb-6 h-44 flex items-center justify-center bg-white rounded-xl overflow-hidden border border-gray-100">
                <img 
                  alt={product.imageAlt ?? product.name} 
                  className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${product.imageCover ? "object-cover" : "object-contain max-h-40"}`}
                  src={product.image}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{product.category}</div>
                    <h4 className="text-lg font-extrabold font-headline leading-tight">{product.name}</h4>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${product.badgeClass}`}>
                    {product.badge}
                  </span>
                </div>
                
                <p className="text-on-surface-variant text-sm leading-relaxed">{product.description}</p>
                
                <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 mb-5">
                  {product.details?.map((detail) => (
                    <div key={detail.label} className="space-y-0.5">
                      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">{detail.label}</span>
                      <span className="text-xs font-extrabold text-on-surface">{detail.value}</span>
                    </div>
                  ))}
                </div>

                {product.href && product.href !== "#" && (
                  <Link 
                    href={product.href} 
                    className="relative z-20 flex w-full items-center justify-center gap-2 py-2.5 px-4 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all hover:bg-primary/90 hover:shadow-lg shadow-primary/20"
                  >
                    Baca Selengkapnya
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
