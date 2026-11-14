// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { ArrowLeft, Info } from 'lucide-react';
import { OrbiMascot } from '../components/OrbiMascot';
import { StatusBadge } from '../components/StatusBadge';
import { DATA_SOURCE_GROUPS, LEVEL_STYLES } from '../data/source';
import type { HealthLevel, UserProfile } from '../types/orbital';

interface AlertsInfoPageProps {
  profile: UserProfile;
  onNavigate: (path: string) => void;
}

const CREW_ALERT_CARDS: Array<{
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

const PASSENGER_ALERT_CARDS: Array<{
  level: HealthLevel;
  meaning: string;
  action: string;
  notified: string;
}> = [
  {
    level: 'green',
    meaning: 'Everything is within your normal range.',
    action: 'Keep enjoying your flight.',
    notified: 'No one.',
  },
  {
    level: 'yellow',
    meaning: 'Something is a bit different from your usual pre-flight values.',
    action: 'Follow the simple self-care tips.',
    notified: 'No one. This stays between you and ORBITAL.',
  },
  {
    level: 'orange',
    meaning: 'A value is out of range or has stayed changed for a bit.',
    action: 'Let the flight crew know.',
    notified: 'Flight crew and ground medical team.',
  },
  {
    level: 'red',
    meaning: 'An urgent health reading.',
    action: 'Stop what you are doing and get help now.',
    notified: 'Flight crew and ground medical team – URGENT.',
  },
];

export function AlertsInfoPage({ profile, onNavigate }: AlertsInfoPageProps) {
  const isPassenger = profile === 'passenger';
  const cards = isPassenger ? PASSENGER_ALERT_CARDS : CREW_ALERT_CARDS;
  const sourceGroups = isPassenger
    ? DATA_SOURCE_GROUPS.filter((group) => group.group !== 'In-app tests')
    : DATA_SOURCE_GROUPS;

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 py-6 sm:px-8 sm:py-8">
      {/* Header & Back link to Home */}
      <header>
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-[#8FA3C7] transition-colors duration-150 hover:text-[#E8F0FF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4FC3F7] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Home</span>
        </button>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#E8F0FF] sm:text-3xl">
          How ORBITAL alerts work
        </h1>
        <p
          className={`mt-3 max-w-3xl leading-relaxed text-[#8FA3C7] ${
            isPassenger ? 'text-lg' : 'text-base'
          }`}
        >
          {isPassenger
            ? 'ORBITAL compares your readings with standard ranges and your normal pre-flight values, and keeps an eye on things right on board.'
            : 'ORBITAL compares every reading with clinical ranges and with your own usual values (your personal baseline), and decides the alert level on board, without needing Earth.'}
        </p>
      </header>

      {/* Four large level cards */}
      <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
        {cards.map((card) => {
          const style = LEVEL_STYLES[card.level];

          return (
            <article
              key={card.level}
              className="glass-panel flex flex-col p-6"
              style={{
                borderColor: style.surfaceBorder,
                boxShadow:
                  card.level === 'orange' || card.level === 'red'
                    ? `0 0 24px ${style.surfaceBg}`
                    : undefined,
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <StatusBadge level={card.level} variant="pill" />
                <OrbiMascot level={card.level} size="sm" />
              </div>

              <dl
                className={`mt-4 space-y-3 border-t border-[rgba(120,180,255,0.16)] pt-4 leading-relaxed ${
                  isPassenger ? 'text-base' : 'text-sm'
                }`}
              >
                <div>
                  <dt className="text-xs font-semibold tracking-wide text-[#8FA3C7] uppercase">
                    What it means
                  </dt>
                  <dd className="mt-0.5 text-[#E8F0FF]">{card.meaning}</dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold tracking-wide text-[#8FA3C7] uppercase">
                    What you do
                  </dt>
                  <dd className="mt-0.5 font-medium text-[#E8F0FF]">
                    {card.action}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold tracking-wide text-[#8FA3C7] uppercase">
                    Who is notified
                  </dt>
                  <dd className="mt-0.5 text-[#E8F0FF]/90">{card.notified}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>

      {/* Not evaluable level note */}
      <div
        className={`glass-panel mt-5 flex flex-wrap items-center gap-3 px-5 py-4 leading-relaxed text-[#E8F0FF] ${
          isPassenger ? 'text-base' : 'text-sm'
        }`}
      >
        <StatusBadge level="not_evaluable" variant="pill" />
        <p className="min-w-0 flex-1 text-[#8FA3C7]">
          Not enough data yet to compare with your usual values. This never
          counts as a color alert.
        </p>
      </div>

      {/* Timing & Earth delay info box */}
      <div
        className={`glass-panel mt-6 flex items-start gap-3 px-5 py-4 leading-relaxed text-[#E8F0FF] ${
          isPassenger ? 'text-base' : 'text-sm'
        }`}
      >
        <Info
          className="mt-0.5 h-4 w-4 text-[#4FC3F7] shrink-0"
          aria-hidden="true"
        />
        <p>
          On-board alerts are immediate. Messages to Earth are sent in the next
          communication window (signal delay up to 20 min each way).
        </p>
      </div>

      {/* Where the data comes from */}
      <div className="mt-9">
        <h2 className="text-xl font-semibold tracking-tight text-[#E8F0FF]">
          Where the data comes from
        </h2>

        <div
          className={`mt-4 grid grid-cols-1 gap-4 ${
            sourceGroups.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
          }`}
        >
          {sourceGroups.map((section) => (
            <div key={section.group} className="glass-panel p-5">
              <h3 className="text-sm font-semibold tracking-wide text-[#4FC3F7] uppercase">
                {section.group}
              </h3>

              <ul className="mt-3 space-y-3 text-sm">
                {section.items.map((item) => (
                  <li
                    key={item.indicator}
                    className="border-t border-[rgba(120,180,255,0.14)] pt-2.5 first:border-t-0 first:pt-0"
                  >
                    <p className="font-medium text-[#E8F0FF]">
                      {item.indicator}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#8FA3C7]">
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
      <footer className="mt-10 border-t border-[rgba(120,180,255,0.16)] pt-5 text-center text-xs leading-relaxed text-[#8FA3C7]">
        ORBITAL guides, it does not diagnose. All data shown is simulated.
      </footer>
    </section>
  );
}
