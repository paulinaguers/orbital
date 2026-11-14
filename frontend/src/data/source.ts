// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import type {
  AmslerResultPayload,
  CircleData,
  DataSourceKind,
  DemoScenario,
  HealthLevel,
  Indicator,
  IndicatorSeries,
  MomentsData,
  OrbitalStatus,
  PvtSessionPayload,
  SelfReportPayload,
  UserProfile,
} from '../types/orbital';
import { mockCircle } from './mockCircle';
import { mockMoments } from './mockMoments';
import { mockSeries } from './mockSeries';
import { mockSeriesPassenger } from './mockSeriesPassenger';
import { MOCK_ESCALATION_BY_LEVEL, mockStatus } from './mockStatus';
import {
  MOCK_PASSENGER_ESCALATION_BY_LEVEL,
  mockStatusPassenger,
} from './mockStatusPassenger';

export { MOCK_ESCALATION_BY_LEVEL, MOCK_PASSENGER_ESCALATION_BY_LEVEL };

interface DemoScenarioBundle {
  status: OrbitalStatus;
  series: Record<string, IndicatorSeries>;
}

interface DemoFileShape {
  default_scenario: string;
  scenarios: Record<string, DemoScenarioBundle>;
}

const API_BASE_URL = 'http://localhost:8000';
const API_TIMEOUT_MS = 1500;

const demoFiles = import.meta.glob('./demo.json', {
  eager: true,
  import: 'default',
});
const demoData = demoFiles['./demo.json'] as DemoFileShape | undefined;

const inMemorySelfReports: SelfReportPayload[] = [];
const inMemoryAmslerResults: AmslerResultPayload[] = [];
const inMemoryPvtSessions: PvtSessionPayload[] = [];

let currentScenario: DemoScenario = 'deterioration';
let currentCrewDataSource: DataSourceKind = demoData ? 'demo' : 'mock';

const dataSourceListeners = new Set<() => void>();
const statusUpdateListeners = new Set<(status: OrbitalStatus) => void>();

function notifyDataSourceListeners(): void {
  dataSourceListeners.forEach((listener) => listener());
}

function notifyStatusUpdateListeners(status: OrbitalStatus): void {
  statusUpdateListeners.forEach((listener) => listener(status));
}

function setCrewDataSource(next: DataSourceKind): void {
  if (currentCrewDataSource !== next) {
    currentCrewDataSource = next;
    notifyDataSourceListeners();
  }
}

export function subscribeDataSource(listener: () => void): () => void {
  dataSourceListeners.add(listener);
  return () => {
    dataSourceListeners.delete(listener);
  };
}

export function subscribeStatusUpdates(
  listener: (status: OrbitalStatus) => void,
): () => void {
  statusUpdateListeners.add(listener);
  return () => {
    statusUpdateListeners.delete(listener);
  };
}

export function getDataSourceKind(
  profile: UserProfile = 'crew',
): DataSourceKind {
  if (profile === 'passenger') {
    return 'mock';
  }
  return currentCrewDataSource;
}

export function getDataSourceLabel(profile: UserProfile = 'crew'): string {
  const kind = getDataSourceKind(profile);
  if (kind === 'api') {
    return 'Live core (API)';
  }
  if (kind === 'demo') {
    return 'Demo file';
  }
  return 'Mock data';
}

export function getCurrentScenario(): DemoScenario {
  return currentScenario;
}

function getDemoScenarioEntry(): DemoScenarioBundle | undefined {
  if (!demoData?.scenarios) {
    return undefined;
  }
  return (
    demoData.scenarios[currentScenario] ??
    demoData.scenarios[demoData.default_scenario] ??
    Object.values(demoData.scenarios)[0]
  );
}

function isOrbitalStatus(value: unknown): value is OrbitalStatus {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const candidate = value as Partial<OrbitalStatus>;
  return (
    Array.isArray(candidate.blocks) &&
    typeof candidate.astronaut?.id === 'string'
  );
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = API_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timer);
  }
}

export const LEVEL_STYLES: Record<
  HealthLevel,
  {
    color: string;
    label: string;
    statusSentence: string;
    surfaceBg: string;
    surfaceBorder: string;
    textColor: string;
    pillBg: string;
    pillTextColor: string;
    pillGlow?: string;
  }
