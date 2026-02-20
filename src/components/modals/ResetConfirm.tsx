"use client";

interface ResetConfirmProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ResetConfirm({ open, onConfirm, onCancel }: ResetConfirmProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
      onClick={onCancel}
    >
      <div
        className="rounded-[14px] bg-card p-6 shadow-xl"
        style={{ width: "360px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-2 text-[14px] font-extrabold text-text">
          Reset all settings?
        </h3>
        <p className="mb-5 text-xs text-text-secondary leading-relaxed">
          This will restore all configuration to the original defaults.
          Your current settings will be lost.
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-[var(--radius-button)] border border-border bg-transparent px-3 py-[5px] text-xs font-semibold text-text-secondary hover:bg-[#f5f5f5] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer rounded-[var(--radius-button)] border-0 bg-error px-3 py-[5px] text-xs font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
