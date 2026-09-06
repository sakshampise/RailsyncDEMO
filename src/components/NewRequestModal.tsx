import React, { useState } from 'react';
import { X, Sparkles, AlertTriangle, ShieldCheck, Clock, FileText } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import { DEMO_EMERGENCY_REQUEST } from '../data/mockData';
import { Department, Priority } from '../types';

export const NewRequestModal: React.FC = () => {
  const { isNewRequestModalOpen, setIsNewRequestModalOpen, addRequest, goToStep } =
    useSimulation();

  const [work, setWork] = useState<string>('');
  const [department, setDepartment] = useState<Department>('Civil');
  const [section, setSection] = useState<string>('S2 (KM 120-145)');
  const [duration, setDuration] = useState<number>(180);
  const [priority, setPriority] = useState<Priority>('High');
  const [description, setDescription] = useState<string>('');

  if (!isNewRequestModalOpen) return null;

  const handleLoadDemoEmergency = () => {
    setWork(DEMO_EMERGENCY_REQUEST.work);
    setDepartment(DEMO_EMERGENCY_REQUEST.department);
    setSection(DEMO_EMERGENCY_REQUEST.section);
    setDuration(DEMO_EMERGENCY_REQUEST.duration);
    setPriority(DEMO_EMERGENCY_REQUEST.priority);
    setDescription(DEMO_EMERGENCY_REQUEST.description || '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!work.trim()) return;

    addRequest({
      work,
      department,
      section,
      duration: Number(duration) || 60,
      priority,
      description,
      crewName: `Crew ${department === 'Civil' ? 'A' : department === 'S&T' ? 'B' : 'C'} (${department})`,
    });

    setIsNewRequestModalOpen(false);
    // Reset form
    setWork('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in select-none">
      <div className="w-full max-w-lg bg-dashboard-card rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white tracking-wide uppercase font-sans">
                Submit Maintenance Block Request
              </h2>
              <p className="text-[11px] text-slate-400">
                Step 1: Maintenance Pool Registration
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsNewRequestModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Demo Helper Banner */}
        <div className="p-3 bg-cyan-950/40 border-b border-cyan-800/60 flex items-center justify-between gap-2">
          <div className="text-xs text-cyan-200">
            <span className="font-bold">SIH Demo Shortcut:</span> Click to auto-populate the High-Priority Emergency Joint Inspection request.
          </div>
          <button
            type="button"
            onClick={handleLoadDemoEmergency}
            className="px-2.5 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-[11px] font-black uppercase whitespace-nowrap shadow transition"
          >
            ★ Load Demo Emergency
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3.5 text-xs">
          {/* Work Name */}
          <div>
            <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider font-mono mb-1">
              Work Description / Task Title *
            </label>
            <input
              type="text"
              required
              value={work}
              onChange={(e) => setWork(e.target.value)}
              placeholder="e.g., Emergency Rail Joint Inspection"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          {/* Department & Section */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider font-mono mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as Department)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="Civil">Civil Engineering (Tracks)</option>
                <option value="S&T">S&T (Signals & Telemetry)</option>
                <option value="Electrical">Electrical (OHE / Traction)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider font-mono mb-1">
                Corridor Section
              </label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="S2 (KM 120-145)">Section S2 (Gondia – Rajnandgaon)</option>
                <option value="S1 (KM 45-60)">Section S1 (Nagpur – Gondia)</option>
                <option value="S3 (KM 160-175)">Section S3 (Rajnandgaon – Durg)</option>
              </select>
            </div>
          </div>

          {/* Duration & Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider font-mono mb-1">
                Duration (Minutes)
              </label>
              <input
                type="number"
                min="15"
                max="360"
                step="15"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider font-mono mb-1">
                Select Priority *
              </label>
              <div className="grid grid-cols-3 gap-1">
                {(['Low', 'Medium', 'High'] as Priority[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-black uppercase transition border ${
                      priority === p
                        ? p === 'High'
                          ? 'bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-600/30'
                          : p === 'Medium'
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-700 text-white border-slate-500'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider font-mono mb-1">
              Detailed Notes & Location Coordinates
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Track fissure identified at KM 132. Fishplate replacement required."
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsNewRequestModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition"
            >
              Submit to Request Pool
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
