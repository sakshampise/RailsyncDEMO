import React from 'react';
import { CorridorMap } from '../CorridorMap';
import { MaintenanceTimeline } from '../MaintenanceTimeline';
import { OngoingMaintenanceTable } from '../OngoingMaintenanceTable';
import { ShadowBundleCard } from '../ShadowBundleCard';
import { CrewContributionPanel } from '../CrewContributionPanel';
import { DisruptionPausePanel } from '../DisruptionPausePanel';
import { useSimulation } from '../../context/SimulationContext';
import { Sparkles, Users, AlertTriangle, FilePlus } from 'lucide-react';

export const CommandCenterView: React.FC = () => {
  const { stepNumber, setIsNewRequestModalOpen } = useSimulation();

  return (
    <div className="space-y-4 flex-1">
      {/* Quick Stage Context Banner */}
      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-black px-2 py-0.5 rounded bg-cyan-500 text-slate-950">
            DEMO FLOW
          </span>
          <span className="text-slate-300 font-medium">
            {stepNumber === 1 && (
              <>
                <strong className="text-white">Step 1 (New Request):</strong> Emergency Rail Joint Inspection enters the pool with <strong className="text-rose-400">HIGH</strong> priority.
              </>
            )}
            {stepNumber === 2 && (
              <>
                <strong className="text-white">Step 2 (Shadow Bundling):</strong> RailSync clusters Civil, S&T, and Electrical into 1 coordinated window (<strong className="text-cyan-400">14:00 - 16:00</strong>).
              </>
            )}
            {stepNumber === 3 && (
              <>
                <strong className="text-white">Step 3 (Contributor Mode):</strong> Crew B assists Crew A: Task A advances from <strong className="text-amber-400">50% → 80%</strong>; Crew B checkpoint saved at <strong className="text-emerald-400">60%</strong>.
              </>
            )}
            {stepNumber === 4 && (
              <>
                <strong className="text-white">Step 4 (Inject Delay):</strong> Operational delay injected. Task A is <strong className="text-amber-400">PAUSED FOR NOW</strong> with <strong className="text-emerald-400">80% preserved</strong> and 20% rescheduled to next slot.
              </>
            )}
          </span>
        </div>

        {stepNumber === 1 && (
          <button
            onClick={() => setIsNewRequestModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase transition"
          >
            <FilePlus className="w-3.5 h-3.5" />
            + Submit New Request
          </button>
        )}
      </div>

      {/* ROW 1: Corridor Map (8 cols) + Shadow Bundle Card (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-[270px]">
        <div className="lg:col-span-8">
          <CorridorMap />
        </div>
        <div className="lg:col-span-4">
          <ShadowBundleCard />
        </div>
      </div>

      {/* ROW 2: Maintenance Timeline (8 cols) + Crew Contribution Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-[300px]">
        <div className="lg:col-span-8">
          <MaintenanceTimeline />
        </div>
        <div className="lg:col-span-4">
          <CrewContributionPanel />
        </div>
      </div>

      {/* ROW 3: Ongoing Maintenance Table (8 cols) + Disruption Pause Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-[250px]">
        <div className="lg:col-span-8">
          <OngoingMaintenanceTable />
        </div>
        <div className="lg:col-span-4">
          <DisruptionPausePanel />
        </div>
      </div>
    </div>
  );
};
