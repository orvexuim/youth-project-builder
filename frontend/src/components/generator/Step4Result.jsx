/** Step 4 — Business Plan */
export default function Step4Result({ data }) {
  if (!data) return null;
  return (
    <div className="space-y-5">
      {/* Executive Summary */}
      <div className="card p-6" style={{ borderColor:'rgba(59,130,246,0.15)' }}>
        <h3 className="font-bold text-white mb-3 flex items-center gap-2"><span>📝</span> Executive Summary</h3>
        <p className="text-white/70 leading-relaxed">{data.executive_summary}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <span className="text-xs text-white/40 block mb-1">Mission</span>
            <p className="text-white/80 text-sm italic">"{data.mission_statement}"</p>
          </div>
          <div>
            <span className="text-xs text-white/40 block mb-1">Vision</span>
            <p className="text-white/80 text-sm italic">"{data.vision_statement}"</p>
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className="card p-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><span>🎯</span> Goals</h3>
        <div className="space-y-3">
          {data.goals?.map((g, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl" style={{ background:'rgba(255,255,255,0.03)' }}>
              <div className="step-badge flex-shrink-0" style={{ background:`hsl(${i*40+220},70%,55%)` }}>{g.period?.split(' ')[0]}</div>
              <div>
                <div className="font-semibold text-white text-sm">{g.goal}</div>
                <div className="text-xs text-white/40 mt-0.5">📊 {g.metric}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="card p-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><span>🚀</span> Milestones</h3>
        <div className="relative pl-6">
          <div className="absolute left-2 top-0 bottom-0 w-px bg-white/10" />
          {data.milestones?.map((m, i) => (
            <div key={i} className="relative mb-5 last:mb-0">
              <div className="absolute -left-4 top-1 w-3 h-3 rounded-full bg-purple-500" />
              <div className="text-xs text-purple-400 font-semibold mb-1">{m.date}</div>
              <div className="font-bold text-white text-sm">{m.name}</div>
              <div className="text-xs text-white/40 mt-0.5">{m.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget */}
      {data.budget && (
        <div className="card p-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2"><span>💰</span> Budget</h3>
          <div className="flex gap-6 mb-4 flex-wrap">
            <div><span className="text-xs text-white/40 block">Initial Investment</span>
              <span className="text-2xl font-black text-white">{data.budget.initial_investment}</span></div>
            <div><span className="text-xs text-white/40 block">Monthly Burn</span>
              <span className="text-2xl font-black text-orange-400">{data.budget.monthly_burn_rate}</span></div>
            <div><span className="text-xs text-white/40 block">Break-even</span>
              <span className="text-2xl font-black text-green-400">{data.budget.break_even_point}</span></div>
          </div>
          <div className="space-y-2">
            {data.budget.categories?.map((c, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-2 flex-1 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full"
                    style={{ width: c.percentage, background:`hsl(${i*40+220},70%,55%)` }} />
                </div>
                <div className="flex justify-between gap-4 w-48">
                  <span className="text-xs text-white/60">{c.category}</span>
                  <span className="text-xs text-white font-semibold">{c.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risks */}
      {data.risks && (
        <div className="card p-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2"><span>⚠️</span> Risks & Solutions</h3>
          <div className="space-y-3">
            {data.risks.map((r, i) => (
              <div key={i} className="p-4 rounded-xl" style={{ background:'rgba(255,255,255,0.03)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`tag text-xs ${
                    r.probability==='High' ? 'text-red-400' : r.probability==='Medium' ? 'text-yellow-400' : 'text-green-400'
                  }`} style={{ background:'rgba(255,255,255,0.05)' }}>
                    {r.probability}
                  </span>
                  <span className="text-white text-sm font-medium">{r.risk}</span>
                </div>
                <div className="text-xs text-green-400 flex gap-1"><span>✓</span> {r.solution}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
