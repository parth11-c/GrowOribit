"use client";

import { motion } from "framer-motion";
import { ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, ScaleIn } from "@/components/motion-wrapper";

export default function CtaBanner() {
  return (
    <section id="cta" className="relative py-24 md:py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScaleIn>
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-primary/25 via-blush-deep to-accent/20 shadow-[0_20px_60px_-20px_rgba(255,0,6,0.12)]">
            <div className="relative rounded-3xl overflow-hidden bg-white">
              {/* Soft pink wash on white */}
              <div className="absolute inset-0 bg-gradient-to-br from-blush/90 via-white to-blush-deep/50 pointer-events-none" />
              <div className="absolute inset-0 bg-grid opacity-[0.35] pointer-events-none" />
              <div className="absolute top-0 right-0 w-[380px] h-[380px] rounded-full bg-primary/[0.07] blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[280px] h-[280px] rounded-full bg-accent-light/40 blur-[90px] pointer-events-none" />

              <div className="absolute inset-0 rounded-3xl border border-primary/[0.08] pointer-events-none" />

              {/* Content */}
              <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
                <FadeIn>
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-xl shadow-primary/30 mb-8"
                  >
                    <Rocket className="w-8 h-8 text-white" />
                  </motion.div>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl mx-auto leading-tight">
                    Ready to Launch Your Business Into{" "}
                    <span className="gradient-text">Orbit?</span>
                  </h2>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <p className="mt-5 text-lg text-muted max-w-xl mx-auto leading-relaxed">
                    Book a free strategy call with our growth experts and discover
                    how we can 10x your digital presence in 90 days.
                  </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" className="group">
                      Book Free Strategy Call
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button variant="secondary" size="lg">
                      View Our Process
                    </Button>
                  </div>
                </FadeIn>

                <FadeIn delay={0.4}>
                  <p className="mt-6 text-sm text-muted-foreground">
                    No commitment required · Free consultation · Results guaranteed
                  </p>
                </FadeIn>
              </div>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}
