// src/components/PublicRoute.jsx
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
  const token = localStorage.getItem('token');
  
  // Jika sudah ada token, arahkan otomatis ke dashboard (gak bisa ke halaman login)
  return token ? <Navigate to="/admin/dashboard" replace /> : children;
}

export default PublicRoute;