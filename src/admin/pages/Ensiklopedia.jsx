import  { useState, useEffect } from 'react';
import api from '../../api/axiosInstance';
import Swal from 'sweetalert2';
import FormEnsiklopediaModal from './FormEnsiklopediaModal';
import DetailEnsiklopediaModal from './DetailEnsiklopediaModal'; // Import modal detail (Show)

export default function DataEnsiklopedia() {
  const [ensiklopediaList, setEnsiklopediaList] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await api.get('/api/encyclopedia');
      if (response.data && response.data.data) {
        setEnsiklopediaList(response.data.data);
      } else if (Array.isArray(response.data)) {
        setEnsiklopediaList(response.data);
      }
    } catch (err) {
      console.error("Gagal memuat data ensiklopedia:", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setSelectedData(null);
    setShowFormModal(true);
  };

  const handleOpenEditModal = (item) => {
    setIsEditMode(true);
    setSelectedData(item);
    setShowFormModal(true);
  };

  const handleOpenDetailModal = (item) => {
    setSelectedData(item);
    setShowDetailModal(true);
  };

  const handleDelete = async (item) => {
    const id = item.ID || item.id;
    const result = await Swal.fire({
      title: 'Apakah kamu yakin?',
      text: "Data ensiklopedia ini akan dihapus permanen!",
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
        await api.delete(`/api/encyclopedia/${id}`);
        setEnsiklopediaList(ensiklopediaList.filter(i => (i.ID || i.id) !== id));
        Swal.fire({
          title: 'Terhapus!',
          text: 'Data ensiklopedia berhasil dihapus.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          background: '#111827',
          color: '#fff',
        });
      } catch (err) {
        console.error("Gagal menghapus:", err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Gagal menghapus data dari server.',
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
          <h2 className="text-2xl font-bold">Kelola Ensiklopedia Penyakit</h2>
          <p className="text-gray-400 text-sm">Tambah, ubah, atau lihat detail informasi dan solusi penyakit padi.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleOpenAddModal}
            className=" cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 shadow-lg print:hidden"
          >
            ➕ Tambah Penyakit
          </button>
          <button 
            onClick={() => window.print()}
            className="cursor-pointer bg-gray-800  hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 shadow-lg print:hidden"
          >
            📄 Export PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-gray-900/60 rounded-xl border border-gray-800 shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 text-sm">
              <th className="py-3 px-4">No</th>
              <th className="py-3 px-4">Kode Model</th>
              <th className="py-3 px-4">Nama Lokal</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Link Artikel</th>
              <th className="py-3 px-4 text-center print:hidden">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {ensiklopediaList.length > 0 ? (
              ensiklopediaList.map((item, index) => {
                const itemId = item.ID || item.id;
                const linkArtikel = item.LinkArtikel || item.link_artikel;
                return (
                  <tr key={itemId || index} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                    <td className="py-3 px-4 text-gray-300">{index + 1}</td>
                    <td className="py-3 px-4 text-emerald-400 font-mono text-xs">{item.KodeModel || item.kode_model}</td>
                    <td className="py-3 px-4 font-medium">{item.NamaLokal || item.nama_lokal}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        (item.Status || item.status) === 'Sehat' ? 'bg-green-900/50 text-green-400 border border-green-700' : 'bg-red-900/50 text-red-400 border border-red-700'
                      }`}>
                        {item.Status || item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs">
                      {linkArtikel ? (
                        <a 
                          href={linkArtikel} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:underline truncate block max-w-xs"
                        >
                          {linkArtikel}
                        </a>
                      ) : (
                        <span className="text-gray-500 italic">Tidak ada link</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center space-x-2 print:hidden">
                      <button 
                        onClick={() => handleOpenDetailModal(item)}
                        className="cursor-pointer bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1 rounded text-xs font-medium transition"
                      >
                        Lihat
                      </button>
                      <button 
                        onClick={() => handleOpenEditModal(item)}
                        className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition"
                      >
                        Ubah
                      </button>
                      <button 
                        onClick={() => handleDelete(item)}
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
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  Belum ada data ensiklopedia penyakit.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form Tambah / Edit */}
      <FormEnsiklopediaModal 
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        isEditMode={isEditMode}
        selectedData={selectedData}
        onSuccess={fetchData}
      />

      {/* Modal Show / Detail Data */}
      <DetailEnsiklopediaModal 
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        data={selectedData}
      />
    </div>
  );
}