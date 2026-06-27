/** Step 2 — Business Analysis result */
export default function Step2Result({ data }) {
  if (!data) return null;
  const swot = data.swot || {};
  return (
    <div className="space-y-5">
      {/* Business card */}
      <div className="card p-6" style={{ borderColor:'rgba(139,92,246,0.15)', background:'rgba(139,92,246,0.04)' }}>
        <div className="flex items-start justify-between gap-4 mb-2">
          <h2 className="text-3xl font-black text-white">{data.business_name}</h2>
          <span className="tag text-purple-300 flex-shrink-0" style={{ background:'rgba(139,92,246,0.1)' }}>Business Name</span>
        </div>
        <p className="text-purple-300 font-semibold text-lg mb-3">"{data.slogan}"</p>
        <p className="text-white/60 text-sm leading-relaxed">{data.description}</p>
      </div>

      {/* 2-col grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Target Audience */}
        <Section icon="🎯" title="Target Audience" color="#3B82F6">
          <div className="text-sm space-y-2">
            <div><span className="text-white/40 text-xs">Primary:</span> <span className="text-white/80">{data.target_audience?.primary}</span></div>
            <div><span className="text-white/40 text-xs">Age:</span> <span className="text-white/80">{data.target_audience?.age_range}</span></div>
            <div className="flex flex-wrap gap-1 mt-2">
              {data.target_audience?.interests?.map(i => (
                <span key={i} className="tag text-blue-300" style={{ background:'rgba(59,130,246,0.1)' }}>{i}</span>
              ))}
            </div>
          </div>
        </Section>

        {/* UVP */}
        <Section icon="⭐" title="Unique Value Proposition" color="#F59E0B">
          <p className="text-white/80 text-sm leading-relaxed italic">"{data.uvp}"</p>
        </Section>

        {/* Problems Solved */}
        <Section icon="✅" title="Problems Solved" color="#10B981">
          <ul className="space-y-2">
            {data.problems_solved?.map((p, i) => (
              <li key={i} className="flex gap-2 text-sm text-white/70">
                <span className="text-green-400 flex-shrink-0">→</span> {p}
              </li>
            ))}
          </ul>
        </Section>

        {/* Revenue Model */}
        <Section icon="💰" title="Revenue Model" color="#8B5CF6">
          <ul className="space-y-2">
            {data.revenue_model?.map((r, i) => (
              <li key={i} className="flex gap-2 text-sm text-white/70">
                <span className="text-purple-400">$</span> {r}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* SWOT */}
      <div className="card p-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><span>📊</span> SWOT Analysis</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key:'strengths',    label:'Strengths',    color:'#10B981', bg:'rgba(16,185,129,0.06)' },
            { key:'weaknesses',   label:'Weaknesses',   color:'#EF4444', bg:'rgba(239,68,68,0.06)' },
            { key:'opportunities',label:'Opportunities',color:'#3B82F6', bg:'rgba(59,130,246,0.06)' },
            { key:'threats',      label:'Threats',      color:'#F59E0B', bg:'rgba(245,158,11,0.06)' },
          ].map(q => (
            <div key={q.key} className="rounded-xl p-4" style={{ background:q.bg, border:`1px solid ${q.color}20` }}>
              <div className="text-xs font-bold mb-2" style={{ color:q.color }}>{q.label}</div>
              <ul className="space-y-1">
                {swot[q.key]?.map((item, i) => (
                  <li key={i} className="text-xs text-white/60">• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Competitors */}
      <div className="card p-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><span>🏆</span> Competitor Analysis</h3>
        <div className="space-y-3">
          {data.competitors?.map((c, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg" style={{ background:'rgba(255,255,255,0.03)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{ background:'rgba(239,68,68,0.1)', color:'#EF4444' }}>{c.name?.[0]}</div>
              <div className="flex-1">
                <div className="font-semibold text-white text-sm">{c.name}</div>
                <div className="text-xs text-white/40">Weakness: {c.weakness}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Startup Costs */}
      {data.startup_costs && (
        <div className="card p-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2"><span>💸</span> Estimated Startup Costs</h3>
          <div className="flex gap-6 mb-4">
            <div><span className="text-xs text-white/40 block mb-0.5">Minimum</span>
              <span className="text-xl font-black text-green-400">{data.startup_costs.minimum}</span></div>
            <div><span className="text-xs text-white/40 block mb-0.5">Recommended</span>
              <span className="text-xl font-black text-blue-400">{data.startup_costs.recommended}</span></div>
          </div>
          <div className="space-y-2">
            {data.startup_costs.breakdown?.map((b, i) => (
              <div key={i} className="flex justify-between text-sm py-2" style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                <span className="text-white/60">{b.item}</span>
                <span className="text-white font-semibold">{b.amount}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ icon, title, color, children }) {
  return (
    <div className="card p-5">
      <h3 className="font-bold text-white mb-3 flex items-center gap-2 text-sm">
        <span>{icon}</span> {title}
      </h3>
      {children}
    </div>
  );
}
