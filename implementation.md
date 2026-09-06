# RailSync AI --- Demo / Simulation Implementation Plan

## 1. Purpose

This document defines the **visual demo/simulation** to present the
RailSync AI concept to judges.

The goal is **not** to build the complete production railway system at
this stage.

The goal is to make the proposed product easy to understand visually:

> **Maintenance requests come in → RailSync finds an efficient
> maintenance window → compatible departmental work is bundled → train
> movements are considered → the resulting schedule is visualized → a
> disruption can be injected → the schedule adapts.**

The team's broader concept includes Shadow Bundling, Predictive Block
Overrun Risk, Dynamic Reinforcement Learning Rescheduling, Constraint
Optimization, and Discrete Event Simulation. This demo intentionally
represents those capabilities at a simple visual/simulation level first.

------------------------------------------------------------------------

# 2. Demo Scope

## 2.1 In Scope

The MVP demo should show:

1.  A pool of maintenance requests.
2.  Requests from Civil, S&T, and Electrical departments.
3.  A railway corridor with stations, sections, trains, and maintenance
    blocks.
4.  A timeline showing train movement and maintenance windows.
5.  AI selection of an efficient maintenance window.
6.  Shadow Bundling of compatible maintenance requests.
7.  Train priority and conflict awareness.
8.  A simple What-If disruption.
9.  A delayed train causing a conflict.
10. A visual AI response:
    -   reroute the train through an alternate/loop path, **or**
    -   shift the maintenance window.
11. Before/after visualization.

All data and results in this demo must be explicitly treated as
**illustrative/simulated**.

## 2.2 Not in Scope for the First Demo

Do not spend time initially implementing:

-   Real Indian Railways APIs
-   Live railway databases
-   User authentication
-   Production database architecture
-   Full reinforcement learning
-   Production-grade ML training
-   Full-scale railway network modeling
-   Real SMS/app notifications
-   Real deployment to railway infrastructure
-   Complex microservices

These can be added later if required.

------------------------------------------------------------------------

# 3. Core User Story

The demo should follow one simple story.

### Step 1 --- Requests arrive

The system receives several maintenance requests.

Example:

  ID     Department   Section   Work                  Duration Priority
  ------ ------------ --------- ------------------- ---------- ----------
  M001   Civil        S2        Track Replacement      120 min High
  M004   S&T          S2        Signal Inspection       45 min Medium
  M007   Electrical   S2        OHE Inspection          60 min Medium
  M010   Civil        S4        Sleeper Repair          90 min High

### Step 2 --- RailSync analyzes the requests

The system checks:

-   Which jobs affect the same section?
-   Which jobs can be performed during the same block?
-   Which time windows have lower train traffic?
-   Which trains would be affected?
-   What are the train priorities?
-   Is there enough time for the maintenance work?

### Step 3 --- Shadow Bundling

M001, M004, and M007 all affect S2.

The demo groups them into:

**B-02 --- Bundled Maintenance Block**

``` text
Section: S2
Window: 14:00–16:00

Civil        Track Replacement
S&T          Signal Inspection
Electrical   OHE Inspection
```

The key message:

> **3 departmental jobs → 1 traffic block**

### Step 4 --- Schedule visualization

The optimized schedule is shown on the timeline.

### Step 5 --- Disruption

A train is delayed by an illustrative amount, for example **45
minutes**.

The delayed train now conflicts with B-02.

### Step 6 --- AI response

The demo shows:

``` text
CONFLICT DETECTED

Evaluating alternatives...

1. Shift maintenance
2. Reroute train
3. Hold movement

Recommended:
Reroute via alternate/loop track
```

The train visually changes its path.

### Step 7 --- Result

The dashboard shows:

``` text
Conflict resolved
Maintenance continues
Train path updated
Network stable
```

------------------------------------------------------------------------

# 4. Dashboard Layout

The main screen should be a single **Railway Operations Command
Center**.

## Recommended layout

