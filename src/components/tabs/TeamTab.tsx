"use client";

import type { Config } from "@/lib/types";
import { Icons } from "@/components/ui/Icons";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Mono } from "@/components/ui/Mono";
import { Banner } from "@/components/ui/Banner";

const CATMETA: Record<
  string,
  { l: string; bg: string; c: string }
> = {
  serial: { l: "SERIAL", bg: "#fef3c7", c: "#92400e" },
  creative: { l: "CREATIVE", bg: "#ede9fe", c: "#5b21b6" },
  operator: { l: "OPERATORS", bg: "#ecfdf5", c: "#065f46" },
  gtm: { l: "GTM", bg: "#fce7f3", c: "#9d174d" },
  futurist: { l: "FUTURIST", bg: "#e0f2fe", c: "#075985" },
};

interface TeamTabProps {
  config: Config;
  set: <K extends keyof Config>(key: K, value: Config[K]) => void;
}

export function TeamTab({ config, set }: TeamTabProps) {
  const activeFounders = config.founders.filter((f) => f.on).length;
  const activeAdvisors = config.advisors.filter((a) => a.on).length;

  const toggleFounder = (id: string) => {
    set(
      "founders",
      config.founders.map((f) => (f.id === id ? { ...f, on: !f.on } : f))
    );
  };

  const toggleAdvisor = (id: string) => {
    set(
      "advisors",
      config.advisors.map((a) => (a.id === id ? { ...a, on: !a.on } : a))
    );
  };

  const setAdvisorWeight = (id: string, w: number) => {
    set(
      "advisors",
      config.advisors.map((a) => (a.id === id ? { ...a, w } : a))
    );
  };

  return (
    <div className="flex flex-col gap-[10px]">
      {!config.sections.team && (
        <Banner message="Excluded — simplified generation without personas." />
      )}

      {/* Founders */}
      <Card
        title="Founders"
        icon={<Icons.Users />}
        badge={{ text: `${activeFounders}/13` }}
      >
        {Object.entries(CATMETA).map(([cat, m]) => {
          const catFounders = config.founders.filter((f) => f.cat === cat);
          if (catFounders.length === 0) return null;
          return (
            <div key={cat} className="mb-[5px]">
              <span
                className="inline-block rounded-full px-[6px] py-[1px] text-[9px] font-bold"
                style={{ background: m.bg, color: m.c }}
              >
                {m.l}
              </span>
              {catFounders.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center gap-[7px] py-1"
                  style={{ opacity: f.on ? 1 : 0.4 }}
                >
                  <Checkbox
                    checked={f.on}
                    onChange={() => toggleFounder(f.id)}
                    color={m.c}
                  />
                  <span className="min-w-[95px] text-xs font-bold">
                    {f.name}
                  </span>
                  <span className="text-[10px] text-[#bbb]">{f.power}</span>
                </div>
              ))}
            </div>
          );
        })}
      </Card>

      {/* Advisors */}
      <Card
        title="Advisors"
        icon={<Icons.Scale />}
        badge={{ text: `${activeAdvisors}/7` }}
      >
        {config.advisors.map((a) => (
          <div
            key={a.id}
            className="flex items-center gap-[7px] py-1"
            style={{ opacity: a.on ? 1 : 0.4 }}
          >
            <Checkbox
              checked={a.on}
              onChange={() => toggleAdvisor(a.id)}
              color={a.c}
            />
            <span className="min-w-[75px] text-xs font-bold">{a.name}</span>
            {a.veto && (
              <span className="rounded-[3px] bg-[#fef2f2] px-1 py-[1px] text-[8px] font-bold text-error">
                VETO
              </span>
            )}
            <span className="flex-1 text-[11px] text-text-muted">
              {a.focus}
            </span>
            <input
              type="range"
              min={0.5}
              max={2.0}
              step={0.1}
              value={a.w}
              onChange={(e) =>
                setAdvisorWeight(a.id, Number(e.target.value))
              }
              className="w-[50px]"
              style={{ accentColor: a.c }}
            />
            <Mono color={a.c}>{a.w}x</Mono>
          </div>
        ))}
      </Card>
    </div>
  );
}
