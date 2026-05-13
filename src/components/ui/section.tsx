"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32 overflow-hidden", className)}>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleGradient?: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  titleGradient,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center max-w-3xl mx-auto mb-16 md:mb-20", className)}>
      {badge && (
        <span className="badge-brand mb-6">
          <span className="badge-brand__dot animate-pulse" aria-hidden />
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
        {title}{" "}
        {titleGradient && <span className="gradient-text">{titleGradient}</span>}
      </h2>
      {description && (
        <p className="mt-5 text-lg text-muted leading-relaxed">{description}</p>
      )}
    </div>
  );
}
