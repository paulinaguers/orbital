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
  passengerMode?: boolean;
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
  const span = rawMax - rawMin;
  if (span === 0) {
    const pad = rawMax === 0 ? 1.5 : Math.max(1, Math.abs(rawMax) * 0.2);
    return {
      min: Math.max(0, rawMin - pad),
      max: rawMax + pad,
    };
  }
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
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[#8FA3C7]">
        <span>14-day screening history</span>
        {hoveredPoint ? (
          <span className="inline-flex items-center gap-2 text-[#E8F0FF]">
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

      {series.points.length === 0 ? (
        <p className="rounded-xl border border-[rgba(120,180,255,0.16)] bg-[rgba(10,20,46,0.52)] px-4 py-3 text-xs text-[#8FA3C7]">
          No screening results recorded yet.
        </p>
      ) : (
        <div
          className={`grid gap-2 ${
            series.points.length <= 7
              ? 'grid-cols-4 sm:grid-cols-7'
              : 'grid-cols-7 sm:grid-cols-14'
          }`}
        >
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
              className={`flex flex-col items-center justify-center gap-1 rounded-xl border py-2.5 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] ${
                isHovered
                  ? 'border-[#4FC3F7] bg-[rgba(24,43,86,0.72)] -translate-y-0.5'
                  : isToday
                    ? 'border-[rgba(79,195,247,0.45)] bg-[rgba(20,35,70,0.65)]'
                    : 'border-[rgba(120,180,255,0.16)] bg-[rgba(10,20,46,0.52)]'
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
              <span className="font-mono-tabular text-[11px] font-medium text-[#E8F0FF]">
                {isToday ? 'Today' : point.flight_day}
              </span>
            </button>
          );
        })}
        </div>
      )}

      <p className="mt-2.5 text-center text-xs text-[#8FA3C7]">
        Flight day · Icons = daily results (color = level)
      </p>
    </div>
  );
}

function BloodPressureChart({
  series,
  unit,
  passengerMode = false,
}: {
  series: BloodPressureIndicatorSeries;
  unit: string;
  passengerMode?: boolean;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const points = series.points;

  if (points.length === 0) {
    return (
      <p className="mt-5 text-xs text-[#8FA3C7]">No readings recorded yet.</p>
    );
  }

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
      <div className="mb-2 flex flex-wrap items-center gap-4 text-xs text-[#8FA3C7]">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 bg-[#7DD3FC] shadow-[0_0_6px_rgba(79,195,247,0.7)]" />
          <span>Systolic</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 border-t-2 border-dashed border-[#8FA3C7]" />
          <span>Diastolic</span>
        </span>
      </div>

      <div className="relative">
        {/* Tooltip */}
        {hoveredPoint && (
          <div
            className="glass-panel pointer-events-none absolute -top-2 z-10 px-3 py-2 text-xs"
            style={{
              left: `${Math.min(Math.max(hoveredLeftPct, 18), 82)}%`,
              transform: 'translate(-50%, -100%)',
              borderRadius: '14px',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="font-mono-tabular font-medium text-[#8FA3C7]">
                {hoveredPoint.phase_label
                  ? `${hoveredPoint.phase_label} (Day ${hoveredPoint.flight_day})`
                  : `Flight day ${hoveredPoint.flight_day}`}
              </span>
              <StatusBadge level={hoveredPoint.level} variant="pill" />
            </div>
            <p className="font-mono-tabular mt-1 font-semibold text-[#E8F0FF]">
              {hoveredPoint.systolic}/{hoveredPoint.diastolic} {unit}
            </p>
          </div>
        )}

        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="h-auto w-full overflow-visible select-none"
          role="img"
          aria-label="Blood pressure trend chart"
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
                  stroke="rgba(120, 180, 255, 0.09)"
                  strokeWidth="1"
                />
                <text
                  x={MARGIN.left - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fill="#8FA3C7"
                  fontSize="10.5"
                  className="font-mono-tabular"
                >
                  {formatTickWithUnit(tick, unit)}
                </text>
              </g>
            );
          })}

          {/* Pre-flight shaded region for passenger mode */}
          {passengerMode &&
            points.some((p) => p.flight_day < 0) &&
            points.some((p) => p.flight_day >= 0) && (() => {
              const lastPreIdx = points.reduce(
                (acc, pt, idx) => (pt.flight_day < 0 ? idx : acc),
                -1,
              );
              const splitX =
                (xForIndex(lastPreIdx, points.length) +
                  xForIndex(lastPreIdx + 1, points.length)) /
                2;
              return (
                <g>
                  <rect
                    x={MARGIN.left}
                    y={MARGIN.top}
                    width={splitX - MARGIN.left}
                    height={PLOT_HEIGHT}
                    fill="#94A3B8"
                    fillOpacity="0.07"
                  />
                  <line
                    x1={splitX}
                    y1={MARGIN.top}
                    x2={splitX}
                    y2={MARGIN.top + PLOT_HEIGHT}
                    stroke="#475569"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={(MARGIN.left + splitX) / 2}
                    y={MARGIN.top - 10}
                    textAnchor="middle"
                    fill="#CBD5E1"
                    fontSize="11"
                    fontWeight="600"
                  >
                    Before flight
                  </text>
                </g>
              );
            })()}

          {/* Shaded baseline bands: Systolic & Diastolic */}
          <rect
            x={MARGIN.left}
            y={sysBandTop}
            width={PLOT_WIDTH}
            height={Math.max(1, sysBandBottom - sysBandTop)}
            fill="#3D7BFF"
            fillOpacity="0.16"
          />
          <rect
            x={MARGIN.left}
            y={diaBandTop}
            width={PLOT_WIDTH}
            height={Math.max(1, diaBandBottom - diaBandTop)}
            fill="#3D7BFF"
            fillOpacity="0.16"
          />
          {passengerMode && (
            <text
              x={MARGIN.left + 8}
              y={sysBandTop + 13}
              fill="#4FC3F7"
              fontSize="10.5"
              fontWeight="600"
            >
              Your normal (measured before your flight)
            </text>
          )}

          {/* Hover vertical guide line */}
          {hoveredIdx !== null && (
            <line
              x1={xForIndex(hoveredIdx, points.length)}
              y1={MARGIN.top}
              x2={xForIndex(hoveredIdx, points.length)}
              y2={MARGIN.top + PLOT_HEIGHT}
              stroke="rgba(79, 195, 247, 0.35)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          )}

          {/* Systolic & Diastolic glowing trend lines */}
          {points.length > 1 && (
            <>
              <polyline
                fill="none"
                stroke="#7DD3FC"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                points={sysPolyline}
                style={{
                  filter: 'drop-shadow(0 0 5px rgba(79, 195, 247, 0.6))',
                }}
              />
              <polyline
                fill="none"
                stroke="#8FA3C7"
                strokeWidth="1.8"
                strokeDasharray="5 4"
                strokeLinejoin="round"
                strokeLinecap="round"
                points={diaPolyline}
                style={{
                  filter: 'drop-shadow(0 0 4px rgba(143, 163, 199, 0.4))',
                }}
              />
            </>
          )}

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
                  fill={isActive || isToday ? '#E8F0FF' : '#8FA3C7'}
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
                      fillOpacity="0.24"
                    />
                    <circle
                      cx={x}
                      cy={yDia}
                      r={9.5}
                      fill={color}
                      fillOpacity="0.24"
                    />
                    <text
                      x={x}
                      y={ySys - 12}
                      textAnchor="middle"
                      fill="#E8F0FF"
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
                  stroke={isToday ? '#E8F0FF' : '#081229'}
                  strokeWidth={isToday ? 2 : 1.8}
                />
                <circle
                  cx={x}
                  cy={yDia}
                  r={radius}
                  fill={color}
                  stroke={isToday ? '#E8F0FF' : '#081229'}
                  strokeWidth={isToday ? 2 : 1.8}
                />

                {(() => {
                  const step =
                    points.length <= 1
                      ? PLOT_WIDTH
                      : PLOT_WIDTH / (points.length - 1);
                  const hitLeft = Math.max(MARGIN.left, x - step / 2);
                  const hitRight = Math.min(
                    MARGIN.left + PLOT_WIDTH,
                    x + step / 2,
                  );
                  return (
                    <rect
                      x={hitLeft}
                      y={MARGIN.top}
                      width={Math.max(8, hitRight - hitLeft)}
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
                  );
                })()}
              </g>
            );
          })}

          {/* X-axis title */}
          <text
            x={MARGIN.left + PLOT_WIDTH / 2}
            y={SVG_HEIGHT - 4}
            textAnchor="middle"
            fill="#8FA3C7"
            fontSize="11.5"
          >
            Flight day
          </text>
        </svg>
      </div>

      {/* Required Legend */}
      <p className="mt-2 text-center text-xs text-[#8FA3C7]">
        {passengerMode
          ? 'Shaded band = Your normal (measured before your flight) · Dots = daily values'
          : 'Shaded area = your usual range · Dots = daily values (color = level)'}
      </p>
    </div>
  );
}

function NumericTrendChart({
  series,
  unit,
  passengerMode = false,
}: {
  series: NumericIndicatorSeries;
  unit: string;
  passengerMode?: boolean;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const points = series.points;

  if (points.length === 0) {
    return (
      <p className="mt-5 text-xs text-[#8FA3C7]">No readings recorded yet.</p>
    );
  }

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
            className="glass-panel pointer-events-none absolute -top-2 z-10 px-3 py-2 text-xs"
            style={{
              left: `${Math.min(Math.max(hoveredLeftPct, 18), 82)}%`,
              transform: 'translate(-50%, -100%)',
              borderRadius: '14px',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="font-mono-tabular font-medium text-[#8FA3C7]">
                {hoveredPoint.phase_label
                  ? `${hoveredPoint.phase_label} (Day ${hoveredPoint.flight_day})`
                  : `Flight day ${hoveredPoint.flight_day}`}
              </span>
              <StatusBadge
                level={hoveredPoint.level as HealthLevel}
                variant="pill"
              />
            </div>
            <p className="font-mono-tabular mt-1 font-semibold text-[#E8F0FF]">
              {hoveredPoint.value}
              {unit ? ` ${unit}` : ''}
            </p>
          </div>
        )}

        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="h-auto w-full overflow-visible select-none"
          role="img"
          aria-label={`Trend chart for ${series.indicator}`}
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
                  stroke="rgba(120, 180, 255, 0.09)"
                  strokeWidth="1"
                />
                <text
                  x={MARGIN.left - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fill="#8FA3C7"
                  fontSize="10.5"
                  className="font-mono-tabular"
                >
                  {formatTickWithUnit(tick, unit)}
                </text>
              </g>
            );
          })}

          {/* Pre-flight shaded region for passenger mode */}
          {passengerMode &&
            points.some((p) => p.flight_day < 0) &&
            points.some((p) => p.flight_day >= 0) && (() => {
              const lastPreIdx = points.reduce(
                (acc, pt, idx) => (pt.flight_day < 0 ? idx : acc),
                -1,
              );
              const splitX =
                (xForIndex(lastPreIdx, points.length) +
                  xForIndex(lastPreIdx + 1, points.length)) /
                2;
              return (
                <g>
                  <rect
                    x={MARGIN.left}
                    y={MARGIN.top}
                    width={splitX - MARGIN.left}
                    height={PLOT_HEIGHT}
                    fill="#94A3B8"
                    fillOpacity="0.07"
                  />
                  <line
                    x1={splitX}
                    y1={MARGIN.top}
                    x2={splitX}
                    y2={MARGIN.top + PLOT_HEIGHT}
                    stroke="#475569"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={(MARGIN.left + splitX) / 2}
                    y={MARGIN.top - 10}
                    textAnchor="middle"
                    fill="#CBD5E1"
                    fontSize="11"
                    fontWeight="600"
                  >
                    Before flight
                  </text>
                </g>
              );
            })()}

          {/* Baseline shaded band */}
          <rect
            x={MARGIN.left}
            y={bandTop}
            width={PLOT_WIDTH}
            height={Math.max(1, bandBottom - bandTop)}
            fill="#3D7BFF"
            fillOpacity="0.16"
          />
          {passengerMode && (
            <text
              x={MARGIN.left + 8}
              y={Math.min(bandTop + 13, MARGIN.top + PLOT_HEIGHT - 6)}
              fill="#4FC3F7"
              fontSize="10.5"
              fontWeight="600"
            >
              Your normal (measured before your flight)
            </text>
          )}

          {/* Hover vertical guide line */}
          {hoveredIdx !== null && (
            <line
              x1={xForIndex(hoveredIdx, points.length)}
              y1={MARGIN.top}
              x2={xForIndex(hoveredIdx, points.length)}
              y2={MARGIN.top + PLOT_HEIGHT}
              stroke="rgba(79, 195, 247, 0.35)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          )}

          {/* Glowing trend polyline */}
          {points.length > 1 && (
            <polyline
              fill="none"
              stroke="#7DD3FC"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              points={polyline}
              style={{
                filter: 'drop-shadow(0 0 5px rgba(79, 195, 247, 0.6))',
              }}
            />
          )}

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
                  fill={isActive || isToday ? '#E8F0FF' : '#8FA3C7'}
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
                      fillOpacity="0.24"
                    />
                    <text
                      x={x}
                      y={y - 13}
                      textAnchor="middle"
                      fill="#E8F0FF"
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
                  stroke={isToday ? '#E8F0FF' : '#081229'}
                  strokeWidth={isToday ? 2 : 1.8}
                />

                {(() => {
                  const step =
                    points.length <= 1
                      ? PLOT_WIDTH
                      : PLOT_WIDTH / (points.length - 1);
                  const hitLeft = Math.max(MARGIN.left, x - step / 2);
                  const hitRight = Math.min(
                    MARGIN.left + PLOT_WIDTH,
                    x + step / 2,
                  );
                  return (
                    <rect
                      x={hitLeft}
                      y={MARGIN.top}
                      width={Math.max(8, hitRight - hitLeft)}
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
                  );
                })()}
              </g>
            );
          })}

          {/* X-axis title */}
          <text
            x={MARGIN.left + PLOT_WIDTH / 2}
            y={SVG_HEIGHT - 4}
            textAnchor="middle"
            fill="#8FA3C7"
            fontSize="11.5"
          >
            Flight day
          </text>
        </svg>
      </div>

      {/* Required Legend */}
      <p className="mt-2 text-center text-xs text-[#8FA3C7]">
        {passengerMode
          ? 'Shaded band = Your normal (measured before your flight) · Dots = daily values'
          : 'Shaded area = your usual range · Dots = daily values (color = level)'}
      </p>
    </div>
  );
}

export function IndicatorChart({
  series,
  unit,
  passengerMode = false,
}: IndicatorChartProps) {
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
        passengerMode={passengerMode}
      />
    );
  }

  return (
    <NumericTrendChart
      series={series as NumericIndicatorSeries}
      unit={unit}
      passengerMode={passengerMode}
    />
  );
}
