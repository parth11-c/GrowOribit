"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll";
import { Button } from "@/components/ui/button";

const heroShadow =
  "1px 1px 0 rgba(80,0,10,0.85), 2px 2px 0 rgba(80,0,10,0.82), 3px 3px 0 rgba(80,0,10,0.78), 4px 4px 0 rgba(80,0,10,0.74), 5px 5px 0 rgba(80,0,10,0.7), 6px 6px 0 rgba(80,0,10,0.66), 7px 7px 0 rgba(80,0,10,0.62), 8px 8px 0 rgba(80,0,10,0.58), 9px 9px 0 rgba(80,0,10,0.54), 10px 10px 0 rgba(80,0,10,0.5), 11px 11px 0 rgba(80,0,10,0.46), 12px 12px 0 rgba(80,0,10,0.42), 13px 13px 0 rgba(80,0,10,0.38), 14px 14px 0 rgba(80,0,10,0.34)";

function HeroCta() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["amazing", "new", "wonderful", "beautiful", "smart"],
    []
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTitleNumber((n) => (n === titles.length - 1 ? 0 : n + 1));
    }, 900);

    return () => window.clearInterval(intervalId);
  }, [titles.length]);

  return (
    <section className="relative z-10 w-full mt-16 md:mt-24">
      <div className="mx-auto w-full max-w-[1440px] px-4">
        <div className="flex flex-col items-center justify-center gap-8 py-12 md:py-16 text-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter">
              <span className="text-white">This is something</span>
              <span className="relative mx-auto flex h-[1.15em] w-full max-w-2xl justify-center overflow-hidden text-center md:pb-3 md:pt-1">
                {titles.map((title, index) => (
                  <motion.span
                    key={title}
                    className="absolute font-semibold text-white"
                    initial={{ opacity: 0, y: -26 }}
                    transition={{ type: "spring", stiffness: 140, damping: 18, mass: 0.6 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -44 : 44, opacity: 0 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h2>

            <p className="mx-auto max-w-2xl text-base md:text-xl leading-relaxed tracking-tight text-white/55">
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our goal
              is to streamline SMB trade, making it easier and faster than ever.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" variant="heroSecondary" className="p-0 bg-transparent border-0 shadow-none hover:bg-transparent">
              <Link href="#contact" aria-label="Book a session" className="go-button" style={{ fontSize: 14, lineHeight: 1 }}>
                <span className="go-button-outer">
                  <span className="go-button-inner" style={{ padding: "0.9em 1.35em" }}>
                    <span>
                      Book a session <PhoneCall className="inline-block align-[-0.15em] ml-2 size-4" />
                    </span>
                  </span>
                </span>
              </Link>
            </Button>

            <Button asChild size="lg" variant="heroPrimary" className="p-0 bg-transparent border-0 shadow-none hover:bg-transparent">
              <Link
                href="#pricing"
                aria-label="Purchase a plan"
                className="go-button"
                style={{ fontSize: 14, lineHeight: 1 }}
              >
                <span className="go-button-outer">
                  <span
                    className="go-button-inner"
                    style={{ padding: "0.9em 1.35em", backgroundColor: "#ff0006", color: "#ffffff" }}
                  >
                    <span>
                      Purchase a plan{" "}
                      <MoveRight className="inline-block align-[-0.15em] ml-2 size-4" />
                    </span>
                  </span>
                </span>
              </Link>
            </Button>
          </div>

          {/* subtle separator */}
          <div className="mt-2 h-px w-full max-w-3xl bg-white/10" />
        </div>
      </div>
    </section>
  );
}

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
          <text className="text-[11px] font-black uppercase tracking-[0.18em]" fill="white">
            <textPath href={`#${pathId}`} startOffset="0%">
              Digital Growth Done Right{" "}
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
    // Background wrapper moved to `src/app/layout.tsx` so it applies to Navbar + whole site
    <div className="relative w-full">
      <main className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center px-4 pb-32 pt-40 md:pb-48 md:pt-48">
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center">
          <div className="flex w-full flex-col items-center space-y-2 md:space-y-4">
            <div className="flex w-full justify-center">
              <h1
                className="m-3 p-10 text-[clamp(4.5rem,12vw,160px)] font-black uppercase leading-[0.85] tracking-tighter text-primary"
                style={{
                  fontFamily: '"Arial Black", Impact, system-ui, sans-serif',
                  textShadow: heroShadow,
                  marginTop: 10,
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

      <HeroCta />

      <div
        style={{
          padding: 120,
        }}
      >
        <div className="flex w-full flex-col items-center justify-center text-center gap-2">
          <h1
            className="m-0 p-0 text-[clamp(1.5rem,4vw,80px)] font-black uppercase leading-[0.95] tracking-tighter text-white text-center"
            style={{
              fontFamily: '"Arial Black", Impact, system-ui, sans-serif',
              textShadow: heroShadow,
            }}
          >
            Focus on your business
          </h1>

          <h1
            className="m-0 p-0 text-[clamp(1.5rem,8vw,80px)] font-black uppercase leading-[0.85] tracking-tighter text-primary text-center"
            style={{
              fontFamily: '"Arial Black", Impact, system-ui, sans-serif',
              textShadow: heroShadow,
            }}
          >
            while we drive
          </h1>

          <h1
            className="m-0 p-0 text-[clamp(1.5rem,8vw,80px)] font-black uppercase leading-[0.85] tracking-tighter text-primary text-center"
            style={{
              fontFamily: '"Arial Black", Impact, system-ui, sans-serif',
              textShadow: heroShadow,
            }}
          >
            your growth.
          </h1>
        </div>

        <div className="mt-10 flex justify-center">
          <Button

            asChild size="lg" variant="heroPrimary" className="p-0 bg-transparent border-0 shadow-none hover:bg-transparent"
            style={{
              padding: 25,
              color: "black",
              marginTop: 60,

            }}
          >


            <Link
              href="#contact"
              aria-label="Join our Growth Team"
              className="go-button"
              style={{ fontSize: 14, lineHeight: 1 }}
            >
              <span className="go-button-outer">
                <span
                  className="go-button-inner"
                  style={{ padding: "0.9em 1.35em", backgroundColor: "#ff0006", color: "#ffffff" }}
                >
                  <span className="uppercase tracking-[0.18em]">
                    Join Us{" "}
                    <MoveRight className="inline-block align-[-0.15em] ml-2 size-4" />
                  </span>
                </span>
              </span>
            </Link>
          </Button>
        </div>



      </div>

      <section className="relative z-10 flex w-full justify-center">
        <ContainerScroll titleComponent={<></>}>
          <img src="/Trade.jpg" alt="Trade" className="h-full w-full object-cover" />
        </ContainerScroll>
      </section>
    </div>
  );
}
