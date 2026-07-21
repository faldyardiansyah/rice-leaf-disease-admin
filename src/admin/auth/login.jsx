import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError('');

    try {
      const res = await axios.post('http://localhost:8080/api/login', {
        email: email,
        password: password
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('nama_petani', res.data.nama_petani);

      if (res.data.role === 'admin') {
        navigate('/admin/dashboard'); 
      } else {
        setError("Akses ditolak: Anda bukan admin!");
      }
    } catch (err) {
      setError("Email atau Password salah!");
      console.error(err);
    }
  };

  return (
    // Container utama dengan background gradasi gelap elegan
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-4">
      
      {/* 3. ANIMASI CARD LOGIN (Framer Motion) */}
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-slate-900/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-slate-800"
      >
        {/* Header Teks */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white tracking-wide">
            Admin <span className="text-emerald-400">PadiScan</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2">Silakan masuk untuk mengelola sistem</p>
        </div>
        
        {/* Kotak Pesan Error (jika login gagal) */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg mb-4 text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Form Input */}
        <form onSubmit={handleLogin}>
          {/* Input Email */}
          <div className="form-control mb-4">
            <label className="label text-slate-300 font-medium text-sm">Email</label>
            <input 
              type="email" 
              placeholder="admin@padiscan.com"
              className="input input-bordered w-full bg-slate-950 text-white border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-control mb-6">
            <label className="label text-slate-300 font-medium text-sm">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="input input-bordered w-full bg-slate-950 text-white border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          {/* Tombol Submit dengan Efek Hover Framer Motion */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn w-full bg-emerald-600 hover:bg-emerald-500 text-white border-none font-semibold shadow-lg shadow-emerald-900/40"
          >
            Masuk ke Dashboard
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;