import 'react';

export default function DetailEnsiklopediaModal({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  const kodeModel = data.KodeModel || data.kode_model;
  const namaLokal = data.NamaLokal || data.nama_lokal;
  const namaInggris = data.NamaInggris || data.nama_inggris;
  const status = data.Status || data.status;
  const gambarUrl = data.GambarUrl || data.gambar_url;
  const linkArtikel = data.LinkArtikel || data.link_artikel;
  const penyebab = data.Penyebab || data.penyebab;
  const gejala = data.Gejala || data.gejala;
  const solusi = data.Solusi || data.solusi;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-2xl w-full text-white shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4 border-b border-gray-800 pb-3">
          <div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-1 rounded border border-emerald-800">
              {kodeModel}
            </span>
            <h3 className="text-2xl font-bold mt-2">{namaLokal}</h3>
            <p className="text-gray-400 italic text-sm">{namaInggris}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2 h-8 w-8 flex items-center justify-center text-sm font-bold"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 text-sm">
          {gambarUrl && (
            <div>
              <label className="block text-gray-400 mb-1 font-semibold">Visual / Gambar Penyakit:</label>
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 max-h-60 flex justify-center">
                <img 
                  src={gambarUrl} 
                  alt={namaLokal} 
                  className="object-contain max-h-60 w-full"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=Gambar+Tidak+Valid'; }}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-400 mb-1 font-semibold">Status Kategori:</label>
            <span className={`px-2 py-1 rounded text-xs font-semibold inline-block ${
              status === 'Sehat' ? 'bg-green-900/50 text-green-400 border border-green-700' : 'bg-red-900/50 text-red-400 border border-red-700'
            }`}>
              {status}
            </span>
          </div>

          <div>
            <label className="block text-gray-400 mb-1 font-semibold">Penyebab:</label>
            <p className="bg-gray-800/60 p-3 rounded-lg border border-gray-800 text-gray-300 whitespace-pre-wrap">
              {penyebab || 'Tidak ada keterangan penyebab.'}
            </p>
          </div>

          <div>
            <label className="block text-gray-400 mb-1 font-semibold">Gejala:</label>
            <p className="bg-gray-800/60 p-3 rounded-lg border border-gray-800 text-gray-300 whitespace-pre-wrap">
              {gejala || 'Tidak ada keterangan gejala.'}
            </p>
          </div>

          <div>
            <label className="block text-gray-400 mb-1 font-semibold">Solusi / Penanganan:</label>
            <p className="bg-gray-800/60 p-3 rounded-lg border border-gray-800 text-gray-300 whitespace-pre-wrap">
              {solusi || 'Tidak ada keterangan solusi.'}
            </p>
          </div>

          <div>
            <label className="block text-gray-400 mb-1 font-semibold">Link Artikel Referensi:</label>
            {linkArtikel ? (
              <a 
                href={linkArtikel} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline break-all block bg-gray-800/40 p-2 rounded border border-gray-800"
              >
                {linkArtikel} ↗
              </a>
            ) : (
              <p className="text-gray-500 italic">Tidak ada tautan artikel terkait.</p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-800 mt-6">
          <button 
            type="button"
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}