"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Sidebar, TabDef } from "@/components/layout/Sidebar";
import { TabContent } from "@/components/layout/TabContent";
import { RunTab } from "@/components/tabs/RunTab";
import { VerticalsTab } from "@/components/tabs/VerticalsTab";
import { ScoringTab } from "@/components/tabs/ScoringTab";
import { FeedTab } from "@/components/tabs/FeedTab";
import { TeamTab } from "@/components/tabs/TeamTab";
import { ProfileTab } from "@/components/tabs/ProfileTab";
import { ResetConfirm } from "@/components/modals/ResetConfirm";
import { PreviewModal } from "@/components/modals/PreviewModal";
import { Icons } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { useConfig } from "@/hooks/useConfig";
import { generateClaudeMD } from "@/lib/generate-claude-md";
import { downloadFile } from "@/lib/download";

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
  const [showPreview, setShowPreview] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

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

  const handleGenerate = () => {
    const md = generateClaudeMD(config);
    downloadFile(md);
  };

  const handlePreview = () => {
    setGeneratedContent(generateClaudeMD(config));
    setShowPreview(true);
  };

  if (!loaded) return null;

  return (
    <div className="min-h-screen bg-bg font-sans">
      <TopBar
        templateName={config.activeTemplate}
        excludedCount={excludedCount}
        onGenerate={handleGenerate}
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
            <ScoringTab config={config} set={set} />
          )}
          {activeTab === "feed" && (
            <FeedTab config={config} set={set} />
          )}
          {activeTab === "team" && (
            <TeamTab config={config} set={set} />
          )}
          {activeTab === "profile" && (
            <ProfileTab config={config} set={set} />
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
          {/* Bottom Bar */}
          <div className="sticky bottom-2 flex items-center justify-between rounded-[10px] border border-border bg-card px-[14px] py-[10px] shadow-[0_-2px_12px_rgba(0,0,0,.04)]">
            <div className="flex gap-[5px]">
              <Button variant="ghost" onClick={handlePreview}>
                <Icons.Eye /> Preview
              </Button>
            </div>
            <button
              type="button"
              onClick={handleGenerate}
              className="flex cursor-pointer items-center gap-[5px] rounded-[8px] border-0 bg-active px-[18px] py-2 text-[13px] font-bold text-white hover:bg-[#333] transition-colors"
            >
              <Icons.Download /> Generate CLAUDE.md
            </button>
          </div>
        </TabContent>
      </div>

      <PreviewModal
        open={showPreview}
        content={generatedContent}
        onClose={() => setShowPreview(false)}
      />

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
