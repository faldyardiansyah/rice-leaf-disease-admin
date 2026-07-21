function Ensiklopedia() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">📖 Ensiklopedia Hama & Penyakit Padi</h1>
      <p className="text-slate-400 text-sm mb-6">Panduan lengkap ensiklopedia pertanian, gejala serangan, dan cara penanggulangannya.</p>

      {/* Contoh Card Konten Ensiklopedia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <h3 className="font-bold text-emerald-400 text-lg mb-1">Wereng Cokelat (Nilaparvata lugens)</h3>
          <p className="text-slate-300 text-sm">Hama utama tanaman padi yang menghisap cairan tanaman dan menularkan virus kerdil hampa.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <h3 className="font-bold text-emerald-400 text-lg mb-1">Penyakit Blas (Pyricularia oryzae)</h3>
          <p className="text-slate-300 text-sm">Penyakit jamur yang menyerang daun dan tangkai malai, menyebabkan patah leher malai.</p>
        </div>
      </div>
    </div>
  );
}

export default Ensiklopedia;