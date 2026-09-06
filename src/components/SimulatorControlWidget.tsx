import React, { useState } from 'react';
import { DemoStep } from '../types';
import { Sliders, AlertTriangle, Sparkles, CheckCircle2, CloudRain, Sun, ArrowRight } from 'lucide-react';

interface SimulatorControlWidgetProps {
  currentStep: DemoStep;
  onOptimize: () => void;
  onInjectDisruption: (delay: number, weather: string) => void;
  onResolveDisruption: (mode: 'REROUTE' | 'SHIFT') => void;
  weather: string;
  setWeather: (w: string) => void;
}

export const SimulatorControlWidget: React.FC<SimulatorControlWidgetProps> = ({
  currentStep,
  onOptimize,
  onInjectDisruption,
  onResolveDisruption,
  weather,
  setWeather,
}) => {
  const [delay, setDelay] = useState<number>(45);

  const isBundled = currentStep !== 'UNOPTIMIZED_REQUESTS';
  const isConflict = currentStep === 'DISRUPTION_INJECTED';
  const isResolved = currentStep === 'AI_RESOLVED_REROUTE' || currentStep === 'AI_RESOLVED_SHIFT';

  return (
    <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between h-full space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans">
            What-If & AI Control Panel
          </h2>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
          INTERACTIVE DEMO
        </span>
      </div>

      {/* Weather Selector */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
          Simulated Weather Condition
        </label>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {['Clear', 'Rain', 'Heavy Rain'].map((w) => (
            <button
              key={w}
              onClick={() => setWeather(w)}
              className={`py-1 px-2 rounded text-[11px] font-semibold border transition ${
                weather === w
                  ? 'bg-blue-600/30 text-cyan-300 border-cyan-500/50 font-bold'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Delay Slider */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-400">Train 205 Delay Injection:</span>
          <span className="text-amber-400 font-bold">+{delay} min</span>
        </div>
        <input
          type="range"
          min="0"
          max="90"
          step="15"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-amber-400 cursor-pointer"
        />
      </div>

      {/* Interactive Action Buttons */}
      <div className="space-y-2 pt-1">
        {!isBundled && (
          <button
            onClick={onOptimize}
            className="w-full py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            SHADOW BUNDLE REQUESTS
          </button>
        )}

        <button
          onClick={() => onInjectDisruption(delay, weather)}
          className={`w-full py-2 px-3 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition active:scale-95 ${
            isConflict
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 animate-pulse'
              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          {isConflict ? 'DISRUPTION INJECTED! (RE-TRIGGER)' : `INJECT +${delay} MIN DELAY ON T205`}
        </button>

        {(isConflict || isResolved) && (
          <button
            onClick={() => onResolveDisruption('REROUTE')}
            className="w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            AI REROUTE VIA LOOP LINE L2
          </button>
        )}
      </div>
    </div>
  );
};
