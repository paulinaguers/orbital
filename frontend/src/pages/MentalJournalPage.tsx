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
          className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors duration-150 hover:text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Mental Health</span>
        </button>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          Private journal
        </h1>
      </div>

      {/* Privacy notice */}
      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-slate-700/80 bg-[#0D1628] px-4 py-3.5 text-sm text-slate-200">
        <Lock
          className="mt-0.5 h-4 w-4 text-sky-300 shrink-0"
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
        className="mt-6 rounded-2xl border border-slate-800/90 bg-[#10192D] p-5 shadow-xl shadow-black/25 sm:p-6"
      >
        <label
          htmlFor="journal-textarea"
          className="block text-sm font-medium text-slate-200"
        >
          Write a note for yourself
        </label>
        <textarea
          id="journal-textarea"
          rows={5}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="How are you feeling today?"
          className="mt-3 w-full rounded-xl border border-slate-700/80 bg-[#09101E] px-4 py-3 text-base text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:outline-none"
        />

        {storageWarning && (
          <p className="mt-2 text-xs text-amber-300">{storageWarning}</p>
        )}

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={!draft.trim()}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors duration-150 hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 cursor-pointer"
          >
            Save entry
          </button>
        </div>
      </form>

      {/* Past entries list (newest first) */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
          Past entries
        </h2>

        {entries.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-slate-800/70 bg-[#0B1222] px-5 py-6 text-sm text-slate-400">
            No entries saved on this device yet.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="rounded-2xl border border-slate-800/90 bg-[#10192D] p-5 shadow-md shadow-black/20"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span>{formatEntryDate(entry.createdAt)}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular text-slate-300">
                      Flight day {entry.flightDay}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteEntry(entry.id)}
                    aria-label="Delete entry"
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-rose-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Delete</span>
                  </button>
                </div>

                <p className="mt-3 whitespace-pre-wrap text-base leading-relaxed text-slate-100">
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
