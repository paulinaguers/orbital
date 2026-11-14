// Generated with SI assistance (Claude), reviewed by the ORBITAL team.

import { Check, X } from 'lucide-react';
import { useEffect } from 'react';
import { StatusBadge } from './StatusBadge';
import { LEVEL_STYLES } from '../data/source';
import { lookupTipForIndicator, RED_HELP_ENTRY, type TipEntry } from '../data/tips';
import type { HealthBlock, HealthLevel } from '../types/orbital';

interface TipsDrawerProps {
  open: boolean;
  blocks: HealthBlock[];
  filterBlockId: string | null;
  checkedSteps: Record<string, boolean>;
  onToggleStep: (stepKey: string) => void;
  onShowAllBlocks?: () => void;
  onClose: () => void;
}

interface TipSection {
  key: string;
  blockName: string;
  indicatorLabel: string;
  level: HealthLevel;
  tip: TipEntry;
}

function buildSections(
  blocks: HealthBlock[],
  filterBlockId: string | null,
): TipSection[] {
  const targetBlocks = filterBlockId
    ? blocks.filter((b) => b.id === filterBlockId)
    : blocks.filter((b) => b.level !== 'green');

  const sections: TipSection[] = [];

  for (const block of targetBlocks) {
    if (block.level === 'green') {
      continue;
    }

    if (block.level === 'red') {
      sections.push({
        key: `${block.id}:red`,
        blockName: block.name,
        indicatorLabel: block.name,
        level: 'red',
        tip: RED_HELP_ENTRY,
      });
      continue;
    }

    let addedForBlock = false;
    for (const indicator of block.indicators) {
      if (indicator.level === 'green') {
        continue;
      }
      const tip = lookupTipForIndicator(indicator.id, indicator.level);
      if (!tip) {
        continue;
      }
      sections.push({
        key: `${block.id}:${indicator.id}`,
        blockName: block.name,
        indicatorLabel: indicator.name,
        level: indicator.level,
        tip,
      });
      addedForBlock = true;
    }

    // Fallback if a block is red at block level without matching red indicator
    if (!addedForBlock && block.indicators.length > 0) {
      const firstTip = lookupTipForIndicator(block.indicators[0].id, block.level);
      if (firstTip) {
        sections.push({
          key: `${block.id}:${block.indicators[0].id}`,
          blockName: block.name,
          indicatorLabel: block.indicators[0].name,
          level: block.level,
          tip: firstTip,
        });
      }
    }
  }

  return sections;
}

export function TipsDrawer({
  open,
  blocks,
  filterBlockId,
  checkedSteps,
  onToggleStep,
  onShowAllBlocks,
  onClose,
}: TipsDrawerProps) {
  useEffect(() => {
    if (!open) {
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const sections = buildSections(blocks, filterBlockId);
  const filteredBlock = filterBlockId
    ? blocks.find((b) => b.id === filterBlockId)
    : null;
  const affectedBlockCount = blocks.filter((b) => b.level !== 'green').length;

  return (
    <div
      className="fixed inset-0 z-40 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tips-drawer-title"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-[2px] transition-opacity"
      />

      {/* Slide-over panel */}
      <aside className="relative z-10 flex h-full w-full max-w-lg flex-col border-l border-slate-800 bg-[#0D1526] text-slate-100 shadow-2xl shadow-black/70">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800/90 px-6 py-5">
          <div>
            <h2
              id="tips-drawer-title"
              className="text-xl font-semibold tracking-tight text-slate-50"
            >
              Suggestions for today
            </h2>
            {filteredBlock && (
              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <span>Showing tips for {filteredBlock.name}</span>
                {onShowAllBlocks && affectedBlockCount > 1 && (
                  <>
                    <span aria-hidden="true" className="text-slate-600">
                      ·
                    </span>
                    <button
                      type="button"
                      onClick={onShowAllBlocks}
                      className="font-medium text-sky-300 underline decoration-sky-500/50 underline-offset-4 hover:text-sky-200 cursor-pointer"
                    >
                      Show all ({affectedBlockCount})
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close suggestions panel"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-800/70 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-400 cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
          {sections.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-[#10192D] p-5 text-sm text-slate-300">
              No active suggestions for this selection.
            </div>
          ) : (
            sections.map((section) => {
              const style = LEVEL_STYLES[section.level];
              return (
                <section
                  key={section.key}
                  className="rounded-2xl bg-[#10192D] p-5 shadow-md shadow-black/20"
                  style={{ border: `1px solid ${style.surfaceBorder}` }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {section.indicatorLabel}
                    </span>
                    <StatusBadge level={section.level} variant="pill" />
                  </div>

                  <h3 className="mt-2 text-lg font-semibold text-slate-50">
                    {section.tip.title}
                  </h3>

                  <ol className="mt-4 space-y-2.5">
                    {section.tip.steps.map((step, idx) => {
                      const stepKey = `${section.key}:${idx}`;
                      const isChecked = Boolean(checkedSteps[stepKey]);

                      return (
                        <li key={stepKey}>
                          <label
                            className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3.5 py-3 transition-colors ${
                              isChecked
                                ? 'border-emerald-500/35 bg-emerald-500/10 text-slate-300'
                                : 'border-slate-800/90 bg-[#0A1120] text-slate-100 hover:border-slate-700'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => onToggleStep(stepKey)}
                              className="sr-only"
                            />

                            <span
                              aria-hidden="true"
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                                isChecked
                                  ? 'border-emerald-400 bg-emerald-500 text-slate-950'
                                  : 'border-slate-600 bg-slate-900 text-transparent'
                              }`}
                            >
                              <Check className="h-3.5 w-3.5 stroke-[2.75]" />
                            </span>

                            <div className="min-w-0 flex-1">
                              <p
                                className={`text-sm leading-relaxed ${
                                  isChecked
                                    ? 'line-through text-slate-400'
                                    : 'text-slate-100'
                                }`}
                              >
                                <span className="font-mono-tabular mr-1.5 font-semibold text-slate-400">
                                  {idx + 1}.
                                </span>
                                {step.text}
                              </p>

                              {step.basis === 'nasa' && (
                                <span className="mt-2 inline-block rounded-md border border-sky-400/30 bg-sky-500/12 px-2 py-0.5 text-[11px] font-medium text-sky-200">
                                  Based on NASA practice
                                </span>
                              )}
                            </div>
                          </label>
                        </li>
                      );
                    })}
                  </ol>
                </section>
              );
            })
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-800/90 bg-[#0A101E] px-6 py-4 text-xs leading-relaxed text-slate-400">
          These are general self-care tips. ORBITAL guides, it does not
          diagnose.
        </footer>
      </aside>
    </div>
  );
}