> = {
  green: {
    color: '#2ECC71',
    label: 'Green · Normal',
    statusSentence: 'Within the expected range.',
    surfaceBg: 'rgba(46, 204, 113, 0.14)',
    surfaceBorder: 'rgba(46, 204, 113, 0.38)',
    textColor: '#58D68D',
    pillBg: 'rgba(46, 204, 113, 0.2)',
    pillTextColor: '#2ECC71',
  },
  yellow: {
    color: '#F1C40F',
    label: 'Yellow · Watch',
    statusSentence: 'Changing from your usual values. Keep an eye on it.',
    surfaceBg: 'rgba(241, 196, 15, 0.14)',
    surfaceBorder: 'rgba(241, 196, 15, 0.42)',
    textColor: '#F4D03F',
    pillBg: 'rgba(241, 196, 15, 0.2)',
    pillTextColor: '#F1C40F',
  },
  orange: {
    color: '#E67E22',
    label: 'Orange · Attention',
    statusSentence: 'Needs attention.',
    surfaceBg: 'rgba(230, 126, 34, 0.16)',
    surfaceBorder: 'rgba(230, 126, 34, 0.45)',
    textColor: '#EB984E',
    pillBg: 'rgba(230, 126, 34, 0.2)',
    pillTextColor: '#E67E22',
    pillGlow: '0 0 14px rgba(230, 126, 34, 0.45)',
  },
  red: {
    color: '#E74C3C',
    label: 'Red · Urgent',
    statusSentence: 'Urgent attention needed.',
    surfaceBg: 'rgba(231, 76, 60, 0.18)',
    surfaceBorder: 'rgba(231, 76, 60, 0.5)',
    textColor: '#F1948A',
    pillBg: 'rgba(231, 76, 60, 0.2)',
    pillTextColor: '#E74C3C',
    pillGlow: '0 0 16px rgba(231, 76, 60, 0.55)',
  },
};

export const INDICATOR_EXPLANATIONS: Record<
  string,
  { measures: string; matters: string; measuredWith: string }
> = {
  blood_pressure: {
    measures: 'Pressure of blood in your arteries.',
    matters:
      'Microgravity shifts fluids toward the head and changes how the heart and vessels work.',
    measuredWith: 'Wearable biomonitor (simulated)',
  },
  heart_rate: {
    measures: 'Heartbeats per minute at rest.',
    matters:
      'The heart adapts to microgravity; changes from your usual value can be an early sign.',
    measuredWith: 'Wearable biomonitor (simulated)',
  },
  spo2: {
    measures: 'How much oxygen your blood carries.',
    matters: 'Cabin pressure changes can cause mild hypoxia.',
    measuredWith: 'Wearable biomonitor (simulated)',
  },
  sleep_hours: {
    measures: 'Hours slept last night.',
    matters:
      'On the ISS astronauts sleep about 6 h on average, less than scheduled; short sleep lowers performance.',
    measuredWith: 'Wearable sleep tracking (simulated)',
  },
  pvt_lapses: {
    measures: 'Slow reactions (lapses) in a short attention test.',
    matters: 'Fatigue and lack of sleep slow your reactions.',
    measuredWith: 'In-app reaction test, based on the test used on the ISS',
  },
  glucose: {
    measures: 'Sugar level in your blood.',
    matters: "Spaceflight can reduce the body's response to insulin.",
    measuredWith: 'Onboard glucometer (simulated)',
  },
  cabin_co2: {
    measures: 'Carbon dioxide in the cabin air.',
    matters:
      'CO₂ builds up in closed habitats; crews reported symptoms at low levels.',
    measuredWith: 'Habitat air sensor (simulated)',
  },
  radiation_dose: {
    measures: 'Total radiation received so far in your career.',
    matters:
      'Space radiation raises long-term health risks; NASA sets a career limit.',
    measuredWith: 'Personal dosimeter (simulated)',
  },
  vision_amsler: {
    measures: 'Whether straight lines look wavy or missing.',
    matters: 'Many long-duration astronauts develop eye changes (SANS).',
    measuredWith:
      'In-app Amsler grid, one of the vision checks used on the ISS',
  },
  mood_score: {
    measures: 'How you rated your mood from 0 to 10 (10 = worst).',
    matters: 'Isolation and confinement affect mood and wellbeing.',
    measuredWith: 'Daily self check-in',
  },
};

