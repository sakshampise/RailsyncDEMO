import React from 'react';
import { DemoStep, Train as TrainType } from '../types';
import { Wrench, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface RailCorridorOverviewProps {
  currentStep: DemoStep;
  trains: TrainType[];
  rerouteMode: 'REROUTE' | 'SHIFT';
}

export const RailCorridorOverview: React.FC<RailCorridorOverviewProps> = ({
  currentStep,
  trains,
  rerouteMode,
}) => {
  const isBundled = currentStep !== 'UNOPTIMIZED_REQUESTS';
  const isConflict = currentStep === 'DISRUPTION_INJECTED';
  const isResolved = currentStep === 'AI_RESOLVED_REROUTE' || currentStep === 'AI_RESOLVED_SHIFT';
  const isT205Rerouted = isResolved && (rerouteMode === 'REROUTE' || currentStep === 'AI_RESOLVED_REROUTE');

  return (
    <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between relative overflow-hidden h-full">
      {/* Title Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans">
          Rail Corridor Overview
        </h2>

        {/* Dynamic Telemetry Pill */}
        {isConflict ? (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            S2 CONFLICT: TRAIN 205 + BLOCK B-02
          </span>
        ) : isResolved ? (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <CheckCircle2 className="w-3.5 h-3.5" />
            RESOLVED: LOOP L2 REROUTE ACTIVE
          </span>
        ) : (
          <span className="text-[10px] font-mono text-slate-400">
            Section S2 Traffic Active
          </span>
        )}
      </div>

      {/* SVG Railway Schematic (Matching screenshot) */}
      <div className="my-2 bg-slate-950/70 rounded-xl p-3 border border-slate-800/80 relative min-h-[190px] flex items-center justify-center">
        <svg className="w-full h-40 overflow-visible" viewBox="0 0 850 160">
          <defs>
            <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* MAIN TRACK (Station A -> B -> C -> D) */}
          <line x1="70" y1="80" x2="780" y2="80" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />

          {/* Section A-B (Green) */}
          <line x1="70" y1="80" x2="280" y2="80" stroke="#10b981" strokeWidth="4" />

          {/* Section S2 (B-C) - Colored Red during Block or Conflict, Green when normal */}
          <line
            x1="280"
            y1="80"
            x2="570"
            y2="80"
            stroke={isConflict ? '#ef4444' : isBundled ? '#ef4444' : '#10b981'}
            strokeWidth={isConflict ? '6' : '4'}
            className={isConflict ? 'animate-pulse' : ''}
          />

          {/* Section C-D (Green) */}
          <line x1="570" y1="80" x2="780" y2="80" stroke="#10b981" strokeWidth="4" />

          {/* ALTERNATE LOOP LINE L2 (Parallel to Section S2 for rerouting) */}
          <path
            d="M 280 80 Q 310 25, 425 25 Q 540 25, 570 80"
            fill="none"
            stroke={isT205Rerouted ? '#10b981' : '#334155'}
            strokeWidth={isT205Rerouted ? '4' : '2'}
            strokeDasharray={isT205Rerouted ? 'none' : '4 4'}
            filter={isT205Rerouted ? 'url(#glowGreen)' : undefined}
          />
          {isT205Rerouted && (
            <text x="425" y="16" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="monospace">
              ★ LOOP LINE L2 (REROUTE ACTIVE)
            </text>
          )}

          {/* MAINTENANCE BLOCK HIGHLIGHT BOX ON SECTION S2 (Dotted Yellow Rectangle from Screenshot) */}
          {isBundled && (
            <g transform="translate(365, 50)">
              <rect
                x="0"
                y="0"
                width="120"
                height="60"
                rx="8"
                fill={isConflict ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.15)'}
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="5 3"
                className={isConflict ? 'animate-pulse' : ''}
              />
              <text x="60" y="18" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                S2
              </text>
              <text x="60" y="34" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                Maintenance Block
              </text>
              <text x="60" y="48" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontFamily="monospace">
                14:00 - 16:00
              </text>
            </g>
          )}

          {/* STATIONS: A, B, C, D (Matching screenshot circle markers) */}
          {/* Station A */}
          <g transform="translate(70, 80)">
            <circle r="12" fill="#0f172a" stroke="#10b981" strokeWidth="3" />
            <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">A</text>
            <text x="0" y="30" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Station A</text>
            <text x="0" y="44" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">0 km</text>
          </g>

          {/* Station B */}
          <g transform="translate(280, 80)">
            <circle r="12" fill="#0f172a" stroke="#ef4444" strokeWidth="3" />
            <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">B</text>
            <text x="0" y="30" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Station B</text>
            <text x="0" y="44" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">25 km</text>
          </g>

          {/* Station C */}
          <g transform="translate(570, 80)">
            <circle r="12" fill="#0f172a" stroke="#ef4444" strokeWidth="3" />
            <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">C</text>
            <text x="0" y="30" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Station C</text>
            <text x="0" y="44" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">52 km</text>
          </g>

          {/* Station D */}
          <g transform="translate(780, 80)">
            <circle r="12" fill="#0f172a" stroke="#10b981" strokeWidth="3" />
            <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">D</text>
            <text x="0" y="30" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Station D</text>
            <text x="0" y="44" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">78 km</text>
          </g>

          {/* TRAIN BADGES & ICONS (Matching screenshot positions & layout) */}

          {/* Train 301 (Vande Bharat) - Top left A-B */}
          <g transform="translate(170, 52)">
            <rect x="-35" y="-12" width="70" height="22" rx="4" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1" />
            <text x="0" y="2" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Train 301</text>
            <text x="0" y="24" textAnchor="middle" fill="#60a5fa" fontSize="8">Vande Bharat</text>
          </g>

          {/* Train 101 (Vande Bharat) - Bottom left A-B */}
          <g transform="translate(140, 115)">
            <rect x="-35" y="-12" width="70" height="22" rx="4" fill="#065f46" stroke="#10b981" strokeWidth="1" />
            <text x="0" y="2" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Train 101</text>
            <text x="0" y="24" textAnchor="middle" fill="#34d399" fontSize="8">Vande Bharat • On Time</text>
          </g>

          {/* Train 404 (Freight) - Bottom mid B */}
          <g transform="translate(260, 125)">
            <text x="0" y="0" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Train 404</text>
            <text x="0" y="12" textAnchor="middle" fill="#34d399" fontSize="8">Freight • On Time</text>
          </g>

          {/* Train 205 (Express) - KEY DEMO TRAIN (Top middle S2) */}
          <g
            transform={
              isT205Rerouted
                ? 'translate(425, 22)' // Rerouted onto Loop Track L2!
                : isConflict
                ? 'translate(425, 52)' // Delayed & Conflict on Section S2 Block B-02!
                : 'translate(425, 52)'
            }
            className="transition-all duration-700 ease-in-out"
          >
            <rect
              x="-45"
              y="-14"
              width="90"
              height="26"
              rx="6"
              fill={isConflict ? '#991b1b' : isT205Rerouted ? '#065f46' : '#1e3a8a'}
              stroke={isConflict ? '#ef4444' : isT205Rerouted ? '#34d399' : '#3b82f6'}
              strokeWidth="2"
              className={isConflict ? 'animate-pulse' : ''}
              filter={isConflict ? 'url(#glowRed)' : undefined}
            />
            <text x="0" y="2" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="black">
              Train 205
            </text>
            <text
              x="0"
              y="22"
              textAnchor="middle"
              fill={isConflict ? '#fca5a5' : isT205Rerouted ? '#a7f3d0' : '#93c5fd'}
              fontSize="9"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              {isConflict ? 'Express • +45 min Delay' : isT205Rerouted ? 'Express • Via Loop L2' : 'Express • On Time'}
            </text>
          </g>

          {/* Train 307 (Express) - Top right C-D */}
          <g transform="translate(670, 52)">
            <rect x="-35" y="-12" width="70" height="22" rx="4" fill="#065f46" stroke="#10b981" strokeWidth="1" />
            <text x="0" y="2" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Train 307</text>
            <text x="0" y="24" textAnchor="middle" fill="#34d399" fontSize="8">Express • On Time</text>
          </g>

          {/* Train 508 (Express) - Bottom right C-D */}
          <g transform="translate(680, 115)">
            <rect x="-35" y="-12" width="70" height="22" rx="4" fill="#065f46" stroke="#10b981" strokeWidth="1" />
            <text x="0" y="2" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Train 508</text>
            <text x="0" y="24" textAnchor="middle" fill="#34d399" fontSize="8">Express • On Time</text>
          </g>
        </svg>
      </div>

      {/* Corridor Footer Legend */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Normal Track
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Active Maintenance Block
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Dotted Corridor Zone
          </span>
        </div>
        <span className="font-mono text-cyan-400 font-bold">Corridor: 78 km (Stations A - D)</span>
      </div>
    </div>
  );
};
