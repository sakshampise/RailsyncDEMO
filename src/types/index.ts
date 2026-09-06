export type Department = 'Civil' | 'S&T' | 'Electrical';
export type Priority = 'High' | 'Medium' | 'Low';
export type RequestStatus = 'Pending' | 'Bundled' | 'Scheduled' | 'In Progress' | 'Paused' | 'Completed';

export interface MaintenanceRequest {
  id: string;
  department: Department;
  section: string; // e.g. "S2 (KM 120-145)"
  work: string; // e.g. "Emergency Rail Joint Inspection"
  duration: number; // in minutes
  priority: Priority;
  status: RequestStatus;
  compatibleWith?: string[];
  description?: string;
  submittedAt?: string;
  crewName?: string;
}

export type DemoStep = 
  | '01_NEW_REQUEST'
  | '02_SHADOW_BUNDLING'
  | '03_CREW_CONTRIBUTION'
  | '04_INJECT_DELAY';

export interface DemoStepInfo {
  id: DemoStep;
  stepNumber: number;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface CrewContributionState {
  taskAId: string;
  taskAName: string;
  taskADepartment: Department;
  taskACrew: string;
  taskAInitialProgress: number; // 50%
  taskACurrentProgress: number; // 80%
  taskAStatus: string;
  contributorCrew: string; // "Crew B (S&T Team)"
  contributorWorkers: number; // 2 technicians
  taskBId: string;
  taskBName: string;
  taskBDepartment: Department;
  taskBCrew: string;
  taskBCheckpointProgress: number; // 60%
  taskBStatus: string; // "Checkpointed — Resume in Next Slot"
  taskBNote: string;
}

export interface DisruptionPauseState {
  isDisruptionActive: boolean;
  disruptionType: string;
  disruptionMessage: string;
  taskAStatus: 'PAUSED FOR NOW';
  preservedProgress: number; // 80%
  remainingProgress: number; // 20%
  nextAvailableSlot: string; // "Slot B-07, Tomorrow 09:00 - 10:00"
  handbackStatus: string;
  reason: string;
}

export interface CorridorSection {
  id: string; // "S1", "S2", "S3"
  name: string;
  startStation: string;
  endStation: string;
  distanceKm: number;
  status: 'Normal' | 'Bundled Maintenance' | 'Active Work' | 'Cleared Early';
}

export interface BundledBlockInfo {
  id: string; // "B-02"
  section: string; // "S2"
  window: string; // "14:00 - 16:00"
  durationMinutes: number; // 120 (or 180 min slot)
  unbundledDurationTotal: number; // 390
  savedMinutes: number; // 210
  savingsPercentage: number; // 54%
  tasks: string[]; // Request IDs
}
