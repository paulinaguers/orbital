// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import type { MomentsData } from '../types/orbital';

export const mockMoments: MomentsData = {
  simulated: true,
  right_now: {
    altitude_km: 400,
    speed_kmh: 27600,
    orbits_completed: 34,
    sunrises_seen_today: 16,
    sunrises_note: 'About 16 per day in orbit',
    signal_time_min: 12,
    fun_fact: '400 km = 0.00000000004 light-years. Space is big.',
  },
  photos: [
    {
      id: 'moment-sunrise',
      title: 'Orbital sunrise',
      caption: 'A thin band of gold and blue before the cabin lights brighten.',
      flight_day: 2,
      variant: 'sunrise',
    },
    {
      id: 'moment-earthlimb',
      title: 'Blue Earth horizon',
      caption: 'Thin atmosphere glowing over curved ocean clouds.',
      flight_day: 1,
      variant: 'earthlimb',
    },
    {
      id: 'moment-aurora',
      title: 'Night aurora band',
      caption: 'Green ribbons drifting above the dark side of the planet.',
      flight_day: 1,
      variant: 'aurora',
    },
    {
      id: 'moment-moonrise',
      title: 'Moonrise over the limb',
      caption: 'Quiet pass above the night hemisphere at 27,600 km/h.',
      flight_day: 0,
      variant: 'moonrise',
    },
  ],
};
