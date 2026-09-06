import React from 'react';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
import { Sidebar } from './components/Sidebar';
import { TopKPIHeader } from './components/TopKPIHeader';
import { NewRequestModal } from './components/NewRequestModal';
import { CommandCenterView } from './components/views/CommandCenterView';
import { MaintenanceRequestsView } from './components/views/MaintenanceRequestsView';
import { OngoingMaintenanceView } from './components/views/OngoingMaintenanceView';
import { CrewContributionView } from './components/views/CrewContributionView';
import { ShadowBundlingView } from './components/views/ShadowBundlingView';
import { ReportsView } from './components/views/ReportsView';

const MainContent: React.FC = () => {
  const { activeNav } = useSimulation();

  return (
    <div className="flex h-screen bg-dashboard-dark text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Command Workspace */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto p-4 space-y-4">
        {/* Top Header with 4-Stage Stepper */}
        <TopKPIHeader />

        {/* Dynamic Views */}
        {activeNav === 'command' && <CommandCenterView />}
        {activeNav === 'requests' && <MaintenanceRequestsView />}
        {activeNav === 'ongoing' && <OngoingMaintenanceView />}
        {activeNav === 'contributor' && <CrewContributionView />}
        {activeNav === 'optimization' && <ShadowBundlingView />}
        {activeNav === 'reports' && <ReportsView />}
      </div>

      {/* New Request Modal */}
      <NewRequestModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SimulationProvider>
      <MainContent />
    </SimulationProvider>
  );
};

export default App;
