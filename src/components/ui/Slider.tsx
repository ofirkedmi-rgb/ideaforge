"use client";

import { Mono } from "./Mono";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  accentColor?: string;
  suffix?: string;
  prefix?: string;
  disabled?: boolean;
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  accentColor = "#1a1a1a",
  suffix = "",
  prefix = "",
  disabled = false,
}: SliderProps) {
  return (
    <div className="mb-2">
      <div className="flex justify-between mb-[2px]">
        <span className="text-[11px] font-semibold text-[#888]">{label}</span>
        <Mono color={accentColor}>
          {prefix}
          {value}
          {suffix}
        </Mono>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="w-full"
        style={{ accentColor }}
      />
    </div>
  );
}
