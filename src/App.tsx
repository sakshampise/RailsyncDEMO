import React, { useState, useEffect } from 'react';
import { DemoStep, MaintenanceRequest, Train } from './types';
import { INITIAL_REQUESTS, INITIAL_TRAINS } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { TopKPIHeader } from './components/TopKPIHeader';
import { RailCorridorOverview } from './components/RailCorridorOverview';
import { BlockRiskAnalysis } from './components/BlockRiskAnalysis';
import { OptimizedTimelineGantt } from './components/OptimizedTimelineGantt';
import { TrainPriorityMonitor } from './components/TrainPriorityMonitor';
import { OngoingMaintenanceTable } from './components/OngoingMaintenanceTable';
import { SimulatorControlWidget } from './components/SimulatorControlWidget';

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<DemoStep>('UNOPTIMIZED_REQUESTS');
  const [rerouteMode, setRerouteMode] = useState<'REROUTE' | 'SHIFT'>('REROUTE');
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<string>('command');
  const [weather, setWeather] = useState<string>('Heavy Rain');

  const [requests, setRequests] = useState<MaintenanceRequest[]>(INITIAL_REQUESTS);
  const [trains, setTrains] = useState<Train[]>(INITIAL_TRAINS);

  // Auto-play timer for 2-3 minute Judge walkthrough
  useEffect(() => {
    if (!isAutoPlay) return;

    let timer: NodeJS.Timeout;
    if (currentStep === 'UNOPTIMIZED_REQUESTS') {
      timer = setTimeout(() => handleOptimize(), 3500);
    } else if (currentStep === 'OPTIMIZED_BUNDLED') {
      timer = setTimeout(() => handleInjectDisruption(45, weather), 4500);
    } else if (currentStep === 'DISRUPTION_INJECTED') {
      timer = setTimeout(() => handleResolveDisruption('REROUTE'), 4500);
    } else if (currentStep === 'AI_RESOLVED_REROUTE' || currentStep === 'AI_RESOLVED_SHIFT') {
      timer = setTimeout(() => setIsAutoPlay(false), 5000);
    }

    return () => clearTimeout(timer);
  }, [isAutoPlay, currentStep]);

  // Handlers
  const handleOptimize = () => {
    setCurrentStep('OPTIMIZED_BUNDLED');
    setRequests((prev) =>
      prev.map((r) =>
        r.section === 'S2' && r.compatibleWith?.length
          ? { ...r, status: 'Bundled' }
          : r
      )
    );
  };

  const handleInjectDisruption = (delay: number = 45, w: string = weather) => {
    setCurrentStep('DISRUPTION_INJECTED');
    setWeather(w);
    setTrains((prev) =>
      prev.map((t) =>
        t.id === 'T205'
          ? {
              ...t,
              delayMinutes: delay,
              status: 'Delayed',
            }
          : t
      )
    );
  };

  const handleResolveDisruption = (mode: 'REROUTE' | 'SHIFT' = 'REROUTE') => {
    setRerouteMode(mode);
    if (mode === 'REROUTE') {
      setCurrentStep('AI_RESOLVED_REROUTE');
      setTrains((prev) =>
        prev.map((t) =>
          t.id === 'T205'
            ? {
                ...t,
                currentSection: 'L2',
                route: ['S1', 'L2', 'S3'],
                status: 'Rerouted',
              }
            : t
        )
      );
    } else {
      setCurrentStep('AI_RESOLVED_SHIFT');
    }
  };

  const handleResetDemo = () => {
    setCurrentStep('UNOPTIMIZED_REQUESTS');
    setRerouteMode('REROUTE');
    setIsAutoPlay(false);
    setRequests(INITIAL_REQUESTS);
    setTrains(INITIAL_TRAINS);
  };

  return (
    <div className="flex h-screen bg-dashboard-dark text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-hidden">
      {/* Left Sidebar (Matching Screenshot) */}
      <Sidebar
        requests={requests}
        currentStep={currentStep}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onOptimize={handleOptimize}
      />

      {/* Main Command Center Workspace */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto p-4 space-y-4">
        {/* Top KPI Header Bar */}
        <TopKPIHeader
          currentStep={currentStep}
          setStep={setCurrentStep}
          resetDemo={handleResetDemo}
          isAutoPlay={isAutoPlay}
          toggleAutoPlay={() => setIsAutoPlay(!isAutoPlay)}
          onOptimize={handleOptimize}
          onInjectDisruption={() => handleInjectDisruption(45, weather)}
          onResolveDisruption={() => handleResolveDisruption('REROUTE')}
        />

        {/* Dashboard Main Grid Layout (Matching Screenshot exact composition) */}
        <div className="space-y-4 flex-1">
          {/* ROW 1: Rail Corridor Overview (8 cols) + Block Risk Analysis (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-[260px]">
            <div className="lg:col-span-8">
              <RailCorridorOverview
                currentStep={currentStep}
                trains={trains}
                rerouteMode={rerouteMode}
              />
            </div>
            <div className="lg:col-span-4">
              <BlockRiskAnalysis currentStep={currentStep} weather={weather} />
            </div>
          </div>

          {/* ROW 2: Optimized Maintenance Timeline (8 cols) + Train Priority Monitor (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-[300px]">
            <div className="lg:col-span-8">
              <OptimizedTimelineGantt
                currentStep={currentStep}
                rerouteMode={rerouteMode}
              />
            </div>
            <div className="lg:col-span-4">
              <TrainPriorityMonitor
                trains={trains}
                currentStep={currentStep}
                rerouteMode={rerouteMode}
              />
            </div>
          </div>

          {/* ROW 3: Ongoing Maintenance Table (8 cols) + Simulator Controls Widget (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-[240px]">
            <div className="lg:col-span-8">
              <OngoingMaintenanceTable currentStep={currentStep} />
            </div>
            <div className="lg:col-span-4">
              <SimulatorControlWidget
                currentStep={currentStep}
                onOptimize={handleOptimize}
                onInjectDisruption={handleInjectDisruption}
                onResolveDisruption={handleResolveDisruption}
                weather={weather}
                setWeather={setWeather}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
