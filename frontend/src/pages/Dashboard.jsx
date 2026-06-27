import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { api } from '../lib/api';

const STEP_LABELS = ['','Idea','Business','Brand','Plan','Marketing','Website','Pitch','Roadmap'];
const STEP_COLORS = ['','#8B5CF6','#3B82F6','#EC4899','#10B981','#F59E0B','#06B6D4','#EF4444','#A78BFA'];

export default function Dashboard() {
  const { user, fetchMe } = useAuthStore();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newIdea, setNewIdea] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMe();
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await api.listProjects();
      setProjects(data);
    } catch(e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleCreate = async () => {
    if (!newIdea.trim()) return;
    setCreating(true);
    try {
      const project = await api.createProject({ idea: newIdea, title: 'My Startup' });
      setShowModal(false);
      setNewIdea('');
      navigate(`/generate/${project.id}`);
    } catch(e) { alert(e.message); }
    finally { setCreating(false); }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Delete this project?')) return;
    await api.deleteProject(id);
    setProjects(p => p.filter(x => x.id !== id));
  };

  const completionPct = (step) => Math.round((step / 8) * 100);

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black text-white mb-1">
              Welcome back{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}! 👋
            </h1>
            <p className="text-white/40 text-sm">
              {projects.length} project{projects.length !== 1 ? 's' : ''} · {user?.plan === 'free' ? 'Free plan' : 'Pro plan'}
            </p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            + New Startup
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: '📁', label: 'Projects', value: projects.length },
            { icon: '✅', label: 'Completed', value: projects.filter(p => p.status === 'complete').length },
            { icon: '⚡', label: 'In Progress', value: projects.filter(p => p.status === 'draft').length },
            { icon: '🎯', label: 'Plan', value: user?.plan === 'pro' ? 'Pro' : 'Free' },
          ].map(s => (
            <div key={s.label} className="card p-5">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-xs text-white/30 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Projects */}
        {loading ? (
          <div className="text-center py-20 text-white/30">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 card">
            <div className="text-5xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-white mb-2">No projects yet</h3>
            <p className="text-white/40 mb-6">Create your first startup in under 5 minutes</p>
            <button onClick={() => setShowModal(true)} className="btn btn-primary mx-auto">
              Build My First Startup →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <motion.div key={project.id}
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.06 }}
                onClick={() => navigate(`/generate/${project.id}`)}
                className="card card-hover p-6 cursor-pointer relative group"
              >
                {/* Delete */}
                <button onClick={e => handleDelete(project.id, e)}
                  className="absolute top-4 right-4 w-7 h-7 rounded-lg opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-400/10 text-sm">
                  ✕
                </button>

                {/* Step badges */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="step-badge text-xs">{project.current_step}</div>
                  <span className="text-xs text-white/40">
                    Step {project.current_step} of 8 · {STEP_LABELS[project.current_step]}
                  </span>
                  {project.status === 'complete' && (
                    <span className="tag ml-auto text-green-400" style={{ background: 'rgba(16,185,129,0.1)' }}>✓ Done</span>
                  )}
                </div>

                <h3 className="font-bold text-white mb-1 pr-6">{project.title}</h3>
                <p className="text-xs text-white/30 mb-4 line-clamp-2">{project.idea}</p>

                {/* Progress bar */}
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-2">
                  <div className="h-full rounded-full progress-bar transition-all"
                    style={{ width: `${completionPct(project.current_step)}%` }} />
                </div>
                <div className="flex items-center justify-between text-xs text-white/30">
                  <span>{completionPct(project.current_step)}% complete</span>
                  <span>{new Date(project.created_at).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* New project modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.8)' }}
          onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
            className="card w-full max-w-md p-8">
            <h2 className="text-xl font-black text-white mb-2">Start a new startup</h2>
            <p className="text-white/40 text-sm mb-6">Describe your idea — AI will do the rest</p>
            <textarea
              className="input resize-none h-28 mb-4"
              placeholder="I want to create... / I want to sell... / I want to build..."
              value={newIdea}
              onChange={e => setNewIdea(e.target.value)}
            />
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="btn btn-ghost flex-1">Cancel</button>
              <button onClick={handleCreate} disabled={creating || !newIdea.trim()} className="btn btn-primary flex-1 disabled:opacity-50">
                {creating ? 'Creating...' : 'Build It →'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
