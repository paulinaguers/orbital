// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { TipsDrawer } from './components/TipsDrawer';
import { TopBar } from './components/TopBar';
import {
  getDemoStatus,
  getStatus,
  markTestCompletedInMemory,
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
import { PvtTestPage } from './pages/PvtTestPage';
import type { AppRoute, OrbitalStatus, UserProfile } from './types/orbital';

const PROFILE_STORAGE_KEY = 'orbital_user_profile_v1';

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
  if (cleanPath === '/alerts-info') {
    return { page: 'alerts-info' };
  }

  return { page: 'home' };
}

function isHiddenInPassengerMode(route: AppRoute): boolean {
  return (
    route.page === 'mental-journal' ||
    route.page === 'test-amsler' ||
    route.page === 'test-pvt'
  );
}

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => readStoredProfile());
  const [status, setStatus] = useState<OrbitalStatus>(() =>
    getDemoStatus(readStoredProfile()),
  );
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

  useEffect(() => {
    setStatus(getDemoStatus(profile));
    let active = true;
    getStatus(profile)
      .then((nextStatus) => {
        if (active) {
          setStatus(nextStatus);
        }
      })
      .catch(() => {
        // Keep simulated fallback status if live local backend is offline
      });
    return () => {
      active = false;
    };
  }, [profile]);

  useEffect(() => {
    if (profile === 'passenger' && isHiddenInPassengerMode(route)) {
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

  const navigate = (path: string) => {
    const nextRoute = parseRoute(path);
    if (profile === 'passenger' && isHiddenInPassengerMode(nextRoute)) {
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
    setProfile(nextProfile);
  };

  const handleTestCompleted = (testId: string) => {
    setStatus((prev) => markTestCompletedInMemory(prev, testId));
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
    const effectiveRoute =
      profile === 'passenger' && isHiddenInPassengerMode(route)
        ? ({ page: 'home' } as AppRoute)
        : route;

    switch (effectiveRoute.page) {
      case 'home':
        return (
          <HomePage
            status={status}
            profile={profile}
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
            onNavigate={navigate}
            onOpenTips={handleOpenTips}
          />
        );
      case 'mental-checkin':
        return (
          <MentalCheckinPage
            astronaut={status.astronaut}
            onNavigate={navigate}
            onTestCompleted={() => handleTestCompleted('checkin')}
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
            onTestCompleted={() => handleTestCompleted('amsler')}
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
      case 'alerts-info':
        return <AlertsInfoPage profile={profile} onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#070B14] text-slate-100">
      <TopBar
        astronaut={status.astronaut}
        simulated={status.simulated}
        profile={profile}
        tests={status.tests}
        onChangeProfile={handleChangeProfile}
        onNavigateHome={() => navigate('/')}
        onNavigate={navigate}
      />

      <main className="flex flex-1 flex-col">{renderPage()}</main>

      {overdueToastTest && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 left-1/2 z-30 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between gap-3 rounded-2xl border border-[#E67E22]/55 bg-[#10192D]/95 px-4 py-3 shadow-2xl shadow-black/60 backdrop-blur-sm"
        >
          <p className="text-sm font-medium text-slate-100">
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
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100 focus-visible:outline-2 focus-visible:outline-sky-400 cursor-pointer"
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

      <BottomNav route={route} onNavigate={navigate} />
    </div>
  );
}
