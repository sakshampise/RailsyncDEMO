import React from 'react';
import { Clock, Users, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const OngoingMaintenanceTable: React.FC = () => {
  const { stepNumber, isBundled, isContributorActive, isDisruptionActive } = useSimulation();

  const getS2Row = () => {
    if (stepNumber === 1) {
      return {
        woId: 'WO-102',
        section: 'S2 (Gondia – RJN)',
        blockId: 'B-02 (Pending)',
        type: 'Emergency Rail Joint Inspection',
        start: 'Today 14:00',
        end: 'Today 17:00',
        progress: 0,
        progressLabel: 'Pending Block',
        status: 'Unbundled',
        statusColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      };
    }
    if (stepNumber === 2) {
      return {
        woId: 'WO-102',
        section: 'S2 (Gondia – RJN)',
        blockId: 'B-02',
        type: 'Bundled: Civil + S&T + Electrical',
        start: 'Today 14:00',
        end: 'Today 16:00',
        progress: 15,
        progressLabel: '15% (Prep)',
        status: 'Bundled & Scheduled',
        statusColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      };
    }
    if (stepNumber === 3) {
      return {
        woId: 'WO-102',
        section: 'S2 (Gondia – RJN)',
        blockId: 'B-02',
        type: 'Task A (80% Boosted) + Task B (60% Saved)',
        start: 'Today 14:00',
        end: 'Today 16:00',
        progress: 80,
        progressLabel: '80% (Accelerated)',
        status: 'Contributor Active',
        statusColor: 'bg-blue-500/10 text-cyan-300 border-cyan-500/30',
      };
    }
    // step 4
    return {
      woId: 'WO-102',
      section: 'S2 (Gondia – RJN)',
      blockId: 'B-02',
      type: 'Task A (80% Preserved) • 20% Queued',
      start: 'Today 14:00',
      end: 'Early Handback',
      progress: 80,
      progressLabel: '80% Preserved',
      status: 'PAUSED FOR NOW',
      statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-black',
    };
  };

  const s2Row = getS2Row();

  const orders = [
    {
      woId: 'WO-101',
      section: 'S1 (Nagpur – Gondia)',
      blockId: 'B-01',
      type: 'Electrical Transformer Maintenance',
      start: 'Today 11:30',
      end: 'Today 12:30',
      progress: 65,
      progressLabel: '65%',
      status: 'In Progress',
      statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    },
    s2Row,
    {
      woId: 'WO-103',
      section: 'S3 (RJN – Durg)',
      blockId: 'B-04',
      type: 'Routine Ballast Tamping',
      start: 'Today 15:30',
      end: 'Today 17:00',
      progress: 30,
      progressLabel: '30%',
      status: 'In Progress',
      statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    },
  ];

  return (
    <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between h-full select-none">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
        <div>
          <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans">
            Ongoing Maintenance Orders & Possessions ({orders.length})
          </h2>
          <p className="text-[10px] text-slate-400">
            Real-time track work status & possession occupancy
          </p>
        </div>

        <span className="text-[10px] font-mono text-cyan-400">
          Corridor Work Tracker
        </span>
      </div>

      <div className="overflow-x-auto my-1">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="text-[10px] text-slate-400 border-b border-slate-800 font-sans uppercase">
              <th className="pb-2 font-bold">WO ID</th>
              <th className="pb-2 font-bold">Corridor Section</th>
              <th className="pb-2 font-bold">Block ID</th>
              <th className="pb-2 font-bold">Work Scope</th>
              <th className="pb-2 font-bold">Window</th>
              <th className="pb-2 font-bold min-w-[120px]">Progress</th>
              <th className="pb-2 font-bold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {orders.map((o) => (
              <tr
                key={o.woId}
                className={`hover:bg-slate-900/40 transition ${
                  o.woId === 'WO-102' ? 'bg-slate-900/50 font-medium' : ''
                }`}
              >
                <td className="py-2.5 font-bold text-white">{o.woId}</td>
                <td className="py-2.5 font-sans text-[11px]">{o.section}</td>
                <td className="py-2.5 text-cyan-400 font-bold">{o.blockId}</td>
                <td className="py-2.5 font-sans text-[11px] text-slate-200">{o.type}</td>
                <td className="py-2.5 text-slate-400 text-[10px]">
                  {o.start} – {o.end}
                </td>
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          o.woId === 'WO-102' && stepNumber === 4
                            ? 'bg-emerald-400'
                            : o.woId === 'WO-102' && stepNumber === 3
                            ? 'bg-cyan-400'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${o.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-300">
                      {o.progressLabel}
                    </span>
                  </div>
                </td>
                <td className="py-2.5 text-right font-sans text-[11px]">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${o.statusColor}`}
                  >
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800 font-mono">
        <span>Section S2: {s2Row.status}</span>
        <span className="text-cyan-400">All possession windows logged with digital audit trail</span>
      </div>
    </div>
  );
};
