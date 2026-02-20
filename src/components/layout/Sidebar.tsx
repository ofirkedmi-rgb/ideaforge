"use client";

import { cn } from "@/lib/cn";
import { Icons } from "@/components/ui/Icons";
import { Mono } from "@/components/ui/Mono";

export interface TabDef {
  key: string;
  label: string;
  icon: React.ReactNode;
  toggle?: string;
  badge?: number;
}

interface SidebarProps {
  tabs: TabDef[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  sections: Record<string, boolean>;
  onToggleSection: (key: string) => void;
  summary: {
    revenue: number;
    ideasPer: number;
    novelty: number;
    pendingFeed: number;
    direction: string;
    bizModel: string;
  };
}

export function Sidebar({
  tabs,
  activeTab,
  onTabChange,
  sections,
  onToggleSection,
  summary,
}: SidebarProps) {
  return (
    <div className="w-[180px] shrink-0">
      <div className="sticky top-[64px]">
        {/* Tab nav */}
        {tabs.map((t) => {
          const isActive = activeTab === t.key;
          const isExcluded = t.toggle && !sections[t.toggle];

          return (
            <div key={t.key} className="flex items-center mb-[2px]">
              <button
                type="button"
                onClick={() => onTabChange(t.key)}
                className={cn(
                  "flex flex-1 items-center gap-[7px] border-0 px-[10px] py-2 text-left text-xs font-semibold cursor-pointer transition-all duration-150",
                  t.toggle ? "rounded-l-[8px]" : "rounded-[8px]",
                  isActive
                    ? "bg-active text-white"
                    : "bg-transparent text-text-secondary",
                  isExcluded && "opacity-45"
                )}
              >
                <span className={cn(!isActive && "opacity-50")}>
                  {t.icon}
                </span>
                {t.label}
                {t.badge && t.badge > 0 && (
                  <span
                    className={cn(
                      "ml-auto rounded-full px-[5px] text-[9px] font-bold",
                      isActive
                        ? "bg-white text-active"
                        : "bg-[#f59e0b] text-white"
                    )}
                  >
                    {t.badge}
                  </span>
                )}
              </button>
              {t.toggle && (
                <button
                  type="button"
                  onClick={() => onToggleSection(t.toggle!)}
                  className={cn(
                    "flex h-9 w-[26px] items-center justify-center rounded-r-[8px] border-0 cursor-pointer transition-all duration-150",
                    isActive
                      ? sections[t.toggle]
                        ? "bg-success text-white"
                        : "bg-[#6b7280] text-white"
                      : sections[t.toggle]
                        ? "bg-[#ecfdf5] text-success"
                        : "bg-[#f5f5f5] text-[#ccc]"
                  )}
                >
                  {sections[t.toggle] ? <Icons.Check /> : <Icons.X />}
                </button>
              )}
            </div>
          );
        })}

        <div className="my-[10px] h-px bg-border" />

        {/* Summary panel */}
        <div className="rounded-[8px] border border-border bg-card p-3 text-[11px]">
          {[
            ["Target", `$${summary.revenue.toLocaleString()}/mo`],
            ["Ideas", String(summary.ideasPer)],
            ["Novelty", `${summary.novelty}%`],
            ["Feed", `${summary.pendingFeed} pending`],
            ["Model", summary.bizModel],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex justify-between py-[1px] text-[#666]"
            >
              <span>{k}</span>
              <Mono size="11px">{v}</Mono>
            </div>
          ))}
          {summary.direction && (
            <div className="mt-[5px] border-t border-[#f0f0f0] pt-[5px] text-[10px] font-semibold leading-snug text-warning">
              {summary.direction.substring(0, 50)}
              {summary.direction.length > 50 ? "..." : ""}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
