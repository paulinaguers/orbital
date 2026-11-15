// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import {
  ArrowLeft,
  Check,
  Clock,
  Lock,
  Radio,
  Send,
  WifiOff,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getDemoCircleData } from '../data/source';
import type {
  CircleContact,
  CircleMessage,
  UserProfile,
} from '../types/orbital';

interface CirclePageProps {
  currentFlightDay: number;
  profile: UserProfile;
  onNavigate: (path: string) => void;
}

const AVATAR_TONES: Record<string, string> = {
  maya: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/35',
  jordan: 'bg-rose-500/20 text-rose-200 border-rose-400/35',
  sam: 'bg-amber-500/20 text-amber-200 border-amber-400/35',
  ana: 'bg-teal-500/20 text-teal-200 border-teal-400/35',
  linda: 'bg-rose-500/20 text-rose-200 border-rose-400/35',
  emma: 'bg-sky-500/20 text-sky-200 border-sky-400/35',
  tom: 'bg-amber-500/20 text-amber-200 border-amber-400/35',
  concierge: 'bg-teal-500/20 text-teal-200 border-teal-400/35',
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

export function CirclePage({
  currentFlightDay,
  profile,
  onNavigate,
}: CirclePageProps) {
  const initialData = getDemoCircleData(profile);
  const [link, setLink] = useState(initialData.link);
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
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const targetMs = Date.parse(link.next_window_utc);
  const [remainingMs, setRemainingMs] = useState<number>(() =>
    Math.max(0, targetMs - Date.now()),
  );

  useEffect(() => {
    const nextData = getDemoCircleData(profile);
    setLink(nextData.link);
    setContacts(
      nextData.contacts.map((c, idx) => ({
        ...c,
        unread: idx === 0 ? false : c.unread,
        messages: [...c.messages],
      })),
    );
    setSelectedId(nextData.contacts[0]?.id ?? '');
    setDraft('');
    setPrivacyOpen(false);
    setRemainingMs(
      Math.max(0, Date.parse(nextData.link.next_window_utc) - Date.now()),
    );
  }, [profile]);

  const threadEndRef = useRef<HTMLDivElement | null>(null);
  const privacyPopoverRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (!privacyOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        privacyPopoverRef.current &&
        !privacyPopoverRef.current.contains(event.target as Node)
      ) {
        setPrivacyOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPrivacyOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [privacyOpen]);

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
            className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-[#8FA3C7] transition-colors duration-150 hover:text-[#E8F0FF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4FC3F7] cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Body map</span>
          </button>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-[#E8F0FF] sm:text-3xl">
              My Circle
            </h1>
            <span className="rounded-lg border border-[rgba(120,180,255,0.2)] bg-[rgba(20,35,70,0.65)] px-2.5 py-0.5 text-xs font-medium text-[#8FA3C7]">
              Simulated messages
            </span>
          </div>
        </div>
      </div>

      {/* Top Communication Link Status Banner */}
      <div
        className={`glass-panel mt-5 px-5 py-4 ${
          isConnected ? '' : ''
        }`}
        style={
          isConnected
            ? {
                borderColor: 'rgba(46, 204, 113, 0.45)',
                background: 'rgba(46, 204, 113, 0.12)',
              }
            : undefined
        }
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl shrink-0 ${
                isConnected
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-[rgba(10,20,46,0.65)] text-[#8FA3C7]'
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
                  <p className="text-sm font-semibold text-[#E8F0FF] sm:text-base">
                    {profile === 'passenger' ? (
                      <>
                        Next connection window in{' '}
                        <span className="font-mono-tabular text-[#4FC3F7]">
                          {formatCountdown(remainingMs)}
                        </span>
                      </>
                    ) : (
                      <>
                        No connection with Earth right now. Next communication
                        window in{' '}
                        <span className="font-mono-tabular text-[#4FC3F7]">
                          {formatCountdown(remainingMs)}
                        </span>
                        .
                      </>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs sm:text-sm text-[#8FA3C7]">
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

          <p className="font-mono-tabular text-xs font-medium text-[#8FA3C7] sm:text-right shrink-0">
            {link.one_way_delay_min <= 0
              ? 'Signal delay: under 1 second'
              : `Signal delay: ~${link.one_way_delay_min} min each way.`}
          </p>
        </div>
      </div>

      {/* Two-pane Messenger */}
      <div className="mt-6 grid flex-1 grid-cols-1 gap-5 lg:grid-cols-[320px_1fr]">
        {/* Left: Contact list */}
        <aside
          aria-label="Contacts on Earth"
          className="glass-panel p-3"
        >
          <ul className="space-y-1.5">
            {contacts.map((contact) => {
              const isSelected = contact.id === selectedContact?.id;
              const lastMsg = contact.messages[contact.messages.length - 1];
              const avatarTone =
                AVATAR_TONES[contact.id] ??
                'bg-slate-700 text-[#E8F0FF] border-slate-600';

              return (
                <li key={contact.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectContact(contact.id)}
                    className={`flex w-full items-center gap-3 rounded-[14px] px-3.5 py-3 text-left transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] ${
                      isSelected
                        ? 'glass-nav-active'
                        : 'border border-transparent hover:bg-white/5'
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
                        <span className="truncate text-sm font-semibold text-[#E8F0FF]">
                          {contact.name}
                        </span>
                        {contact.unread && (
                          <span
                            aria-label="Unread messages"
                            className="inline-block h-2.5 w-2.5 rounded-full bg-[#4FC3F7] shadow-[0_0_8px_rgba(79,195,247,0.8)] shrink-0"
                          />
                        )}
                      </div>
                      <p className="text-xs text-[#8FA3C7]">
                        {contact.relationship}
                      </p>
                      {lastMsg && (
                        <p className="mt-1 truncate text-xs text-[#E8F0FF]/80">
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
          <div className="glass-panel flex min-h-[460px] flex-col">
            {/* Chat Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(120,180,255,0.16)] px-5 py-4">
              <div className="flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold shrink-0 ${
                    AVATAR_TONES[selectedContact.id] ??
                    'bg-slate-700 text-[#E8F0FF] border-slate-600'
                  }`}
                >
                  {selectedContact.initials}
                </div>
                <div>
                  <h2 className="text-base font-semibold text-[#E8F0FF]">
                    {selectedContact.name}
                  </h2>
                  <p className="text-xs text-[#8FA3C7]">
                    {selectedContact.relationship}
                  </p>
                </div>
              </div>

              <div ref={privacyPopoverRef} className="relative">
                <button
                  type="button"
                  onClick={() => setPrivacyOpen((prev) => !prev)}
                  aria-expanded={privacyOpen}
                  aria-haspopup="dialog"
                  className="inline-flex min-h-[34px] items-center gap-1.5 rounded-xl border border-[rgba(120,180,255,0.22)] bg-[rgba(10,20,46,0.55)] px-3 py-1.5 text-xs font-medium text-[#E8F0FF] transition-colors hover:border-[#4FC3F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
                >
                  <Lock className="h-3.5 w-3.5 text-[#4FC3F7]" aria-hidden="true" />
                  <span>End-to-end encrypted</span>
                </button>

                {privacyOpen && (
                  <div
                    role="dialog"
                    aria-label="Encryption and privacy note"
                    className="glass-panel absolute right-0 mt-2 w-80 max-w-[calc(100vw-3rem)] p-4 z-30"
                    style={{ background: 'rgba(11, 21, 51, 0.92)' }}
                  >
                    <p className="text-xs leading-relaxed text-[#E8F0FF] sm:text-sm">
                      In ORBITAL&apos;s design, personal messages are end-to-end
                      encrypted: only you and your contact can read them. They
                      are never analyzed and are not part of your health data.
                    </p>
                    <p className="mt-2.5 border-t border-[rgba(120,180,255,0.16)] pt-2.5 text-[11px] leading-relaxed text-[#8FA3C7]">
                      Prototype: encryption is part of the design and is not
                      implemented in this demo.
                    </p>
                  </div>
                )}
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
                          ? 'rounded-br-md border border-[#4FC3F7]/40 bg-[#4FC3F7]/18 text-[#E8F0FF]'
                          : 'rounded-bl-md border border-[rgba(120,180,255,0.2)] bg-[rgba(10,20,46,0.62)] text-[#E8F0FF]'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-2 px-1 text-[11px] text-[#8FA3C7]">
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
                            {link.one_way_delay_min <= 0
                              ? 'Sent · arrives in under 1 second'
                              : `Sent · arrives in ~${link.one_way_delay_min} min`}
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
              className="flex items-center gap-3 border-t border-[rgba(120,180,255,0.16)] px-4 py-3.5 sm:px-5"
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
                className="min-h-[44px] min-w-0 flex-1 rounded-xl border border-[rgba(120,180,255,0.22)] bg-[rgba(5,11,26,0.65)] px-4 py-2 text-sm text-[#E8F0FF] placeholder-[#8FA3C7]/70 focus:border-[#4FC3F7] focus:outline-none sm:text-base"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#4FC3F7] px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors duration-150 hover:bg-[#7DD3FC] disabled:cursor-not-allowed disabled:bg-slate-700/70 disabled:text-[#8FA3C7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7] cursor-pointer shrink-0"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                <span>Send</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Bottom privacy & simulation note */}
      <footer className="mt-8 border-t border-[rgba(120,180,255,0.16)] pt-4 text-center text-xs leading-relaxed text-[#8FA3C7]">
        Simulated contacts and messages. Personal messages are not health data
        and are never analyzed.
      </footer>
    </section>
  );
}
