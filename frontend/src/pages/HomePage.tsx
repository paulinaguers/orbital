// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { OrbiMascot } from '../components/OrbiMascot';
import { StatusBadge } from '../components/StatusBadge';
import { LEVEL_STYLES } from '../data/source';
import type { OrbitalStatus, ScheduledTest } from '../types/orbital';

interface HomePageProps {
  status: OrbitalStatus;
  onNavigate: (path: string) => void;
}

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
    return "Don't forget your reaction test, it helps me know how rested you are.";
  }
  return `Don't forget your ${overdueTests[0].name.toLowerCase()}, it helps me keep track of how you are doing.`;
}

export function HomePage({ status, onNavigate }: HomePageProps) {
  const firstName = status.astronaut.name.split(' ')[0] || status.astronaut.name;
  const attentionBlocks = status.blocks.filter(
    (block) => block.level !== 'green',
  );
  const notifiedList = status.escalation.notified;
  const bubbleColor = LEVEL_STYLES[status.overall_level].color;

  const dueTests = status.tests.filter((test) => test.due);
  const overdueTests = status.tests.filter((test) => test.due && test.overdue);
  const orbiOverdueLine = getOrbiOverdueLine(overdueTests);
  const nextTest = getNextScheduledTest(status.tests);

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-8 sm:px-8 sm:py-12">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
        {/* Companion Column: Orbi + Overall Status + Astronaut Identity */}
        <div className="flex flex-col items-center text-center">
          <OrbiMascot level={status.overall_level} />

          <div className="mt-3">
            <StatusBadge level={status.overall_level} prefix="Overall" />
          </div>

          <div className="mt-4">
            <p className="text-lg font-semibold text-slate-50">
              {status.astronaut.name}
            </p>
            <p className="mt-0.5 text-sm text-slate-400">
              {status.astronaut.role}
            </p>
          </div>
        </div>

        {/* Speech Bubble, Today's Tasks & Primary Actions Column */}
        <div className="flex min-w-0 flex-col lg:pt-3">
          <div
            className="animate-orbi-bubble-pop relative rounded-3xl bg-[#F8FAFC] p-6 text-slate-900 shadow-[0_18px_45px_rgba(0,0,0,0.42)] sm:p-8"
            style={{ border: `2.5px solid ${bubbleColor}` }}
          >
            {/* Desktop speech bubble triangular tail pointing toward Orbi's mouth */}
            <svg
              aria-hidden="true"
              viewBox="0 0 18 28"
              className="hidden lg:block absolute -left-[16px] top-[104px] h-7 w-[18px] overflow-visible"
            >
              <polygon points="19,2 1,14 19,26" fill="#F8FAFC" />
              <polyline
                points="17.5,2 1,14 17.5,26"
                fill="none"
                stroke={bubbleColor}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </svg>

            {/* Mobile/tablet speech bubble triangular tail pointing up toward Orbi */}
            <svg
              aria-hidden="true"
              viewBox="0 0 28 18"
              className="lg:hidden absolute -top-[16px] left-1/2 h-[18px] w-7 -translate-x-1/2 overflow-visible"
            >
              <polygon points="2,19 14,1 26,19" fill="#F8FAFC" />
              <polyline
                points="2,17.5 14,1 26,17.5"
                fill="none"
                stroke={bubbleColor}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </svg>

            {/* 1) Greeting + overall_message */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Hi {firstName}!
              </h1>
              <p className="mt-2 text-lg leading-relaxed text-slate-700">
                {status.overall_message}
              </p>
              {orbiOverdueLine && (
                <p className="mt-2 text-base font-medium leading-relaxed text-[#B45309]">
                  {orbiOverdueLine}
                </p>
              )}
            </div>

            {/* 2) Affected blocks: short line with small colored pill showing level label */}
            {attentionBlocks.length > 0 && (
              <div className="mt-5 border-t border-slate-200 pt-5">
                <ul className="space-y-3">
                  {attentionBlocks.map((block) => (
                    <li
                      key={block.id}
                      className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[15px] leading-snug text-slate-700"
                    >
                      <StatusBadge level={block.level} variant="pill" />
                      <span className="font-semibold text-slate-900">
                        {block.name}:
                      </span>
                      <span className="min-w-0 text-slate-700">
                        {block.recommendation}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 3) Escalation notice when notified list is non-empty */}
            {notifiedList.length > 0 && (
              <p className="mt-5 border-t border-slate-200 pt-4 text-sm font-semibold text-slate-800">
                Notified: {notifiedList.join(', ')}
              </p>
            )}
          </div>

          {/* Today's tasks card */}
          <div className="mt-5 rounded-2xl border border-slate-800/90 bg-[#10192D] p-5 shadow-lg shadow-black/25">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Today&apos;s tasks
            </h2>

            {dueTests.length > 0 ? (
              <ul className="mt-3 divide-y divide-slate-800/80">
                {dueTests.map((test) => (
                  <li
                    key={test.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-1 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="text-base font-medium text-slate-100">
                        {test.name}
                      </p>
                      <p
                        className="mt-0.5 text-sm font-medium"
                        style={{
                          color: test.overdue ? '#EB984E' : '#94A3B8',
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
                      className="inline-flex min-h-[40px] shrink-0 items-center justify-center rounded-xl border border-sky-400/45 bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-200 transition-colors hover:border-sky-400/75 hover:bg-sky-500/25 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 cursor-pointer"
                    >
                      Start
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2.5 text-sm text-slate-300">
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
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-sky-500 px-6 py-3 text-base font-semibold text-slate-950 transition-colors duration-150 hover:bg-sky-400 active:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 whitespace-nowrap shrink-0 cursor-pointer"
            >
              View my metrics →
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/alerts-info')}
              className="min-h-[44px] px-2 text-sm font-medium text-slate-400 underline decoration-slate-600 underline-offset-4 transition-colors duration-150 hover:text-slate-100 hover:decoration-slate-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 whitespace-nowrap shrink-0 cursor-pointer"
            >
              How alerts work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
