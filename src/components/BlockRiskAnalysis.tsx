import React from 'react';
import { DemoStep } from '../types';
import { CloudRain, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

interface BlockRiskAnalysisProps {
  currentStep: DemoStep;
  weather: string;
}

export const BlockRiskAnalysis: React.FC<BlockRiskAnalysisProps> = ({ currentStep, weather }) => {
  const isConflict = currentStep === 'DISRUPTION_INJECTED';
  const isResolved = currentStep === 'AI_RESOLVED_REROUTE' || currentStep === 'AI_RESOLVED_SHIFT';

  const riskPercent = isConflict ? 82 : 18;
  const isHighRisk = riskPercent > 50;

  return (
    <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans">
          Block Risk Analysis
        </h2>
        <button className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold border border-slate-700">
          VIEW DETAILS
        </button>
      </div>

      {/* Grid Specs (Matching screenshot layout) */}
      <div className="grid grid-cols-2 gap-3 text-xs mb-3">
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-mono">Section</div>
          <div className="text-sm font-bold text-white font-mono">S2</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-mono">Block ID</div>
          <div className="text-sm font-bold text-white font-mono">B-02</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-mono">Duration</div>
          <div className="text-sm font-bold text-white font-mono">120 min</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-mono flex items-center gap-1">
            Weather
          </div>
          <div className="text-xs font-bold text-white flex items-center gap-1">
            <span>{weather || 'Heavy Rain'}</span>
            <CloudRain className="w-3.5 h-3.5 text-blue-400" />
          </div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-mono">Machinery Age</div>
          <div className="text-xs font-bold text-slate-200">8 years</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-mono">Crew Reliability</div>
          <div className="text-xs font-bold text-slate-200">72%</div>
        </div>
      </div>

      {/* OVERRUN RISK BAR (Matching exact red segmented bar indicator in screenshot) */}
      <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 my-1">
        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-sans font-bold">
            Overrun Risk
          </span>
          <span className={`text-base font-black ${isHighRisk ? 'text-rose-500' : 'text-emerald-400'}`}>
            {riskPercent}%
          </span>
        </div>

        {/* Segmented Bar Graph Meter */}
        <div className="flex items-center gap-1 my-2">
          {Array.from({ length: 12 }).map((_, i) => {
            const filled = (i + 1) * 8.33 <= riskPercent;
            return (
              <div
                key={i}
                className={`h-3 flex-1 rounded-sm transition-all duration-300 ${
                  filled
                    ? isHighRisk
                      ? 'bg-rose-500 glow-red'
                      : 'bg-emerald-400'
                    : 'bg-slate-800'
                }`}
              />
            );
          })}
        </div>

        <div className="flex justify-center mt-1">
          <span
            className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
              isHighRisk
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
            }`}
          >
            ★ {isHighRisk ? 'HIGH RISK' : 'LOW RISK'}
          </span>
        </div>
      </div>

      {/* AI Recommendation callout (Matching screenshot) */}
      <div className="mt-2 text-xs">
        <div className="text-[10px] text-slate-400 font-semibold mb-0.5">AI Recommendation</div>
        <div className={`text-xs font-semibold ${isHighRisk ? 'text-cyan-400' : 'text-emerald-400'}`}>
          {isHighRisk ? 'Add 30 min safety buffer / execute loop reroute' : 'Proceed with scheduled window B-02'}
        </div>
      </div>
    </div>
  );
};
