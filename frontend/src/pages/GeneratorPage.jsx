import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../lib/api';

// Step-specific result renderers
import Step2Result from '../components/generator/Step2Result';
import Step3Result from '../components/generator/Step3Result';
import Step4Result from '../components/generator/Step4Result';
import Step5Result from '../components/generator/Step5Result';
import Step6Result from '../components/generator/Step6Result';
import Step7Result from '../components/generator/Step7Result';
import Step8Result from '../components/generator/Step8Result';

const STEPS_META = [
  { n:1, icon:'💡', title:'Your Idea',          field:null },
  { n:2, icon:'🔍', title:'Business Analysis',  field:'business_analysis' },
  { n:3, icon:'🎨', title:'Brand Identity',     field:'brand_identity' },
  { n:4, icon:'📋', title:'Business Plan',      field:'business_plan' },
  { n:5, icon:'📱', title:'Marketing Content',  field:'marketing_content' },
  { n:6, icon:'🌐', title:'Website Copy',       field:'website_copy' },
  { n:7, icon:'📊', title:'Pitch Deck',         field:'pitch_deck' },
  { n:8, icon:'🗺️', title:'Action Roadmap',     field:'action_roadmap' },
];

const RESULT_COMPONENTS = {
  2: Step2Result, 3: Step3Result, 4: Step4Result,
  5: Step5Result, 6: Step6Result, 7: Step7Result, 8: Step8Result,
};

