import { getAnalyticsReport } from '@/lib/analytics';
import AnalyticsChart from '@/components/admin/AnalyticsChart';

export const dynamic = 'force-dynamic';

export default async function AdminAnalyticsPage() {
  const { data, isConfigured } = await getAnalyticsReport(30);

  return (
    <div className="max-w-6xl h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-extrabold text-gray-900 mb-2">Google Analytics Dashboard</h1>
        <p className="text-gray-500">Pantau performa traffic website Anda secara otomatis (30 Hari Terakhir).</p>
      </div>

      {!isConfigured ? (
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center p-10">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-red-500 text-5xl">warning</span>
          </div>
          <h2 className="text-2xl font-headline font-extrabold text-gray-800 mb-4">Kredensial API Belum Lengkap</h2>
          <p className="text-gray-500 max-w-lg mb-8 leading-relaxed">
            Sistem mendeteksi bahwa kredensial Google Analytics Data API belum diatur di dalam file <code className="bg-gray-100 px-2 py-1 rounded text-gray-700">.env.local</code>. Harap lengkapi <code className="bg-gray-100 px-2 py-1 rounded text-gray-700">GA_PROPERTY_ID</code>, <code className="bg-gray-100 px-2 py-1 rounded text-gray-700">GA_CLIENT_EMAIL</code>, dan <code className="bg-gray-100 px-2 py-1 rounded text-gray-700">GA_PRIVATE_KEY</code>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Traffic Overview (Page Views & Active Users)</h3>
            <AnalyticsChart data={data} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <span className="text-gray-500 font-medium mb-1">Total Active Users</span>
              <span className="text-3xl font-extrabold text-blue-600">
                {data.reduce((sum, item) => sum + item.activeUsers, 0).toLocaleString('id-ID')}
              </span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <span className="text-gray-500 font-medium mb-1">Total Page Views</span>
              <span className="text-3xl font-extrabold text-emerald-600">
                {data.reduce((sum, item) => sum + item.screenPageViews, 0).toLocaleString('id-ID')}
              </span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <span className="text-gray-500 font-medium mb-1">Total Sessions</span>
              <span className="text-3xl font-extrabold text-orange-500">
                {data.reduce((sum, item) => sum + item.sessions, 0).toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
