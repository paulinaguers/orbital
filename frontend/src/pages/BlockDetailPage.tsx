// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IndicatorChart } from '../components/IndicatorChart';
import { StatusBadge } from '../components/StatusBadge';
import {
  formatIndicatorValue,
  getDemoSeries,
  getSeries,
  INDICATOR_EXPLANATIONS,
  LEVEL_STYLES,
} from '../data/source';
import type {
  BloodPressureIndicatorSeries,
  HealthBlock,
  Indicator,
  IndicatorSeries,
  NumericIndicatorSeries,
  OrbitalStatus,
} from '../types/orbital';

interface BlockDetailPageProps {
  status: OrbitalStatus;
  blockId: string;
  onNavigate: (path: string) => void;
}

interface BlockAction {
  label: string;
  path: string;
}

const BLOCK_ACTIONS: Record<string, BlockAction[]> = {
  sleep_cognition: [{ label: 'Take reaction test (PVT)', path: '/tests/pvt' }],
  mental_health: [
    { label: 'Daily check-in', path: '/mental/checkin' },
    { label: 'Private journal', path: '/mental/journal' },
    { label: 'Breathing exercise', path: '/mental/breathing' },
  ],
  environment: [{ label: 'Do Amsler grid test', path: '/tests/amsler' }],
};

function parseCareerLimit(thresholdSource: string): number | null {
  const match = thresholdSource.match(/(\d+(?:\.\d+)?)\s*mSv/i);
  return match ? Number(match[1]) : null;
}

