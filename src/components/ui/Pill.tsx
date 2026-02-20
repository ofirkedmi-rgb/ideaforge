interface PillProps {
  text: string;
  color?: string;
  onRemove?: () => void;
}

export function Pill({ text, color = "#1a1a1a", onRemove }: PillProps) {
  return (
    <span
      className="inline-flex items-center gap-1 px-[9px] py-[2px] rounded-full text-[11px] font-semibold"
      style={{
        backgroundColor: color + "10",
        color,
        border: `1px solid ${color}18`,
      }}
    >
      {text}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="bg-transparent border-0 cursor-pointer p-0 flex opacity-40 hover:opacity-70"
          style={{ color }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </span>
  );
}
