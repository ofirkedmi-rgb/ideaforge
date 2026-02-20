"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface CardBadge {
  text: string;
  bg?: string;
  color?: string;
}

interface CardProps {
  title: string;
  icon?: React.ReactNode;
  badge?: CardBadge;
  defaultCollapsed?: boolean;
  children: React.ReactNode;
}

export function Card({
  title,
  icon,
  badge,
  defaultCollapsed = false,
  children,
}: CardProps) {
  const [open, setOpen] = useState(!defaultCollapsed);

  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center justify-between px-4 py-[11px] text-left cursor-pointer bg-transparent border-0",
          open && "border-b border-[#f0f0f0]"
        )}
      >
        <div className="flex items-center gap-[7px]">
          {icon && <span className="text-[#94a3b8]">{icon}</span>}
          <span className="text-[13px] font-bold">{title}</span>
          {badge && (
            <span
              className="text-[10px] font-bold px-[7px] py-[1px] rounded-full font-mono"
              style={{
                backgroundColor: badge.bg || "#f0f0f0",
                color: badge.color || "#666",
              }}
            >
              {badge.text}
            </span>
          )}
        </div>
        <span
          className={cn(
            "text-[#ccc] transition-transform duration-150",
            !open && "-rotate-90"
          )}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      {open && <div className="px-4 py-3">{children}</div>}
    </div>
  );
}
