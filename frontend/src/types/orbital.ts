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
  mood_vas: number;
  fatigue_vas: number;
  stress_vas: number;
  workload_vas: number;
}

export type AppRoute =
  | { page: 'home' }
  | { page: 'body' }
  | { page: 'block'; blockId: string }
  | { page: 'mental-checkin' }
  | { page: 'mental-journal' }
  | { page: 'mental-breathing' }
  | { page: 'action'; blockId: string; actionTitle: string }
  | { page: 'circle' }
  | { page: 'alerts-info' };
