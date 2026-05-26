import Link from "next/link";
import Image from "next/image";
import BlogSidebarForm from "@/components/blog/BlogSidebarForm";
import { getPortfolioItems } from "@/app/admin/portfolioActions";

export default async function BlogSidebar() {
  const allPortfolios = await getPortfolioItems();
  const portfolios = allPortfolios.slice(0, 3);

  return (
    <aside className="w-full lg:w-1/3 xl:w-[30%] space-y-8">
      <div className="sticky top-24">
        <BlogSidebarForm />

        {/* Portfolio Showcase */}
        <div className="mt-10 bg-white rounded-3xl border border-neutral-200/60 p-6 shadow-sm">
          <h3 className="text-[14px] font-extrabold text-neutral-900 uppercase tracking-widest mb-6 border-b border-neutral-100 pb-4">
            Project Showcase
          </h3>

          <div className="space-y-5">
            {portfolios.map((port) => (
              <Link
                key={port.slug}
                href={`/portfolio/${port.slug}`}
                className="group flex gap-4 items-center"
              >
                <div className="w-20 h-20 rounded-xl bg-neutral-100 shrink-0 overflow-hidden relative">
                  {port.image ? (
                    <Image
                      src={port.image}
                      alt={port.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="80px"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-colors" />
                      <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-300">
                        apartment
                      </span>
                    </>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {port.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 uppercase tracking-wider font-bold">
                    {port.client}
                  </p>
                </div>
              </Link>
            ))}

            {portfolios.length === 0 && (
              <p className="text-sm text-neutral-400 text-center py-4">Belum ada proyek.</p>
            )}
          </div>

          <Link
            href="/portfolio"
            className="block w-full text-center mt-6 py-3 rounded-xl border-2 border-primary/20 text-xs font-extrabold text-primary hover:bg-primary hover:text-white uppercase tracking-widest transition-all"
          >
            Lihat Semua Portofolio
          </Link>
        </div>
      </div>
    </aside>
  );
}
