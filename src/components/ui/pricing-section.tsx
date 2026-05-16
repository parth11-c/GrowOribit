import * as React from "react";
import Link from "next/link";
import { CircleCheck } from "lucide-react";

// shadcn/ui bits
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ---- minimal craft-ds inline (single-file helper) ----------------
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type SectionProps = { children: React.ReactNode; className?: string; id?: string };
type ContainerProps = { children: React.ReactNode; className?: string; id?: string };

const Section = ({ children, className, id }: SectionProps) => (
  <section className={cn("py-8 md:py-12", className)} id={id}>
    {children}
  </section>
);

const Container = ({ children, className, id }: ContainerProps) => (
  <div className={cn("mx-auto max-w-5xl p-6 sm:p-8", className)} id={id}>
    {children}
  </div>
);
// ------------------------------------------------------------------

type PlanTier = "Basic" | "Standard" | "Pro";

interface PricingCardProps {
  title: PlanTier;
  price: string;
  description?: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
}

// Dummy pricing data
const pricingData: PricingCardProps[] = [
  {
    title: "Basic",
    price: "₹9/month",
    description: "Perfect for small businesses and individuals.",
    features: ["3 Pages", "Basic SEO", "Email Support", "Responsive Design"],
    cta: "Choose Basic",
    href: "https://stripe.com/",
  },
  {
    title: "Standard",
    price: "₹9/month",
    description: "Best for growing businesses with more needs.",
    features: ["10 Pages", "Advanced SEO", "CMS Integration", "24/7 Chat Support"],
    cta: "Choose Standard",
    href: "https://stripe.com/",
    featured: true,
  },
  {
    title: "Pro",
    price: "₹9/month",
    description: "Ideal for larger businesses that need scalability.",
    features: ["Unlimited Pages", "E-commerce Integration", "Priority Support", "Custom API Integration"],
    cta: "Choose Pro",
    href: "https://stripe.com/",
  },
];

export default function Pricing() {
  return (
    <Section>
      <Container className="flex w-full flex-col items-center gap-4 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="!my-0 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Pricing</h2>
          <p className="mt-3 text-base text-white/75 sm:text-lg">
            Select the plan that best suits your needs.
          </p>
        </div>

        <div className="not-prose mt-8 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 min-[900px]:grid-cols-3">
          {pricingData.map((plan) => (
            <PricingCard key={plan.title} plan={plan} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function PricingCard({ plan }: { plan: PricingCardProps }) {
  return (
    <div 

   style={{
      padding:30
    }}    
      className={cn(
        "flex h-full flex-col rounded-xl border border-white/10 bg-white/5 p-6 text-left text-white backdrop-blur-sm",
        plan.featured && "border-primary/60 shadow-lg shadow-primary/10 ring-1 ring-primary/20"
      )}
      aria-label={`${plan.title} plan`}
    >
      <div className="text-center"    style={{
      padding:30
    }}>
        <div className="inline-flex items-center justify-center gap-2">
          <Badge variant={plan.featured ? "default" : "secondary"}>{plan.title}</Badge>
          {plan.featured && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Most popular</span>
          )}
        </div>
        <h4 className="mb-2 mt-4 text-3xl font-semibold tracking-tight text-white">{plan.price}</h4>
        {plan.description && <p className="text-sm leading-relaxed text-white/70">{plan.description}</p>}
      </div>

      <div    style={{
      padding:30
    }} className="my-5 border-t border-white/10" />

      <ul className="space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start text-sm text-white/80">
            <CircleCheck className="mr-2 mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Link href={plan.href} target="_blank" rel="noreferrer noopener">
          <Button size="sm" className="w-full" variant={plan.featured ? "default" : "secondary"}>
            {plan.cta}
          </Button>
        </Link>
      </div>
    </div>
  );
}
