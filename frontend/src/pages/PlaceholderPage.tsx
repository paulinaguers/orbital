// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { ArrowLeft } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  routeLabel: string;
  onBack: () => void;
}

export function PlaceholderPage({
  title,
  routeLabel,
  onBack,
}: PlaceholderPageProps) {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-10 sm:px-8">
      <div className="rounded-2xl border border-slate-800/90 bg-[#10192D] p-8 shadow-xl shadow-black/25">
        <p className="font-mono-tabular text-xs font-medium tracking-wider text-slate-400 uppercase">
          {routeLabel}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          {title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-300">
          This screen is scheduled for the next build phase. Return to Orbi on
          the home view to review today&apos;s mission health summary.
        </p>

        <div className="mt-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-2.5 text-sm font-medium text-slate-100 transition-colors duration-150 hover:bg-slate-700/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </section>
  );
}
