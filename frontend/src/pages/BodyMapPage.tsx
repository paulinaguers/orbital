// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { ArrowLeft, Heart } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BlockCard } from '../components/BlockCard';
import {
  BODY_ANCHORS,
  BodySilhouette,
  SILHOUETTE_VIEWBOX,
} from '../components/BodySilhouette';
import { StatusBadge } from '../components/StatusBadge';
import { LEVEL_STYLES } from '../data/source';
import type { HealthBlock, OrbitalStatus, UserProfile } from '../types/orbital';

interface BodyMapPageProps {
  status: OrbitalStatus;
  profile: UserProfile;
  onNavigate: (path: string) => void;
}

interface ConnectorLine {
  id: string;
  d: string;
  color: string;
}

export function BodyMapPage({ status, profile, onNavigate }: BodyMapPageProps) {
  const isPassenger = profile === 'passenger';
  const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null);
  const [lines, setLines] = useState<ConnectorLine[]>([]);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const blocksById = useMemo(() => {
    const map: Record<string, HealthBlock | undefined> = {};
    for (const block of status.blocks) {
      map[block.id] = block;
    }
    return map;
  }, [status.blocks]);

  const openBlock = useCallback(
    (blockId: string) => {
      onNavigate(`/block/${blockId}`);
    },
    [onNavigate],
  );

  const computeLines = useCallback(() => {
    const stageEl = stageRef.current;
    const svgEl = svgRef.current;
    if (!stageEl || !svgEl) {
      return;
    }

    if (window.innerWidth < 1024) {
      setLines([]);
      return;
    }

    const stageRect = stageEl.getBoundingClientRect();
    const svgRect = svgEl.getBoundingClientRect();
    if (svgRect.width === 0 || svgRect.height === 0) {
      return;
    }

    const nextLines: ConnectorLine[] = [];

    // Left 2: mental_health (top-left head), cardio (center chest)
    // Right 2: sleep_cognition (top-right head), environment (outer right shoulder)
    // Bottom 1: metabolic (abdomen)
    const specs: Array<{
      id: string;
      side: 'left' | 'right' | 'bottom';
    }> = [
      { id: 'mental_health', side: 'left' },
      { id: 'cardio', side: 'left' },
      { id: 'sleep_cognition', side: 'right' },
      { id: 'environment', side: 'right' },
      { id: 'metabolic', side: 'bottom' },
    ];

    for (const { id, side } of specs) {
      const cardEl = cardRefs.current[id];
      const anchor = BODY_ANCHORS[id];
      const block = blocksById[id];
      if (!cardEl || !anchor || !block) {
        continue;
      }

      const cardRect = cardEl.getBoundingClientRect();
      const startX =
        svgRect.left -
        stageRect.left +
        (anchor.x / SILHOUETTE_VIEWBOX.width) * svgRect.width;
      const startY =
        svgRect.top -
        stageRect.top +
        (anchor.y / SILHOUETTE_VIEWBOX.height) * svgRect.height;

      let endX = 0;
      let endY = 0;
      let d = '';

      if (side === 'left') {
        endX = cardRect.right - stageRect.left;
        endY = cardRect.top - stageRect.top + cardRect.height * 0.5;
        const dx = endX - startX;
        d = `M ${startX} ${startY} C ${startX + dx * 0.55} ${startY}, ${startX + dx * 0.45} ${endY}, ${endX} ${endY}`;
      } else if (side === 'right') {
        endX = cardRect.left - stageRect.left;
        endY = cardRect.top - stageRect.top + cardRect.height * 0.5;
        const dx = endX - startX;
        d = `M ${startX} ${startY} C ${startX + dx * 0.55} ${startY}, ${startX + dx * 0.45} ${endY}, ${endX} ${endY}`;
      } else {
        endX = cardRect.left - stageRect.left + cardRect.width * 0.5;
        endY = cardRect.top - stageRect.top;
        const dy = endY - startY;
        d = `M ${startX} ${startY} C ${startX} ${startY + dy * 0.5}, ${endX} ${startY + dy * 0.5}, ${endX} ${endY}`;
      }

      nextLines.push({
        id,
        d,
        color: LEVEL_STYLES[block.level].color,
      });
    }

    setLines(nextLines);
  }, [blocksById]);

  useLayoutEffect(() => {
    computeLines();
  }, [computeLines]);

  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) {
      return;
    }

    const observer = new ResizeObserver(() => {
      computeLines();
    });
    observer.observe(stageEl);

    window.addEventListener('resize', computeLines);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', computeLines);
    };
  }, [computeLines]);

  const setCardRef = (id: string) => (el: HTMLDivElement | null) => {
    cardRefs.current[id] = el;
  };

  const mentalBlock = blocksById.mental_health;
  const cardioBlock = blocksById.cardio;
  const sleepBlock = blocksById.sleep_cognition;
  const envBlock = blocksById.environment;
  const metabolicBlock = blocksById.metabolic;

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-6 sm:px-8 sm:py-8">
      {/* Top row: Back to Orbi + Header Summary + My Circle corner card */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors duration-150 hover:text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Orbi</span>
          </button>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            {isPassenger ? 'How your body is doing today' : 'Your systems today'}
          </h1>

          <div
            className={`mt-2 flex flex-wrap items-center gap-2.5 ${
              isPassenger ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
            }`}
          >
            <StatusBadge level={status.overall_level} variant="pill" />
            <span className="text-slate-300">{status.overall_message}</span>
          </div>
        </div>

        {/* My Circle corner card */}
        <button
          type="button"
          onClick={() => onNavigate('/circle')}
          className={`flex min-h-[48px] items-center gap-3 self-start border border-slate-700/80 bg-[#10192D] px-4 py-3 text-left transition-all duration-150 hover:-translate-y-0.5 hover:border-slate-500/80 hover:bg-[#131E36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 cursor-pointer shrink-0 ${
            isPassenger ? 'rounded-3xl' : 'rounded-2xl'
          }`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/15 text-rose-300 shrink-0">
            <Heart className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium text-slate-100">
            My Circle – messages from Earth
          </span>
        </button>
      </div>

      {/* Body Map Stage: Silhouette in center + 5 cards around it on desktop, stacked on narrow screens */}
      <div
        ref={stageRef}
        className="relative mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(280px,1fr)_280px_minmax(280px,1fr)] lg:items-center lg:gap-x-10 lg:gap-y-6"
      >
        {/* Thin curved SVG connecting lines from each anchor dot to its card (desktop only) */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        >
          <defs>
            <filter id="line-bright-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {lines.map((line) => {
            const isHighlighted = hoveredBlockId === line.id;
            const isDimmed = Boolean(hoveredBlockId && !isHighlighted);
            return (
              <path
                key={line.id}
                d={line.d}
                fill="none"
                stroke={line.color}
                strokeWidth={isHighlighted ? 2.6 : 1.5}
                strokeOpacity={isHighlighted ? 1 : isDimmed ? 0.25 : 0.78}
                strokeLinecap="round"
                filter={isHighlighted ? 'url(#line-bright-glow)' : undefined}
                className="transition-all duration-150"
              />
            );
          })}
        </svg>

        {/* Center Silhouette (top on narrow screens, center column spanning rows 1-2 on desktop) */}
        <div className="relative z-10 order-1 flex items-center justify-center py-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <BodySilhouette
            svgRef={svgRef}
            blocksById={blocksById}
            onSelectBlock={openBlock}
            activeBlockId={hoveredBlockId}
            onHoverChange={setHoveredBlockId}
          />
        </div>

        {/* Left Top: Mental Health (anchor at top-left of head) */}
        {mentalBlock && (
          <div
            ref={setCardRef('mental_health')}
            className="relative z-10 order-2 lg:order-none lg:col-start-1 lg:row-start-1"
          >
            <BlockCard
              block={mentalBlock}
              onSelect={openBlock}
              onHoverChange={setHoveredBlockId}
              highlighted={hoveredBlockId === 'mental_health'}
              simpleMode={isPassenger}
            />
          </div>
        )}

        {/* Left Bottom: Cardiorespiratory & Oxygenation (anchor at center of chest) */}
        {cardioBlock && (
          <div
            ref={setCardRef('cardio')}
            className="relative z-10 order-3 lg:order-none lg:col-start-1 lg:row-start-2"
          >
            <BlockCard
              block={cardioBlock}
              onSelect={openBlock}
              onHoverChange={setHoveredBlockId}
              highlighted={hoveredBlockId === 'cardio'}
              simpleMode={isPassenger}
            />
          </div>
        )}

        {/* Right Top: Sleep & Cognition (anchor at top-right of head) */}
        {sleepBlock && (
          <div
            ref={setCardRef('sleep_cognition')}
            className="relative z-10 order-4 lg:order-none lg:col-start-3 lg:row-start-1"
          >
            <BlockCard
              block={sleepBlock}
              onSelect={openBlock}
              onHoverChange={setHoveredBlockId}
              highlighted={hoveredBlockId === 'sleep_cognition'}
              simpleMode={isPassenger}
            />
          </div>
        )}

        {/* Right Bottom: Environment, Radiation & Vision (anchor at outer shoulder edge) */}
        {envBlock && (
          <div
            ref={setCardRef('environment')}
            className="relative z-10 order-5 lg:order-none lg:col-start-3 lg:row-start-2"
          >
            <BlockCard
              block={envBlock}
              onSelect={openBlock}
              onHoverChange={setHoveredBlockId}
              highlighted={hoveredBlockId === 'environment'}
              simpleMode={isPassenger}
            />
          </div>
        )}

        {/* Bottom Center: Metabolic & Internal Balance (anchor on abdomen) */}
        {metabolicBlock && (
          <div
            ref={setCardRef('metabolic')}
            className="relative z-10 order-6 lg:order-none lg:col-start-2 lg:row-start-3 lg:w-[340px] lg:justify-self-center"
          >
            <BlockCard
              block={metabolicBlock}
              onSelect={openBlock}
              onHoverChange={setHoveredBlockId}
              highlighted={hoveredBlockId === 'metabolic'}
              simpleMode={isPassenger}
            />
          </div>
        )}
      </div>

      {/* Bottom Footnote + How alerts work link */}
      <footer className="mt-10 border-t border-slate-800/70 pt-5 text-center text-xs leading-relaxed text-slate-400">
        <span>
          {isPassenger
            ? 'ORBITAL guides, it does not diagnose. All data shown is simulated.'
            : 'Physical and environmental data come from onboard sensors and in-app tests based on NASA protocols. Mental health is self-reported and your journal stays private. All data shown is simulated.'}
        </span>{' '}
        <button
          type="button"
          onClick={() => onNavigate('/alerts-info')}
          className="font-medium text-slate-300 underline decoration-slate-600 underline-offset-4 transition-colors hover:text-slate-100 hover:decoration-slate-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 cursor-pointer"
        >
          How alerts work
        </button>
      </footer>
    </section>
  );
}
