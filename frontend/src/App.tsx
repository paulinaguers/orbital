// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { Sparkles, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { SpaceBackdrop } from './components/SpaceBackdrop';
import { TipsDrawer } from './components/TipsDrawer';
import { TopBar } from './components/TopBar';
import {
  getCurrentScenario,
  getDataSourceLabel,
  getDemoStatus,
  getStatus,
  markTestCompletedInMemory,
  subscribeDataSource,
  subscribeStatusUpdates,
  switchDemoScenario,
} from './data/source';
import { AlertsInfoPage } from './pages/AlertsInfoPage';
import { AmslerTestPage } from './pages/AmslerTestPage';
import { BlockDetailPage } from './pages/BlockDetailPage';
import { BodyMapPage } from './pages/BodyMapPage';
import { CirclePage } from './pages/CirclePage';
import { HomePage } from './pages/HomePage';
import { MentalBreathingPage } from './pages/MentalBreathingPage';
import { MentalCheckinPage } from './pages/MentalCheckinPage';
import { MentalJournalPage } from './pages/MentalJournalPage';
import { MomentsPage } from './pages/MomentsPage';
import { PvtTestPage } from './pages/PvtTestPage';
import type {
  AppRoute,
  DemoScenario,
  OrbitalStatus,
  UserProfile,
} from './types/orbital';

const PROFILE_STORAGE_KEY = 'orbital_user_profile_v1';

const CELEBRATION_MESSAGES: Record<UserProfile, string[]> = {
  crew: [
    'Thanks! That helps me look after you.',
    "Star collected! You're on a roll.",
    'Mission data received, crewmate!',
  ],
  passenger: [
    'Thanks! That helps me look after you.',
    "Star collected! You're on a roll.",
    'All saved! Enjoy the view up here!',
  ],
};

const MILESTONES: Array<{ threshold: number; label: string }> = [
  { threshold: 5, label: 'tiny antenna light' },
  { threshold: 10, label: 'small scarf' },
  { threshold: 20, label: 'little jetpack' },
];

function readStoredProfile(): UserProfile {
  try {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    return raw === 'passenger' ? 'passenger' : 'crew';
  } catch {
    return 'crew';
  }
}

function writeStoredProfile(profile: UserProfile): void {
  try {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, profile);
  } catch {
    // Ignore storage errors in restricted environments
  }
}

function parseRoute(pathname: string): AppRoute {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  if (cleanPath === '/' || cleanPath === '') {
    return { page: 'home' };
  }
  if (cleanPath === '/body') {
    return { page: 'body' };
  }
  if (cleanPath === '/mental/checkin') {
    return { page: 'mental-checkin' };
  }
  if (cleanPath === '/mental/journal') {
    return { page: 'mental-journal' };
  }
  if (cleanPath === '/mental/breathing') {
    return { page: 'mental-breathing' };
  }
  if (cleanPath === '/tests/amsler') {
    return { page: 'test-amsler' };
  }
  if (cleanPath === '/tests/pvt') {
    return { page: 'test-pvt' };
  }
  if (cleanPath.startsWith('/block/')) {
    const blockId = decodeURIComponent(cleanPath.slice('/block/'.length));
    return { page: 'block', blockId: blockId || 'unknown' };
  }
  if (cleanPath === '/circle') {
    return { page: 'circle' };
  }
  if (cleanPath === '/moments') {
    return { page: 'moments' };
  }
  if (cleanPath === '/alerts-info') {
    return { page: 'alerts-info' };
  }

  return { page: 'home' };
}

