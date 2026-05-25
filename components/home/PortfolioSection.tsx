import Link from "next/link";
import Image from "next/image";
import { getPortfolioItems } from "@/app/admin/portfolioActions";

export default async function PortfolioSection() {
  const portfolioData = await getPortfolioItems();
  const latestPortfolios = portfolioData.slice(0, 3);

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <div className="text-primary font-bold text-xs tracking-[0.3em] uppercase">Project Showcase</div>
            <h2 className="text-3xl lg:text-4xl font-extrabold font-headline leading-tight text-on-background">Studi Kasus Terbaru</h2>
          </div>
          <Link className="hidden md:flex items-center gap-1.5 text-primary font-bold hover:underline transition-all text-sm" href="/portfolio">
            Semua Portfolio <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPortfolios.map((project) => (
            <Link
              href={`/portfolio/${project.slug}`}
              key={project.slug}
              className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-4/3 bg-neutral-100 relative overflow-hidden flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-5xl text-neutral-300 group-hover:scale-110 group-hover:text-primary transition-all duration-500 relative z-0">
                    {project.imagePlaceholder}
                  </span>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[14px] text-primary">corporate_fare</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {project.client}
                  </span>
                </div>

                <h3 className="text-lg font-headline font-extrabold text-on-background mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {project.title}
                </h3>

                <p className="text-sm text-on-surface-variant leading-relaxed mb-4 font-body line-clamp-3">
                  {project.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest transition-colors">
                    Baca Selengkapnya
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-primary group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <Link className="inline-flex items-center gap-2 bg-white border border-gray-200 text-on-background font-bold px-6 py-3 rounded-xl hover:bg-gray-50 hover:text-primary transition-all text-sm" href="/portfolio">
            Lihat Semua Portfolio <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
