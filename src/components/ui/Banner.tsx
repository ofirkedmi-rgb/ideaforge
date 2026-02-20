interface BannerProps {
  message?: string;
  variant?: "warning" | "info";
}

export function Banner({
  message = "Excluded from prompt.",
  variant = "warning",
}: BannerProps) {
  const styles = {
    warning: "bg-[#fef3c7] border-[#fde68a] text-[#92400e]",
    info: "bg-[#eff6ff] border-[#bfdbfe] text-[#1e40af]",
  };

  return (
    <div
      className={`flex items-center gap-[6px] px-[14px] py-[10px] rounded-[9px] border text-xs font-semibold ${styles[variant]}`}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {message}
    </div>
  );
}
