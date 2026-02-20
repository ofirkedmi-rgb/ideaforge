"use client";

import { useState } from "react";
import type { Config } from "@/lib/types";
import { Icons } from "@/components/ui/Icons";

const EXAMPLE_DIRS = [
  "AI-enhanced side hustles — Amazon FBA, POD, dropshipping.",
  "Tools for aging parents managing elderly care remotely.",
  "Boring B2B workflows people hate. The uglier, the better.",
];

interface RunTabProps {
  config: Config;
  set: <K extends keyof Config>(key: K, value: Config[K]) => void;
}

export function RunTab({ config, set }: RunTabProps) {
  const [showExamples, setShowExamples] = useState(false);

  return (
    <div className="flex flex-col gap-[10px]">
      {/* Direction */}
      <div
        className="overflow-hidden rounded-[14px] bg-card"
        style={{
          border: config.direction
            ? "1.5px solid #1a1a1a"
            : "1.5px solid #e5e7eb",
        }}
      >
        <div className="px-[18px] pt-[14px]">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icons.Compass />
              <span className="text-[14px] font-extrabold">Direction</span>
              {!config.direction && (
                <span className="text-[10px] text-text-muted">Optional</span>
              )}
            </div>
            {config.direction && (
              <button
                type="button"
                onClick={() => set("direction", "")}
                className="flex items-center gap-[3px] border-0 bg-transparent text-[11px] text-[#ccc] cursor-pointer"
              >
                <Icons.X /> Clear
              </button>
            )}
          </div>
          <textarea
            value={config.direction}
            onChange={(e) => set("direction", e.target.value)}
            placeholder="What should the team focus on today?"
            rows={config.direction ? 3 : 2}
            className="box-border w-full resize-none rounded-[8px] border border-[#e8e8e8] bg-[#f8f9fb] px-3 py-[10px] font-sans text-[13px] leading-relaxed outline-none"
          />
        </div>
        <div className="px-[18px] pb-[10px] pt-[6px]">
          <button
            type="button"
            onClick={() => setShowExamples(!showExamples)}
            className="flex items-center gap-1 border-0 bg-transparent text-[11px] text-text-muted cursor-pointer"
          >
            <Icons.Lightbulb /> Examples
          </button>
          {showExamples && (
            <div className="mt-[5px] flex flex-col gap-[3px]">
              {EXAMPLE_DIRS.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => {
                    set("direction", ex);
                    setShowExamples(false);
                  }}
                  className="cursor-pointer rounded-[var(--radius-button)] border border-[#eee] bg-[#f8f9fb] px-[10px] py-[6px] text-left text-[11px] text-text-secondary"
                >
                  {ex}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
