# RailSync AI — AI-Powered Railway Maintenance & Traffic Optimization

RailSync AI is an intelligent railway operations and traffic optimization platform designed to solve the critical problem of fragmented track possession and scheduling conflicts in railway networks.

![RailSync AI Command Center](https://raw.githubusercontent.com/ruturaj1457/RAILSYNC-AI/main/public/preview.png)

## 🚆 Key Features

- **Rail Corridor Overview**: Real-time interactive corridor schematic (Station A → Station B → Station C → Station D) with train markers, section statuses, and dynamic loop line bypass routing.
- **Shadow Bundling Engine**: Clusters compatible multi-department maintenance tasks (Civil, S&T, Electrical) into a single master block (3 jobs → 1 block), cutting track possession time by up to 66%.
- **Optimized Maintenance Timeline (Gantt Schedule)**: Visual schedule breakdown displaying bundled tasks and live slot allotment.
- **Predictive Block Overrun Risk Model**: Stochastic risk score gauge based on weather, machinery age, crew reliability, and junction traffic.
- **What-If Disruption Simulator**: Inject train delays and weather disruptions with automated AI contingency rescheduling (Loop Line Rerouting vs. Window Shifting).
- **Interactive 5-Step Demo Stepper**: Step-by-step guided story mode for presentations and evaluations.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti
- **State & Simulation**: React Context State Machine with live telemetry updates
- **Design System**: Dark High-Tech Command Center theme (`#0b1120`, `#111c30`, cyber-cyan, emerald, amber, crimson)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ruturaj1457/RAILSYNC-AI.git
cd RAILSYNC-AI

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📋 Core Presentation Story

1. **Step 1: Maintenance Requests Arrive** — Uncoordinated pool of requests across Civil, S&T, and Electrical.
2. **Step 2: Shadow Bundling** — Compatible requests on Section S2 are clustered into Block `B-02`.
3. **Step 3: Optimal Slot Allotment** — Low-congestion window `14:00–16:00` scheduled on timeline.
4. **Step 4: Inject Disruption** — Train 205 delayed by 45 min upstream, causing imminent conflict on S2.
5. **Step 5: AI Reschedule & Reroute** — Train 205 rerouted via Loop Line siding; conflict resolved with 0 delay penalty.

---

## 📄 License

MIT License. Designed for railway maintenance and traffic optimization demonstration.
