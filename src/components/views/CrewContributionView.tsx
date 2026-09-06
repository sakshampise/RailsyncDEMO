import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { CrewContributionPanel } from '../CrewContributionPanel';
import { MaintenanceTimeline } from '../MaintenanceTimeline';
import { Users, Zap, BookmarkCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CrewContributionView: React.FC = () => {
  const { crewContribution, stepNumber, triggerContributorMode } = useSimulation();

  return (
    <div className="space-y-4 flex-1 select-none">
      {/* Header */}
      <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-base font-black text-white uppercase tracking-wide flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            Inter-Departmental Crew Contribution & Dynamic Labor Sync
          </h1>
          <p className="text-xs text-slate-400">
            Intelligent worker redeployment during maintenance blocks to prevent overruns.
          </p>
        </div>

        {stepNumber < 3 && (
          <button
            onClick={triggerContributorMode}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase shadow-lg shadow-cyan-500/20 transition"
          >
            Activate Contributor Mode
          </button>
        )}
      </div>

      {/* Narrative Deep Dive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase font-mono">
            <Zap className="w-4 h-4" />
            1. Problem Identified
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Crew A (Civil) at 50% completion on urgent rail joint inspection. Baseline crew speed
            cannot clear the possession window before traffic demand.
          </p>
        </div>

        <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase font-mono">
            <Users className="w-4 h-4" />
            2. Contributor Dispatched
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Crew B (S&T) in adjacent sector contributes 2 available technicians. Task A completion
            accelerates dynamically from <strong>50% → 80%</strong>.
          </p>
        </div>

        <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase font-mono">
            <BookmarkCheck className="w-4 h-4" />
            3. Checkpoint Preserved
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Crew B's own Task B is checkpointed at <strong>60%</strong> with state preserved. Work
            resumes safely in the next scheduled slot with zero rework.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5 min-h-[380px]">
          <CrewContributionPanel />
        </div>
        <div className="lg:col-span-7 min-h-[380px]">
          <MaintenanceTimeline />
        </div>
      </div>
    </div>
  );
};
