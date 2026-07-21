import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AdminLayout() {
  const [namaAdmin, setNamaAdmin] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

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
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar Tetap di Samping */}
      <Sidebar />

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header Atas */}
        <header className="h-20 bg-slate-900/60 backdrop-blur-md border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-white">Dashboard Admin</h1>
            <p className="text-xs text-slate-400">Sistem Deteksi Dini Penyakit Tanaman Padi</p>
          </div>

          {/* Bagian Kanan Header (Profil & Tombol Logout Mobile) */}
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white">{namaAdmin || 'Admin PadiScan'}</p>
              <p className="text-xs text-emerald-400 capitalize">{role || 'Administrator'}</p>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
              {namaAdmin ? namaAdmin.charAt(0).toUpperCase() : 'A'}
            </div>

            <button 
              onClick={handleLogout} 
              className="md:hidden btn btn-sm bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
            >
              LogOut
            </button>
          </div>
        </header>

        <main className="p-8 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;