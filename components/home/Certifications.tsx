"use client";

import { useAppData } from "@/hooks/useAppData";

export default function Certifications() {
  const { certs } = useAppData();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section header – matches site pattern */}
        <div className="text-center mb-14 space-y-3">
          <div className="text-primary font-bold text-xs tracking-[0.3em] uppercase">
            Standar & Sertifikasi
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold font-headline leading-tight text-on-background">
            Komitmen Terhadap Kualitas Internasional
          </h2>
          <p className="text-on-surface-variant text-sm max-w-2xl mx-auto leading-relaxed">
            Setiap proyek kami dikerjakan mengacu pada standar industri global, memastikan kualitas dan keandalan yang konsisten.
          </p>
        </div>

        {/* Cards grid – 4 items centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {certs.map((cert) => (
            <div
              key={cert.name}
              className="group relative rounded-2xl bg-gray-50 border border-gray-100 p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-white"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-colors">
                <span className="material-symbols-outlined text-primary text-2xl fill-1">
                  {cert.icon}
                </span>
              </div>

              {/* Name & subtitle */}
              <h4 className="text-lg font-extrabold font-headline text-on-surface mb-1">
                {cert.name}
              </h4>
              <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">
                {cert.subtitle}
              </div>

              {/* Description */}
              <p className="text-on-surface-variant text-xs leading-relaxed">
                {cert.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
