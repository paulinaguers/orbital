// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import type {
  AmslerResultPayload,
  CircleData,
  HealthLevel,
  Indicator,
  IndicatorSeries,
  OrbitalStatus,
  PvtSessionPayload,
  SelfReportPayload,
} from '../types/orbital';
import { mockCircle } from './mockCircle';
import { mockSeries } from './mockSeries';
import { MOCK_ESCALATION_BY_LEVEL, mockStatus } from './mockStatus';

export { MOCK_ESCALATION_BY_LEVEL };

const DEMO_MODE = true;
const inMemorySelfReports: SelfReportPayload[] = [];
const inMemoryAmslerResults: AmslerResultPayload[] = [];
const inMemoryPvtSessions: PvtSessionPayload[] = [];

export const LEVEL_STYLES: Record<
  HealthLevel,
  {
    color: string;
    label: string;
    statusSentence: string;
    surfaceBg: string;
    surfaceBorder: string;
    textColor: string;
    pillTextColor: string;
  }
> = {
  green: {
    color: '#2ECC71',
    label: 'Green · Normal',
    statusSentence: 'Within the expected range.',
    surfaceBg: 'rgba(46, 204, 113, 0.12)',
    surfaceBorder: 'rgba(46, 204, 113, 0.35)',
    textColor: '#58D68D',
    pillTextColor: '#052E16',
  },
  yellow: {
    color: '#F1C40F',
    label: 'Yellow · Watch',
    statusSentence: 'Changing from your usual values. Keep an eye on it.',
    surfaceBg: 'rgba(241, 196, 15, 0.12)',
    surfaceBorder: 'rgba(241, 196, 15, 0.38)',
    textColor: '#F4D03F',
    pillTextColor: '#0F172A',
  },
  orange: {
    color: '#E67E22',
    label: 'Orange · Attention',
    statusSentence: 'Needs attention.',
    surfaceBg: 'rgba(230, 126, 34, 0.14)',
    surfaceBorder: 'rgba(230, 126, 34, 0.42)',
    textColor: '#EB984E',
    pillTextColor: '#0F172A',
  },
  red: {
    color: '#E74C3C',
    label: 'Red · Urgent',
    statusSentence: 'Urgent attention needed.',
    surfaceBg: 'rgba(231, 76, 60, 0.16)',
    surfaceBorder: 'rgba(231, 76, 60, 0.48)',
    textColor: '#EC7063',
    pillTextColor: '#FFFFFF',
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

export function getDemoStatus(): OrbitalStatus {
  return mockStatus;
}

export function getDemoCircleData(): CircleData {
  return mockCircle;
}

export async function fetchOrbitalStatus(
  astronautId = 'A1',
): Promise<OrbitalStatus> {
  if (DEMO_MODE) {
    return mockStatus;
  }

  const response = await fetch(
    `http://localhost:8000/astronauts/${encodeURIComponent(astronautId)}/status`,
  );
  if (!response.ok) {
    throw new Error(`Status request failed with code ${response.status}`);
  }
  return (await response.json()) as OrbitalStatus;
}

export function getDemoSeries(
  indicatorId: string,
): IndicatorSeries | undefined {
  return mockSeries[indicatorId];
}

export async function getSeries(
  indicatorId: string,
  astronautId = 'A1',
): Promise<IndicatorSeries> {
  if (DEMO_MODE) {
    const series = mockSeries[indicatorId];
    if (!series) {
      throw new Error(`No series data found for indicator "${indicatorId}"`);
    }
    return series;
  }

  const response = await fetch(
    `http://localhost:8000/astronauts/${encodeURIComponent(astronautId)}/series/${encodeURIComponent(indicatorId)}`,
  );
  if (!response.ok) {
    throw new Error(`Series request failed with code ${response.status}`);
  }
  return (await response.json()) as IndicatorSeries;
}

export async function saveSelfReport(
  report: SelfReportPayload,
  astronautId = 'A1',
): Promise<void> {
  if (DEMO_MODE) {
    inMemorySelfReports.push({ ...report });
    return;
  }

  const response = await fetch(
    `http://localhost:8000/astronauts/${encodeURIComponent(astronautId)}/self_reports`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    },
  );
  if (!response.ok) {
    throw new Error(`Self-report request failed with code ${response.status}`);
  }
}

export async function saveAmslerResult(
  result: AmslerResultPayload,
  astronautId = 'A1',
): Promise<void> {
  if (DEMO_MODE) {
    inMemoryAmslerResults.push({
      ...result,
      cells: result.cells.map(([r, c]) => [r, c]),
    });
    return;
  }

  const response = await fetch(
    `http://localhost:8000/astronauts/${encodeURIComponent(astronautId)}/self_reports`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    },
  );
  if (!response.ok) {
    throw new Error(`Amsler test save failed with code ${response.status}`);
  }
}

export async function savePvtSession(
  session: PvtSessionPayload,
  astronautId = 'A1',
): Promise<void> {
  if (DEMO_MODE) {
    inMemoryPvtSessions.push({
      ...session,
      reaction_times_ms: [...session.reaction_times_ms],
    });
    return;
  }

  const response = await fetch(
    `http://localhost:8000/astronauts/${encodeURIComponent(astronautId)}/self_reports`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    },
  );
  if (!response.ok) {
    throw new Error(`PVT session save failed with code ${response.status}`);
  }
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
