import BlogSidebarForm from "@/components/blog/BlogSidebarForm";

const placeholderPortfolios = [
  {
    id: "port-1",
    title: "Instalasi Water Cooled Chiller",
    client: "Pabrik Manufaktur, Cikarang",
    imagePlaceholder: "chiller-installation"
  },
  {
    id: "port-2",
    title: "Sistem VRF Gedung Perkantoran",
    client: "Komersial Area, Jakarta Selatan",
    imagePlaceholder: "vrf-system"
  },
  {
    id: "port-3",
    title: "Ducting & Exhaust Rumah Sakit",
    client: "Fasilitas Kesehatan, Surabaya",
    imagePlaceholder: "ducting-hospital"
  }
];

export default function BlogSidebar() {
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
            {placeholderPortfolios.map((port) => (
              <div key={port.id} className="group cursor-pointer flex gap-4 items-center">
                <div className="w-20 h-20 rounded-xl bg-neutral-100 shrink-0 overflow-hidden relative">
                   <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
                   <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-300">
                     apartment
                   </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {port.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 uppercase tracking-wider font-bold">
                    {port.client}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 rounded-xl border-2 border-neutral-100 text-xs font-extrabold text-neutral-600 hover:bg-neutral-50 hover:border-neutral-200 uppercase tracking-widest transition-all">
            Lihat Semua Portofolio
          </button>
        </div>
      </div>
    </aside>
  );
}
