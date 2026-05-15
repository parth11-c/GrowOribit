import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        // Opt-in premium variants (not global). Use on hero/CTA buttons.
        heroPrimary:
          "relative overflow-hidden rounded-full border border-white/25 bg-white text-black shadow-[0_16px_50px_rgba(0,0,0,0.38),0_1px_0_rgba(255,255,255,0.22)_inset] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        heroSecondary:
          "relative overflow-hidden rounded-full border border-white/20 bg-white/10 text-white/95 shadow-[0_20px_50px_rgba(0,0,0,0.45),0_1px_0_rgba(255,255,255,0.08)_inset] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15 hover:text-white active:translate-y-0 focus-visible:ring-2 focus-visible:ring-[rgba(255,0,6,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
    compoundVariants: [
      {
        variant: "heroPrimary",
        size: "lg",
        className:
          "h-12 px-7 text-[12px] font-semibold uppercase tracking-[0.16em]",
      },
      {
        variant: "heroSecondary",
        size: "lg",
        className:
          "h-12 px-7 text-[12px] font-semibold uppercase tracking-[0.16em]",
      },
    ],
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
