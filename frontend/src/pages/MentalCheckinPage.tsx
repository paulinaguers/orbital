// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { ArrowLeft, Check } from 'lucide-react';
import { useState } from 'react';
import { saveSelfReport } from '../data/source';
import type { Astronaut } from '../types/orbital';

interface MentalCheckinPageProps {
  astronaut: Astronaut;
  onNavigate: (path: string) => void;
}

type ScaleKey = 'mood_vas' | 'fatigue_vas' | 'stress_vas' | 'workload_vas';

interface ScaleConfig {
  key: ScaleKey;
  label: string;
  leftAnchor: string;
  rightAnchor: string;
}

const SCALES: ScaleConfig[] = [
  {
    key: 'mood_vas',
    label: 'Mood',
    leftAnchor: 'Very good',
    rightAnchor: 'Very bad',
  },
  {
    key: 'fatigue_vas',
    label: 'Fatigue',
    leftAnchor: 'Not tired at all',
    rightAnchor: 'Extremely tired',
  },
  {
    key: 'stress_vas',
    label: 'Stress',
    leftAnchor: 'Not stressed at all',
    rightAnchor: 'Extremely stressed',
  },
  {
    key: 'workload_vas',
    label: 'Workload',
    leftAnchor: 'Very light',
    rightAnchor: 'Overwhelming',
  },
];

export function MentalCheckinPage({
  astronaut,
  onNavigate,
}: MentalCheckinPageProps) {
  const [values, setValues] = useState<Record<ScaleKey, number | null>>({
    mood_vas: null,
    fatigue_vas: null,
    stress_vas: null,
    workload_vas: null,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const allAnswered = SCALES.every((s) => values[s.key] !== null);

  const handleTouch = (key: ScaleKey, nextValue: number) => {
    setSaved(false);
    setErrorMessage(null);
    setValues((prev) => ({
      ...prev,
      [key]: nextValue,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allAnswered || saving) {
      return;
    }

    setSaving(true);
    setErrorMessage(null);
    try {
      await saveSelfReport(
        {
          flight_day: astronaut.flight_day,
          mood_vas: values.mood_vas!,
          fatigue_vas: values.fatigue_vas!,
          stress_vas: values.stress_vas!,
          workload_vas: values.workload_vas!,
        },
        astronaut.id,
      );
      setSaved(true);
    } catch {
      setErrorMessage('Could not save your check-in. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-6 sm:px-8 sm:py-8">
      <div>
        <button
          type="button"
          onClick={() => onNavigate('/block/mental_health')}
          className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors duration-150 hover:text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Mental Health</span>
        </button>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          Daily check-in
        </h1>
        <p className="mt-1.5 text-base text-slate-300">
          Takes less than 30 seconds.
        </p>
      </div>

      {saved ? (
        <div className="mt-8 rounded-2xl border border-slate-700/80 bg-[#10192D] p-8 shadow-xl shadow-black/25">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/15 text-sky-300 shrink-0">
              <Check className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-lg font-medium leading-relaxed text-slate-100">
                Saved. Your answers will be compared with your personal
                baseline.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('/block/mental_health')}
                className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-2.5 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-700/80 cursor-pointer"
              >
                Return to Mental Health
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSave}
          className="mt-6 rounded-2xl border border-slate-800/90 bg-[#10192D] p-6 shadow-xl shadow-black/25 sm:p-8"
        >
          <div className="space-y-7">
            {SCALES.map((scale) => {
              const currentValue = values[scale.key];
              const isTouched = currentValue !== null;

              return (
                <div
                  key={scale.key}
                  className="border-b border-slate-800/80 pb-6 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor={`vas-${scale.key}`}
                      className="text-base font-semibold text-slate-100"
                    >
                      {scale.label}
                    </label>
                    {!isTouched && (
                      <span className="text-xs text-slate-400">
                        Not yet selected
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <input
                      id={`vas-${scale.key}`}
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={currentValue ?? 50}
                      data-touched={isTouched ? 'true' : 'false'}
                      aria-valuetext={
                        isTouched ? 'Selected' : 'No value selected'
                      }
                      onPointerDown={(e) => {
                        if (!isTouched) {
                          handleTouch(
                            scale.key,
                            Number((e.target as HTMLInputElement).value),
                          );
                        }
                      }}
                      onChange={(e) =>
                        handleTouch(scale.key, Number(e.target.value))
                      }
                      className="vas-slider min-h-[32px]"
                    />
                  </div>

                  <div className="mt-1.5 flex items-center justify-between gap-4 text-xs sm:text-sm text-slate-300">
                    <span>{scale.leftAnchor}</span>
                    <span className="text-right">{scale.rightAnchor}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {errorMessage && (
            <p className="mt-5 text-sm text-rose-300">{errorMessage}</p>
          )}

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-5">
            <button
              type="submit"
              disabled={!allAnswered || saving}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-sky-500 px-6 py-3 text-base font-semibold text-slate-950 transition-colors duration-150 hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 cursor-pointer"
            >
              {saving ? 'Saving...' : 'Save check-in'}
            </button>

            {!allAnswered && (
              <span className="text-xs text-slate-400">
                Move each slider to record your answer.
              </span>
            )}
          </div>
        </form>
      )}
    </section>
  );
}
