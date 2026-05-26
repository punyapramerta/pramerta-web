import Link from "next/link";
import Image from "next/image";
import PortfolioSidebarForm from "@/components/portfolio/PortfolioSidebarForm";
import { getPublishedBlogPosts } from "@/app/admin/blogActions";

export default async function PortfolioSidebar() {
  const allPosts = await getPublishedBlogPosts();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <aside className="w-full lg:w-1/3 xl:w-[30%] space-y-8">
      <div className="sticky top-24 space-y-8">
        <PortfolioSidebarForm />

        {/* Latest Articles */}
        <div className="bg-white rounded-3xl border border-neutral-200/60 p-6 shadow-sm">
          <h3 className="text-[14px] font-extrabold text-neutral-900 uppercase tracking-widest mb-6 border-b border-neutral-100 pb-4">
            Insight Terbaru
          </h3>

          <div className="space-y-5">
            {recentPosts.map((article) => (
              <Link
                href={`/blog/${article.slug}`}
                key={article.slug}
                className="group flex gap-4 items-center"
              >
                <div className="w-20 h-20 rounded-xl bg-neutral-100 shrink-0 overflow-hidden relative">
                  {article.imageUrl ? (
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="80px"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-colors z-10" />
                      <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-300">
                        feed
                      </span>
                    </>
                  )}
                </div>
                <div>
                  <span className="text-[9px] font-bold text-primary uppercase tracking-wider mb-1 block">
                    {article.category}
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900 leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  {article.publishedAt && (
                    <p className="text-[10px] text-neutral-400 font-medium">
                      {new Date(article.publishedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </Link>
            ))}

            {recentPosts.length === 0 && (
              <p className="text-sm text-neutral-400 text-center py-4">Belum ada artikel.</p>
            )}
          </div>

          <Link
            href="/blog"
            className="block w-full text-center mt-6 py-3 rounded-xl border-2 border-neutral-100 text-xs font-extrabold text-neutral-600 hover:bg-neutral-50 hover:border-neutral-200 uppercase tracking-widest transition-all"
          >
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </aside>
  );
}
