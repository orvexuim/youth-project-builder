import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';

export default function AuthPage({ mode = 'login' }) {
  const [form, setForm] = useState({ email: '', password: '', full_name: '' });
  const [err, setErr] = useState('');
  const { login, register, loading } = useAuthStore();
  const navigate = useNavigate();
  const isRegister = mode === 'register';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      if (isRegister) await register(form);
      else await login({ email: form.email, password: form.password });
      navigate('/dashboard');
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center px-4 pt-16">
      <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
        className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white font-black text-xl"
            style={{ background: 'linear-gradient(135deg,#8B5CF6,#3B82F6)' }}>Y</div>
          <h1 className="text-2xl font-black text-white">
            {isRegister ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-white/40 text-sm mt-2">
            {isRegister ? 'Start building your startup today — free' : 'Sign in to continue building'}
          </p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block mb-1.5">Full Name</label>
                <input type="text" className="input" placeholder="Your full name" required
                  value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} />
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block mb-1.5">Email</label>
              <input type="email" className="input" placeholder="you@example.com" required
                value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block mb-1.5">Password</label>
              <input type="password" className="input" placeholder="••••••••" required
                value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
            </div>

            {err && (
              <div className="text-red-400 text-sm text-center py-2 px-3 rounded-lg"
                style={{ background: 'rgba(239,68,68,0.08)' }}>{err}</div>
            )}

            <button type="submit" disabled={loading}
              className="btn btn-primary w-full py-3.5 text-sm mt-2 disabled:opacity-50">
              {loading ? 'Loading...' : (isRegister ? 'Create Account →' : 'Sign In →')}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/30">
            {isRegister ? (
              <>Already have an account? <Link to="/login" className="text-purple-400 hover:text-purple-300">Sign in</Link></>
            ) : (
              <>Don't have an account? <Link to="/register" className="text-purple-400 hover:text-purple-300">Sign up free</Link></>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
