import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Plus, Wrench, Clock, Calendar, Filter, Sparkles } from 'lucide-react';
import { Priority, Department } from '../../types';

export const MaintenanceRequestsView: React.FC = () => {
  const { requests, setIsNewRequestModalOpen, triggerShadowBundling, isBundled } = useSimulation();
  const [filterDept, setFilterDept] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('All');

  const filtered = requests.filter((r) => {
    if (filterDept !== 'All' && r.department !== filterDept) return false;
    if (filterPriority !== 'All' && r.priority !== filterPriority) return false;
    return true;
  });

  return (
    <div className="space-y-4 flex-1 select-none">
      {/* View Header */}
      <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-base font-black text-white uppercase tracking-wide flex items-center gap-2">
            <Wrench className="w-5 h-5 text-cyan-400" />
            Maintenance Request Pool Management
          </h1>
          <p className="text-xs text-slate-400">
            Intake portal for Civil, S&T, and Electrical track possession requests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNewRequestModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase shadow-lg shadow-cyan-500/20 transition"
          >
            <Plus className="w-4 h-4" />
            + New Request
          </button>
          {!isBundled && (
            <button
              onClick={triggerShadowBundling}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase transition shadow"
            >
              <Sparkles className="w-4 h-4" />
              Bundle Requests
            </button>
          )}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="font-bold text-slate-300">Department:</span>
          {['All', 'Civil', 'S&T', 'Electrical'].map((d) => (
            <button
              key={d}
              onClick={() => setFilterDept(d)}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                filterDept === d
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-300">Priority:</span>
          {['All', 'High', 'Medium', 'Low'].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                filterPriority === p
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-dashboard-card rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="bg-slate-900/90 text-slate-400 border-b border-slate-800 font-sans uppercase text-[10px]">
              <th className="p-3 font-bold">Request ID</th>
              <th className="p-3 font-bold">Department</th>
              <th className="p-3 font-bold">Section</th>
              <th className="p-3 font-bold">Scope of Work</th>
              <th className="p-3 font-bold">Duration</th>
              <th className="p-3 font-bold">Priority</th>
              <th className="p-3 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-slate-900/50 transition">
                <td className="p-3 font-bold text-cyan-400">{r.id}</td>
                <td className="p-3 font-sans text-white font-medium">{r.department}</td>
                <td className="p-3 text-slate-300">{r.section}</td>
                <td className="p-3 font-sans">
                  <div className="font-bold text-white text-xs">{r.work}</div>
                  {r.description && (
                    <div className="text-[11px] text-slate-400 line-clamp-1">
                      {r.description}
                    </div>
                  )}
                </td>
                <td className="p-3 text-slate-300">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {r.duration} mins
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-black uppercase font-mono ${
                      r.priority === 'High'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : r.priority === 'Medium'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {r.priority}
                  </span>
                </td>
                <td className="p-3 font-sans">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.status === 'Bundled'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : r.status === 'Paused'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