function IndicatorCard({
  indicator,
  astronautId,
}: {
  indicator: Indicator;
  astronautId: string;
}) {
  const [series, setSeries] = useState<IndicatorSeries | undefined>(() =>
    getDemoSeries(indicator.id),
  );

  useEffect(() => {
    let active = true;
    getSeries(indicator.id, astronautId)
      .then((nextSeries) => {
        if (active) {
          setSeries(nextSeries);
        }
      })
      .catch(() => {
        // Keep simulated series fallback if local endpoint is unavailable
      });
    return () => {
      active = false;
    };
  }, [indicator.id, astronautId]);

  const indStyle = LEVEL_STYLES[indicator.level];
  const explanation = INDICATOR_EXPLANATIONS[indicator.id];

  const renderBaselineText = () => {
    if (!series || series.indicator === 'vision_amsler') {
      return null;
    }

    if (series.indicator === 'blood_pressure') {
      const bp = series as BloodPressureIndicatorSeries;
      return (
        <p className="mt-1.5 text-sm text-slate-300">
          Your baseline:{' '}
          <span className="font-mono-tabular font-medium text-slate-100">
            {bp.baseline_low_systolic}–{bp.baseline_high_systolic} /{' '}
            {bp.baseline_low_diastolic}–{bp.baseline_high_diastolic} mmHg
          </span>
        </p>
      );
    }

    const num = series as NumericIndicatorSeries;
    return (
      <p className="mt-1.5 text-sm text-slate-300">
        Your baseline:{' '}
        <span className="font-mono-tabular font-medium text-slate-100">
          {num.baseline_low}–{num.baseline_high}
          {indicator.unit ? ` ${indicator.unit}` : ''}
        </span>
      </p>
    );
  };

  const radiationLimit =
    indicator.id === 'radiation_dose'
      ? parseCareerLimit(indicator.threshold_source)
      : null;
  const radiationValue =
    indicator.id === 'radiation_dose' && typeof indicator.value === 'number'
      ? indicator.value
      : null;

  return (
    <article
      className="rounded-2xl bg-[#10192D] p-5 shadow-lg shadow-black/25 sm:p-6"
      style={{ border: `1px solid ${indStyle.surfaceBorder}` }}
    >
      {/* One-line status sentence at top of card strictly from indicator.level */}
      <p
        className="mb-3 text-sm font-medium"
        style={{ color: indStyle.textColor }}
      >
        {indStyle.statusSentence}
      </p>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-lg font-semibold text-slate-100">
            {indicator.name}
          </h2>

          {explanation && (
            <div className="mt-2 space-y-1 text-sm leading-relaxed text-slate-300">
              <p>
                <span className="font-medium text-slate-200">
                  What it measures:
                </span>{' '}
                {explanation.measures}
              </p>
              <p>
                <span className="font-medium text-slate-200">
                  Why it matters in space:
                </span>{' '}
                {explanation.matters}
              </p>
              <p className="text-xs text-slate-400 pt-0.5">
                <span className="font-medium text-slate-300">
                  Measured with:
                </span>{' '}
                {explanation.measuredWith}
              </p>
            </div>
          )}

          <p className="font-mono-tabular mt-3 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
            {formatIndicatorValue(indicator)}
          </p>
          {renderBaselineText()}
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end shrink-0">
          <StatusBadge level={indicator.level} variant="pill" />
          <p className="text-xs text-slate-400 sm:text-right">
            Threshold source: {indicator.threshold_source}
          </p>
        </div>
      </div>

      {/* Horizontal career limit progress bar for radiation_dose */}
      {radiationValue !== null && radiationLimit !== null && (
        <div className="mt-4 rounded-xl border border-slate-800/80 bg-[#0B1222] p-4">
          <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
            <span className="font-mono-tabular font-medium text-slate-200">
              {radiationValue} of {radiationLimit} mSv career limit
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={radiationValue}
            aria-valuemin={0}
            aria-valuemax={radiationLimit}
            aria-label={`${radiationValue} of ${radiationLimit} mSv career limit`}
            className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-800"
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (radiationValue / radiationLimit) * 100)}%`,
                backgroundColor: indStyle.color,
              }}
            />
          </div>
        </div>
      )}

      {series && <IndicatorChart series={series} unit={indicator.unit} />}
    </article>
  );
}

export function BlockDetailPage({
  status,
  blockId,
  onNavigate,
}: BlockDetailPageProps) {
  const block: HealthBlock | undefined = status.blocks.find(
    (b) => b.id === blockId,
  );

  if (!block) {
    return (
      <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-5 py-10 sm:px-8">
        <div className="rounded-2xl border border-slate-800/90 bg-[#10192D] p-8 shadow-xl shadow-black/25">
          <h1 className="text-2xl font-semibold text-slate-50">
            Block not found
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            No physiological block matches &ldquo;{blockId}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/body')}
            className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700/80 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Body map</span>
          </button>
        </div>
      </section>
    );
  }

  const blockStyle = LEVEL_STYLES[block.level];
  const actions = BLOCK_ACTIONS[block.id] ?? [];

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 py-6 sm:px-8 sm:py-8">
      {/* 1. Header */}
      <header>
        <button
          type="button"
          onClick={() => onNavigate('/body')}
          className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors duration-150 hover:text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Body map</span>
        </button>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            {block.name}
          </h1>
          <StatusBadge level={block.level} variant="pill" />
        </div>

        {/* NASA / CSA risk tags */}
        {block.nasa_risk.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {block.nasa_risk.map((risk) => (
              <span
                key={risk}
                className="rounded-md border border-slate-700/70 bg-slate-800/75 px-2.5 py-1 text-xs text-slate-300"
              >
                {risk}
              </span>
            ))}
          </div>
        )}

        {/* Recommendation in a highlighted box */}
        <div
          className="mt-5 rounded-2xl px-5 py-4"
          style={{
            backgroundColor: blockStyle.surfaceBg,
            border: `1.5px solid ${blockStyle.surfaceBorder}`,
          }}
        >
          <p className="text-base font-medium leading-relaxed text-slate-100">
            {block.recommendation}
          </p>
        </div>
      </header>

      {/* 2. Indicator cards with 14-day SVG trend chart or Amsler icon history */}
      <div className="mt-6 space-y-5">
        {block.indicators.map((indicator) => (
          <IndicatorCard
            key={indicator.id}
            indicator={indicator}
            astronautId={status.astronaut.id}
          />
        ))}
      </div>

      {/* 3. Block-specific action buttons */}
      {actions.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => onNavigate(action.path)}
              className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-sky-400/40 bg-sky-500/15 px-5 py-2.5 text-sm font-semibold text-sky-200 transition-colors duration-150 hover:border-sky-400/70 hover:bg-sky-500/25 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 cursor-pointer"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* 4. Footer */}
      <footer className="mt-10 border-t border-slate-800/70 pt-5 text-center text-xs leading-relaxed text-slate-400">
        <span>
          Physical and environmental data come from onboard sensors and in-app
          tests based on NASA protocols. Mental health is self-reported and your
          journal stays private. All data shown is simulated.
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
