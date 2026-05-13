import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BadgeVariant = "default" | "secondary" | "outline";

const variantStyles: Record<BadgeVariant, string> = {
  default: "border-transparent bg-[#ff0006] text-white shadow",
  secondary: "border-transparent bg-white/[0.08] text-white",
  outline: "border-white/[0.12] text-white",
};

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
