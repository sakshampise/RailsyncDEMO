import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { OngoingMaintenanceTable } from '../OngoingMaintenanceTable';
import { CorridorMap } from '../CorridorMap';
import { Activity, ShieldCheck, Clock, Users } from 'lucide-react';

export const OngoingMaintenanceView: React.FC = () => {
  const { stepNumber, isBundled, isContributorActive, isDisruptionActive } = useSimulation();

  return (
    <div className="space-y-4 flex-1 select-none">
      {/* View Header */}
      <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-base font-black text-white uppercase tracking-wide flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Live Track Possessions & Ongoing Operations
          </h1>
          <p className="text-xs text-slate-400">
            Real-time track possession monitoring, active work orders, and corridor safety.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            Corridor Safety: 100%
          </span>
          <span className="px-3 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold">
            Active Possessions: 3
          </span>
        </div>
      </div>

      {/* Corridor Map */}
      <div className="min-h-[260px]">
        <CorridorMap />
      </div>

      {/* Ongoing Table */}
      <div className="min-h-[280px]">
        <OngoingMaintenanceTable />
      </div>
    </div>
  );
};
