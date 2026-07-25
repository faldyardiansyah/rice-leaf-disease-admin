import { useState, useEffect } from 'react';
import api from '../../api/axiosInstance';
import Swal from 'sweetalert2';

export default function FormEnsiklopediaModal({ isOpen, onClose, isEditMode, selectedData, onSuccess }) {
  const [formData, setFormData] = useState({
    kode_model: '',
    nama_lokal: '',
    nama_inggris: '',
    status: 'Penyakit',
    gambar_url: '',
    link_artikel: '',
    penyebab: '',
    gejala: '',
    solusi: ''
  });

  useEffect(() => {
    if (isEditMode && selectedData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        kode_model: selectedData.kode_model || selectedData.KodeModel || '',
        nama_lokal: selectedData.nama_lokal || selectedData.NamaLokal || '',
        nama_inggris: selectedData.nama_inggris || selectedData.NamaInggris || '',
        status: selectedData.status || selectedData.Status || 'Penyakit',
        gambar_url: selectedData.gambar_url || selectedData.GambarUrl || '',
        link_artikel: selectedData.link_artikel || selectedData.LinkArtikel || '',
        penyebab: selectedData.penyebab || selectedData.Penyebab || '',
        gejala: selectedData.gejala || selectedData.Gejala || '',
        solusi: selectedData.solusi || selectedData.Solusi || ''
      });
    } else {
      setFormData({
        kode_model: '',
        nama_lokal: '',
        nama_inggris: '',
        status: 'Penyakit',
        gambar_url: '',
        link_artikel: '',
        penyebab: '',
        gejala: '',
        solusi: ''
      });
    }
  }, [isEditMode, selectedData, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = selectedData?.ID || selectedData?.id;
      if (isEditMode) {
        await api.put(`/api/encyclopedia/${id}`, formData);
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Data ensiklopedia berhasil diupdate.',
          background: '#111827',
          color: '#fff',
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        await api.post('/api/encyclopedia', formData);
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Data ensiklopedia baru berhasil ditambahkan.',
          background: '#111827',
          color: '#fff',
          timer: 1500,
          showConfirmButton: false
        });
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response?.data?.error || 'Gagal menyimpan data ke server.',
        background: '#111827',
        color: '#fff',
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-2xl w-full text-white shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4 text-emerald-400">
          {isEditMode ? 'Edit Data Ensiklopedia' : 'Tambah Data Ensiklopedia Baru'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-1">Kode Model (YOLO)</label>
              <input 
                type="text" 
                name="kode_model" 
                value={formData.kode_model} 
                onChange={handleInputChange} 
                placeholder="Contoh: Rice__BacterialLeafBlight" 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleInputChange} 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Penyakit">Penyakit</option>
                <option value="Sehat">Sehat</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-1">Nama Lokal</label>
              <input 
                type="text" 
                name="nama_lokal" 
                value={formData.nama_lokal} 
                onChange={handleInputChange} 
                placeholder="Contoh: Hawar Daun Bakteri" 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Nama Inggris</label>
              <input 
                type="text" 
                name="nama_inggris" 
                value={formData.nama_inggris} 
                onChange={handleInputChange} 
                placeholder="Contoh: Bacterial Leaf Blight" 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-1">URL Gambar</label>
              <input 
                type="text" 
                name="gambar_url" 
                value={formData.gambar_url} 
                onChange={handleInputChange} 
                placeholder="https://..." 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Link Artikel Referensi</label>
              <input 
                type="text" 
                name="link_artikel" 
                value={formData.link_artikel} 
                onChange={handleInputChange} 
                placeholder="https://..." 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Penyebab</label>
            <textarea 
              name="penyebab" 
              rows="2"
              value={formData.penyebab} 
              onChange={handleInputChange} 
              placeholder="Jelaskan penyebab penyakit..." 
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Gejala</label>
            <textarea 
              name="gejala" 
              rows="2"
              value={formData.gejala} 
              onChange={handleInputChange} 
              placeholder="Jelaskan gejala klinis pada tanaman..." 
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Solusi / Penanganan</label>
            <textarea 
              name="solusi"
              rows="2"
              value={formData.solusi} 
              onChange={handleInputChange} 
              placeholder="Cara penanganan atau obat yang disarankan..." 
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
            <button 
              type="button"
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Batal
            </button>
            <button 
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-lg"
            >
              {isEditMode ? 'Simpan Perubahan' : 'Tambah Data'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}