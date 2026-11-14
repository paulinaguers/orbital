// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import type { RefObject } from 'react';
import { LEVEL_STYLES } from '../data/source';
import type { HealthBlock, HealthLevel } from '../types/orbital';

export const SILHOUETTE_VIEWBOX = {
  width: 280,
  height: 430,
};

// Distinct anchor point per block on the silhouette (no shared points)
export const BODY_ANCHORS: Record<
  string,
  { x: number; y: number; label: string }
> = {
  mental_health: { x: 118, y: 48, label: 'Mental Health — top-left of head' },
  sleep_cognition: {
    x: 162,
    y: 48,
    label: 'Sleep & Cognition — top-right of head',
  },
  cardio: {
    x: 140,
    y: 158,
    label: 'Cardiorespiratory & Oxygenation — center of chest',
  },
  metabolic: {
    x: 140,
    y: 215,
    label: 'Metabolic & Internal Balance — abdomen',
  },
  environment: {
    x: 224,
    y: 140,
    label: 'Environment, Radiation & Vision — outer shoulder exposure',
  },
};

interface BodySilhouetteProps {
  blocksById: Record<string, HealthBlock | undefined>;
  svgRef?: RefObject<SVGSVGElement | null>;
  onSelectBlock: (blockId: string) => void;
  activeBlockId?: string | null;
  onHoverChange?: (blockId: string | null) => void;
}

function isElevatedLevel(level?: HealthLevel): boolean {
  return level === 'orange' || level === 'red';
}

