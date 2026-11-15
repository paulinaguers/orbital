// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type {
  AppRoute,
  Astronaut,
  DemoScenario,
  UserProfile,
} from '../types/orbital';
import { getNavItems } from './BottomNav';

// Side sheet for phones (shadcn "Sheet" pattern): everything that does not fit
// in the header on a narrow screen lives here. Desktop keeps the full header.

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  route: AppRoute;
  astronaut: Astronaut;
  simulated: boolean;
  profile: UserProfile;
  dataSourceLabel: string;
  scenario: DemoScenario;
  scenarioLoading: boolean;
  scenarioOptions: Array<{ id: DemoScenario; label: string }>;
  onSelectScenario: (scenario: DemoScenario) => void;
  onChangeProfile: (profile: UserProfile) => void;
  onNavigate: (path: string) => void;
}

const SECTION_TITLE =
  'text-[11px] font-semibold uppercase tracking-wider text-[#8FA3C7]';

export function MobileMenu({
  open,
  onClose,
  route,
  astronaut,
  simulated,
  profile,
  dataSourceLabel,
  scenario,
  scenarioLoading,
  scenarioOptions,
  onSelectScenario,
  onChangeProfile,
  onNavigate,
}: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Escape closes the sheet, the page behind does not scroll, and focus moves
  // into the sheet when it opens.
  useEffect(() => {
    if (!open) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const go = (path: string) => {
    onClose();
    onNavigate(path);
  };

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/65 backdrop-blur-[2px] transition-opacity duration-200 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Sheet */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`absolute right-0 top-0 flex h-full w-[85vw] max-w-sm flex-col border-l border-[rgba(120,180,255,0.2)] bg-[rgba(11,21,51,0.94)] text-[#E8F0FF] shadow-[0_0_40px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-transform duration-200 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-start justify-between gap-3 border-b border-[rgba(120,180,255,0.16)] px-5 py-4">
          <div className="min-w-0">
            <p className="truncate text-base font-semibold">{astronaut.name}</p>
            <p className="truncate text-sm text-[#8FA3C7]">{astronaut.role}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="font-mono-tabular text-xs font-medium">
                Flight day {astronaut.flight_day}
              </span>
              {simulated && (
                <span className="rounded-md border border-[rgba(120,180,255,0.2)] bg-[rgba(20,35,70,0.65)] px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[#8FA3C7]">
                  SIMULATED DATA
                </span>
              )}
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[rgba(120,180,255,0.2)] bg-[rgba(20,35,70,0.6)] text-[#8FA3C7] transition-colors hover:border-[#4FC3F7] hover:text-[#E8F0FF] focus-visible:outline-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
          <nav aria-label="Mobile navigation">
            <p className={SECTION_TITLE}>Go to</p>
            <ul className="mt-2 space-y-1">
              {getNavItems(route, profile).map(({ id, label, path, active, Icon }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => go(path)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#4FC3F7] ${
                      active
                        ? 'glass-nav-active'
                        : 'border border-transparent text-[#C9D6F0] hover:bg-white/5 hover:text-[#E8F0FF]'
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 ${active ? 'text-[#4FC3F7]' : ''}`}
                      aria-hidden="true"
                    />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={SECTION_TITLE}>Profile</p>
            <div
              role="group"
              aria-label="User profile"
              className="glass-panel-soft mt-2 grid grid-cols-2 gap-1 p-1"
            >
              {(['crew', 'passenger'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={profile === option}
                  onClick={() => onChangeProfile(option)}
                  className={`rounded-[11px] px-2 py-2 text-xs font-medium transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#4FC3F7] ${
                    profile === option
                      ? 'glass-nav-active'
                      : 'border border-transparent text-[#8FA3C7] hover:text-[#E8F0FF]'
                  }`}
                >
                  {option === 'crew' ? 'Crew member' : 'Space passenger'}
                </button>
              ))}
            </div>
          </div>

          {profile === 'crew' && (
            <div>
              <p className={SECTION_TITLE}>Demo scenario</p>
              <div
                role="group"
                aria-label="Demo scenario"
                className="glass-panel-soft mt-2 grid grid-cols-2 gap-1 p-1"
              >
                {scenarioOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    disabled={scenarioLoading}
                    aria-pressed={scenario === option.id}
                    onClick={() => onSelectScenario(option.id)}
                    className={`rounded-[11px] px-2 py-2 text-xs font-medium transition-all cursor-pointer disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-[#4FC3F7] ${
                      scenario === option.id
                        ? 'glass-nav-active'
                        : 'border border-transparent text-[#8FA3C7] hover:text-[#E8F0FF]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <span className={SECTION_TITLE}>Data source</span>
            <span className="rounded-lg border border-[rgba(120,180,255,0.22)] bg-[rgba(10,20,46,0.65)] px-2.5 py-1 text-xs font-medium">
              {dataSourceLabel}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
