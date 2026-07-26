# 🌾 RiceDisease AI — Admin Dashboard

Admin panel berbasis web untuk platform **RiceDisease AI**, sebuah sistem deteksi penyakit tanaman padi berbasis AI. Dashboard ini menampilkan hasil deteksi dan riwayat pemindaian yang dilakukan pengguna melalui aplikasi mobile.

🔗 **Live Demo:** [ricedisease-admin.vercel.app](https://ricedisease-admin.vercel.app)

## ✨ Tentang Project

RiceDisease AI adalah sistem deteksi penyakit padi yang terdiri dari beberapa komponen: model AI object detection (Python + YOLO), backend API (Golang), aplikasi mobile untuk petani (Flutter), dan **admin dashboard ini** yang berfungsi sebagai panel visualisasi bagi admin/peneliti untuk memantau hasil deteksi.

## 🚀 Fitur

- Menampilkan hasil deteksi penyakit padi dari model AI
- Riwayat pemindaian (scan history) pengguna
- Antarmuka dashboard yang responsif dan mudah digunakan

## 🛠️ Tech Stack

| Kategori | Teknologi |
|---|---|
| Library | React |
| Build Tool | Vite |
| Linting | ESLint |
| Deployment | Vercel |
| Backend (terhubung) | Golang REST API |

## ⚙️ Cara Menjalankan

1. Clone repository ini
   ```bash
   git clone https://github.com/faldyardiansyah/rice-leaf-disease-admin.git
   cd rice-leaf-disease-admin
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Jalankan development server
   ```bash
   npm run dev
   ```
4. Buka `http://localhost:5173` di browser

## 📦 Build untuk Production

```bash
npm run build
```

## 🔗 Project Terkait

- [rice-leaf-disease](https://github.com/faldyardiansyah/rice-leaf-disease) — Aplikasi mobile (Flutter) untuk petani melakukan scan penyakit padi

## 👤 Author

**Faldy Ardiansyah**
Mahasiswa D4 Rekayasa Perangkat Lunak — Politeknik Negeri Indramayu
GitHub: [@faldyardiansyah](https://github.com/faldyardiansyah)

---
⭐ Jangan lupa kasih star kalau project ini bermanfaat!
