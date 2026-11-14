// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import type { HealthLevel, OrbitalStatus } from '../types/orbital';

export const MOCK_PASSENGER_ESCALATION_BY_LEVEL: Record<HealthLevel, string[]> =
  {
    green: [],
    yellow: [],
    orange: ['Flight crew', 'Ground medical team'],
    red: ['Flight crew', 'Ground medical team – URGENT'],
    not_evaluable: [],
  };

export const mockStatusPassenger: OrbitalStatus = {
  profile: 'passenger',
  simulated: true,
  astronaut: {
    id: 'P1',
    name: 'Robert Hale',
    role: 'Space passenger',
    mission: 'Orbital tourism flight (simulated)',
    flight_day: 2,
  },
  overall_level: 'yellow',
  overall_message: "You're doing great! Just one thing to look after.",
  escalation: {
    notified: [],
  },
  blocks: [
    {
      id: 'cardio',
      name: 'Heart & Breathing',
      level: 'green',
      nasa_risk: [],
      recommendation: 'Your heart and lungs are working well.',
      simple_explanation: 'Your heart and lungs are working well.',
      indicators: [
        {
          id: 'blood_pressure',
          name: 'Blood pressure',
          systolic: 122,
          diastolic: 78,
          unit: 'mmHg',
          level: 'green',
          threshold_source: '',
        },
        {
          id: 'heart_rate',
          name: 'Resting heart rate',
          value: 68,
          unit: 'bpm',
          level: 'green',
          threshold_source: '',
        },
        {
          id: 'spo2',
          name: 'SpO₂',
          value: 98,
          unit: '%',
          level: 'green',
          threshold_source: '',
        },
      ],
    },
    {
      id: 'sleep_cognition',
      name: 'Sleep & Energy',
      level: 'yellow',
      nasa_risk: [],
      recommendation: 'You slept a bit less than usual. Try to rest tonight.',
      simple_explanation:
        'You slept a bit less than usual. Try to rest tonight.',
      indicators: [
        {
          id: 'sleep_hours',
          name: 'Sleep',
          value: 6.4,
          unit: 'h',
          level: 'yellow',
          threshold_source: '',
        },
      ],
    },
    {
      id: 'metabolic',
      name: 'Energy from Food',
      level: 'green',
      nasa_risk: [],
      recommendation: 'Your body is getting the energy it needs.',
      simple_explanation: 'Your body is getting the energy it needs.',
      indicators: [
        {
          id: 'glucose',
          name: 'Glucose',
          value: 96,
          unit: 'mg/dL',
          level: 'green',
          threshold_source: '',
        },
      ],
    },
    {
      id: 'environment',
      name: 'Cabin Air & Space',
      level: 'green',
      nasa_risk: [],
      recommendation: 'The air and your surroundings are safe.',
      simple_explanation: 'The air and your surroundings are safe.',
      indicators: [
        {
          id: 'cabin_co2',
          name: 'Cabin CO₂',
          value: 1.9,
          unit: 'mmHg',
          level: 'green',
          threshold_source: '',
        },
        {
          id: 'radiation_dose',
          name: 'Cumulative radiation',
          value: 0.8,
          unit: 'mSv',
          level: 'green',
          threshold_source: '',
        },
      ],
    },
    {
      id: 'mental_health',
      name: 'How You Feel',
      level: 'green',
      nasa_risk: [],
      recommendation: "You're in a good mood. Enjoy the view!",
      simple_explanation: "You're in a good mood. Enjoy the view!",
      indicators: [
        {
          id: 'mood_score',
          name: 'Mood',
          value: 1,
          unit: '/10 (10 = worst)',
          level: 'green',
          threshold_source: '',
        },
      ],
    },
  ],
  tests: [
    {
      id: 'checkin',
      name: 'Daily check-in',
      route: '/mental/checkin',
      frequency_days: 1,
      last_done_flight_day: 1,
      next_due_flight_day: 2,
      due: true,
      overdue: false,
    },
  ],
  rewards: {
    stars: 2,
    streak_days: 1,
  },
};
