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
    : blocks.filter((b) => b.level !== 'green' && b.level !== 'not_evaluable');

  const sections: TipSection[] = [];

  for (const block of targetBlocks) {
    if (block.level === 'green' || block.level === 'not_evaluable') {
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
      if (indicator.level === 'green' || indicator.level === 'not_evaluable') {
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
  const affectedBlockCount = blocks.filter(
    (b) => b.level !== 'green' && b.level !== 'not_evaluable',
  ).length;

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
      <aside className="relative z-10 flex h-full w-full max-w-lg flex-col border-l border-[rgba(120,180,255,0.2)] bg-[rgba(11,21,51,0.84)] text-[#E8F0FF] shadow-[0_0_40px_rgba(0,0,0,0.65)] backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[rgba(120,180,255,0.16)] px-6 py-5">
          <div>
            <h2
              id="tips-drawer-title"
              className="text-xl font-semibold tracking-tight text-[#E8F0FF]"
            >
              Suggestions for today
            </h2>
            {filteredBlock && (
              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-[#8FA3C7]">
                <span>Showing tips for {filteredBlock.name}</span>
                {onShowAllBlocks && affectedBlockCount > 1 && (
                  <>
                    <span aria-hidden="true" className="text-[#8FA3C7]/50">
                      ·
                    </span>
                    <button
                      type="button"
                      onClick={onShowAllBlocks}
                      className="font-medium text-[#4FC3F7] underline decoration-[#4FC3F7]/50 underline-offset-4 hover:text-[#7DD3FC] cursor-pointer"
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
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[rgba(120,180,255,0.2)] bg-[rgba(20,35,70,0.6)] text-[#8FA3C7] transition-colors hover:border-[#4FC3F7] hover:text-[#E8F0FF] focus-visible:outline-2 focus-visible:outline-[#4FC3F7] cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
          {sections.length === 0 ? (
            <div className="glass-panel p-5 text-sm text-[#8FA3C7]">
              No active suggestions for this selection.
            </div>
          ) : (
            sections.map((section) => {
              const style = LEVEL_STYLES[section.level];
              return (
                <section
                  key={section.key}
                  className="glass-panel p-5"
                  style={{ borderColor: style.surfaceBorder }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#8FA3C7]">
                      {section.indicatorLabel}
                    </span>
                    <StatusBadge level={section.level} variant="pill" />
                  </div>

                  <h3 className="mt-2 text-lg font-semibold text-[#E8F0FF]">
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
                                ? 'border-emerald-400/40 bg-emerald-500/12 text-[#8FA3C7]'
                                : 'border-[rgba(120,180,255,0.16)] bg-[rgba(10,20,46,0.55)] text-[#E8F0FF] hover:border-[#4FC3F7]/60'
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
                                  : 'border-[rgba(120,180,255,0.3)] bg-[rgba(5,11,26,0.65)] text-transparent'
                              }`}
                            >
                              <Check className="h-3.5 w-3.5 stroke-[2.75]" />
                            </span>

                            <div className="min-w-0 flex-1">
                              <p
                                className={`text-sm leading-relaxed ${
                                  isChecked
                                    ? 'line-through text-[#8FA3C7]'
                                    : 'text-[#E8F0FF]'
                                }`}
                              >
                                <span className="font-mono-tabular mr-1.5 font-semibold text-[#8FA3C7]">
                                  {idx + 1}.
                                </span>
                                {step.text}
                              </p>

                              {step.basis === 'nasa' && (
                                <span className="mt-2 inline-block rounded-md border border-[#4FC3F7]/35 bg-[#4FC3F7]/15 px-2 py-0.5 text-[11px] font-medium text-[#7DD3FC]">
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
        <footer className="border-t border-[rgba(120,180,255,0.16)] bg-[rgba(8,15,36,0.75)] px-6 py-4 text-xs leading-relaxed text-[#8FA3C7]">
          These are general self-care tips. ORBITAL guides, it does not
          diagnose.
        </footer>
      </aside>
    </div>
  );
}
