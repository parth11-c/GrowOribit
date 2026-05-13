"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[128px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[128px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[160px]" />

      {/* Floating Orbs */}
      <motion.div
        animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-[15%] w-3 h-3 rounded-full bg-primary-light/60 blur-[1px]"
      />
      <motion.div
        animate={{ y: [15, -15, 15], x: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 left-[10%] w-2 h-2 rounded-full bg-accent-light/60 blur-[1px]"
      />
      <motion.div
        animate={{ y: [-10, 20, -10] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] left-[20%] w-1.5 h-1.5 rounded-full bg-secondary/60 blur-[1px]"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium text-white bg-[#ff0006] shadow-[0_6px_24px_rgba(255,0,6,0.22)] mb-8 border border-white/15">
            <Sparkles className="w-4 h-4 shrink-0 opacity-95" />
            AI-Powered Digital Growth Agency
            <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-90" />
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] max-w-5xl mx-auto"
        >
          Launch Your Business
          <br />
          Into{" "}
          <span className="gradient-text">Digital Orbit</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
        >
          We craft stunning websites, powerful apps, and data-driven marketing
          strategies that transform small businesses into industry leaders.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="group">
            Start Your Growth
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="secondary" size="lg" className="group">
            <Play className="w-4 h-4" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Trust Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Trusted by 200+ businesses worldwide
          </p>
          <div className="flex items-center gap-8">
            {["TechFlow", "Nexora", "Velora", "Quantix", "Aethon"].map(
              (name, i) => (
                <motion.span
                  key={name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  whileHover={{ opacity: 0.8 }}
                  className="hidden sm:block text-sm font-semibold tracking-wide text-muted-foreground cursor-default"
                >
                  {name}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
