import React, { useState } from 'react';
import { DemoStep } from '../types';
import { Sliders, AlertTriangle, CloudRain, Sun, Zap, CheckCircle2, ArrowRight, ShieldAlert, RefreshCw } from 'lucide-react';

interface WhatIfSimulatorProps {
  currentStep: DemoStep;
  onInjectDisruption: (delay: number, weather: string) => void;
  onResolveDisruption: (mode: 'REROUTE' | 'SHIFT') => void;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  currentStep,
  onInjectDisruption,
  onResolveDisruption,
}) => {
  const [delayMinutes, setDelayMinutes] = useState<number>(45);
  const [weather, setWeather] = useState<string>('Clear');

  const isConflict = currentStep === 'DISRUPTION_INJECTED';
  const isResolved = currentStep === 'AI_RESOLVED_REROUTE' || currentStep === 'AI_RESOLVED_SHIFT';

  return (
    <div className="glass-panel rounded-xl p-4 border border-slate-800 flex flex-col h-full space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-amber-400" />
          <h2 className="text-sm font-bold tracking-wide text-white uppercase">
            What-If Disruption Simulator
          </h2>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800">
          STOCHASTIC ENGINE
        </span>
      </div>

      {/* DISRUPTION INJECTION CONTROLS */}
      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 space-y-3">
        {/* Train delay slider */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span className="text-slate-300">Train 205 Delay Injection:</span>
            <span className="font-mono font-bold text-amber-400">+{delayMinutes} min</span>
          </div>
          <input
            type="range"
            min="0"
            max="120"
            step="15"
            value={delayMinutes}
            onChange={(e) => setDelayMinutes(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>0m (On Time)</span>
            <span>45m (Primary Scenario)</span>
            <span>120m</span>
          </div>
        </div>

        {/* Weather selector */}
        <div>
          <span className="text-xs font-semibold text-slate-300 block mb-1.5">
            Weather Conditions:
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'Clear', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
              { id: 'Rain', icon: <CloudRain className="w-3.5 h-3.5 text-blue-400" /> },
              { id: 'Heavy Rain', icon: <CloudRain className="w-3.5 h-3.5 text-indigo-400" /> },
            ].map((w) => (
              <button
                key={w.id}
                onClick={() => setWeather(w.id)}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium border transition ${
                  weather === w.id
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold'
                    : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                {w.icon}
                <span>{w.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Inject disruption trigger button */}
        <button
          onClick={() => onInjectDisruption(delayMinutes, weather)}
          className={`w-full py-2.5 px-3 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition active:scale-95 shadow-lg ${
            isConflict
              ? 'bg-rose-600 hover:bg-rose-500 text-white glow-red animate-pulse'
              : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 shadow-amber-500/20'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          {isConflict ? 'DISRUPTION INJECTED (CLICK TO RE-TEST)' : `INJECT +${delayMinutes} MIN DELAY ON TRAIN 205`}
        </button>
      </div>

      {/* DYNAMIC AI RESPONSE ACTIONS (Visible when disruption is active or resolved) */}
      {(isConflict || isResolved) && (
        <div className="p-3.5 rounded-xl bg-slate-900/90 border-2 border-cyan-500/60 glow-cyan space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wide flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400 animate-bounce" />
              AI Rescheduling Action
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-bold">
              SOLVER ACTIVE
            </span>
          </div>

          <p className="text-[11px] text-slate-300">
            Train 205 delay conflicts with Section S2 Block B-02. Select dynamic AI resolution strategy:
          </p>

          <div className="space-y-2 pt-1">
            {/* Option 1: Reroute Train T205 via Loop Line L2 */}
            <button
              onClick={() => onResolveDisruption('REROUTE')}
              className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start justify-between ${
                currentStep === 'AI_RESOLVED_REROUTE'
                  ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 glow-emerald'
                  : 'bg-slate-800/80 border-cyan-500/40 hover:bg-slate-800 text-slate-200'
              }`}
            >
              <div>
                <div className="text-xs font-extrabold flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950 text-[10px]">
                    RECOMMENDED
                  </span>
                  <span>Option 1: Reroute T205 via Loop Track L2</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">
                  ✓ Maintenance B-02 continues uninterrupted (14:00 - 16:00)
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
            </button>

            {/* Option 2: Shift Maintenance Block B-02 */}
            <button
              onClick={() => onResolveDisruption('SHIFT')}
              className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start justify-between ${
                currentStep === 'AI_RESOLVED_SHIFT'
                  ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 glow-emerald'
                  : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div>
                <div className="text-xs font-bold">
                  Option 2: Shift Block B-02 Window
                </div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">
                  Shift maintenance window forward to 16:15 – 18:15 (+25m impact)
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 shrink-0 mt-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
