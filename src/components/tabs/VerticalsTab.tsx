"use client";

import { useState } from "react";
import type { Config, Vertical } from "@/lib/types";
import { Icons } from "@/components/ui/Icons";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { Mono } from "@/components/ui/Mono";
import { Banner } from "@/components/ui/Banner";

const COLORS = [
  "#2563eb",
  "#059669",
  "#7c3aed",
  "#db2777",
  "#ea580c",
  "#0891b2",
  "#64748b",
];

interface VerticalsTabProps {
  config: Config;
  set: <K extends keyof Config>(key: K, value: Config[K]) => void;
}

export function VerticalsTab({ config, set }: VerticalsTabProps) {
  const [newVert, setNewVert] = useState("");

  const totalWeight = config.verts
    .filter((v) => v.on)
    .reduce((s, v) => s + v.w, 0);

  const toggleVertical = (id: string) => {
    set(
      "verts",
      config.verts.map((v) => (v.id === id ? { ...v, on: !v.on } : v))
    );
  };

  const setWeight = (id: string, w: number) => {
    set(
      "verts",
      config.verts.map((v) => (v.id === id ? { ...v, w } : v))
    );
  };

  const toggleFocus = (name: string) => {
    set("focusMode", config.focusMode === name ? null : name);
  };

  const addVertical = () => {
    if (!newVert.trim()) return;
    const v: Vertical = {
      id: `v_${Date.now()}`,
      name: newVert.trim(),
      w: 5,
      c: COLORS[config.verts.length % COLORS.length],
      on: true,
    };
    set("verts", [...config.verts, v]);
    setNewVert("");
  };

  return (
    <div className="flex flex-col gap-[10px]">
      {/* Excluded banner */}
      {!config.sections.verticals && <Banner />}

      {/* Focus mode indicator */}
      {config.focusMode && (
        <div
          className="flex items-center justify-between rounded-[9px] px-[14px] py-2 text-xs"
          style={{
            background: `${config.verts.find((v) => v.name === config.focusMode)?.c || "#666"}10`,
            border: `1.5px solid ${config.verts.find((v) => v.name === config.focusMode)?.c || "#666"}25`,
          }}
        >
          <div className="flex items-center gap-[6px]">
            <Icons.Target />
            <b>Focus:</b>
            <span
              className="font-bold"
              style={{
                color:
                  config.verts.find((v) => v.name === config.focusMode)?.c ||
                  "#666",
              }}
            >
              {config.focusMode}
            </span>
          </div>
          <Button
            onClick={() => set("focusMode", null)}
            small
            variant="ghost"
          >
            <Icons.X /> Exit
          </Button>
        </div>
      )}

      {/* Vertical Weights */}
      <Card
        title="Vertical Weights"
        icon={<Icons.Layers />}
        badge={{
          text: `${totalWeight}%`,
          bg: totalWeight === 100 ? "#ecfdf5" : "#fef3c7",
          color: totalWeight === 100 ? "#065f46" : "#92400e",
        }}
      >
        {config.verts.map((v) => (
          <div
            key={v.id}
            className="flex items-center gap-[7px] py-[5px]"
            style={{ opacity: v.on ? 1 : 0.4 }}
          >
            <Checkbox
              checked={v.on}
              onChange={() => toggleVertical(v.id)}
              color={v.c}
            />
            <span className="min-w-[100px] text-xs font-semibold">
              {v.name}
            </span>
            {v.name !== "Wildcard" && (
              <button
                type="button"
                onClick={() => toggleFocus(v.name)}
                className="flex h-[22px] w-[22px] cursor-pointer items-center justify-center rounded-[4px]"
                style={{
                  background:
                    config.focusMode === v.name ? v.c : "transparent",
                  border: `1px solid ${config.focusMode === v.name ? v.c : "#ddd"}`,
                  color: config.focusMode === v.name ? "white" : "#ccc",
                }}
              >
                <Icons.Target />
              </button>
            )}
            <input
              type="range"
              min={0}
              max={50}
              value={v.w}
              onChange={(e) => setWeight(v.id, Number(e.target.value))}
              disabled={!v.on}
              className="flex-1"
              style={{ accentColor: v.c }}
            />
            <Mono color={v.on ? v.c : "#999"}>{v.w}%</Mono>
          </div>
        ))}

        {/* Add custom vertical */}
        <div className="mt-2 flex gap-[6px]">
          <input
            value={newVert}
            onChange={(e) => setNewVert(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addVertical();
            }}
            placeholder="Add vertical..."
            className="flex-1 rounded-[6px] border border-[#e5e5e5] px-[10px] py-[5px] text-xs outline-none"
          />
          <Button onClick={addVertical}>
            <Icons.Plus />
          </Button>
        </div>
      </Card>
    </div>
  );
}
