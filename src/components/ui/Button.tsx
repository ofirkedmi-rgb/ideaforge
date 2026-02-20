"use client";

import { cn } from "@/lib/cn";

type ButtonVariant = "default" | "primary" | "ghost" | "success";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  active?: boolean;
  small?: boolean;
  className?: string;
  type?: "button" | "submit";
}

const variantStyles: Record<ButtonVariant, string> = {
  default: "bg-[#f5f5f5] text-[#333] border-[#e5e5e5]",
  primary: "bg-active text-white border-active",
  ghost: "bg-transparent text-[#888] border-transparent",
  success: "bg-success text-white border-success",
};

export function Button({
  children,
  onClick,
  variant = "default",
  active,
  small,
  className,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-[var(--radius-button)] font-semibold cursor-pointer transition-all duration-150 whitespace-nowrap",
        small ? "px-2 py-[3px] text-[11px]" : "px-[11px] py-[5px] text-xs",
        active
          ? "bg-active text-white border border-active"
          : `border ${variantStyles[variant]}`,
        className
      )}
    >
      {children}
    </button>
  );
}