``` text
┌─────────────────────────────────────────────────────────────┐
│ RAILSYNC AI                         NETWORK: ● STABLE        │
├──────────────┬────────────────────────────────┬─────────────┤
│              │                                │             │
│ MAINTENANCE  │       RAIL CORRIDOR            │ AI DECISION │
│ REQUESTS     │                                │             │
│              │ A ── B ── S2 ── C ── D        │ Best Window │
│ Civil        │       🚆       🚆              │ 14:00-16:00 │
│ S&T          │             🚧                 │             │
│ Electrical   │                                │ 3 Jobs      │
│              │                                │ Bundled     │
├──────────────┴────────────────────────────────┴─────────────┤
│                                                             │
│              OPTIMIZED MAINTENANCE TIMELINE                 │
│                                                             │
│ Civil       ███████████                                    │
│ S&T         █████                                          │
│ Electrical  ██████                                         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ [ OPTIMIZE SCHEDULE ]       [ SIMULATE TRAIN DELAY ]       │
└─────────────────────────────────────────────────────────────┘
```

The supplied design can be used as the visual reference for the Command
Center.

------------------------------------------------------------------------

# 5. Main UI Components

## 5.1 Maintenance Request Pool

Display pending requests as cards or compact rows.

Each request should show:

-   Department
-   Section
-   Work type
-   Estimated duration
-   Priority
-   Request ID

Example:

``` text
HIGH
Civil
S2 — Track Replacement
120 min
REQ: M001
```

Useful controls:

-   All
-   Civil
-   S&T
-   Electrical
-   High Priority

The request pool represents the **Input Data Layer** of the proposed
architecture.

------------------------------------------------------------------------

## 5.2 Railway Corridor

Use a simple schematic railway corridor.

Example:

``` text
Station A ─── S1 ─── Station B ─── S2 ─── Station C ─── S3 ─── Station D
```

Show:

-   Stations
-   Track sections
-   Trains
-   Maintenance block
-   Optional loop/alternate track

Do not attempt to reproduce the complete Indian Railways network.

A small corridor is easier for judges to understand.

------------------------------------------------------------------------

## 5.3 Train Markers

Each train should show:

-   Train ID
-   Train type
-   Status
-   Priority

Example:

``` text
Train 205
Express
+45 min
Priority: High
```

Train priority should be represented as an input to the simulated
decision, not as a hardcoded rule that every important train must
automatically be rerouted.

------------------------------------------------------------------------

## 5.4 Maintenance Timeline

Use a simple Gantt-style timeline.

Example:

``` text
             12    13    14    15    16    17    18

S1                     ████

S2                           ┌─────────────┐
                             │ B-02        │
                             │ CIVIL       │
                             │ S&T         │
                             │ ELECTRICAL  │
                             └─────────────┘

S3                                      █████
```

The bundled block should be visually distinct.

------------------------------------------------------------------------

# 6. Optimize Interaction

The main interaction is:

## `OPTIMIZE SCHEDULE`

Before optimization:

``` text
Maintenance requests
        ↓
Uncoordinated windows
        ↓
Potential train conflicts
```

After clicking:

``` text
Analyzing requests...
Checking train movements...
Finding compatible maintenance...
Finding efficient window...
Generating schedule...
```

Then show the resulting schedule.

For the first visual prototype, the result may be predetermined rather
than calculated by a real optimization solver.

The interface should be designed so that the underlying logic can later
be replaced with OR-Tools/CP-SAT.

------------------------------------------------------------------------

# 7. Shadow Bundling Visualization

This is the most important visual feature.

## Before

``` text
Civil        ████████████

S&T                       █████

Electrical                         ██████
```

## After

``` text
Civil        ████████████
S&T          █████
Electrical   ██████
             └──────────┘
             ONE BLOCK
```

Show a label:

> **AI BUNDLED**

and:

> **3 departments coordinated**

This visually represents the Shadow Bundling concept.

------------------------------------------------------------------------

# 8. Train Conflict Visualization

When a maintenance block is created, check whether a train overlaps that
section/time.

If no conflict:

``` text
✓ No conflict
```

If there is a conflict:

``` text
⚠ CONFLICT DETECTED

Train 205
+
Maintenance Block B-02
+
Section S2
```

Highlight the relevant train and block.

------------------------------------------------------------------------

# 9. What-If Simulation

The What-If Simulator should be intentionally simple.

Controls:

