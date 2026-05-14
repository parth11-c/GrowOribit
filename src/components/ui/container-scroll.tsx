"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

type ContainerScrollProps = {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
};

export function ContainerScroll({ titleComponent, children }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.85, 0.95] : [1.02, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[34rem] w-full flex-col items-center justify-center px-3 py-4 md:min-h-[44rem] md:px-10 md:py-8"
    >
      <div
        className="flex w-full max-w-5xl flex-col items-center justify-center md:max-w-6xl"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 40%",
        }}
      >
        <ScrollHeader translate={translate} titleComponent={titleComponent} />
        <ScrollCard rotate={rotate} scale={scale}>
          {children}
        </ScrollCard>
      </div>
    </div>
  );
}

function ScrollHeader({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="mx-auto w-full max-w-5xl px-2 text-center md:px-4"
    >
      {titleComponent}
    </motion.div>
  );
}

function ScrollCard({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        transformOrigin: "center center",
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
        transformStyle: "preserve-3d",
      }}
      className="origin-center mx-auto -mt-4 h-[22rem] w-full max-w-5xl rounded-[30px] border-4 border-white/20 bg-[#1a1214] p-2 shadow-2xl md:h-[28rem] md:max-w-6xl md:p-4"
    >
      <div className="mx-auto flex h-full w-full max-w-full flex-col overflow-hidden rounded-2xl bg-[#faf7f8] md:rounded-2xl md:p-3">
        {children}
      </div>
    </motion.div>
  );
}
