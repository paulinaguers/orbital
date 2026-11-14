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
  UserProfile,
} from '../types/orbital';

interface BlockDetailPageProps {
  status: OrbitalStatus;
  profile: UserProfile;
  blockId: string;
  onNavigate: (path: string) => void;
  onOpenTips: (blockId: string) => void;
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

const PASSENGER_ALLOWED_ACTION_PATHS = new Set([
  '/mental/checkin',
  '/mental/breathing',
]);

function parseCareerLimit(thresholdSource: string): number | null {
  const match = thresholdSource.match(/(\d+(?:\.\d+)?)\s*mSv/i);
  return match ? Number(match[1]) : null;
}

function IndicatorCard({
  indicator,
  astronautId,
  profile,
}: {
  indicator: Indicator;
  astronautId: string;
  profile: UserProfile;
}) {
  const isPassenger = profile === 'passenger';
  const [series, setSeries] = useState<IndicatorSeries | undefined>(() =>
    getDemoSeries(indicator.id, profile),
  );

  useEffect(() => {
    setSeries(getDemoSeries(indicator.id, profile));
    let active = true;
    getSeries(indicator.id, profile, astronautId)
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
  }, [indicator.id, profile, astronautId]);

  const indStyle = LEVEL_STYLES[indicator.level];
  const explanation = INDICATOR_EXPLANATIONS[indicator.id];

  const renderBaselineText = () => {
    if (isPassenger || !series || series.indicator === 'vision_amsler') {
      return null;
    }

    if (series.indicator === 'blood_pressure') {
      const bp = series as BloodPressureIndicatorSeries;
      return (
        <p className="mt-1.5 text-sm text-[#8FA3C7]">
          Your baseline:{' '}
          <span className="font-mono-tabular font-medium text-[#E8F0FF]">
            {bp.baseline_low_systolic}–{bp.baseline_high_systolic} /{' '}
            {bp.baseline_low_diastolic}–{bp.baseline_high_diastolic} mmHg
          </span>
        </p>
      );
    }

    const num = series as NumericIndicatorSeries;
    return (
      <p className="mt-1.5 text-sm text-[#8FA3C7]">
        Your baseline:{' '}
        <span className="font-mono-tabular font-medium text-[#E8F0FF]">
          {num.baseline_low}–{num.baseline_high}
          {indicator.unit ? ` ${indicator.unit}` : ''}
        </span>
      </p>
    );
  };

  if (isPassenger) {
    return (
      <article className="glass-panel p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-[#E8F0FF]">
              {indicator.name}
            </h2>
            <p className="font-mono-tabular mt-2 text-4xl font-bold tracking-tight text-[#E8F0FF]">
              {formatIndicatorValue(indicator)}
            </p>
          </div>

          <StatusBadge level={indicator.level} variant="pill" />
        </div>

        {series && (
          <IndicatorChart series={series} unit={indicator.unit} passengerMode />
        )}
      </article>
    );
  }

  const radiationLimit =
    indicator.id === 'radiation_dose'
      ? parseCareerLimit(indicator.threshold_source)
      : null;
  const radiationValue =
    indicator.id === 'radiation_dose' && typeof indicator.value === 'number'
      ? indicator.value
      : null;

  return (
    <article className="glass-panel p-5 sm:p-6">
      {/* One-line status sentence at top of card strictly from indicator.level */}
      <p
        className="mb-3 text-sm font-medium"
        style={{ color: indStyle.textColor }}
      >
        {indStyle.statusSentence}
      </p>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-lg font-semibold text-[#E8F0FF]">
            {indicator.name}
          </h2>

          {explanation && (
            <div className="mt-2 space-y-1 text-sm leading-relaxed text-[#8FA3C7]">
              <p>
                <span className="font-medium text-[#E8F0FF]">
                  What it measures:
                </span>{' '}
                {explanation.measures}
              </p>
              <p>
                <span className="font-medium text-[#E8F0FF]">
                  Why it matters in space:
                </span>{' '}
                {explanation.matters}
              </p>
              <p className="pt-0.5 text-xs text-[#8FA3C7]">
                <span className="font-medium text-[#E8F0FF]/90">
                  Measured with:
                </span>{' '}
                {explanation.measuredWith}
              </p>
            </div>
          )}

          <p className="font-mono-tabular mt-3 text-3xl font-bold tracking-tight text-[#E8F0FF] sm:text-4xl">
            {formatIndicatorValue(indicator)}
          </p>
          {renderBaselineText()}
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end shrink-0">
          <StatusBadge level={indicator.level} variant="pill" />
          <p className="text-xs text-[#8FA3C7] sm:text-right">
            Threshold source: {indicator.threshold_source}
          </p>
        </div>
      </div>

      {/* Horizontal career limit progress bar for radiation_dose */}
      {radiationValue !== null && radiationLimit !== null && (
        <div className="glass-panel-soft mt-4 p-4">
          <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
            <span className="font-mono-tabular font-medium text-[#E8F0FF]">
              {radiationValue} of {radiationLimit} mSv career limit
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={radiationValue}
            aria-valuemin={0}
            aria-valuemax={radiationLimit}
            aria-label={`${radiationValue} of ${radiationLimit} mSv career limit`}
            className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-[rgba(5,11,26,0.7)]"
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
  profile,
  blockId,
  onNavigate,
  onOpenTips,
}: BlockDetailPageProps) {
  const isPassenger = profile === 'passenger';
  const block: HealthBlock | undefined = status.blocks.find(
    (b) => b.id === blockId,
  );

  if (!block) {
    return (
      <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-5 py-10 sm:px-8">
        <div className="glass-panel p-8">
          <h1 className="text-2xl font-semibold text-[#E8F0FF]">
            Block not found
          </h1>
          <p className="mt-2 text-sm text-[#8FA3C7]">
            No physiological block matches &ldquo;{blockId}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/body')}
            className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[rgba(120,180,255,0.25)] bg-[rgba(20,35,70,0.65)] px-4 py-2 text-sm font-medium text-[#E8F0FF] hover:border-[#4FC3F7] cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Body map</span>
          </button>
        </div>
      </section>
    );
  }

  const blockStyle = LEVEL_STYLES[block.level];
  const rawActions = BLOCK_ACTIONS[block.id] ?? [];
  const actions = isPassenger
    ? rawActions.filter((action) =>
        PASSENGER_ALLOWED_ACTION_PATHS.has(action.path),
      )
    : rawActions;

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 py-6 sm:px-8 sm:py-8">
      {/* 1. Header */}
      <header>
        <button
          type="button"
          onClick={() => onNavigate('/body')}
          className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-[#8FA3C7] transition-colors duration-150 hover:text-[#E8F0FF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4FC3F7] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Body map</span>
        </button>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1
            className={`font-semibold tracking-tight text-[#E8F0FF] ${
              isPassenger ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            {block.name}
          </h1>
          <StatusBadge level={block.level} variant="pill" />
        </div>

        {/* NASA / CSA risk tags (Crew mode only) */}
        {!isPassenger && block.nasa_risk.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {block.nasa_risk.map((risk) => (
              <span
                key={risk}
                className="rounded-lg border border-[rgba(120,180,255,0.2)] bg-[rgba(20,35,70,0.55)] px-2.5 py-1 text-xs text-[#8FA3C7]"
              >
                {risk}
              </span>
            ))}
          </div>
        )}

        {/* Recommendation / Passenger Simple Explanation Box */}
        <div
          className={`mt-5 flex flex-col gap-3 rounded-[20px] px-5 py-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between ${
            isPassenger ? 'p-6' : ''
          }`}
          style={{
            backgroundColor: blockStyle.surfaceBg,
            border: `1px solid ${blockStyle.surfaceBorder}`,
            boxShadow: '0 0 24px rgba(60, 140, 255, 0.12)',
          }}
        >
          {isPassenger ? (
            <div>
              <p
                className="text-xl font-semibold leading-snug"
                style={{ color: blockStyle.textColor }}
              >
                {blockStyle.statusSentence}
              </p>
              <p className="mt-1.5 text-lg leading-relaxed text-[#E8F0FF]">
                {block.simple_explanation ?? block.recommendation}
              </p>
            </div>
          ) : (
            <p className="text-base font-medium leading-relaxed text-[#E8F0FF]">
              {block.recommendation}
            </p>
          )}

          {block.level !== 'green' && (
            <button
              type="button"
              onClick={() => onOpenTips(block.id)}
              className="inline-flex min-h-[40px] shrink-0 items-center justify-center rounded-xl border border-[rgba(120,180,255,0.3)] bg-[rgba(10,20,46,0.7)] px-4 py-2 text-sm font-semibold text-[#4FC3F7] transition-colors hover:border-[#4FC3F7] hover:bg-[#4FC3F7]/15 hover:text-[#E8F0FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
            >
              See tips
            </button>
          )}
        </div>
      </header>

      {/* 2. Indicator cards with trend chart */}
      <div className="mt-6 space-y-5">
        {block.indicators.map((indicator) => (
          <IndicatorCard
            key={`${profile}:${indicator.id}`}
            indicator={indicator}
            astronautId={status.astronaut.id}
            profile={profile}
          />
        ))}
      </div>

      {/* 3. Block-specific action buttons */}
      {actions.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {actions.map((action) => {
            const matchedTest = status.tests.find(
              (test) => test.route === action.path,
            );
            const isDue = Boolean(matchedTest?.due);
            const isOverdue = Boolean(matchedTest?.overdue);

            return (
              <button
                key={action.label}
                type="button"
                onClick={() => onNavigate(action.path)}
                className={`glass-card-interactive inline-flex min-h-[46px] items-center justify-center gap-2.5 px-5 py-2.5 text-sm font-semibold text-[#4FC3F7] hover:text-[#E8F0FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer ${
                  isPassenger ? 'text-base' : ''
                }`}
              >
                <span>{action.label}</span>
                {isDue && (
                  <span
                    className="rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide"
                    style={{
                      backgroundColor: isOverdue
                        ? 'rgba(230, 126, 34, 0.2)'
                        : 'rgba(241, 196, 15, 0.2)',
                      color: isOverdue ? '#E67E22' : '#F1C40F',
                      border: `1px solid ${isOverdue ? '#E67E22' : '#F1C40F'}`,
                    }}
                  >
                    Due
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* 4. Footer */}
      <footer className="mt-10 border-t border-[rgba(120,180,255,0.16)] pt-5 text-center text-xs leading-relaxed text-[#8FA3C7]">
        <span>
          {isPassenger
            ? 'ORBITAL guides, it does not diagnose. All data shown is simulated.'
            : 'Physical and environmental data come from onboard sensors and in-app tests based on NASA protocols. Mental health is self-reported and your journal stays private. All data shown is simulated.'}
        </span>{' '}
        <button
          type="button"
          onClick={() => onNavigate('/alerts-info')}
          className="font-medium text-[#E8F0FF] underline decoration-[#8FA3C7]/50 underline-offset-4 transition-colors hover:text-[#4FC3F7] hover:decoration-[#4FC3F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
        >
          How alerts work
        </button>
      </footer>
    </section>
  );
}
