/** Step 8 — Action Roadmap */
const PERIODS = [
  { key:'week1',  label:'Week 1',   icon:'📅', color:'#8B5CF6' },
  { key:'week2',  label:'Week 2',   icon:'📅', color:'#3B82F6' },
  { key:'month1', label:'Month 1',  icon:'🗓️', color:'#10B981' },
  { key:'month3', label:'Month 3',  icon:'🗓️', color:'#F59E0B' },
  { key:'month6', label:'Month 6',  icon:'📆', color:'#EF4444' },
  { key:'year1',  label:'Year 1',   icon:'🏆', color:'#EC4899' },
];

export default function Step8Result({ data }) {
  if (!data) return null;

  return (
    <div className="space-y-5">
      <div className="card p-5" style={{ borderColor:'rgba(139,92,246,0.2)' }}>
        <h3 className="font-black text-white text-xl">🗺️ Your Startup Execution Roadmap</h3>
        <p className="text-white/40 text-sm mt-1">Week by week. Step by step. From idea to startup.</p>
      </div>

      {PERIODS.map(period => {
        const periodData = data[period.key];
        if (!periodData) return null;

        return (
          <div key={period.key} className="card p-6 relative overflow-hidden">
            {/* Left color bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ background: period.color }} />

            <div className="pl-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl">{period.icon}</span>
                <div>
                  <div className="font-black text-white text-lg">{period.label}</div>
                  <div className="text-xs font-semibold" style={{ color: period.color }}>
                    {periodData.theme}
                  </div>
                </div>
                {periodData.milestone && (
                  <div className="ml-auto tag text-white text-xs" style={{ background: period.color + '20', border: `1px solid ${period.color}30` }}>
                    🎯 {periodData.milestone}
                  </div>
                )}
              </div>

              {/* Tasks (week1, week2) */}
              {periodData.tasks && (
                <div className="space-y-3">
                  {periodData.tasks.map((task, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl" style={{ background:'rgba(255,255,255,0.03)' }}>
                      <div className="flex-shrink-0">
                        <div className="tag text-xs font-mono" style={{ background: period.color+'15', color: period.color }}>{task.day}</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold text-sm">{task.action}</div>
                        <div className="text-white/40 text-xs mt-0.5">→ {task.outcome}</div>
                      </div>
                      <div className={`tag text-xs flex-shrink-0 ${task.priority==='HIGH' ? 'text-red-400' : 'text-yellow-400'}`}
                        style={{ background: task.priority==='HIGH' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)' }}>
                        {task.priority}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Objectives (months) */}
              {periodData.objectives && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-2">Objectives</div>
                      <ul className="space-y-2">
                        {periodData.objectives.map((o, i) => (
                          <li key={i} className="flex gap-2 text-sm text-white/70">
                            <span style={{ color: period.color }}>→</span> {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-2">Key Actions</div>
                      <ul className="space-y-2">
                        {periodData.key_actions?.map((a, i) => (
                          <li key={i} className="flex gap-2 text-sm text-white/70">
                            <span className="text-green-400">✓</span> {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {periodData.kpis && (
                    <div className="flex gap-3 flex-wrap mt-2">
                      {periodData.kpis.map((kpi, i) => (
                        <div key={i} className="px-3 py-2 rounded-xl text-xs" style={{ background: period.color+'15', border:`1px solid ${period.color}25` }}>
                          <span className="text-white/40">{kpi.metric}: </span>
                          <span className="font-bold" style={{ color: period.color }}>{kpi.target}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Year 1 specific */}
              {periodData.revenue_target && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                  <div className="p-3 rounded-xl text-center" style={{ background:'rgba(16,185,129,0.1)' }}>
                    <div className="text-xs text-white/40">Revenue Target</div>
                    <div className="font-black text-green-400">{periodData.revenue_target}</div>
                  </div>
                  <div className="p-3 rounded-xl text-center" style={{ background:'rgba(59,130,246,0.1)' }}>
                    <div className="text-xs text-white/40">Team Size</div>
                    <div className="font-black text-blue-400">{periodData.team_size}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