export function BodySilhouette({
  blocksById,
  svgRef,
  onSelectBlock,
  activeBlockId,
  onHoverChange,
}: BodySilhouetteProps) {
  const cardio = blocksById.cardio;
  const sleep = blocksById.sleep_cognition;
  const mental = blocksById.mental_health;
  const metabolic = blocksById.metabolic;
  const environment = blocksById.environment;

  const getColor = (block?: HealthBlock) =>
    block ? LEVEL_STYLES[block.level].color : '#64748B';

  const cardioColor = getColor(cardio);
  const sleepColor = getColor(sleep);
  const mentalColor = getColor(mental);
  const metabolicColor = getColor(metabolic);
  const envColor = getColor(environment);

  const handleKeyDown = (
    e: React.KeyboardEvent<SVGGElement>,
    blockId: string,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectBlock(blockId);
    }
  };

  const anchorEntries = Object.entries(BODY_ANCHORS);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${SILHOUETTE_VIEWBOX.width} ${SILHOUETTE_VIEWBOX.height}`}
      className="mx-auto h-auto w-full max-w-[260px] sm:max-w-[280px] select-none"
      role="img"
      aria-label="Interactive astronaut body map showing health status by body region"
    >
      <defs>
        <filter id="body-soft-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="anchor-bright-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Dashed cabin exposure outline around whole spacesuit (Environment block) */}
      <g
        role="button"
        tabIndex={0}
        aria-label="Environment, Radiation & Vision — Cabin exposure"
        onClick={() => onSelectBlock('environment')}
        onKeyDown={(e) => handleKeyDown(e, 'environment')}
        onMouseEnter={() => onHoverChange?.('environment')}
        onMouseLeave={() => onHoverChange?.(null)}
        className="cursor-pointer focus:outline-none"
        filter={
          isElevatedLevel(environment?.level)
            ? 'url(#body-soft-glow)'
            : undefined
        }
      >
        <rect
          x="18"
          y="10"
          width="244"
          height="410"
          rx="116"
          fill={envColor}
          fillOpacity={activeBlockId === 'environment' ? 0.09 : 0.03}
          stroke={envColor}
          strokeWidth={activeBlockId === 'environment' ? 2.2 : 1.6}
          strokeOpacity={activeBlockId === 'environment' ? 1 : 0.75}
          strokeDasharray="7 6"
        />
      </g>

      {/* Plain generic spacesuit outline (no patches, flags, or logos) */}
      <g pointerEvents="none">
        {/* Helmet outer shell */}
        <circle
          cx="140"
          cy="68"
          r="42"
          fill="rgba(14, 26, 56, 0.85)"
          stroke="rgba(120, 180, 255, 0.35)"
          strokeWidth="2.2"
        />
        {/* Helmet visor inner frame */}
        <rect
          x="108"
          y="40"
          width="64"
          height="54"
          rx="27"
          fill="rgba(7, 15, 36, 0.9)"
          stroke="rgba(120, 180, 255, 0.25)"
          strokeWidth="1.5"
        />
        {/* Neck ring collar */}
        <rect
          x="114"
          y="105"
          width="52"
          height="13"
          rx="6.5"
          fill="rgba(20, 35, 70, 0.85)"
          stroke="rgba(120, 180, 255, 0.35)"
          strokeWidth="1.8"
        />
        {/* Torso, arms, and legs generic suit silhouette */}
        <path
          d="M 112 117
             L 84 123
             C 68 127, 56 140, 52 158
             L 38 232
             C 36 244, 42 252, 52 253
             C 61 254, 67 247, 70 235
             L 82 174
             L 88 174
             L 86 248
             L 86 382
             C 86 396, 95 404, 108 404
             C 121 404, 128 396, 128 382
             L 132 276
             L 148 276
             L 152 382
             C 152 396, 159 404, 172 404
             C 185 404, 194 396, 194 382
             L 194 248
             L 192 174
             L 198 174
             L 210 235
             C 213 247, 219 254, 228 253
             C 238 252, 244 244, 242 232
             L 228 158
             C 224 140, 212 127, 196 123
             L 168 117
             Z"
          fill="rgba(14, 26, 56, 0.85)"
          stroke="rgba(120, 180, 255, 0.35)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Generic suit waist belt & boot cuffs */}
        <line
          x1="88"
          y1="242"
          x2="192"
          y2="242"
          stroke="rgba(120, 180, 255, 0.25)"
          strokeWidth="1.6"
        />
        <line
          x1="86"
          y1="364"
          x2="128"
          y2="364"
          stroke="rgba(120, 180, 255, 0.25)"
          strokeWidth="1.5"
        />
        <line
          x1="152"
          y1="364"
          x2="194"
          y2="364"
          stroke="rgba(120, 180, 255, 0.25)"
          strokeWidth="1.5"
        />
      </g>

      {/* BRAIN LEFT (top-left of head): Mental Health */}
      <g
        role="button"
        tabIndex={0}
        aria-label="Mental Health — Head and mind"
        onClick={() => onSelectBlock('mental_health')}
        onKeyDown={(e) => handleKeyDown(e, 'mental_health')}
        onMouseEnter={() => onHoverChange?.('mental_health')}
        onMouseLeave={() => onHoverChange?.(null)}
        className="cursor-pointer focus:outline-none"
        filter={
          isElevatedLevel(mental?.level) ? 'url(#body-soft-glow)' : undefined
        }
      >
        <path
          d="M 139 43
             C 123 43, 113 51, 114 61
             C 114 66, 119 69, 127 69
             L 139 69
             Z"
          fill={mentalColor}
          fillOpacity={activeBlockId === 'mental_health' ? 0.55 : 0.3}
          stroke={mentalColor}
          strokeWidth={activeBlockId === 'mental_health' ? 2.2 : 1.5}
        />
      </g>

      {/* BRAIN RIGHT (top-right of head): Sleep & Cognition */}
      <g
        role="button"
        tabIndex={0}
        aria-label="Sleep & Cognition — Head and brain"
        onClick={() => onSelectBlock('sleep_cognition')}
        onKeyDown={(e) => handleKeyDown(e, 'sleep_cognition')}
        onMouseEnter={() => onHoverChange?.('sleep_cognition')}
        onMouseLeave={() => onHoverChange?.(null)}
        className="cursor-pointer focus:outline-none"
        filter={
          isElevatedLevel(sleep?.level) ? 'url(#body-soft-glow)' : undefined
        }
      >
        <path
          d="M 141 43
             C 157 43, 167 51, 166 61
             C 166 66, 161 69, 153 69
             L 141 69
             Z"
          fill={sleepColor}
          fillOpacity={activeBlockId === 'sleep_cognition' ? 0.55 : 0.3}
          stroke={sleepColor}
          strokeWidth={activeBlockId === 'sleep_cognition' ? 2.2 : 1.5}
        />
      </g>

      {/* EYES: Environment, Radiation & Vision */}
      <g
        role="button"
        tabIndex={0}
        aria-label="Environment, Radiation & Vision — Eyes"
        onClick={() => onSelectBlock('environment')}
        onKeyDown={(e) => handleKeyDown(e, 'environment')}
        onMouseEnter={() => onHoverChange?.('environment')}
        onMouseLeave={() => onHoverChange?.(null)}
        className="cursor-pointer focus:outline-none"
        filter={
          isElevatedLevel(environment?.level)
            ? 'url(#body-soft-glow)'
            : undefined
        }
      >
        <ellipse
          cx="127"
          cy="80"
          rx="8.5"
          ry="5"
          fill={envColor}
          fillOpacity={activeBlockId === 'environment' ? 0.6 : 0.34}
          stroke={envColor}
          strokeWidth={activeBlockId === 'environment' ? 2 : 1.4}
        />
        <ellipse
          cx="153"
          cy="80"
          rx="8.5"
          ry="5"
          fill={envColor}
          fillOpacity={activeBlockId === 'environment' ? 0.6 : 0.34}
          stroke={envColor}
          strokeWidth={activeBlockId === 'environment' ? 2 : 1.4}
        />
      </g>

      {/* CHEST (HEART & LUNGS): Cardiorespiratory & Oxygenation */}
      <g
        role="button"
        tabIndex={0}
        aria-label="Cardiorespiratory & Oxygenation — Chest, heart and lungs"
        onClick={() => onSelectBlock('cardio')}
        onKeyDown={(e) => handleKeyDown(e, 'cardio')}
        onMouseEnter={() => onHoverChange?.('cardio')}
        onMouseLeave={() => onHoverChange?.(null)}
        className="cursor-pointer focus:outline-none"
        filter={
          isElevatedLevel(cardio?.level) ? 'url(#body-soft-glow)' : undefined
        }
      >
        {/* Left lung */}
        <path
          d="M 135 137
             C 118 137, 105 151, 105 168
             C 105 178, 113 183, 124 182
             C 131 181, 135 175, 135 167
             Z"
          fill={cardioColor}
          fillOpacity={activeBlockId === 'cardio' ? 0.52 : 0.26}
          stroke={cardioColor}
          strokeWidth={activeBlockId === 'cardio' ? 2.2 : 1.5}
        />
        {/* Right lung */}
        <path
          d="M 145 137
             C 162 137, 175 151, 175 168
             C 175 178, 167 183, 156 182
             C 149 181, 145 175, 145 167
             Z"
          fill={cardioColor}
          fillOpacity={activeBlockId === 'cardio' ? 0.52 : 0.26}
          stroke={cardioColor}
          strokeWidth={activeBlockId === 'cardio' ? 2.2 : 1.5}
        />
        {/* Heart */}
        <path
          d="M 140 156
             C 136 151, 129 154, 130 161
             C 131 167, 140 174, 142 175
             C 145 173, 152 167, 151 160
             C 151 154, 144 151, 140 156 Z"
          fill={cardioColor}
          fillOpacity={activeBlockId === 'cardio' ? 0.78 : 0.48}
          stroke={cardioColor}
          strokeWidth="1.4"
        />
      </g>

      {/* ABDOMEN: Metabolic & Internal Balance */}
      <g
        role="button"
        tabIndex={0}
        aria-label="Metabolic & Internal Balance — Abdomen"
        onClick={() => onSelectBlock('metabolic')}
        onKeyDown={(e) => handleKeyDown(e, 'metabolic')}
        onMouseEnter={() => onHoverChange?.('metabolic')}
        onMouseLeave={() => onHoverChange?.(null)}
        className="cursor-pointer focus:outline-none"
        filter={
          isElevatedLevel(metabolic?.level) ? 'url(#body-soft-glow)' : undefined
        }
      >
        <rect
          x="108"
          y="194"
          width="64"
          height="42"
          rx="18"
          fill={metabolicColor}
          fillOpacity={activeBlockId === 'metabolic' ? 0.52 : 0.26}
          stroke={metabolicColor}
          strokeWidth={activeBlockId === 'metabolic' ? 2.2 : 1.5}
        />
      </g>

      {/* Clickable Anchor Dots (one distinct anchor per block) */}
      {anchorEntries.map(([id, anchor]) => {
        const block = blocksById[id];
        if (!block) {
          return null;
        }
        const dotColor = LEVEL_STYLES[block.level].color;
        const isActive = activeBlockId === id;
        const isDimmed = Boolean(activeBlockId && !isActive);
        const pulse = isElevatedLevel(block.level);

        return (
          <g
            key={id}
            role="button"
            tabIndex={0}
            aria-label={anchor.label}
            onClick={() => onSelectBlock(id)}
            onKeyDown={(e) => handleKeyDown(e, id)}
            onMouseEnter={() => onHoverChange?.(id)}
            onMouseLeave={() => onHoverChange?.(null)}
            className="cursor-pointer focus:outline-none"
            opacity={isDimmed ? 0.45 : 1}
          >
            {/* Larger invisible hit area for comfortable clicking */}
            <circle cx={anchor.x} cy={anchor.y} r="13" fill="transparent" />

            {/* Soft pulse halo for orange or red levels */}
            {pulse && (
              <circle
                cx={anchor.x}
                cy={anchor.y}
                r="7"
                fill={dotColor}
                className="animate-anchor-pulse"
                pointerEvents="none"
              />
            )}

            {/* Anchor circle filled with block level color */}
            <circle
              cx={anchor.x}
              cy={anchor.y}
              r={isActive ? 7 : 5.2}
              fill={dotColor}
              stroke="#F8FAFC"
              strokeWidth={isActive ? 2.2 : 1.5}
              filter={isActive ? 'url(#anchor-bright-glow)' : undefined}
              className="transition-all duration-150"
            />
          </g>
        );
      })}
    </svg>
  );
}
