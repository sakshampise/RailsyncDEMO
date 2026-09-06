import React, { useState, useEffect } from 'react';
import { DemoStep } from '../types';
import { Radio, Wrench, AlertTriangle, TrendingUp, Clock, Play, RefreshCw, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface TopKPIHeaderProps {
  currentStep: DemoStep;
  setStep: (step: DemoStep) => void;
  resetDemo: () => void;
  isAutoPlay: boolean;
  toggleAutoPlay: () => void;
  onOptimize: () => void;
  onInjectDisruption: () => void;
  onResolveDisruption: () => void;
}

export const TopKPIHeader: React.FC<TopKPIHeaderProps> = ({
  currentStep,
  setStep,
  resetDemo,
  isAutoPlay,
  toggleAutoPlay,
  onOptimize,
  onInjectDisruption,
  onResolveDisruption,
}) => {
  const [timeStr, setTimeStr] = useState<string>('10:42:18');

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setTimeStr(d.toTimeString().split(' ')[0]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isConflict = currentStep === 'DISRUPTION_INJECTED';
  const isResolved = currentStep === 'AI_RESOLVED_REROUTE' || currentStep === 'AI_RESOLVED_SHIFT';

  return (
    <div className="space-y-2">
      {/* Primary KPI Header bar (Matching image top header) */}
      <div className="bg-dashboard-card rounded-xl p-3 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* KPI Metrics List */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
          {/* Network Status */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Network Status
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className={`text-sm font-black ${
                  isConflict ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {isConflict ? 'Conflict' : 'Stable'}
              </span>
              <svg className="w-8 h-4 overflow-visible" viewBox="0 0 40 16">
                <path
                  d="M 0 8 L 10 8 L 15 2 L 20 14 L 25 5 L 30 8 L 40 8"
                  fill="none"
                  stroke={isConflict ? '#ef4444' : '#10b981'}
                  strokeWidth="2"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800" />

          {/* Active Trains */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Active Trains
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-base font-black text-white">12</span>
              <Radio className="w-4 h-4 text-cyan-400" />
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800" />

          {/* Maintenance Blocks */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Maintenance Blocks
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-base font-black text-white">3</span>
              <Wrench className="w-4 h-4 text-cyan-400" />
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800" />

          {/* Conflicts */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Conflicts
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className={`text-base font-black ${
                  isConflict ? 'text-rose-400 animate-bounce' : 'text-slate-300'
                }`}
              >
                {isConflict ? '1' : '0'}
              </span>
              <AlertTriangle
                className={`w-4 h-4 ${
                  isConflict ? 'text-rose-400 animate-pulse' : 'text-slate-500'
                }`}
              />
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800" />

          {/* Efficiency Gain */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Efficiency Gain
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-base font-black text-emerald-400">+23%</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Right Info & Live Simulator Control */}
        <div className="flex items-center gap-3">
          <div className="text-right font-mono hidden sm:block">
            <div className="text-xs font-bold text-white">{timeStr}</div>
            <div className="text-[10px] text-slate-400">24 May 2024</div>
          </div>

          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            SIMULATION LIVE
          </div>
        </div>
      </div>

      {/* Demo Action Bar for Judge (Step-by-Step Flow Controls) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-2.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
          <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider shrink-0">
            DEMO STEPS:
          </span>
          <button
            onClick={() => setStep('UNOPTIMIZED_REQUESTS')}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
              currentStep === 'UNOPTIMIZED_REQUESTS'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            1. Requests Arrive
          </button>

          <button
            onClick={onOptimize}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition flex items-center gap-1 ${
              currentStep === 'OPTIMIZED_BUNDLED'
                ? 'bg-cyan-500 text-slate-950 shadow glow-cyan'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            2. Shadow Bundle
          </button>

          <button
            onClick={onInjectDisruption}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition flex items-center gap-1 ${
              isConflict
                ? 'bg-rose-600 text-white shadow glow-red animate-pulse'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            3. Delay Train (+45m)
          </button>

          <button
            onClick={onResolveDisruption}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition flex items-center gap-1 ${
              isResolved
                ? 'bg-emerald-500 text-slate-950 shadow glow-emerald'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            4. AI Reroute
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={toggleAutoPlay}
            className={`px-3 py-1 rounded text-xs font-bold transition flex items-center gap-1.5 ${
              isAutoPlay
                ? 'bg-amber-400 text-slate-950 animate-pulse'
                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
            }`}
          >
            <Play className="w-3 h-3 fill-current" />
            {isAutoPlay ? 'Auto-Playing...' : 'Auto-Play Judge Tour'}
          </button>

          <button
            onClick={resetDemo}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            title="Reset"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
