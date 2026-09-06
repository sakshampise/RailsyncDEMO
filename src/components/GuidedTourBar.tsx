import React from 'react';
import { DemoStep } from '../types';
import { Layers, Zap, AlertTriangle, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface GuidedTourBarProps {
  currentStep: DemoStep;
  setStep: (step: DemoStep) => void;
}

export const GuidedTourBar: React.FC<GuidedTourBarProps> = ({ currentStep, setStep }) => {
  const steps: { id: DemoStep; label: string; number: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'UNOPTIMIZED_REQUESTS',
      number: '1',
      label: '1. Requests Arrive',
      icon: <Layers className="w-4 h-4" />,
      desc: 'Civil, S&T & Electrical work requests on Section S2',
    },
    {
      id: 'OPTIMIZED_BUNDLED',
      number: '2',
      label: '2. Shadow Bundling',
      icon: <Zap className="w-4 h-4 text-cyan-400" />,
      desc: 'AI bundles 3 departmental jobs into 1 single block (14:00-16:00)',
    },
    {
      id: 'DISRUPTION_INJECTED',
      number: '3',
      label: '3. Inject Delay',
      icon: <AlertTriangle className="w-4 h-4 text-rose-400" />,
      desc: 'Train 205 Express delayed 45m ➔ Overlaps with Block B-02!',
    },
    {
      id: 'AI_RESOLVED_REROUTE',
      number: '4',
      label: '4. AI Dynamic Reroute',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
      desc: 'Train T205 rerouted via Loop Line L2 ➔ Maintenance uninterrupted!',
    },
  ];

  const getCurrentStepIndex = () => {
    switch (currentStep) {
      case 'UNOPTIMIZED_REQUESTS': return 0;
      case 'OPTIMIZED_BUNDLED': return 1;
      case 'DISRUPTION_INJECTED': return 2;
      case 'AI_RESOLVED_REROUTE':
      case 'AI_RESOLVED_SHIFT': return 3;
      default: return 0;
    }
  };

  const currentIndex = getCurrentStepIndex();

  const handleNext = () => {
    if (currentIndex === 0) setStep('OPTIMIZED_BUNDLED');
    else if (currentIndex === 1) setStep('DISRUPTION_INJECTED');
    else if (currentIndex === 2) setStep('AI_RESOLVED_REROUTE');
    else setStep('UNOPTIMIZED_REQUESTS');
  };

  return (
    <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Step pills */}
        <div className="flex items-center gap-1.5 md:gap-3 overflow-x-auto w-full md:w-auto py-1 no-scrollbar">
          {steps.map((step, idx) => {
            const isActive = idx === currentIndex;
            const isPassed = idx < currentIndex;

            return (
              <button
                key={step.id}
                onClick={() => setStep(step.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-500/10 font-semibold scale-[1.02]'
                    : isPassed
                    ? 'bg-slate-800/80 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950'
                      : isPassed
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {step.number}
                </div>
                <span>{step.label}</span>
                {idx < steps.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-slate-600 ml-1 hidden lg:inline" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action description prompt & Next button */}
        <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto border-t md:border-t-0 border-slate-800 pt-2 md:pt-0">
          <p className="text-xs text-cyan-300/90 font-medium truncate max-w-md hidden xl:block">
            💡 {steps[currentIndex].desc}
          </p>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all transform active:scale-95 ml-auto"
          >
            <span>
              {currentIndex === 3 ? 'Replay Demo' : 'Advance Story Step'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
