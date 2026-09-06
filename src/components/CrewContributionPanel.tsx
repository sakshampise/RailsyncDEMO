import React from 'react';
import {
  Users,
  CheckCircle2,
  ArrowRight,
  Zap,
  BookmarkCheck,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const CrewContributionPanel: React.FC = () => {
  const { crewContribution, stepNumber, triggerContributorMode } = useSimulation();
  const isStep3Active = stepNumber >= 3;

  return (
    <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-cyan-400 flex items-center justify-center">
            <Users className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans">
              Crew Contribution & Checkpoint Engine
            </h2>
            <p className="text-[10px] text-slate-400">
              Inter-Departmental Dynamic Labor Allocation
            </p>
          </div>
        </div>

        <span
          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
            isStep3Active
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
              : 'bg-slate-800 text-slate-400'
          }`}
        >
          {isStep3Active ? 'CONTRIBUTOR ACTIVE' : 'STANDBY'}
        </span>
      </div>

      <div className="space-y-3 flex-1">
        {/* TASK A (Civil - Receiving Help) */}
        <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
          <div className="flex items-start justify-between mb-1.5">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase font-mono bg-red-950 text-red-300 border border-red-800">
                  CIVIL
                </span>
                <span className="text-xs font-bold text-white">
                  {crewContribution.taskAName}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                Assigned: {crewContribution.taskACrew} • Section S2
              </div>
            </div>

            <span
              className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase font-mono ${
                isStep3Active
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              {isStep3Active ? '80% ACCELERATED' : '50% PROGRESS (SLOW)'}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="my-2">
            <div className="flex justify-between text-[10px] font-mono mb-1">
              <span className="text-slate-400">Task Completion Rate:</span>
              <span className="font-bold text-white">
                {isStep3Active ? '80% (50% + 30% Contributor)' : '50%'}
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
              {/* Base Progress 50% */}
              <div
                className="h-full bg-red-600 flex items-center justify-center text-[8px] font-bold text-white"
                style={{ width: '50%' }}
              >
                50% Crew A
              </div>
              {/* Accelerated 30% */}
              {isStep3Active && (
                <div
                  className="h-full bg-cyan-400 flex items-center justify-center text-[8px] font-black text-slate-950 animate-pulse glow-cyan"
                  style={{ width: '30%' }}
                >
                  +30% Crew B
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Contribution Callout */}
          {isStep3Active ? (
            <div className="p-2 rounded bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 text-cyan-300 font-medium">
                <Zap className="w-3.5 h-3.5 text-cyan-400 fill-current" />
                <span>2 Technicians Contributed from Crew B (S&T)</span>
              </div>
              <span className="text-[10px] font-bold font-mono text-emerald-400">
                +30% Speedup
              </span>
            </div>
          ) : (
            <div className="text-[10px] text-slate-400 italic">
              Crew A is operating at baseline speed. Ready for cross-crew assist.
            </div>
          )}
        </div>

        {/* TASK B (S&T - Contributor with Checkpoint) */}
        <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
          <div className="flex items-start justify-between mb-1.5">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase font-mono bg-amber-950 text-amber-300 border border-amber-800">
                  S&T
                </span>
                <span className="text-xs font-bold text-white">
                  {crewContribution.taskBName}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                Assigned: {crewContribution.taskBCrew} • Section S2
              </div>
            </div>

            <span
              className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase font-mono ${
                isStep3Active
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {isStep3Active ? 'CHECKPOINT SAVED (60%)' : 'SCHEDULED (100%)'}
            </span>
          </div>

          {/* Progress Bar with Checkpoint Marker */}
          <div className="my-2">
            <div className="flex justify-between text-[10px] font-mono mb-1">
              <span className="text-slate-400">Work Done Before Assisting:</span>
              <span className="font-bold text-amber-400">
                {isStep3Active ? '60% Checkpointed' : 'Pending'}
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden relative">
              <div
                className={`h-full ${
                  isStep3Active ? 'bg-amber-500' : 'bg-slate-700'
                } flex items-center justify-center text-[8px] font-bold text-slate-950`}
                style={{ width: isStep3Active ? '60%' : '0%' }}
              >
                {isStep3Active ? '60% Checkpoint' : ''}
              </div>
            </div>
          </div>

          {/* Checkpoint Preservation Note */}
          {isStep3Active && (
            <div className="p-2 rounded bg-slate-950/80 border border-slate-800 text-[10px] text-slate-300 flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong className="text-emerald-300">State Preserved: </strong>
                {crewContribution.taskBNote}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-slate-800 mt-2">
        {!isStep3Active ? (
          <button
            onClick={triggerContributorMode}
            className="w-full py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            ACTIVATE CONTRIBUTOR MODE (STEP 3)
          </button>
        ) : (
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Zero Block Overrun Risk
            </span>
            <span className="text-cyan-300 font-bold">Task A: 80% • Task B: 60%</span>
          </div>
        )}
      </div>
    </div>
  );
};
