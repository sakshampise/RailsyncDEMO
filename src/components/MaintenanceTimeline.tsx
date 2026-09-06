import React from 'react';
import { Sparkles, Clock, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const MaintenanceTimeline: React.FC = () => {
  const { currentStep, stepNumber, isBundled, isContributorActive, isDisruptionActive } =
    useSimulation();

  const times = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  return (
    <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div>
          <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans">
            Optimized Maintenance Timeline (AI Possession Schedule)
          </h2>
          <p className="text-[10px] text-slate-400">
            Coordinated Multi-Departmental Possession Windows
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-mono font-bold">
            CP-SAT SOLVER
          </span>
        </div>
      </div>

      {/* Gantt Timeline Chart Matrix */}
      <div className="my-1 overflow-x-auto min-w-[620px] bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
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

        {/* SECTION S1 ROW */}
        <div className="grid grid-cols-12 gap-1 py-2 items-center border-b border-slate-900 text-xs">
          <div className="col-span-3 font-semibold text-slate-300 pl-1 font-mono text-[11px]">
            <div className="font-bold text-slate-200">SECTION S1</div>
            <div className="text-[10px] text-slate-400">Nagpur – Gondia</div>
          </div>
          <div className="col-span-9 grid grid-cols-7 gap-1 h-10 items-center relative bg-slate-900/30 rounded p-1">
            {/* Block B-01 (11:30 - 12:30) */}
            <div className="col-start-1 col-span-2 bg-slate-800/80 border border-slate-700 text-slate-300 rounded p-1 text-[9px] font-mono text-center">
              <div className="font-bold">B-01 (Electrical)</div>
              <div className="text-[8px] text-slate-400">11:30 - 12:30 • Routine</div>
            </div>

            {/* Block B-03 (16:30 - 17:30) */}
            <div className="col-start-6 col-span-2 bg-slate-800/80 border border-slate-700 text-slate-300 rounded p-1 text-[9px] font-mono text-center">
              <div className="font-bold">B-03 (S&T Relay)</div>
              <div className="text-[8px] text-slate-400">16:30 - 17:30 • Routine</div>
            </div>
          </div>
        </div>

        {/* SECTION S2 ROW — KEY DEMO POSSESSION */}
        <div className="grid grid-cols-12 gap-1 py-3 items-center border-b border-slate-900 text-xs bg-slate-900/40 my-1 rounded">
          <div className="col-span-3 font-bold text-slate-200 pl-1 font-mono text-[11px]">
            <div className="text-cyan-400 font-extrabold flex items-center gap-1">
              <span>SECTION S2</span>
            </div>
            <div className="text-[10px] text-slate-400">Gondia – Rajnandgaon</div>
            {isBundled && (
              <span className="mt-1 inline-block text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Coordinated Bundle
              </span>
            )}
          </div>

          <div className="col-span-9 grid grid-cols-7 gap-1 min-h-[96px] items-center relative bg-slate-950 rounded border border-slate-800 p-1">
            {/* STEP 1: UNBUNDLED SCATTERED VIEW */}
            {stepNumber === 1 && (
              <div className="col-start-3 col-span-4 p-2 bg-rose-950/40 border border-rose-500/40 rounded flex flex-col justify-center items-center text-center space-y-1">
                <span className="text-[10px] font-bold text-rose-300 uppercase font-mono">
                  ⚠ 3 Fragmented Requests Pending AI Bundling
                </span>
                <div className="flex items-center gap-2 text-[9px] text-slate-300">
                  <span className="bg-red-950 px-1.5 py-0.5 rounded border border-red-800 text-red-300">
                    Civil (180m)
                  </span>
                  <span className="bg-amber-950 px-1.5 py-0.5 rounded border border-amber-800 text-amber-300">
                    S&T (90m)
                  </span>
                  <span className="bg-blue-950 px-1.5 py-0.5 rounded border border-blue-800 text-blue-300">
                    Elec (120m)
                  </span>
                </div>
                <span className="text-[9px] text-slate-400">
                  Without Bundling: 3 separate closures = 390 min disruption
                </span>
              </div>
            )}

            {/* STEP 2: SHADOW BUNDLED MASTER BLOCK B-02 */}
            {stepNumber === 2 && (
              <div className="col-start-4 col-span-2 rounded-lg border-2 border-dashed border-cyan-400 bg-cyan-950/40 p-2 flex flex-col space-y-1 glow-cyan">
                <div className="text-[9px] font-black font-mono text-cyan-300 text-center flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  B-02 SHADOW BUNDLE (14:00 - 16:00)
                </div>

                <div className="p-1 rounded text-[9px] font-bold font-mono text-center bg-red-700 text-white truncate shadow-sm">
                  Civil • Emergency Rail Joint (M001)
                </div>
                <div className="p-1 rounded text-[9px] font-bold font-mono text-center bg-amber-600 text-white truncate shadow-sm">
                  S&T • Signal Cable Inspection (M004)
                </div>
                <div className="p-1 rounded text-[9px] font-bold font-mono text-center bg-blue-700 text-white truncate shadow-sm">
                  Electrical • OHE Cantilever (M007)
                </div>

                <div className="text-[9px] font-bold text-emerald-400 text-center pt-0.5 font-mono">
                  3 Jobs ➔ 1 Possession Window (-210m saved)
                </div>
              </div>
            )}

            {/* STEP 3: CREW CONTRIBUTION ACCELERATED PROGRESS */}
            {stepNumber === 3 && (
              <div className="col-start-4 col-span-2 rounded-lg border-2 border-blue-500 bg-blue-950/50 p-2 flex flex-col space-y-1.5 shadow-lg shadow-blue-500/20">
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="font-bold text-blue-300">B-02 • IN PROGRESS</span>
                  <span className="text-cyan-300 font-bold">Crew B Assisted</span>
                </div>

                {/* Task A Progress Bar (50% -> 80%) */}
                <div className="space-y-0.5">
                  <div className="flex justify-between text-[9px] text-slate-300 font-mono">
                    <span>Task A (Civil):</span>
                    <span className="text-cyan-400 font-black">80% (Boosted +30%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden flex">
                    <div className="h-full bg-red-600" style={{ width: '50%' }} />
                    <div
                      className="h-full bg-cyan-400 animate-pulse"
                      style={{ width: '30%' }}
                    />
                  </div>
                </div>

                {/* Task B Checkpointed Bar (60%) */}
                <div className="space-y-0.5">
                  <div className="flex justify-between text-[9px] text-slate-300 font-mono">
                    <span>Task B (S&T):</span>
                    <span className="text-amber-400 font-bold">60% Checkpointed</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: DISRUPTION INJECTED & TASK PAUSED */}
            {stepNumber === 4 && (
              <div className="col-start-4 col-span-2 rounded-lg border-2 border-amber-500 bg-amber-950/40 p-2 flex flex-col space-y-1.5">
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="font-black text-amber-400">⏸ PAUSED FOR NOW</span>
                  <span className="text-emerald-400 font-bold">Corridor Handed Back</span>
                </div>

                <div className="space-y-0.5">
                  <div className="flex justify-between text-[9px] text-slate-300 font-mono">
                    <span>Progress Preserved:</span>
                    <span className="text-emerald-400 font-black">80% Done</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden flex">
                    <div className="h-full bg-emerald-500" style={{ width: '80%' }} />
                    <div
                      className="h-full bg-amber-500/40 border-l border-amber-500"
                      style={{ width: '20%' }}
                    />
                  </div>
                </div>

                <div className="text-[8px] text-slate-300 bg-slate-900 p-1 rounded font-mono flex items-center justify-between">
                  <span>Next Slot B-07:</span>
                  <span className="text-cyan-300 font-bold">Tomorrow 09:00 (20% rem)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SECTION S3 ROW */}
        <div className="grid grid-cols-12 gap-1 py-2 items-center text-xs">
          <div className="col-span-3 font-semibold text-slate-300 pl-1 font-mono text-[11px]">
            <div className="font-bold text-slate-200">SECTION S3</div>
            <div className="text-[10px] text-slate-400">Rajnandgaon – Durg</div>
          </div>
          <div className="col-span-9 grid grid-cols-7 gap-1 h-10 items-center relative bg-slate-900/30 rounded p-1">
            {/* Block B-04 (15:30 - 17:00) */}
            <div className="col-start-5 col-span-2 bg-slate-800/80 border border-slate-700 text-slate-300 rounded p-1 text-[9px] font-mono text-center">
              <div className="font-bold">B-04 (Civil Tamping)</div>
              <div className="text-[8px] text-slate-400">15:30 - 17:00 • Routine</div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend Footer */}
      <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800 font-sans">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-red-600" /> Civil (M001)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> S&T (M004)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" /> Electrical (M007)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded border border-dashed border-cyan-400" /> Shadow Bundle
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Work Preserved
          </span>
        </div>
        <span className="font-mono text-cyan-400 font-bold">
          Coordinated Window: 14:00 – 16:00
        </span>
      </div>
    </div>
  );
};
