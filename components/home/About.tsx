"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppData } from "@/hooks/useAppData";
import { WA_NUMBER } from "@/lib/repositories/dataRepository";

export default function About() {
  const { about } = useAppData();

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="relative">
            <Image 
              alt="HVAC Industrial Installation" 
              className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]" 
              src="/images/page1_img1.jpeg"
              width={800}
              height={600}
            />
            {/* ISO badge overlay */}
            <div className="absolute -bottom-5 -right-4 bg-white px-5 py-4 rounded-xl shadow-lg border border-gray-100 hidden md:flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-xl fill-1">verified</span>
              </div>
              <div>
                <div className="text-sm font-extrabold font-headline text-on-surface">ISO 9001:2015</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Jaminan Kualitas Global</div>
              </div>
            </div>
            {/* Play button overlay */}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo PAS HVAC, saya ingin berkonsultasi mengenai solusi HVAC untuk industri kami.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 left-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform"
              aria-label="Konsultasi via WhatsApp"
            >
              <span className="material-symbols-outlined text-primary text-2xl fill-1">play_arrow</span>
            </a>
          </div>
          
          {/* Right: Content */}
          <div className="space-y-7">
            <div className="space-y-3">
              <div className="text-primary font-bold text-xs tracking-[0.3em] uppercase">{about.badge}</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold font-headline leading-tight text-on-background">
                {about.title}
              </h2>
            </div>
            
            <p className="text-base text-on-surface-variant leading-relaxed">
              {about.description1}
            </p>
            <p className="text-base text-on-surface-variant leading-relaxed">
              {about.description2}
            </p>
            
            <div className="space-y-4">
              {about.points.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-sm fill-1">check</span>
                  </div>
                  <span className="font-semibold text-on-surface text-sm">{point}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-2">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo PAS HVAC, saya ingin tahu lebih lanjut tentang perusahaan dan layanan Anda.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-bold text-sm group hover:underline transition-all"
              >
                Selengkapnya Tentang Kami
                <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
