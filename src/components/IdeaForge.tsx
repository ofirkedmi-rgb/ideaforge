"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Sidebar, TabDef } from "@/components/layout/Sidebar";
import { TabContent } from "@/components/layout/TabContent";
import { RunTab } from "@/components/tabs/RunTab";
import { VerticalsTab } from "@/components/tabs/VerticalsTab";
import { ResetConfirm } from "@/components/modals/ResetConfirm";
import { Icons } from "@/components/ui/Icons";
import { useConfig } from "@/hooks/useConfig";

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
  const { config, set, resetToDefaults, loaded } = useConfig();
  const [activeTab, setActiveTab] = useState("run");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const toggleSection = (key: string) => {
    const k = key as keyof typeof config.sections;
    set("sections", { ...config.sections, [k]: !config.sections[k] });
  };

  const excludedCount = Object.values(config.sections).filter((v) => !v).length;
  const pendingFeed = config.feed.filter((f) => f.status === "pending").length;

  const tabsWithBadges = TABS.map((t) => ({
    ...t,
    badge: t.key === "feed" ? pendingFeed : undefined,
  }));

  if (!loaded) return null;

  return (
    <div className="min-h-screen bg-bg font-sans">
      <TopBar
        templateName={config.activeTemplate}
        excludedCount={excludedCount}
        onGenerate={() => {}}
        onReset={() => setShowResetConfirm(true)}
      />

      <div className="mx-auto flex max-w-[1100px] gap-[14px] px-5 py-[14px]">
        <Sidebar
          tabs={tabsWithBadges}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          sections={{ ...config.sections }}
          onToggleSection={toggleSection}
          summary={{
            revenue: config.revenue,
            ideasPer: config.ideasPer,
            novelty: config.novelty,
            pendingFeed,
            direction: config.direction,
          }}
        />

        <TabContent>
          {activeTab === "run" && <RunTab config={config} set={set} />}
          {activeTab === "verticals" && (
            <VerticalsTab config={config} set={set} />
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

      <ResetConfirm
        open={showResetConfirm}
        onCancel={() => setShowResetConfirm(false)}
        onConfirm={() => {
          resetToDefaults();
          setShowResetConfirm(false);
        }}
      />
    </div>
  );
}
