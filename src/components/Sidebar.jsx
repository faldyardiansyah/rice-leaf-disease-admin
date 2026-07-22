import { NavLink } from 'react-router-dom';

// Menerima props isOpen dan onClose agar bisa ditutup saat menu diklik di HP
function Sidebar({ isOpen, onClose }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('nama_petani');
    window.location.href = '/';
  };

  return (
    <>
      {/* 1. Backdrop / Gelap transparan di belakang saat menu HP terbuka */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        ></div>
      )}

      {/* 2. Sidebar Utama */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-6 h-screen shrink-0 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        <div>
          {/* Logo Brand & Tombol Close untuk HP */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-slate-950">
                P
              </div>
              <span className="text-xl font-extrabold tracking-wide text-white">
                Padi<span className="text-emerald-400">Scan</span>
              </span>
            </div>
            
            {/* Tombol X (Tutup) khusus HP */}
            <button 
              onClick={onClose} 
              className="md:hidden text-slate-400 hover:text-white text-xl font-bold p-1"
            >
              ✕
            </button>
          </div>

          {/* Menu Navigasi (Otomatis menutup drawer saat diklik di HP) */}
          <nav className="space-y-2" onClick={onClose}>
            <NavLink 
              to="/admin/dashboard" 
              end
              className={({ isActive }) => 
                `flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  isActive ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <span>📊</span>
              <span>Dashboard</span>
            </NavLink>

            <NavLink 
              to="/admin/dashboard/penyakit" 
              className={({ isActive }) => 
                `flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  isActive ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <span>🌾</span>
              <span>Data Penyakit Padi</span>
            </NavLink>

            <NavLink 
              to="/admin/dashboard/ensiklopedia" 
              className={({ isActive }) => 
                `flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  isActive ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <span>📖</span>
              <span>Ensiklopedia</span>
            </NavLink>

            <NavLink 
              to="/admin/dashboard/user" 
              className={({ isActive }) => 
                `flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  isActive ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <span>👥</span>
              <span>Manajemen User</span>
            </NavLink>
          </nav>
        </div>

        {/* Tombol Logout */}
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl font-medium transition-colors border border-red-500/25 w-full"
        >
          <span>🚪</span>
          <span>Keluar (Logout)</span>
        </button>
      </aside>
    </>
  );
}

export default Sidebar;