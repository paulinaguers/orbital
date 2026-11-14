// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { ArrowLeft, Check } from 'lucide-react';
import { useState } from 'react';
import { saveAmslerResult } from '../data/source';
import type { Astronaut } from '../types/orbital';

interface AmslerTestPageProps {
  astronaut: Astronaut;
  onNavigate: (path: string) => void;
  onTestCompleted?: () => void;
}

type TestStep =
  | 'intro-right'
  | 'grid-right'
  | 'mark-right'
  | 'intro-left'
  | 'grid-left'
  | 'mark-left'
  | 'complete';

const GRID_SIZE = 20;
const ROWS = Array.from({ length: GRID_SIZE }, (_, i) => i);
const COLS = Array.from({ length: GRID_SIZE }, (_, i) => i);

export function AmslerTestPage({
  astronaut,
  onNavigate,
  onTestCompleted,
}: AmslerTestPageProps) {
  const [step, setStep] = useState<TestStep>('intro-right');
  const [selectedCells, setSelectedCells] = useState<Set<string>>(
    () => new Set(),
  );
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentEye: 'right' | 'left' =
    step === 'intro-right' || step === 'grid-right' || step === 'mark-right'
      ? 'right'
      : 'left';

  const isMarking = step === 'mark-right' || step === 'mark-left';
  const isGridVisible =
    step === 'grid-right' ||
    step === 'mark-right' ||
    step === 'grid-left' ||
    step === 'mark-left';

  const toggleCell = (row: number, col: number) => {
    if (!isMarking) {
      return;
    }
    const key = `${row},${col}`;
    setSelectedCells((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const submitEyeResult = async (distortion: boolean) => {
    if (saving) {
      return;
    }

    const cells: Array<[number, number]> = distortion
      ? Array.from(selectedCells).map((key) => {
          const [r, c] = key.split(',').map(Number);
          return [r, c];
        })
      : [];

    setSaving(true);
    setErrorMessage(null);
    try {
      await saveAmslerResult(
        {
          flight_day: astronaut.flight_day,
          eye: currentEye,
          distortion,
          cells,
        },
        astronaut.id,
      );

      setSelectedCells(new Set());
      if (currentEye === 'right') {
        setStep('intro-left');
      } else {
        onTestCompleted?.();
        setStep('complete');
      }
    } catch {
      setErrorMessage('Could not save your result. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-5 sm:px-8 sm:py-6">
      <div>
        <button
          type="button"
          onClick={() => onNavigate('/block/environment')}
          className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors duration-150 hover:text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back</span>
        </button>
      </div>

      {step === 'intro-right' && (
        <div className="my-auto mx-auto w-full max-w-2xl rounded-2xl border border-slate-800/90 bg-[#10192D] p-7 shadow-xl shadow-black/25 sm:p-9">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Amsler grid test — Right eye
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-200">
            Wear your usual reading glasses. Hold the screen at reading distance
            (30–38 cm). Cover your LEFT eye completely. Stare at the center dot
            without moving your eyes.
          </p>
          <div className="mt-7">
            <button
              type="button"
              onClick={() => setStep('grid-right')}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-sky-500 px-6 py-3 text-base font-semibold text-slate-950 transition-colors duration-150 hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 cursor-pointer"
            >
              Start right eye test
            </button>
          </div>
        </div>
      )}

      {step === 'intro-left' && (
        <div className="my-auto mx-auto w-full max-w-2xl rounded-2xl border border-slate-800/90 bg-[#10192D] p-7 shadow-xl shadow-black/25 sm:p-9">
          <p className="text-2xl font-bold tracking-tight text-sky-300 sm:text-3xl">
            Cover your RIGHT eye completely.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-200">
            Hold the screen at reading distance (30–38 cm). Stare at the center
            dot without moving your eyes.
          </p>
          <div className="mt-7">
            <button
              type="button"
              onClick={() => setStep('grid-left')}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-sky-500 px-6 py-3 text-base font-semibold text-slate-950 transition-colors duration-150 hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 cursor-pointer"
            >
              Start left eye test
            </button>
          </div>
        </div>
      )}

      {isGridVisible && (
        <div className="mt-2 flex flex-1 flex-col items-center justify-center">
          <p className="mb-3 text-sm font-medium text-slate-300">
            {currentEye === 'right'
              ? 'Right eye (LEFT eye covered) — keep staring at the center dot'
              : 'Left eye (RIGHT eye covered) — keep staring at the center dot'}
          </p>

          {/* 20 x 20 Black-and-White Amsler Grid */}
          <div className="relative h-[min(60vh,500px)] w-[min(60vh,500px)] max-w-full aspect-square bg-white border-r border-b border-black shadow-2xl select-none">
            <div
              className="grid h-full w-full"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
              }}
            >
              {ROWS.map((row) =>
                COLS.map((col) => {
                  const key = `${row},${col}`;
                  const isSelected = selectedCells.has(key);

                  if (!isMarking) {
                    return (
                      <div
                        key={key}
                        className="border-t border-l border-black/85 bg-white"
                      />
                    );
                  }

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleCell(row, col)}
                      aria-label={`Row ${row + 1}, Column ${col + 1}${isSelected ? ' selected' : ''}`}
                      aria-pressed={isSelected}
                      className={`border-t border-l border-black/85 transition-colors duration-75 focus-visible:outline-2 focus-visible:outline-sky-500 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-400/70'
                          : 'bg-white hover:bg-slate-200/70'
                      }`}
                    />
                  );
                }),
              )}
            </div>

            {/* Central black fixation dot */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
            />
          </div>

          {errorMessage && (
            <p className="mt-3 text-sm text-rose-300">{errorMessage}</p>
          )}

          {/* Question & Actions */}
          <div className="mt-5 flex flex-col items-center gap-3 text-center">
            {!isMarking ? (
              <>
                <p className="text-base font-medium text-slate-100 sm:text-lg">
                  Do any lines look wavy, blurry, dark or missing?
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => submitEyeResult(false)}
                    className="inline-flex min-h-[44px] min-w-[112px] items-center justify-center rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-400 disabled:opacity-60 cursor-pointer"
                  >
                    No
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() =>
                      setStep(
                        currentEye === 'right' ? 'mark-right' : 'mark-left',
                      )
                    }
                    className="inline-flex min-h-[44px] min-w-[112px] items-center justify-center rounded-xl border border-slate-600 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:bg-slate-700 disabled:opacity-60 cursor-pointer"
                  >
                    Yes
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-base font-medium text-slate-100 sm:text-lg">
                  Tap the cells where you see it.
                </p>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => submitEyeResult(true)}
                  className="inline-flex min-h-[44px] min-w-[140px] items-center justify-center rounded-xl bg-sky-500 px-6 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-400 disabled:opacity-60 cursor-pointer"
                >
                  {saving ? 'Saving...' : 'Done'}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {step === 'complete' && (
        <div className="my-auto mx-auto w-full max-w-2xl rounded-2xl border border-slate-800/90 bg-[#10192D] p-7 shadow-xl shadow-black/25 sm:p-9">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/15 text-sky-300 shrink-0">
              <Check className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
                Amsler grid test complete
              </h1>
              <p className="mt-2 text-lg leading-relaxed text-slate-200">
                Thank you. Your result will be compared with your previous
                tests.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('/block/environment')}
                className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-2.5 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-700/80 cursor-pointer"
              >
                Return to Environment, Radiation &amp; Vision
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
