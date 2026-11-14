// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { ArrowLeft, Check } from 'lucide-react';
import { useState } from 'react';
import { saveSelfReport } from '../data/source';
import type { Astronaut } from '../types/orbital';

interface MentalCheckinPageProps {
  astronaut: Astronaut;
  onNavigate: (path: string) => void;
}

type ScoreKey =
  | 'mood_score'
  | 'fatigue_score'
  | 'stress_score'
  | 'workload_score';

interface QuestionConfig {
  key: ScoreKey;
  label: string;
  leftAnchor: string;
  rightAnchor: string;
}

const QUESTIONS: QuestionConfig[] = [
  {
    key: 'mood_score',
    label: 'Mood',
    leftAnchor: 'Very good',
    rightAnchor: 'Very bad',
  },
  {
    key: 'fatigue_score',
    label: 'Fatigue',
    leftAnchor: 'Not tired at all',
    rightAnchor: 'Extremely tired',
  },
  {
    key: 'stress_score',
    label: 'Stress',
    leftAnchor: 'Not stressed at all',
    rightAnchor: 'Extremely stressed',
  },
  {
    key: 'workload_score',
    label: 'Workload',
    leftAnchor: 'Very light',
    rightAnchor: 'Overwhelming',
  },
];

const SCORES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
const FACE_POSITIONS = [0, 2.5, 5, 7.5, 10] as const;

// Soft gradient from green (0) to yellow/orange to red (10)
const SCORE_COLORS: string[] = [
  '#2ECC71', // 0
  '#58D161', // 1
  '#88D04E', // 2
  '#BDD034', // 3
  '#F1C40F', // 4
  '#EEAD16', // 5
  '#EA951C', // 6
  '#E67E22', // 7
  '#E66E2B', // 8
  '#E75D34', // 9
  '#E74C3C', // 10
];

function getClosestFaceIndex(value: number | null): number | null {
  if (value === null) {
    return null;
  }
  let bestIdx = 0;
  let bestDist = Infinity;
  FACE_POSITIONS.forEach((pos, idx) => {
    const dist = Math.abs(value - pos);
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = idx;
    }
  });
  return bestIdx;
}

function FaceIcon({
  questionKey,
  faceIdx,
  color,
  active,
}: {
  questionKey: ScoreKey;
  faceIdx: number;
  color: string;
  active: boolean;
}) {
  const stroke = active ? color : '#94A3B8';

  const renderEyes = () => {
    if (questionKey === 'fatigue_score') {
      if (faceIdx === 0) {
        return (
          <>
            <circle cx="11" cy="12" r="1.6" fill={stroke} />
            <circle cx="19" cy="12" r="1.6" fill={stroke} />
          </>
        );
      }
      if (faceIdx === 1) {
        return (
          <>
            <circle cx="11" cy="12.5" r="1.4" fill={stroke} />
            <circle cx="19" cy="12.5" r="1.4" fill={stroke} />
          </>
        );
      }
      if (faceIdx === 2) {
        return (
          <>
            <line
              x1="9.2"
              y1="12.5"
              x2="12.8"
              y2="12.5"
              stroke={stroke}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <line
              x1="17.2"
              y1="12.5"
              x2="20.8"
              y2="12.5"
              stroke={stroke}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </>
        );
      }
      if (faceIdx === 3) {
        return (
          <>
            <path
              d="M9.2 12.2 Q11 13.8 12.8 12.2"
              stroke={stroke}
              strokeWidth="1.7"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M17.2 12.2 Q19 13.8 20.8 12.2"
              stroke={stroke}
              strokeWidth="1.7"
              strokeLinecap="round"
              fill="none"
            />
          </>
        );
      }
      return (
        <>
          <path
            d="M9 12.8 L12.8 13.4"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M21 12.8 L17.2 13.4"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </>
      );
    }

    if (questionKey === 'stress_score' && faceIdx >= 3) {
      return (
        <>
          <path
            d="M9 9.5 L12.8 11"
            stroke={stroke}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M21 9.5 L17.2 11"
            stroke={stroke}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="11" cy="13" r="1.4" fill={stroke} />
          <circle cx="19" cy="13" r="1.4" fill={stroke} />
        </>
      );
    }

    if (questionKey === 'workload_score' && faceIdx === 4) {
      return (
        <>
          <path
            d="M9.5 11 L12.5 13.5 M12.5 11 L9.5 13.5"
            stroke={stroke}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M17.5 11 L20.5 13.5 M20.5 11 L17.5 13.5"
            stroke={stroke}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </>
      );
    }

    if (faceIdx === 4 && questionKey === 'mood_score') {
      return (
        <>
          <path
            d="M9 10.5 L12.5 9.2"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M21 10.5 L17.5 9.2"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="11" cy="12.5" r="1.4" fill={stroke} />
          <circle cx="19" cy="12.5" r="1.4" fill={stroke} />
        </>
      );
    }

    return (
      <>
        <circle cx="11" cy="12.2" r="1.45" fill={stroke} />
        <circle cx="19" cy="12.2" r="1.45" fill={stroke} />
      </>
    );
  };

  const renderMouth = () => {
    if (faceIdx === 0) {
      return (
        <path
          d="M10.2 17.2 Q15 21.8 19.8 17.2"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      );
    }
    if (faceIdx === 1) {
      return (
        <path
          d="M10.8 17.8 Q15 20.4 19.2 17.8"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      );
    }
    if (faceIdx === 2) {
      return (
        <line
          x1="10.8"
          y1="18.6"
          x2="19.2"
          y2="18.6"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      );
    }
    if (faceIdx === 3) {
      return (
        <path
          d="M10.8 19.8 Q15 17.2 19.2 19.8"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      );
    }

    // faceIdx === 4 (worst)
    if (questionKey === 'stress_score' || questionKey === 'workload_score') {
      return (
        <path
          d="M9.8 19.4 L12 17.8 L14 19.6 L16 17.8 L18 19.6 L20.2 18"
          stroke={stroke}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      );
    }
    if (questionKey === 'fatigue_score') {
      return (
        <ellipse
          cx="15"
          cy="19"
          rx="2.3"
          ry="2.6"
          stroke={stroke}
          strokeWidth="1.7"
          fill="none"
        />
      );
    }
    return (
      <path
        d="M10 20.4 Q15 16.2 20 20.4"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    );
  };

  return (
    <svg
      viewBox="0 0 30 30"
      className={`h-7 w-7 transition-all duration-150 ${
        active ? 'scale-125 opacity-100' : 'opacity-45'
      }`}
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="15"
        cy="15"
        r="12"
        stroke={stroke}
        strokeWidth={active ? 2.1 : 1.6}
        fill={active ? `${color}22` : 'transparent'}
      />
      {renderEyes()}
      {renderMouth()}
    </svg>
  );
}

