import React, { useState, useEffect } from 'react';
import {
  Clock,
  Play,
  Pause,
  RefreshCw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Users,
  AlertCircle,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import { DEMO_STEPS } from '../data/mockData';

export const TopKPIHeader: React.FC = () => {
  const {
    currentStep,
    stepNumber,
    goToStep,
    nextStep,
    prevStep,
    resetDemo,
    isAutoPlay,
    toggleAutoPlay,
    requests,
    isBundled,
    isContributorActive,
    isDisruptionActive,
  } = useSimulation();

  const [timeStr, setTimeStr] = useState<string>('14:24:18');

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setTimeStr(d.toTimeString().split(' ')[0]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeStepInfo = DEMO_STEPS.find((s) => s.id === currentStep) || DEMO_STEPS[0];

  return (
    <header className="space-y-2">
      {/* Top KPI Metrics Bar */}
      <div className="bg-dashboard-card rounded-xl p-3 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* KPI Metrics */}
        <div className="flex items-center gap-5 overflow-x-auto no-scrollbar py-0.5">
          {/* Active Corridor */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Focus Corridor
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-sm font-black text-cyan-400 font-mono">Section S2</span>
              <span className="text-[10px] text-slate-400 font-mono">(KM 120-145)</span>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800" />

          {/* Pending / Bundled Requests */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Requests Status
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm font-black text-white">
                {isBundled ? '3 Bundled' : `${requests.length} In Pool`}
              </span>
              <Wrench className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800" />

          {/* Track Downtime Saved */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Track Availability Saved
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`text-sm font-black ${
                  isBundled ? 'text-emerald-400' : 'text-slate-500'
                }`}
              >
                {isBundled ? '+210 mins' : '0 mins'}
              </span>
              <TrendingUp
                className={`w-3.5 h-3.5 ${
                  isBundled ? 'text-emerald-400' : 'text-slate-600'
                }`}
              />
              {isBundled && (
                <span className="text-[9px] font-bold font-mono px-1 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  -54% Disruption
                </span>
              )}
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800" />

          {/* Crew Synergy / Contributor */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Crew Synergy
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`text-sm font-black ${
                  isContributorActive ? 'text-cyan-400' : 'text-slate-400'
                }`}
              >
                {isContributorActive ? '+30% Accelerated' : 'Autonomous'}
              </span>
              <Users
                className={`w-3.5 h-3.5 ${
                  isContributorActive ? 'text-cyan-400' : 'text-slate-600'
                }`}
              />
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800" />

          {/* Operational Safety / Overrun */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Safety & Corridor Handback
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-sm font-black text-emerald-400">100% Guaranteed</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Right Info & Live Simulator Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right font-mono hidden md:block">
            <div className="text-xs font-bold text-white flex items-center gap-1 justify-end">
              <Clock className="w-3 h-3 text-cyan-400" />
              {timeStr}
            </div>
            <div className="text-[10px] text-slate-400">Simulation Control</div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE SIMULATION
          </div>
        </div>
      </div>

      {/* 4-Stage Guided Stepper Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-2.5 rounded-xl border border-slate-800 flex flex-col gap-2">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Stepper Buttons (Exactly 4 Steps) */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 no-scrollbar">
            <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider shrink-0 mr-1">
              DEMO STORY:
            </span>

            {DEMO_STEPS.map((step) => {
              const isActive = currentStep === step.id;
              const isPast = stepNumber > step.stepNumber;
              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(step.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 font-black'
                      : isPast
                      ? 'bg-slate-800/90 text-cyan-300 border border-cyan-500/30 hover:bg-slate-800'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono font-black ${
                      isActive
                        ? 'bg-slate-950 text-cyan-400'
                        : isPast
                        ? 'bg-cyan-900 text-cyan-200'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {step.badge}
                  </span>
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>

          {/* Stepper Controls: Prev / Next / AutoPlay / Reset */}
          <div className="flex items-center gap-2 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex items-center gap-1">
              <button
                onClick={prevStep}
                disabled={stepNumber === 1}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                title="Previous Step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextStep}
                disabled={stepNumber === 4}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                title="Next Step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={toggleAutoPlay}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                isAutoPlay
                  ? 'bg-amber-400 text-slate-950 font-black animate-pulse'
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
              }`}
            >
              {isAutoPlay ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  Auto-Playing...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Auto-Play Judge Tour
                </>
              )}
            </button>

            <button
              onClick={resetDemo}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Reset Demo to Step 1"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Narrative Description Banner for the active step */}
        <div className="px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-bold text-cyan-300 uppercase font-mono">
              STAGE {activeStepInfo.stepNumber}: {activeStepInfo.subtitle}
            </span>
            <span className="text-slate-400 hidden sm:inline">—</span>
            <span className="text-slate-300 font-medium hidden sm:inline">
              {activeStepInfo.description}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 shrink-0">
            Step {stepNumber} of 4
          </span>
        </div>
      </div>
    </header>
  );
};
