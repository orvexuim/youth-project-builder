import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';

const STEPS = [
  { n: 1, icon: '💡', title: 'Share Your Idea',       desc: 'Write your startup idea in plain English — no jargon needed.' },
  { n: 2, icon: '🔍', title: 'Business Analysis',     desc: 'AI generates name, slogan, UVP, SWOT, revenue model & more.' },
  { n: 3, icon: '🎨', title: 'Brand Identity',        desc: 'Full brand kit: colors, fonts, logo concept, style guide.' },
  { n: 4, icon: '📋', title: 'Business Plan',         desc: 'Executive summary, milestones, budget, risks & growth roadmap.' },
  { n: 5, icon: '📱', title: 'Marketing Content',     desc: '20 content ideas, 10 captions, bios for all platforms.' },
  { n: 6, icon: '🌐', title: 'Website Copy',          desc: 'Complete landing page copy: hero, features, FAQ, CTA.' },
  { n: 7, icon: '📊', title: 'Pitch Deck',            desc: '10-slide investor pitch with speaker notes.' },
  { n: 8, icon: '🗺️', title: 'Action Roadmap',        desc: 'Week 1 → Year 1 execution plan with daily tasks.' },
];

const EXAMPLES = [
  'I want to sell handmade jewelry online',
  'I want to create a tutoring app for students',
  'I want to open a sustainable coffee shop',
  'I want to build a freelance marketplace',
  'I want to launch a fitness coaching service',
];

const TESTIMONIALS = [
  { name: 'Amira K.', role: 'Student entrepreneur', text: 'I had an idea on Monday. By Tuesday I had a full business plan, brand kit, and pitch deck. This is insane!', avatar: 'AK' },
  { name: 'Ryan O.', role: 'Hackathon winner', text: 'Won first place at our university hackathon using YouthBuilder. The pitch deck it generated was better than what I could have made in a week.', avatar: 'RO' },
  { name: 'Sofia M.', role: '19-year-old founder', text: 'I am not good at business. I am just creative. YouthBuilder turned my fashion idea into a real startup plan with everything I needed.', avatar: 'SM' },
];

export default function HomePage() {
  const [idea, setIdea] = useState('');
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleStart = () => {
    if (!user) { navigate('/register'); return; }
    navigate('/generate', { state: { idea } });
  };

  return (
    <div className="grid-bg">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-20">
        {/* Orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />

        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
          className="text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">🚀 Hackathon-ready in minutes</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-6">
            Turn your idea into<br />
            <span className="grad">a real startup</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            AI generates your complete startup kit — business plan, brand identity,
            pitch deck, marketing content, and action roadmap in minutes.
          </p>

          {/* Idea input */}
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-2xl p-2 flex gap-2"
              style={{ boxShadow: '0 0 0 1px rgba(139,92,246,0.2), 0 40px 80px rgba(0,0,0,0.5)' }}>
              <input
                type="text"
                value={idea}
                onChange={e => setIdea(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleStart()}
                placeholder="I want to..."
                className="input flex-1 rounded-xl"
                style={{ background: 'transparent', border: 'none' }}
              />
              <button onClick={handleStart} className="btn btn-primary px-6 flex-shrink-0">
                Build My Startup →
              </button>
            </div>
            {/* Examples */}
            <div className="mt-3 flex flex-wrap gap-2 justify-center">
              {EXAMPLES.slice(0, 3).map(ex => (
                <button key={ex} onClick={() => setIdea(ex)}
                  className="text-xs px-3 py-1.5 rounded-lg text-white/40 hover:text-white/70 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  "{ex}"
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-white/30">
            <span><b className="text-white/70">5,000+</b> startups built</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span><b className="text-white/70">8 steps</b> fully automated</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span><b className="text-white/70">Free</b> to start</span>
          </div>
        </motion.div>
      </section>

      {/* Steps */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">
            8 steps. Complete startup. <span className="grad">Under 5 minutes.</span>
          </h2>
          <p className="text-white/40">Every step powered by GPT-4o</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <motion.div key={s.n}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay: i*0.06 }}
              className="card card-hover p-5 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="step-badge">{s.n}</div>
                <span className="text-xl">{s.icon}</span>
              </div>
              <h3 className="font-bold text-white text-sm mb-2">{s.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-black text-center text-white mb-10">
          Young founders <span className="grad">love it</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay: i*0.08 }}
              className="card p-5"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400 text-sm">★</span>)}
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full text-xs font-bold flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(135deg,#8B5CF6,#3B82F6)' }}>{t.avatar}</div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/30">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          className="max-w-3xl mx-auto text-center card p-12 relative overflow-hidden"
          style={{ borderColor: 'rgba(139,92,246,0.2)', boxShadow: '0 0 60px rgba(139,92,246,0.08)' }}>
          <h2 className="text-4xl font-black text-white mb-4">Ready to build your startup?</h2>
          <p className="text-white/40 mb-8">Free to start. No credit card. Just your idea.</p>
          <Link to="/register" className="btn btn-primary px-10 py-4 text-base">
            Start Building for Free →
          </Link>
          <p className="text-xs text-white/20 mt-4">5 free generations · No card required</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-white/20 text-sm">© 2026 YouthProjectBuilder · Built for dreamers</p>
      </footer>
    </div>
  );
}