export default function GeneratorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [loadingProject, setLoadingProject] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    try {
      const p = await api.getProject(id);
      setProject(p);
      // Go to the furthest step with data
      const stepWithData = STEPS_META
        .filter(s => s.field && p[s.field])
        .map(s => s.n);
      if (stepWithData.length > 0) {
        setActiveStep(Math.max(...stepWithData));
      }
    } catch(e) { navigate('/dashboard'); }
    finally { setLoadingProject(false); }
  };

  const handleGenerate = async (step) => {
    setGenerating(true);
    setError('');
    try {
      const res = await api.generateStep(step, id);
      // Refresh project
      const p = await api.getProject(id);
      setProject(p);
      setActiveStep(step);
    } catch(e) {
      setError(e.message);
    } finally {
      setGenerating(false);
    }
  };

  const getStepData = (step) => {
    if (!project) return null;
    const meta = STEPS_META.find(s => s.n === step);
    if (!meta?.field) return null;
    return project[meta.field];
  };

  const isStepDone = (step) => !!getStepData(step);
  const isStepLocked = (step) => step > 2 && !isStepDone(step - 1);

  if (loadingProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-white/30 text-sm">Loading your project...</p>
        </div>
      </div>
    );
  }

  const ResultComponent = RESULT_COMPONENTS[activeStep];
  const stepData = getStepData(activeStep);

  return (
    <div className="min-h-screen pt-16 flex">
      {/* Sidebar — Step Navigator */}
      <aside className="w-64 flex-shrink-0 flex flex-col py-8 px-4"
        style={{ borderRight: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="mb-6 px-2">
          <h2 className="text-sm font-bold text-white truncate">{project?.title}</h2>
          <p className="text-xs text-white/30 truncate mt-0.5">{project?.idea}</p>
          {/* Overall progress */}
          <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full progress-bar transition-all"
              style={{ width: `${(STEPS_META.filter(s => s.field && isStepDone(s.n)).length / 7) * 100}%` }} />
          </div>
        </div>

        <div className="space-y-1">
          {STEPS_META.map(step => {
            const done = step.n === 1 ? true : isStepDone(step.n);
            const locked = isStepLocked(step.n);
            const active = activeStep === step.n;

            return (
              <button key={step.n}
                onClick={() => !locked && setActiveStep(step.n)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all text-sm ${
                  active ? 'bg-purple-500/15 text-white' :
                  done && !locked ? 'text-white/70 hover:bg-white/[0.04] hover:text-white' :
                  'text-white/25 cursor-not-allowed'
                }`}
              >
                <div className={`step-badge flex-shrink-0 text-xs ${
                  done && !active ? '!bg-green-500/80' :
                  active ? '' : '!bg-white/10'
                }`}>
                  {done && !active ? '✓' : step.n}
                </div>
                <span className="text-xs font-medium truncate">{step.title}</span>
                {locked && <span className="ml-auto text-xs">🔒</span>}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-10">
          {/* Step header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="step-badge text-base">{activeStep}</div>
              <div>
                <h1 className="text-2xl font-black text-white">
                  {STEPS_META[activeStep - 1].icon} {STEPS_META[activeStep - 1].title}
                </h1>
                {isStepDone(activeStep) && (
                  <span className="text-xs text-green-400">✓ Generated</span>
                )}
              </div>
            </div>
            {activeStep > 1 && (
              <button
                onClick={() => handleGenerate(activeStep)}
                disabled={generating || isStepLocked(activeStep)}
                className="btn btn-primary disabled:opacity-50"
              >
                {generating ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    Generating...
                  </span>
                ) : isStepDone(activeStep) ? '🔄 Regenerate' : '⚡ Generate'}
              </button>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl text-red-400 text-sm"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
              {error}
            </div>
          )}

          {/* Step 1 — Just show the idea */}
          {activeStep === 1 && (
            <div className="card p-8 text-center">
              <div className="text-5xl mb-4">💡</div>
              <h2 className="text-xl font-bold text-white mb-3">Your Startup Idea</h2>
              <p className="text-white/60 text-lg italic mb-8">"{project?.idea}"</p>
              <button onClick={() => { setActiveStep(2); handleGenerate(2); }}
                className="btn btn-primary px-10 py-4 text-base">
                ⚡ Start AI Analysis →
              </button>
              <p className="text-xs text-white/20 mt-4">GPT-4o will analyze your idea and generate a complete business profile</p>
            </div>
          )}

          {/* Generating overlay */}
          {generating && (
            <div className="card p-12 text-center">
              <div className="relative w-16 h-16 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-pulse" />
                <div className="absolute inset-1 rounded-full border-2 border-t-purple-500 border-purple-500/20 animate-spin" />
                <div className="absolute inset-3 rounded-full border-2 border-t-blue-400 border-blue-400/20 animate-spin"
                  style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI is working its magic...</h3>
              <p className="text-white/40 text-sm">Generating {STEPS_META[activeStep-1].title} with GPT-4o</p>
            </div>
          )}

          {/* Result display */}
          {!generating && activeStep > 1 && stepData && ResultComponent && (
            <AnimatePresence>
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
                <ResultComponent data={stepData} project={project} />
                {/* Next step button */}
                {activeStep < 8 && (
                  <div className="mt-8 flex items-center justify-between p-6 card"
                    style={{ borderColor: 'rgba(139,92,246,0.15)' }}>
                    <div>
                      <div className="text-sm font-bold text-white">Next: {STEPS_META[activeStep].title}</div>
                      <div className="text-xs text-white/30">{STEPS_META[activeStep].icon} Step {activeStep + 1} of 8</div>
                    </div>
                    <button onClick={() => handleGenerate(activeStep + 1)}
                      className="btn btn-primary">
                      Generate {STEPS_META[activeStep].title} →
                    </button>
                  </div>
                )}
                {activeStep === 8 && (
                  <div className="mt-8 text-center card p-10"
                    style={{ borderColor: 'rgba(16,185,129,0.2)', boxShadow: '0 0 40px rgba(16,185,129,0.05)' }}>
                    <div className="text-4xl mb-4">🎉</div>
                    <h2 className="text-2xl font-black text-white mb-2">Your startup is ready!</h2>
                    <p className="text-white/40 mb-6">All 8 steps complete. You have everything you need to launch.</p>
                    <button onClick={() => navigate('/dashboard')} className="btn btn-primary px-8 py-3">
                      Back to Dashboard
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Not yet generated */}
          {!generating && activeStep > 1 && !stepData && !isStepLocked(activeStep) && (
            <div className="card p-12 text-center">
              <div className="text-4xl mb-4">{STEPS_META[activeStep-1].icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">Ready to generate</h3>
              <p className="text-white/40 text-sm mb-6">Click the button above to generate your {STEPS_META[activeStep-1].title}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
