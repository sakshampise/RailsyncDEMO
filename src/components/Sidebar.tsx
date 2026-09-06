import React, { useState } from 'react';
import {
  Train,
  LayoutDashboard,
  Wrench,
  Activity,
  Radio,
  Sparkles,
  Sliders,
  BarChart3,
  Settings,
  Plus,
  Clock,
  Calendar,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { MaintenanceRequest, DemoStep, Department } from '../types';

interface SidebarProps {
  requests: MaintenanceRequest[];
  currentStep: DemoStep;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  onOptimize: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  requests,
  currentStep,
  activeNav,
  setActiveNav,
  onOptimize,
}) => {
  const [filter, setFilter] = useState<string>('All');
  const isBundled = currentStep !== 'UNOPTIMIZED_REQUESTS';

  const navItems = [
    { id: 'command', label: 'Command Center', icon: LayoutDashboard },
    { id: 'requests', label: 'Maintenance Requests', icon: Wrench },
    { id: 'ongoing', label: 'Ongoing Maintenance', icon: Activity },
    { id: 'trains', label: 'Train Monitor', icon: Radio },
    { id: 'optimization', label: 'AI Optimization', icon: Sparkles },
    { id: 'whatif', label: 'What-If Simulator', icon: Sliders },
    { id: 'reports', label: 'Reports & Insights', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
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
            AI-Powered Railway Maintenance & Traffic Optimization
          </p>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <nav className="p-3 space-y-1 border-b border-slate-800">
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
              {item.id === 'command' && (
                <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Maintenance Requests Section (Matching Screenshot Bottom Left) */}
      <div className="p-3 flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
            Maintenance Requests (27)
          </h2>
          <button className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-600/30 text-cyan-300 hover:bg-blue-600/50 border border-cyan-500/40 text-[10px] font-bold">
            <Plus className="w-3 h-3" />
            NEW REQUEST
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 mb-2 overflow-x-auto pb-1 no-scrollbar">
          {['All', 'Civil', 'S&T', 'Electrical', 'High Priority'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-1 rounded text-[10px] font-semibold whitespace-nowrap transition ${
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
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className={`p-2.5 rounded-lg bg-slate-900/80 border text-xs transition ${
                req.section === 'S2' && isBundled
                  ? 'border-cyan-500/50 bg-cyan-950/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase font-mono ${
                    req.priority === 'High'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  }`}
                >
                  {req.priority}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Req ID: {req.id}</span>
              </div>

              <div className="font-bold text-slate-200 text-xs mb-0.5">{req.department}</div>
              <div className="text-[11px] text-slate-400 truncate mb-1">
                {req.section} - {req.work}
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800/80">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {req.duration} min
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  24 May
                </span>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-2 py-1.5 rounded bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold transition">
          VIEW ALL REQUESTS
        </button>
      </div>
    </aside>
  );
};
