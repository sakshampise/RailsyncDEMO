import React, { useState } from 'react';
import { MaintenanceRequest, DemoStep, Department } from '../types';
import { Layers, Wrench, ShieldAlert, Sparkles, Clock, Check, ArrowRight, Activity, Filter } from 'lucide-react';

interface MaintenancePoolProps {
  requests: MaintenanceRequest[];
  currentStep: DemoStep;
  onOptimize: () => void;
}

export const MaintenancePool: React.FC<MaintenancePoolProps> = ({
  requests,
  currentStep,
  onOptimize,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const isBundled = currentStep !== 'UNOPTIMIZED_REQUESTS';

  const filteredRequests = requests.filter((req) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'HIGH') return req.priority === 'High';
    return req.department === activeFilter;
  });

  const bundledRequests = requests.filter((r) => r.section === 'S2' && r.compatibleWith?.length);
  const otherRequests = requests.filter((r) => r.section !== 'S2' || !r.compatibleWith?.length);

  const getDeptColor = (dept: Department) => {
    switch (dept) {
      case 'Civil':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'S&T':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Electrical':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">HIGH</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">MED</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-700 text-slate-300">LOW</span>;
    }
  };

  return (
    <div className="glass-panel rounded-xl p-4 flex flex-col h-full border border-slate-800">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-bold tracking-wide text-white uppercase">
            Maintenance Request Pool
          </h2>
        </div>
        <span className="px-2 py-0.5 rounded text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
          {requests.length} Requests
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 py-2 overflow-x-auto no-scrollbar">
        {['ALL', 'Civil', 'S&T', 'Electrical', 'HIGH'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
              activeFilter === filter
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Optimize Action Trigger Banner */}
      {!isBundled && (
        <div className="my-2 p-3 rounded-lg bg-gradient-to-br from-cyan-950/70 to-slate-900 border border-cyan-500/40 glow-cyan">
          <div className="flex items-center gap-2 text-cyan-300 font-semibold text-xs mb-1">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            AI Shadow Bundling Ready
          </div>
          <p className="text-[11px] text-slate-300 mb-2">
            3 separate departmental jobs target Section S2. Click below to bundle into a single optimal traffic block.
          </p>
          <button
            onClick={onOptimize}
            className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition active:scale-95"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            OPTIMIZE SCHEDULE & SHADOW BUNDLE
          </button>
        </div>
      )}

      {/* Request List Content */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 my-2 min-h-[300px]">
        {/* SHADOW BUNDLE CONTAINER WHEN OPTIMIZED */}
        {isBundled && (
          <div className="p-3 rounded-xl bg-slate-900/90 border-2 border-cyan-500/50 glow-cyan relative overflow-hidden transition-all duration-500">
            <div className="absolute top-0 right-0 px-2 py-0.5 bg-cyan-500 text-slate-950 font-black text-[9px] uppercase tracking-wider rounded-bl-lg">
              ★ SHADOW BUNDLE B-02
            </div>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wide">
                Section S2 — Co-located Block (14:00 - 16:00)
              </h3>
            </div>

            <div className="text-[11px] text-slate-300 mb-2 flex items-center justify-between bg-slate-950/60 p-2 rounded border border-slate-800">
              <span className="font-mono text-cyan-400 font-semibold">3 Jobs ➔ 1 Traffic Block</span>
              <span className="text-emerald-400 font-semibold">+135m Downtime Saved</span>
            </div>

            {/* Bundled Request cards */}
            <div className="space-y-1.5 pl-2 border-l-2 border-cyan-500/40">
              {bundledRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-2 rounded bg-slate-800/80 border border-slate-700/60 hover:border-cyan-500/40 transition text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${getDeptColor(req.department)}`}>
                        {req.department}
                      </span>
                      <span className="font-semibold text-slate-200">{req.work}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2 font-mono">
                      <span>REQ: {req.id}</span>
                      <span>•</span>
                      <span>Sec: {req.section}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-cyan-400 font-mono text-[11px] font-bold">
                      {req.duration} min
                    </div>
                    {getPriorityBadge(req.priority)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* UNOPTIMIZED / OTHER REQUEST CARDS */}
        {(!isBundled ? filteredRequests : otherRequests).map((req) => (
          <div
            key={req.id}
            className={`p-2.5 rounded-lg bg-slate-900/60 border transition hover:bg-slate-800/70 ${
              req.section === 'S2' && !isBundled
                ? 'border-amber-500/40 bg-amber-500/5'
                : 'border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getDeptColor(req.department)}`}>
                    {req.department}
                  </span>
                  <span className="text-xs font-semibold text-slate-200">{req.work}</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-2 font-mono">
                  <span>REQ: {req.id}</span>
                  <span>•</span>
                  <span className="text-slate-300 font-bold">Sec: {req.section}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {req.duration} min
                  </span>
                </div>
              </div>
              <div>{getPriorityBadge(req.priority)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Metrics */}
      <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Department Coordination</span>
        <span className={isBundled ? "text-emerald-400 font-bold" : "text-amber-400"}>
          {isBundled ? "3/3 Departments Synced" : "Uncoordinated (3 Separate Blocks)"}
        </span>
      </div>
    </div>
  );
};
