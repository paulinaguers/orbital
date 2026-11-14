// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { useEffect, useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { TopBar } from './components/TopBar';
import { fetchOrbitalStatus, getDemoStatus } from './data/source';
import { BlockDetailPage } from './pages/BlockDetailPage';
import { BodyMapPage } from './pages/BodyMapPage';
import { HomePage } from './pages/HomePage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import type { AppRoute, OrbitalStatus } from './types/orbital';

function parseRoute(pathname: string): AppRoute {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  if (cleanPath === '/' || cleanPath === '') {
    return { page: 'home' };
  }
  if (cleanPath === '/body') {
    return { page: 'body' };
  }
  if (cleanPath.startsWith('/block/')) {
    const blockId = decodeURIComponent(cleanPath.slice('/block/'.length));
    return { page: 'block', blockId: blockId || 'unknown' };
  }
  if (cleanPath.startsWith('/action/')) {
    const rest = cleanPath.slice('/action/'.length);
    const slashIdx = rest.indexOf('/');
    if (slashIdx !== -1) {
      const blockId = decodeURIComponent(rest.slice(0, slashIdx));
      const actionTitle = decodeURIComponent(rest.slice(slashIdx + 1));
      return {
        page: 'action',
        blockId: blockId || 'unknown',
        actionTitle: actionTitle || 'Action',
      };
    }
  }
  if (cleanPath === '/circle') {
    return { page: 'circle' };
  }
  if (cleanPath === '/alerts-info') {
    return { page: 'alerts-info' };
  }

  return { page: 'home' };
}

export default function App() {
  const [status, setStatus] = useState<OrbitalStatus>(() => getDemoStatus());
  const [route, setRoute] = useState<AppRoute>(() =>
    parseRoute(window.location.pathname),
  );

  useEffect(() => {
    let active = true;
    fetchOrbitalStatus(status.astronaut.id)
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
  }, [status.astronaut.id]);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    const nextRoute = parseRoute(path);
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (route.page) {
      case 'home':
        return <HomePage status={status} onNavigate={navigate} />;
      case 'body':
        return <BodyMapPage status={status} onNavigate={navigate} />;
      case 'block':
        return (
          <BlockDetailPage
            status={status}
            blockId={route.blockId}
            onNavigate={navigate}
          />
        );
      case 'action': {
        const matchedBlock = status.blocks.find(
          (block) => block.id === route.blockId,
        );
        return (
          <PlaceholderPage
            title={route.actionTitle}
            routeLabel={matchedBlock ? matchedBlock.name : 'Action'}
            message="Coming soon"
            backLabel={matchedBlock ? `Back to ${matchedBlock.name}` : 'Back'}
            onBack={() => navigate(`/block/${route.blockId}`)}
          />
        );
      }
      case 'circle':
        return (
          <PlaceholderPage
            title="My Circle"
            routeLabel="/circle"
            onBack={() => navigate('/')}
          />
        );
      case 'alerts-info':
        return (
          <PlaceholderPage
            title="How alerts work"
            routeLabel="/alerts-info"
            onBack={() => navigate('/')}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#070B14] text-slate-100">
      <TopBar
        astronaut={status.astronaut}
        simulated={status.simulated}
        onNavigateHome={() => navigate('/')}
      />

      <main className="flex flex-1 flex-col">{renderPage()}</main>

      <BottomNav route={route} onNavigate={navigate} />
    </div>
  );
}
