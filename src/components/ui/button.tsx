"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base =
      "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-[#ff0006] text-white border border-white/10 shadow-lg shadow-[rgba(255,0,6,0.22)] hover:shadow-xl hover:shadow-[rgba(255,0,6,0.3)] hover:brightness-[1.03]",
      secondary:
        "bg-white/[0.08] text-white border border-white/[0.12] shadow-sm hover:bg-white/[0.14] hover:border-[#ff0006]/15 backdrop-blur-sm",
      ghost:
        "text-white/60 hover:text-white hover:bg-white/[0.06]",
      outline:
        "border border-white/[0.12] text-white/80 hover:border-[#ff0006]/50 hover:bg-white/[0.06] backdrop-blur-sm",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm gap-1.5",
      md: "px-6 py-3 text-sm gap-2",
      lg: "px-8 py-4 text-base gap-2.5",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(base, variants[variant], sizes[size], className)}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export { Button };
