"use client";

import { useState } from "react";
import type { Config, Principle } from "@/lib/types";
import { Icons } from "@/components/ui/Icons";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";

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
  const [newPrinciple, setNewPrinciple] = useState("");

  const activePrinciples = config.principles.filter((p) => p.on).length;

  const togglePrinciple = (id: string) => {
    set(
      "principles",
      config.principles.map((p) =>
        p.id === id ? { ...p, on: !p.on } : p
      )
    );
  };

  const deletePrinciple = (id: string) => {
    set(
      "principles",
      config.principles.filter((p) => p.id !== id)
    );
  };

  const addPrinciple = () => {
    if (!newPrinciple.trim()) return;
    const p: Principle = {
      id: `p_${Date.now()}`,
      t: newPrinciple.trim(),
      on: true,
    };
    set("principles", [...config.principles, p]);
    setNewPrinciple("");
  };

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

      {/* Principles */}
      <Card
        title="Principles"
        icon={<Icons.Heart />}
        badge={{
          text: `${activePrinciples} active`,
          bg: "#fce7f3",
          color: "#9d174d",
        }}
      >
        <div className="mb-[6px] text-[10px] text-text-muted">
          Persistent values. These carry across every run and shape which ideas
          get generated.
        </div>
        {config.principles.map((p) => (
          <div key={p.id} className="flex items-center gap-[7px] py-1">
            <Checkbox
              checked={p.on}
              onChange={() => togglePrinciple(p.id)}
              color="#db2777"
            />
            <span
              className="flex-1 text-xs"
              style={{ color: p.on ? "#333" : "#bbb" }}
            >
              {p.t}
            </span>
            <button
              type="button"
              onClick={() => deletePrinciple(p.id)}
              className="border-0 bg-transparent text-[#ddd] cursor-pointer p-0"
            >
              <Icons.Trash />
            </button>
          </div>
        ))}
        <div className="mt-1 flex gap-[6px]">
          <input
            value={newPrinciple}
            onChange={(e) => setNewPrinciple(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addPrinciple();
            }}
            placeholder="Add a guiding principle..."
            className="flex-1 rounded-[6px] border border-[#e5e5e5] px-[10px] py-[5px] text-xs outline-none"
          />
          <Button onClick={addPrinciple} small>
            <Icons.Plus />
          </Button>
        </div>
      </Card>
    </div>
  );
}
