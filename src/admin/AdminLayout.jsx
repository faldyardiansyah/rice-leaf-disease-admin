import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AdminLayout() {
  const [namaAdmin, setNamaAdmin] = useState('');
  const [role, setRole] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  
  useEffect(() => {
    const storedNama = localStorage.getItem('nama_petani');
    const storedRole = localStorage.getItem('role');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedNama) setNamaAdmin(storedNama);
    if (storedRole) setRole(storedRole);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('nama_petani');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex overflow-x-hidden">
      
      {/* Sidebar fixed di kiri */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* 👇 TAMBAHKAN "md:ml-64" DI SINI SUPAYA TIDAK KETUTUPAN SIDEBAR 👇 */}
      <div className="flex-1 flex flex-col min-w-0 w-full md:ml-64">
        
        {/* Header Atas */}
        <header className="h-20 bg-slate-900/60 backdrop-blur-md border-b border-slate-800 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            {/* Tombol Hamburger Menu (Hanya muncul di HP) */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-800 text-emerald-400 hover:bg-slate-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>

            <div>
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-white">Dashboard Admin</h1>
              <p className="text-xs text-slate-400 hidden sm:block">Sistem Deteksi Dini Penyakit Tanaman Padi</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white">{namaAdmin || 'Admin PadiScan'}</p>
              <p className="text-xs text-emerald-400 capitalize">{role || 'Administrator'}</p>
            </div>
            
            <div className="w-9 h-9 rounded-full bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
              {namaAdmin ? namaAdmin.charAt(0).toUpperCase() : 'A'}
            </div>

            {/* Tombol Logout khusus Mobile */}
            <button 
              onClick={handleLogout} 
              className="md:hidden btn btn-sm bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20 text-xs px-2"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Area Outlet / Halaman yang Berubah-ubah */}
        <main className="p-4 md:p-8 overflow-y-auto flex-1 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;