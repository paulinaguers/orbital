// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

export type HealthLevel =
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'not_evaluable';
export type UserProfile = 'crew' | 'passenger';
export type DataSourceKind = 'api' | 'demo' | 'mock';
export type DemoScenario = 'healthy' | 'deterioration' | 'attention' | 'emergency';

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
  baseline_available?: boolean;
}

export interface HealthBlock {
  id: string;
  name: string;
  level: HealthLevel;
  nasa_risk: string[];
  recommendation: string;
  simple_explanation?: string;
  indicators: Indicator[];
}

export interface Escalation {
  notified: string[];
}

export interface ScheduledTest {
  id: string;
  name: string;
  route: string;
  frequency_days: number;
  last_done_flight_day: number;
  next_due_flight_day: number;
  due: boolean;
  overdue: boolean;
}

export interface Rewards {
  stars: number;
  streak_days: number;
}

export interface OrbitalStatus {
  profile?: UserProfile;
  simulated: boolean;
  astronaut: Astronaut;
  overall_level: HealthLevel;
  overall_message: string;
  escalation: Escalation;
  blocks: HealthBlock[];
  tests: ScheduledTest[];
  rewards: Rewards;
}

export interface NumericSeriesPoint {
  flight_day: number;
  value: number;
  level: HealthLevel;
  phase_label?: string;
}

export interface BloodPressureSeriesPoint {
  flight_day: number;
  systolic: number;
  diastolic: number;
  level: HealthLevel;
  phase_label?: string;
}

export interface VisionAmslerSeriesPoint {
  flight_day: number;
  result: 'No distortion' | 'Distortion reported';
  level: HealthLevel;
}

export interface NumericIndicatorSeries {
  indicator: string;
  baseline_mean?: number | null;
  baseline_low?: number | null;
  baseline_high?: number | null;
  points: NumericSeriesPoint[];
}

export interface BloodPressureIndicatorSeries {
  indicator: 'blood_pressure';
  baseline_mean_systolic?: number | null;
  baseline_low_systolic?: number | null;
  baseline_high_systolic?: number | null;
  baseline_mean_diastolic?: number | null;
  baseline_low_diastolic?: number | null;
  baseline_high_diastolic?: number | null;
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

export type PlaceholderSceneVariant =
  | 'sunrise'
  | 'earthlimb'
  | 'aurora'
  | 'moonrise';

export interface MomentPhoto {
  id: string;
  title: string;
  caption: string;
  flight_day: number;
  variant?: PlaceholderSceneVariant;
  imageUrl?: string;
  isLocal?: boolean;
}

export interface MomentsRightNow {
  altitude_km: number;
  speed_kmh: number;
  orbits_completed: number;
  sunrises_seen_today: number;
  sunrises_note: string;
  signal_time_min: number;
  fun_fact: string;
}

export interface MomentsData {
  simulated: boolean;
  right_now: MomentsRightNow;
  photos: MomentPhoto[];
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
  | { page: 'circle' }
  | { page: 'moments' }
  | { page: 'alerts-info' };
