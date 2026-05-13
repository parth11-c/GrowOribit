"use client";

import { useRef } from "react";
import { motion, useInView, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { FadeIn } from "@/components/motion-wrapper";

const stats = [
  { value: 200, suffix: "+", label: "Clients Served", description: "Across 15+ industries" },
  { value: 98, suffix: "%", label: "Client Retention", description: "Long-term partnerships" },
  { value: 500, suffix: "+", label: "Projects Delivered", description: "On time, every time" },
  { value: 4.9, suffix: "/5", label: "Average Rating", description: "From verified reviews", decimals: 1 },
];

function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (v: number) =>
    decimals > 0 ? v.toFixed(decimals) : Math.floor(v).toString()
  );

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-white/95 shadow-[0_12px_40px_-16px_rgba(255,0,6,0.08)] px-6 py-12 sm:px-10 sm:py-14 backdrop-blur-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div className="text-center group">
                <div className="text-4xl sm:text-5xl lg:text-5xl font-bold gradient-text mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>
                <div className="text-base font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            </FadeIn>
          ))}
          </div>
        </div>
      </div>

      {/* Divider line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}
