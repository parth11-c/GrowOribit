"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["amazing", "new", "wonderful", "beautiful", "smart"], []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setTitleNumber((n) => (n === titles.length - 1 ? 0 : n + 1));
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [titles.length]);

  const currentTitle = titles[titleNumber];

  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-8 py-16 lg:py-28 text-center">
          <div>
            <Button variant="secondary" size="sm" className="gap-2">
              Read our launch article <MoveRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-medium text-white">
              <span className="text-white">This is something </span>
              <span className="relative inline-flex h-[1.15em] w-[8ch] align-bottom justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTitle}
                    className="absolute inset-0 font-semibold text-white"
                    initial={{ opacity: 0, y: -40, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                    transition={{ type: "spring", stiffness: 120, damping: 16 }}
                  >
                    {currentTitle}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-white/55 max-w-2xl text-center">
              Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious
              trade methods. Our goal is to streamline SMB trade, making it easier and faster than ever.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="gap-2" variant="outline">
              Jump on a call <PhoneCall className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-2">
              Sign up here <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