``` text
TRAIN DELAY

0 ─────────●──────── 120 min
           45

WEATHER

○ Clear
○ Rain
○ Heavy Rain

[ INJECT DISRUPTION ]
```

The first version only needs to support one or two disruption scenarios.

Recommended primary scenario:

> **Train 205 delayed by 45 minutes**

------------------------------------------------------------------------

# 10. Dynamic Response Visualization

After disruption:

### State 1 --- Conflict

``` text
B ───────── 🚆 ───── 🚧 ───── C
                     S2

⚠ CONFLICT
```

### State 2 --- AI evaluation

``` text
AI RE-OPTIMIZING

✓ Conflict detected
✓ Alternatives evaluated
✓ Safety constraints checked
```

### State 3 --- Resolved

``` text
B ────────╮       🚧 ─────── C
          ╰─ 🚆 ─╯
             LOOP

✓ CONFLICT RESOLVED
```

The actual visual choice can be:

-   Reroute the train, or
-   Shift the maintenance block.

For the first demo, use the option that is easiest to visualize
convincingly.

------------------------------------------------------------------------

# 11. AI Decision Panel

Keep this extremely simple.

When a block is selected:

``` text
AI RECOMMENDATION

Recommended Window
14:00–16:00

Reason
✓ Low train congestion
✓ 3 compatible jobs
✓ High maintenance utilization
✓ No high-priority conflict

Result
3 jobs → 1 traffic block
```

This is not meant to expose the complete mathematical optimization
process.

It simply communicates **why the system selected the displayed result**.

------------------------------------------------------------------------

# 12. Optional Risk Visualization

The team's broader design includes a Predictive Block Overrun Risk
Model.

For the visual demo, show a simple card:

``` text
BLOCK RISK

B-02
Section S2

Overrun Risk
18%

LOW

Recommendation
Proceed with planned window
```

For a disruption scenario, this can change to:

``` text
Overrun Risk
82%

HIGH

Recommendation
Add 30 min buffer
```

The numbers are illustrative.

Do not claim they come from real railway historical data.

------------------------------------------------------------------------

# 13. Before / After Result

At the end of the demo, show a simple comparison.

``` text
              BEFORE       AFTER

Traffic Blocks    3    →      1
Conflicts         4    →      0
Maintenance Jobs  4    →      4
```

Any additional performance numbers must be generated from the simulator
or explicitly marked as illustrative.

The goal is to communicate:

> **The same maintenance work is coordinated with fewer disruptions.**

------------------------------------------------------------------------

# 14. Suggested Demo Data

Use one small fictional corridor.

## Stations

``` text
A — B — C — D
```

## Sections

``` text
S1 = A–B
S2 = B–C
S3 = C–D
```

## Trains

``` text
T101 — Vande Bharat — High Priority
T205 — Express — High Priority
T307 — Express — Medium Priority
T404 — Freight — Lower Priority
T508 — Express — Medium Priority
```

## Maintenance

``` text
M001 — Civil — S2 — Track Replacement — 120 min
M004 — S&T — S2 — Signal Inspection — 45 min
M007 — Electrical — S2 — OHE Inspection — 60 min
M010 — Civil — S4 — Sleeper Repair — 90 min
```

All of the above are **demo/simulation data**.

------------------------------------------------------------------------

# 15. Technical Structure

The first version can be extremely simple.

``` text
Frontend
   │
   ├── Request Pool
   ├── Railway Corridor
   ├── Timeline
   ├── AI Decision Panel
   └── What-If Controls
          │
          ▼
     Demo Logic Layer
          │
          ├── Bundle Requests
          ├── Select Time Window
          ├── Detect Conflict
          └── Apply Reroute/Shift
```

Recommended implementation options:

### Fastest

**React + Tailwind + local JSON**

or

**Streamlit + Python**

Choose the stack the team already knows.

Do not introduce a new framework just because it looks impressive.

------------------------------------------------------------------------

# 16. Data Model

A minimal request object:

``` json
{
  "id": "M001",
  "department": "Civil",
  "section": "S2",
  "work": "Track Replacement",
  "duration": 120,
  "priority": "High",
  "status": "Pending"
}
```

A minimal train object:

