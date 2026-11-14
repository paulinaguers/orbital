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

export type AppRoute =
  | { page: 'home' }
  | { page: 'body' }
  | { page: 'block'; blockId: string }
  | { page: 'circle' }
  | { page: 'alerts-info' };
