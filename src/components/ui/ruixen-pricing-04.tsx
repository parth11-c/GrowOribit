"use client";

import Script from "next/script";
import { usePlans } from "@clerk/nextjs/experimental";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import { useId, useState } from "react";
import { RazorpayCheckoutButton } from "@/components/payments/razorpay-checkout-button";

type Plan = "monthly" | "annually";

type PLAN = {
    id: string;
    title: string;
    desc: string;
    monthlyPrice: number;
    annuallyPrice: number;
    clerkPlanId?: string;
    badge?: string;
    buttonText: string;
    features: string[];
    link: string;
};
export const PLANS: PLAN[] = [
  {
    id: "starter",
    title: "Starter",
    desc: "Ideal for developers and indie hackers building with Ruixen UI for personal or small commercial projects.",
    monthlyPrice: 9,
    annuallyPrice: 306,
    clerkPlanId: process.env.NEXT_PUBLIC_CLERK_STARTER_PLAN_ID,
    buttonText: "Get Starter Access",
    features: [
      "Access to 50+ UI components",
      "Tailwind-compatible styling",
      "Basic theming support",
      "Starter templates (blog, dashboard)",
      "1 project license",
      "Community support",
      "Early access to updates"
    ],
    link: "#"
  },
  {
    id: "pro",
    title: "Pro",
    desc: "Designed for teams and startups who need advanced UI components, theme customization, and premium support.",
    monthlyPrice: 9,
    annuallyPrice: 834,
    clerkPlanId: process.env.NEXT_PUBLIC_CLERK_PRO_PLAN_ID,
    badge: "Best Value",
    buttonText: "Upgrade to Pro",
    features: [
      "Access to 100+ production-grade components",
      "Advanced theming & dark mode",
      "Code snippets & layout presets",
      "Figma design system access",
      "Commercial use for up to 10 projects",
      "Priority GitHub issue support",
      "Team collaboration tools"
    ],
    link: "#"
  },
];

type ClerkPlan = (typeof usePlans extends (...args: never[]) => infer T
  ? T extends { data: infer U }
    ? U extends Array<infer V>
      ? V
      : never
    : never
  : never);

const normalizePlanKey = (value: string) =>
  value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");

const getMoneyAmountValue = (money: unknown) => {
  if (!money || typeof money !== "object") {
    return null;
  }

  const amount = (money as { amount?: unknown }).amount;
  return typeof amount === "number" ? amount : null;
};

const getPlanPrice = (plan: ClerkPlan | undefined, billPlan: Plan, fallback: PLAN) => {
  const clerkPrice =
    billPlan === "monthly"
      ? getMoneyAmountValue(plan?.fee)
      : getMoneyAmountValue(plan?.annualFee);

  return clerkPrice ?? (billPlan === "monthly" ? fallback.monthlyPrice : fallback.annuallyPrice);
};

const resolveClerkPlan = (plan: PLAN, clerkPlans: ClerkPlan[]) => {
  const explicitId = plan.clerkPlanId?.trim();
  const normalizedLocalId = normalizePlanKey(plan.id);
  const normalizedTitle = normalizePlanKey(plan.title);

  return clerkPlans.find((clerkPlan) => {
    const normalizedName = normalizePlanKey(clerkPlan.name);
    const normalizedSlug = normalizePlanKey(clerkPlan.slug);

    if (explicitId) {
      return clerkPlan.id === explicitId;
    }

    return (
      clerkPlan.id === plan.id ||
      normalizedSlug === normalizedLocalId ||
      normalizedSlug === normalizedTitle ||
      normalizedName === normalizedTitle
    );
  });
};

