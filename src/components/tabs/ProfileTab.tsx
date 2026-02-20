"use client";

import { useState } from "react";
import type { Config } from "@/lib/types";
import { Icons } from "@/components/ui/Icons";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Banner } from "@/components/ui/Banner";

const TIME_OPTIONS = ["2 hrs/week", "1 day/week", "2 days/week", "Full-time"];

interface ProfileTabProps {
  config: Config;
  set: <K extends keyof Config>(key: K, value: Config[K]) => void;
}

export function ProfileTab({ config, set }: ProfileTabProps) {
  const [newSkill, setNewSkill] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addSkill = () => {
    if (!newSkill.trim()) return;
    set("skills", [...config.skills, newSkill.trim()]);
    setNewSkill("");
  };

  const removeSkill = (s: string) => {
    set(
      "skills",
      config.skills.filter((x) => x !== s)
    );
  };

  const addFilter = () => {
    if (!newFilter.trim()) return;
    set("filters", [...config.filters, newFilter.trim()]);
    setNewFilter("");
  };

  const removeFilter = (f: string) => {
    set(
      "filters",
      config.filters.filter((x) => x !== f)
    );
  };

  return (
    <div className="flex flex-col gap-[10px]">
      {!config.sections.profile && (
        <Banner message="Excluded — no operator constraints." />
      )}

      {/* Background */}
      <Card title="Background" icon={<Icons.User />}>
        <div className="mb-[6px] grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-semibold text-text-muted">
              Name
            </label>
            <input
              value={config.founderName}
              onChange={(e) => set("founderName", e.target.value)}
              className="box-border w-full rounded-[6px] border border-[#e5e5e5] px-[9px] py-[6px] text-xs outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold text-text-muted">
              Role
            </label>
            <input
              value={config.founderRole}
              onChange={(e) => set("founderRole", e.target.value)}
              className="box-border w-full rounded-[6px] border border-[#e5e5e5] px-[9px] py-[6px] text-xs outline-none"
            />
          </div>
        </div>
        <label className="text-[10px] font-semibold text-text-muted">
          Time
        </label>
        <div className="mt-[2px] flex gap-[3px]">
          {TIME_OPTIONS.map((t) => (
            <Button
              key={t}
              active={config.founderTime === t}
              onClick={() => set("founderTime", t)}
              small
            >
              {t}
            </Button>
          ))}
        </div>
      </Card>

      {/* Skills */}
      <Card
        title="Skills"
        icon={<Icons.Award />}
        badge={{ text: `${config.skills.length}` }}
        defaultCollapsed
      >
        <div className="mb-[6px] flex flex-wrap gap-1">
          {config.skills.map((s) => (
            <Pill
              key={s}
              text={s}
              color="#2563eb"
              onRemove={() => removeSkill(s)}
            />
          ))}
        </div>
        <div className="flex gap-[5px]">
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addSkill();
            }}
            placeholder="Add..."
            className="flex-1 rounded-[6px] border border-[#e5e5e5] px-[9px] py-[5px] text-[11px] outline-none"
          />
          <Button onClick={addSkill} small>
            <Icons.Plus />
          </Button>
        </div>
      </Card>

      {/* Hard Filters */}
      <Card
        title="Hard Filters"
        icon={<Icons.Ban />}
        badge={{ text: `${config.filters.length}`, bg: "#fef2f2", color: "#dc2626" }}
        defaultCollapsed
      >
        <div className="mb-[6px] flex flex-wrap gap-1">
          {config.filters.map((f) => (
            <Pill
              key={f}
              text={f}
              color="#dc2626"
              onRemove={() => removeFilter(f)}
            />
          ))}
        </div>
        <div className="flex gap-[5px]">
          <input
            value={newFilter}
            onChange={(e) => setNewFilter(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addFilter();
            }}
            placeholder="Add..."
            className="flex-1 rounded-[6px] border border-[#e5e5e5] px-[9px] py-[5px] text-[11px] outline-none"
          />
          <Button onClick={addFilter} small>
            <Icons.Plus />
          </Button>
        </div>
      </Card>
    </div>
  );
}
