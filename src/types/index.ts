export type Department = 'Civil' | 'S&T' | 'Electrical';
export type Priority = 'High' | 'Medium' | 'Low';
export type RequestStatus = 'Pending' | 'Bundled' | 'Scheduled' | 'Completed';

export interface MaintenanceRequest {
  id: string;
  department: Department;
  section: string; // e.g. "S2"
  work: string; // e.g. "Track Replacement"
  duration: number; // in minutes
  priority: Priority;
  status: RequestStatus;
  compatibleWith?: string[]; // IDs of other requests
  impactScore?: number;
}

export interface MaintenanceBlock {
  id: string; // e.g. "B-02"
  section: string; // "S2"
  startTime: string; // "14:00"
  endTime: string; // "16:00"
  requests: string[]; // Array of request IDs
  overrunRisk: number; // e.g. 18 (percentage)
  status: 'Draft' | 'Optimized' | 'Conflicted' | 'Rescheduled' | 'Active';
}

export type TrainType = 'Vande Bharat' | 'Express' | 'Freight' | 'Intercity';

export interface Train {
  id: string; // e.g. "T205"
  name: string; // e.g. "12833 Howrah Express"
  type: TrainType;
  priority: Priority;
  currentSection: string; // "S1", "S2", "S3", "L2" (Loop)
  targetSection: string;
  scheduledTimeS2: string; // e.g. "14:45"
  delayMinutes: number; // 0, 45, etc.
  route: string[]; // ["S1", "S2", "S3"] or ["S1", "L2", "S3"]
  status: 'On Time' | 'Delayed' | 'Rerouted' | 'Held';
  speedKmH: number;
}

export interface CorridorSection {
  id: string; // "S1", "S2", "S3"
  name: string;
  startStation: string;
  endStation: string;
  distanceKm: number;
  tracks: number;
  hasLoop: boolean;
}

export type DemoStep = 
  | 'UNOPTIMIZED_REQUESTS'   // Step 1: Initial pool of scattered requests
  | 'OPTIMIZED_BUNDLED'     // Step 2: AI Bundling B-02 (3 jobs -> 1 window)
  | 'DISRUPTION_INJECTED'   // Step 3: Train 205 delayed 45 min -> CONFLICT DETECTED
  | 'AI_RESOLVED_REROUTE'   // Step 4a: Train T205 rerouted via Loop L2
  | 'AI_RESOLVED_SHIFT';    // Step 4b: Maintenance block shifted to 16:15

export interface ScenarioMetrics {
  totalBlocks: number;
  unresolvedConflicts: number;
  totalMaintenanceJobs: number;
  trackDowntimeSavedMinutes: number;
  trainDelayMinutes: number;
  efficiencyScore: number;
}
