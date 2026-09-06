import React from 'react';
import { DemoStep } from '../types';
import { Sparkles, Download } from 'lucide-react';

interface OptimizedTimelineGanttProps {
  currentStep: DemoStep;
  rerouteMode: 'REROUTE' | 'SHIFT';
}

export const OptimizedTimelineGantt: React.FC<OptimizedTimelineGanttProps> = ({
  currentStep,
  rerouteMode,
}) => {
  const isBundled = currentStep !== 'UNOPTIMIZED_REQUESTS';
  const isConflict = currentStep === 'DISRUPTION_INJECTED';
  const isResolved = currentStep === 'AI_RESOLVED_REROUTE' || currentStep === 'AI_RESOLVED_SHIFT';
  const isBlockShifted = isResolved && rerouteMode === 'SHIFT';
  const isT205Rerouted = isResolved && (rerouteMode === 'REROUTE' || currentStep === 'AI_RESOLVED_REROUTE');

  const times = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  return (
    <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans">
          Optimized Maintenance Timeline (AI Schedule)
        </h2>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded bg-slate-900 border border-slate-800 p-0.5 text-[10px] font-bold">
            <button className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono">
              DAY VIEW
            </button>
            <button className="px-2 py-0.5 rounded text-slate-400 hover:text-slate-200">
              WEEK VIEW
            </button>
          </div>
          <button className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Gantt Timeline Chart Matrix */}
      <div className="my-2 overflow-x-auto min-w-[620px] bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
        {/* Time Grid Columns Header */}
        <div className="grid grid-cols-12 gap-1 text-[10px] font-mono text-slate-400 pb-2 border-b border-slate-800 mb-2">
          <div className="col-span-3 text-slate-400 font-bold uppercase pl-1">Corridor Segment</div>
          <div className="col-span-9 grid grid-cols-7 text-center font-bold">
            {times.slice(0, 7).map((t) => (
              <div key={t} className="border-r border-slate-800/60 last:border-r-0">
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION S1 (A - B) ROW */}
        <div className="grid grid-cols-12 gap-1 py-2 items-center border-b border-slate-900 text-xs">
          <div className="col-span-3 font-semibold text-slate-300 pl-1 font-mono text-[11px]">
            <div className="font-bold text-slate-200">SECTION S1</div>
            <div className="text-[10px] text-slate-400">A - B</div>
          </div>
          <div className="col-span-9 grid grid-cols-7 gap-1 h-10 items-center relative bg-slate-900/30 rounded p-1">
            {/* Block B-01 (11:30 - 12:30) */}
            <div className="col-start-1 col-span-2 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 rounded p-1 text-[9px] font-mono text-center">
              <div className="font-bold">B-01</div>
              <div className="text-[8px] text-slate-400">11:30 - 12:30</div>
            </div>

            {/* Block B-03 (16:30 - 17:30) */}
            <div className="col-start-6 col-span-2 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 rounded p-1 text-[9px] font-mono text-center">
              <div className="font-bold">B-03</div>
              <div className="text-[8px] text-slate-400">16:30 - 17:30</div>
            </div>
          </div>
        </div>

        {/* SECTION S2 (B - C) ROW — SHADOW BUNDLED BLOCK B-02 */}
        <div className="grid grid-cols-12 gap-1 py-3 items-center border-b border-slate-900 text-xs bg-slate-900/40 my-1 rounded">
          <div className="col-span-3 font-bold text-slate-200 pl-1 font-mono text-[11px]">
            <div className="text-cyan-400 font-extrabold flex items-center gap-1">
              <span>SECTION S2</span>
            </div>
            <div className="text-[10px] text-slate-400">B - C</div>
          </div>

          <div className="col-span-9 grid grid-cols-7 gap-1 min-h-[96px] items-center relative bg-slate-950 rounded border border-slate-800 p-1">
            {/* BUNDLED BLOCK B-02 CONTAINER (Matching screenshot stacked red/yellow/blue bars!) */}
            {isBundled && !isBlockShifted && (
              <div className={`col-start-4 col-span-2 rounded-lg border-2 border-dashed p-1.5 flex flex-col space-y-1 relative transition-all duration-500 ${
                isConflict
                  ? 'bg-rose-950/70 border-rose-500 text-rose-200 glow-red animate-pulse'
                  : 'bg-slate-900/90 border-amber-400 text-amber-200 glow-amber'
              }`}>
                <div className="text-[9px] font-bold font-mono text-amber-300 text-center">
                  B-02 (Bundled Block) — 14:00 - 16:00
                </div>

                {/* Stacked Sub-bars for Civil, S&T, Electrical */}
                <div className="p-1 rounded text-[9px] font-bold font-mono text-center bg-red-700 text-white truncate shadow-sm">
                  Civil - Track Replacement
                </div>
                <div className="p-1 rounded text-[9px] font-bold font-mono text-center bg-amber-600 text-white truncate shadow-sm">
                  S&T - Signal Inspection
                </div>
                <div className="p-1 rounded text-[9px] font-bold font-mono text-center bg-blue-700 text-white truncate shadow-sm">
                  Electrical - OHE Inspection
                </div>

                <div className="text-[9px] font-black text-amber-400 flex items-center justify-center gap-1 pt-0.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  AI Bundled
                </div>
              </div>
            )}

            {/* UNBUNDLED STATE PREVIEW (If not bundled yet) */}
            {!isBundled && (
              <div className="col-start-4 col-span-2 p-2 bg-amber-500/10 border border-amber-500/30 rounded text-center text-amber-300 text-[10px]">
                Pending AI Bundling (14:00 - 16:00)
              </div>
            )}

            {/* SHIFTED BLOCK B-02 */}
            {isBlockShifted && (
              <div className="col-start-6 col-span-2 rounded-lg border-2 border-emerald-400 bg-emerald-950/80 p-2 text-emerald-200 glow-emerald text-center">
                <div className="text-[10px] font-bold font-mono">B-02 Shifted Window</div>
                <div className="text-[9px] text-emerald-300">16:15 - 18:15</div>
                <div className="text-[8px] text-slate-300 mt-1 font-mono">Civil + S&T + Elec</div>
              </div>
            )}

            {/* TRAIN 205 OVERLAY LINE */}
            {isConflict && (
              <div className="absolute top-0 bottom-0 left-[48%] w-24 bg-rose-600/90 border-2 border-rose-400 text-white rounded p-1 font-mono text-[9px] font-bold flex flex-col justify-center items-center z-10 glow-red animate-bounce">
                <div>🚆 Train 205</div>
                <div className="text-[8px] text-rose-200">+45m Delay Overlap!</div>
              </div>
            )}
            {isT205Rerouted && (
              <div className="absolute top-0 bottom-0 left-[48%] w-24 bg-slate-900/60 border border-dashed border-emerald-400 text-emerald-300 rounded p-1 font-mono text-[8px] flex flex-col justify-center items-center opacity-70">
                <div>🚆 Train 205</div>
                <div>Via Loop L2 ✓</div>
              </div>
            )}
          </div>
        </div>

        {/* SECTION S3 (C - D) ROW */}
        <div className="grid grid-cols-12 gap-1 py-2 items-center text-xs">
          <div className="col-span-3 font-semibold text-slate-300 pl-1 font-mono text-[11px]">
            <div className="font-bold text-slate-200">SECTION S3</div>
            <div className="text-[10px] text-slate-400">C - D</div>
          </div>
          <div className="col-span-9 grid grid-cols-7 gap-1 h-10 items-center relative bg-slate-900/30 rounded p-1">
            {/* Block B-04 (15:30 - 17:00) */}
            <div className="col-start-5 col-span-2 bg-indigo-950/80 border border-indigo-500/50 text-indigo-300 rounded p-1 text-[9px] font-mono text-center">
              <div className="font-bold">B-04</div>
              <div className="text-[8px] text-slate-400">15:30 - 17:00</div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend Footer (Matching exact legend in screenshot) */}
      <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800 font-sans">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-red-600" /> Civil
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> S&T
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" /> Electrical
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded border border-dashed border-amber-400" /> AI Bundled Block
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" /> Completed
          </span>
        </div>
        <span className="font-mono text-cyan-400 font-bold">14:00 - 16:00 Window Co-located</span>
      </div>
    </div>
  );
};