export const DATA_SOURCE_GROUPS: Array<{
  group: 'Sensors' | 'In-app tests' | 'Self-report';
  items: Array<{ indicator: string; source: string }>;
}> = [
  {
    group: 'Sensors',
    items: [
      {
        indicator: 'Blood pressure, Resting heart rate, SpO₂',
        source: 'Wearable biomonitor (simulated)',
      },
      {
        indicator: 'Sleep',
        source: 'Wearable sleep tracking (simulated)',
      },
      {
        indicator: 'Glucose',
        source: 'Onboard glucometer (simulated)',
      },
      {
        indicator: 'Cabin CO₂',
        source: 'Habitat air sensor (simulated)',
      },
      {
        indicator: 'Cumulative radiation',
        source: 'Personal dosimeter (simulated)',
      },
    ],
  },
  {
    group: 'In-app tests',
    items: [
      {
        indicator: 'Reaction test (PVT)',
        source: 'In-app reaction test, based on the test used on the ISS',
      },
      {
        indicator: 'Vision (Amsler grid)',
        source: 'In-app Amsler grid, one of the vision checks used on the ISS',
      },
    ],
  },
  {
    group: 'Self-report',
    items: [
      {
        indicator: 'Mood, Fatigue, Stress, Workload',
        source: 'Daily self check-in',
      },
    ],
  },
];

export function getDemoStatus(profile: UserProfile = 'crew'): OrbitalStatus {
  if (profile === 'passenger') {
    return mockStatusPassenger;
  }
  return getDemoScenarioEntry()?.status ?? mockStatus;
}

export function getDemoCircleData(): CircleData {
  return mockCircle;
}

export function getDemoMomentsData(): MomentsData {
  return mockMoments;
}

export async function getStatus(
  profile: UserProfile = 'crew',
  astronautId?: string,
): Promise<OrbitalStatus> {
  if (profile === 'passenger') {
    return mockStatusPassenger;
  }

  const resolvedId = astronautId ?? 'A1';
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/astronauts/${encodeURIComponent(resolvedId)}/status`,
    );
    if (response.ok) {
      const data: unknown = await response.json();
      if (isOrbitalStatus(data)) {
        setCrewDataSource('api');
        return data;
      }
    }
  } catch {
    // Fall back to demoData or mockStatus
  }

  const demoEntry = getDemoScenarioEntry();
  if (demoEntry?.status) {
    setCrewDataSource('demo');
    return demoEntry.status;
  }

  setCrewDataSource('mock');
  return mockStatus;
}

export async function fetchOrbitalStatus(
  astronautId = 'A1',
  profile: UserProfile = 'crew',
): Promise<OrbitalStatus> {
  return getStatus(profile, astronautId);
}

export async function switchDemoScenario(
  scenario: DemoScenario,
): Promise<OrbitalStatus> {
  currentScenario = scenario;

  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/scenarios/${encodeURIComponent(scenario)}`,
      { method: 'POST' },
    );
    if (response.ok) {
      setCrewDataSource('api');
      const data: unknown = await response.json().catch(() => null);
      const nextStatus = isOrbitalStatus(data) ? data : await getStatus('crew');
      notifyStatusUpdateListeners(nextStatus);
      return nextStatus;
    }
  } catch {
    // API unavailable: switch demoData scenario locally
  }

  const demoEntry = getDemoScenarioEntry();
  if (demoEntry?.status) {
    setCrewDataSource('demo');
    notifyStatusUpdateListeners(demoEntry.status);
    return demoEntry.status;
  }

  setCrewDataSource('mock');
  notifyStatusUpdateListeners(mockStatus);
  return mockStatus;
}

export function getDemoSeries(
  indicatorId: string,
  profile: UserProfile = 'crew',
): IndicatorSeries | undefined {
  if (profile === 'passenger') {
    return mockSeriesPassenger[indicatorId];
  }
  return getDemoScenarioEntry()?.series?.[indicatorId] ?? mockSeries[indicatorId];
}

