// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import type { IndicatorSeries } from '../types/orbital';

export const mockSeriesPassenger: Record<string, IndicatorSeries> = {
  blood_pressure: {
    indicator: 'blood_pressure',
    baseline_mean_systolic: 120,
    baseline_low_systolic: 114,
    baseline_high_systolic: 126,
    baseline_mean_diastolic: 76,
    baseline_low_diastolic: 71,
    baseline_high_diastolic: 81,
    points: [
      {
        flight_day: -2,
        systolic: 119,
        diastolic: 75,
        level: 'green',
        phase_label: 'Before flight',
      },
      {
        flight_day: -1,
        systolic: 121,
        diastolic: 77,
        level: 'green',
        phase_label: 'Before flight',
      },
      { flight_day: 0, systolic: 123, diastolic: 79, level: 'green' },
      { flight_day: 1, systolic: 121, diastolic: 77, level: 'green' },
      { flight_day: 2, systolic: 122, diastolic: 78, level: 'green' },
    ],
  },

  heart_rate: {
    indicator: 'heart_rate',
    baseline_mean: 66,
    baseline_low: 61,
    baseline_high: 72,
    points: [
      {
        flight_day: -2,
        value: 65,
        level: 'green',
        phase_label: 'Before flight',
      },
      {
        flight_day: -1,
        value: 67,
        level: 'green',
        phase_label: 'Before flight',
      },
      { flight_day: 0, value: 71, level: 'green' },
      { flight_day: 1, value: 69, level: 'green' },
      { flight_day: 2, value: 68, level: 'green' },
    ],
  },

  spo2: {
    indicator: 'spo2',
    baseline_mean: 98,
    baseline_low: 96,
    baseline_high: 99,
    points: [
      {
        flight_day: -2,
        value: 98,
        level: 'green',
        phase_label: 'Before flight',
      },
      {
        flight_day: -1,
        value: 98,
        level: 'green',
        phase_label: 'Before flight',
      },
      { flight_day: 0, value: 97, level: 'green' },
      { flight_day: 1, value: 98, level: 'green' },
      { flight_day: 2, value: 98, level: 'green' },
    ],
  },

  sleep_hours: {
    indicator: 'sleep_hours',
    baseline_mean: 7.4,
    baseline_low: 7.0,
    baseline_high: 7.9,
    points: [
      {
        flight_day: -2,
        value: 7.5,
        level: 'green',
        phase_label: 'Before flight',
      },
      {
        flight_day: -1,
        value: 7.2,
        level: 'green',
        phase_label: 'Before flight',
      },
      { flight_day: 0, value: 6.7, level: 'yellow' },
      { flight_day: 1, value: 6.3, level: 'yellow' },
      { flight_day: 2, value: 6.4, level: 'yellow' },
    ],
  },

  glucose: {
    indicator: 'glucose',
    baseline_mean: 94,
    baseline_low: 86,
    baseline_high: 104,
    points: [
      {
        flight_day: -2,
        value: 93,
        level: 'green',
        phase_label: 'Before flight',
      },
      {
        flight_day: -1,
        value: 95,
        level: 'green',
        phase_label: 'Before flight',
      },
      { flight_day: 0, value: 97, level: 'green' },
      { flight_day: 1, value: 95, level: 'green' },
      { flight_day: 2, value: 96, level: 'green' },
    ],
  },

  cabin_co2: {
    indicator: 'cabin_co2',
    baseline_mean: 1.8,
    baseline_low: 1.4,
    baseline_high: 2.3,
    points: [
      {
        flight_day: -2,
        value: 1.6,
        level: 'green',
        phase_label: 'Before flight',
      },
      {
        flight_day: -1,
        value: 1.7,
        level: 'green',
        phase_label: 'Before flight',
      },
      { flight_day: 0, value: 2.0, level: 'green' },
      { flight_day: 1, value: 1.9, level: 'green' },
      { flight_day: 2, value: 1.9, level: 'green' },
    ],
  },

  radiation_dose: {
    indicator: 'radiation_dose',
    baseline_mean: 0.2,
    baseline_low: 0.0,
    baseline_high: 0.5,
    points: [
      {
        flight_day: -2,
        value: 0.0,
        level: 'green',
        phase_label: 'Before flight',
      },
      {
        flight_day: -1,
        value: 0.1,
        level: 'green',
        phase_label: 'Before flight',
      },
      { flight_day: 0, value: 0.3, level: 'green' },
      { flight_day: 1, value: 0.6, level: 'green' },
      { flight_day: 2, value: 0.8, level: 'green' },
    ],
  },

  mood_score: {
    indicator: 'mood_score',
    baseline_mean: 1.5,
    baseline_low: 0,
    baseline_high: 3,
    points: [
      {
        flight_day: -2,
        value: 2,
        level: 'green',
        phase_label: 'Before flight',
      },
      {
        flight_day: -1,
        value: 1,
        level: 'green',
        phase_label: 'Before flight',
      },
      { flight_day: 0, value: 2, level: 'green' },
      { flight_day: 1, value: 1, level: 'green' },
      { flight_day: 2, value: 1, level: 'green' },
    ],
  },
};
