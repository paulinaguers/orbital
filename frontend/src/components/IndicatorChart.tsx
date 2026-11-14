// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { LEVEL_STYLES } from '../data/source';
import type {
  BloodPressureIndicatorSeries,
  HealthLevel,
  IndicatorSeries,
  NumericIndicatorSeries,
  VisionAmslerIndicatorSeries,
} from '../types/orbital';
import { StatusBadge } from './StatusBadge';

interface IndicatorChartProps {
  series: IndicatorSeries;
  unit: string;
}

const SVG_WIDTH = 660;
const SVG_HEIGHT = 236;
const MARGIN = { top: 28, right: 32, bottom: 44, left: 76 };
const PLOT_WIDTH = SVG_WIDTH - MARGIN.left - MARGIN.right;
const PLOT_HEIGHT = SVG_HEIGHT - MARGIN.top - MARGIN.bottom;

function formatTick(val: number): string {
  if (Number.isInteger(val)) {
    return String(val);
  }
  return Number(val.toFixed(1)).toString();
}

function formatTickWithUnit(val: number, unit: string): string {
  const shortUnit = unit === '/10 (10 = worst)' ? '/10' : unit;
  return `${formatTick(val)}${shortUnit ? ` ${shortUnit}` : ''}`;
}

function getYDomain(values: number[]): { min: number; max: number } {
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const span = rawMax - rawMin || 1;
  const pad = span * 0.24;
  const min = Math.max(0, rawMin - pad);
  const max = rawMax + pad;
  return { min, max };
}

function xForIndex(index: number, count: number): number {
  if (count <= 1) {
    return MARGIN.left + PLOT_WIDTH / 2;
  }
  return MARGIN.left + (index / (count - 1)) * PLOT_WIDTH;
}

function yForValue(val: number, min: number, max: number): number {
  const ratio = (val - min) / (max - min || 1);
  return MARGIN.top + PLOT_HEIGHT - ratio * PLOT_HEIGHT;
}

