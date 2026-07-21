import { NavLink } from 'react-router-dom';

function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('nama_petani');
    
    // Paksa refresh total ke halaman utama agar state browser bersih
    window.location.href = '/';
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col justify-between p-6 min-h-screen">
      <div>
        <div className="flex items-center space-x-2 mb-10">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-slate-950">
            P
          </div>
          <span className="text-xl font-extrabold tracking-wide text-white">
            Padi<span className="text-emerald-400">Scan</span>
          </span>
        </div>

        <nav className="space-y-2">
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

      <button 
        onClick={handleLogout}
        className="flex items-center space-x-3 px-4 py-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl font-medium transition-colors border border-red-500/25"
      >
        <span>🚪</span>
        <span>Keluar (Logout)</span>
      </button>
    </aside>
  );
}

export default Sidebar;