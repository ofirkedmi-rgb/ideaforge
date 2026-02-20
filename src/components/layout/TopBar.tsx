"use client";

import { Icons } from "@/components/ui/Icons";

interface TopBarProps {
  templateName: string;
  excludedCount: number;
  onGenerate: () => void;
  onReset: () => void;
}

export function TopBar({
  templateName,
  excludedCount,
  onGenerate,
  onReset,
}: TopBarProps) {
  return (
    <div className="sticky top-0 z-50 flex h-[50px] items-center justify-between border-b border-border bg-card px-5">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-[var(--radius-button)] bg-active text-white">
          <Icons.Sparkle />
        </div>
        <span className="text-[15px] font-extrabold tracking-tight">
          IdeaForge
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {excludedCount > 0 && (
          <span className="text-[10px] font-semibold text-warning">
            {excludedCount} excluded
          </span>
        )}
        <span className="text-[11px] text-text-muted">{templateName}</span>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 rounded-[var(--radius-button)] border border-border bg-transparent px-2 py-[5px] text-[11px] font-semibold text-text-secondary cursor-pointer hover:bg-[#f5f5f5] transition-colors"
        >
          <Icons.RotateCcw /> Reset
        </button>
        <button
          type="button"
          onClick={onGenerate}
          className="flex items-center gap-[5px] rounded-[8px] border-0 bg-active px-4 py-[7px] text-xs font-bold text-white cursor-pointer hover:bg-[#333] transition-colors"
        >
          <Icons.Play /> Run
        </button>
      </div>
    </div>
  );
}
