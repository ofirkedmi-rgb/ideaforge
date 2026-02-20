"use client";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  color?: string;
}

export function Checkbox({ checked, onChange, color = "#1a1a1a" }: CheckboxProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex shrink-0 items-center justify-center w-[15px] h-[15px] rounded-[3px] cursor-pointer border-0 p-0"
      style={{
        border: `2px solid ${checked ? color : "#ccc"}`,
        backgroundColor: checked ? color : "transparent",
      }}
    >
      {checked && (
        <svg
          width="8"
          height="8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="4"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </button>
  );
}
