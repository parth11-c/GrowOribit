"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLAN_FEATURES: Record<string, string[]> = {
  starter: [
    "Access to 50+ UI components",
    "Tailwind-compatible styling",
    "Basic theming support",
    "Starter templates (blog, dashboard)",
    "1 project license",
    "Community support",
    "Early access to updates"
  ],
  pro: [
    "Access to 100+ production-grade components",
    "Advanced theming & dark mode",
    "Code snippets & layout presets",
    "Figma design system access",
    "Commercial use for up to 10 projects",
    "Priority GitHub issue support",
    "Team collaboration tools"
  ],
};

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") || "starter";
  const planName = planId === "pro" ? "Pro" : "Starter";
  const features = PLAN_FEATURES[planId] || PLAN_FEATURES["starter"];

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]">
          {/* Gradient background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5" />

          <div className="relative p-8 md:p-12">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10"
            >
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center text-3xl font-bold text-white md:text-4xl"
            >
              Payment Successful!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-3 text-center text-base text-white/60"
            >
              Thank you for subscribing to the <span className="text-white font-semibold">{planName}</span> plan.
              Your account has been upgraded.
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-white/80">Your plan features</span>
              </div>

              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                      <CheckCircle2 className="h-3 w-3 text-green-400" />
                    </div>
                    <span className="text-sm text-white/70">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Button asChild className="flex-1">
                <Link href="/">
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                <Link href="/contact">Need Help?</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}