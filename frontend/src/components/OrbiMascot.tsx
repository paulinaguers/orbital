// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { LEVEL_STYLES } from '../data/source';
import type { HealthLevel } from '../types/orbital';

interface OrbiMascotProps {
  level: HealthLevel;
  size?: 'sm' | 'md';
  stars?: number;
  showOrbit?: boolean;
  interactive?: boolean;
  celebrationKey?: number;
  onTap?: () => void;
}

const CONFETTI_PIECES = [
  { tx: '-88px', ty: '-72px', rot: '-140deg', color: '#FACC15' },
  { tx: '-54px', ty: '-98px', rot: '110deg', color: '#38BDF8' },
  { tx: '-18px', ty: '-108px', rot: '-85deg', color: '#2ECC71' },
  { tx: '22px', ty: '-104px', rot: '130deg', color: '#F472B6' },
  { tx: '64px', ty: '-92px', rot: '165deg', color: '#FBBF24' },
  { tx: '92px', ty: '-60px', rot: '-120deg', color: '#60A5FA' },
  { tx: '96px', ty: '-10px', rot: '95deg', color: '#34D399' },
  { tx: '78px', ty: '42px', rot: '-150deg', color: '#F59E0B' },
  { tx: '-94px', ty: '-18px', rot: '140deg', color: '#A78BFA' },
  { tx: '-76px', ty: '36px', rot: '-90deg', color: '#38BDF8' },
  { tx: '-38px', ty: '-64px', rot: '75deg', color: '#FDE047' },
  { tx: '42px', ty: '-68px', rot: '-110deg', color: '#FB7185' },
];

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

