// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { useEffect, useState } from 'react';
import { OrbiMascot } from '../components/OrbiMascot';
import { StatusBadge } from '../components/StatusBadge';
import { LEVEL_STYLES } from '../data/source';
import type { OrbitalStatus, ScheduledTest, UserProfile } from '../types/orbital';

interface HomePageProps {
  status: OrbitalStatus;
  profile: UserProfile;
  celebration: { key: number; message: string } | null;
  onNavigate: (path: string) => void;
  onOpenTips: (blockId: string) => void;
}

const ORBI_TAP_LINES = [
  'Did you know? In orbit we see 16 sunrises every day!',
  'Zero gravity makes my antennas feel extra bouncy today.',
  'Beep boop! Keeping watch over our little corner of the cosmos.',
  'Earth looks like a bright blue marble from up here.',
  'Traveling at 27,600 km/h and still time for a quick hello!',
  'Fun fact: astronauts grow a little taller in microgravity!',
];

function getNextScheduledTest(tests: ScheduledTest[]): ScheduledTest | null {
  if (tests.length === 0) {
    return null;
  }
  return tests.reduce((earliest, candidate) =>
    candidate.next_due_flight_day < earliest.next_due_flight_day
      ? candidate
      : earliest,
  );
}

function getOrbiOverdueLine(overdueTests: ScheduledTest[]): string | null {
  if (overdueTests.length === 0) {
    return null;
  }
  const hasPvt = overdueTests.some((test) => test.id === 'pvt');
  if (hasPvt) {
    return "Don't forget your brief reaction test (PVT-inspired), it helps me know how rested you are.";
  }
  return `Don't forget your ${overdueTests[0].name.toLowerCase()}, it helps me keep track of how you are doing.`;
}

