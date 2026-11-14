// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { formatIndicatorValue, LEVEL_STYLES } from '../data/source';
import type { HealthBlock } from '../types/orbital';
import { StatusBadge } from './StatusBadge';

interface BlockCardProps {
  block: HealthBlock;
  onSelect: (blockId: string) => void;
  onHoverChange?: (blockId: string | null) => void;
  highlighted?: boolean;
  simpleMode?: boolean;
}

export function BlockCard({
  block,
  onSelect,
  onHoverChange,
  highlighted = false,
  simpleMode = false,
}: BlockCardProps) {
  if (simpleMode) {
    return (
      <button
        type="button"
        data-highlighted={highlighted ? 'true' : undefined}
        onClick={() => onSelect(block.id)}
        onMouseEnter={() => onHoverChange?.(block.id)}
        onMouseLeave={() => onHoverChange?.(null)}
        onFocus={() => onHoverChange?.(block.id)}
        onBlur={() => onHoverChange?.(null)}
        className="glass-card-interactive group w-full p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
      >
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <h2 className="text-lg font-semibold leading-snug text-[#E8F0FF] group-hover:text-white">
            {block.name}
          </h2>
          <StatusBadge level={block.level} variant="pill" />
        </div>

        <p className="mt-3 text-base leading-relaxed text-[#E8F0FF]/90">
          {block.simple_explanation ?? block.recommendation}
        </p>

        <div className="mt-4 flex items-center justify-end border-t border-[rgba(120,180,255,0.14)] pt-3">
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#4FC3F7] transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-[#7DD3FC]">
            See details →
          </span>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      data-highlighted={highlighted ? 'true' : undefined}
      onClick={() => onSelect(block.id)}
      onMouseEnter={() => onHoverChange?.(block.id)}
      onMouseLeave={() => onHoverChange?.(null)}
      onFocus={() => onHoverChange?.(block.id)}
      onBlur={() => onHoverChange?.(null)}
      className="glass-card-interactive group w-full p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
    >
      {/* Header: Block name + level pill */}
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-[15px] font-semibold leading-snug text-[#E8F0FF] group-hover:text-white">
          {block.name}
        </h2>
        <StatusBadge level={block.level} variant="pill" />
      </div>

      {/* Compact indicator list */}
      <ul className="mt-3 space-y-1.5 border-t border-[rgba(120,180,255,0.14)] pt-3">
        {block.indicators.map((indicator) => {
          const indStyle = LEVEL_STYLES[indicator.level];
          return (
            <li
              key={indicator.id}
              className="flex items-center justify-between gap-3 text-xs sm:text-[13px]"
            >
              <span className="flex min-w-0 items-center gap-2 text-[#8FA3C7]">
                <span
                  aria-label={`${indStyle.label} level`}
                  title={`${indStyle.label} level`}
                  className="inline-block h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: indStyle.color }}
                />
                <span className="truncate">{indicator.name}</span>
              </span>
              <span className="font-mono-tabular font-medium text-[#E8F0FF] whitespace-nowrap shrink-0">
                {formatIndicatorValue(indicator)}
              </span>
            </li>
          );
        })}
      </ul>

      {/* NASA / CSA risk area tags */}
      {block.nasa_risk.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-[rgba(120,180,255,0.14)] pt-2.5">
          {block.nasa_risk.map((risk) => (
            <span
              key={risk}
              className="rounded-md border border-[rgba(120,180,255,0.18)] bg-[rgba(10,20,46,0.55)] px-2 py-0.5 text-[11px] leading-tight text-[#8FA3C7]"
            >
              {risk}
            </span>
          ))}
        </div>
      )}

      {/* Clear click call-to-action */}
      <div className="mt-3 flex items-center justify-end border-t border-[rgba(120,180,255,0.14)] pt-2.5">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4FC3F7] transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-[#7DD3FC]">
          View metrics →
        </span>
      </div>
    </button>
  );
}
