/** Step 5 — Marketing Content */
import { useState } from 'react';

export default function Step5Result({ data }) {
  if (!data) return null;
  const [copied, setCopied] = useState('');
  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Social Bios */}
      <div className="card p-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><span>📱</span> Social Media Bios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key:'instagram_bio', icon:'📸', label:'Instagram', color:'#E1306C' },
            { key:'tiktok_bio',    icon:'🎵', label:'TikTok',    color:'#69C9D0' },
            { key:'facebook_description', icon:'👥', label:'Facebook', color:'#1877F2' },
            { key:'linkedin_description', icon:'💼', label:'LinkedIn',  color:'#0A66C2' },
          ].map(s => (
            <div key={s.key} className="p-4 rounded-xl relative" style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span>{s.icon}</span>
                <span className="text-xs font-bold" style={{ color:s.color }}>{s.label}</span>
                <button onClick={() => copy(data[s.key], s.key)} className="ml-auto text-xs text-white/30 hover:text-white/70 transition-colors">
                  {copied === s.key ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{data[s.key]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content Ideas */}
      <div className="card p-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><span>💡</span> 20 Content Ideas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.content_ideas?.map(item => (
            <div key={item.id} className="p-3 rounded-xl flex gap-3" style={{ background:'rgba(255,255,255,0.03)' }}>
              <div className="step-badge flex-shrink-0 text-xs">{item.id}</div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="tag text-xs text-blue-300" style={{ background:'rgba(59,130,246,0.1)' }}>{item.type}</span>
                  <span className="tag text-xs text-white/30" style={{ background:'rgba(255,255,255,0.04)' }}>{item.platform}</span>
                </div>
                <div className="text-white/80 text-sm font-medium">{item.title}</div>
                <div className="text-white/40 text-xs mt-0.5">Hook: {item.hook}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Captions */}
      <div className="card p-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><span>✍️</span> 10 Instagram Captions</h3>
        <div className="space-y-3">
          {data.instagram_captions?.map(cap => (
            <div key={cap.id} className="p-4 rounded-xl relative group" style={{ background:'rgba(255,255,255,0.03)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="step-badge text-xs">{cap.id}</span>
                <span className="tag text-xs text-pink-300" style={{ background:'rgba(236,72,153,0.1)' }}>{cap.mood}</span>
                <button onClick={() => copy(cap.caption, `cap${cap.id}`)} className="ml-auto text-xs text-white/30 hover:text-white/70 opacity-0 group-hover:opacity-100 transition-all">
                  {copied === `cap${cap.id}` ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-white/70 text-sm">{cap.caption}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hashtags */}
      {data.hashtags && (
        <div className="card p-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2"><span>#</span> Hashtag Strategy</h3>
          <div className="space-y-3">
            {Object.entries(data.hashtags).map(([type, tags]) => (
              <div key={type}>
                <div className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-2 capitalize">{type}</div>
                <div className="flex flex-wrap gap-2">
                  {tags.map(t => (
                    <span key={t} onClick={() => copy(t, t)}
                      className="tag cursor-pointer text-purple-300 hover:text-purple-200 transition-colors"
                      style={{ background:'rgba(139,92,246,0.1)' }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Email Template */}
      {data.email_template && (
        <div className="card p-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2"><span>📧</span> Email Template</h3>
          <div className="space-y-3">
            <div><span className="text-xs text-white/40">Subject:</span> <span className="text-white/80 text-sm ml-2">{data.email_template.subject}</span></div>
            <div><span className="text-xs text-white/40">Preview:</span> <span className="text-white/60 text-sm ml-2 italic">{data.email_template.preview}</span></div>
            <div className="p-4 rounded-xl text-sm text-white/60 leading-relaxed whitespace-pre-line"
              style={{ background:'rgba(255,255,255,0.03)' }}>{data.email_template.body}</div>
          </div>
        </div>
      )}
    </div>
  );
}
