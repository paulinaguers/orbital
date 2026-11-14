// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import type { OrbitalStatus } from '../types/orbital';

export const mockStatus: OrbitalStatus = {
  simulated: true,
  astronaut: {
    id: 'A1',
    name: 'Alex Rivera',
    role: 'Flight Engineer',
    mission: 'Mars transit (simulated)',
    flight_day: 42,
  },
  overall_level: 'yellow',
  overall_message: 'Mostly good today. Two areas need a little attention.',
  escalation: {
    notified: [],
  },
  blocks: [
    {
      id: 'cardio',
      name: 'Cardiorespiratory & Oxygenation',
      level: 'green',
      nasa_risk: [
        'NASA HRP: Cardiovascular Adaptations',
        'NASA HRP: Hypoxia',
      ],
      recommendation: 'All stable. Keep your routine.',
      indicators: [
        {
          id: 'blood_pressure',
          name: 'Blood pressure',
          systolic: 118,
          diastolic: 76,
          unit: 'mmHg',
          level: 'green',
          threshold_source: 'AHA',
        },
        {
          id: 'heart_rate',
          name: 'Resting heart rate',
          value: 64,
          unit: 'bpm',
          level: 'green',
          threshold_source: 'AHA',
        },
        {
          id: 'spo2',
          name: 'SpO₂',
          value: 97,
          unit: '%',
          level: 'green',
          threshold_source: 'WHO',
        },
      ],
    },
    {
      id: 'sleep_cognition',
      name: 'Sleep & Cognition',
      level: 'yellow',
      nasa_risk: ['NASA HRP: Inadequate Sleep and Irregular Schedules'],
      recommendation:
        'Short sleep last night. Protect your full sleep window tonight.',
      indicators: [
        {
          id: 'sleep_hours',
          name: 'Sleep',
          value: 6.4,
          unit: 'h',
          level: 'yellow',
          threshold_source: 'Sleep 2022 (ISS study)',
        },
        {
          id: 'pvt_lapses',
          name: 'Reaction test (PVT)',
          value: 2,
          unit: 'lapses',
          level: 'green',
          threshold_source: 'Personal baseline',
        },
      ],
    },
    {
      id: 'metabolic',
      name: 'Metabolic & Internal Balance',
      level: 'green',
      nasa_risk: ['CSA: Insulin resistance in spaceflight'],
      recommendation: 'Glucose in range. Keep your routine.',
      indicators: [
        {
          id: 'glucose',
          name: 'Glucose',
          value: 104,
          unit: 'mg/dL',
          level: 'green',
          threshold_source: 'ADA',
        },
      ],
    },
    {
      id: 'environment',
      name: 'Environment, Radiation & Vision',
      level: 'yellow',
      nasa_risk: [
        'NASA-STD-3001: Closed environment (CO₂)',
        'NASA HRP: Radiation',
        'NASA HRP: SANS',
      ],
      recommendation:
        'Cabin CO₂ slightly high. Check ventilation and log any headache.',
      indicators: [
        {
          id: 'cabin_co2',
          name: 'Cabin CO₂',
          value: 2.7,
          unit: 'mmHg',
          level: 'yellow',
          threshold_source: 'NASA-STD-3001',
        },
        {
          id: 'radiation_dose',
          name: 'Cumulative radiation',
          value: 42,
          unit: 'mSv',
          level: 'green',
          threshold_source: 'NASA-STD-3001 (career limit 600 mSv)',
        },
        {
          id: 'vision_amsler',
          name: 'Vision (Amsler grid)',
          value: 'No distortion',
          unit: '',
          level: 'green',
          threshold_source: 'Personal baseline',
        },
      ],
    },
    {
      id: 'mental_health',
      name: 'Mental Health',
      level: 'green',
      nasa_risk: ['NASA HRP: Behavioral Conditions'],
      recommendation: 'You are doing well. Keep checking in daily.',
      indicators: [
        {
          id: 'mood_score',
          name: 'Mood',
          value: 2,
          unit: '/10 (10 = worst)',
          level: 'green',
          threshold_source: 'Personal baseline',
        },
      ],
    },
  ],
};
