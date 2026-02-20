"use client";

import { useState } from "react";
import type { Config, Principle, BizType, BizTeam, BizAI, BizTouch, BizInvest } from "@/lib/types";
import { Icons } from "@/components/ui/Icons";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";

const EXAMPLE_DIRS = [
  "AI-enhanced side hustles — Amazon FBA, POD, dropshipping.",
  "Tools for aging parents managing elderly care remotely.",
  "Boring B2B workflows people hate. The uglier, the better.",
];

interface BizPreset {
  k: string;
  l: string;
  emoji: string;
  config: { type: BizType; team: BizTeam; ai: BizAI; touch: BizTouch; invest: BizInvest } | null;
}

const BIZ_PRESETS: BizPreset[] = [
  { k: "ai_solo", l: "AI Solopreneur", emoji: "\u{1F916}", config: { type: "digital", team: "solo_ai", ai: "native", touch: "self_serve", invest: "bootstrap" } },
  { k: "side_hustle", l: "Side Hustle", emoji: "\u{1F4B0}", config: { type: "hybrid", team: "solo_ai", ai: "enhanced", touch: "low", invest: "light" } },
  { k: "ecommerce", l: "E-Commerce", emoji: "\u{1F4E6}", config: { type: "physical", team: "solo_ai", ai: "enhanced", touch: "low", invest: "moderate" } },
  { k: "agency", l: "AI Agency", emoji: "\u{1F3E2}", config: { type: "digital", team: "small", ai: "enhanced", touch: "medium", invest: "light" } },
  { k: "custom", l: "Custom", emoji: "\u{2699}\u{FE0F}", config: null },
];

const TYPE_LABELS: Record<BizType, string> = { digital: "Digital", physical: "Physical", hybrid: "Hybrid", service: "Service" };
const TEAM_LABELS: Record<BizTeam, string> = { solo: "Solo", solo_ai: "Solo+AI", small: "2-3 ppl", flex: "Any" };
const AI_LABELS: Record<BizAI, string> = { native: "AI-native", enhanced: "AI-enhanced", optional: "AI-optional", none: "Any" };

const BIZ_ROWS: { label: string; key: "bizType" | "bizTeam" | "bizAI" | "bizTouch" | "bizInvest"; opts: [string, string][] }[] = [
  { label: "TYPE", key: "bizType", opts: [["digital", "\u{1F4BB} Digital"], ["physical", "\u{1F4E6} Physical"], ["hybrid", "\u{1F504} Hybrid"], ["service", "\u{1F91D} Service"]] },
  { label: "TEAM", key: "bizTeam", opts: [["solo", "\u{1F464} Solo"], ["solo_ai", "\u{1F916} Solo+AI"], ["small", "\u{1F465} 2-3"], ["flex", "\u{1F513} Any"]] },
  { label: "AI", key: "bizAI", opts: [["native", "\u{1F9E0} 95%+"], ["enhanced", "\u{26A1} Enhanced"], ["optional", "\u{1F527} Optional"], ["none", "\u{1F513} Any"]] },
  { label: "TOUCH", key: "bizTouch", opts: [["self_serve", "\u{1F5A5} Self-serve"], ["low", "\u{2709}\u{FE0F} Low"], ["medium", "\u{1F4DE} Medium"], ["high", "\u{1F91D} High"]] },
  { label: "INVEST", key: "bizInvest", opts: [["bootstrap", "\u{1FA99} <$500"], ["light", "\u{1F4B5} $500-5K"], ["moderate", "\u{1F4B0} $5K-25K"], ["flex", "\u{1F513} Any"]] },
];

interface RunTabProps {
  config: Config;
  set: <K extends keyof Config>(key: K, value: Config[K]) => void;
}

export function RunTab({ config, set }: RunTabProps) {
  const [showExamples, setShowExamples] = useState(false);
  const [newPrinciple, setNewPrinciple] = useState("");
  const [showBizDetails, setShowBizDetails] = useState(false);

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

  const applyPreset = (k: string) => {
    set("bizPreset", k);
    const preset = BIZ_PRESETS.find((b) => b.k === k);
    if (preset?.config) {
      set("bizType", preset.config.type);
      set("bizTeam", preset.config.team);
      set("bizAI", preset.config.ai);
      set("bizTouch", preset.config.touch);
      set("bizInvest", preset.config.invest);
      setShowBizDetails(false);
    } else {
      setShowBizDetails(true);
    }
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

      {/* Business Model */}
      <Card
        title="Business Model"
        icon={<Icons.Box />}
        badge={{ text: BIZ_PRESETS.find((p) => p.k === config.bizPreset)?.l || "Custom" }}
      >
        <div className="mb-2 flex flex-wrap gap-[5px]">
          {BIZ_PRESETS.map((p) => (
            <button
              key={p.k}
              type="button"
              onClick={() => applyPreset(p.k)}
              className="cursor-pointer rounded-[8px] text-[11px] font-bold px-3 py-[6px]"
              style={{
                background: config.bizPreset === p.k ? "#1a1a1a" : "#fafafa",
                color: config.bizPreset === p.k ? "#fff" : "#333",
                border: `1.5px solid ${config.bizPreset === p.k ? "#1a1a1a" : "#e8e8e8"}`,
              }}
            >
              {p.emoji} {p.l}
            </button>
          ))}
        </div>

        {/* Summary pills (when not showing details) */}
        {!showBizDetails && config.bizPreset !== "custom" && (
          <div className="mt-[6px] flex flex-wrap items-center gap-1">
            <Pill text={TYPE_LABELS[config.bizType]} color="#2563eb" />
            <Pill text={TEAM_LABELS[config.bizTeam]} color="#7c3aed" />
            <Pill text={AI_LABELS[config.bizAI]} color="#059669" />
            <button
              type="button"
              onClick={() => setShowBizDetails(true)}
              className="border-0 bg-transparent text-[10px] text-text-muted underline cursor-pointer"
            >
              customize
            </button>
          </div>
        )}

        {/* Detail controls */}
        {showBizDetails && (
          <div className="flex flex-col gap-[6px]">
            {BIZ_ROWS.map((row) => (
              <div key={row.label}>
                <div className="mb-[3px] text-[9px] font-bold text-text-muted">
                  {row.label}
                </div>
                <div className="flex gap-[3px]">
                  {row.opts.map(([k, l]) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => {
                        set(row.key, k as never);
                        set("bizPreset", "custom");
                      }}
                      className="cursor-pointer rounded-[6px] text-[10px] font-semibold px-2 py-[3px]"
                      style={{
                        background: config[row.key] === k ? "#1a1a1a" : "#fafafa",
                        color: config[row.key] === k ? "#fff" : "#555",
                        border: `1px solid ${config[row.key] === k ? "#1a1a1a" : "#e8e8e8"}`,
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
