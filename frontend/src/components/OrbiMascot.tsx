// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { LEVEL_STYLES } from '../data/source';
import type { HealthLevel } from '../types/orbital';

interface OrbiMascotProps {
  level: HealthLevel;
  size?: 'sm' | 'md';
}

export function OrbiMascot({ level, size = 'md' }: OrbiMascotProps) {
  const { color, label } = LEVEL_STYLES[level];
  const isRedAlert = level === 'red';
  const isSmall = size === 'sm';

  return (
    <div
      className="relative flex items-center justify-center select-none shrink-0"
      role="img"
      aria-label={`Orbi companion mascot indicating ${label} status`}
    >
      {/* Subtle orbital halo behind Orbi */}
      {!isSmall && (
        <div
          aria-hidden="true"
          className="absolute h-48 w-48 rounded-full opacity-15 blur-2xl transition-colors duration-300"
          style={{ backgroundColor: color }}
        />
      )}

      <svg
        viewBox="0 0 220 220"
        className={`relative ${
          isSmall
            ? 'h-16 w-16'
            : 'h-52 w-52 sm:h-56 sm:w-56 animate-orbi-float drop-shadow-lg'
        }`}
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

        {/* Left Antenna */}
        <path
          d="M84 62 C78 44, 70 36, 63 32"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <g className={isRedAlert ? 'animate-orbi-antenna-pulse' : undefined}>
          <circle cx="60" cy="30" r="8" fill={color} />
          <circle cx="58" cy="28" r="2.6" fill="#FFFFFF" fillOpacity="0.55" />
        </g>

        {/* Right Antenna */}
        <path
          d="M136 62 C142 44, 150 36, 157 32"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <g className={isRedAlert ? 'animate-orbi-antenna-pulse' : undefined}>
          <circle cx="160" cy="30" r="8" fill={color} />
          <circle cx="158" cy="28" r="2.6" fill="#FFFFFF" fillOpacity="0.55" />
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

        {/* Big blinking eyes */}
        <g className="animate-orbi-blink">
          {/* Left eye */}
          <circle cx="89" cy="106" r="11.5" fill="#F8FAFC" />
          <circle cx="90.5" cy="106.5" r="6" fill="#0F172A" />
          <circle cx="93" cy="103.5" r="2.4" fill="#FFFFFF" />

          {/* Right eye */}
          <circle cx="131" cy="106" r="11.5" fill="#F8FAFC" />
          <circle cx="129.5" cy="106.5" r="6" fill="#0F172A" />
          <circle cx="132" cy="103.5" r="2.4" fill="#FFFFFF" />
        </g>

        {/* Expression eyebrows & mouth by overall_level */}
        {level === 'green' && (
          <>
            {/* Soft blush */}
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
            {/* Happy curved smile */}
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
          <>
            {/* Calm neutral mouth */}
            <path
              d="M99 126 Q110 128 121 126"
              stroke="#F8FAFC"
              strokeWidth="3.4"
              strokeLinecap="round"
              fill="none"
            />
          </>
        )}

        {level === 'orange' && (
          <>
            {/* Concerned brows */}
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
            {/* Concerned mouth */}
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
            {/* Alert brows */}
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
            {/* Alert open mouth */}
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
    </div>
  );
}
