// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import type { HealthLevel, Indicator, OrbitalStatus } from '../types/orbital';
import { mockStatus } from './mockStatus';

const DEMO_MODE = true;

export const LEVEL_STYLES: Record<
  HealthLevel,
  {
    color: string;
    label: string;
    surfaceBg: string;
    surfaceBorder: string;
    textColor: string;
    pillTextColor: string;
  }
> = {
  green: {
    color: '#2ECC71',
    label: 'Green',
    surfaceBg: 'rgba(46, 204, 113, 0.12)',
    surfaceBorder: 'rgba(46, 204, 113, 0.35)',
    textColor: '#58D68D',
    pillTextColor: '#052E16',
  },
  yellow: {
    color: '#F1C40F',
    label: 'Yellow',
    surfaceBg: 'rgba(241, 196, 15, 0.12)',
    surfaceBorder: 'rgba(241, 196, 15, 0.38)',
    textColor: '#F4D03F',
    pillTextColor: '#0F172A',
  },
  orange: {
    color: '#E67E22',
    label: 'Orange',
    surfaceBg: 'rgba(230, 126, 34, 0.14)',
    surfaceBorder: 'rgba(230, 126, 34, 0.42)',
    textColor: '#EB984E',
    pillTextColor: '#0F172A',
  },
  red: {
    color: '#E74C3C',
    label: 'Red',
    surfaceBg: 'rgba(231, 76, 60, 0.16)',
    surfaceBorder: 'rgba(231, 76, 60, 0.48)',
    textColor: '#EC7063',
    pillTextColor: '#FFFFFF',
  },
};

export function getDemoStatus(): OrbitalStatus {
  return mockStatus;
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
