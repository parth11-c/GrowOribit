"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const liquidGlassVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141011] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-full",
  {
    variants: {
      variant: {
        default:
          "border border-white/15 bg-primary text-white shadow-[0_4px_28px_rgba(255,0,6,0.35)] hover:brightness-[1.06] active:scale-[0.98]",
        outline:
          "border border-white/35 bg-white/[0.07] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md hover:border-white/55 hover:bg-white/[0.12]",
        ghost: "text-white/90 hover:bg-white/10",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-10 px-5 text-sm",
        lg: "h-11 px-6 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type LiquidGlassButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> &
  VariantProps<typeof liquidGlassVariants> & {
    className?: string;
    asChild?: boolean;
  };

const LiquidGlassButton = React.forwardRef<HTMLButtonElement, LiquidGlassButtonProps>(
  ({ className, variant, size, asChild, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{
        className?: string;
        ref?: React.Ref<HTMLElement>;
      }>;
      return React.cloneElement(child, {
        ...child.props,
        ...props,
        className: cn(
          liquidGlassVariants({ variant, size }),
          child.props.className,
          className
        ),
        ref: ref as never,
      });
    }

    return (
      <button
        type="button"
        ref={ref}
        className={cn(liquidGlassVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

LiquidGlassButton.displayName = "LiquidGlassButton";

export { LiquidGlassButton, liquidGlassVariants };
