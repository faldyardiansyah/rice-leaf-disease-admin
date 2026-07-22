import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, CartesianGrid 
} from 'recharts';
import axiosInstance from '../../api/axiosInstance';

function DashboardHome() {
  const [namaAdmin, setNamaAdmin] = useState('');
  
  // State untuk menyimpan data dari database
  const [statistik, setStatistik] = useState({
    totalScan: 0,
    totalPenyakit: 0,
    totalUser: 0
  });
  const [dataGrafik, setDataGrafik] = useState([]);
  const [recentScans, setRecentScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Ambil nama admin dari localStorage
    const storedNama = localStorage.getItem('nama_petani');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedNama) setNamaAdmin(storedNama);

    // 2. Ambil data asli dari database melalui API Backend menggunakan axiosInstance
    const fetchDataFromDatabase = async () => {
      try {
        const response = await axiosInstance.get('/api/admin/dashboard');
        const result = response.data;
        
        // Masukkan data dari database ke state
        setStatistik(result.stats);
        setDataGrafik(result.chartData);
        setRecentScans(result.recentScans);

      } catch (error) {
        console.error("Gagal mengambil data dari database:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromDatabase();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* 1. Banner Sambutan */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-emerald-900/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-2">
          Selamat Datang Kembali, <span className="text-emerald-400">{namaAdmin || 'Admin'}</span>! 👋
        </h2>
        <p className="text-slate-300 text-sm max-w-2xl">
          Data di bawah ini disinkronkan langsung secara *real-time* dari database sistem PadiScan.
        </p>
      </motion.div>

      {/* 2. Kartu Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <motion.div whileHover={{ y: -4 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium">Total Pemindaian</span>
            <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl text-lg">📷</span>
          </div>
          <h3 className="text-3xl font-extrabold text-white">
            {loading ? '...' : statistik.totalScan.toLocaleString()}
          </h3>
          <p className="text-xs text-emerald-400 mt-2">Data dari database</p>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium">Penyakit Terdeteksi</span>
            <span className="p-2 bg-yellow-500/10 text-yellow-400 rounded-xl text-lg">🦠</span>
          </div>
          <h3 className="text-3xl font-extrabold text-white">
            {loading ? '...' : statistik.totalPenyakit.toLocaleString()}
          </h3>
          <p className="text-xs text-yellow-400 mt-2">Perlu perhatian khusus</p>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium">Total Pengguna</span>
            <span className="p-2 bg-blue-500/10 text-blue-400 rounded-xl text-lg">👤</span>
          </div>
          <h3 className="text-3xl font-extrabold text-white">
            {loading ? '...' : statistik.totalUser.toLocaleString()}
          </h3>
          <p className="text-xs text-blue-400 mt-2">Petani aktif terdaftar</p>
        </motion.div>

      </div>

      {/* 3. Grafik Interaktif dari Database */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4">📈 Tren Pemindaian Padi</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataGrafik}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="bulan" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }} />
                <Area type="monotone" dataKey="pemindaian" stroke="#10b981" strokeWidth={3} fill="#10b981" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4">📊 Kasus Penyakit Terdeteksi</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataGrafik}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="bulan" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }} />
                <Bar dataKey="penyakit" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 4. Tabel Aktivitas Terbaru dari Database */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-white mb-4">Aktivitas Pemindaian Terbaru</h3>
        <div className="overflow-x-auto">
          <table className="table w-full text-slate-300 text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-left">
                <th className="py-3 px-4">ID Scan</th>
                <th className="py-3 px-4">Nama Petani</th>
                <th className="py-3 px-4">Hasil Deteksi</th>
                <th className="py-3 px-4">Waktu</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-slate-400">Memuat data dari database...</td>
                </tr>
              ) : recentScans.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-slate-400">Belum ada data pemindaian.</td>
                </tr>
              ) : (
                recentScans.map((item, index) => (
                  <tr key={index} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-mono text-emerald-400">#{item.id}</td>
                    <td className="py-3 px-4">{item.nama_petani}</td>
                    <td className="py-3 px-4">{item.hasil_deteksi}</td>
                    <td className="py-3 px-4">{item.waktu}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${
                        item.status === 'Berbahaya' 
                          ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default DashboardHome;