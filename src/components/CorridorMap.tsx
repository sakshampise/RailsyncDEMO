import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Wrench, ShieldCheck, AlertTriangle, Users, Clock, Sparkles } from 'lucide-react';

export const CorridorMap: React.FC = () => {
  const { currentStep, stepNumber, isBundled, isContributorActive, isDisruptionActive } =
    useSimulation();

  return (
    <div className="bg-dashboard-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between relative overflow-hidden h-full select-none">
      {/* Title Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans flex items-center gap-2">
            <span>Rail Corridor Topology & Active Possessions</span>
          </h2>
          <p className="text-[10px] text-slate-400">
            Nagpur – Durg Main Line (78 km Quad Track Corridor)
          </p>
        </div>

        {/* Dynamic State Pill */}
        {stepNumber === 1 && (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            SECTION S2: EMERGENCY INSPECTION REQUEST PENDING
          </span>
        )}
        {stepNumber === 2 && (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            SECTION S2: SHADOW BUNDLE B-02 ACTIVE (14:00 - 16:00)
          </span>
        )}
        {stepNumber === 3 && (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold bg-blue-500/20 text-cyan-300 border border-cyan-500/40">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            SECTION S2: CREW B ASSISTING CREW A (80% REACHED)
          </span>
        )}
        {stepNumber === 4 && (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            SECTION S2: PAUSED FOR NOW — TRACK HANDED BACK SAFELY
          </span>
        )}
      </div>

      {/* SVG Railway Schematic */}
      <div className="my-2 bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 relative min-h-[190px] flex items-center justify-center">
        <svg className="w-full h-44 overflow-visible" viewBox="0 0 850 160">
          <defs>
            <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glowAmber" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* MAIN LINE TRACK BED */}
          <line
            x1="70"
            y1="80"
            x2="780"
            y2="80"
            stroke="#1e293b"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Section S1: Station A -> Station B (Green normal) */}
          <line x1="70" y1="80" x2="280" y2="80" stroke="#10b981" strokeWidth="4" />

          {/* Section S2: Station B -> Station C */}
          {/* Dynamic stroke depending on demo step */}
          <line
            x1="280"
            y1="80"
            x2="570"
            y2="80"
            stroke={
              stepNumber === 1
                ? '#ef4444'
                : stepNumber === 2
                ? '#06b6d4'
                : stepNumber === 3
                ? '#3b82f6'
                : '#f59e0b'
            }
            strokeWidth={stepNumber >= 2 ? '6' : '4'}
            strokeDasharray={stepNumber === 4 ? '6 4' : 'none'}
            filter={stepNumber >= 2 ? 'url(#glowCyan)' : undefined}
          />

          {/* Section S3: Station C -> Station D (Green normal) */}
          <line x1="570" y1="80" x2="780" y2="80" stroke="#10b981" strokeWidth="4" />

          {/* SECTION S2 OVERLAYS ACCORDING TO STEP */}
          {stepNumber === 1 && (
            <g transform="translate(425, 42)">
              <rect
                x="-80"
                y="-15"
                width="160"
                height="32"
                rx="6"
                fill="#7f1d1d"
                stroke="#ef4444"
                strokeWidth="1.5"
                className="animate-pulse"
              />
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="10"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                ⚠ Urgent Defect (KM 132)
              </text>
              <text
                x="0"
                y="11"
                textAnchor="middle"
                fill="#fca5a5"
                fontSize="8"
                fontFamily="monospace"
              >
                Pending High-Priority Block
              </text>
            </g>
          )}

          {stepNumber === 2 && (
            <g transform="translate(365, 30)">
              <rect
                x="0"
                y="0"
                width="120"
                height="70"
                rx="8"
                fill="rgba(6, 182, 212, 0.15)"
                stroke="#06b6d4"
                strokeWidth="2"
                strokeDasharray="5 3"
              />
              <text
                x="60"
                y="18"
                textAnchor="middle"
                fill="#67e8f9"
                fontSize="11"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                ★ BUNDLED BLOCK B-02
              </text>
              <text
                x="60"
                y="34"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="10"
                fontWeight="bold"
              >
                Civil + S&T + Electrical
              </text>
              <text
                x="60"
                y="48"
                textAnchor="middle"
                fill="#38bdf8"
                fontSize="9"
                fontFamily="monospace"
              >
                14:00 - 16:00 (120 min)
              </text>
              <text
                x="60"
                y="61"
                textAnchor="middle"
                fill="#34d399"
                fontSize="8"
                fontWeight="bold"
                fontFamily="monospace"
              >
                Saved 210 min Track Time
              </text>
            </g>
          )}

          {stepNumber === 3 && (
            <g transform="translate(355, 30)">
              <rect
                x="0"
                y="0"
                width="140"
                height="70"
                rx="8"
                fill="rgba(59, 130, 246, 0.18)"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <text
                x="70"
                y="18"
                textAnchor="middle"
                fill="#93c5fd"
                fontSize="11"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                ★ CREW COLLABORATION
              </text>
              <text
                x="70"
                y="34"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="10"
                fontWeight="bold"
              >
                Crew A Assisted by Crew B
              </text>
              <text
                x="70"
                y="48"
                textAnchor="middle"
                fill="#67e8f9"
                fontSize="10"
                fontWeight="black"
                fontFamily="monospace"
              >
                Progress: 50% ➔ 80% ⚡
              </text>
              <text
                x="70"
                y="61"
                textAnchor="middle"
                fill="#cbd5e1"
                fontSize="8"
                fontFamily="monospace"
              >
                Crew B Checkpointed: 60%
              </text>
            </g>
          )}

          {stepNumber === 4 && (
            <g transform="translate(350, 30)">
              <rect
                x="0"
                y="0"
                width="150"
                height="70"
                rx="8"
                fill="rgba(245, 158, 11, 0.18)"
                stroke="#f59e0b"
                strokeWidth="2"
              />
              <text
                x="75"
                y="18"
                textAnchor="middle"
                fill="#fde047"
                fontSize="11"
                fontWeight="black"
                fontFamily="sans-serif"
              >
                ⏸ PAUSED FOR NOW
              </text>
              <text
                x="75"
                y="34"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="10"
                fontWeight="bold"
              >
                Track Handed Back Early
              </text>
              <text
                x="75"
                y="48"
                textAnchor="middle"
                fill="#34d399"
                fontSize="9"
                fontWeight="bold"
                fontFamily="monospace"
              >
                80% Preserved • 20% Queued
              </text>
              <text
                x="75"
                y="61"
                textAnchor="middle"
                fill="#cbd5e1"
                fontSize="8"
                fontFamily="monospace"
              >
                Resumes Slot B-07 (Tomorrow)
              </text>
            </g>
          )}

          {/* STATIONS: A, B, C, D */}
          {/* Station A */}
          <g transform="translate(70, 80)">
            <circle r="12" fill="#0f172a" stroke="#10b981" strokeWidth="3" />
            <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
              A
            </text>
            <text x="0" y="30" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
              Nagpur (NGP)
            </text>
            <text x="0" y="44" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
              KM 0
            </text>
          </g>

          {/* Station B */}
          <g transform="translate(280, 80)">
            <circle
              r="12"
              fill="#0f172a"
              stroke={stepNumber >= 2 ? '#06b6d4' : '#ef4444'}
              strokeWidth="3"
            />
            <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
              B
            </text>
            <text x="0" y="30" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
              Gondia (G)
            </text>
            <text x="0" y="44" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
              KM 42
            </text>
          </g>

          {/* Station C */}
          <g transform="translate(570, 80)">
            <circle
              r="12"
              fill="#0f172a"
              stroke={stepNumber >= 2 ? '#06b6d4' : '#ef4444'}
              strokeWidth="3"
            />
            <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
              C
            </text>
            <text x="0" y="30" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
              Rajnandgaon (RJN)
            </text>
            <text x="0" y="44" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
              KM 107
            </text>
          </g>

          {/* Station D */}
          <g transform="translate(780, 80)">
            <circle r="12" fill="#0f172a" stroke="#10b981" strokeWidth="3" />
            <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
              D
            </text>
            <text x="0" y="30" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
              Durg Jn (DURG)
            </text>
            <text x="0" y="44" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
              KM 138
            </text>
          </g>

          {/* TRAINS RUNNING SAFELY ON NORMAL SECTIONS */}
          {/* Train 101 - Section S1 */}
          <g transform="translate(170, 52)">
            <rect
              x="-35"
              y="-12"
              width="70"
              height="22"
              rx="4"
              fill="#065f46"
              stroke="#10b981"
              strokeWidth="1"
            />
            <text x="0" y="2" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
              VB 20826
            </text>
            <text x="0" y="22" textAnchor="middle" fill="#34d399" fontSize="8">
              On Time • 130 km/h
            </text>
          </g>

          {/* Train 307 - Section S3 */}
          <g transform="translate(680, 52)">
            <rect
              x="-35"
              y="-12"
              width="70"
              height="22"
              rx="4"
              fill="#065f46"
              stroke="#10b981"
              strokeWidth="1"
            />
            <text x="0" y="2" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
              EXP 18239
            </text>
            <text x="0" y="22" textAnchor="middle" fill="#34d399" fontSize="8">
              On Time • 85 km/h
            </text>
          </g>
        </svg>
      </div>

      {/* Schematic Footer Legend */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800 font-sans">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Normal Main Line
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Bundled Maintenance Possession
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Safe Early Handback (Paused)
          </span>
        </div>
        <span className="font-mono text-cyan-400 font-bold">
          Section S2: KM 120 – KM 145 Track Possession Window
        </span>
      </div>
    </div>
  );
};
