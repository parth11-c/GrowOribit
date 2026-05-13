"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/ui/section";
import { FadeIn } from "@/components/motion-wrapper";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, TechFlow",
    content:
      "GrowOrbit completely transformed our online presence. Our website traffic increased by 420% in just 3 months, and the new design has been instrumental in closing enterprise deals.",
    rating: 5,
    initials: "SC",
    gradient: "from-rose-500 to-red-600",
  },
  {
    name: "Marcus Williams",
    role: "Founder, Nexora",
    content:
      "The team delivered our mobile app 2 weeks ahead of schedule. The attention to detail in both design and functionality exceeded our expectations. Best agency we've worked with.",
    rating: 5,
    initials: "MW",
    gradient: "from-red-500 to-orange-500",
  },
  {
    name: "Priya Sharma",
    role: "CMO, Velora",
    content:
      "Their social media strategy doubled our engagement rate and grew our following from 2K to 50K in 6 months. The ROI on their marketing campaigns has been incredible.",
    rating: 5,
    initials: "PS",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    name: "David Park",
    role: "CTO, Quantix",
    content:
      "The AI automation solutions they implemented saved us 30+ hours per week. Their technical expertise and understanding of our industry is unmatched. Truly a strategic partner.",
    rating: 5,
    initials: "DP",
    gradient: "from-orange-500 to-red-600",
  },
  {
    name: "Elena Rodriguez",
    role: "Director, Aethon",
    content:
      "From branding to web development, GrowOrbit handled everything seamlessly. Our rebrand received overwhelmingly positive feedback, and our conversion rate tripled.",
    rating: 5,
    initials: "ER",
    gradient: "from-red-600 to-rose-700",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <SectionWrapper id="testimonials">
      <SectionHeader
        badge="Testimonials"
        title="What Our Clients"
        titleGradient="Say About Us"
        description="Real feedback from real clients. See why businesses trust GrowOrbit to power their digital growth."
      />

      <FadeIn>
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="glass rounded-3xl p-8 md:p-12 min-h-[320px] flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Background quote */}
            <Quote className="absolute top-6 left-8 w-16 h-16 text-primary/5" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col items-center"
              >
                {/* Avatar */}
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-lg mb-6 shadow-lg`}
                >
                  {t.initials}
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg md:text-xl text-foreground leading-relaxed max-w-2xl mb-8 font-light">
                  &ldquo;{t.content}&rdquo;
                </p>

                {/* Author */}
                <div>
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted hover:text-foreground hover:bg-surface-hover transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === current
                      ? "w-8 bg-gradient-to-r from-primary to-accent"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted hover:text-foreground hover:bg-surface-hover transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </FadeIn>
    </SectionWrapper>
  );
}
