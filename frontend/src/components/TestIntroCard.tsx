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
    <div className="glass-panel my-auto mx-auto w-full max-w-2xl p-6 sm:p-8">
      <h1 className="text-2xl font-semibold tracking-tight text-[#E8F0FF] sm:text-3xl">
        {title}
      </h1>

      <dl className="glass-panel-soft mt-5 grid grid-cols-1 gap-3.5 p-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-wider text-[#8FA3C7]">
            What it measures
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-[#E8F0FF]">
            {whatItMeasures}
          </dd>
        </div>

        <div className="sm:col-span-2 border-t border-[rgba(120,180,255,0.14)] pt-3">
          <dt className="text-xs font-semibold uppercase tracking-wider text-[#8FA3C7]">
            Why it matters in space
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-[#E8F0FF]/90">
            {whyItMatters}
          </dd>
        </div>

        <div className="border-t border-[rgba(120,180,255,0.14)] pt-3">
          <dt className="text-xs font-semibold uppercase tracking-wider text-[#8FA3C7]">
            How long it takes
          </dt>
          <dd className="mt-1 text-sm font-medium text-[#E8F0FF]">
            {howLong}
          </dd>
        </div>

        <div className="border-t border-[rgba(120,180,255,0.14)] pt-3">
          <dt className="text-xs font-semibold uppercase tracking-wider text-[#8FA3C7]">
            How often
          </dt>
          <dd className="mt-1 text-sm font-medium text-[#E8F0FF]">
            {howOften}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8FA3C7]">
          Steps
        </h2>
        <ol className="mt-3 space-y-2.5">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <li
                key={step.text}
                className="glass-panel-soft flex items-start gap-3 px-3.5 py-2.5 text-sm leading-relaxed text-[#E8F0FF]"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#4FC3F7]/15 text-[#4FC3F7]">
                  <StepIcon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="pt-0.5">
                  <span className="font-mono-tabular mr-1.5 font-semibold text-[#8FA3C7]">
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
        <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-amber-400/35 bg-amber-500/12 px-4 py-3 text-sm text-amber-100">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
          <p className="leading-relaxed">{note}</p>
        </div>
      )}

      <div className="mt-7">
        <button
          type="button"
          onClick={onStart}
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#4FC3F7] px-6 py-3 text-base font-semibold text-slate-950 shadow-[0_0_18px_rgba(79,195,247,0.3)] transition-colors duration-150 hover:bg-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
