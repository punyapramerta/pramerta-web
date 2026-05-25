"use client";

import { useAppData } from "@/hooks/useAppData";

export default function ClientLogos() {
  const { clients } = useAppData();

  // Duplicate list enough times to ensure it fills even 4K screens.
  // 6 logos * 5 times = 30 logos per block, definitely wider than any screen.
  const repeatedClients = [...clients, ...clients, ...clients, ...clients, ...clients];

  return (
    <section className="py-10 bg-white border-b border-gray-100 overflow-hidden relative group">
      <p className="text-center text-[20px] font-bold text-black uppercase tracking-[0.25em] mb-8">
        Dipercaya Oleh Pemimpin Industri
      </p>

      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10"
        style={{ background: "linear-gradient(to right, white, transparent)" }}
      />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10"
        style={{ background: "linear-gradient(to left, white, transparent)" }}
      />

      {/* Marquee wrapper */}
      <div className="flex flex-nowrap w-full group-hover:[&>div]:[animation-play-state:paused]">
        {/* First set */}
        <div className="flex flex-shrink-0 gap-14 pr-14 animate-marquee items-center">
          {repeatedClients.map((client, i) => (
            <div
              key={`set1-${client.name}-${i}`}
              className="inline-flex items-center justify-center flex-shrink-0"
            >
              <img
                alt={client.name}
                src={client.image}
                className="h-20 w-auto max-w-[180px] object-contain transition-all duration-300 grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>

        {/* Second set */}
        <div className="flex flex-shrink-0 gap-14 pr-14 animate-marquee items-center" aria-hidden="true">
          {repeatedClients.map((client, i) => (
            <div
              key={`set2-${client.name}-${i}`}
              className="inline-flex items-center justify-center flex-shrink-0"
            >
              <img
                alt={client.name}
                src={client.image}
                className="h-20 w-auto max-w-[180px] object-contain transition-all duration-300 grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
      `}</style>
    </section>
  );
}
