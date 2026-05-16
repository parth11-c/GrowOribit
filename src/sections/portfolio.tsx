"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/ui/section";
import { FadeIn } from "@/components/motion-wrapper";

const categories = ["All", "Web", "Mobile", "Branding", "Marketing"] as const;

const projects = [
  {
    title: "Nexora AI Platform",
    category: "Web",
    description: "Full-stack SaaS platform for AI-powered analytics with real-time dashboards.",
    tags: ["Next.js", "AI/ML", "Dashboard"],
    color: "from-rose-600/20 to-red-600/20",
    accent: "bg-rose-500",
  },
  {
    title: "FitPulse Mobile",
    category: "Mobile",
    description: "Health & fitness app with personalized workout plans and social features.",
    tags: ["React Native", "HealthKit", "Social"],
    color: "from-red-600/20 to-orange-600/20",
    accent: "bg-red-500",
  },
  {
    title: "Velora Brand Identity",
    category: "Branding",
    description: "Complete rebrand for a luxury fashion startup including logo, packaging, and guidelines.",
    tags: ["Logo", "Guidelines", "Packaging"],
    color: "from-orange-600/20 to-rose-600/20",
    accent: "bg-orange-500",
  },
  {
    title: "CloudSync Dashboard",
    category: "Web",
    description: "Enterprise cloud management dashboard with multi-tenant architecture.",
    tags: ["TypeScript", "AWS", "Enterprise"],
    color: "from-red-700/20 to-rose-700/20",
    accent: "bg-red-600",
  },
  {
    title: "GrowthEngine Campaign",
    category: "Marketing",
    description: "Multi-channel marketing campaign that increased conversions by 340%.",
    tags: ["PPC", "SEO", "Content"],
    color: "from-pink-600/20 to-rose-600/20",
    accent: "bg-pink-500",
  },
  {
    title: "FinTrack Pro",
    category: "Mobile",
    description: "Personal finance management app with AI-powered insights and budget tracking.",
    tags: ["Flutter", "Finance", "AI"],
    color: "from-rose-500/20 to-red-500/20",
    accent: "bg-rose-500",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <SectionWrapper id="portfolio">
      <SectionHeader
        badge="Our Work"
        title="Projects That"
        titleGradient="Speak Results"
        description="Explore our portfolio of successful projects that have helped businesses scale and thrive in the digital landscape."
      />

      {/* Filter Tabs */}
      <FadeIn className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              active === cat
                ? "bg-[#ff0006] text-white shadow-[0_6px_20px_rgba(255,0,6,0.22)] border border-white/15"
                : "glass text-muted hover:text-foreground hover:bg-surface-hover"
            }`}
          >
            {cat}
          </button>
        ))}
      </FadeIn>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <PortfolioCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}

function PortfolioCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl glass overflow-hidden cursor-pointer hover:bg-card-hover transition-colors duration-300"
    >
      {/* Preview Area */}
      <div
        className={`relative h-48 bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden`}
      >
        {/* Decorative elements */}
        <div
          className={`w-16 h-16 rounded-2xl ${project.accent} opacity-20 blur-xl`}
        />
        <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl glass-strong">
          <span className="text-2xl font-bold gradient-text">
            {project.title[0]}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-primary/30 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </div>
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-primary/30 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-2 h-2 rounded-full ${project.accent}`} />
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
            {project.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-surface text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
