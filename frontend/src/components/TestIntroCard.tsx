// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import type { LucideIcon } from 'lucide-react';
import { Info } from 'lucide-react';

export interface TestIntroStep {
  icon: LucideIcon;
  text: string;
}

interface TestIntroCardProps {
  title: string;
  whatItMeasures: string;
  whyItMatters: string;
  howLong: string;
  howOften: string;
  steps: TestIntroStep[];
  note?: string;
  actionLabel: string;
  onStart: () => void;
}

export function TestIntroCard({
  title,
  whatItMeasures,
  whyItMatters,
  howLong,
  howOften,
  steps,
  note,
  actionLabel,
  onStart,
}: TestIntroCardProps) {
  return (
    <div className="my-auto mx-auto w-full max-w-2xl rounded-2xl border border-slate-800/90 bg-[#10192D] p-6 shadow-xl shadow-black/25 sm:p-8">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
        {title}
      </h1>

      <dl className="mt-5 grid grid-cols-1 gap-3.5 rounded-xl border border-slate-800/80 bg-[#0A1120] p-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            What it measures
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-slate-100">
            {whatItMeasures}
          </dd>
        </div>

        <div className="sm:col-span-2 border-t border-slate-800/70 pt-3">
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Why it matters in space
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-slate-200">
            {whyItMatters}
          </dd>
        </div>

        <div className="border-t border-slate-800/70 pt-3">
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            How long it takes
          </dt>
          <dd className="mt-1 text-sm font-medium text-slate-100">
            {howLong}
          </dd>
        </div>

        <div className="border-t border-slate-800/70 pt-3">
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            How often
          </dt>
          <dd className="mt-1 text-sm font-medium text-slate-100">
            {howOften}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Steps
        </h2>
        <ol className="mt-3 space-y-2.5">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <li
                key={step.text}
                className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-[#0B1222] px-3.5 py-2.5 text-sm leading-relaxed text-slate-200"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-sky-300">
                  <StepIcon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="pt-0.5">
                  <span className="font-mono-tabular mr-1.5 font-semibold text-slate-400">
                    {index + 1}.
                  </span>
                  {step.text}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {note && (
        <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
          <p className="leading-relaxed">{note}</p>
        </div>
      )}

      <div className="mt-7">
        <button
          type="button"
          onClick={onStart}
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-sky-500 px-6 py-3 text-base font-semibold text-slate-950 transition-colors duration-150 hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 cursor-pointer"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