function VisionAmslerHistory({
  series,
}: {
  series: VisionAmslerIndicatorSeries;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const hoveredPoint =
    hoveredIdx !== null ? series.points[hoveredIdx] : undefined;

  return (
    <div className="mt-5">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <span>14-day screening history</span>
        {hoveredPoint ? (
          <span className="inline-flex items-center gap-2 text-slate-200">
            <span className="font-mono-tabular font-medium">
              Day {hoveredPoint.flight_day}:
            </span>
            <span>{hoveredPoint.result}</span>
            <StatusBadge level={hoveredPoint.level} variant="pill" />
          </span>
        ) : (
          <span>Hover a day to inspect result</span>
        )}
      </div>

      <div className="grid grid-cols-7 gap-2 sm:grid-cols-14">
        {series.points.map((point, idx) => {
          const style = LEVEL_STYLES[point.level];
          const isHovered = hoveredIdx === idx;
          const isToday = idx === series.points.length - 1;
          const isDistortion = point.result === 'Distortion reported';

          return (
            <button
              key={point.flight_day}
              type="button"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onFocus={() => setHoveredIdx(idx)}
              onBlur={() => setHoveredIdx(null)}
              title={`Flight day ${point.flight_day}${isToday ? ' (Today)' : ''}: ${point.result} (${style.label})`}
              aria-label={`Flight day ${point.flight_day}${isToday ? ' (Today)' : ''}: ${point.result}, ${style.label}`}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl border py-2.5 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
                isHovered
                  ? 'border-slate-500 bg-slate-800/90 -translate-y-0.5'
                  : isToday
                    ? 'border-slate-600 bg-slate-800/50'
                    : 'border-slate-800/80 bg-[#0B1222]'
              }`}
            >
              {isDistortion ? (
                <AlertTriangle
                  className={isToday ? 'h-5 w-5' : 'h-4 w-4'}
                  style={{ color: style.color }}
                  aria-hidden="true"
                />
              ) : (
                <CheckCircle2
                  className={isToday ? 'h-5 w-5' : 'h-4 w-4'}
                  style={{ color: style.color }}
                  aria-hidden="true"
                />
              )}
              <span className="font-mono-tabular text-[11px] font-medium text-slate-300">
                {isToday ? 'Today' : point.flight_day}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-2.5 text-center text-xs text-slate-400">
        Flight day · Icons = daily results (color = level)
      </p>
    </div>
  );
}

function BloodPressureChart({
  series,
  unit,
}: {
  series: BloodPressureIndicatorSeries;
  unit: string;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const points = series.points;

  const allValues = [
    series.baseline_low_systolic,
    series.baseline_high_systolic,
    series.baseline_low_diastolic,
    series.baseline_high_diastolic,
    ...points.flatMap((p) => [p.systolic, p.diastolic]),
  ];
  const { min, max } = getYDomain(allValues);

  const yTicks = [0, 0.33, 0.67, 1].map((t) => min + (max - min) * t);

  const sysBandTop = yForValue(series.baseline_high_systolic, min, max);
  const sysBandBottom = yForValue(series.baseline_low_systolic, min, max);
  const diaBandTop = yForValue(series.baseline_high_diastolic, min, max);
  const diaBandBottom = yForValue(series.baseline_low_diastolic, min, max);

  const sysPolyline = points
    .map(
      (p, i) =>
        `${xForIndex(i, points.length)},${yForValue(p.systolic, min, max)}`,
    )
    .join(' ');

  const diaPolyline = points
    .map(
      (p, i) =>
        `${xForIndex(i, points.length)},${yForValue(p.diastolic, min, max)}`,
    )
    .join(' ');

  const hoveredPoint = hoveredIdx !== null ? points[hoveredIdx] : undefined;
  const hoveredLeftPct =
    hoveredIdx !== null
      ? (xForIndex(hoveredIdx, points.length) / SVG_WIDTH) * 100
      : 50;

  return (
    <div className="mt-5">
      {/* Line style key */}
      <div className="mb-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 bg-slate-200" />
          <span>Systolic</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 border-t-2 border-dashed border-slate-400" />
          <span>Diastolic</span>
        </span>
      </div>

      <div className="relative">
        {/* Tooltip */}
        {hoveredPoint && (
          <div
            className="pointer-events-none absolute -top-2 z-10 rounded-xl border border-slate-700 bg-[#080D18]/95 px-3 py-2 text-xs shadow-xl"
            style={{
              left: `${Math.min(Math.max(hoveredLeftPct, 18), 82)}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="font-mono-tabular font-medium text-slate-300">
                Flight day {hoveredPoint.flight_day}
              </span>
              <StatusBadge level={hoveredPoint.level} variant="pill" />
            </div>
            <p className="font-mono-tabular mt-1 font-semibold text-slate-50">
              {hoveredPoint.systolic}/{hoveredPoint.diastolic} {unit}
            </p>
          </div>
        )}

        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="h-auto w-full overflow-visible select-none"
          role="img"
          aria-label="14-day blood pressure trend chart for flight days 29 to 42"
        >
          {/* Y-axis horizontal gridlines and ticks with unit */}
          {yTicks.map((tick, idx) => {
            const y = yForValue(tick, min, max);
            return (
              <g key={idx}>
                <line
                  x1={MARGIN.left}
                  y1={y}
                  x2={SVG_WIDTH - MARGIN.right}
                  y2={y}
                  stroke="#1E293B"
                  strokeWidth="1"
                />
                <text
                  x={MARGIN.left - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fill="#94A3B8"
                  fontSize="10.5"
                  className="font-mono-tabular"
                >
                  {formatTickWithUnit(tick, unit)}
                </text>
              </g>
            );
          })}

          {/* Shaded baseline bands: Systolic & Diastolic */}
          <rect
            x={MARGIN.left}
            y={sysBandTop}
            width={PLOT_WIDTH}
            height={Math.max(1, sysBandBottom - sysBandTop)}
            fill="#38BDF8"
            fillOpacity="0.11"
          />
          <rect
            x={MARGIN.left}
            y={diaBandTop}
            width={PLOT_WIDTH}
            height={Math.max(1, diaBandBottom - diaBandTop)}
            fill="#38BDF8"
            fillOpacity="0.11"
          />

          {/* Hover vertical guide line */}
          {hoveredIdx !== null && (
            <line
              x1={xForIndex(hoveredIdx, points.length)}
              y1={MARGIN.top}
              x2={xForIndex(hoveredIdx, points.length)}
              y2={MARGIN.top + PLOT_HEIGHT}
              stroke="#475569"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          )}

          {/* Systolic & Diastolic trend lines */}
          <polyline
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={sysPolyline}
          />
          <polyline
            fill="none"
            stroke="#94A3B8"
            strokeWidth="2"
            strokeDasharray="5 4"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={diaPolyline}
          />

          {/* Points & X-axis labels */}
          {points.map((p, i) => {
            const x = xForIndex(i, points.length);
            const ySys = yForValue(p.systolic, min, max);
            const yDia = yForValue(p.diastolic, min, max);
            const color = LEVEL_STYLES[p.level].color;
            const isToday = i === points.length - 1;
            const isActive = hoveredIdx === i;
            const radius = isActive ? 7.2 : isToday ? 6.2 : 4.2;

            return (
              <g key={p.flight_day}>
                <text
                  x={x}
                  y={MARGIN.top + PLOT_HEIGHT + 18}
                  textAnchor="middle"
                  fill={isActive || isToday ? '#F8FAFC' : '#94A3B8'}
                  fontWeight={isToday ? '600' : '400'}
                  fontSize="11"
                  className="font-mono-tabular"
                >
                  {p.flight_day}
                </text>

                {isToday && (
                  <>
                    <circle
                      cx={x}
                      cy={ySys}
                      r={9.5}
                      fill={color}
                      fillOpacity="0.22"
                    />
                    <circle
                      cx={x}
                      cy={yDia}
                      r={9.5}
                      fill={color}
                      fillOpacity="0.22"
                    />
                    <text
                      x={x}
                      y={ySys - 12}
                      textAnchor="middle"
                      fill="#F8FAFC"
                      fontSize="11"
                      fontWeight="600"
                    >
                      Today
                    </text>
                  </>
                )}

                <circle
                  cx={x}
                  cy={ySys}
                  r={radius}
                  fill={color}
                  stroke={isToday ? '#F8FAFC' : '#0B1222'}
                  strokeWidth={isToday ? 2 : 1.8}
                />
                <circle
                  cx={x}
                  cy={yDia}
                  r={radius}
                  fill={color}
                  stroke={isToday ? '#F8FAFC' : '#0B1222'}
                  strokeWidth={isToday ? 2 : 1.8}
                />

                <rect
                  x={x - PLOT_WIDTH / (points.length * 2)}
                  y={MARGIN.top}
                  width={PLOT_WIDTH / points.length}
                  height={PLOT_HEIGHT + 24}
                  fill="transparent"
                  tabIndex={0}
                  aria-label={`Flight day ${p.flight_day}${isToday ? ' (Today)' : ''}: ${p.systolic}/${p.diastolic} ${unit}, ${LEVEL_STYLES[p.level].label}`}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onFocus={() => setHoveredIdx(i)}
                  onBlur={() => setHoveredIdx(null)}
                  className="cursor-crosshair focus:outline-none"
                />
              </g>
            );
          })}

          {/* X-axis title */}
          <text
            x={MARGIN.left + PLOT_WIDTH / 2}
            y={SVG_HEIGHT - 4}
            textAnchor="middle"
            fill="#94A3B8"
            fontSize="11.5"
          >
            Flight day
          </text>
        </svg>
      </div>

      {/* Required Legend */}
      <p className="mt-2 text-center text-xs text-slate-400">
        Shaded area = your usual range · Dots = daily values (color = level)
      </p>
    </div>
  );
}

function NumericTrendChart({
  series,
  unit,
}: {
  series: NumericIndicatorSeries;
  unit: string;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const points = series.points;

  const allValues = [
    series.baseline_low,
    series.baseline_high,
    ...points.map((p) => p.value),
  ];
  const { min, max } = getYDomain(allValues);

  const yTicks = [0, 0.33, 0.67, 1].map((t) => min + (max - min) * t);

  const bandTop = yForValue(series.baseline_high, min, max);
  const bandBottom = yForValue(series.baseline_low, min, max);

  const polyline = points
    .map(
      (p, i) =>
        `${xForIndex(i, points.length)},${yForValue(p.value, min, max)}`,
    )
    .join(' ');

  const hoveredPoint = hoveredIdx !== null ? points[hoveredIdx] : undefined;
  const hoveredLeftPct =
    hoveredIdx !== null
      ? (xForIndex(hoveredIdx, points.length) / SVG_WIDTH) * 100
      : 50;

  return (
    <div className="mt-5">
      <div className="relative">
        {hoveredPoint && (
          <div
            className="pointer-events-none absolute -top-2 z-10 rounded-xl border border-slate-700 bg-[#080D18]/95 px-3 py-2 text-xs shadow-xl"
            style={{
              left: `${Math.min(Math.max(hoveredLeftPct, 18), 82)}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="font-mono-tabular font-medium text-slate-300">
                Flight day {hoveredPoint.flight_day}
              </span>
              <StatusBadge
                level={hoveredPoint.level as HealthLevel}
                variant="pill"
              />
            </div>
            <p className="font-mono-tabular mt-1 font-semibold text-slate-50">
              {hoveredPoint.value}
              {unit ? ` ${unit}` : ''}
            </p>
          </div>
        )}

        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="h-auto w-full overflow-visible select-none"
          role="img"
          aria-label={`14-day trend chart for ${series.indicator} from flight day 29 to 42`}
        >
          {/* Y-axis horizontal gridlines and ticks with unit */}
          {yTicks.map((tick, idx) => {
            const y = yForValue(tick, min, max);
            return (
              <g key={idx}>
                <line
                  x1={MARGIN.left}
                  y1={y}
                  x2={SVG_WIDTH - MARGIN.right}
                  y2={y}
                  stroke="#1E293B"
                  strokeWidth="1"
                />
                <text
                  x={MARGIN.left - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fill="#94A3B8"
                  fontSize="10.5"
                  className="font-mono-tabular"
                >
                  {formatTickWithUnit(tick, unit)}
                </text>
              </g>
            );
          })}

          {/* Baseline shaded band */}
          <rect
            x={MARGIN.left}
            y={bandTop}
            width={PLOT_WIDTH}
            height={Math.max(1, bandBottom - bandTop)}
            fill="#38BDF8"
            fillOpacity="0.12"
          />

          {/* Hover vertical guide line */}
          {hoveredIdx !== null && (
            <line
              x1={xForIndex(hoveredIdx, points.length)}
              y1={MARGIN.top}
              x2={xForIndex(hoveredIdx, points.length)}
              y2={MARGIN.top + PLOT_HEIGHT}
              stroke="#475569"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          )}

          {/* Trend polyline */}
          <polyline
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={polyline}
          />

          {/* Individual points colored by own level */}
          {points.map((p, i) => {
            const x = xForIndex(i, points.length);
            const y = yForValue(p.value, min, max);
            const color = LEVEL_STYLES[p.level].color;
            const isToday = i === points.length - 1;
            const isActive = hoveredIdx === i;
            const radius = isActive ? 7.5 : isToday ? 6.5 : 4.5;

            return (
              <g key={p.flight_day}>
                <text
                  x={x}
                  y={MARGIN.top + PLOT_HEIGHT + 18}
                  textAnchor="middle"
                  fill={isActive || isToday ? '#F8FAFC' : '#94A3B8'}
                  fontWeight={isToday ? '600' : '400'}
                  fontSize="11"
                  className="font-mono-tabular"
                >
                  {p.flight_day}
                </text>

                {isToday && (
                  <>
                    <circle
                      cx={x}
                      cy={y}
                      r={10}
                      fill={color}
                      fillOpacity="0.22"
                    />
                    <text
                      x={x}
                      y={y - 13}
                      textAnchor="middle"
                      fill="#F8FAFC"
                      fontSize="11"
                      fontWeight="600"
                    >
                      Today
                    </text>
                  </>
                )}

                <circle
                  cx={x}
                  cy={y}
                  r={radius}
                  fill={color}
                  stroke={isToday ? '#F8FAFC' : '#0B1222'}
                  strokeWidth={isToday ? 2 : 1.8}
                />

                <rect
                  x={x - PLOT_WIDTH / (points.length * 2)}
                  y={MARGIN.top}
                  width={PLOT_WIDTH / points.length}
                  height={PLOT_HEIGHT + 24}
                  fill="transparent"
                  tabIndex={0}
                  aria-label={`Flight day ${p.flight_day}${isToday ? ' (Today)' : ''}: ${p.value} ${unit}, ${LEVEL_STYLES[p.level].label}`}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onFocus={() => setHoveredIdx(i)}
                  onBlur={() => setHoveredIdx(null)}
                  className="cursor-crosshair focus:outline-none"
                />
              </g>
            );
          })}

          {/* X-axis title */}
          <text
            x={MARGIN.left + PLOT_WIDTH / 2}
            y={SVG_HEIGHT - 4}
            textAnchor="middle"
            fill="#94A3B8"
            fontSize="11.5"
          >
            Flight day
          </text>
        </svg>
      </div>

      {/* Required Legend */}
      <p className="mt-2 text-center text-xs text-slate-400">
        Shaded area = your usual range · Dots = daily values (color = level)
      </p>
    </div>
  );
}

export function IndicatorChart({ series, unit }: IndicatorChartProps) {
  if (series.indicator === 'vision_amsler') {
    return (
      <VisionAmslerHistory series={series as VisionAmslerIndicatorSeries} />
    );
  }

  if (series.indicator === 'blood_pressure') {
    return (
      <BloodPressureChart
        series={series as BloodPressureIndicatorSeries}
        unit={unit}
      />
    );
  }

  return (
    <NumericTrendChart
      series={series as NumericIndicatorSeries}
      unit={unit}
    />
  );
}
