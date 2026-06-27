/** Step 7 — Pitch Deck */
import { useState } from 'react';

const SLIDE_COLORS = ['#8B5CF6','#3B82F6','#10B981','#F59E0B','#EF4444','#EC4899','#06B6D4','#A78BFA','#34D399','#6366F1'];

export default function Step7Result({ data }) {
  if (!data?.slides) return null;
  const [active, setActive] = useState(0);
  const slide = data.slides[active];

  return (
    <div className="space-y-5">
      {/* Slide navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {data.slides.map((s, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              active === i ? 'text-white' : 'text-white/40 hover:text-white/70'
            }`}
            style={{
              background: active === i ? SLIDE_COLORS[i] + '30' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${active === i ? SLIDE_COLORS[i] + '50' : 'rgba(255,255,255,0.06)'}`,
            }}>
            {i+1}. {s.title}
          </button>
        ))}
      </div>

      {/* Slide viewer */}
      <div className="card p-0 overflow-hidden">
        {/* Slide header */}
        <div className="h-2" style={{ background: SLIDE_COLORS[active] }} />
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-xs text-white/30 mb-1 uppercase tracking-wider">Slide {active+1} of {data.slides.length}</div>
              <div className="text-xs font-bold mb-1" style={{ color: SLIDE_COLORS[active] }}>{slide.title}</div>
              <h2 className="text-2xl font-black text-white">{slide.headline}</h2>
            </div>
            <div className="text-3xl">{['📊','❗','✅','📈','⚙️','💰','🏆','📣','💵','🌟'][active]}</div>
          </div>

          {/* Slide content */}
          <div className="space-y-4">
            {slide.subtext && <p className="text-white/60">{slide.subtext}</p>}
            {slide.body && <p className="text-white/60 leading-relaxed">{slide.body}</p>}
            {slide.stat && (
              <div className="inline-block px-4 py-2 rounded-xl text-white font-bold"
                style={{ background: SLIDE_COLORS[active] + '20', border: `1px solid ${SLIDE_COLORS[active]}30` }}>
                {slide.stat}
              </div>
            )}

            {/* Points/steps lists */}
            {(slide.points || slide.steps || slide.key_channels || slide.our_advantages || slide.phases || slide.assumptions || slide.expansion || slide.objectives) && (
              <ul className="space-y-2">
                {(slide.points || slide.steps || slide.key_channels || slide.our_advantages || slide.phases || slide.assumptions || slide.expansion || slide.objectives || []).map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-white/70">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold"
                      style={{ background: SLIDE_COLORS[active] + '30', color: SLIDE_COLORS[active] }}>{i+1}</div>
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {/* Market */}
            {slide.tam && (
              <div className="grid grid-cols-3 gap-4">
                {[{ label:'TAM', value:slide.tam }, { label:'SAM', value:slide.sam }, { label:'SOM', value:slide.som }].map(m => (
                  <div key={m.label} className="text-center p-4 rounded-xl" style={{ background: SLIDE_COLORS[active]+'15' }}>
                    <div className="text-xs text-white/40 mb-1">{m.label}</div>
                    <div className="text-sm font-black text-white">{m.value?.replace(/.*?(\$.*)/,'$1')}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Financial projections */}
            {slide.projections && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                      {['Year','Revenue','Users','Profit'].map(h => (
                        <th key={h} className="text-left py-2 px-3 text-white/40 font-semibold text-xs">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {slide.projections.map((p, i) => (
                      <tr key={i} style={{ borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                        <td className="py-2 px-3 text-white font-semibold">{p.year}</td>
                        <td className="py-2 px-3 text-green-400">{p.revenue}</td>
                        <td className="py-2 px-3 text-blue-400">{p.users}</td>
                        <td className="py-2 px-3 text-purple-400">{p.profit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {slide.ask && (
              <div className="p-4 rounded-xl font-bold text-white text-center text-lg"
                style={{ background: SLIDE_COLORS[active]+'20', border:`1px solid ${SLIDE_COLORS[active]}40` }}>
                {slide.ask}
              </div>
            )}
          </div>

          {/* Speaker notes */}
          {slide.speaker_notes && (
            <div className="mt-6 p-4 rounded-xl" style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-xs text-white/30 mb-2">🎤 Speaker Notes</div>
              <p className="text-white/50 text-sm leading-relaxed">{slide.speaker_notes}</p>
            </div>
          )}
        </div>

        {/* Slide nav buttons */}
        <div className="px-8 pb-6 flex items-center justify-between">
          <button onClick={() => setActive(a => Math.max(0, a-1))} disabled={active===0}
            className="btn btn-ghost text-sm py-2 disabled:opacity-30">← Previous</button>
          <span className="text-xs text-white/30">{active+1} / {data.slides.length}</span>
          <button onClick={() => setActive(a => Math.min(data.slides.length-1, a+1))} disabled={active===data.slides.length-1}
            className="btn btn-primary text-sm py-2 disabled:opacity-30">Next →</button>
        </div>
      </div>
    </div>
  );
}
