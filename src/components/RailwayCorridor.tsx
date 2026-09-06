import React from 'react';
import { Train as TrainType, DemoStep, CorridorSection } from '../types';
import { Train, AlertTriangle, ShieldCheck, CheckCircle2, Navigation, ArrowRight, Zap, RefreshCw } from 'lucide-react';

interface RailwayCorridorProps {
  sections: CorridorSection[];
  trains: TrainType[];
  currentStep: DemoStep;
  rerouteMode: 'REROUTE' | 'SHIFT';
}

export const RailwayCorridor: React.FC<RailwayCorridorProps> = ({
  sections,
  trains,
  currentStep,
  rerouteMode,
}) => {
  const isConflict = currentStep === 'DISRUPTION_INJECTED';
  const isResolved = currentStep === 'AI_RESOLVED_REROUTE' || currentStep === 'AI_RESOLVED_SHIFT';
  const isBundled = currentStep !== 'UNOPTIMIZED_REQUESTS';

  const t205 = trains.find((t) => t.id === 'T205');
  const isT205Rerouted = isResolved && (rerouteMode === 'REROUTE' || currentStep === 'AI_RESOLVED_REROUTE');
  const isBlockShifted = isResolved && rerouteMode === 'SHIFT';

  return (
    <div className="glass-panel rounded-xl p-4 border border-slate-800 flex flex-col h-full relative overflow-hidden">
      {/* Top Title & Telemetry Status */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-bold tracking-wide text-white uppercase flex items-center gap-2">
            Railway Corridor Telemetry Schematic
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              SECR MAIN LINE
            </span>
          </h2>
        </div>

        {/* Dynamic Warning/Success Status Banner */}
        <div>
          {isConflict && (
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/50 text-xs font-bold animate-pulse glow-red">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>CONFLICT AT S2: TRAIN 205 + BLOCK B-02</span>
            </div>
          )}
          {isResolved && (
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 text-xs font-bold glow-emerald">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                {isT205Rerouted
                  ? 'RESOLVED: TRAIN T205 REROUTED VIA LOOP L2'
                  : 'RESOLVED: BLOCK B-02 SHIFTED TO 16:15'}
              </span>
            </div>
          )}
          {!isConflict && !isResolved && (
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-slate-800 text-slate-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Corridor Telemetry Normal</span>
            </div>
          )}
        </div>
      </div>

      {/* SVG Interactive Railway Corridor Canvas */}
      <div className="my-4 bg-slate-950/90 rounded-xl p-4 border border-slate-800 relative min-h-[220px] flex flex-col justify-center shadow-inner">
        <svg className="w-full h-44 overflow-visible" viewBox="0 0 900 180">
          <defs>
            {/* Gradient definitions */}
            <linearGradient id="mainTrackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            <linearGradient id="loopTrackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            <linearGradient id="conflictGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* BACKGROUND MAIN LINE RAIL TRACK (Stations A -> B -> C -> D) */}
          {/* Main Track Line (Y = 90) */}
          <line x1="80" y1="90" x2="820" y2="90" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
          
          {/* Active section highlights */}
          <line x1="80" y1="90" x2="320" y2="90" stroke="#06b6d4" strokeWidth="3" opacity="0.7" />
          <line
            x1="320"
            y1="90"
            x2="580"
            y2="90"
            stroke={isConflict ? '#ef4444' : isBundled ? '#f59e0b' : '#06b6d4'}
            strokeWidth={isConflict ? '6' : '4'}
            className={isConflict ? 'animate-pulse' : ''}
          />
          <line x1="580" y1="90" x2="820" y2="90" stroke="#06b6d4" strokeWidth="3" opacity="0.7" />

          {/* ALTERNATE LOOP TRACK L2 (Parallel to S2: Station B -> Loop L2 -> Station C) */}
          <path
            d="M 320 90 Q 350 35, 450 35 Q 550 35, 580 90"
            fill="none"
            stroke={isT205Rerouted ? '#10b981' : '#475569'}
            strokeWidth={isT205Rerouted ? '5' : '2'}
            strokeDasharray={isT205Rerouted ? 'none' : '4 4'}
            filter={isT205Rerouted ? 'url(#glow)' : undefined}
          />

          {/* Loop Track label */}
          <text x="450" y="22" textAnchor="middle" fill={isT205Rerouted ? '#10b981' : '#64748b'} fontSize="11" fontWeight="bold" fontFamily="monospace">
            {isT205Rerouted ? '★ ALTERNATE LOOP LINE L2 (ACTIVE)' : 'LOOP LINE L2 (BYPASS)'}
          </text>

          {/* MAINTENANCE BLOCK ZONE ON SECTION S2 (B to C) */}
          {isBundled && !isBlockShifted && (
            <g transform="translate(390, 72)">
              <rect
                x="0"
                y="0"
                width="120"
                height="36"
                rx="6"
                fill={isConflict ? 'rgba(239, 68, 68, 0.25)' : 'rgba(245, 158, 11, 0.2)'}
                stroke={isConflict ? '#ef4444' : '#f59e0b'}
                strokeWidth="2"
                className={isConflict ? 'animate-pulse' : ''}
              />
              <text x="60" y="16" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                🚧 BLOCK B-02
              </text>
              <text x="60" y="29" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="monospace">
                14:00 – 16:00
              </text>
            </g>
          )}

          {/* STATIONS: A (Nagpur), B (Gondia), C (Rajnandgaon), D (Durg) */}
          {/* Station A */}
          <g transform="translate(80, 90)">
            <circle r="9" fill="#0f172a" stroke="#06b6d4" strokeWidth="3" />
            <circle r="3" fill="#06b6d4" />
            <text x="0" y="30" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Nagpur (NGP)</text>
            <text x="0" y="44" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">KM 0</text>
          </g>

          {/* Station B */}
          <g transform="translate(320, 90)">
            <circle r="9" fill="#0f172a" stroke="#06b6d4" strokeWidth="3" />
            <circle r="3" fill="#06b6d4" />
            <text x="0" y="30" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Gondia (G)</text>
            <text x="0" y="44" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">KM 42</text>
          </g>

          {/* Station C */}
          <g transform="translate(580, 90)">
            <circle r="9" fill="#0f172a" stroke="#06b6d4" strokeWidth="3" />
            <circle r="3" fill="#06b6d4" />
            <text x="0" y="30" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Rajnandgaon (RJN)</text>
            <text x="0" y="44" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">KM 107</text>
          </g>

          {/* Station D */}
          <g transform="translate(820, 90)">
            <circle r="9" fill="#0f172a" stroke="#06b6d4" strokeWidth="3" />
            <circle r="3" fill="#06b6d4" />
            <text x="0" y="30" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Durg (DURG)</text>
            <text x="0" y="44" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">KM 138</text>
          </g>

          {/* SECTION LABELS */}
          <text x="200" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="monospace">Section S1</text>
          <text x="450" y="125" textAnchor="middle" fill={isConflict ? '#fca5a5' : '#94a3b8'} fontSize="10" fontWeight="bold" fontFamily="monospace">
            Section S2 {isConflict ? '(CONFLICT OVERLAP!)' : ''}
          </text>
          <text x="700" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="monospace">Section S3</text>

          {/* TRAIN MOVING BADGES */}
          {/* Train T101 (Vande Bharat) - past S2 */}
          <g transform="translate(720, 75)">
            <rect x="-35" y="-12" width="70" height="24" rx="12" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">🚆 T101 (VB)</text>
          </g>

          {/* Train T205 (Express) - KEY TRAIN OF DEMO */}
          {/* Position changes based on conflict/reroute step! */}
          <g
            transform={
              isT205Rerouted
                ? 'translate(450, 22)' // Rerouted onto Loop Track L2!
                : isConflict
                ? 'translate(360, 75)' // Pushing directly into Section S2 Block B-02!
                : 'translate(230, 75)' // Approaching Section S1
            }
            className="transition-all duration-700 ease-in-out"
          >
            <rect
              x="-45"
              y="-14"
              width="90"
              height="28"
              rx="6"
              fill={isConflict ? '#dc2626' : isT205Rerouted ? '#059669' : '#2563eb'}
              stroke={isConflict ? '#f87171' : isT205Rerouted ? '#34d399' : '#60a5fa'}
              strokeWidth="2"
              className={isConflict ? 'animate-pulse' : ''}
              filter="url(#glow)"
            />
            <text x="0" y="2" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="extrabold">
              🚆 T205 Express
            </text>
            <text
              x="0"
              y="22"
              textAnchor="middle"
              fill={isConflict ? '#fca5a5' : isT205Rerouted ? '#a7f3d0' : '#bfdbfe'}
              fontSize="8"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {isConflict ? '+45m DELAY ⚠️' : isT205Rerouted ? 'VIA LOOP L2 ✓' : 'ON TIME'}
            </text>
          </g>
        </svg>
      </div>

      {/* Corridor Legend & Key Takeaways */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
        <div className="p-2 rounded bg-slate-900/60 border border-slate-800 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400" />
          <span className="text-slate-300 font-mono">Main Line S1-S3: Active Traffic</span>
        </div>
        <div className="p-2 rounded bg-slate-900/60 border border-slate-800 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className="text-slate-300 font-mono">Loop L2: Bypass Reroute Track</span>
        </div>
        <div className="p-2 rounded bg-slate-900/60 border border-slate-800 flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-amber-500" />
          <span className="text-slate-300 font-mono">Block B-02: 14:00 - 16:00</span>
        </div>
      </div>
    </div>
  );
};