export async function getSeries(
  indicatorId: string,
  profile: UserProfile = 'crew',
  astronautId?: string,
): Promise<IndicatorSeries> {
  if (profile === 'passenger') {
    const series = mockSeriesPassenger[indicatorId];
    if (!series) {
      throw new Error(`No series data found for indicator "${indicatorId}"`);
    }
    return series;
  }

  const resolvedId = astronautId ?? 'A1';
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/astronauts/${encodeURIComponent(resolvedId)}/series/${encodeURIComponent(indicatorId)}`,
    );
    if (response.ok) {
      const data = (await response.json()) as IndicatorSeries;
      setCrewDataSource('api');
      return data;
    }
  } catch {
    // Fall back to demoData or mockSeries
  }

  const demoEntry = getDemoScenarioEntry();
  if (demoEntry?.series?.[indicatorId]) {
    setCrewDataSource('demo');
    return demoEntry.series[indicatorId];
  }

  if (!demoData) {
    setCrewDataSource('mock');
  }
  const fallback = mockSeries[indicatorId];
  if (!fallback) {
    throw new Error(`No series data found for indicator "${indicatorId}"`);
  }
  return fallback;
}

async function postSelfReportPayload(
  payload: SelfReportPayload | AmslerResultPayload | PvtSessionPayload,
  astronautId: string,
): Promise<OrbitalStatus | null> {
  if (astronautId === 'P1') {
    return null;
  }

  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/astronauts/${encodeURIComponent(astronautId)}/self_reports`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );
    if (response.ok) {
      setCrewDataSource('api');
      const data: unknown = await response.json().catch(() => null);
      if (isOrbitalStatus(data)) {
        notifyStatusUpdateListeners(data);
        return data;
      }
      if (
        data &&
        typeof data === 'object' &&
        isOrbitalStatus((data as { status?: unknown }).status)
      ) {
        const nested = (data as { status: OrbitalStatus }).status;
        notifyStatusUpdateListeners(nested);
        return nested;
      }
      const refreshed = await getStatus('crew', astronautId);
      notifyStatusUpdateListeners(refreshed);
      return refreshed;
    }
  } catch {
    // API unreachable: caller keeps in-memory behavior
  }

  return null;
}

export async function saveSelfReport(
  report: SelfReportPayload,
  astronautId = 'A1',
): Promise<OrbitalStatus | null> {
  const updated = await postSelfReportPayload(report, astronautId);
  if (updated) {
    return updated;
  }
  inMemorySelfReports.push({ ...report });
  return null;
}

export async function saveAmslerResult(
  result: AmslerResultPayload,
  astronautId = 'A1',
): Promise<OrbitalStatus | null> {
  const updated = await postSelfReportPayload(result, astronautId);
  if (updated) {
    return updated;
  }
  inMemoryAmslerResults.push({
    ...result,
    cells: result.cells.map(([r, c]) => [r, c]),
  });
  return null;
}

export async function savePvtSession(
  session: PvtSessionPayload,
  astronautId = 'A1',
): Promise<OrbitalStatus | null> {
  const updated = await postSelfReportPayload(session, astronautId);
  if (updated) {
    return updated;
  }
  inMemoryPvtSessions.push({
    ...session,
    reaction_times_ms: [...session.reaction_times_ms],
  });
  return null;
}

export function markTestCompletedInMemory(
  status: OrbitalStatus,
  testId: string,
): OrbitalStatus {
  return {
    ...status,
    tests: status.tests.map((test) =>
      test.id === testId
        ? {
            ...test,
            due: false,
            overdue: false,
            last_done_flight_day: status.astronaut.flight_day,
            next_due_flight_day:
              status.astronaut.flight_day + test.frequency_days,
          }
        : test,
    ),
    rewards: {
      ...status.rewards,
      stars: status.rewards.stars + 1,
    },
  };
}

export function formatIndicatorValue(indicator: Indicator): string {
  if (
    typeof indicator.systolic === 'number' &&
    typeof indicator.diastolic === 'number'
  ) {
    return `${indicator.systolic}/${indicator.diastolic}${indicator.unit ? ` ${indicator.unit}` : ''}`;
  }

  if (indicator.value === undefined) {
    return '—';
  }

  return `${indicator.value}${indicator.unit ? ` ${indicator.unit}` : ''}`;
}