``` json
{
  "id": "T205",
  "type": "Express",
  "priority": "High",
  "section": "S2",
  "scheduledTime": "14:45",
  "delay": 45
}
```

A maintenance block:

``` json
{
  "id": "B02",
  "section": "S2",
  "start": "14:00",
  "end": "16:00",
  "requests": ["M001", "M004", "M007"]
}
```

------------------------------------------------------------------------

# 17. Build Order

## Phase 1 --- Visual MVP

**Target: first few hours**

Build:

-   Dashboard
-   Request cards
-   Railway corridor
-   Train markers
-   Maintenance timeline
-   Optimize button
-   Simulate Delay button

Use static/demo logic.

### Milestone

The complete story can be clicked through from start to finish.

------------------------------------------------------------------------

## Phase 2 --- Interaction

Add:

-   Request selection
-   Bundling animation
-   Schedule transition
-   Train conflict
-   Train reroute
-   Before/after result

### Milestone

A judge can interact with the demo without needing the team to manually
change the screen.

------------------------------------------------------------------------

## Phase 3 --- Intelligence Layer

Only after the visual demo works:

-   Replace hardcoded bundling with actual logic.
-   Add OR-Tools/CP-SAT optimization.
-   Add the overrun-risk model.
-   Add discrete-event simulation.

The team's original concept identifies these as the deeper
implementation layers.

------------------------------------------------------------------------

# 18. Team Split

For a five-person team:

### Person 1 --- UI

Dashboard, cards, layout, styling.

### Person 2 --- Corridor Visualization

Stations, trains, blocks, animations.

### Person 3 --- Scheduling Logic

Request bundling and time-slot selection.

### Person 4 --- Simulation

Delay injection, conflict detection, rerouting.

### Person 5 --- Integration

Data, state management, connecting components.

If the team is smaller, combine UI + corridor and scheduling +
simulation.

------------------------------------------------------------------------

# 19. Demo Script

The presentation should take approximately 2--3 minutes.

### 00:00 --- Requests

> "These are maintenance requests coming from different railway
> departments."

### 00:20 --- Optimize

Click:

**OPTIMIZE SCHEDULE**

> "Instead of treating these independently, RailSync looks for
> compatible work that can be performed during the same traffic block."

### 00:40 --- Bundle

Show:

> **Civil + S&T + Electrical → B-02**

### 01:00 --- Schedule

Show the optimized timeline.

> "The system selects a window while considering train movement and
> operational impact."

### 01:20 --- Disruption

Click:

**INJECT 45-MIN DELAY**

### 01:30 --- Conflict

Show:

> **Train 205 conflicts with B-02**

### 01:40 --- Response

Show the train taking the alternate route or the maintenance block
shifting.

### 02:00 --- Result

Show:

> **Conflict resolved. Maintenance continues.**

### 02:15 --- Close

> **"RailSync doesn't just schedule maintenance. It adapts the schedule
> when the railway changes."**

------------------------------------------------------------------------

# 20. Acceptance Criteria

The demo is ready when:

-   [ ] A judge can see all maintenance requests.
-   [ ] Requests from multiple departments are visible.
-   [ ] Compatible requests can be visually bundled.
-   [ ] A maintenance window is displayed.
-   [ ] Trains are visible on the affected corridor.
-   [ ] Train priority is visible.
-   [ ] A conflict can be demonstrated.
-   [ ] A delay can be injected.
-   [ ] The train route or maintenance window visibly changes.
-   [ ] The final state shows the conflict resolved.
-   [ ] The entire flow can be demonstrated in under 3 minutes.
-   [ ] No feature depends on real railway data.
-   [ ] Simulated/illustrative data is clearly identified.

------------------------------------------------------------------------

# 21. Definition of Done for the First Demo

**Do not wait for the AI backend.**

The first successful version is:

``` text
REQUESTS
   ↓
OPTIMIZE
   ↓
BUNDLE
   ↓
SCHEDULE
   ↓
TRAIN DELAY
   ↓
CONFLICT
   ↓
AI RESPONSE
   ↓
RESOLVED
```

If that flow works visually, the team has a usable judge demo.

The deeper optimization, ML, and simulation components can then be
progressively plugged into the same interface without redesigning the
product.
