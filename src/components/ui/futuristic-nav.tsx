"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  Search,
  Bell,
  User,
  Settings,
  Bookmark,
} from "lucide-react";

interface NavItem {
  id: number;
  Icon: LucideIcon;
  label: string;
}

const items: NavItem[] = [
  { id: 0, Icon: Home, label: "Home" },
  { id: 1, Icon: Search, label: "Search" },
  { id: 2, Icon: Bell, label: "Alerts" },
  { id: 3, Icon: User, label: "Profile" },
  { id: 4, Icon: Bookmark, label: "Saved" },
  { id: 5, Icon: Settings, label: "Settings" },
];

export default function LumaBar() {
  const [active, setActive] = useState(0);

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="relative flex items-center justify-center gap-2 rounded-full border border-primary/10 bg-white/75 px-4 py-2.5 shadow-[0_12px_40px_-12px_rgba(255,0,6,0.15)] backdrop-blur-2xl sm:gap-4 sm:px-6 sm:py-3 dark:border-white/10 dark:bg-black/40">
        {items.map((item, index) => {
          const isActive = index === active;
          const Icon = item.Icon;

          return (
            <motion.div
              key={item.id}
              className="group relative flex flex-col items-center"
            >
              <motion.button
                type="button"
                aria-label={item.label}
                aria-pressed={isActive}
                onClick={() => setActive(index)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14"
              >
                {isActive && (
                  <motion.span
                    layoutId="luma-active-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-muted hover:text-foreground dark:text-muted-foreground"
                  }`}
                >
                  <Icon size={22} strokeWidth={2} className="sm:h-6 sm:w-6" />
                </span>
              </motion.button>

              <span className="pointer-events-none absolute bottom-full mb-2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-white dark:text-foreground">
                {item.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
