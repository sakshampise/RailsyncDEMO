import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { ShadowBundleCard } from '../ShadowBundleCard';
import { MaintenanceTimeline } from '../MaintenanceTimeline';
import { CorridorMap } from '../CorridorMap';
import { Sparkles, Layers, TrendingUp, Clock, ShieldCheck } from 'lucide-react';

export const ShadowBundlingView: React.FC = () => {
  const { isBundled, triggerShadowBundling, bundledBlockInfo } = useSimulation();

  return (
    <div className="space-y-4 flex-1 select-none">
      {/* Header */}
      <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-base font-black text-white uppercase tracking-wide flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            AI Shadow Bundling & Spatial Synchronization
          </h1>
          <p className="text-xs text-slate-400">
            Automated clustering of compatible inter-departmental requests into unified track
            possessions.
          </p>
        </div>

        {!isBundled && (
          <button
            onClick={triggerShadowBundling}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase shadow-lg shadow-cyan-500/20 transition"
          >
            Execute AI Bundling (Step 2)
          </button>
        )}
      </div>

      {/* KPI Comparison Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Unbundled Line Closures</div>
          <div className="text-lg font-black text-rose-400 font-mono mt-1">390 minutes</div>
          <div className="text-[11px] text-slate-400 mt-1">3 separate possessions</div>
        </div>

        <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Bundled Coordinated Block</div>
          <div className="text-lg font-black text-cyan-400 font-mono mt-1">180 minutes</div>
          <div className="text-[11px] text-slate-400 mt-1">Single synchronized window</div>
        </div>

        <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Track Availability Saved</div>
          <div className="text-lg font-black text-emerald-400 font-mono mt-1">+210 minutes</div>
          <div className="text-[11px] text-emerald-400 font-bold mt-1">54% disruption reduction</div>
        </div>

        <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Departments Synced</div>
          <div className="text-lg font-black text-white font-mono mt-1">3 Departments</div>
          <div className="text-[11px] text-slate-400 mt-1">Civil + S&T + Electrical</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5 min-h-[380px]">
          <ShadowBundleCard />
        </div>
        <div className="lg:col-span-7 min-h-[380px]">
          <MaintenanceTimeline />
        </div>
      </div>
    </div>
  );
};
