import React, { useState } from 'react';
import {
  Train,
  LayoutDashboard,
  Wrench,
  Activity,
  Users,
  Sparkles,
  BarChart3,
  Plus,
  Clock,
  Calendar,
  Layers,
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const Sidebar: React.FC = () => {
  const {
    requests,
    activeNav,
    setActiveNav,
    setIsNewRequestModalOpen,
    isBundled,
  } = useSimulation();

  const [filter, setFilter] = useState<string>('All');

  const navItems = [
    { id: 'command', label: 'Demo View (Command Center)', icon: LayoutDashboard },
    { id: 'requests', label: 'Maintenance Requests', icon: Wrench },
    { id: 'ongoing', label: 'Ongoing Maintenance', icon: Activity },
    { id: 'contributor', label: 'Crew Contribution', icon: Users },
    { id: 'optimization', label: 'Shadow Bundling (AI)', icon: Sparkles },
    { id: 'reports', label: 'Reports & Insights', icon: BarChart3 },
  ];

  const filteredRequests = requests.filter((r) => {
    if (filter === 'All') return true;
    if (filter === 'High Priority') return r.priority === 'High';
    return r.department === filter;
  });

  return (
    <aside className="w-72 bg-dashboard-sidebar border-r border-slate-800 flex flex-col h-screen sticky top-0 overflow-y-auto shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 ring-1 ring-white/10">
          <Train className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-base font-black tracking-tight text-white flex items-center gap-1.5 font-sans">
            RAILSYNC <span className="text-cyan-400">AI</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-medium leading-tight">
            Coordinated Maintenance & Crew Optimization
          </p>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <nav className="p-3 space-y-1 border-b border-slate-800">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 pb-1">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-blue-600/20 text-cyan-400 border border-cyan-500/40 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Maintenance Requests Section (Bottom Left) */}
      <div className="p-3 flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Requests Pool ({requests.length})
          </h2>
          <button
            onClick={() => setIsNewRequestModalOpen(true)}
            className="flex items-center gap-1 px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/50 text-[10px] font-bold transition shadow-sm"
          >
            <Plus className="w-3 h-3 text-cyan-400" />
            + NEW REQUEST
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 mb-2 overflow-x-auto pb-1 no-scrollbar">
          {['All', 'Civil', 'S&T', 'Electrical', 'High Priority'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap transition ${
                filter === f
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Requests List */}
        <div className="space-y-2 overflow-y-auto flex-1 pr-1 min-h-[220px]">
          {filteredRequests.map((req) => {
            const isTargetSection = req.section.startsWith('S2');
            return (
              <div
                key={req.id}
                className={`p-2.5 rounded-lg text-xs transition border ${
                  req.priority === 'High'
                    ? 'border-rose-500/50 bg-rose-950/20'
                    : isTargetSection && isBundled
                    ? 'border-cyan-500/40 bg-cyan-950/20'
                    : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase font-mono ${
                      req.priority === 'High'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : req.priority === 'Medium'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-slate-700/40 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {req.priority} PRIORITY
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{req.id}</span>
                </div>

                <div className="font-bold text-slate-200 text-xs mb-0.5 flex items-center justify-between">
                  <span>{req.department}</span>
                  <span
                    className={`text-[9px] font-semibold px-1 rounded ${
                      req.status === 'Bundled'
                        ? 'text-cyan-400 bg-cyan-950/60'
                        : req.status === 'Paused'
                        ? 'text-amber-400 bg-amber-950/60'
                        : 'text-slate-400'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 font-medium line-clamp-1 mb-1">
                  {req.work}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mb-1">{req.section}</div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800/80">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {req.duration} min
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {req.submittedAt || 'Today'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setActiveNav('requests')}
          className="w-full mt-2 py-1.5 rounded bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold transition"
        >
          VIEW ALL REQUESTS
        </button>
      </div>
    </aside>
  );
};
