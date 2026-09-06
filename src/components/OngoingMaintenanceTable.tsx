import React from 'react';
import { DemoStep } from '../types';

interface OngoingMaintenanceTableProps {
  currentStep: DemoStep;
}

export const OngoingMaintenanceTable: React.FC<OngoingMaintenanceTableProps> = ({ currentStep }) => {
  const isBundled = currentStep !== 'UNOPTIMIZED_REQUESTS';

  const orders = [
    {
      woId: 'WO-101',
      section: 'S1 (A-B)',
      blockId: 'B-01',
      type: 'Track Replacement',
      start: '24 May 10:00',
      end: '24 May 12:30',
      progress: 60,
      status: 'In Progress',
    },
    {
      woId: 'WO-102',
      section: 'S2 (B-C)',
      blockId: 'B-02',
      type: isBundled ? 'Bundled (Civil + S&T + Elec)' : 'Signal Inspection',
      start: '24 May 14:00',
      end: '24 May 16:00',
      progress: 40,
      status: 'In Progress',
    },
    {
      woId: 'WO-103',
      section: 'S3 (C-D)',
      blockId: 'B-04',
      type: 'OHE Inspection',
      start: '24 May 15:30',
      end: '24 May 17:00',
      progress: 30,
      status: 'In Progress',
    },
  ];

  return (
    <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between h-full select-none">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
        <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans">
          Ongoing Maintenance (3)
        </h2>
      </div>

      <div className="overflow-x-auto my-1">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="text-[10px] text-slate-400 border-b border-slate-800 font-sans uppercase">
              <th className="pb-2 font-bold">WO ID</th>
              <th className="pb-2 font-bold">Section</th>
              <th className="pb-2 font-bold">Block ID</th>
              <th className="pb-2 font-bold">Type</th>
              <th className="pb-2 font-bold">Started At</th>
              <th className="pb-2 font-bold">Expected End</th>
              <th className="pb-2 font-bold min-w-[100px]">Progress</th>
              <th className="pb-2 font-bold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {orders.map((o) => (
              <tr key={o.woId} className="hover:bg-slate-900/40">
                <td className="py-2 font-bold text-white">{o.woId}</td>
                <td className="py-2 font-sans text-[11px]">{o.section}</td>
                <td className="py-2 text-cyan-400 font-bold">{o.blockId}</td>
                <td className="py-2 font-sans text-[11px] text-slate-200">{o.type}</td>
                <td className="py-2 text-slate-400 text-[10px]">{o.start}</td>
                <td className="py-2 text-slate-400 text-[10px]">{o.end}</td>
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-cyan-400"
                        style={{ width: `${o.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{o.progress}%</span>
                  </div>
                </td>
                <td className="py-2 text-right font-sans text-[11px]">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="w-full mt-2 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition">
        VIEW ALL ONGOING
      </button>
    </div>
  );
};
