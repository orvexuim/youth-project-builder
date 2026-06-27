/** Step 6 — Website Copy */
export default function Step6Result({ data }) {
  if (!data) return null;
  return (
    <div className="space-y-5">
      {/* Hero */}
      <div className="card p-6" style={{ borderColor:'rgba(139,92,246,0.15)', background:'rgba(139,92,246,0.04)' }}>
        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><span>🌐</span> Hero Section</h3>
        <div className="text-3xl font-black text-white mb-2">{data.hero?.headline}</div>
        <div className="text-lg text-purple-300 mb-3">{data.hero?.subheadline}</div>
        <p className="text-white/60 text-sm mb-4">{data.hero?.body}</p>
        <div className="flex gap-3 flex-wrap">
          <button className="btn btn-primary text-sm py-2">{data.hero?.cta_primary}</button>
          <button className="btn btn-ghost text-sm py-2">{data.hero?.cta_secondary}</button>
        </div>
        {data.hero?.social_proof && <p className="text-xs text-white/30 mt-3">{data.hero.social_proof}</p>}
      </div>

      {/* Features */}
      <div className="card p-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><span>⚡</span> Features Section</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.features?.map((f, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background:'rgba(255,255,255,0.03)' }}>
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="font-bold text-white text-sm mb-1">{f.title}</div>
              <div className="text-white/50 text-xs leading-relaxed">{f.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      {data.about && (
        <div className="card p-6">
          <h3 className="font-bold text-white mb-3 flex items-center gap-2"><span>👥</span> About Section</h3>
          <div className="text-lg font-bold text-white mb-2">{data.about.title}</div>
          <p className="text-white/60 text-sm mb-4">{data.about.body}</p>
          <div className="flex gap-6 flex-wrap">
            {data.about.stats?.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-black text-purple-400">{s.value}</div>
                <div className="text-xs text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      {data.faq && (
        <div className="card p-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2"><span>❓</span> FAQ</h3>
          <div className="space-y-3">
            {data.faq.map((item, i) => (
              <div key={i} className="p-4 rounded-xl" style={{ background:'rgba(255,255,255,0.03)' }}>
                <div className="font-semibold text-white text-sm mb-1">{item.question}</div>
                <div className="text-white/50 text-xs leading-relaxed">{item.answer}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      {data.cta_section && (
        <div className="card p-8 text-center" style={{ borderColor:'rgba(139,92,246,0.2)' }}>
          <h2 className="text-2xl font-black text-white mb-2">{data.cta_section.headline}</h2>
          <p className="text-white/50 mb-5">{data.cta_section.subtext}</p>
          <button className="btn btn-primary px-8">{data.cta_section.button}</button>
        </div>
      )}

      {/* SEO */}
      {data.seo && (
        <div className="card p-5">
          <h3 className="font-bold text-white mb-3 text-sm flex items-center gap-2"><span>🔍</span> SEO Metadata</h3>
          <div className="space-y-2 text-sm">
            <div><span className="text-white/40">Title: </span><span className="text-white/80">{data.seo.meta_title}</span></div>
            <div><span className="text-white/40">Description: </span><span className="text-white/80">{data.seo.meta_description}</span></div>
            <div className="flex flex-wrap gap-1 mt-2">
              {data.seo.keywords?.map(k => (
                <span key={k} className="tag text-xs text-white/50" style={{ background:'rgba(255,255,255,0.04)' }}>{k}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
