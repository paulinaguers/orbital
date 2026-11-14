// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { ArrowLeft, Lock, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { Astronaut } from '../types/orbital';

interface MentalJournalPageProps {
  astronaut: Astronaut;
  onNavigate: (path: string) => void;
}

interface JournalEntry {
  id: string;
  text: string;
  createdAt: string;
  flightDay: number;
}

const STORAGE_KEY = 'orbital_private_journal_entries_v1';

function readEntriesFromStorage(): JournalEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(
      (item): item is JournalEntry =>
        typeof item?.id === 'string' &&
        typeof item?.text === 'string' &&
        typeof item?.createdAt === 'string' &&
        typeof item?.flightDay === 'number',
    );
  } catch {
    return [];
  }
}

function writeEntriesToStorage(entries: JournalEntry[]): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return true;
  } catch {
    return false;
  }
}

function formatEntryDate(isoString: string): string {
  try {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return isoString;
  }
}

export function MentalJournalPage({
  astronaut,
  onNavigate,
}: MentalJournalPageProps) {
  const [entries, setEntries] = useState<JournalEntry[]>(() =>
    readEntriesFromStorage(),
  );
  const [draft, setDraft] = useState('');
  const [storageWarning, setStorageWarning] = useState<string | null>(null);

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) {
      return;
    }

    const newEntry: JournalEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text: trimmed,
      createdAt: new Date().toISOString(),
      flightDay: astronaut.flight_day,
    };

    const nextEntries = [newEntry, ...entries];
    const ok = writeEntriesToStorage(nextEntries);
    if (!ok) {
      setStorageWarning(
        'Device storage is unavailable right now. Entry could not be saved.',
      );
      return;
    }

    setStorageWarning(null);
    setEntries(nextEntries);
    setDraft('');
  };

  const handleDeleteEntry = (entryId: string) => {
    const nextEntries = entries.filter((entry) => entry.id !== entryId);
    writeEntriesToStorage(nextEntries);
    setEntries(nextEntries);
  };

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-6 sm:px-8 sm:py-8">
      <div>
        <button
          type="button"
          onClick={() => onNavigate('/block/mental_health')}
          className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-[#8FA3C7] transition-colors duration-150 hover:text-[#E8F0FF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4FC3F7] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Mental Health</span>
        </button>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-[#E8F0FF] sm:text-3xl">
            Private journal
          </h1>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(120,180,255,0.22)] bg-[rgba(20,35,70,0.55)] px-2.5 py-1 text-xs font-medium text-[#E8F0FF]">
            <Lock className="h-3.5 w-3.5 text-[#4FC3F7]" aria-hidden="true" />
            <span>Private</span>
          </span>
        </div>
      </div>

      {/* Privacy notice */}
      <div className="glass-panel-soft mt-4 flex items-start gap-3 px-4 py-3.5 text-sm text-[#E8F0FF]">
        <Lock
          className="mt-0.5 h-4 w-4 text-[#4FC3F7] shrink-0"
          aria-hidden="true"
        />
        <p className="leading-relaxed">
          Private. Stored only on this device. Never shared with the crew, the
          flight surgeon or Earth.
        </p>
      </div>

      {/* New entry form */}
      <form
        onSubmit={handleSaveEntry}
        className="glass-panel mt-6 p-5 sm:p-6"
      >
        <label
          htmlFor="journal-textarea"
          className="block text-sm font-medium text-[#E8F0FF]"
        >
          Write a note for yourself
        </label>
        <textarea
          id="journal-textarea"
          rows={5}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="How are you feeling today?"
          className="mt-3 w-full rounded-xl border border-[rgba(120,180,255,0.22)] bg-[rgba(5,11,26,0.65)] px-4 py-3 text-base text-[#E8F0FF] placeholder-[#8FA3C7]/70 focus:border-[#4FC3F7] focus:outline-none"
        />

        {storageWarning && (
          <p className="mt-2 text-xs text-amber-300">{storageWarning}</p>
        )}

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={!draft.trim()}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#4FC3F7] px-5 py-2.5 text-sm font-semibold text-[#050B1A] shadow-[0_0_20px_rgba(79,195,247,0.3)] transition-colors duration-150 hover:bg-[#7AD6FA] disabled:cursor-not-allowed disabled:bg-[rgba(120,180,255,0.12)] disabled:text-[#8FA3C7] disabled:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
          >
            Save entry
          </button>
        </div>
      </form>

      {/* Past entries list (newest first) */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold tracking-wide text-[#8FA3C7] uppercase">
          Past entries
        </h2>

        {entries.length === 0 ? (
          <p className="glass-panel-soft mt-3 px-5 py-6 text-sm text-[#8FA3C7]">
            No entries saved on this device yet.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="glass-panel p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#8FA3C7]">
                    <span>{formatEntryDate(entry.createdAt)}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular text-[#E8F0FF]">
                      Flight day {entry.flightDay}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteEntry(entry.id)}
                    aria-label="Delete entry"
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#8FA3C7] transition-colors hover:bg-[rgba(120,180,255,0.12)] hover:text-rose-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Delete</span>
                  </button>
                </div>

                <p className="mt-3 whitespace-pre-wrap text-base leading-relaxed text-[#E8F0FF]">
                  {entry.text}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
