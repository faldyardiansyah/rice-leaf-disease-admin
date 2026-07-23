import 'react';

export default function DetailUserModal({ isOpen, onClose, user }) {
  if (!isOpen || !user) return null;

  const nama = user.NamaPetani || user.nama_petani;
  const email = user.Email || user.email;
  const noTelp = user.NoTelp || user.no_telp;
  const role = user.Role || user.role;
  const alamat = user.Alamat || user.alamat;
  const totalDeteksi = user.TotalDeteksi ?? user.total_deteksi ?? 0;
  const totalPenyakit = user.TotalPenyakit ?? user.total_penyakit ?? 0;
  const totalSehat = user.TotalSehat ?? user.total_sehat ?? 0;
  const fotoUrl =
    user.FotoProfilUrl ||
    user.foto_profil_url ||
    "https://placekitten.com/200/200";

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-xl w-full text-white shadow-2xl my-8">
        
        {/* Header Modal (Foto, Nama, Role, dan Tombol Close X) */}
        <div className="flex justify-between items-start mb-4 border-b border-gray-800 pb-3">
          <div className="flex items-center gap-4">
            <img
              src={fotoUrl}
              alt={nama}
              className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow-md"
            />
            <div>
              <h3 className="text-xl font-bold">{nama}</h3>
              <span
                className={`px-2 py-0.5 rounded text-xs font-semibold inline-block mt-1 ${
                  role === "admin"
                    ? "bg-purple-900/50 text-purple-400 border border-purple-700"
                    : "bg-emerald-900/50 text-emerald-400 border border-emerald-700"
                }`}
              >
                {role}
              </span>
            </div>
          </div>
          
          {/* Tombol Close 'X' (Diperbaiki jadi onClick) */}
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2 h-8 w-8 flex items-center justify-center text-sm font-bold transition"
          >
            ✕
          </button>
        </div>

        {/* Konten Detail Data */}
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-800/40 p-3 rounded-lg border border-gray-800">
            <div>
              <span className="text-gray-400 block text-xs">Email:</span>
              <span className="font-medium text-gray-200">{email}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-xs">No. Telepon:</span>
              <span className="font-medium text-gray-200">{noTelp}</span>
            </div>
          </div>

          <div>
            <span className="text-gray-400 block text-xs mb-1 font-semibold">
              Alamat:
            </span>
            <p className="bg-gray-800/60 p-3 rounded-lg border border-gray-800 text-gray-300">
              {alamat || "Tidak ada keterangan alamat."}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-800 text-center">
              <span className="text-gray-400 block text-xs">Total Deteksi</span>
              <span className="text-lg font-bold text-emerald-400">
                {totalDeteksi}
              </span>
            </div>
            <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-800 text-center">
              <span className="text-gray-400 block text-xs">Penyakit</span>
              <span className="text-lg font-bold text-red-400">
                {totalPenyakit}
              </span>
            </div>
            <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-800 text-center">
              <span className="text-gray-400 block text-xs">Sehat</span>
              <span className="text-lg font-bold text-green-400">
                {totalSehat}
              </span>
            </div>
          </div>
        </div>

        {/* Tombol Tutup di Bawah */}
        <div className="flex justify-end pt-4 border-t border-gray-800 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}