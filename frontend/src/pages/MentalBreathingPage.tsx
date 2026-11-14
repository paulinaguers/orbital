// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { ArrowLeft, Pause, Play, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface MentalBreathingPageProps {
  onNavigate: (path: string) => void;
}

const INHALE_SEC = 4;
const HOLD_SEC = 4;
const EXHALE_SEC = 6;
const CYCLE_SEC = INHALE_SEC + HOLD_SEC + EXHALE_SEC;

const DURATIONS = [1, 3, 5] as const;

type PhaseInfo = {
  label: 'Breathe in' | 'Hold' | 'Breathe out';
  scale: number;
  phaseRemainingSec: number;
};

function getPhaseAtTime(elapsedSec: number): PhaseInfo {
  const t = elapsedSec % CYCLE_SEC;

  if (t < INHALE_SEC) {
    const progress = t / INHALE_SEC;
    return {
      label: 'Breathe in',
      scale: 0.62 + 0.38 * progress,
      phaseRemainingSec: Math.ceil(INHALE_SEC - t),
    };
  }

  if (t < INHALE_SEC + HOLD_SEC) {
    return {
      label: 'Hold',
      scale: 1,
      phaseRemainingSec: Math.ceil(INHALE_SEC + HOLD_SEC - t),
    };
  }

  const exhaleElapsed = t - (INHALE_SEC + HOLD_SEC);
  const progress = exhaleElapsed / EXHALE_SEC;
  return {
    label: 'Breathe out',
    scale: 1 - 0.38 * progress,
    phaseRemainingSec: Math.ceil(EXHALE_SEC - exhaleElapsed),
  };
}

function formatClock(totalSeconds: number): string {
  const clamped = Math.max(0, Math.ceil(totalSeconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function MentalBreathingPage({ onNavigate }: MentalBreathingPageProps) {
  const [durationMinutes, setDurationMinutes] = useState<1 | 3 | 5>(3);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);

  const lastTickRef = useRef<number | null>(null);
  const totalSec = durationMinutes * 60;

  useEffect(() => {
    if (!running) {
      lastTickRef.current = null;
      return;
    }

    let frameId = 0;

    const tick = (now: number) => {
      if (lastTickRef.current === null) {
        lastTickRef.current = now;
      }
      const deltaSec = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;

      setElapsedSec((prev) => {
        const next = prev + deltaSec;
        if (next >= totalSec) {
          setRunning(false);
          setCompleted(true);
          return totalSec;
        }
        return next;
      });

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [running, totalSec]);

  const handleSelectDuration = (mins: 1 | 3 | 5) => {
    setRunning(false);
    setCompleted(false);
    setElapsedSec(0);
    setDurationMinutes(mins);
  };

  const handleStart = () => {
    if (completed) {
      setElapsedSec(0);
      setCompleted(false);
    }
    setRunning(true);
  };

  const handlePause = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setRunning(false);
    setCompleted(false);
    setElapsedSec(0);
  };

  const remainingSec = Math.max(0, totalSec - elapsedSec);
  const phase = getPhaseAtTime(elapsedSec);

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-between px-5 py-6 sm:px-8 sm:py-8">
      {/* Top Bar Back Link & Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => onNavigate('/block/mental_health')}
            className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-[#8FA3C7] transition-colors duration-150 hover:text-[#E8F0FF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4FC3F7] cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Mental Health</span>
          </button>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#E8F0FF] sm:text-3xl">
            Breathing exercise
          </h1>
          <p className="mt-1 text-sm text-[#8FA3C7]">
            Rhythm: breathe in 4 s · hold 4 s · breathe out 6 s
          </p>
        </div>

        {/* Duration Selector */}
        <div
          role="group"
          aria-label="Exercise duration"
          className="glass-panel-soft flex items-center gap-1 p-1"
        >
          {DURATIONS.map((mins) => {
            const active = durationMinutes === mins;
            return (
              <button
                key={mins}
                type="button"
                onClick={() => handleSelectDuration(mins)}
                className={`min-h-[38px] rounded-xl px-3.5 py-1.5 text-sm font-medium transition-colors duration-150 cursor-pointer ${
                  active
                    ? 'glass-nav-active text-[#E8F0FF]'
                    : 'text-[#8FA3C7] hover:text-[#E8F0FF]'
                }`}
              >
                {mins} min
              </button>
            );
          })}
        </div>
      </div>

      {/* Centered Calm Breathing Circle */}
      <div className="my-8 flex flex-col items-center justify-center text-center">
        <div className="relative flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
          {/* Outer guide ring */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-[rgba(120,180,255,0.22)] bg-[rgba(20,35,70,0.22)] backdrop-blur-[8px]"
          />

          {/* Expanding / holding / contracting circle */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#4FC3F7]/15 border-2 border-[#4FC3F7]/60 shadow-[0_0_32px_rgba(79,195,247,0.22)] transition-opacity duration-300"
            style={{
              transform: `scale(${completed ? 0.85 : running || elapsedSec > 0 ? phase.scale : 0.72})`,
            }}
          />

          {/* Center label */}
          <div className="relative z-10 px-4">
            {completed ? (
              <>
                <p className="text-2xl font-semibold text-[#E8F0FF] sm:text-3xl">
                  Well done
                </p>
                <p className="mt-1.5 text-sm text-[#8FA3C7]">
                  {durationMinutes}-minute session complete
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl font-semibold text-[#E8F0FF] sm:text-3xl">
                  {running || elapsedSec > 0 ? phase.label : 'Ready'}
                </p>
                <p className="font-mono-tabular mt-2 text-lg text-[#4FC3F7]">
                  {running || elapsedSec > 0
                    ? `${phase.phaseRemainingSec} s`
                    : `${formatClock(totalSec)}`}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Remaining time & Start / Pause controls */}
        <p className="font-mono-tabular mt-5 text-sm text-[#8FA3C7]">
          Remaining: {formatClock(remainingSec)}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {!running ? (
            <button
              type="button"
              onClick={handleStart}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[#4FC3F7] px-6 py-3 text-base font-semibold text-[#050B1A] shadow-[0_0_20px_rgba(79,195,247,0.3)] transition-colors duration-150 hover:bg-[#7AD6FA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              <span>
                {completed
                  ? 'Practice again'
                  : elapsedSec > 0
                    ? 'Resume'
                    : 'Start'}
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePause}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-[rgba(120,180,255,0.28)] bg-[rgba(20,35,70,0.68)] px-6 py-3 text-base font-semibold text-[#E8F0FF] backdrop-blur-[14px] transition-colors duration-150 hover:border-[#4FC3F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
            >
              <Pause className="h-4 w-4" aria-hidden="true" />
              <span>Pause</span>
            </button>
          )}

          {(elapsedSec > 0 || completed) && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-[rgba(120,180,255,0.2)] bg-[rgba(10,20,46,0.56)] px-4 py-3 text-sm font-medium text-[#8FA3C7] transition-colors duration-150 hover:border-[#4FC3F7]/60 hover:text-[#E8F0FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Small grey disclaimer note */}
      <p className="border-t border-[rgba(120,180,255,0.14)] pt-4 text-center text-xs leading-relaxed text-[#8FA3C7]">
        A relaxation exercise. It does not replace support from your flight
        surgeon or the psychological support team.
      </p>
    </section>
  );
}
