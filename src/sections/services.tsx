"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  Globe,
  Smartphone,
  TrendingUp,
  Palette,
  Search,
  Bot,
  Megaphone,
  type LucideIcon,
} from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/ui/section";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  shadowColor: string;
}

const services: Service[] = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Custom websites and web apps built with cutting-edge technologies. Fast, responsive, and optimized for conversions.",
    gradient: "from-rose-500 to-red-600",
    shadowColor: "shadow-rose-500/20",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications that deliver seamless user experiences on iOS and Android.",
    gradient: "from-red-500 to-orange-500",
    shadowColor: "shadow-red-500/20",
  },
  {
    icon: TrendingUp,
    title: "Social Media Growth",
    description:
      "Strategic social media management and growth campaigns that build engaged communities and drive results.",
    gradient: "from-pink-500 to-rose-500",
    shadowColor: "shadow-pink-500/20",
  },
  {
    icon: Palette,
    title: "Branding & Design",
    description:
      "Memorable brand identities, UI/UX design, and visual systems that make your business stand out.",
    gradient: "from-orange-500 to-amber-600",
    shadowColor: "shadow-orange-500/20",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Data-driven SEO strategies that boost your search rankings, increase organic traffic, and maximize visibility.",
    gradient: "from-red-600 to-rose-700",
    shadowColor: "shadow-red-600/20",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description:
      "Intelligent automation solutions powered by AI that streamline operations and unlock new growth opportunities.",
    gradient: "from-rose-400 to-red-500",
    shadowColor: "shadow-rose-400/20",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Full-funnel marketing campaigns across paid, organic, and email channels that drive measurable ROI.",
    gradient: "from-red-400 to-pink-500",
    shadowColor: "shadow-red-400/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

function StaggerContainer({
  staggerDelay = 0.08,
  className,
  children,
}: {
  staggerDelay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      transition={{ staggerChildren: staggerDelay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children }: { children: ReactNode }) {
  return <motion.div variants={itemVariants}>{children}</motion.div>;
}

export default function Services() {
  return (
    <SectionWrapper id="services">
      <SectionHeader
        badge="What We Do"
        title="Services That"
        titleGradient="Drive Growth"
        description="From concept to launch, we provide end-to-end digital solutions tailored to accelerate your business growth."
      />

      <StaggerContainer
        staggerDelay={0.08}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {services.map((service) => (
          <StaggerItem key={service.title}>
            <ServiceCard service={service} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl glass p-6 cursor-pointer hover:bg-card-hover transition-colors duration-300"
    >
      {/* Hover Glow */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${service.shadowColor} blur-xl -z-10`} />

      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} mb-5 shadow-lg ${service.shadowColor}`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-white transition-colors">
        {service.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed">{service.description}</p>

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
      />
    </motion.div>
  );
}
