import React from 'react';
import { DemoStep } from '../types';
import { Cpu, CheckCircle2, ShieldAlert, AlertTriangle, TrendingUp, Sparkles, Activity, Layers } from 'lucide-react';

interface AIDecisionPanelProps {
  currentStep: DemoStep;
  rerouteMode: 'REROUTE' | 'SHIFT';
}

export const AIDecisionPanel: React.FC<AIDecisionPanelProps> = ({ currentStep, rerouteMode }) => {
  const isBundled = currentStep !== 'UNOPTIMIZED_REQUESTS';
  const isConflict = currentStep === 'DISRUPTION_INJECTED';
  const isResolved = currentStep === 'AI_RESOLVED_REROUTE' || currentStep === 'AI_RESOLVED_SHIFT';

  // Predictive overrun risk score calculation based on current state
  const overrunRisk = isConflict ? 82 : isBundled ? 18 : 64;

  return (
    <div className="glass-panel rounded-xl p-4 border border-slate-800 flex flex-col h-full space-y-3">
      {/* AI Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
          <h2 className="text-sm font-bold tracking-wide text-white uppercase">
            AI Optimization Engine
          </h2>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
          CP-SAT SOLVER V2
        </span>
      </div>

      {/* AI RECOMMENDATION CARD */}
      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/70 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            AI Window Recommendation
          </span>
          <span className="text-xs font-mono font-bold text-cyan-400">
            {isBundled ? (isResolved && rerouteMode === 'SHIFT' ? '16:15 – 18:15' : '14:00 – 16:00') : 'Pending Optimization'}
          </span>
        </div>

        {/* Reason breakdown */}
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Low congestion corridor window</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>3 departmental jobs bundled (Civil + S&T + Elec)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Track utilization efficiency maxed</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            {isConflict ? (
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 animate-bounce" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            )}
            <span className={isConflict ? "text-rose-300 font-bold" : "text-slate-300"}>
              {isConflict ? "High-priority conflict detected (T205 Express)" : "Zero high-priority train conflicts"}
            </span>
          </div>
        </div>

        {/* Shadow bundling metric highlight */}
        <div className="mt-3 p-2 rounded bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300">Shadow Bundle Result:</span>
          <span className="text-cyan-300 font-bold">3 Jobs ➔ 1 Traffic Block</span>
        </div>
      </div>

      {/* PREDICTIVE BLOCK OVERRUN RISK MODEL */}
      <div className={`p-3.5 rounded-xl border transition-all ${
        isConflict
          ? 'bg-rose-950/50 border-rose-500/60 glow-red'
          : 'bg-slate-900/80 border-slate-700/70'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className={`w-4 h-4 ${isConflict ? 'text-rose-400' : 'text-cyan-400'}`} />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Predictive Block Overrun Risk
            </span>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
            isConflict
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
          }`}>
            {isConflict ? 'CRITICAL RISK' : 'LOW RISK'}
          </span>
        </div>

        {/* Risk progress bar */}
        <div className="my-2">
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-slate-400">Overrun Probability:</span>
            <span className={`font-bold ${isConflict ? 'text-rose-400' : 'text-emerald-400'}`}>
              {overrunRisk}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isConflict ? 'bg-rose-500 glow-red' : 'bg-emerald-400'
              }`}
              style={{ width: `${overrunRisk}%` }}
            />
          </div>
        </div>

        {/* AI Recommendation action text */}
        <div className="text-[11px] text-slate-300 mt-2 bg-slate-950/60 p-2 rounded border border-slate-800">
          <span className="font-bold text-slate-400">AI Action Directive: </span>
          {isConflict ? (
            <span className="text-rose-300 font-semibold">
              Execute immediate loop reroute for T205 Express to avoid 120m corridor delay.
            </span>
          ) : isResolved ? (
            <span className="text-emerald-300 font-semibold">
              Optimal schedule active. Risk within tolerance limit (18%).
            </span>
          ) : (
            <span className="text-cyan-300 font-semibold">
              Proceed with planned window B-02 (14:00 - 16:00).
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
