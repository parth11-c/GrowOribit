"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/ui/section";
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small businesses just getting started.",
    price: "$1,499",
    period: "/project",
    features: [
      "Custom landing page",
      "Mobile-responsive design",
      "Basic SEO setup",
      "Contact form integration",
      "1 round of revisions",
      "2-week delivery",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    description: "For businesses ready to scale their digital presence.",
    price: "$3,999",
    period: "/month",
    features: [
      "Full website or app development",
      "Advanced SEO & analytics",
      "Social media management",
      "Content creation (8 posts/mo)",
      "Monthly strategy calls",
      "Priority support",
      "A/B testing & optimization",
      "Quarterly performance reports",
    ],
    cta: "Start Growing",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for established companies.",
    price: "Custom",
    period: "",
    features: [
      "Dedicated development team",
      "Custom AI automation",
      "Full-stack app development",
      "Multi-channel marketing",
      "Brand strategy & design",
      "24/7 premium support",
      "SLA guarantees",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <SectionWrapper id="pricing">
      <SectionHeader
        badge="Pricing"
        title="Simple, Transparent"
        titleGradient="Pricing"
        description="No hidden fees. No long-term contracts. Choose the plan that fits your growth stage and scale as you go."
      />

      <StaggerContainer
        staggerDelay={0.12}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start"
      >
        {plans.map((plan) => (
          <StaggerItem key={plan.name}>
            <PricingCard plan={plan} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  );
}

function PricingCard({ plan }: { plan: (typeof plans)[number] }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-2xl p-[1px] ${
        plan.popular
          ? "bg-gradient-to-b from-[#ff0006] via-[#ff4d5a] to-[#d40007]"
          : ""
      }`}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#ff0006] text-white text-xs font-semibold tracking-wide shadow-[0_6px_20px_rgba(255,0,6,0.28)] border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            Most Popular
          </span>
        </div>
      )}

      <div
        className={`relative rounded-2xl p-8 h-full ${
          plan.popular
            ? "bg-white"
            : "glass"
        }`}
      >
        {/* Plan name */}
        <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
        <p className="text-sm text-muted mt-1 mb-6">{plan.description}</p>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-8">
          <span className={`text-4xl font-bold ${plan.popular ? "gradient-text" : "text-foreground"}`}>
            {plan.price}
          </span>
          {plan.period && (
            <span className="text-sm text-muted-foreground">{plan.period}</span>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                plan.popular
                  ? "bg-primary/20 text-primary-light"
                  : "bg-surface text-muted"
              }`}>
                <Check className="w-3 h-3" />
              </div>
              <span className="text-sm text-muted">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          variant={plan.popular ? "primary" : "outline"}
          size="lg"
          className="w-full group"
        >
          {plan.cta}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
}
