import { getClientLogos } from "@/lib/supabase/queries";

export const revalidate = 60;

export default async function ClientLogos() {
  const clients = await getClientLogos();

  // Repeat enough times to fill even wide screens
  const repeated = [...clients, ...clients, ...clients, ...clients, ...clients];

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
        <div className="flex flex-shrink-0 gap-14 pr-14 animate-marquee items-center">
          {repeated.map((client, i) => (
            <div key={`set1-${client.name}-${i}`} className="inline-flex items-center justify-center flex-shrink-0">
              <img
                alt={client.name}
                src={client.image}
                className="h-20 w-auto max-w-[180px] object-contain transition-all duration-300 grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-shrink-0 gap-14 pr-14 animate-marquee items-center" aria-hidden="true">
          {repeated.map((client, i) => (
            <div key={`set2-${client.name}-${i}`} className="inline-flex items-center justify-center flex-shrink-0">
              <img
                alt={client.name}
                src={client.image}
                className="h-20 w-auto max-w-[180px] object-contain transition-all duration-300 grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
