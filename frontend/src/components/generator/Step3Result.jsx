/** Step 3 — Brand Identity */
export default function Step3Result({ data }) {
  if (!data) return null;
  const { brand_personality, colors, typography, logo_concept, style_guide } = data;

  return (
    <div className="space-y-5">
      {/* Color palette */}
      <div className="card p-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><span>🎨</span> Brand Colors</h3>
        <div className="flex gap-3 flex-wrap mb-4">
          {colors && Object.entries(colors).map(([key, val]) => (
            <div key={key} className="text-center">
              <div className="w-14 h-14 rounded-xl shadow-lg mb-2 mx-auto"
                style={{ background: val.hex, boxShadow: `0 8px 24px ${val.hex}40` }} />
              <div className="text-xs font-mono text-white/60">{val.hex}</div>
              <div className="text-xs text-white/30 capitalize">{key}</div>
            </div>
          ))}
        </div>
        {/* Color meanings */}
        <div className="space-y-2">
          {colors && Object.entries(colors).map(([key, val]) => val.meaning ? (
            <div key={key} className="flex gap-3 items-center text-sm">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: val.hex }} />
              <span className="text-white/40 capitalize w-20">{key}</span>
              <span className="text-white/60">{val.meaning}</span>
            </div>
          ) : null)}
        </div>
      </div>

      {/* Typography + Personality */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="card p-5">
          <h3 className="font-bold text-white mb-3 text-sm flex items-center gap-2"><span>✍️</span> Typography</h3>
          {typography && (
            <div className="space-y-3">
              <div>
                <div className="text-xs text-white/40 mb-1">Heading Font</div>
                <div className="text-lg font-bold text-white">{typography.heading_font}</div>
              </div>
              <div>
                <div className="text-xs text-white/40 mb-1">Body Font</div>
                <div className="text-base text-white/70">{typography.body_font}</div>
              </div>
            </div>
          )}
        </div>

        <div className="card p-5">
          <h3 className="font-bold text-white mb-3 text-sm flex items-center gap-2"><span>✨</span> Brand Personality</h3>
          {brand_personality && (
            <div className="space-y-2">
              <div><span className="text-xs text-white/40">Archetype: </span><span className="text-white/80 text-sm">{brand_personality.archetype}</span></div>
              <div><span className="text-xs text-white/40">Tone: </span><span className="text-white/80 text-sm">{brand_personality.tone_of_voice}</span></div>
              <div><span className="text-xs text-white/40">Emotion: </span><span className="text-white/80 text-sm">{brand_personality.emotion}</span></div>
              <div className="flex flex-wrap gap-1 mt-2">
                {brand_personality.traits?.map(t => (
                  <span key={t} className="tag text-purple-300" style={{ background:'rgba(139,92,246,0.1)' }}>{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logo Concept */}
      {logo_concept && (
        <div className="card p-6">
          <h3 className="font-bold text-white mb-4 text-sm flex items-center gap-2"><span>🖼️</span> Logo Concept</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <div className="text-xs text-white/40 mb-1">Style</div>
              <div className="text-white/80 text-sm mb-3">{logo_concept.style}</div>
              <div className="text-xs text-white/40 mb-1">Symbol Concept</div>
              <div className="text-white/80 text-sm mb-3">{logo_concept.symbol}</div>
              <div className="text-xs text-white/40 mb-1">Description</div>
              <div className="text-white/60 text-sm">{logo_concept.description}</div>
            </div>
            <div>
              <div className="mb-3">
                <div className="text-xs text-green-400 font-bold mb-1">✓ Do</div>
                {logo_concept.do?.map((d,i) => <p key={i} className="text-xs text-white/60 mb-1">• {d}</p>)}
              </div>
              <div>
                <div className="text-xs text-red-400 font-bold mb-1">✗ Don't</div>
                {logo_concept.dont?.map((d,i) => <p key={i} className="text-xs text-white/60 mb-1">• {d}</p>)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Style Guide */}
      {style_guide && (
        <div className="card p-6">
          <h3 className="font-bold text-white mb-4 text-sm flex items-center gap-2"><span>📐</span> Style Guide</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(style_guide).map(([key, val]) => (
              <div key={key}>
                <div className="text-xs text-white/40 mb-1 capitalize">{key.replace(/_/g,' ')}</div>
                <div className="text-white/80 text-sm">{val}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
