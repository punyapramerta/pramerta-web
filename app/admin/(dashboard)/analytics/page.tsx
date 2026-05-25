"use client";

export default function AdminAnalyticsPage() {
  return (
    <div className="max-w-6xl h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-extrabold text-gray-900 mb-2">Google Search Console</h1>
        <p className="text-gray-500">Pantau performa pencarian organik dan traffic website Anda.</p>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center p-10">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-blue-500 text-5xl">bar_chart</span>
        </div>
        <h2 className="text-2xl font-headline font-extrabold text-gray-800 mb-4">Integrasi Belum Dikonfigurasi</h2>
        <p className="text-gray-500 max-w-lg mb-8 leading-relaxed">
          Halaman ini nantinya akan menampilkan iframe dari Google Looker Studio atau data API dari Google Search Console untuk melihat performa SEO website secara real-time.
        </p>
        <button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-xl transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">settings</span>
          Hubungkan ke Google Account
        </button>
      </div>
    </div>
  );
}
