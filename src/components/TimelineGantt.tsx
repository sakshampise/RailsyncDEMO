import React from 'react';
import { DemoStep, MaintenanceRequest } from '../types';
import { Calendar, Clock, AlertTriangle, CheckCircle2, Sparkles, Layers } from 'lucide-react';

interface TimelineGanttProps {
  currentStep: DemoStep;
  requests: MaintenanceRequest[];
  rerouteMode: 'REROUTE' | 'SHIFT';
}

export const TimelineGantt: React.FC<TimelineGanttProps> = ({
  currentStep,
  requests,
  rerouteMode,
}) => {
  const isBundled = currentStep !== 'UNOPTIMIZED_REQUESTS';
  const isConflict = currentStep === 'DISRUPTION_INJECTED';
  const isResolved = currentStep === 'AI_RESOLVED_REROUTE' || currentStep === 'AI_RESOLVED_SHIFT';
  const isBlockShifted = isResolved && rerouteMode === 'SHIFT';
  const isT205Rerouted = isResolved && (rerouteMode === 'REROUTE' || currentStep === 'AI_RESOLVED_REROUTE');

  // Hours array from 12:00 to 18:00
  const hours = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  return (
    <div className="glass-panel rounded-xl p-4 border border-slate-800 flex flex-col h-full">
      {/* Timeline Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-bold tracking-wide text-white uppercase flex items-center gap-2">
            Optimized Maintenance Timeline & Traffic Schedule
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Time Range:</span>
          <span className="text-cyan-300 font-semibold bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            12:00 ➔ 18:00 IST
          </span>
        </div>
      </div>

      {/* Gantt Matrix Chart */}
      <div className="my-3 bg-slate-950/80 rounded-xl p-3 border border-slate-800 overflow-x-auto min-w-[650px]">
        {/* Time Grid Header */}
        <div className="grid grid-cols-12 gap-1 text-[10px] font-mono text-slate-400 pb-2 border-b border-slate-800 mb-2">
          <div className="col-span-3 text-slate-300 font-bold uppercase pl-2">Section / Department</div>
          <div className="col-span-9 grid grid-cols-6 text-center font-bold">
            {hours.slice(0, 6).map((h, i) => (
              <div key={h} className="border-r border-slate-800/60 last:border-r-0">
                {h} - {hours[i + 1]}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION S1 ROW */}
        <div className="grid grid-cols-12 gap-1 py-1.5 items-center border-b border-slate-900 text-xs">
          <div className="col-span-3 font-semibold text-slate-300 flex items-center gap-2 pl-2">
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            Section S1 (Nagpur - Gondia)
          </div>
          <div className="col-span-9 grid grid-cols-6 gap-1 h-8 items-center relative bg-slate-900/30 rounded">
            {/* T101 Vande Bharat slot */}
            <div className="col-start-2 col-span-1 bg-cyan-900/40 border border-cyan-500/40 text-cyan-300 rounded px-2 py-1 text-[10px] font-mono font-bold truncate">
              🚆 T101 (13:15)
            </div>
          </div>
        </div>

        {/* SECTION S2 - UNBUNDLED vs SHADOW BUNDLED B-02 ROW */}
        <div className="grid grid-cols-12 gap-1 py-2 items-center border-b border-slate-900 text-xs bg-slate-900/40 my-1 rounded">
          <div className="col-span-3 font-bold text-cyan-300 flex flex-col pl-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Section S2 (Gondia - RJN)</span>
            </div>
            <span className="text-[10px] text-slate-400 font-normal">Main Track Maintenance</span>
          </div>

          <div className="col-span-9 grid grid-cols-6 gap-1 h-16 items-center relative bg-slate-950 rounded border border-slate-800 p-1">
            {/* UNBUNDLED STATE: 3 Scattered windows */}
            {!isBundled && (
              <>
                {/* Civil */}
                <div className="col-start-1 col-span-2 bg-amber-500/20 border border-amber-500/50 text-amber-300 rounded p-1 text-[10px] font-mono">
                  <div className="font-bold">M001 Civil</div>
                  <div className="text-[9px] text-slate-400">12:00-14:00 (120m)</div>
                </div>
                {/* S&T */}
                <div className="col-start-3 col-span-1 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded p-1 text-[10px] font-mono">
                  <div className="font-bold">M004 S&T</div>
                  <div className="text-[9px] text-slate-400">14:30 (45m)</div>
                </div>
                {/* Electrical */}
                <div className="col-start-5 col-span-1 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded p-1 text-[10px] font-mono">
                  <div className="font-bold">M007 Elec</div>
                  <div className="text-[9px] text-slate-400">16:00 (60m)</div>
                </div>
              </>
            )}

            {/* SHADOW BUNDLED STATE B-02 (14:00 - 16:00) */}
            {isBundled && !isBlockShifted && (
              <div className={`col-start-3 col-span-2 h-full rounded-lg border-2 p-1.5 flex flex-col justify-between transition-all duration-500 relative ${
                isConflict
                  ? 'bg-rose-950/80 border-rose-500 text-rose-200 glow-red animate-pulse'
                  : 'bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border-cyan-400 text-cyan-200 glow-cyan'
              }`}>
                <div className="flex items-center justify-between font-mono text-[10px] font-bold">
                  <span className="flex items-center gap-1 text-cyan-300">
                    <Sparkles className="w-3 h-3 text-cyan-400" /> BUNDLED BLOCK B-02
                  </span>
                  <span className="text-amber-400">14:00 – 16:00</span>
                </div>

                <div className="flex items-center gap-1 text-[9px] font-semibold">
                  <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">Civil (Track)</span>
                  <span className="px-1.5 py-0.5 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/40">S&T (Sig)</span>
                  <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded border border-purple-500/40">Elec (OHE)</span>
                </div>
              </div>
            )}

            {/* SHIFTED BLOCK B-02 (16:15 - 18:15) */}
            {isBlockShifted && (
              <div className="col-start-5 col-span-2 h-full rounded-lg border-2 border-emerald-400 bg-emerald-950/60 p-1.5 text-emerald-200 glow-emerald flex flex-col justify-between">
                <div className="flex items-center justify-between font-mono text-[10px] font-bold">
                  <span className="text-emerald-300">✓ B-02 SHIFTED WINDOW</span>
                  <span className="text-emerald-400">16:15 – 18:15</span>
                </div>
                <div className="text-[9px] text-slate-300 font-mono">
                  Civil + S&T + Electrical (Co-located)
                </div>
              </div>
            )}

            {/* TRAIN T205 OVERLAY LINE */}
            {/* Standard 14:45 position or delayed conflict position */}
            <div
              className={`absolute top-0 bottom-0 w-28 rounded border-2 flex items-center justify-center p-1 font-mono text-[10px] font-bold transition-all duration-700 z-10 ${
                isT205Rerouted
                  ? 'left-[34%] bg-slate-900/40 border-dashed border-emerald-400 text-emerald-300 opacity-60'
                  : isConflict
                  ? 'left-[36%] bg-rose-600/90 border-rose-400 text-white glow-red animate-bounce'
                  : 'left-[42%] bg-blue-600/90 border-blue-400 text-white shadow-md'
              }`}
            >
              <div className="text-center">
                <div>🚆 T205 Express</div>
                <div className="text-[9px] opacity-90">
                  {isConflict ? 'DELAY +45m (14:45)' : isT205Rerouted ? 'VIA LOOP L2 ✓' : '14:45 S2'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION S3 ROW */}
        <div className="grid grid-cols-12 gap-1 py-1.5 items-center border-b border-slate-900 text-xs">
          <div className="col-span-3 font-semibold text-slate-300 flex items-center gap-2 pl-2">
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            Section S3 (RJN - Durg)
          </div>
          <div className="col-span-9 grid grid-cols-6 gap-1 h-8 items-center relative bg-slate-900/30 rounded">
            {/* T307 Express */}
            <div className="col-start-5 col-span-1 bg-amber-900/40 border border-amber-500/40 text-amber-300 rounded px-2 py-1 text-[10px] font-mono font-bold truncate">
              🚆 T307 (16:45)
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Visual Legend */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-cyan-500/30 border border-cyan-400" />
            <span>AI Shadow Block</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-blue-600" />
            <span>Train Movement Line</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-rose-500" />
            <span>Conflict Zone</span>
          </div>
        </div>
        <div className="font-mono text-cyan-400 font-semibold text-[11px]">
          {isBundled ? "Shadow Bundling: 3 Departments ➔ 1 Window" : "Unbundled: 3 Window Interruptions"}
        </div>
      </div>
    </div>
  );
};
