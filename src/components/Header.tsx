import React from 'react';
import { Train, ShieldCheck, AlertTriangle, RefreshCw, Play, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { DemoStep } from '../types';

interface HeaderProps {
  currentStep: DemoStep;
  setStep: (step: DemoStep) => void;
  resetDemo: () => void;
  isAutoPlay: boolean;
  toggleAutoPlay: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  setStep,
  resetDemo,
  isAutoPlay,
  toggleAutoPlay,
}) => {
  const getStatusBadge = () => {
    switch (currentStep) {
      case 'UNOPTIMIZED_REQUESTS':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            STATUS: UNOPTIMIZED REQUEST POOL (3 BLOCKS NEEDED)
          </div>
        );
      case 'OPTIMIZED_BUNDLED':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold glow-emerald">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            STATUS: SHADOW BUNDLE ACTIVE (B-02: 3 DEPTS IN 1 WINDOW)
          </div>
        );
      case 'DISRUPTION_INJECTED':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/50 text-xs font-semibold glow-red">
            <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />
            CRITICAL: TRAIN 205 DELAY CONFLICT (+45m AT S2)
          </div>
        );
      case 'AI_RESOLVED_REROUTE':
      case 'AI_RESOLVED_SHIFT':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold glow-cyan">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            RESOLVED: AI REROUTED VIA LOOP TRACK L2 (0 TRAIN DELAY)
          </div>
        );
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 px-4 lg:px-6 py-3">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Brand & Corridor info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/30">
            <Train className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                RailSync <span className="text-cyan-400 font-extrabold">AI</span>
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                PROTOTYPE SIMULATOR
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>Corridor: SECR Zone-1 (Nagpur ➔ Durg Main Line)</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300 font-mono">130 km Corridor</span>
            </p>
          </div>
        </div>

        {/* Dynamic Status pill */}
        <div className="hidden md:flex items-center justify-center">
          {getStatusBadge()}
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={toggleAutoPlay}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isAutoPlay
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold animate-pulse'
                : 'bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 border border-cyan-500/30'
            }`}
          >
            {isAutoPlay ? (
              <>
                <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                Auto-Playing Story...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-cyan-300" />
                Auto-Play 2-Min Judge Demo
              </>
            )}
          </button>

          <button
            onClick={resetDemo}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition"
            title="Reset simulation to initial state"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>
    </header>
  );
};
