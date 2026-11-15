// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { Activity, Camera, Home, Users } from 'lucide-react';
import type { AppRoute, UserProfile } from '../types/orbital';

interface BottomNavProps {
  route: AppRoute;
  profile: UserProfile;
  onNavigate: (path: string) => void;
}

/** Navigation entries shared by the bottom bar and the mobile menu. */
export function getNavItems(route: AppRoute, profile: UserProfile) {
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

  return profile === 'passenger'
    ? [
        ...baseItems,
        {
          id: 'moments',
          label: 'Space moments',
          shortLabel: 'Moments',
          path: '/moments',
          active: route.page === 'moments',
          Icon: Camera,
        },
      ]
    : baseItems;
}

export function BottomNav({ route, profile, onNavigate }: BottomNavProps) {
  const items = getNavItems(route, profile);

  return (
    <nav
      aria-label="Primary navigation"
      className="glass-bar sticky bottom-0 z-20 border-t"
    >
      <div className="mx-auto flex max-w-xl items-center justify-around gap-1 px-2 py-1.5 sm:gap-1.5 sm:px-3 sm:py-2">
        {items.map(({ id, label, path, active, Icon, ...rest }) => (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(path)}
            aria-current={active ? 'page' : undefined}
            className={`flex min-h-[48px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1.5 py-1.5 text-[11px] font-medium transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] sm:min-h-[44px] sm:min-w-[78px] sm:flex-none sm:flex-row sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${
              active
                ? 'glass-nav-active'
                : 'text-[#8FA3C7] hover:bg-white/5 hover:text-[#E8F0FF] border border-transparent'
            }`}
          >
            <Icon
              className={`h-4 w-4 shrink-0 ${active ? 'text-[#4FC3F7]' : ''}`}
              aria-hidden="true"
            />
            <span className="max-w-full truncate sm:hidden">
              {'shortLabel' in rest ? rest.shortLabel : label}
            </span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
