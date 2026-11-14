// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { Bell } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Astronaut, ScheduledTest } from '../types/orbital';

interface TopBarProps {
  astronaut: Astronaut;
  simulated: boolean;
  tests: ScheduledTest[];
  onNavigateHome: () => void;
  onNavigate: (path: string) => void;
}

export function TopBar({
  astronaut,
  simulated,
  tests,
  onNavigateHome,
  onNavigate,
}: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);

  const dueTests = tests.filter((test) => test.due);
  const dueCount = dueTests.length;

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

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

          <div ref={menuContainerRef} className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-haspopup="true"
              aria-label={
                dueCount > 0
                  ? `Test reminders: ${dueCount} due`
                  : 'Test reminders: all up to date'
              }
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900/70 text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 cursor-pointer"
            >
              <Bell className="h-4 w-4" aria-hidden="true" />
              {dueCount > 0 && (
                <span className="font-mono-tabular absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#E67E22] px-1 text-[11px] font-bold leading-none text-slate-950 shadow-sm">
                  {dueCount}
                </span>
              )}
            </button>

            {menuOpen && (
              <div
                role="region"
                aria-label="Due tests"
                className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2.5rem)] rounded-2xl border border-slate-700/90 bg-[#10192D] p-4 shadow-2xl shadow-black/60 z-30"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Due tests
                  </p>
                  {dueCount > 0 && (
                    <span className="font-mono-tabular text-xs font-medium text-slate-400">
                      {dueCount} pending
                    </span>
                  )}
                </div>

                {dueTests.length === 0 ? (
                  <p className="pt-3 text-sm text-slate-300">
                    All tests up to date.
                  </p>
                ) : (
                  <ul className="mt-2.5 divide-y divide-slate-800/80">
                    {dueTests.map((test) => (
                      <li
                        key={test.id}
                        className="flex items-center justify-between gap-3 py-2.5 first:pt-1 last:pb-0"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-100">
                            {test.name}
                          </p>
                          <p
                            className="mt-0.5 text-xs font-medium"
                            style={{
                              color: test.overdue ? '#EB984E' : '#94A3B8',
                            }}
                          >
                            {test.overdue
                              ? `Overdue since flight day ${test.next_due_flight_day}`
                              : 'Due today'}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setMenuOpen(false);
                            onNavigate(test.route);
                          }}
                          className="inline-flex min-h-[34px] shrink-0 items-center justify-center rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 cursor-pointer"
                        >
                          Start
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
