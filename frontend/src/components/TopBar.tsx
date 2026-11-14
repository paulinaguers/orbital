// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { Bell } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Astronaut, ScheduledTest, UserProfile } from '../types/orbital';

interface TopBarProps {
  astronaut: Astronaut;
  simulated: boolean;
  profile: UserProfile;
  tests: ScheduledTest[];
  onChangeProfile: (profile: UserProfile) => void;
  onNavigateHome: () => void;
  onNavigate: (path: string) => void;
}

export function TopBar({
  astronaut,
  simulated,
  profile,
  tests,
  onChangeProfile,
  onNavigateHome,
  onNavigate,
}: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);

  const visibleTests =
    profile === 'passenger'
      ? tests.filter((test) => test.id !== 'pvt' && test.id !== 'amsler')
      : tests;
  const dueTests = visibleTests.filter((test) => test.due);
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
    <header className="glass-bar sticky top-0 z-20 border-b">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={onNavigateHome}
            className="group flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4FC3F7] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {/* Original tilted orbit ring + small dot SVG logo */}
            <svg
              viewBox="0 0 36 36"
              className="h-9 w-9 shrink-0 drop-shadow-[0_0_8px_rgba(79,195,247,0.45)]"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="orbital-logo-ring"
                  x1="4"
                  y1="6"
                  x2="32"
                  y2="30"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#4FC3F7" />
                  <stop offset="100%" stopColor="#3D7BFF" />
                </linearGradient>
              </defs>
              <ellipse
                cx="18"
                cy="18"
                rx="13.5"
                ry="5.8"
                transform="rotate(-26 18 18)"
                stroke="url(#orbital-logo-ring)"
                strokeWidth="1.7"
              />
              <circle cx="29.2" cy="12.6" r="2.5" fill="#4FC3F7" />
            </svg>

            <span className="flex flex-col leading-none">
              <span className="bg-gradient-to-r from-[#E8F0FF] via-[#4FC3F7] to-[#3D7BFF] bg-clip-text text-lg font-bold uppercase tracking-[0.25em] text-transparent transition-opacity group-hover:opacity-90">
                ORBITAL
              </span>
              <span className="mt-1 text-[11px] font-medium tracking-wide text-[#8FA3C7]">
                Your health, our mission
              </span>
            </span>
          </button>

          <span
            aria-hidden="true"
            className="hidden h-5 w-px bg-[rgba(120,180,255,0.22)] sm:inline-block"
          />

          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-[#E8F0FF] whitespace-nowrap">
              {astronaut.name}
            </span>
            <span aria-hidden="true" className="text-[#8FA3C7]/60">
              ·
            </span>
            <span className="text-[#8FA3C7] whitespace-nowrap">
              {astronaut.role}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Profile Segmented Toggle */}
          <div
            role="group"
            aria-label="User profile"
            className="glass-panel-soft inline-flex items-center p-0.5"
          >
            <button
              type="button"
              aria-pressed={profile === 'crew'}
              onClick={() => {
                setMenuOpen(false);
                onChangeProfile('crew');
              }}
              className={`rounded-[12px] px-2.5 py-1 text-xs font-medium transition-all whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#4FC3F7] ${
                profile === 'crew'
                  ? 'glass-nav-active'
                  : 'text-[#8FA3C7] hover:text-[#E8F0FF] border border-transparent'
              }`}
            >
              Crew member
            </button>
            <button
              type="button"
              aria-pressed={profile === 'passenger'}
              onClick={() => {
                setMenuOpen(false);
                onChangeProfile('passenger');
              }}
              className={`rounded-[12px] px-2.5 py-1 text-xs font-medium transition-all whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#4FC3F7] ${
                profile === 'passenger'
                  ? 'glass-nav-active'
                  : 'text-[#8FA3C7] hover:text-[#E8F0FF] border border-transparent'
              }`}
            >
              Space passenger
            </button>
          </div>

          <span className="font-mono-tabular text-sm font-medium text-[#E8F0FF] whitespace-nowrap">
            Flight day {astronaut.flight_day}
          </span>

          {simulated && (
            <span className="rounded-lg border border-[rgba(120,180,255,0.2)] bg-[rgba(20,35,70,0.65)] px-2.5 py-1 text-xs font-semibold tracking-wider text-[#8FA3C7] whitespace-nowrap shrink-0">
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
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(120,180,255,0.22)] bg-[rgba(20,35,70,0.55)] text-[#E8F0FF] transition-colors hover:border-[#4FC3F7] hover:bg-[rgba(28,48,96,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
            >
              <Bell className="h-4 w-4" aria-hidden="true" />
              {dueCount > 0 && (
                <span className="font-mono-tabular absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#E67E22] px-1 text-[11px] font-bold leading-none text-slate-950 shadow-[0_0_10px_rgba(230,126,34,0.65)]">
                  {dueCount}
                </span>
              )}
            </button>

            {menuOpen && (
              <div
                role="region"
                aria-label="Due tests"
                className="glass-panel absolute right-0 mt-2 w-80 max-w-[calc(100vw-2.5rem)] p-4 z-30"
              >
                <div className="flex items-center justify-between gap-2 border-b border-[rgba(120,180,255,0.18)] pb-2.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#E8F0FF]">
                    Due tests
                  </p>
                  {dueCount > 0 && (
                    <span className="font-mono-tabular text-xs font-medium text-[#8FA3C7]">
                      {dueCount} pending
                    </span>
                  )}
                </div>

                {dueTests.length === 0 ? (
                  <p className="pt-3 text-sm text-[#E8F0FF]">
                    All tests up to date.
                  </p>
                ) : (
                  <ul className="mt-2.5 divide-y divide-[rgba(120,180,255,0.14)]">
                    {dueTests.map((test) => (
                      <li
                        key={test.id}
                        className="flex items-center justify-between gap-3 py-2.5 first:pt-1 last:pb-0"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-[#E8F0FF]">
                            {test.name}
                          </p>
                          <p
                            className="mt-0.5 text-xs font-medium"
                            style={{
                              color: test.overdue ? '#E67E22' : '#8FA3C7',
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
                          className="inline-flex min-h-[34px] shrink-0 items-center justify-center rounded-lg bg-[#4FC3F7] px-3 py-1.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
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
