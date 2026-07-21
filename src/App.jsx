import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './admin/auth/login';
import SplashScreen from './components/SplashScreen';

import AdminLayout from './admin/AdminLayout';
import DashboardHome from './admin/pages/DashboardHome';
import DataPenyakit from './admin/pages/DataPenyakit';
import Ensiklopedia from './admin/pages/Ensiklopedia';
import ManajemenUser from './admin/pages/ManajemenUser';

function PublicRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/admin/dashboard" replace /> : children;
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" replace />;
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <Routes>
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />

          {/* Rute Utama Admin Layout */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            {/* Halaman-halaman yang muncul di dalam <Outlet /> */}
            <Route index element={<DashboardHome />} />
            <Route path="penyakit" element={<DataPenyakit />} />
            <Route path="ensiklopedia" element={<Ensiklopedia />} />
            <Route path="user" element={<ManajemenUser />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;