export function MentalCheckinPage({
  astronaut,
  onNavigate,
}: MentalCheckinPageProps) {
  const [scores, setScores] = useState<Record<ScoreKey, number | null>>({
    mood_score: null,
    fatigue_score: null,
    stress_score: null,
    workload_score: null,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const answeredCount = QUESTIONS.filter(
    (q) => scores[q.key] !== null,
  ).length;
  const allAnswered = answeredCount === QUESTIONS.length;

  const handleSelect = (key: ScoreKey, nextValue: number) => {
    setSaved(false);
    setErrorMessage(null);
    setScores((prev) => ({
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
          mood_score: scores.mood_score!,
          fatigue_score: scores.fatigue_score!,
          stress_score: scores.stress_score!,
          workload_score: scores.workload_score!,
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
    <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
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

        {!saved && (
          <p className="font-mono-tabular text-sm font-medium text-slate-300">
            {answeredCount} of 4 answered
          </p>
        )}
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
          className="mt-6 rounded-2xl border border-slate-800/90 bg-[#10192D] p-5 shadow-xl shadow-black/25 sm:p-8"
        >
          <div className="space-y-8">
            {QUESTIONS.map((question) => {
              const selected = scores[question.key];
              const closestFaceIdx = getClosestFaceIndex(selected);

              return (
                <div
                  key={question.key}
                  className="border-b border-slate-800/80 pb-7 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-base font-semibold text-slate-100 sm:text-lg">
                      {question.label}
                    </h2>
                    {selected === null && (
                      <span className="text-xs text-slate-400">
                        Select 0 to 10
                      </span>
                    )}
                  </div>

                  {/* 5 face icons aligned at 0, 2.5, 5, 7.5, and 10 above the 11-button row */}
                  <div className="relative mt-4 h-9 w-full">
                    {FACE_POSITIONS.map((pos, idx) => {
                      const leftPct = ((pos + 0.5) / 11) * 100;
                      const isClosest = closestFaceIdx === idx;
                      const faceColor =
                        selected !== null
                          ? SCORE_COLORS[selected]
                          : SCORE_COLORS[Math.round(pos)];

                      return (
                        <div
                          key={pos}
                          className="absolute top-0 -translate-x-1/2"
                          style={{ left: `${leftPct}%` }}
                        >
                          <FaceIcon
                            questionKey={question.key}
                            faceIdx={idx}
                            color={faceColor}
                            active={isClosest}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* 11 large round buttons numbered 0 to 10 */}
                  <div
                    role="radiogroup"
                    aria-label={question.label}
                    className="mt-2 grid grid-cols-11 gap-1 sm:gap-2"
                  >
                    {SCORES.map((num) => {
                      const isSelected = selected === num;
                      const color = SCORE_COLORS[num];
                      const selectedText = num >= 8 ? '#FFFFFF' : '#07101C';

                      return (
                        <button
                          key={num}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          aria-label={`${question.label} ${num} out of 10`}
                          onClick={() => handleSelect(question.key, num)}
                          className={`mx-auto flex aspect-square w-full max-w-[46px] min-h-[34px] items-center justify-center rounded-full font-mono-tabular text-xs font-semibold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 cursor-pointer sm:text-sm ${
                            isSelected
                              ? 'scale-115 shadow-lg ring-2 ring-white/85'
                              : 'hover:scale-105'
                          }`}
                          style={{
                            backgroundColor: isSelected
                              ? color
                              : `${color}24`,
                            border: `1.5px solid ${isSelected ? color : `${color}66`}`,
                            color: isSelected ? selectedText : '#E2E8F0',
                          }}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>

                  {/* Anchor labels under 0 and 10 */}
                  <div className="mt-2.5 flex items-center justify-between gap-4 text-xs sm:text-sm text-slate-300">
                    <span>{question.leftAnchor}</span>
                    <span className="text-right">{question.rightAnchor}</span>
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
                Answer all four questions to save your check-in.
              </span>
            )}
          </div>
        </form>
      )}
    </section>
  );
}
