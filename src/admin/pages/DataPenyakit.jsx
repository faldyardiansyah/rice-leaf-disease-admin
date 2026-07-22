import  { useState, useEffect } from 'react';
import api from '../../api/axiosInstance';
import Swal from 'sweetalert2';

export default function DataPenyakit() {
  const [riwayatList, setRiwayatList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    try {
      const response = await api.get('/api/admin/history');
      console.log("ISI DATA MENTAH DARI BACKEND:", response.data.data); // <--- INI KUNCI UTAMANYA
      if (response.data && response.data.data) {
        setRiwayatList(response.data.data);
      } else if (Array.isArray(response.data)) {
        setRiwayatList(response.data);
      }
    } catch (err) {
      console.error("Gagal memuat data riwayat:", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  const handleDelete = async (item) => {
    const id = item.ID || item.id;

    const result = await Swal.fire({
      title: 'Apakah kamu yakin?',
      text: "Data riwayat ini akan dihapus dari database!",
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
        await api.delete(`/api/history/${id}`);
        setRiwayatList(riwayatList.filter(i => (i.ID || i.id) !== id));
        
        Swal.fire({
          title: 'Terhapus!',
          text: 'Data riwayat berhasil dihapus.',
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

  const handleExportPDF = () => {
    window.print();
  };

  const getImageUrl = (item) => {
    const rawUrl = item.GambarUrl || item.gambar_url || item.Image || item.image || item.Foto || item.foto;
    if (!rawUrl) return null;
    if (rawUrl.startsWith('http') || rawUrl.startsWith('data:')) return rawUrl;
    return `http://localhost:8080/${rawUrl.startsWith('/') ? rawUrl.substring(1) : rawUrl}`;
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Data Penyakit Tanaman Padi</h2>
          <p className="text-gray-400 text-sm">Kelola dan pantau hasil deteksi penyakit dari para petani.</p>
        </div>
        <button 
          onClick={handleExportPDF}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 shadow-lg"
        >
          📄 Export PDF
        </button>
      </div>

      <div className="overflow-x-auto bg-gray-900/60 rounded-xl border border-gray-800 shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 text-sm">
              <th className="py-3 px-4">No</th>
              <th className="py-3 px-4">Foto</th>
              <th className="py-3 px-4">Nama Petani</th>
              <th className="py-3 px-4">Penyakit Terdeteksi</th>
              <th className="py-3 px-4">Akurasi</th>
              <th className="py-3 px-4">Tanggal</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {riwayatList.length > 0 ? (
              riwayatList.map((item, index) => {
                const imgPath = getImageUrl(item);
                const itemId = item.ID || item.id;
                
                // Debugging baris per baris di console
                console.log(`Baris ${index}:`, item);

                const namaPetani = item.Profil?.NamaPetani || item.profil?.nama_petani || item.NamaPetani || item.nama_petani || 'Petani Umum';
                const namaPenyakit = item.NamaPenyakit || item.nama_penyakit || item.Penyakit || item.penyakit || '-';
                const akurasi = item.Akurasi || item.akurasi || '-';
                const tanggal = item.Tanggal || item.tanggal || '-';

                return (
                  <tr key={itemId || index} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                    <td className="py-3 px-4 text-gray-300">{index + 1}</td>
                    
                    {/* Thumbnail Foto */}
                    <td className="py-3 px-4">
                      {imgPath ? (
                        <img 
                          src={imgPath} 
                          alt="Scan" 
                          className="w-12 h-12 object-cover rounded-lg border border-gray-700 cursor-pointer hover:opacity-80 transition shadow-md"
                          onClick={() => setSelectedItem(item)}
                        />
                      ) : (
                        <span className="text-gray-500 text-xs italic">Tidak ada</span>
                      )}
                    </td>

                    <td className="py-3 px-4 font-medium">{namaPetani}</td>
                    <td className="py-3 px-4 text-emerald-400 font-semibold">{namaPenyakit}</td>
                    <td className="py-3 px-4 text-gray-300">{akurasi}</td>
                    <td className="py-3 px-4 text-gray-400 text-sm">{tanggal}</td>
                    
                    <td className="py-3 px-4 text-center space-x-2">
                      <button 
                        onClick={() => setSelectedItem(item)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition"
                      >
                        Lihat
                      </button>
                      <button 
                        onClick={() => handleDelete(item)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition"
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
                  Tidak ada data riwayat deteksi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Detail */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full text-white shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-emerald-400">Detail Deteksi Penyakit</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p><strong>Nama Petani:</strong> {selectedItem.Profil?.NamaPetani || selectedItem.profil?.nama_petani || selectedItem.NamaPetani || selectedItem.nama_petani || '-'}</p>
              <p><strong>Penyakit:</strong> {selectedItem.NamaPenyakit || selectedItem.nama_penyakit || selectedItem.Penyakit || selectedItem.penyakit || '-'}</p>
              <p><strong>Akurasi:</strong> {selectedItem.Akurasi || selectedItem.akurasi || '-'}</p>
              <p><strong>Tanggal Scan:</strong> {selectedItem.Tanggal || selectedItem.tanggal || '-'}</p>
              
              {getImageUrl(selectedItem) && (
                <div>
                  <strong className="block mb-1">Bukti Gambar:</strong>
                  <img 
                    src={getImageUrl(selectedItem)} 
                    alt="Bukti Scan" 
                    className="w-full h-48 object-cover rounded-lg border border-gray-700 shadow-md" 
                  />
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setSelectedItem(null)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}