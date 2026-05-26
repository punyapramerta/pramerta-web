"use client";

import { useState, useEffect } from "react";

type Lead = {
  id: string;
  nama: string;
  whatsapp: string;
  kebutuhan: string;
  pesan: string | null;
  source: string | null;
  created_at: string;
};

async function getLeads(): Promise<Lead[]> {
  const res = await fetch("/api/admin/leads");
  if (!res.ok) return [];
  return res.json();
}

const sourceLabel: Record<string, string> = {
  hero: "Halaman Utama",
  footer: "Footer",
  bottom: "Bottom",
  blog_sidebar: "Blog Sidebar",
  portfolio_sidebar: "Portfolio Sidebar",
  portfolio_bottom: "Portfolio Bottom",
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeads().then((data) => {
      setLeads(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-extrabold text-gray-900 mb-2">Data Leads</h1>
        <p className="text-gray-500">Semua permintaan penawaran yang masuk melalui form website.</p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 font-bold">Memuat data leads...</div>
      ) : leads.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <span className="material-symbols-outlined text-5xl block mb-3">contact_mail</span>
          <p className="font-bold">Belum ada lead yang masuk.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Nama</th>
                  <th className="px-6 py-4 text-left text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">WhatsApp</th>
                  <th className="px-6 py-4 text-left text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Kebutuhan</th>
                  <th className="px-6 py-4 text-left text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Sumber</th>
                  <th className="px-6 py-4 text-left text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Tanggal</th>
                  <th className="px-6 py-4 text-left text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">{lead.nama}</td>
                    <td className="px-6 py-4 text-gray-600 font-mono text-xs">{lead.whatsapp}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs">
                      <div className="line-clamp-1">{lead.kebutuhan}</div>
                      {lead.pesan && (
                        <div className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{lead.pesan}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary uppercase tracking-wider">
                        {sourceLabel[lead.source ?? ""] ?? lead.source ?? "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#25D366] hover:underline"
                      >
                        <span className="material-symbols-outlined text-[14px]">chat</span>
                        Chat
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
