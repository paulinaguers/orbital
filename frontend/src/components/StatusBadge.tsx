// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { LEVEL_STYLES } from '../data/source';
import type { HealthLevel } from '../types/orbital';

interface StatusBadgeProps {
  level: HealthLevel;
  prefix?: string;
  variant?: 'dark' | 'pill';
}

export function StatusBadge({
  level,
  prefix,
  variant = 'dark',
}: StatusBadgeProps) {
  const style = LEVEL_STYLES[level];

  if (variant === 'pill') {
    return (
      <span
        className="inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wide whitespace-nowrap shrink-0"
        style={{
          backgroundColor: style.pillBg,
          color: style.pillTextColor,
          border: `1px solid ${style.color}`,
          boxShadow: style.pillGlow,
        }}
      >
        {style.label}
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-2 rounded-xl px-3 py-1 text-sm font-medium whitespace-nowrap shrink-0 backdrop-blur-md"
      style={{
        backgroundColor: style.pillBg,
        border: `1px solid ${style.color}`,
        color: style.pillTextColor,
        boxShadow: style.pillGlow,
      }}
    >
      <span
        aria-hidden="true"
        className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
        style={{ backgroundColor: style.color }}
      />
      <span>
        {prefix ? `${prefix}: ` : ''}
        {style.label}
      </span>
    </span>
  );
}
