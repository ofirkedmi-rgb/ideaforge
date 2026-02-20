"use client";

import { useState } from "react";
import type { Config, Constraint } from "@/lib/types";
import { Icons } from "@/components/ui/Icons";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { Mono } from "@/components/ui/Mono";
import { Banner } from "@/components/ui/Banner";

const BUDGET_OPTIONS = [
  { k: "zero", l: "$0 Organic" },
  { k: "low", l: "$100-500" },
  { k: "medium", l: "$500-2K" },
  { k: "high", l: "$2K+" },
] as const;

const QUICK_REVENUE = [1000, 5000, 10000, 20000];

interface ScoringTabProps {
  config: Config;
  set: <K extends keyof Config>(key: K, value: Config[K]) => void;
}

export function ScoringTab({ config, set }: ScoringTabProps) {
  const [newCon, setNewCon] = useState("");

  const criteriaSum = config.criteria.reduce((s, c) => s + c.w, 0);

  const setCriterionWeight = (k: string, w: number) => {
    set(
      "criteria",
      config.criteria.map((c) => (c.k === k ? { ...c, w } : c))
    );
  };

  const toggleConstraint = (id: string) => {
    set(
      "constraints",
      config.constraints.map((c) =>
        c.id === id ? { ...c, on: !c.on } : c
      )
    );
  };

  const deleteConstraint = (id: string) => {
    set(
      "constraints",
      config.constraints.filter((c) => c.id !== id)
    );
  };

  const addConstraint = () => {
    if (!newCon.trim()) return;
    const c: Constraint = {
      id: `c_${Date.now()}`,
      t: newCon.trim(),
      on: true,
    };
    set("constraints", [...config.constraints, c]);
    setNewCon("");
  };

  return (
    <div className="flex flex-col gap-[10px]">
      {!config.sections.scoring && <Banner />}

      {/* Revenue + Budget — 2-column grid */}
      <div className="grid grid-cols-2 gap-[10px]">
        <Card title="Revenue Target" icon={<Icons.Dollar />}>
          <div className="mb-[6px] flex items-center gap-[10px]">
            <input
              type="range"
              min={1000}
              max={50000}
              step={1000}
              value={config.revenue}
              onChange={(e) => set("revenue", Number(e.target.value))}
              className="flex-1"
              style={{ accentColor: "#1a1a1a" }}
            />
            <span className="text-[18px] font-extrabold font-mono">
              ${config.revenue.toLocaleString()}
            </span>
          </div>
          <div className="flex gap-[3px]">
            {QUICK_REVENUE.map((v) => (
              <Button
                key={v}
                active={config.revenue === v}
                onClick={() => set("revenue", v)}
                small
              >
                ${v / 1000}K
              </Button>
            ))}
          </div>
        </Card>

        <Card title="Budget" icon={<Icons.TrendUp />}>
          {BUDGET_OPTIONS.map((b) => (
            <button
              key={b.k}
              type="button"
              onClick={() => set("budget", b.k)}
              className="mb-[2px] block w-full cursor-pointer rounded-[6px] px-[10px] py-1 text-left text-xs font-semibold"
              style={{
                background: config.budget === b.k ? "#1a1a1a" : "transparent",
                color: config.budget === b.k ? "#fff" : "#555",
                border: `1px solid ${config.budget === b.k ? "#1a1a1a" : "#eee"}`,
              }}
            >
              {b.l}
            </button>
          ))}
        </Card>
      </div>

      {/* Criteria */}
      <Card
        title="Criteria"
        icon={<Icons.Scale />}
        badge={{
          text: `${criteriaSum}%`,
          bg: criteriaSum === 100 ? "#ecfdf5" : "#fef3c7",
          color: criteriaSum === 100 ? "#065f46" : "#92400e",
        }}
      >
        {criteriaSum !== 100 && (
          <div className="mb-1 text-[10px] font-semibold text-warning">
            Weights sum to {criteriaSum}% — should total 100%.
          </div>
        )}
        {config.criteria.map((c) => (
          <div key={c.k} className="flex items-center gap-2 py-1">
            <span className="flex-1 text-xs font-semibold">{c.n}</span>
            <input
              type="range"
              min={0}
              max={40}
              value={c.w}
              onChange={(e) => setCriterionWeight(c.k, Number(e.target.value))}
              className="w-[80px]"
              style={{ accentColor: "#1a1a1a" }}
            />
            <Mono>{c.w}%</Mono>
          </div>
        ))}
      </Card>

      {/* Constraints */}
      <Card title="Constraints" icon={<Icons.Ban />}>
        {config.constraints.map((c) => (
          <div key={c.id} className="flex items-center gap-[7px] py-[3px]">
            <Checkbox
              checked={c.on}
              onChange={() => toggleConstraint(c.id)}
            />
            <span
              className="flex-1 text-xs"
              style={{ color: c.on ? "#333" : "#bbb" }}
            >
              {c.t}
            </span>
            <button
              type="button"
              onClick={() => deleteConstraint(c.id)}
              className="border-0 bg-transparent text-[#ddd] cursor-pointer p-0"
            >
              <Icons.Trash />
            </button>
          </div>
        ))}
        <div className="mt-1 flex gap-[6px]">
          <input
            value={newCon}
            onChange={(e) => setNewCon(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addConstraint();
            }}
            placeholder="Add..."
            className="flex-1 rounded-[6px] border border-[#e5e5e5] px-[10px] py-[5px] text-xs outline-none"
          />
          <Button onClick={addConstraint}>
            <Icons.Plus />
          </Button>
        </div>
      </Card>
    </div>
  );
}
