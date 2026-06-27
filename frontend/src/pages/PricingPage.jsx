import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PLANS = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    desc: 'Perfect to start building',
    features: ['2 projects', 'All 8 AI steps', 'PDF export', 'Community support'],
    disabled: ['Unlimited projects', 'All export formats', 'Priority AI', 'API access'],
    cta: 'Start Free',
    href: '/register',
    highlight: false,
  },
  {
    name: 'Pro',
    price: { monthly: 19, yearly: 14 },
    desc: 'For serious entrepreneurs',
    badge: '🔥 Most Popular',
    features: ['Unlimited projects', 'All 8 AI steps', 'All export formats', 'Priority AI (2x faster)', 'Version history', 'Email support'],
    disabled: ['Team workspace', 'API access'],
    cta: 'Start Pro Trial',
    href: '/register',
    highlight: true,
  },
  {
    name: 'Team',
    price: { monthly: 49, yearly: 39 },
    desc: 'For accelerators & schools',
    features: ['Everything in Pro', 'Team workspace (20 seats)', 'API access', 'Custom branding', 'Analytics dashboard', 'Priority support', 'SLA guarantee'],
    disabled: [],
    cta: 'Contact Us',
    href: '/register',
    highlight: false,
  },
];

export default function PricingPage() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="min-h-screen grid-bg pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <motion.h1 initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
            className="text-5xl font-black text-white mb-4">
            Simple, honest <span className="grad">pricing</span>
          </motion.h1>
          <p className="text-white/40 text-lg mb-8">Start free. Upgrade when you're ready.</p>
          <div className="inline-flex items-center gap-1 p-1 rounded-xl glass">
            {['monthly','yearly'].map(b => (
              <button key={b} onClick={() => setBilling(b)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                  billing===b ? 'bg-purple-500/20 text-purple-300' : 'text-white/40 hover:text-white/70'
                }`}>
                {b} {b==='yearly' && <span className="text-green-400 text-xs ml-1">-25%</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map((plan, i) => (
            <motion.div key={plan.name}
              initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
              className="card flex flex-col p-7 relative"
              style={plan.highlight ? { borderColor:'rgba(139,92,246,0.3)', boxShadow:'0 0 40px rgba(139,92,246,0.08)' } : {}}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background:'linear-gradient(135deg,#8B5CF6,#3B82F6)' }}>{plan.badge}</div>
              )}
              <div className="mb-6">
                <div className="text-sm text-white/40 mb-1">{plan.name}</div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-black text-white">${plan.price[billing]}</span>
                  <span className="text-white/30 text-sm pb-1">/mo</span>
                </div>
                <p className="text-white/40 text-xs">{plan.desc}</p>
              </div>
              <Link to={plan.href}
                className={`btn w-full justify-center mb-7 ${plan.highlight ? 'btn-primary' : 'btn-ghost'}`}>
                {plan.cta}
              </Link>
              <div className="flex-1 space-y-2.5">
                {plan.features.map(f => (
                  <div key={f} className="flex gap-2.5 text-sm text-white/70">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background:'rgba(139,92,246,0.2)' }}>
                      <svg className="w-2.5 h-2.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {f}
                  </div>
                ))}
                {plan.disabled.map(f => (
                  <div key={f} className="flex gap-2.5 text-sm text-white/20">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-white/5">
                      <span className="text-[10px]">—</span>
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
