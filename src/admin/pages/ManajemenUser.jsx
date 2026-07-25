import { useState, useEffect } from 'react';
import api from '../../api/axiosInstance';
import Swal from 'sweetalert2';
import DetailUserModal from './DetailUserModal';

export default function ManajemenUser() {
  const [userList, setUserList] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/profil');
      if (response.data && response.data.data) {
        setUserList(response.data.data);
      } else if (Array.isArray(response.data)) {
        setUserList(response.data);
      }
    } catch (err) {
      console.error("Gagal memuat data user:", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  const handleOpenDetail = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const handleDelete = async (user) => {
    const id = user.ID || user.id;
    const result = await Swal.fire({
      title: 'Hapus Akun User?',
      text: `Akun milik "${user.NamaPetani || user.nama_petani}" akan dihapus permanen!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#374151',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
      background: '#111827',
      color: '#fff',
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/api/profil/${id}`);
        setUserList(userList.filter(u => (u.ID || u.id) !== id));
        Swal.fire({
          title: 'Terhapus!',
          text: 'Data user berhasil dihapus.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          background: '#111827',
          color: '#fff',
        });
      } catch (err) {
        console.error("Gagal menghapus user:", err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response?.data?.error || 'Gagal menghapus user dari server.',
          background: '#111827',
          color: '#fff',
        });
      }
    }
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Manajemen Pengguna (Petani)</h2>
          <p className="text-gray-400 text-sm">Kelola dan pantau data akun pengguna yang terdaftar di sistem.</p>
        </div>
        <button 
          onClick={() => window.print()}
          className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 shadow-lg print:hidden"
        >
          📄 Export PDF
        </button>
      </div>

      <div className="overflow-x-auto bg-gray-900/60 rounded-xl border border-gray-800 shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 text-sm">
              <th className="py-3 px-4">No</th>
              <th className="py-3 px-4">Nama Petani</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">No. Telepon</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4 text-center">Total Deteksi</th>
              <th className="py-3 px-4 text-center print:hidden">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {userList.length > 0 ? (
              userList.map((user, index) => {
                const userId = user.ID || user.id;
                const nama = user.NamaPetani || user.nama_petani;
                const email = user.Email || user.email;
                const noTelp = user.NoTelp || user.no_telp;
                const role = user.Role || user.role;
                const totalDeteksi = user.TotalDeteksi ?? user.total_deteksi ?? 0;

                return (
                  <tr key={userId || index} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                    <td className="py-3 px-4 text-gray-300">{index + 1}</td>
                    <td className="py-3 px-4 font-medium flex items-center gap-3">
                      <img 
                        src={user.FotoProfilUrl || user.foto_profil_url || 'https://placekitten.com/200/200'} 
                        alt={nama} 
                        className="w-8 h-8 rounded-full object-cover border border-gray-700"
                      />
                      <span>{nama}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{email}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{noTelp}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        role === 'admin' ? 'bg-purple-900/50 text-purple-400 border border-purple-700' : 'bg-emerald-900/50 text-emerald-400 border border-emerald-700'
                      }`}>
                        {role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-emerald-400">{totalDeteksi}</td>
                    <td className="py-3 px-4 text-center space-x-2 print:hidden">
                      <button 
                        onClick={() => handleOpenDetail(user)}
                        className="cursor-pointer bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1 rounded text-xs font-medium transition"
                      >
                        Lihat
                      </button>
                      <button 
                        onClick={() => handleDelete(user)}
                        className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500">
                  Belum ada data pengguna terdaftar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Detail User */}
      <DetailUserModal 
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        user={selectedUser}
      />
    </div>
  );
}