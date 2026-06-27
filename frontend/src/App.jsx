import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import GeneratorPage from './pages/GeneratorPage';
import PricingPage from './pages/PricingPage';
import { useAuthStore } from './store/authStore';
import './styles/globals.css';

function ProtectedRoute({ children }) {
  const { token } = useAuthStore();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const { fetchMe, token } = useAuthStore();

  useEffect(() => {
    if (token) fetchMe();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/login"     element={<AuthPage mode="login" />} />
        <Route path="/register"  element={<AuthPage mode="register" />} />
        <Route path="/pricing"   element={<PricingPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/generate/:id" element={<ProtectedRoute><GeneratorPage /></ProtectedRoute>} />
        <Route path="*"          element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
