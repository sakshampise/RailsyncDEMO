import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { BarChart3, TrendingUp, ShieldCheck, Users, Sparkles, CheckCircle2, Download } from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { isBundled, isContributorActive, isDisruptionActive } = useSimulation();

  return (
    <div className="space-y-4 flex-1 select-none">
      {/* Header */}
      <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-base font-black text-white uppercase tracking-wide flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            Executive Reports & Optimization Impact Summary
          </h1>
          <p className="text-xs text-slate-400">
            Comprehensive audit metrics for Smart India Hackathon evaluation.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition">
          <Download className="w-3.5 h-3.5" />
          Export Report (PDF)
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Track Downtime Avoided</div>
          <div className="text-2xl font-black text-emerald-400 font-mono">210 mins</div>
          <div className="text-[10px] text-emerald-400 font-medium">54% Corridor Downtime Reduction</div>
        </div>

        <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Work Progress Preserved</div>
          <div className="text-2xl font-black text-cyan-400 font-mono">100%</div>
          <div className="text-[10px] text-cyan-300 font-medium">Zero Scrap or Redo Work</div>
        </div>

        <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Corridor Handback On-Time</div>
          <div className="text-2xl font-black text-white font-mono">100%</div>
          <div className="text-[10px] text-slate-400 font-medium">0 Overruns Across All Possessions</div>
        </div>

        <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Crew Utilization Synergy</div>
          <div className="text-2xl font-black text-cyan-400 font-mono">+30%</div>
          <div className="text-[10px] text-cyan-300 font-medium">Inter-Department Cross-Skilling</div>
        </div>
      </div>

      {/* Evaluation Summary Report Table */}
      <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 space-y-3">
        <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans">
          SIH Prototype Key Value Propositions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="font-bold text-cyan-400 flex items-center gap-1.5 font-mono uppercase">
              <Sparkles className="w-4 h-4" />
              1. Shadow Bundling (Clustering)
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Consolidates Civil, S&T, and Electrical works occurring on the same track section into
              one coordinated possession. Eliminates repeated speed restrictions and fragmented
              corridor closures.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="font-bold text-amber-400 flex items-center gap-1.5 font-mono uppercase">
              <Users className="w-4 h-4" />
              2. Dynamic Contributor Mode
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              When a critical task lags behind, nearby crews with buffer bandwidth assist. Work on
              Task A jumps from 50% to 80% without extending the block, while Task B state is
              checkpointed safely at 60%.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5 font-mono uppercase">
              <ShieldCheck className="w-4 h-4" />
              3. Safe Pause & Early Handback
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              When disruption forces early corridor release, work is marked "PAUSED FOR NOW" with
              80% progress preserved. The remaining 20% is scheduled for the Next Available Slot
              with zero safety compromises.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="font-bold text-blue-400 flex items-center gap-1.5 font-mono uppercase">
              <CheckCircle2 className="w-4 h-4" />
              4. Complete Audit Trail & State Continuity
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              All 4 stages run on a unified, continuous simulation model. The same task seamlessly
              travels from intake to bundling, worker assistance, and safe pause.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
