// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { Activity, Home, Users } from 'lucide-react';
import type { AppRoute } from '../types/orbital';

interface BottomNavProps {
  route: AppRoute;
  onNavigate: (path: string) => void;
}

export function BottomNav({ route, onNavigate }: BottomNavProps) {
  const items = [
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
  ] as const;

  return (
    <nav
      aria-label="Primary navigation"
      className="sticky bottom-0 z-20 border-t border-slate-800/80 bg-[#0A101E]/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-md items-center justify-around px-4 py-2">
        {items.map(({ id, label, path, active, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(path)}
            aria-current={active ? 'page' : undefined}
            className={`flex min-h-[44px] min-w-[92px] items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
              active
                ? 'bg-slate-800/90 text-slate-50 border border-slate-700/80'
                : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-100 border border-transparent'
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
