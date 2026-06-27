import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,15,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm"
            style={{ background: 'linear-gradient(135deg,#8B5CF6,#3B82F6)' }}>Y</div>
          <span className="font-black text-white text-base">Youth<span className="text-purple-400">Builder</span></span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { to: '/', label: 'Home' },
            { to: '/pricing', label: 'Pricing' },
          ].map(({ to, label }) => (
            <Link key={to} to={to}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                isActive(to) ? 'text-white bg-white/[0.06]' : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
              }`}>
              {label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-ghost text-sm py-2 px-4">Dashboard</Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg,#8B5CF6,#3B82F6)' }}>
                  {user.full_name?.[0]?.toUpperCase() || 'U'}
                </div>
                <button onClick={() => { logout(); navigate('/'); }}
                  className="text-xs text-white/30 hover:text-white/60 transition-colors">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-white/50 hover:text-white transition-colors">Sign in</Link>
              <Link to="/register" className="btn btn-primary text-sm py-2 px-5">Get Started Free</Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
