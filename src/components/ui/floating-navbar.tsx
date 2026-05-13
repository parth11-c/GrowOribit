"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { Search, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  logo,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  logo?: {
    name: string;
    href: string;
  };
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.header
        initial={{ opacity: 1, y: 0 }}
        animate={{
          y: visible ? 0 : -120,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.35,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={cn(
          "fixed inset-x-0 top-0 z-[5000]",
          className
        )}
      >
        {/* Gradient accent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff0006] to-transparent" />

        {/* Main bar */}
        <div className="bg-[#0a0809]/90 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
            <div className="flex items-center justify-between lg:justify-start py-4 lg:py-5">

              {/* Logo */}
              <a
                href={logo?.href || "/"}
                className="flex-shrink-0 text-xl font-bold tracking-tight transition-colors hover:opacity-90 lg:mr-10"
              >
                <span className="text-white">
                  {logo?.name ? (
                    <>
                      {logo.name.slice(0, 4)}
                      <span className="gradient-text">{logo.name.slice(4)}</span>
                    </>
                  ) : (
                    <>
                      Grow<span className="gradient-text">Orbit</span>
                    </>
                  )}
                </span>
              </a>

              {/* Nav Links — centered */}
              <div className="hidden flex-1 items-center justify-center lg:flex">
                <nav className="flex items-center gap-1">
                  {navItems.map((item, idx) => (
                    <a
                      key={`link-${idx}`}
                      href={item.link}
                      className="group relative rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-[0.1em] text-white/70 transition-all duration-200 hover:text-white hover:bg-white/[0.04]"
                    >
                      {item.name}
                      {/* Animated red underline */}
                      <span className="absolute bottom-0.5 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-[#ff0006] to-[#ff3d4a] transition-all duration-300 group-hover:w-3/4 rounded-full" />
                    </a>
                  ))}
                </nav>
              </div>

              {/* Right icons */}
              <div className="flex flex-shrink-0 items-center gap-2">
                <button
                  className="hidden rounded-lg p-2 text-white/50 transition-all duration-200 hover:text-white hover:bg-white/[0.04] lg:inline-flex"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
                <button
                  className="hidden rounded-lg p-2 text-white/50 transition-all duration-200 hover:text-white hover:bg-white/[0.04] lg:inline-flex"
                  aria-label="Account"
                >
                  <User className="h-5 w-5" />
                </button>

                {/* Mobile Toggle */}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="inline-flex items-center justify-center rounded-lg p-2 text-white/50 transition-all duration-200 hover:text-white hover:bg-white/[0.04] lg:hidden"
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="border-b border-white/[0.06] bg-[#0a0809]/95 backdrop-blur-2xl lg:hidden"
            >
              <div className="mx-auto max-w-[1400px] px-6 py-4">
                <div className="flex flex-col gap-1">
                  {navItems.map((item, idx) => (
                    <a
                      key={`mobile-${idx}`}
                      href={item.link}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white/70 transition-all duration-200 hover:text-white hover:bg-white/[0.04]"
                    >
                      {item.name}
                    </a>
                  ))}
                  <div className="my-2 h-px bg-white/[0.06]" />
                  <a
                    href="#"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white/70 transition-all duration-200 hover:text-white hover:bg-white/[0.04]"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </a>
                  <a
                    href="#"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white/70 transition-all duration-200 hover:text-white hover:bg-white/[0.04]"
                  >
                    <User className="h-4 w-4" />
                    Account
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </AnimatePresence>
  );
};