// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import type { Astronaut } from '../types/orbital';

interface TopBarProps {
  astronaut: Astronaut;
  simulated: boolean;
  onNavigateHome: () => void;
}

export function TopBar({
  astronaut,
  simulated,
  onNavigateHome,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-[#0A101E]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={onNavigateHome}
            className="text-lg font-bold tracking-[0.18em] text-slate-50 transition-colors hover:text-sky-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 whitespace-nowrap shrink-0 cursor-pointer"
          >
            ORBITAL
          </button>

          <span
            aria-hidden="true"
            className="hidden h-4 w-px bg-slate-700/80 sm:inline-block"
          />

          <div className="flex items-center gap-2 text-sm text-slate-300">
            <span className="font-medium text-slate-100 whitespace-nowrap">
              {astronaut.name}
            </span>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <span className="text-slate-400 whitespace-nowrap">
              {astronaut.role}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <span className="font-mono-tabular text-sm font-medium text-slate-200 whitespace-nowrap">
            Flight day {astronaut.flight_day}
          </span>

          {simulated && (
            <span className="rounded-md border border-slate-700/90 bg-slate-800/70 px-2.5 py-1 text-xs font-semibold tracking-wider text-slate-300 whitespace-nowrap shrink-0">
              SIMULATED DATA
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
