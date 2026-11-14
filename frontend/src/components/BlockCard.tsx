// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { formatIndicatorValue, LEVEL_STYLES } from '../data/source';
import type { HealthBlock } from '../types/orbital';
import { StatusBadge } from './StatusBadge';

interface BlockCardProps {
  block: HealthBlock;
  onSelect: (blockId: string) => void;
  onHoverChange?: (blockId: string | null) => void;
  highlighted?: boolean;
}

export function BlockCard({
  block,
  onSelect,
  onHoverChange,
  highlighted = false,
}: BlockCardProps) {
  const blockStyle = LEVEL_STYLES[block.level];

  return (
    <button
      type="button"
      onClick={() => onSelect(block.id)}
      onMouseEnter={() => onHoverChange?.(block.id)}
      onMouseLeave={() => onHoverChange?.(null)}
      onFocus={() => onHoverChange?.(block.id)}
      onBlur={() => onHoverChange?.(null)}
      className={`group w-full rounded-2xl bg-[#10192D] p-4 text-left transition-all duration-150 ease-out hover:-translate-y-1 hover:bg-[#131E36] hover:shadow-xl hover:shadow-black/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 cursor-pointer ${
        highlighted
          ? '-translate-y-1 bg-[#131E36] shadow-xl shadow-black/35'
          : 'shadow-lg shadow-black/20'
      }`}
      style={{
        border: `1.5px solid ${blockStyle.color}`,
      }}
    >
      {/* Header: Block name + level pill */}
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-[15px] font-semibold leading-snug text-slate-50 group-hover:text-white">
          {block.name}
        </h2>
        <StatusBadge level={block.level} variant="pill" />
      </div>

      {/* Compact indicator list */}
      <ul className="mt-3 space-y-1.5 border-t border-slate-800/80 pt-3">
        {block.indicators.map((indicator) => {
          const indStyle = LEVEL_STYLES[indicator.level];
          return (
            <li
              key={indicator.id}
              className="flex items-center justify-between gap-3 text-xs sm:text-[13px]"
            >
              <span className="flex min-w-0 items-center gap-2 text-slate-300">
                <span
                  aria-label={`${indStyle.label} level`}
                  title={`${indStyle.label} level`}
                  className="inline-block h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: indStyle.color }}
                />
                <span className="truncate">{indicator.name}</span>
              </span>
              <span className="font-mono-tabular font-medium text-slate-100 whitespace-nowrap shrink-0">
                {formatIndicatorValue(indicator)}
              </span>
            </li>
          );
        })}
      </ul>

      {/* NASA / CSA risk area tags */}
      {block.nasa_risk.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-slate-800/70 pt-2.5">
          {block.nasa_risk.map((risk) => (
            <span
              key={risk}
              className="rounded-md border border-slate-700/70 bg-slate-800/75 px-2 py-0.5 text-[11px] leading-tight text-slate-300"
            >
              {risk}
            </span>
          ))}
        </div>
      )}

      {/* Clear click call-to-action */}
      <div className="mt-3 flex items-center justify-end border-t border-slate-800/60 pt-2.5">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-sky-300">
          View metrics →
        </span>
      </div>
    </button>
  );
}
