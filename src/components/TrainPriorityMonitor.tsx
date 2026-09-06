import React from 'react';
import { Train as TrainType, DemoStep } from '../types';

interface TrainPriorityMonitorProps {
  trains: TrainType[];
  currentStep: DemoStep;
  rerouteMode: 'REROUTE' | 'SHIFT';
}

export const TrainPriorityMonitor: React.FC<TrainPriorityMonitorProps> = ({
  trains,
  currentStep,
  rerouteMode,
}) => {
  const isConflict = currentStep === 'DISRUPTION_INJECTED';
  const isResolved = currentStep === 'AI_RESOLVED_REROUTE' || currentStep === 'AI_RESOLVED_SHIFT';
  const isT205Rerouted = isResolved && (rerouteMode === 'REROUTE' || currentStep === 'AI_RESOLVED_REROUTE');

  const renderPriorityBar = (priority: string) => {
    const totalBars = 8;
    const filledBars = priority === 'High' ? 8 : priority === 'Medium' ? 5 : 3;
    const colorClass = priority === 'High' ? 'bg-amber-500' : priority === 'Medium' ? 'bg-blue-500' : 'bg-slate-600';

    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: totalBars }).map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-3.5 rounded-xs ${
              i < filledBars ? colorClass : 'bg-slate-800'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between h-full select-none">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans">
          Train Priority Monitor
        </h2>
      </div>

      {/* Table Layout */}
      <div className="overflow-x-auto my-1 flex-1">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="text-[10px] text-slate-400 border-b border-slate-800 font-sans uppercase">
              <th className="pb-2 font-bold">Train</th>
              <th className="pb-2 font-bold">Type</th>
              <th className="pb-2 font-bold">Priority</th>
              <th className="pb-2 font-bold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {trains.map((train) => {
              const is205 = train.id === 'T205';
              return (
                <tr key={train.id} className="hover:bg-slate-900/40">
                  <td className="py-2.5 font-bold text-white">{train.id.replace('T', '')}</td>
                  <td className="py-2.5 text-slate-300 font-sans text-[11px]">{train.type}</td>
                  <td className="py-2.5">{renderPriorityBar(train.priority)}</td>
                  <td className="py-2.5 text-right font-sans text-[11px]">
                    {is205 && isConflict ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
                        +45 min
                      </span>
                    ) : is205 && isT205Rerouted ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        Via Loop L2 ✓
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400">
                        On Time
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button className="w-full mt-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition">
        VIEW ALL TRAINS
      </button>
    </div>
  );
};
