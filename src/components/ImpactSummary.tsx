import React from 'react';
import { DemoStep } from '../types';
import { Award, ArrowRight, ShieldCheck, Zap, Layers, Clock, Sparkles } from 'lucide-react';

interface ImpactSummaryProps {
  currentStep: DemoStep;
  resetDemo: () => void;
}

export const ImpactSummary: React.FC<ImpactSummaryProps> = ({ currentStep, resetDemo }) => {
  const isBundled = currentStep !== 'UNOPTIMIZED_REQUESTS';
  const isResolved = currentStep === 'AI_RESOLVED_REROUTE' || currentStep === 'AI_RESOLVED_SHIFT';

  return (
    <div className="glass-panel rounded-xl p-4 border border-slate-800 bg-slate-900/60">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              RailSync AI Operational Impact Summary
            </h3>
            <p className="text-xs text-slate-400">
              Quantified efficiency gains across Nagpur-Durg corridor simulation
            </p>
          </div>
        </div>

        {/* Before / After KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
          {/* Traffic Blocks */}
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-center font-mono">
            <div className="text-[10px] text-slate-400 uppercase font-sans">Traffic Blocks</div>
            <div className="text-sm font-black text-white mt-0.5 flex items-center justify-center gap-1">
              <span className="text-amber-400">3</span>
              <ArrowRight className="w-3 h-3 text-slate-600" />
              <span className="text-emerald-400 text-base">{isBundled ? '1' : '3'}</span>
            </div>
            <div className="text-[9px] text-emerald-400 font-sans font-semibold mt-0.5">
              {isBundled ? '-66% Track Closures' : 'Unbundled'}
            </div>
          </div>

          {/* Unresolved Conflicts */}
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-center font-mono">
            <div className="text-[10px] text-slate-400 uppercase font-sans">Train Conflicts</div>
            <div className="text-sm font-black text-white mt-0.5 flex items-center justify-center gap-1">
              <span className="text-rose-400">4</span>
              <ArrowRight className="w-3 h-3 text-slate-600" />
              <span className="text-emerald-400 text-base">{isResolved ? '0' : isBundled ? '0' : '4'}</span>
            </div>
            <div className="text-[9px] text-emerald-400 font-sans font-semibold mt-0.5">
              {isResolved ? '100% Resolved' : 'Dynamic AI Protection'}
            </div>
          </div>

          {/* Downtime Saved */}
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-center font-mono">
            <div className="text-[10px] text-slate-400 uppercase font-sans">Downtime Saved</div>
            <div className="text-base font-black text-cyan-400 mt-0.5">
              {isBundled ? '135 min' : '0 min'}
            </div>
            <div className="text-[9px] text-cyan-300 font-sans font-semibold mt-0.5">
              Co-located Window
            </div>
          </div>

          {/* Maintenance Delivered */}
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-center font-mono">
            <div className="text-[10px] text-slate-400 uppercase font-sans">Jobs Completed</div>
            <div className="text-base font-black text-emerald-400 mt-0.5">
              5 / 5
            </div>
            <div className="text-[9px] text-emerald-400 font-sans font-semibold mt-0.5">
              100% Departmental Sync
            </div>
          </div>
        </div>

        {/* Demo Punchline quote */}
        <div className="hidden xl:block max-w-xs text-right border-l border-slate-800 pl-4">
          <p className="text-xs text-cyan-300 italic font-medium">
            "RailSync doesn't just schedule maintenance. It adapts the schedule when the railway changes."
          </p>
        </div>
      </div>
    </div>
  );
};