export function HomePage({
  status,
  profile,
  celebration,
  onNavigate,
  onOpenTips,
}: HomePageProps) {
  const isPassenger = profile === 'passenger';
  const firstName = status.astronaut.name.split(' ')[0] || status.astronaut.name;
  const attentionBlocks = status.blocks.filter(
    (block) => block.level !== 'green' && block.level !== 'not_evaluable',
  );
  const notifiedList = status.escalation.notified;
  const bubbleColor = LEVEL_STYLES[status.overall_level].color;

  const [tapLine, setTapLine] = useState<string | null>(null);
  const [celebrationLine, setCelebrationLine] = useState<string | null>(null);

  useEffect(() => {
    if (!celebration) {
      return;
    }
    setTapLine(null);
    setCelebrationLine(celebration.message);
  }, [celebration]);

  const handleOrbiTap = () => {
    setCelebrationLine(null);
    setTapLine((prev) => {
      const candidates = ORBI_TAP_LINES.filter((line) => line !== prev);
      const picked = candidates[Math.floor(Math.random() * candidates.length)];
      return picked ?? ORBI_TAP_LINES[0];
    });
  };

  const visibleTests = isPassenger
    ? status.tests.filter((t) => t.id !== 'pvt' && t.id !== 'amsler')
    : status.tests;
  const dueTests = visibleTests.filter((test) => test.due);
  const overdueTests = isPassenger
    ? []
    : visibleTests.filter((test) => test.due && test.overdue);
  const orbiOverdueLine = getOrbiOverdueLine(overdueTests);
  const nextTest = getNextScheduledTest(visibleTests);

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-8 sm:px-8 sm:py-12">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[276px_1fr] lg:gap-10">
        {/* Companion Column: Orbi + Orbiting Stars + Rewards + Overall Status */}
        <div className="flex flex-col items-center text-center">
          <OrbiMascot
            level={status.overall_level}
            stars={status.rewards.stars}
            showOrbit
            interactive
            celebrationKey={celebration?.key ?? 0}
            onTap={handleOrbiTap}
          />

          <p className="font-mono-tabular mt-1 text-sm font-medium text-[#E8F0FF]">
            ⭐ {status.rewards.stars}{' '}
            {status.rewards.stars === 1 ? 'star' : 'stars'} · 🔥{' '}
            {status.rewards.streak_days}-day streak
          </p>

          <div className="mt-3">
            <StatusBadge level={status.overall_level} prefix="Overall" />
          </div>

          <div className="mt-4">
            <p className="text-lg font-semibold text-[#E8F0FF]">
              {status.astronaut.name}
            </p>
            <p className="mt-0.5 text-sm text-[#8FA3C7]">
              {status.astronaut.role}
            </p>
          </div>
        </div>

        {/* Speech Bubble, Today's Tasks & Primary Actions Column */}
        <div className="flex min-w-0 flex-col lg:pt-3">
          <div
            className="glass-panel animate-orbi-bubble-pop relative p-6 text-[#E8F0FF] sm:p-8"
            style={{
              borderColor: bubbleColor,
              boxShadow: `0 0 26px ${LEVEL_STYLES[status.overall_level].surfaceBg}`,
            }}
          >
            {/* Desktop speech bubble triangular tail pointing toward Orbi's mouth */}
            <svg
              aria-hidden="true"
              viewBox="0 0 18 28"
              className="hidden lg:block absolute -left-[16px] top-[104px] h-7 w-[18px] overflow-visible"
            >
              <polygon
                points="19,2 1,14 19,26"
                fill="rgba(20, 35, 70, 0.85)"
              />
              <polyline
                points="17.5,2 1,14 17.5,26"
                fill="none"
                stroke={bubbleColor}
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>

            {/* Mobile/tablet speech bubble triangular tail pointing up toward Orbi */}
            <svg
              aria-hidden="true"
              viewBox="0 0 28 18"
              className="lg:hidden absolute -top-[16px] left-1/2 h-[18px] w-7 -translate-x-1/2 overflow-visible"
            >
              <polygon
                points="2,19 14,1 26,19"
                fill="rgba(20, 35, 70, 0.85)"
              />
              <polyline
                points="2,17.5 14,1 26,17.5"
                fill="none"
                stroke={bubbleColor}
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>

            {/* 1) Greeting + overall_message (or celebration / playful tap line) */}
            <div>
              <h1
                className={`font-bold tracking-tight text-[#E8F0FF] ${
                  isPassenger
                    ? 'text-3xl sm:text-4xl'
                    : 'text-2xl sm:text-3xl'
                }`}
              >
                Hi {firstName}!
              </h1>

              {celebrationLine && (
                <p className="mt-2.5 rounded-xl border border-amber-300/40 bg-amber-400/15 px-3.5 py-2 text-base font-semibold text-amber-100">
                  ⭐ {celebrationLine}
                </p>
              )}

              {tapLine && (
                <p className="mt-2.5 rounded-xl border border-[#4FC3F7]/40 bg-[#4FC3F7]/15 px-3.5 py-2 text-base font-medium text-[#E8F0FF]">
                  {tapLine}
                </p>
              )}

              <p
                className={`mt-2 leading-relaxed text-[#E8F0FF]/90 ${
                  isPassenger ? 'text-xl' : 'text-lg'
                }`}
              >
                {status.overall_message}
              </p>

              {orbiOverdueLine && (
                <p className="mt-2 text-base font-medium leading-relaxed text-[#EB984E]">
                  {orbiOverdueLine}
                </p>
              )}
            </div>

            {/* 2) Affected blocks: short line with small colored pill showing level label */}
            {attentionBlocks.length > 0 && (
              <div className="mt-5 border-t border-[rgba(120,180,255,0.18)] pt-5">
                <ul className="space-y-3">
                  {attentionBlocks.map((block) => (
                    <li
                      key={block.id}
                      className={`flex flex-wrap items-center justify-between gap-x-3 gap-y-2 leading-snug text-[#8FA3C7] ${
                        isPassenger ? 'text-base sm:text-lg' : 'text-[15px]'
                      }`}
                    >
                      <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2.5 gap-y-1">
                        <StatusBadge level={block.level} variant="pill" />
                        <span className="font-semibold text-[#E8F0FF]">
                          {block.name}:
                        </span>
                        <span className="min-w-0 text-[#E8F0FF]/85">
                          {isPassenger
                            ? (block.simple_explanation ?? block.recommendation)
                            : block.recommendation}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenTips(block.id)}
                        className="inline-flex min-h-[36px] shrink-0 items-center justify-center rounded-xl border border-[rgba(120,180,255,0.28)] bg-[rgba(10,20,46,0.55)] px-3.5 py-1.5 text-xs font-semibold text-[#4FC3F7] transition-colors hover:border-[#4FC3F7] hover:bg-[#4FC3F7]/15 hover:text-[#E8F0FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
                      >
                        See tips →
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 3) Escalation notice when notified list is non-empty */}
            {notifiedList.length > 0 && (
              <p className="mt-5 border-t border-[rgba(120,180,255,0.18)] pt-4 text-sm font-semibold text-[#E8F0FF]">
                Notified: {notifiedList.join(', ')}
              </p>
            )}
          </div>

          {/* Today's tasks card */}
          <div
            className={`glass-panel mt-5 p-5 ${
              isPassenger ? 'sm:p-6' : ''
            }`}
          >
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#8FA3C7]">
              Today&apos;s tasks
            </h2>

            {dueTests.length > 0 ? (
              <ul className="mt-3 divide-y divide-[rgba(120,180,255,0.14)]">
                {dueTests.map((test) => (
                  <li
                    key={test.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-1 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p
                        className={`font-medium text-[#E8F0FF] ${
                          isPassenger ? 'text-lg' : 'text-base'
                        }`}
                      >
                        {test.name}
                      </p>
                      <p
                        className="mt-0.5 text-sm font-medium"
                        style={{
                          color: test.overdue ? '#E67E22' : '#8FA3C7',
                        }}
                      >
                        {test.overdue
                          ? `Overdue since flight day ${test.next_due_flight_day}`
                          : 'Due today'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onNavigate(test.route)}
                      className="inline-flex min-h-[40px] shrink-0 items-center justify-center rounded-xl border border-[#4FC3F7]/50 bg-[#4FC3F7]/15 px-4 py-2 text-sm font-semibold text-[#E8F0FF] transition-colors hover:border-[#4FC3F7] hover:bg-[#4FC3F7]/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
                    >
                      Start
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p
                className={`mt-2.5 text-[#8FA3C7] ${
                  isPassenger ? 'text-base' : 'text-sm'
                }`}
              >
                All tests up to date.
                {nextTest
                  ? ` Next: ${nextTest.name} on flight day ${nextTest.next_due_flight_day}.`
                  : ''}
              </p>
            )}
          </div>

          {/* Primary CTA & Secondary Info Link */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 px-1">
            <button
              type="button"
              onClick={() => onNavigate('/body')}
              className={`inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#4FC3F7] px-6 py-3 font-semibold text-slate-950 shadow-[0_0_22px_rgba(79,195,247,0.35)] transition-colors duration-150 hover:bg-[#7DD3FC] active:bg-[#BAE6FD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] whitespace-nowrap shrink-0 cursor-pointer ${
                isPassenger ? 'text-lg' : 'text-base'
              }`}
            >
              {isPassenger ? 'View my health →' : 'View my metrics →'}
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/alerts-info')}
              className="min-h-[44px] px-2 text-sm font-medium text-[#8FA3C7] underline decoration-[#8FA3C7]/50 underline-offset-4 transition-colors duration-150 hover:text-[#E8F0FF] hover:decoration-[#4FC3F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] whitespace-nowrap shrink-0 cursor-pointer"
            >
              How alerts work
            </button>
          </div>

          {isPassenger && (
            <p className="mt-8 border-t border-[rgba(120,180,255,0.16)] pt-4 text-center text-xs leading-relaxed text-[#8FA3C7]">
              ORBITAL guides, it does not diagnose. All data shown is simulated.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
