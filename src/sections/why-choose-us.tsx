"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  BarChart3,
  Users,
  Clock,
  HeartHandshake,
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Delivery",
    description:
      "We move fast without breaking things. Most projects launch within 4–8 weeks with full quality assurance.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description:
      "Your data and your customers' data are safe. We implement best-in-class security from day one.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Decisions",
    description:
      "Every strategy is backed by analytics. We track, measure, and optimize for continuous improvement.",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description:
      "You get a dedicated squad of designers, developers, and strategists fully invested in your success.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Round-the-clock monitoring and support. We're always available when you need us the most.",
  },
  {
    icon: HeartHandshake,
    title: "Transparent Partnership",
    description:
      "No hidden fees, no surprises. Clear communication and honest reporting at every stage.",
  },
];

export default function WhyChooseUs() {
  return (
    <SectionWrapper id="why-us" className="relative">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-[160px]" />
      </div>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
        {/* Left Column */}
        <div className="lg:w-[40%] lg:sticky lg:top-32">
          <FadeIn direction="right">
            <span className="badge-brand mb-6">
              <span className="badge-brand__dot animate-pulse" aria-hidden />
              Why GrowOrbit
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
              Built for Teams That{" "}
              <span className="gradient-text">Want to Win</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-8">
              We don&apos;t just build products — we build growth engines. Our
              approach combines creativity, technology, and strategy to deliver
              results that matter.
            </p>

            {/* Mini stats */}
            <div className="flex gap-8">
              <div>
                <div className="text-2xl font-bold gradient-text">15+</div>
                <div className="text-sm text-muted-foreground">Industries</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">50+</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">5</div>
                <div className="text-sm text-muted-foreground">Years Strong</div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Column - Feature Cards */}
        <div className="lg:w-[60%]">
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={feature.title}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="group relative rounded-2xl glass p-6 hover:bg-card-hover transition-colors duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary/12 to-accent-light/60 flex items-center justify-center group-hover:from-primary/18 group-hover:to-accent-light/80 transition-all duration-300">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground mb-1.5">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </SectionWrapper>
  );
}
