"use client";

import { useState } from "react";
import type { Config, FeedItem } from "@/lib/types";
import { Icons } from "@/components/ui/Icons";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Banner } from "@/components/ui/Banner";

const FEED_TYPES: Record<
  FeedItem["type"],
  { emoji: string; label: string; color: string }
> = {
  idea: { emoji: "\u{1F4A1}", label: "Idea", color: "#f59e0b" },
  signal: { emoji: "\u{1F4F0}", label: "Signal", color: "#2563eb" },
  data: { emoji: "\u{1F4CA}", label: "Data", color: "#7c3aed" },
  url: { emoji: "\u{1F517}", label: "URL", color: "#059669" },
};

const PLACEHOLDERS: Record<FeedItem["type"], string> = {
  idea: "Describe an idea to explore...",
  signal: "What trend or signal did you notice?",
  data: "Share a data point or statistic...",
  url: "Paste a URL to mine for opportunities...",
};

interface FeedTabProps {
  config: Config;
  set: <K extends keyof Config>(key: K, value: Config[K]) => void;
}

export function FeedTab({ config, set }: FeedTabProps) {
  const [filter, setFilter] = useState<FeedItem["type"] | "all">("all");
  const [newText, setNewText] = useState("");
  const [newType, setNewType] = useState<FeedItem["type"]>("idea");

  const pendingCount = config.feed.filter((f) => f.status === "pending").length;

  const filtered =
    filter === "all"
      ? config.feed
      : config.feed.filter((f) => f.type === filter);

  const deleteFeedItem = (id: string) => {
    set(
      "feed",
      config.feed.filter((f) => f.id !== id)
    );
  };

  const addFeedItem = () => {
    if (!newText.trim()) return;
    const item: FeedItem = {
      id: `f_${Date.now()}`,
      t: newText.trim(),
      type: newType,
      vertical: null,
      status: "pending",
    };
    set("feed", [...config.feed, item]);
    setNewText("");
  };

  return (
    <div className="flex flex-col gap-[10px]">
      {!config.sections.feed && <Banner />}

      <Card
        title="Input Feed"
        icon={<Icons.Inbox />}
        badge={{ text: `${pendingCount} pending` }}
      >
        <div className="mb-2 text-[10px] text-text-muted">
          Drop ideas, signals, data points, or URLs. The system processes them
          all during the daily run.
        </div>

        {/* Type filter */}
        <div className="mb-2 flex gap-[3px]">
          <Button
            small
            active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All ({config.feed.length})
          </Button>
          {(
            Object.entries(FEED_TYPES) as [
              FeedItem["type"],
              (typeof FEED_TYPES)[FeedItem["type"]],
            ][]
          ).map(([k, v]) => (
            <Button
              key={k}
              small
              active={filter === k}
              onClick={() => setFilter(k)}
            >
              {v.emoji} {config.feed.filter((f) => f.type === k).length}
            </Button>
          ))}
        </div>

        {/* Feed items */}
        {filtered.map((f) => {
          const ft = FEED_TYPES[f.type];
          return (
            <div
              key={f.id}
              className="mb-1 flex items-center gap-2 rounded-[8px] px-[10px] py-[7px]"
              style={{
                background:
                  f.status === "pending" ? `${ft.color}08` : "#fafafa",
                border: `1px solid ${f.status === "pending" ? ft.color + "25" : "#eee"}`,
              }}
            >
              <span className="text-[14px]">{ft.emoji}</span>
              <div className="flex-1">
                <div
                  className="text-xs font-semibold"
                  style={{
                    color: f.status === "explored" ? "#999" : "#333",
                  }}
                >
                  {f.t}
                </div>
                <div className="mt-[2px] flex gap-1">
                  <span
                    className="rounded-full px-[5px] py-[1px] text-[9px] font-bold"
                    style={{
                      background: ft.color + "15",
                      color: ft.color,
                    }}
                  >
                    {ft.label}
                  </span>
                  {f.vertical && (
                    <span className="text-[9px] text-text-muted">
                      {f.vertical}
                    </span>
                  )}
                </div>
              </div>
              <span
                className="rounded-full px-[6px] py-[1px] text-[9px] font-bold uppercase"
                style={{
                  background:
                    f.status === "pending" ? "#fef3c7" : "#ecfdf5",
                  color: f.status === "pending" ? "#92400e" : "#065f46",
                }}
              >
                {f.status}
              </span>
              <button
                type="button"
                onClick={() => deleteFeedItem(f.id)}
                className="border-0 bg-transparent text-[#ddd] cursor-pointer p-0"
              >
                <Icons.Trash />
              </button>
            </div>
          );
        })}

        {/* Add new */}
        <div className="mt-2 rounded-[8px] border-[1.5px] border-dashed border-[#d1d5db] bg-[#fafafa] p-[10px]">
          <div className="mb-[6px] flex gap-[3px]">
            {(
              Object.entries(FEED_TYPES) as [
                FeedItem["type"],
                (typeof FEED_TYPES)[FeedItem["type"]],
              ][]
            ).map(([k, v]) => (
              <button
                key={k}
                type="button"
                onClick={() => setNewType(k)}
                className="cursor-pointer rounded-[6px] border-0 px-2 py-[3px] text-[10px] font-semibold"
                style={{
                  background: newType === k ? v.color : "#f0f0f0",
                  color: newType === k ? "#fff" : "#666",
                }}
              >
                {v.emoji} {v.label}
              </button>
            ))}
          </div>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder={PLACEHOLDERS[newType]}
            rows={2}
            className="box-border w-full resize-y rounded-[6px] border border-[#e5e5e5] px-[10px] py-[6px] text-xs outline-none"
          />
          <div className="mt-1 flex justify-end">
            <Button variant="primary" onClick={addFeedItem}>
              <Icons.Plus /> Add
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
