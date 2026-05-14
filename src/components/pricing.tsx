"use client";

import { useState } from "react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { CircleCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

interface PricingCardProps {
  title: "Starter" | "Growth" | "Enterprise";
  monthlyPrice: string;
  yearlyPrice: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
}

const pricingData: PricingCardProps[] = [
  {
    title: "Starter",
    monthlyPrice: "$29",
    yearlyPrice: "$290",
    description: "Perfect for startups and personal brands.",
    features: [
      "3 Premium Pages",
      "Responsive Design",
      "SEO Optimization",
      "Email Support",
    ],
    cta: "Get Started",
    href: "#",
  },
  {
    title: "Growth",
    monthlyPrice: "$59",
    yearlyPrice: "$590",
    description: "For scaling businesses that need performance.",
    features: [
      "10 Custom Pages",
      "Advanced SEO",
      "CMS Integration",
      "Priority Support",
      "Analytics Dashboard",
    ],
    cta: "Choose Growth",
    href: "#",
    featured: true,
  },
  {
    title: "Enterprise",
    monthlyPrice: "$99",
    yearlyPrice: "$990",
    description: "Tailored for high-scale companies and SaaS.",
    features: [
      "Unlimited Pages",
      "Custom APIs",
      "E-Commerce",
      "Dedicated Support",
      "Cloud Deployment",
    ],
    cta: "Contact Sales",
    href: "#",
  },
];

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");

  return (
    <div>
      
    </div>
  );
}