export default function Pricing_04() {

    const [billPlan, setBillPlan] = useState<Plan>("monthly");
    const { data: clerkPlans = [] } = usePlans();
    const [razorpayReady, setRazorpayReady] = useState(false);
    const [razorpayLoadError, setRazorpayLoadError] = useState<string | null>(null);

    const handleSwitch = () => {
        setBillPlan((prev) => (prev === "monthly" ? "annually" : "monthly"));
    };

    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center bg-[#050505] px-4 py-16 text-white sm:px-6 lg:px-8">
        <Script
            id="razorpay-checkout-js"
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="afterInteractive"
            onLoad={() => {
              setRazorpayReady(true);
              setRazorpayLoadError(null);
            }}
            onError={() => {
              setRazorpayReady(false);
              setRazorpayLoadError(
                "Failed to load Razorpay checkout script. Disable ad-blockers and try again.",
              );
            }}
        />
        <div className="w-full max-w-5xl mx-auto">

            <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">

                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                            Pricing
                        </h2>
                        <p className="mt-6 max-w-2xl text-center text-lg font-medium leading-7 text-white/70">
                        Streamline your creative process with AI. Generate, manage, and publish content — all in one place.
                        </p>
                    </div>
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <span className="text-base font-semibold text-white">Monthly</span>
                        <button
                            onClick={handleSwitch}
                            className="relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                            aria-label="Toggle billing period"
                        >
                            <div className="h-8 w-[68px] rounded-full bg-blue-500 shadow-sm transition"></div>
                            <div
                                className={cn(
                                    "absolute left-1 top-1 inline-flex size-6 items-center justify-center rounded-full bg-white transition-all duration-300 ease-in-out",
                                    billPlan === "annually" ? "translate-x-9" : "translate-x-0"
                                )}
                            />
                        </button>
                        <span className="text-base font-semibold text-white">Annually</span>
                    </div>
            </div>

            <div className="mx-auto grid w-full max-w-[820px] grid-cols-1 justify-items-center gap-6 pt-12 md:grid-cols-2">
                {PLANS.map((plan) => (
                        <Plan
                            key={plan.id}
                            plan={plan}
                            billPlan={billPlan}
                            clerkPlan={resolveClerkPlan(plan, clerkPlans)}
                            razorpayReady={razorpayReady}
                            razorpayLoadError={razorpayLoadError}
                        />
                ))}
            </div>
        </div>
        </section>
    );
};

const Plan = ({
    plan,
    billPlan,
    clerkPlan,
    razorpayReady,
    razorpayLoadError,
}: {
    plan: PLAN;
    billPlan: Plan;
    clerkPlan?: ClerkPlan;
    razorpayReady: boolean;
    razorpayLoadError: string | null;
}) => {
    const receiptId = useId().replace(/:/g, "");
    const planPrice = getPlanPrice(clerkPlan, billPlan, plan);
    const checkoutAmount =
      (billPlan === "monthly" ? plan.monthlyPrice : plan.annuallyPrice) * 100;
    const planDescription = clerkPlan?.description ?? plan.desc;
    const planFeatures =
      clerkPlan?.features?.map((feature) => feature.name).filter(Boolean) ?? plan.features;
    const receipt = `${plan.id}-${billPlan}-${receiptId}`;

    return (
        <div className="relative flex min-h-[560px] w-full max-w-[390px] flex-col items-start overflow-hidden rounded-3xl border border-white/12 bg-[#050505] text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] transition-all">
            <div className="relative flex w-full flex-col items-start px-7 pb-7 pt-10 md:px-8 md:pt-12">
                <h2 className="text-xl font-bold tracking-tight text-white">
                    {plan.title}
                </h2>
                <h3 className="mt-7 text-5xl font-bold tracking-[-0.04em] text-white md:text-6xl">
                    <NumberFlow
                        value={planPrice}
                        suffix={billPlan === "monthly" ? "/mo" : "/yr"}
                        format={{
                            currency: "INR",
                            style: "currency",
                            currencySign: "standard",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            currencyDisplay: "narrowSymbol"
                        }}
                    />
                </h3>
                <p className="mt-6 min-h-24 text-base font-medium leading-7 text-white/55">
                    {planDescription}
                </p>
            </div>
            <div className="flex w-full flex-col items-start px-7 pb-8 md:px-8">
                <RazorpayCheckoutButton
                    amount={checkoutAmount}
                    currency="INR"
                    receipt={receipt}
                    planTitle={plan.title}
                    buttonText={plan.buttonText}
                    disabled={!razorpayReady}
                    className="h-12 w-full rounded-xl border border-white/10 bg-white text-base font-semibold text-black shadow-none hover:bg-white/90 hover:text-black"
                />
                {razorpayLoadError ? (
                  <p className="mt-3 text-sm font-medium text-red-200">{razorpayLoadError}</p>
                ) : null}
                <div className="h-8 overflow-hidden w-full mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={billPlan}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="mx-auto mt-4 block text-center text-base font-medium text-white/50"
                        >
                            {billPlan === "monthly" ? (
                                "Billed monthly"
                            ) : (
                                "Billed in one annual payment"
                            )}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>
            <div className="mt-auto flex w-full flex-col items-start gap-3 px-7 pb-9 pt-3 md:px-8">
                <span className="mb-1 text-lg font-semibold text-left text-white">
                    Includes: 
                </span>
                {planFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start justify-start gap-3">
                        <div className="mt-0.5 flex shrink-0 items-center justify-center">
                            <CheckIcon className="size-5 text-white" aria-hidden="true" />
                        </div>
                        <span className="text-sm leading-6 text-white/65">{feature}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
