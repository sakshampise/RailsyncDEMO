import React from 'react';
import {
  AlertTriangle,
  PauseCircle,
  ShieldCheck,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  BookmarkCheck,
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const DisruptionPausePanel: React.FC = () => {
  const { disruptionState, stepNumber, triggerInjectDelay } = useSimulation();
  const isDelayed = stepNumber === 4;

  return (
    <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center ${
              isDelayed
                ? 'bg-amber-500/20 text-amber-400'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans">
              Disruption Protocol & Safe Handback
            </h2>
            <p className="text-[10px] text-slate-400">
              Zero-Loss Pause & Next Slot Scheduling
            </p>
          </div>
        </div>

        <span
          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
            isDelayed
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse'
              : 'bg-slate-800 text-slate-400'
          }`}
        >
          {isDelayed ? 'DISRUPTION MANAGED' : 'NORMAL WINDOW'}
        </span>
      </div>

      <div className="space-y-3 flex-1">
        {/* DISRUPTION STATUS ALERT BANNER */}
        {isDelayed ? (
          <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-500/40 text-xs">
            <div className="flex items-center gap-2 text-amber-300 font-bold mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>DISRUPTION INJECTED: Emergency Corridor Clearance Requested</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Track possession on Section S2 handed back early to clear the corridor. Work safely
              frozen with <strong>zero progress loss</strong>.
            </p>
          </div>
        ) : (
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-slate-300 font-semibold mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Corridor Traffic Moving Smoothly</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Ready to simulate unexpected line clearance demand to demonstrate safe pause
              protocol.
            </p>
          </div>
        )}

        {/* TASK A PRESERVATION CARD */}
        <div
          className={`p-3 rounded-lg border transition-all ${
            isDelayed
              ? 'bg-slate-900/95 border-amber-500/50'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-[10px] font-mono text-slate-400">
                Task A: Emergency Rail Joint Inspection
              </div>
              <div className="text-xs font-bold text-white">Status:</div>
            </div>

            <span
              className={`px-2.5 py-1 rounded text-[10px] font-black uppercase font-mono tracking-wider ${
                isDelayed
                  ? 'bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/30 font-extrabold'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {isDelayed ? 'PAUSED FOR NOW' : 'IN PROGRESS'}
            </span>
          </div>

          {/* Progress Preservation Bar */}
          <div className="my-2">
            <div className="flex justify-between text-[11px] font-mono mb-1">
              <span className="text-slate-300 font-bold">
                {isDelayed ? 'Preserved Work Completed:' : 'Current Progress:'}
              </span>
              <span className={isDelayed ? 'text-emerald-400 font-black' : 'text-slate-300 font-bold'}>
                {isDelayed ? '80% PRESERVED' : stepNumber === 3 ? '80%' : '50%'}
              </span>
            </div>

            {/* Visual Segments: 80% Solid Green/Cyan + 20% Amber Remaining */}
            <div className="w-full h-3.5 rounded-full bg-slate-800 overflow-hidden flex">
              <div
                className={`h-full flex items-center justify-center text-[9px] font-black ${
                  isDelayed ? 'bg-emerald-500 text-slate-950' : 'bg-cyan-500 text-slate-950'
                }`}
                style={{ width: `${isDelayed ? 80 : stepNumber === 3 ? 80 : 50}%` }}
              >
                {isDelayed ? '80% PRESERVED' : stepNumber === 3 ? '80% Complete' : '50%'}
              </div>
              {isDelayed && (
                <div
                  className="h-full bg-amber-500/30 border-l-2 border-amber-500 flex items-center justify-center text-[9px] font-bold text-amber-300"
                  style={{ width: '20%' }}
                >
                  20% REMAINING
                </div>
              )}
            </div>
          </div>

          {/* Rescheduled Slot Specs */}
          {isDelayed ? (
            <div className="mt-3 space-y-1.5 pt-2 border-t border-slate-800 text-[11px] font-mono">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400 flex items-center gap-1">
                  <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Remaining Work:
                </span>
                <span className="font-bold text-amber-300">20% (36 minutes work)</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  Rescheduled To:
                </span>
                <span className="font-bold text-cyan-300">
                  Slot B-07 (Tomorrow 09:00 - 10:00)
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Corridor Clearance:
                </span>
                <span className="font-bold text-emerald-400">
                  Handed Back On Time (0 overrun)
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-2 text-[10px] text-slate-400 italic">
              When an operational disruption occurs, work is frozen without loss instead of
              causing line overruns.
            </div>
          )}
        </div>
      </div>

      {/* Action Trigger */}
      <div className="pt-2 border-t border-slate-800 mt-2">
        {!isDelayed ? (
          <button
            onClick={triggerInjectDelay}
            className="w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <AlertTriangle className="w-3.5 h-3.5 fill-current" />
            INJECT DELAY / CLEAR CORRIDOR (STEP 4)
          </button>
        ) : (
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Progress Retained
            </span>
            <span className="text-amber-300 font-bold">Resumes Tomorrow 09:00</span>
          </div>
        )}
      </div>
    </div>
  );
};
