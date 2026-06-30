import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function Navbar() {
  const { user, token, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6"
      style={{
        background: 'rgba(9,9,11,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,248,235,0.07)',
      }}>
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C97A)', color: '#09090b' }}>
            Y
          </div>
          <span className="font-semibold text-sm tracking-wide"
            style={{ color: 'rgba(245,240,232,0.9)' }}>
            YouthBuilder
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/"
            className="text-sm transition-colors"
            style={{ color: 'rgba(245,240,232,0.45)' }}
            onMouseEnter={e => e.target.style.color = 'rgba(245,240,232,0.9)'}
            onMouseLeave={e => e.target.style.color = 'rgba(245,240,232,0.45)'}>
            Home
          </Link>
          <Link to="/pricing"
            className="text-sm transition-colors"
            style={{ color: 'rgba(245,240,232,0.45)' }}
            onMouseEnter={e => e.target.style.color = 'rgba(245,240,232,0.9)'}
            onMouseLeave={e => e.target.style.color = 'rgba(245,240,232,0.45)'}>
            Pricing
          </Link>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {token ? (
            <>
              <Link to="/dashboard" className="btn btn-ghost text-sm px-4 py-2">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-ghost text-sm px-4 py-2">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                className="text-sm font-medium transition-colors"
                style={{ color: 'rgba(245,240,232,0.5)' }}
                onMouseEnter={e => e.target.style.color = 'rgba(245,240,232,0.9)'}
                onMouseLeave={e => e.target.style.color = 'rgba(245,240,232,0.5)'}>
                Sign in
              </Link>
              <Link to="/register" className="btn btn-primary text-sm px-5 py-2.5">
                Get Started Free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
