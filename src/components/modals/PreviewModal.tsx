"use client";

import { useState } from "react";
import { Icons } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { copyToClipboard } from "@/lib/download";
import { downloadFile } from "@/lib/download";

interface PreviewModalProps {
  open: boolean;
  content: string;
  onClose: () => void;
}

export function PreviewModal({ open, content, onClose }: PreviewModalProps) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const handleCopy = async () => {
    const ok = await copyToClipboard(content);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    downloadFile(content);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="flex max-h-[80vh] flex-col rounded-[14px] bg-card shadow-2xl"
        style={{ width: "700px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f0f0f0] px-[18px] py-[14px]">
          <span className="text-[14px] font-extrabold">CLAUDE.md Preview</span>
          <div className="flex gap-[5px]">
            <Button small onClick={handleCopy}>
              <Icons.Save /> {copied ? "Copied!" : "Copy"}
            </Button>
            <Button small variant="primary" onClick={handleDownload}>
              <Icons.Download /> Download
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="border-0 bg-transparent text-text-muted cursor-pointer p-1"
            >
              <Icons.X />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto px-[18px] py-4">
          <pre className="m-0 whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-[#444]">
            {content}
          </pre>
        </div>
      </div>
    </div>
  );
}
