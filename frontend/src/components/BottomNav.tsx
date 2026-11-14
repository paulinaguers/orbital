// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { Activity, Camera, Home, Users } from 'lucide-react';
import type { AppRoute, UserProfile } from '../types/orbital';

interface BottomNavProps {
  route: AppRoute;
  profile: UserProfile;
  onNavigate: (path: string) => void;
}

export function BottomNav({ route, profile, onNavigate }: BottomNavProps) {
  const baseItems = [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      active: route.page === 'home',
      Icon: Home,
    },
    {
      id: 'body',
      label: 'Body',
      path: '/body',
      active:
        route.page === 'body' ||
        route.page === 'block' ||
        route.page === 'mental-checkin' ||
        route.page === 'mental-journal' ||
        route.page === 'mental-breathing' ||
        route.page === 'test-amsler' ||
        route.page === 'test-pvt',
      Icon: Activity,
    },
    {
      id: 'circle',
      label: 'My Circle',
      path: '/circle',
      active: route.page === 'circle',
      Icon: Users,
    },
  ];

  const items =
    profile === 'passenger'
      ? [
          ...baseItems,
          {
            id: 'moments',
            label: 'Space moments',
            path: '/moments',
            active: route.page === 'moments',
            Icon: Camera,
          },
        ]
      : baseItems;

  return (
    <nav
      aria-label="Primary navigation"
      className="glass-bar sticky bottom-0 z-20 border-t"
    >
      <div className="mx-auto flex max-w-xl items-center justify-around gap-1.5 px-3 py-2">
        {items.map(({ id, label, path, active, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(path)}
            aria-current={active ? 'page' : undefined}
            className={`flex min-h-[44px] min-w-[78px] items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] sm:px-4 ${
              active
                ? 'glass-nav-active'
                : 'text-[#8FA3C7] hover:bg-white/5 hover:text-[#E8F0FF] border border-transparent'
            }`}
          >
            <Icon
              className={`h-4 w-4 shrink-0 ${active ? 'text-[#4FC3F7]' : ''}`}
              aria-hidden="true"
            />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
