// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

export type HealthLevel = 'green' | 'yellow' | 'orange' | 'red';

export interface Astronaut {
  id: string;
  name: string;
  role: string;
  mission: string;
  flight_day: number;
}

export interface Indicator {
  id: string;
  name: string;
  value?: number | string;
  systolic?: number;
  diastolic?: number;
  unit: string;
  level: HealthLevel;
  threshold_source: string;
}

export interface HealthBlock {
  id: string;
  name: string;
  level: HealthLevel;
  nasa_risk: string[];
  recommendation: string;
  indicators: Indicator[];
}

export interface Escalation {
  notified: string[];
}

export interface OrbitalStatus {
  simulated: boolean;
  astronaut: Astronaut;
  overall_level: HealthLevel;
  overall_message: string;
  escalation: Escalation;
  blocks: HealthBlock[];
}

export interface NumericSeriesPoint {
  flight_day: number;
  value: number;
  level: HealthLevel;
}

export interface BloodPressureSeriesPoint {
  flight_day: number;
  systolic: number;
  diastolic: number;
  level: HealthLevel;
}

export interface VisionAmslerSeriesPoint {
  flight_day: number;
  result: 'No distortion' | 'Distortion reported';
  level: HealthLevel;
}

export interface NumericIndicatorSeries {
  indicator: string;
  baseline_mean: number;
  baseline_low: number;
  baseline_high: number;
  points: NumericSeriesPoint[];
}

export interface BloodPressureIndicatorSeries {
  indicator: 'blood_pressure';
  baseline_mean_systolic: number;
  baseline_low_systolic: number;
  baseline_high_systolic: number;
  baseline_mean_diastolic: number;
  baseline_low_diastolic: number;
  baseline_high_diastolic: number;
  points: BloodPressureSeriesPoint[];
}

export interface VisionAmslerIndicatorSeries {
  indicator: 'vision_amsler';
  points: VisionAmslerSeriesPoint[];
}

export type IndicatorSeries =
  | NumericIndicatorSeries
  | BloodPressureIndicatorSeries
  | VisionAmslerIndicatorSeries;

export interface SelfReportPayload {
  flight_day: number;
  mood_score: number;
  fatigue_score: number;
  stress_score: number;
  workload_score: number;
}

export interface AmslerResultPayload {
  flight_day: number;
  eye: 'right' | 'left';
  distortion: boolean;
  cells: Array<[number, number]>;
}

export interface PvtSessionPayload {
  flight_day: number;
  reaction_times_ms: number[];
  false_starts: number;
  duration_s: 60;
}

export interface CircleLink {
  status: 'offline' | 'connected';
  next_window_utc: string;
  window_duration_min: number;
  one_way_delay_min: number;
}

export type MessageDeliveryStatus = 'delivered' | 'queued' | 'sent';

export interface CircleMessage {
  id: string;
  sender: 'contact' | 'astronaut';
  text: string;
  timestamp: string;
  flight_day: number;
  deliveryStatus?: MessageDeliveryStatus;
}

export interface CircleContact {
  id: string;
  name: string;
  initials: string;
  relationship: string;
  unread: boolean;
  messages: CircleMessage[];
}

export interface CircleData {
  simulated: boolean;
  link: CircleLink;
  contacts: CircleContact[];
}

export type AppRoute =
  | { page: 'home' }
  | { page: 'body' }
  | { page: 'block'; blockId: string }
  | { page: 'mental-checkin' }
  | { page: 'mental-journal' }
  | { page: 'mental-breathing' }
  | { page: 'test-amsler' }
  | { page: 'test-pvt' }
  | { page: 'action'; blockId: string; actionTitle: string }
  | { page: 'circle' }
  | { page: 'alerts-info' };
