// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import {
  ArrowLeft,
  Check,
  Eye,
  HelpCircle,
  MousePointerClick,
  Timer,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TestIntroCard } from '../components/TestIntroCard';
import { savePvtSession } from '../data/source';
import type { Astronaut } from '../types/orbital';

interface PvtTestPageProps {
  astronaut: Astronaut;
  onNavigate: (path: string) => void;
  onTestCompleted?: () => void;
}

const DURATION_S = 60;
const DURATION_MS = DURATION_S * 1000;
// A stimulus with no answer within this window is an omission (scored as a
// lapse by the core). Same value as thresholds.py: response_window_ms.
const RESPONSE_WINDOW_MS = 3000;

type SessionStage = 'intro' | 'running' | 'complete';
type TrialSubPhase = 'waiting' | 'stimulus' | 'feedback';

function formatTimer(seconds: number): string {
  const clamped = Math.max(0, Math.ceil(seconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function PvtTestPage({
  astronaut,
  onNavigate,
  onTestCompleted,
}: PvtTestPageProps) {
  const [stage, setStage] = useState<SessionStage>('intro');
  const [subPhase, setSubPhase] = useState<TrialSubPhase>('waiting');
  const [displayMs, setDisplayMs] = useState(0);
  const [remainingSec, setRemainingSec] = useState(DURATION_S);
  const [falseStartNotice, setFalseStartNotice] = useState(false);
  const [recordedCount, setRecordedCount] = useState(0);
  const [missedCount, setMissedCount] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);

  const subPhaseRef = useRef<TrialSubPhase>('waiting');
  const sessionEndAtRef = useRef<number>(0);
  const pausedRemainingMsRef = useRef<number>(DURATION_MS);
  const stimulusStartRef = useRef<number>(0);
  const reactionTimesRef = useRef<number[]>([]);
  const falseStartsRef = useRef<number>(0);
  const stimuliRef = useRef<number>(0);
  const omissionTimerRef = useRef<number | null>(null);
  const [missedNotice, setMissedNotice] = useState(false);

  const waitTimerRef = useRef<number | null>(null);
  const feedbackTimerRef = useRef<number | null>(null);
  const falseStartTimerRef = useRef<number | null>(null);
  const sessionTimerRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);
  const counterRafRef = useRef<number | null>(null);

  const clearAllTimers = useCallback(() => {
    if (waitTimerRef.current !== null) {
      window.clearTimeout(waitTimerRef.current);
      waitTimerRef.current = null;
    }
    if (feedbackTimerRef.current !== null) {
      window.clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
    if (falseStartTimerRef.current !== null) {
      window.clearTimeout(falseStartTimerRef.current);
      falseStartTimerRef.current = null;
    }
    if (omissionTimerRef.current !== null) {
      window.clearTimeout(omissionTimerRef.current);
      omissionTimerRef.current = null;
    }
    if (sessionTimerRef.current !== null) {
      window.clearTimeout(sessionTimerRef.current);
      sessionTimerRef.current = null;
    }
    if (countdownIntervalRef.current !== null) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (counterRafRef.current !== null) {
      window.cancelAnimationFrame(counterRafRef.current);
      counterRafRef.current = null;
    }
  }, []);

  const scheduleNextWait = useCallback(() => {
    const remainingMs = sessionEndAtRef.current - performance.now();
    if (remainingMs <= 0) {
      return;
    }

    subPhaseRef.current = 'waiting';
    setSubPhase('waiting');
    setDisplayMs(0);

    const delayMs = 1000 + Math.random() * 3000;
    waitTimerRef.current = window.setTimeout(() => {
      if (performance.now() >= sessionEndAtRef.current) {
        return;
      }

      subPhaseRef.current = 'stimulus';
      setSubPhase('stimulus');
      setMissedNotice(false);
      stimulusStartRef.current = performance.now();
      stimuliRef.current += 1;

      // No answer within the window: omission, then the next stimulus.
      omissionTimerRef.current = window.setTimeout(() => {
        if (subPhaseRef.current !== 'stimulus') {
          return;
        }
        if (counterRafRef.current !== null) {
          window.cancelAnimationFrame(counterRafRef.current);
          counterRafRef.current = null;
        }
        subPhaseRef.current = 'feedback';
        setSubPhase('feedback');
        setMissedNotice(true);
        feedbackTimerRef.current = window.setTimeout(() => {
          setMissedNotice(false);
          scheduleNextWait();
        }, 1000);
      }, RESPONSE_WINDOW_MS);

      const updateCounter = () => {
        if (subPhaseRef.current !== 'stimulus') {
          return;
        }
        setDisplayMs(Math.round(performance.now() - stimulusStartRef.current));
        counterRafRef.current = window.requestAnimationFrame(updateCounter);
      };
      counterRafRef.current = window.requestAnimationFrame(updateCounter);
    }, delayMs);
  }, []);

  const finishSession = useCallback(() => {
    // A stimulus cut short by the end of the session is not a full chance.
    if (subPhaseRef.current === 'stimulus') {
      stimuliRef.current = Math.max(0, stimuliRef.current - 1);
    }
    subPhaseRef.current = 'waiting';
    clearAllTimers();
    const recorded = [...reactionTimesRef.current];
    const falseStarts = falseStartsRef.current;

    setRecordedCount(recorded.length);
    setMissedCount(Math.max(0, stimuliRef.current - recorded.length));
    setStage('complete');
    onTestCompleted?.();

    void savePvtSession(
      {
        flight_day: astronaut.flight_day,
        reaction_times_ms: recorded,
        stimuli_count: stimuliRef.current,
        false_starts: falseStarts,
        duration_s: 60,
      },
      astronaut.id,
    ).catch(() => {
      // Offline prototype keeps local count displayed even if remote save is unavailable
    });
  }, [astronaut.flight_day, astronaut.id, clearAllTimers, onTestCompleted]);

  const startSession = () => {
    clearAllTimers();
    reactionTimesRef.current = [];
    falseStartsRef.current = 0;
    stimuliRef.current = 0;
    setMissedNotice(false);
    setFalseStartNotice(false);
    setRemainingSec(DURATION_S);
    setStage('running');

    const now = performance.now();
    sessionEndAtRef.current = now + DURATION_MS;

    countdownIntervalRef.current = window.setInterval(() => {
      const leftSec = (sessionEndAtRef.current - performance.now()) / 1000;
      setRemainingSec(Math.max(0, leftSec));
    }, 250);

    sessionTimerRef.current = window.setTimeout(() => {
      finishSession();
    }, DURATION_MS);

    scheduleNextWait();
  };

  const openHelp = () => {
    // A stimulus interrupted by the help panel is discarded.
    if (subPhaseRef.current === 'stimulus') {
      stimuliRef.current = Math.max(0, stimuliRef.current - 1);
    }
    subPhaseRef.current = 'waiting';
    pausedRemainingMsRef.current = Math.max(
      0,
      sessionEndAtRef.current - performance.now(),
    );
    clearAllTimers();
    setHelpOpen(true);
  };

  const closeHelpAndResume = () => {
    const remainingMs = pausedRemainingMsRef.current;
    setHelpOpen(false);
    if (remainingMs <= 0) {
      finishSession();
      return;
    }

    sessionEndAtRef.current = performance.now() + remainingMs;
    setRemainingSec(remainingMs / 1000);

    countdownIntervalRef.current = window.setInterval(() => {
      const leftSec = (sessionEndAtRef.current - performance.now()) / 1000;
      setRemainingSec(Math.max(0, leftSec));
    }, 250);

    sessionTimerRef.current = window.setTimeout(() => {
      finishSession();
    }, remainingMs);

    scheduleNextWait();
  };

  const handleStimulusInput = useCallback(() => {
    if (stage !== 'running' || helpOpen) {
      return;
    }

    if (subPhaseRef.current === 'stimulus') {
      if (omissionTimerRef.current !== null) {
        window.clearTimeout(omissionTimerRef.current);
        omissionTimerRef.current = null;
      }
      if (counterRafRef.current !== null) {
        window.cancelAnimationFrame(counterRafRef.current);
        counterRafRef.current = null;
      }
      const rt = Math.max(
        1,
        Math.round(performance.now() - stimulusStartRef.current),
      );
      reactionTimesRef.current.push(rt);
      setDisplayMs(rt);
      subPhaseRef.current = 'feedback';
      setSubPhase('feedback');

      feedbackTimerRef.current = window.setTimeout(() => {
        scheduleNextWait();
      }, 1000);
      return;
    }

    if (subPhaseRef.current === 'waiting') {
      falseStartsRef.current += 1;
      setFalseStartNotice(true);
      if (falseStartTimerRef.current !== null) {
        window.clearTimeout(falseStartTimerRef.current);
      }
      falseStartTimerRef.current = window.setTimeout(() => {
        setFalseStartNotice(false);
      }, 650);
    }
  }, [helpOpen, scheduleNextWait, stage]);

  useEffect(() => {
    if (stage !== 'running' || helpOpen) {
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (!e.repeat) {
          handleStimulusInput();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleStimulusInput, stage]);

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-6 sm:px-8 sm:py-8">
      <div>
        <button
          type="button"
          onClick={() => {
            clearAllTimers();
            onNavigate('/block/sleep_cognition');
          }}
          className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-[#8FA3C7] transition-colors duration-150 hover:text-[#E8F0FF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4FC3F7] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back</span>
        </button>
      </div>

      {stage === 'intro' && (
        <div className="mt-4 flex flex-1 flex-col justify-center">
          <TestIntroCard
            title="Brief reaction test (PVT-inspired)"
            whatItMeasures="Sustained attention and reaction speed."
            whyItMatters="Fatigue and lack of sleep slow reactions. Astronauts on the ISS took it every 4 days."
            howLong="Demo version: 1 minute. Inspired by the 3-minute PVT-B used on the ISS; results are compared only with your own sessions of the same length."
            howOften="Every 4 days"
            steps={[
              {
                icon: Eye,
                text: 'Keep your eyes focused on the center dot.',
              },
              {
                icon: Timer,
                text: 'Wait for the millisecond counter to appear at random intervals.',
              },
              {
                icon: MousePointerClick,
                text: 'Tap anywhere on the screen or press Space as fast as you can when it appears.',
              },
            ]}
            note="Use the same device and the same way of answering (tap or Space) every time."
            actionLabel="Start test"
            onStart={startSession}
          />
        </div>
      )}

      {stage === 'running' && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Brief reaction test (PVT-inspired) area. Tap or press Space when the counter appears."
          onPointerDown={(e) => {
            e.preventDefault();
            handleStimulusInput();
          }}
          className="glass-panel mt-4 flex flex-1 flex-col items-center justify-between p-6 select-none touch-manipulation cursor-pointer focus-visible:outline-2 focus-visible:outline-[#4FC3F7] sm:p-8"
        >
          <div className="flex w-full items-center justify-between gap-3 text-xs sm:text-sm text-[#8FA3C7]">
            <span>Tap anywhere or press Space</span>
            <div className="flex items-center gap-3">
              <span className="font-mono-tabular font-medium text-[#E8F0FF]">
                {formatTimer(remainingSec)}
              </span>
              <button
                type="button"
                aria-label="Test instructions"
                title="Test instructions"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  openHelp();
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(120,180,255,0.24)] bg-[rgba(20,35,70,0.65)] text-[#8FA3C7] transition-colors hover:border-[#4FC3F7] hover:text-[#E8F0FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
              >
                <HelpCircle className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center">
            {subPhase === 'waiting' && (
              <div className="flex flex-col items-center">
                <div
                  aria-hidden="true"
                  className="h-3 w-3 rounded-full bg-[#8FA3C7]/70"
                />
                {falseStartNotice && (
                  <p className="mt-4 text-sm font-medium text-[#8FA3C7]">
                    Wait for the counter
                  </p>
                )}
              </div>
            )}

            {subPhase === 'feedback' && missedNotice && (
              <div className="glass-panel-soft border-[#8FA3C7]/50 px-10 py-6 text-center">
                <p className="text-2xl font-semibold text-[#8FA3C7]">No answer</p>
                <p className="mt-1 text-sm text-[#8FA3C7]">Counted as a lapse</p>
              </div>
            )}

            {(subPhase === 'stimulus' || (subPhase === 'feedback' && !missedNotice)) && (
              <div className="glass-panel-soft border-[#4FC3F7]/70 px-10 py-6 text-center shadow-[0_0_28px_rgba(79,195,247,0.3)]">
                <p className="font-mono-tabular text-5xl font-bold tracking-tight text-[#4FC3F7] sm:text-6xl">
                  {displayMs}
                  <span className="ml-2 text-2xl font-medium text-[#E8F0FF]">
                    ms
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="h-5" />
        </div>
      )}

      {stage === 'complete' && (
        <div className="glass-panel my-auto mx-auto w-full max-w-2xl p-7 sm:p-9">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(79,195,247,0.18)] text-[#4FC3F7] shrink-0">
              <Check className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[#E8F0FF]">
                Brief reaction test (PVT-inspired) complete
              </h1>
              <p className="mt-2 text-lg leading-relaxed text-[#8FA3C7]">
                Test complete: {recordedCount}{' '}
                {recordedCount === 1 ? 'response' : 'responses'} recorded
                {missedCount > 0 ? `, ${missedCount} without an answer` : ''}.
                Results will be compared with your personal baseline.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('/block/sleep_cognition')}
                className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[rgba(120,180,255,0.24)] bg-[rgba(10,20,46,0.58)] px-5 py-2.5 text-sm font-medium text-[#E8F0FF] transition-colors hover:border-[#4FC3F7] hover:bg-[rgba(24,43,86,0.7)] cursor-pointer"
              >
                Return to Sleep &amp; Cognition
              </button>
            </div>
          </div>
        </div>
      )}
      {helpOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Brief reaction test (PVT-inspired) instructions"
          className="fixed inset-0 z-40 flex items-center justify-center bg-[#050B1A]/80 p-4 backdrop-blur-sm overflow-y-auto"
        >
          <TestIntroCard
            title="Brief reaction test (PVT-inspired)"
            whatItMeasures="Sustained attention and reaction speed."
            whyItMatters="Fatigue and lack of sleep slow reactions. Astronauts on the ISS took it every 4 days."
            howLong="Demo version: 1 minute. Inspired by the 3-minute PVT-B used on the ISS; results are compared only with your own sessions of the same length."
            howOften="Every 4 days"
            steps={[
              {
                icon: Eye,
                text: 'Keep your eyes focused on the center dot.',
              },
              {
                icon: Timer,
                text: 'Wait for the millisecond counter to appear at random intervals.',
              },
              {
                icon: MousePointerClick,
                text: 'Tap anywhere on the screen or press Space as fast as you can when it appears.',
              },
            ]}
            note="Use the same device and the same way of answering (tap or Space) every time."
            actionLabel="Resume test"
            onStart={closeHelpAndResume}
          />
        </div>
      )}
    </section>
  );
}
