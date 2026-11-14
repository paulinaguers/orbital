// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { OrbiMascot } from '../components/OrbiMascot';
import { StatusBadge } from '../components/StatusBadge';
import { LEVEL_STYLES } from '../data/source';
import type { OrbitalStatus } from '../types/orbital';

interface HomePageProps {
  status: OrbitalStatus;
  onNavigate: (path: string) => void;
}

export function HomePage({ status, onNavigate }: HomePageProps) {
  const firstName = status.astronaut.name.split(' ')[0] || status.astronaut.name;
  const attentionBlocks = status.blocks.filter(
    (block) => block.level !== 'green',
  );
  const notifiedList = status.escalation.notified;
  const bubbleColor = LEVEL_STYLES[status.overall_level].color;

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

        {/* Speech Bubble & Primary Actions Column */}
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
