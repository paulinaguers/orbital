// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import {
  ArrowLeft,
  Check,
  Clock,
  ImagePlus,
  Lock,
  Radio,
  Share2,
  Sparkles,
  WifiOff,
} from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { getDemoCircleData, getDemoMomentsData } from '../data/source';
import type { MomentPhoto, PlaceholderSceneVariant } from '../types/orbital';

interface MomentsPageProps {
  currentFlightDay: number;
  onNavigate: (path: string) => void;
}

type SocialTarget = 'Orbital Feed' | 'EarthGram' | 'Family Album';

interface OutboxItem {
  outboxId: string;
  photo: MomentPhoto;
  network: SocialTarget;
  addedAt: string;
}

const SOCIAL_TARGETS: SocialTarget[] = [
  'Orbital Feed',
  'EarthGram',
  'Family Album',
];

function formatCountdown(ms: number): string {
  const totalSec = Math.max(0, Math.ceil(ms / 1000));
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function SpacePlaceholderSvg({
  variant,
  title,
}: {
  variant: PlaceholderSceneVariant;
  title: string;
}) {
  const uid = useId();
  const sunSkyId = `${uid}-sun-sky`;
  const sunGlowId = `${uid}-sun-glow`;
  const limbSpaceId = `${uid}-limb-space`;
  const limbEarthId = `${uid}-limb-earth`;
  const aurBgId = `${uid}-aur-bg`;
  const aurRibbonId = `${uid}-aur-ribbon`;
  const moonSkyId = `${uid}-moon-sky`;
  const moonDiscId = `${uid}-moon-disc`;

  if (variant === 'sunrise') {
    return (
      <svg
        viewBox="0 0 400 240"
        className="h-full w-full"
        role="img"
        aria-label={title}
      >
        <defs>
          <linearGradient id={sunSkyId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#040814" />
            <stop offset="55%" stopColor="#0B1E3B" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <radialGradient id={sunGlowId} cx="52%" cy="62%" r="42%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="28%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#38BDF8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0B1E3B" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="240" fill={`url(#${sunSkyId})`} />
        <circle cx="70" cy="40" r="1.2" fill="#E2E8F0" opacity="0.8" />
        <circle cx="145" cy="28" r="1" fill="#E2E8F0" opacity="0.65" />
        <circle cx="290" cy="45" r="1.4" fill="#E2E8F0" opacity="0.8" />
        <circle cx="340" cy="70" r="1" fill="#E2E8F0" opacity="0.7" />
        <rect width="400" height="240" fill={`url(#${sunGlowId})`} />
        <path
          d="M -40 240 Q 200 115 440 240 Z"
          fill="#061224"
          stroke="#60A5FA"
          strokeOpacity="0.6"
          strokeWidth="2.5"
        />
        <circle cx="208" cy="148" r="13" fill="#FEF9C3" />
      </svg>
    );
  }

  if (variant === 'earthlimb') {
    return (
      <svg
        viewBox="0 0 400 240"
        className="h-full w-full"
        role="img"
        aria-label={title}
      >
        <defs>
          <linearGradient id={limbSpaceId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#030712" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id={limbEarthId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="45%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#082F49" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill={`url(#${limbSpaceId})`} />
        <circle cx="55" cy="36" r="1.2" fill="#F8FAFC" opacity="0.8" />
        <circle cx="115" cy="65" r="1" fill="#F8FAFC" opacity="0.6" />
        <circle cx="315" cy="32" r="1.3" fill="#F8FAFC" opacity="0.75" />
        <circle
          cx="220"
          cy="380"
          r="265"
          fill={`url(#${limbEarthId})`}
          stroke="#7DD3FC"
          strokeWidth="4"
          strokeOpacity="0.75"
        />
        <ellipse
          cx="185"
          cy="175"
          rx="90"
          ry="18"
          fill="#F8FAFC"
          opacity="0.22"
        />
        <ellipse
          cx="290"
          cy="195"
          rx="65"
          ry="12"
          fill="#F8FAFC"
          opacity="0.18"
        />
      </svg>
    );
  }

  if (variant === 'aurora') {
    return (
      <svg
        viewBox="0 0 400 240"
        className="h-full w-full"
        role="img"
        aria-label={title}
      >
        <defs>
          <linearGradient id={aurBgId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#030712" />
            <stop offset="100%" stopColor="#091529" />
          </linearGradient>
          <linearGradient id={aurRibbonId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#2DD4BF" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill={`url(#${aurBgId})`} />
        <circle cx="48" cy="48" r="1.1" fill="#E2E8F0" opacity="0.8" />
        <circle cx="180" cy="34" r="1.3" fill="#E2E8F0" opacity="0.7" />
        <circle cx="348" cy="54" r="1.1" fill="#E2E8F0" opacity="0.85" />
        <path
          d="M -20 135 C 70 65, 165 160, 255 85 C 315 35, 365 95, 420 65 L 420 125 C 355 150, 305 90, 245 140 C 160 205, 65 115, -20 175 Z"
          fill={`url(#${aurRibbonId})`}
        />
        <path
          d="M -40 240 Q 200 148 440 240 Z"
          fill="#050C1B"
          stroke="#34D399"
          strokeOpacity="0.45"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 400 240"
      className="h-full w-full"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={moonSkyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020617" />
          <stop offset="70%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id={moonDiscId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#${moonSkyId})`} />
      <circle cx="62" cy="44" r="1.2" fill="#F8FAFC" opacity="0.85" />
      <circle cx="132" cy="78" r="1" fill="#F8FAFC" opacity="0.65" />
      <circle cx="235" cy="40" r="1.4" fill="#F8FAFC" opacity="0.8" />
      <circle cx="355" cy="88" r="1.1" fill="#F8FAFC" opacity="0.7" />
      <circle cx="282" cy="84" r="24" fill={`url(#${moonDiscId})`} />
      <circle cx="292" cy="78" r="22" fill="#0A1328" />
      <path
        d="M -40 240 Q 200 132 440 240 Z"
        fill="#071124"
        stroke="#60A5FA"
        strokeOpacity="0.55"
        strokeWidth="2"
      />
    </svg>
  );
}

export function MomentsPage({ currentFlightDay, onNavigate }: MomentsPageProps) {
  const momentsData = getDemoMomentsData();
  const circleData = getDemoCircleData();
  const link = circleData.link;

  const targetMs = Date.parse(link.next_window_utc);
  const [remainingMs, setRemainingMs] = useState<number>(() =>
    Math.max(0, targetMs - Date.now()),
  );
  const isConnected = remainingMs <= 0 || link.status === 'connected';

  const [photos, setPhotos] = useState<MomentPhoto[]>(() => [
    ...momentsData.photos,
  ]);
  const [selectedNetwork, setSelectedNetwork] = useState<
    Record<string, SocialTarget>
  >({});
  const [outbox, setOutbox] = useState<OutboxItem[]>([]);
  const [postedFeedbackId, setPostedFeedbackId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingMs(Math.max(0, targetMs - Date.now()));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [targetMs]);

  const handleAddPhotoFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return;
      }
      const cleanName = file.name.replace(/\.[^/.]+$/, '') || 'Orbital photo';
      const nextPhoto: MomentPhoto = {
        id: `local-${Date.now()}`,
        title: cleanName,
        caption: 'Saved on this device.',
        flight_day: currentFlightDay,
        imageUrl: reader.result,
        isLocal: true,
      };
      setPhotos((prev) => [nextPhoto, ...prev]);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleQueueShare = (photo: MomentPhoto) => {
    const network = selectedNetwork[photo.id] ?? 'Orbital Feed';
    setOutbox((prev) => {
      const alreadyQueued = prev.some(
        (item) => item.photo.id === photo.id && item.network === network,
      );
      if (alreadyQueued) {
        return prev;
      }
      const now = new Date();
      const hh = now.getUTCHours().toString().padStart(2, '0');
      const mm = now.getUTCMinutes().toString().padStart(2, '0');
      return [
        {
          outboxId: `outbox-${photo.id}-${network}-${Date.now()}`,
          photo,
          network,
          addedAt: `${hh}:${mm} UTC`,
        },
        ...prev,
      ];
    });
  };

  const rightNow = momentsData.right_now;

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-6 sm:px-8 sm:py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-[#8FA3C7] transition-colors duration-150 hover:text-[#E8F0FF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4FC3F7] cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Home</span>
          </button>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-[#E8F0FF] sm:text-4xl">
              Space moments
            </h1>
            <span className="rounded-md border border-[rgba(120,180,255,0.2)] bg-[rgba(20,35,70,0.55)] px-2.5 py-0.5 text-xs font-medium text-[#8FA3C7]">
              Simulated
            </span>
          </div>
        </div>

        {/* Link status chip reusing My Circle window */}
        <div
          className={`flex items-center gap-2.5 px-4 py-2.5 text-sm ${
            isConnected
              ? 'rounded-[20px] border border-emerald-400/40 bg-emerald-500/15 text-emerald-200 backdrop-blur-[14px]'
              : 'glass-panel text-[#E8F0FF]'
          }`}
        >
          {isConnected ? (
            <>
              <Radio className="h-4 w-4 text-emerald-300 shrink-0" aria-hidden="true" />
              <span className="font-medium">Earth window open</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4 text-[#8FA3C7] shrink-0" aria-hidden="true" />
              <span>
                Next Earth window in{' '}
                <span className="font-mono-tabular font-semibold text-[#4FC3F7]">
                  {formatCountdown(remainingMs)}
                </span>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right now card */}
      <section
        aria-labelledby="right-now-heading"
        className="glass-panel mt-6 p-6 sm:p-7"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-5 w-5 text-[#4FC3F7]" aria-hidden="true" />
            <h2
              id="right-now-heading"
              className="text-xl font-semibold text-[#E8F0FF]"
            >
              Right now
            </h2>
          </div>
          <span className="rounded-md border border-[rgba(120,180,255,0.2)] bg-[rgba(10,20,46,0.56)] px-2.5 py-0.5 text-xs font-medium text-[#8FA3C7]">
            Simulated flight telemetry
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
          <div className="glass-panel-soft p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-[#8FA3C7]">
              Altitude
            </p>
            <p className="font-mono-tabular mt-1.5 text-2xl font-bold text-[#E8F0FF]">
              {rightNow.altitude_km} km
            </p>
          </div>

          <div className="glass-panel-soft p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-[#8FA3C7]">
              Speed
            </p>
            <p className="font-mono-tabular mt-1.5 text-2xl font-bold text-[#E8F0FF]">
              {rightNow.speed_kmh.toLocaleString('en-US')} km/h
            </p>
          </div>

          <div className="glass-panel-soft p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-[#8FA3C7]">
              Orbits completed
            </p>
            <p className="font-mono-tabular mt-1.5 text-2xl font-bold text-[#E8F0FF]">
              {rightNow.orbits_completed}
            </p>
          </div>

          <div className="glass-panel-soft p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-[#8FA3C7]">
              Sunrises seen today
            </p>
            <p className="font-mono-tabular mt-1.5 text-2xl font-bold text-[#E8F0FF]">
              {rightNow.sunrises_seen_today}
            </p>
            <p className="mt-1 text-xs text-[#8FA3C7]">
              {rightNow.sunrises_note}
            </p>
          </div>

          <div className="glass-panel-soft p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-[#8FA3C7]">
              Signal time to Earth
            </p>
            <p className="font-mono-tabular mt-1.5 text-2xl font-bold text-[#E8F0FF]">
              ~{link.one_way_delay_min ?? rightNow.signal_time_min} min
            </p>
          </div>
        </div>

        <p className="mt-5 rounded-2xl border border-[#4FC3F7]/30 bg-[rgba(61,123,255,0.14)] px-4 py-3 text-base font-medium text-[#E8F0FF]">
          {rightNow.fun_fact}
        </p>
      </section>

      {/* Photo Gallery */}
      <section aria-labelledby="gallery-heading" className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2
              id="gallery-heading"
              className="text-2xl font-semibold text-[#E8F0FF]"
            >
              Photo gallery
            </h2>
            <p className="mt-1 text-sm text-[#8FA3C7]">
              Added images stay on this device. Your health data is never
              included in posts.
            </p>
          </div>

          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAddPhotoFile}
              className="sr-only"
              aria-label="Add photo from device"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#4FC3F7] px-5 py-2.5 text-sm font-semibold text-[#050B1A] shadow-[0_0_20px_rgba(79,195,247,0.3)] transition-colors hover:bg-[#7AD6FA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
            >
              <ImagePlus className="h-4 w-4" aria-hidden="true" />
              <span>Add photo</span>
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          {photos.map((photo) => {
            const activeNetwork = selectedNetwork[photo.id] ?? 'Orbital Feed';
            const isQueuedForNetwork = outbox.some(
              (item) =>
                item.photo.id === photo.id && item.network === activeNetwork,
            );

            return (
              <article
                key={photo.id}
                className="glass-panel flex flex-col overflow-hidden"
              >
                <div className="aspect-[5/3] w-full overflow-hidden bg-[#050B1A]">
                  {photo.imageUrl ? (
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <SpacePlaceholderSvg
                      variant={photo.variant ?? 'sunrise'}
                      title={photo.title}
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-semibold text-[#E8F0FF]">
                        {photo.title}
                      </h3>
                      <span className="font-mono-tabular text-xs font-medium text-[#8FA3C7]">
                        Flight day {photo.flight_day}
                        {photo.isLocal ? ' · On device' : ' · Simulated'}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#E8F0FF]/85">
                      {photo.caption}
                    </p>
                  </div>

                  {/* Fake social network buttons + Share when connected */}
                  <div className="mt-4 border-t border-[rgba(120,180,255,0.16)] pt-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {SOCIAL_TARGETS.map((target) => {
                        const isPicked = activeNetwork === target;
                        return (
                          <button
                            key={target}
                            type="button"
                            onClick={() =>
                              setSelectedNetwork((prev) => ({
                                ...prev,
                                [photo.id]: target,
                              }))
                            }
                            aria-pressed={isPicked}
                            className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                              isPicked
                                ? 'glass-nav-active text-[#E8F0FF]'
                                : 'border border-[rgba(120,180,255,0.18)] bg-[rgba(10,20,46,0.56)] text-[#8FA3C7] hover:border-[#4FC3F7]/60 hover:text-[#E8F0FF]'
                            }`}
                          >
                            {target}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => handleQueueShare(photo)}
                        disabled={isQueuedForNetwork}
                        className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-[#4FC3F7]/45 bg-[rgba(79,195,247,0.14)] px-4 py-2 text-sm font-semibold text-[#E8F0FF] transition-colors hover:border-[#4FC3F7] hover:bg-[rgba(79,195,247,0.24)] disabled:cursor-default disabled:border-emerald-400/40 disabled:bg-emerald-500/15 disabled:text-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
                      >
                        <Share2 className="h-4 w-4 text-[#4FC3F7]" aria-hidden="true" />
                        <span>
                          {isQueuedForNetwork
                            ? `Added to Outbox (${activeNetwork})`
                            : 'Share when connected'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Outbox */}
      <section
        aria-labelledby="outbox-heading"
        className="glass-panel mt-8 p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="outbox-heading" className="text-xl font-semibold text-[#E8F0FF]">
            Outbox
          </h2>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8FA3C7]">
            <Lock className="h-3.5 w-3.5 text-[#4FC3F7]" aria-hidden="true" />
            <span>Your health data is never included in posts.</span>
          </span>
        </div>

        {outbox.length === 0 ? (
          <p className="mt-3 text-sm text-[#8FA3C7]">
            No photos queued yet. Pick a social button and choose &ldquo;Share
            when connected&rdquo; on any photo above.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-[rgba(120,180,255,0.14)]">
            {outbox.map((item) => (
              <li
                key={item.outboxId}
                className="flex flex-wrap items-center justify-between gap-4 py-3.5 first:pt-1 last:pb-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-12 w-16 overflow-hidden rounded-xl border border-[rgba(120,180,255,0.2)] bg-[#050B1A] shrink-0">
                    {item.photo.imageUrl ? (
                      <img
                        src={item.photo.imageUrl}
                        alt={item.photo.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <SpacePlaceholderSvg
                        variant={item.photo.variant ?? 'sunrise'}
                        title={item.photo.title}
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-base font-medium text-[#E8F0FF]">
                      {item.photo.title}
                    </p>
                    <p className="text-xs text-[#8FA3C7]">
                      {item.network} · Queued at {item.addedAt} (simulated)
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  {isConnected ? (
                    <>
                      <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-400/45 bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-200">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Ready to post</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setPostedFeedbackId(item.outboxId)}
                        className="rounded-xl bg-[#4FC3F7] px-3 py-1.5 text-xs font-semibold text-[#050B1A] hover:bg-[#7AD6FA] cursor-pointer"
                      >
                        {postedFeedbackId === item.outboxId
                          ? 'Demo posted (simulated)'
                          : 'Post (demo)'}
                      </button>
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/40 bg-amber-500/15 px-3 py-1.5 text-xs font-semibold text-amber-200">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Waiting for connection</span>
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="mt-8 border-t border-[rgba(120,180,255,0.14)] pt-5 text-center text-xs leading-relaxed text-[#8FA3C7]">
        Your health data is never included in posts. Social sharing buttons are
        simulated for this prototype. ORBITAL guides, it does not diagnose. All
        data shown is simulated.
      </footer>
    </section>
  );
}
