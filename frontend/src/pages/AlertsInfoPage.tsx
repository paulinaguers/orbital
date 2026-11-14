// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { ArrowLeft, Info } from 'lucide-react';
import { OrbiMascot } from '../components/OrbiMascot';
import { StatusBadge } from '../components/StatusBadge';
import { DATA_SOURCE_GROUPS, LEVEL_STYLES } from '../data/source';
import type { HealthLevel } from '../types/orbital';

interface AlertsInfoPageProps {
  onNavigate: (path: string) => void;
}

const ALERT_LEVEL_CARDS: Array<{
  level: HealthLevel;
  meaning: string;
  action: string;
  notified: string;
}> = [
  {
    level: 'green',
    meaning: 'Everything is within the expected range.',
    action: 'Keep your routine.',
    notified: 'No one.',
  },
  {
    level: 'yellow',
    meaning:
      'A value is moving away from your usual, but is still within the clinical range.',
    action: 'Repeat the measurement and follow the self-care tips.',
    notified: 'No one. This stays between you and ORBITAL.',
  },
  {
    level: 'orange',
    meaning:
      'A value is out of the clinical range, or has changed clearly and for several days.',
    action: 'Contact the onboard doctor.',
    notified: 'Onboard doctor and flight surgeon on Earth.',
  },
  {
    level: 'red',
    meaning: 'A critical value.',
    action: 'Stop and get help now.',
    notified:
      'Onboard doctor and flight surgeon on Earth, marked URGENT, and a crewmate on board.',
  },
];

export function AlertsInfoPage({ onNavigate }: AlertsInfoPageProps) {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 py-6 sm:px-8 sm:py-8">
      {/* Header & Back link to Home */}
      <header>
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors duration-150 hover:text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Home</span>
        </button>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          How ORBITAL alerts work
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-300">
          ORBITAL compares every reading with clinical ranges and with your own
          usual values (your personal baseline), and decides the alert level on
          board, without needing Earth.
        </p>
      </header>

      {/* Four large level cards */}
      <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
        {ALERT_LEVEL_CARDS.map((card) => {
          const style = LEVEL_STYLES[card.level];

          return (
            <article
              key={card.level}
              className="flex flex-col rounded-2xl bg-[#10192D] p-6 shadow-lg shadow-black/25"
              style={{ border: `1.5px solid ${style.color}` }}
            >
              <div className="flex items-center justify-between gap-4">
                <StatusBadge level={card.level} variant="pill" />
                <OrbiMascot level={card.level} size="sm" />
              </div>

              <dl className="mt-4 space-y-3 border-t border-slate-800/80 pt-4 text-sm leading-relaxed">
                <div>
                  <dt className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                    What it means
                  </dt>
                  <dd className="mt-0.5 text-slate-100">{card.meaning}</dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                    What you do
                  </dt>
                  <dd className="mt-0.5 font-medium text-slate-100">
                    {card.action}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                    Who is notified
                  </dt>
                  <dd className="mt-0.5 text-slate-200">{card.notified}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>

      {/* Timing & Earth delay info box */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-700/80 bg-[#0D1628] px-5 py-4 text-sm leading-relaxed text-slate-200">
        <Info
          className="mt-0.5 h-4 w-4 text-sky-300 shrink-0"
          aria-hidden="true"
        />
        <p>
          On-board alerts are immediate. Messages to Earth are sent in the next
          communication window (signal delay up to 20 min each way).
        </p>
      </div>

      {/* Where the data comes from */}
      <div className="mt-9">
        <h2 className="text-xl font-semibold tracking-tight text-slate-50">
          Where the data comes from
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {DATA_SOURCE_GROUPS.map((section) => (
            <div
              key={section.group}
              className="rounded-2xl border border-slate-800/90 bg-[#10192D] p-5"
            >
              <h3 className="text-sm font-semibold tracking-wide text-sky-300 uppercase">
                {section.group}
              </h3>

              <ul className="mt-3 space-y-3 text-sm">
                {section.items.map((item) => (
                  <li
                    key={item.indicator}
                    className="border-t border-slate-800/70 pt-2.5 first:border-t-0 first:pt-0"
                  >
                    <p className="font-medium text-slate-100">
                      {item.indicator}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                      {item.source}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 border-t border-slate-800/70 pt-5 text-center text-xs leading-relaxed text-slate-400">
        ORBITAL guides, it does not diagnose. All data shown is simulated.
      </footer>
    </section>
  );
}
