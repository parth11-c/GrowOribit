"use client";

import React, { useId } from "react";
import Link from "next/link";
import { ClerkAuthStrip } from "@/components/clerk-auth-strip";
import { ContainerScroll } from "@/components/ui/container-scroll";

const heroShadow =
  "1px 1px 0 rgba(80,0,10,0.85), 2px 2px 0 rgba(80,0,10,0.82), 3px 3px 0 rgba(80,0,10,0.78), 4px 4px 0 rgba(80,0,10,0.74), 5px 5px 0 rgba(80,0,10,0.7), 6px 6px 0 rgba(80,0,10,0.66), 7px 7px 0 rgba(80,0,10,0.62), 8px 8px 0 rgba(80,0,10,0.58), 9px 9px 0 rgba(80,0,10,0.54), 10px 10px 0 rgba(80,0,10,0.5), 11px 11px 0 rgba(80,0,10,0.46), 12px 12px 0 rgba(80,0,10,0.42), 13px 13px 0 rgba(80,0,10,0.38), 14px 14px 0 rgba(80,0,10,0.34)";

const ArrowAccentLeft = () => (
  <svg
    viewBox="0 0 100 100"
    className="h-full w-full overflow-visible stroke-current text-primary"
    fill="none"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10,90 C 10,40 40,20 60,50 C 70,65 80,75 95,70" />
    <path d="M80,55 L95,70 L85,85" />
  </svg>
);

const ArrowAccentRight = () => (
  <svg
    viewBox="0 0 100 100"
    className="h-full w-full overflow-visible stroke-current text-primary"
    fill="none"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M90,10 C 80,60 60,80 40,60 C 20,40 40,20 60,30 C 80,40 70,70 50,80" />
    <path d="M65,75 L50,80 L55,65" />
  </svg>
);

function CircularBadge({ pathId }: { pathId: string }) {
  return (
    <Link
      href="#contact"
      className="relative flex h-28 w-28 cursor-pointer items-center justify-center rounded-full border-[3px] border-black/10 bg-primary shadow-xl transition-transform hover:scale-105 md:h-36 md:w-36"
    >
      <div className="absolute inset-1 animate-[spin_14s_linear_infinite]">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <path
            id={pathId}
            d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
            fill="none"
          />
          <text
            className="text-[11px] font-black uppercase tracking-[0.18em]"
            fill="white"
          >
            <textPath href={`#${pathId}`} startOffset="0%">
            Digital Growth, Done Right •{" "}
            </textPath>
          </text>
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="h-10 w-10 overflow-visible stroke-current text-white"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20,80 Q 40,50 30,30 T 80,20" />
          <path d="M60,10 L80,20 L70,40" />
        </svg>
      </div>
    </Link>
  );
}

export default function OrbitLanding() {
  const uid = useId().replace(/:/g, "");
  const circlePathId = `orbit-circle-${uid}`;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#141011] font-sans selection:bg-primary selection:text-white">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,0,6,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,0,6,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden
      />

      <ClerkAuthStrip variant="dark" />

      <main className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center px-4 pb-32 pt-12 md:pb-48 md:pt-16">
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center">
          <div className="flex w-full flex-col items-center space-y-2 md:space-y-4">
            <div className="flex w-full justify-center">
              <h1
                className="m-0 p-0 text-[clamp(4.5rem,12vw,160px)] font-black uppercase leading-[0.85] tracking-tighter text-primary"
                style={{
                  fontFamily: '"Arial Black", Impact, system-ui, sans-serif',
                  textShadow: heroShadow,
                }}
              >
                We
              </h1>
            </div>

            <div className="flex w-full justify-center">
              <h1
                className="m-0 p-0 text-[clamp(5rem,15vw,220px)] font-black uppercase leading-[0.85] tracking-tighter text-white"
                style={{
                  fontFamily: '"Arial Black", Impact, system-ui, sans-serif',
                  textShadow: heroShadow,
                }}
              >
                Build.
              </h1>
            </div>

            <div className="flex w-full justify-center">
              <h1
                className="m-0 p-0 text-[clamp(4.5rem,12vw,160px)] font-black uppercase leading-[0.85] tracking-tighter text-white"
                style={{
                  fontFamily: '"Arial Black", Impact, system-ui, sans-serif',
                  textShadow: heroShadow,
                }}
              >
                You Grow.
              </h1>
            </div>
          </div>

          <div className="relative z-20 mt-10 flex w-full flex-col items-center justify-center gap-8 md:mt-14 md:gap-10">
            <div className="flex items-center justify-center gap-4 md:gap-12 lg:gap-20">
              <div className="h-20 w-20 shrink-0 md:h-28 md:w-32">
                <ArrowAccentLeft />
              </div>
              <div className="shrink-0">
                <CircularBadge pathId={circlePathId} />
              </div>
              <div className="h-20 w-20 shrink-0 md:h-28 md:w-32">
                <ArrowAccentRight />
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="relative z-10 flex w-full justify-center">
        <ContainerScroll
        titleComponent={
          <div className="mb-6 w-full px-2 text-center sm:px-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Inside the orbit
            </p>
            <h2 className="mt-3 text-balance text-3xl font-black tracking-tight text-white md:text-4xl lg:text-5xl">
              One dashboard for{" "}
              <span className="text-primary">growth metrics</span>
            </h2>
          
          </div>
        }
      >
        <div className="flex h-full w-full flex-col items-center gap-4 p-4 md:p-6">
          <div className="flex w-full max-w-3xl items-center justify-between border-b border-black/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
              <span className="text-sm font-bold text-foreground">GrowOrbit</span>
              <span className="hidden text-xs text-muted sm:inline">/ Overview</span>
            </div>
            <span className="shrink-0 rounded-full bg-blush-deep px-3 py-1 text-xs font-semibold text-foreground ring-1 ring-primary/15">
              Live
            </span>
          </div>
          <div className="grid w-full max-w-3xl flex-1 grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {[
              { label: "Qualified leads", value: "+142%", sub: "vs last quarter" },
              { label: "Page speed", value: "98", sub: "Lighthouse" },
              { label: "ROAS", value: "4.2×", sub: "blended" },
              { label: "Retention", value: "94%", sub: "clients" },
              { label: "Ship velocity", value: "2.1 wk", sub: "avg sprint" },
              { label: "NPS", value: "72", sub: "post-launch" },
            ].map((k) => (
              <div
                key={k.label}
                className="rounded-2xl border border-black/[0.06] bg-white p-4 text-center shadow-sm"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted md:text-xs">
                  {k.label}
                </p>
                <p className="mt-2 text-2xl font-black text-foreground md:text-3xl">
                  {k.value}
                </p>
                <p className="mt-1 text-[10px] text-muted md:text-xs">{k.sub}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-auto w-full max-w-3xl rounded-2xl border border-dashed border-primary/25 bg-primary/[0.04] p-4 text-center text-sm text-muted">
            Placeholder preview — swap for product screenshot or embed.
          </div>
        </div>
      </ContainerScroll>
      </section>
    </div>
  );
}
