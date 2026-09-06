import React from 'react';
import {
  Sparkles,
  Layers,
  Clock,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const ShadowBundleCard: React.FC = () => {
  const { isBundled, bundledBlockInfo, triggerShadowBundling, stepNumber } = useSimulation();

  return (
    <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans">
              AI Shadow Bundling Engine
            </h2>
            <p className="text-[10px] text-slate-400">
              Coordinated Multi-Department Corridor Window
            </p>
          </div>
        </div>

        <span
          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
            isBundled
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
              : 'bg-amber-950 text-amber-300 border border-amber-800'
          }`}
        >
          {isBundled ? 'BUNDLED & SCHEDULED' : 'PENDING CLUSTERING'}
        </span>
      </div>

      <div className="space-y-3 flex-1">
        {/* Comparison Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-mono">
              Unbundled Closures
            </div>
            <div className="text-sm font-black text-rose-400 font-mono mt-0.5">
              390 mins total
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              3 fragmented blocks disrupting train schedules
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/40">
            <div className="text-[10px] text-cyan-300 uppercase font-mono">
              With Shadow Bundle
            </div>
            <div className="text-sm font-black text-cyan-400 font-mono mt-0.5">
              180 mins single block
            </div>
            <div className="text-[10px] text-emerald-400 font-bold mt-1">
              +210 mins saved (54% gain)
            </div>
          </div>
        </div>

        {/* Coordinated Tasks in Section S2 */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">
            Synchronized Department Tasks (Section S2)
          </div>

          <div className="space-y-1">
            <div className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-slate-200 font-medium">Civil • Rail Joint Inspection</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">180 min (Lead)</span>
            </div>

            <div className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-slate-200 font-medium">S&T • Signal Cable Inspection</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">90 min (Shadow)</span>
            </div>

            <div className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-slate-200 font-medium">Electrical • OHE Cantilever</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">120 min (Shadow)</span>
            </div>
          </div>
        </div>

        {/* Assigned Coordinated Possession Window */}
        <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Possession Window:</span>
          </div>
          <span className="text-cyan-300 font-bold">14:00 – 16:00 (Block B-02)</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-slate-800 mt-2">
        {!isBundled ? (
          <button
            onClick={triggerShadowBundling}
            className="w-full py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            RUN SHADOW BUNDLING (STEP 2)
          </button>
        ) : (
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Optimal Bundle Active
            </span>
            <span className="text-cyan-300 font-bold">Saved 210 min</span>
          </div>
        )}
      </div>
    </div>
  );
};