export function OrbiMascot({
  level,
  size = 'md',
  stars = 0,
  showOrbit = false,
  interactive = false,
  celebrationKey = 0,
  onTap,
}: OrbiMascotProps) {
  const { color, label } = LEVEL_STYLES[level];
  const isRedAlert = level === 'red';
  const isSmall = size === 'sm';
  const prefersReducedMotion = usePrefersReducedMotion();

  const hasAntennaLight = stars >= 5;
  const hasScarf = stars >= 10;
  const hasJetpack = stars >= 20;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [eyeOffset, setEyeOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [tapMotion, setTapMotion] = useState<'wiggle' | 'bounce' | null>(null);
  const [tapMotionKey, setTapMotionKey] = useState(0);
  const [isCelebrating, setIsCelebrating] = useState(false);

  // Follow mouse or finger slightly when interactive
  useEffect(() => {
    if (!interactive || isSmall || prefersReducedMotion) {
      setEyeOffset({ x: 0, y: 0 });
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const el = containerRef.current;
      if (!el) {
        return;
      }
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < 1) {
        setEyeOffset({ x: 0, y: 0 });
        return;
      }
      const scale = Math.min(1, dist / 220);
      setEyeOffset({
        x: (dx / dist) * 2.8 * scale,
        y: (dy / dist) * 2.1 * scale,
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [interactive, isSmall, prefersReducedMotion]);

  // Play short celebration animation when celebrationKey increments
  useEffect(() => {
    if (celebrationKey <= 0 || prefersReducedMotion) {
      setIsCelebrating(false);
      return;
    }

    setIsCelebrating(true);
    const timer = window.setTimeout(() => {
      setIsCelebrating(false);
    }, 1450);

    return () => window.clearTimeout(timer);
  }, [celebrationKey, prefersReducedMotion]);

  const handleTap = () => {
    if (!interactive) {
      return;
    }
    if (!prefersReducedMotion) {
      const nextMotion = Math.random() < 0.5 ? 'wiggle' : 'bounce';
      setTapMotion(nextMotion);
      setTapMotionKey((prev) => prev + 1);
    }
    onTap?.();
  };

  useEffect(() => {
    if (!tapMotion) {
      return;
    }
    const timer = window.setTimeout(() => {
      setTapMotion(null);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [tapMotion, tapMotionKey]);

  const visibleOrbitStars = showOrbit && !isSmall ? Math.min(stars, 10) : 0;
  const extraStars = showOrbit && !isSmall ? Math.max(0, stars - 10) : 0;

  const motionClass = isSmall
    ? ''
    : isCelebrating && !prefersReducedMotion
      ? 'animate-orbi-celebrate'
      : tapMotion === 'wiggle' && !prefersReducedMotion
        ? 'animate-orbi-wiggle'
        : tapMotion === 'bounce' && !prefersReducedMotion
          ? 'animate-orbi-bounce'
          : 'animate-orbi-float';

  const mascotSvg = (
    <svg
      viewBox="0 0 220 220"
      className={`relative ${
        isSmall ? 'h-16 w-16' : 'h-52 w-52 sm:h-56 sm:w-56 drop-shadow-lg'
      } ${motionClass}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ground shadow */}
      <ellipse
        cx="110"
        cy="198"
        rx="44"
        ry="7"
        fill="#03060C"
        fillOpacity="0.55"
      />

      {/* Milestone 20 stars: Little jetpack with flickering flames */}
      {hasJetpack && (
        <g aria-hidden="true">
          {/* Left thruster & flame */}
          <rect
            x="33"
            y="108"
            width="16"
            height="36"
            rx="6"
            fill="#475569"
            stroke="#94A3B8"
            strokeWidth="1.5"
          />
          <rect x="36" y="143" width="10" height="4" rx="2" fill="#CBD5E1" />
          <g className={prefersReducedMotion ? undefined : 'animate-orbi-flame-flicker'}>
            <path
              d="M36 147 Q41 168 46 147 Z"
              fill="#F97316"
            />
            <path
              d="M38.5 147 Q41 160 43.5 147 Z"
              fill="#FEF08A"
            />
          </g>

          {/* Right thruster & flame */}
          <rect
            x="171"
            y="108"
            width="16"
            height="36"
            rx="6"
            fill="#475569"
            stroke="#94A3B8"
            strokeWidth="1.5"
          />
          <rect x="174" y="143" width="10" height="4" rx="2" fill="#CBD5E1" />
          <g className={prefersReducedMotion ? undefined : 'animate-orbi-flame-flicker'}>
            <path
              d="M174 147 Q179 168 184 147 Z"
              fill="#F97316"
            />
            <path
              d="M176.5 147 Q179 160 181.5 147 Z"
              fill="#FEF08A"
            />
          </g>
        </g>
      )}

      {/* Left Antenna */}
      <path
        d="M84 62 C78 44, 70 36, 63 32"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <g className={isRedAlert ? 'animate-orbi-antenna-pulse' : undefined}>
        {hasAntennaLight && (
          <circle
            cx="60"
            cy="30"
            r="14"
            fill="#FDE047"
            fillOpacity="0.32"
          />
        )}
        <circle
          cx="60"
          cy="30"
          r="8"
          fill={hasAntennaLight ? '#FEF08A' : color}
        />
        <circle
          cx="58"
          cy="28"
          r="2.8"
          fill="#FFFFFF"
          fillOpacity={hasAntennaLight ? 0.9 : 0.55}
        />
      </g>

      {/* Right Antenna */}
      <path
        d="M136 62 C142 44, 150 36, 157 32"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <g className={isRedAlert ? 'animate-orbi-antenna-pulse' : undefined}>
        {hasAntennaLight && (
          <circle
            cx="160"
            cy="30"
            r="14"
            fill="#FDE047"
            fillOpacity="0.32"
          />
        )}
        <circle
          cx="160"
          cy="30"
          r="8"
          fill={hasAntennaLight ? '#FEF08A' : color}
        />
        <circle
          cx="158"
          cy="28"
          r="2.8"
          fill="#FFFFFF"
          fillOpacity={hasAntennaLight ? 0.9 : 0.55}
        />
      </g>

      {/* Little stubby feet */}
      <ellipse cx="86" cy="174" rx="14" ry="8" fill={color} />
      <ellipse cx="134" cy="174" rx="14" ry="8" fill={color} />
      <ellipse
        cx="86"
        cy="176"
        rx="14"
        ry="6"
        fill="#070B14"
        fillOpacity="0.22"
      />
      <ellipse
        cx="134"
        cy="176"
        rx="14"
        ry="6"
        fill="#070B14"
        fillOpacity="0.22"
      />

      {/* Little side arms */}
      <ellipse
        cx="46"
        cy="126"
        rx="12"
        ry="9"
        transform="rotate(-18 46 126)"
        fill={color}
      />
      <ellipse
        cx="174"
        cy="126"
        rx="12"
        ry="9"
        transform="rotate(18 174 126)"
        fill={color}
      />

      {/* Main round body */}
      <rect
        x="48"
        y="56"
        width="124"
        height="120"
        rx="58"
        fill={color}
        className="transition-colors duration-300"
      />

      {/* Gentle top highlight and lower depth shading */}
      <ellipse
        cx="110"
        cy="78"
        rx="42"
        ry="16"
        fill="#FFFFFF"
        fillOpacity="0.16"
      />
      <path
        d="M52 132 C56 164, 82 176, 110 176 C138 176, 164 164, 168 132 C156 154, 134 164, 110 164 C86 164, 64 154, 52 132 Z"
        fill="#070B14"
        fillOpacity="0.14"
      />

      {/* Soft face visor patch for calm legibility */}
      <rect
        x="64"
        y="78"
        width="92"
        height="68"
        rx="34"
        fill="#0B1220"
        fillOpacity="0.88"
      />

      {/* Milestone 10 stars: Small cozy scarf */}
      {hasScarf && (
        <g aria-hidden="true">
          <path
            d="M55 147 Q110 162 165 147 L162 159 Q110 174 58 159 Z"
            fill="#38BDF8"
            stroke="#E0F2FE"
            strokeOpacity="0.5"
            strokeWidth="1.2"
          />
          <path
            d="M133 154 L147 152 L152 178 Q144 182 136 179 Z"
            fill="#0284C7"
            stroke="#E0F2FE"
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
          <line
            x1="138"
            y1="173"
            x2="149"
            y2="171"
            stroke="#BAE6FD"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* Big blinking eyes with slight pointer tracking */}
      <g className="animate-orbi-blink">
        {/* Left eye */}
        <circle cx="89" cy="106" r="11.5" fill="#F8FAFC" />
        <g
          style={{
            transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
            transition: 'transform 80ms ease-out',
          }}
        >
          <circle cx="90.5" cy="106.5" r="6" fill="#0F172A" />
          <circle cx="93" cy="103.5" r="2.4" fill="#FFFFFF" />
        </g>

        {/* Right eye */}
        <circle cx="131" cy="106" r="11.5" fill="#F8FAFC" />
        <g
          style={{
            transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
            transition: 'transform 80ms ease-out',
          }}
        >
          <circle cx="129.5" cy="106.5" r="6" fill="#0F172A" />
          <circle cx="132" cy="103.5" r="2.4" fill="#FFFFFF" />
        </g>
      </g>

      {/* Expression eyebrows & mouth by overall_level */}
      {level === 'green' && (
        <>
          <ellipse
            cx="76"
            cy="120"
            rx="5.5"
            ry="3"
            fill={color}
            fillOpacity="0.35"
          />
          <ellipse
            cx="144"
            cy="120"
            rx="5.5"
            ry="3"
            fill={color}
            fillOpacity="0.35"
          />
          <path
            d="M97 123 Q110 135 123 123"
            stroke="#F8FAFC"
            strokeWidth="3.6"
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}

      {level === 'yellow' && (
        <path
          d="M99 126 Q110 128 121 126"
          stroke="#F8FAFC"
          strokeWidth="3.4"
          strokeLinecap="round"
          fill="none"
        />
      )}

      {level === 'orange' && (
        <>
          <path
            d="M78 92 L95 88"
            stroke="#F8FAFC"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M142 92 L125 88"
            stroke="#F8FAFC"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M98 130 Q110 122 122 130"
            stroke="#F8FAFC"
            strokeWidth="3.4"
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}

      {level === 'red' && (
        <>
          <path
            d="M78 88 L97 94"
            stroke="#F8FAFC"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M142 88 L123 94"
            stroke="#F8FAFC"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <ellipse
            cx="110"
            cy="128"
            rx="7.5"
            ry="5.5"
            stroke="#F8FAFC"
            strokeWidth="3"
            fill="#070B14"
          />
        </>
      )}
    </svg>
  );

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none shrink-0 ${
        showOrbit && !isSmall ? 'h-64 w-64 sm:h-68 sm:w-68' : ''
      }`}
    >
      {/* Subtle orbital halo behind Orbi */}
      {!isSmall && (
        <div
          aria-hidden="true"
          className="absolute h-48 w-48 rounded-full opacity-15 blur-2xl transition-colors duration-300"
          style={{ backgroundColor: color }}
        />
      )}

      {/* Slowly orbiting earned stars (up to 10 visible, +N pill above 10) */}
      {showOrbit && !isSmall && visibleOrbitStars > 0 && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 ${
            prefersReducedMotion ? '' : 'animate-orbi-orbit-spin'
          }`}
        >
          {Array.from({ length: visibleOrbitStars }, (_, idx) => {
            const angleDeg = (idx / visibleOrbitStars) * 360 - 90;
            const rad = (angleDeg * Math.PI) / 180;
            const rxPct = 46;
            const ryPct = 45;
            const leftPct = 50 + Math.cos(rad) * rxPct;
            const topPct = 50 + Math.sin(rad) * ryPct;

            return (
              <div
                key={idx}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`h-4 w-4 drop-shadow-[0_0_6px_rgba(250,204,21,0.75)] ${
                    prefersReducedMotion
                      ? ''
                      : 'animate-orbi-orbit-counter-spin'
                  }`}
                >
                  <path
                    d="M12 2.2 L14.8 8.3 L21.4 9.1 L16.5 13.7 L17.8 20.3 L12 17 L6.2 20.3 L7.5 13.7 L2.6 9.1 L9.2 8.3 Z"
                    fill="#FDE047"
                    stroke="#FEF9C3"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            );
          })}
        </div>
      )}

      {extraStars > 0 && (
        <span
          aria-hidden="true"
          className="font-mono-tabular pointer-events-none absolute right-1 top-3 rounded-full border border-amber-300/45 bg-amber-400/20 px-2 py-0.5 text-xs font-bold text-amber-200 shadow-sm"
        >
          +{extraStars}
        </span>
      )}

      {/* Flying star & confetti burst during celebration */}
      {isCelebrating && !prefersReducedMotion && (
        <div
          key={`star-${celebrationKey}`}
          aria-hidden="true"
          className="animate-orbi-star-fly pointer-events-none absolute left-1/2 top-1/2 z-30"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-9 w-9 drop-shadow-[0_0_14px_rgba(250,204,21,0.95)]"
          >
            <path
              d="M12 2.2 L14.8 8.3 L21.4 9.1 L16.5 13.7 L17.8 20.3 L12 17 L6.2 20.3 L7.5 13.7 L2.6 9.1 L9.2 8.3 Z"
              fill="#FDE047"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {isCelebrating && !prefersReducedMotion && (
        <div
          key={`confetti-${celebrationKey}`}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-20"
        >
          {CONFETTI_PIECES.map((piece, idx) => (
            <span
              key={idx}
              className="animate-orbi-confetti-pop absolute h-2.5 w-2.5 rounded-xs"
              style={
                {
                  backgroundColor: piece.color,
                  '--tx': piece.tx,
                  '--ty': piece.ty,
                  '--rot': piece.rot,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}

      {interactive ? (
        <button
          type="button"
          onClick={handleTap}
          aria-label={`Orbi companion mascot indicating ${label} status. Tap to say hello.`}
          className="relative flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 cursor-pointer"
        >
          {mascotSvg}
        </button>
      ) : (
        <div
          role="img"
          aria-label={`Orbi companion mascot indicating ${label} status`}
        >
          {mascotSvg}
        </div>
      )}
    </div>
  );
}
