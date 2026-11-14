// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import type { HealthLevel } from '../types/orbital';

export type TipLevel = Exclude<HealthLevel, 'green' | 'not_evaluable'>;

export interface TipStep {
  text: string;
  basis: 'nasa' | 'team';
}

export interface TipEntry {
  indicator: string;
  levels: TipLevel[];
  title: string;
  steps: TipStep[];
}

const SLEEP_BETTER_STEPS: TipStep[] = [
  {
    text: 'Keep your full scheduled sleep window (on the ISS, 8.5 h are scheduled).',
    basis: 'nasa',
  },
  {
    text: 'Switch cabin lights to the evening LED setting before sleeping.',
    basis: 'nasa',
  },
  {
    text: 'Avoid caffeine in the hours before your sleep window.',
    basis: 'team',
  },
  {
    text: 'Stop screens 30 minutes before sleeping; use your eye mask and earplugs.',
    basis: 'team',
  },
  {
    text: 'Retake the brief reaction test (PVT-inspired) tomorrow to see if you are recovering.',
    basis: 'team',
  },
];

const REPEAT_CARDIO_STEPS: TipStep[] = [
  {
    text: 'Wait 30 minutes without exercise or caffeine.',
    basis: 'nasa',
  },
  {
    text: 'Rest 5 minutes in silence, arm at heart level, cuff on bare skin, no talking.',
    basis: 'nasa',
  },
  {
    text: 'Take 2 readings 1 minute apart; ORBITAL uses the average.',
    basis: 'nasa',
  },
];

export const RED_HELP_ENTRY: TipEntry = {
  indicator: '*',
  levels: ['red'],
  title: 'Get help now',
  steps: [
    { text: 'Stop what you are doing.', basis: 'team' },
    {
      text: 'Your onboard doctor and the flight surgeon have been notified.',
      basis: 'team',
    },
    { text: 'A crewmate is on the way.', basis: 'team' },
  ],
};

export const SELF_CARE_TIPS: TipEntry[] = [
  {
    indicator: 'sleep_hours',
    levels: ['yellow', 'orange'],
    title: 'Sleep better tonight',
    steps: SLEEP_BETTER_STEPS,
  },
  {
    indicator: 'pvt_lapses',
    levels: ['yellow', 'orange'],
    title: 'Sleep better tonight',
    steps: SLEEP_BETTER_STEPS,
  },
  {
    indicator: 'cabin_co2',
    levels: ['yellow', 'orange'],
    title: 'Lower your CO₂ exposure',
    steps: [
      {
        text: 'Check that the ventilation near your workstation and sleep station is not blocked.',
        basis: 'team',
      },
      {
        text: 'Take breaks in better-ventilated modules when possible.',
        basis: 'team',
      },
      {
        text: 'Log any headache in your check-in: with a headache, this becomes an Orange alert.',
        basis: 'nasa',
      },
    ],
  },
  {
    indicator: 'mood_score',
    levels: ['yellow', 'orange'],
    title: 'Take care of your mood',
    steps: [
      {
        text: 'Write in your private journal.',
        basis: 'nasa',
      },
      {
        text: 'Spend a few minutes looking out the window or caring for the onboard plants.',
        basis: 'nasa',
      },
      {
        text: 'Send a message to someone in My Circle.',
        basis: 'team',
      },
      {
        text: 'Try the breathing exercise (3 minutes).',
        basis: 'team',
      },
    ],
  },
  {
    indicator: 'blood_pressure',
    levels: ['yellow', 'orange'],
    title: 'Repeat the measurement correctly',
    steps: REPEAT_CARDIO_STEPS,
  },
  {
    indicator: 'heart_rate',
    levels: ['yellow', 'orange'],
    title: 'Repeat the measurement correctly',
    steps: REPEAT_CARDIO_STEPS,
  },
  {
    indicator: 'spo2',
    levels: ['yellow', 'orange'],
    title: 'Check your oxygen again',
    steps: [
      {
        text: 'Repeat the measurement at rest.',
        basis: 'team',
      },
      {
        text: 'Watch for headache, confusion, vision changes or poor sleep, and log them.',
        basis: 'nasa',
      },
    ],
  },
  {
    indicator: 'glucose',
    levels: ['yellow', 'orange'],
    title: 'Check your glucose again',
    steps: [
      {
        text: 'Repeat the measurement and follow your planned meals.',
        basis: 'team',
      },
      {
        text: 'Log symptoms such as shakiness, sweating or unusual thirst.',
        basis: 'team',
      },
    ],
  },
  {
    indicator: 'vision_amsler',
    levels: ['yellow', 'orange'],
    title: 'Repeat the vision test',
    steps: [
      {
        text: 'Repeat the Amsler test one eye at a time, at reading distance, with your reading glasses.',
        basis: 'nasa',
      },
      {
        text: 'If the change appears again, contact the onboard doctor: eye specialists advise checking any new change promptly.',
        basis: 'nasa',
      },
    ],
  },
  {
    indicator: 'radiation_dose',
    levels: ['yellow', 'orange'],
    title: 'Limit extra exposure',
    steps: [
      {
        text: 'Follow the shielding instructions for solar events.',
        basis: 'team',
      },
    ],
  },
  RED_HELP_ENTRY,
];

export function lookupTipForIndicator(
  indicatorId: string,
  level: HealthLevel,
): TipEntry | null {
  if (level === 'green' || level === 'not_evaluable') {
    return null;
  }
  if (level === 'red') {
    return RED_HELP_ENTRY;
  }
  return (
    SELF_CARE_TIPS.find(
      (entry) =>
        entry.indicator === indicatorId && entry.levels.includes(level),
    ) ?? null
  );
}