function isRouteAllowedForProfile(
  route: AppRoute,
  profile: UserProfile,
): boolean {
  if (profile === 'passenger') {
    return (
      route.page !== 'mental-journal' &&
      route.page !== 'test-amsler' &&
      route.page !== 'test-pvt'
    );
  }
  return route.page !== 'moments';
}

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => readStoredProfile());
  const [statusByProfile, setStatusByProfile] = useState<
    Record<UserProfile, OrbitalStatus>
  >(() => ({
    crew: getDemoStatus('crew'),
    passenger: getDemoStatus('passenger'),
  }));
  const [route, setRoute] = useState<AppRoute>(() =>
    parseRoute(window.location.pathname),
  );
  const [toastDismissed, setToastDismissed] = useState(false);
  const [tipsDrawerOpen, setTipsDrawerOpen] = useState(false);
  const [tipsFilterBlockId, setTipsFilterBlockId] = useState<string | null>(
    null,
  );
  const [checkedTipSteps, setCheckedTipSteps] = useState<
    Record<string, boolean>
  >({});
  const [celebration, setCelebration] = useState<{
    key: number;
    message: string;
  } | null>(null);
  const celebrationCounterRef = useRef(0);
  const [unlockedToast, setUnlockedToast] = useState<string | null>(null);
  const seenMilestonesRef = useRef<Record<UserProfile, Set<number>>>({
    crew: new Set(
      MILESTONES.filter(
        (m) => getDemoStatus('crew').rewards.stars >= m.threshold,
      ).map((m) => m.threshold),
    ),
    passenger: new Set(
      MILESTONES.filter(
        (m) => getDemoStatus('passenger').rewards.stars >= m.threshold,
      ).map((m) => m.threshold),
    ),
  });

  const [scenario, setScenario] = useState<DemoScenario>(() =>
    getCurrentScenario(),
  );
  const [scenarioLoading, setScenarioLoading] = useState(false);
  const [dataSourceLabel, setDataSourceLabel] = useState<string>(() =>
    getDataSourceLabel(readStoredProfile()),
  );
  const [dataRevision, setDataRevision] = useState(0);

  const status = statusByProfile[profile];

  useEffect(() => {
    setDataSourceLabel(getDataSourceLabel(profile));
    const unsubscribeSource = subscribeDataSource(() => {
      setDataSourceLabel(getDataSourceLabel(profile));
    });
    const unsubscribeStatus = subscribeStatusUpdates((nextCrewStatus) => {
      setStatusByProfile((prev) => ({
        ...prev,
        crew: nextCrewStatus,
      }));
      setDataRevision((prev) => prev + 1);
      setDataSourceLabel(getDataSourceLabel(profile));
    });
    return () => {
      unsubscribeSource();
      unsubscribeStatus();
    };
  }, [profile]);

  useEffect(() => {
    let active = true;
    getStatus(profile)
      .then((nextStatus) => {
        if (active) {
          setStatusByProfile((prev) => ({
            ...prev,
            [profile]: nextStatus,
          }));
          setDataSourceLabel(getDataSourceLabel(profile));
          setDataRevision((prev) => prev + 1);
        }
      })
      .catch(() => {
        // Keep fallback status if unavailable
      });
    return () => {
      active = false;
    };
  }, [profile]);

  useEffect(() => {
    if (!isRouteAllowedForProfile(route, profile)) {
      if (window.location.pathname !== '/') {
        window.history.replaceState(null, '', '/');
      }
      setRoute({ page: 'home' });
    }
  }, [profile, route]);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!unlockedToast) {
      return;
    }
    const timer = window.setTimeout(() => {
      setUnlockedToast(null);
    }, 5500);
    return () => window.clearTimeout(timer);
  }, [unlockedToast]);

  useEffect(() => {
    if (!celebration) {
      return;
    }
    const timer = window.setTimeout(() => {
      setCelebration(null);
    }, 1650);
    return () => window.clearTimeout(timer);
  }, [celebration]);

  const navigate = (path: string) => {
    const nextRoute = parseRoute(path);
    if (!isRouteAllowedForProfile(nextRoute, profile)) {
      if (window.location.pathname !== '/') {
        window.history.pushState(null, '', '/');
      }
      setRoute({ page: 'home' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChangeProfile = (nextProfile: UserProfile) => {
    if (nextProfile === profile) {
      return;
    }
    writeStoredProfile(nextProfile);
    setTipsDrawerOpen(false);
    setTipsFilterBlockId(null);
    setCelebration(null);
    setUnlockedToast(null);
    setProfile(nextProfile);
  };

  const handleSelectScenario = async (nextScenario: DemoScenario) => {
    if (scenarioLoading) {
      return;
    }
    setScenario(nextScenario);
    setScenarioLoading(true);
    try {
      const nextStatus = await switchDemoScenario(nextScenario);
      setStatusByProfile((prev) => ({
        ...prev,
        crew: nextStatus,
      }));
      setDataRevision((prev) => prev + 1);
      setDataSourceLabel(getDataSourceLabel(profile));
    } finally {
      setScenarioLoading(false);
    }
  };

  const handleTestCompleted = (
    testId: string,
    updatedStatus?: OrbitalStatus | null,
  ) => {
    const currentStatus = statusByProfile[profile];
    const nextStatus = updatedStatus ?? markTestCompletedInMemory(currentStatus, testId);
    const nextStars = nextStatus.rewards.stars;

    setStatusByProfile((prev) => ({
      ...prev,
      [profile]: nextStatus,
    }));
    if (updatedStatus) {
      setDataRevision((prev) => prev + 1);
    }

    // Check first-time milestone unlocks
    const seen = seenMilestonesRef.current[profile];
    for (const milestone of MILESTONES) {
      if (nextStars >= milestone.threshold && !seen.has(milestone.threshold)) {
        seen.add(milestone.threshold);
        setUnlockedToast(`Orbi unlocked: ${milestone.label}!`);
      }
    }

    const lines = CELEBRATION_MESSAGES[profile];
    const message = lines[Math.floor(Math.random() * lines.length)] ?? lines[0];
    celebrationCounterRef.current += 1;
    setCelebration({
      key: celebrationCounterRef.current,
      message,
    });

    navigate('/');
  };

  const handleOpenTips = (blockId: string) => {
    setTipsFilterBlockId(blockId);
    setTipsDrawerOpen(true);
  };

  const handleToggleTipStep = (stepKey: string) => {
    setCheckedTipSteps((prev) => ({
      ...prev,
      [stepKey]: !prev[stepKey],
    }));
  };

  const overdueToastTest =
    !toastDismissed && profile === 'crew'
      ? status.tests.find((test) => test.due && test.overdue) ?? null
      : null;

  const renderPage = () => {
    const effectiveRoute = isRouteAllowedForProfile(route, profile)
      ? route
      : ({ page: 'home' } as AppRoute);

    switch (effectiveRoute.page) {
      case 'home':
        return (
          <HomePage
            status={status}
            profile={profile}
            celebration={celebration}
            onNavigate={navigate}
            onOpenTips={handleOpenTips}
          />
        );
      case 'body':
        return (
          <BodyMapPage
            status={status}
            profile={profile}
            onNavigate={navigate}
          />
        );
      case 'block':
        return (
          <BlockDetailPage
            status={status}
            profile={profile}
            blockId={effectiveRoute.blockId}
            dataRevision={dataRevision}
            onNavigate={navigate}
            onOpenTips={handleOpenTips}
          />
        );
      case 'mental-checkin':
        return (
          <MentalCheckinPage
            astronaut={status.astronaut}
            onNavigate={navigate}
            onTestCompleted={(updatedStatus) =>
              handleTestCompleted('checkin', updatedStatus)
            }
          />
        );
      case 'mental-journal':
        return (
          <MentalJournalPage
            astronaut={status.astronaut}
            onNavigate={navigate}
          />
        );
      case 'mental-breathing':
        return <MentalBreathingPage onNavigate={navigate} />;
      case 'test-amsler':
        return (
          <AmslerTestPage
            astronaut={status.astronaut}
            onNavigate={navigate}
            onTestCompleted={(updatedStatus) =>
              handleTestCompleted('amsler', updatedStatus)
            }
          />
        );
      case 'test-pvt':
        return (
          <PvtTestPage
            astronaut={status.astronaut}
            onNavigate={navigate}
            onTestCompleted={() => handleTestCompleted('pvt')}
          />
        );
      case 'circle':
        return (
          <CirclePage
            currentFlightDay={status.astronaut.flight_day}
            onNavigate={navigate}
          />
        );
      case 'moments':
        return (
          <MomentsPage
            currentFlightDay={status.astronaut.flight_day}
            onNavigate={navigate}
          />
        );
      case 'alerts-info':
        return <AlertsInfoPage profile={profile} onNavigate={navigate} />;
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col text-[#E8F0FF]">
      <SpaceBackdrop />

      <div className="relative z-10 flex min-h-screen flex-col">
        <TopBar
          astronaut={status.astronaut}
          simulated={status.simulated}
          profile={profile}
          tests={status.tests}
          dataSourceLabel={dataSourceLabel}
          scenario={scenario}
          scenarioLoading={scenarioLoading}
          onSelectScenario={handleSelectScenario}
          onChangeProfile={handleChangeProfile}
          onNavigateHome={() => navigate('/')}
          onNavigate={navigate}
        />

        <main className="flex flex-1 flex-col">{renderPage()}</main>

        {unlockedToast && (
          <div
            role="status"
            aria-live="polite"
            className="glass-panel fixed bottom-36 left-1/2 z-30 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between gap-3 px-4 py-3"
            style={{
              borderColor: 'rgba(241, 196, 15, 0.5)',
              boxShadow: '0 0 24px rgba(241, 196, 15, 0.22)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles
                className="h-4 w-4 text-amber-300 shrink-0"
                aria-hidden="true"
              />
              <p className="text-sm font-semibold text-[#E8F0FF]">
                {unlockedToast}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setUnlockedToast(null)}
              aria-label="Dismiss unlock message"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8FA3C7] transition-colors hover:bg-white/10 hover:text-[#E8F0FF] cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}

        {overdueToastTest && (
          <div
            role="status"
            aria-live="polite"
            className="glass-panel fixed bottom-20 left-1/2 z-30 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between gap-3 px-4 py-3"
            style={{
              borderColor: 'rgba(230, 126, 34, 0.55)',
              boxShadow: '0 0 24px rgba(230, 126, 34, 0.25)',
            }}
          >
            <p className="text-sm font-medium text-[#E8F0FF]">
              Reminder: {overdueToastTest.name} is overdue.
            </p>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setToastDismissed(true);
                  navigate(overdueToastTest.route);
                }}
                className="inline-flex min-h-[34px] items-center justify-center rounded-lg bg-[#E67E22] px-3 py-1.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-[#EB984E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 cursor-pointer"
              >
                Start now
              </button>

              <button
                type="button"
                onClick={() => setToastDismissed(true)}
                aria-label="Dismiss reminder"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8FA3C7] transition-colors hover:bg-white/10 hover:text-[#E8F0FF] focus-visible:outline-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        <TipsDrawer
          open={tipsDrawerOpen}
          blocks={status.blocks}
          filterBlockId={tipsFilterBlockId}
          checkedSteps={checkedTipSteps}
          onToggleStep={handleToggleTipStep}
          onShowAllBlocks={
            route.page === 'home' ? () => setTipsFilterBlockId(null) : undefined
          }
          onClose={() => setTipsDrawerOpen(false)}
        />

        <BottomNav route={route} profile={profile} onNavigate={navigate} />
      </div>
    </div>
  );
}
