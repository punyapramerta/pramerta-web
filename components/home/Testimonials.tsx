import { getTestimonials } from "@/lib/supabase/queries";

export const revalidate = 60;

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-center text-3xl font-extrabold font-headline mb-14 tracking-tight text-on-background">
          Kepuasan Klien Prioritas Utama Kami
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:-translate-y-1 transition-all duration-300">
              <div className="flex gap-0.5 text-yellow-400 mb-5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} className="material-symbols-outlined fill-1 text-xl">star</span>
                ))}
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-7 italic">&quot;{t.quote}&quot;</p>
              <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                <div>
                  <div className="font-bold text-sm text-on-surface">{t.name}</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{t.title}, {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
