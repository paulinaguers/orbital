// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { ArrowLeft, Check, Clock, Radio, Send, WifiOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getDemoCircleData } from '../data/source';
import type { CircleContact, CircleMessage } from '../types/orbital';

interface CirclePageProps {
  currentFlightDay: number;
  onNavigate: (path: string) => void;
}

const AVATAR_TONES: Record<string, string> = {
  maya: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/35',
  jordan: 'bg-rose-500/20 text-rose-200 border-rose-400/35',
  sam: 'bg-amber-500/20 text-amber-200 border-amber-400/35',
  ana: 'bg-teal-500/20 text-teal-200 border-teal-400/35',
};

function formatCountdown(ms: number): string {
  const totalSec = Math.max(0, Math.ceil(ms / 1000));
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function getCurrentUtcTimestamp(): string {
  const now = new Date();
  const hh = now.getUTCHours().toString().padStart(2, '0');
  const mm = now.getUTCMinutes().toString().padStart(2, '0');
  return `${hh}:${mm} UTC`;
}

export function CirclePage({ currentFlightDay, onNavigate }: CirclePageProps) {
  const initialData = getDemoCircleData();
  const [link] = useState(initialData.link);
  const [contacts, setContacts] = useState<CircleContact[]>(() =>
    initialData.contacts.map((c, idx) => ({
      ...c,
      unread: idx === 0 ? false : c.unread,
      messages: [...c.messages],
    })),
  );
  const [selectedId, setSelectedId] = useState<string>(
    initialData.contacts[0]?.id ?? 'maya',
  );
  const [draft, setDraft] = useState('');

  const targetMs = Date.parse(link.next_window_utc);
  const [remainingMs, setRemainingMs] = useState<number>(() =>
    Math.max(0, targetMs - Date.now()),
  );

  const threadEndRef = useRef<HTMLDivElement | null>(null);

  const isConnected = remainingMs <= 0 || link.status === 'connected';

  useEffect(() => {
    const timer = window.setInterval(() => {
      const nextRemaining = Math.max(0, targetMs - Date.now());
      setRemainingMs(nextRemaining);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetMs]);

  // Automatically transition any queued messages to sent when the window opens
  useEffect(() => {
    if (!isConnected) {
      return;
    }

    setContacts((prev) => {
      let changed = false;
      const next = prev.map((contact) => {
        const hasQueued = contact.messages.some(
          (m) => m.deliveryStatus === 'queued',
        );
        if (!hasQueued) {
          return contact;
        }
        changed = true;
        return {
          ...contact,
          messages: contact.messages.map((m) =>
            m.deliveryStatus === 'queued'
              ? { ...m, deliveryStatus: 'sent' as const }
              : m,
          ),
        };
      });
      return changed ? next : prev;
    });
  }, [isConnected]);

  const selectedContact =
    contacts.find((c) => c.id === selectedId) ?? contacts[0];

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [selectedContact?.id, selectedContact?.messages.length]);

  const handleSelectContact = (contactId: string) => {
    setSelectedId(contactId);
    setContacts((prev) =>
      prev.map((c) => (c.id === contactId ? { ...c, unread: false } : c)),
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed || !selectedContact) {
      return;
    }

    const newMsg: CircleMessage = {
      id: `msg-${Date.now()}`,
      sender: 'astronaut',
      text: trimmed,
      timestamp: getCurrentUtcTimestamp(),
      flight_day: currentFlightDay,
      deliveryStatus: isConnected ? 'sent' : 'queued',
    };

    setContacts((prev) =>
      prev.map((c) =>
        c.id === selectedContact.id
          ? { ...c, messages: [...c.messages, newMsg] }
          : c,
      ),
    );
    setDraft('');
  };

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-6 sm:px-8 sm:py-8">
      {/* Header & Back link */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <button
            type="button"
            onClick={() => onNavigate('/body')}
            className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors duration-150 hover:text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Body map</span>
          </button>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              My Circle
            </h1>
            <span className="rounded-md border border-slate-700/80 bg-slate-800/75 px-2.5 py-0.5 text-xs font-medium text-slate-300">
              Simulated messages
            </span>
          </div>
        </div>
      </div>

      {/* Top Communication Link Status Banner */}
      <div
        className={`mt-5 rounded-2xl border px-5 py-4 ${
          isConnected
            ? 'border-emerald-500/40 bg-emerald-500/10'
            : 'border-slate-700/90 bg-[#10192D]'
        }`}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl shrink-0 ${
                isConnected
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              {isConnected ? (
                <Radio className="h-4 w-4" aria-hidden="true" />
              ) : (
                <WifiOff className="h-4 w-4" aria-hidden="true" />
              )}
            </span>

            <div>
              {!isConnected ? (
                <>
                  <p className="text-sm font-semibold text-slate-100 sm:text-base">
                    No connection with Earth right now. Next communication
                    window in{' '}
                    <span className="font-mono-tabular text-sky-300">
                      {formatCountdown(remainingMs)}
                    </span>
                    .
                  </p>
                  <p className="mt-0.5 text-xs sm:text-sm text-slate-300">
                    Messages will be sent automatically when the window opens.
                  </p>
                </>
              ) : (
                <p className="text-sm font-semibold text-emerald-200 sm:text-base">
                  Connected – window open for {link.window_duration_min} min
                </p>
              )}
            </div>
          </div>

          <p className="font-mono-tabular text-xs font-medium text-slate-300 sm:text-right shrink-0">
            Signal delay: ~{link.one_way_delay_min} min each way.
          </p>
        </div>
      </div>

      {/* Two-pane Messenger */}
      <div className="mt-6 grid flex-1 grid-cols-1 gap-5 lg:grid-cols-[320px_1fr]">
        {/* Left: Contact list */}
        <aside
          aria-label="Contacts on Earth"
          className="rounded-2xl border border-slate-800/90 bg-[#10192D] p-3 shadow-lg shadow-black/20"
        >
          <ul className="space-y-1.5">
            {contacts.map((contact) => {
              const isSelected = contact.id === selectedContact?.id;
              const lastMsg = contact.messages[contact.messages.length - 1];
              const avatarTone =
                AVATAR_TONES[contact.id] ??
                'bg-slate-700 text-slate-100 border-slate-600';

              return (
                <li key={contact.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectContact(contact.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
                      isSelected
                        ? 'bg-slate-800/90 border border-slate-700'
                        : 'border border-transparent hover:bg-slate-800/45'
                    }`}
                  >
                    <div
                      aria-hidden="true"
                      className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold shrink-0 ${avatarTone}`}
                    >
                      {contact.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-semibold text-slate-100">
                          {contact.name}
                        </span>
                        {contact.unread && (
                          <span
                            aria-label="Unread messages"
                            className="inline-block h-2.5 w-2.5 rounded-full bg-sky-400 shrink-0"
                          />
                        )}
                      </div>
                      <p className="text-xs text-slate-400">
                        {contact.relationship}
                      </p>
                      {lastMsg && (
                        <p className="mt-1 truncate text-xs text-slate-300">
                          {lastMsg.sender === 'astronaut' ? 'You: ' : ''}
                          {lastMsg.text}
                        </p>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Right: Chat window */}
        {selectedContact && (
          <div className="flex min-h-[460px] flex-col rounded-2xl border border-slate-800/90 bg-[#10192D] shadow-lg shadow-black/20">
            {/* Chat Header */}
            <div className="flex items-center gap-3 border-b border-slate-800/80 px-5 py-4">
              <div
                aria-hidden="true"
                className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold shrink-0 ${
                  AVATAR_TONES[selectedContact.id] ??
                  'bg-slate-700 text-slate-100 border-slate-600'
                }`}
              >
                {selectedContact.initials}
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-50">
                  {selectedContact.name}
                </h2>
                <p className="text-xs text-slate-400">
                  {selectedContact.relationship}
                </p>
              </div>
            </div>

            {/* Messages list */}
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 max-h-[420px]">
              {selectedContact.messages.map((msg) => {
                const isOwn = msg.sender === 'astronaut';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      isOwn ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:text-[15px] ${
                        isOwn
                          ? 'rounded-br-md bg-sky-500/20 border border-sky-400/35 text-slate-50'
                          : 'rounded-bl-md bg-[#162238] border border-slate-700/70 text-slate-100'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-2 px-1 text-[11px] text-slate-400">
                      <span className="font-mono-tabular">
                        Flight day {msg.flight_day} · {msg.timestamp}
                      </span>

                      {isOwn && msg.deliveryStatus === 'queued' && (
                        <span className="inline-flex items-center gap-1 text-amber-300">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          <span>Queued – will send in next window</span>
                        </span>
                      )}

                      {isOwn && msg.deliveryStatus === 'sent' && (
                        <span className="inline-flex items-center gap-1 text-emerald-300">
                          <Check className="h-3 w-3" aria-hidden="true" />
                          <span>
                            Sent · arrives in ~{link.one_way_delay_min} min
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={threadEndRef} />
            </div>

            {/* Composer */}
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-3 border-t border-slate-800/80 px-4 py-3.5 sm:px-5"
            >
              <label htmlFor="circle-message-input" className="sr-only">
                Message {selectedContact.name}
              </label>
              <input
                id="circle-message-input"
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={`Write a message to ${selectedContact.name}...`}
                className="min-h-[44px] flex-1 rounded-xl border border-slate-700/80 bg-[#09101E] px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:outline-none sm:text-base"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors duration-150 hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 cursor-pointer shrink-0"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                <span>Send</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Bottom privacy & simulation note */}
      <footer className="mt-8 border-t border-slate-800/70 pt-4 text-center text-xs leading-relaxed text-slate-400">
        Simulated contacts and messages. Personal messages are not health data
        and are never analyzed.
      </footer>
    </section>
  );
}
