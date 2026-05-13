"use client";

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { cn } from "@/lib/utils";

type ClerkAuthStripProps = {
  /** Use on dark backgrounds (e.g. orbit hero). */
  variant?: "light" | "dark";
};

export function ClerkAuthStrip({ variant = "light" }: ClerkAuthStripProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "fixed right-4 top-4 z-[60] flex items-center gap-2 sm:right-6",
        isDark && "drop-shadow-md"
      )}
    >
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button
            type="button"
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm transition-colors",
              isDark
                ? "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/18"
                : "border border-border bg-card text-foreground hover:bg-surface-hover"
            )}
          >
            Sign in
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button
            type="button"
            className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:brightness-110"
          >
            Sign up
          </button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <UserButton
          appearance={
            isDark
              ? {
                  elements: {
                    avatarBox: "ring-2 ring-white/30",
                  },
                }
              : undefined
          }
        />
      </Show>
    </div>
  );
}
