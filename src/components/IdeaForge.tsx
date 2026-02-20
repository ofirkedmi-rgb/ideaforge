"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Sidebar, TabDef } from "@/components/layout/Sidebar";
import { TabContent } from "@/components/layout/TabContent";
import { Icons } from "@/components/ui/Icons";

const TABS: TabDef[] = [
  { key: "run", label: "Run & Generate", icon: <Icons.Zap /> },
  { key: "verticals", label: "Verticals", icon: <Icons.Layers />, toggle: "verticals" },
  { key: "scoring", label: "Scoring & Goals", icon: <Icons.Scale />, toggle: "scoring" },
  { key: "feed", label: "Seeds & Signals", icon: <Icons.Inbox />, toggle: "feed" },
  { key: "team", label: "Creative Team", icon: <Icons.Users />, toggle: "team" },
  { key: "profile", label: "Founder Profile", icon: <Icons.User />, toggle: "profile" },
  { key: "perf", label: "Performance", icon: <Icons.BarChart /> },
];

export default function IdeaForge() {
  const [activeTab, setActiveTab] = useState("run");
  const [sections, setSections] = useState({
    profile: true,
    team: true,
    scoring: true,
    feed: true,
    verticals: true,
  });

  type SectionKey = keyof typeof sections;

  const toggleSection = (key: string) => {
    const k = key as SectionKey;
    setSections((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const excludedCount = Object.values(sections).filter((v) => !v).length;

  const tabsWithBadges = TABS.map((t) => ({
    ...t,
    badge: t.key === "feed" ? 0 : undefined,
  }));

  return (
    <div className="min-h-screen bg-bg font-sans">
      <TopBar
        templateName="Default Daily Run"
        excludedCount={excludedCount}
        onGenerate={() => {}}
        onReset={() => {}}
      />

      <div className="mx-auto flex max-w-[1100px] gap-[14px] px-5 py-[14px]">
        <Sidebar
          tabs={tabsWithBadges}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          sections={sections}
          onToggleSection={toggleSection}
          summary={{
            revenue: 5000,
            ideasPer: 15,
            novelty: 70,
            pendingFeed: 0,
            direction: "",
          }}
        />

        <TabContent>
          {activeTab === "run" && (
            <div className="rounded-[var(--radius-card)] border border-border bg-card p-8 text-center text-text-muted text-sm">
              Run & Generate tab — coming in Phase 3
            </div>
          )}
          {activeTab === "verticals" && (
            <div className="rounded-[var(--radius-card)] border border-border bg-card p-8 text-center text-text-muted text-sm">
              Verticals tab — coming in Phase 4
            </div>
          )}
          {activeTab === "scoring" && (
            <div className="rounded-[var(--radius-card)] border border-border bg-card p-8 text-center text-text-muted text-sm">
              Scoring & Goals tab — coming in Phase 5
            </div>
          )}
          {activeTab === "feed" && (
            <div className="rounded-[var(--radius-card)] border border-border bg-card p-8 text-center text-text-muted text-sm">
              Seeds & Signals tab — coming in Phase 6
            </div>
          )}
          {activeTab === "team" && (
            <div className="rounded-[var(--radius-card)] border border-border bg-card p-8 text-center text-text-muted text-sm">
              Creative Team tab — coming in Phase 7
            </div>
          )}
          {activeTab === "profile" && (
            <div className="rounded-[var(--radius-card)] border border-border bg-card p-8 text-center text-text-muted text-sm">
              Founder Profile tab — coming in Phase 8
            </div>
          )}
          {activeTab === "perf" && (
            <div className="rounded-[var(--radius-card)] border border-border bg-card p-8 text-center text-text-muted text-sm">
              <Icons.BarChart />
              <div className="mt-2 font-bold text-text">Performance Dashboard</div>
              <div className="mt-1 text-[11px]">
                KPIs, optimization suggestions, vertical performance — coming in v2.
              </div>
            </div>
          )}
        </TabContent>
      </div>
    </div>
  );
}
