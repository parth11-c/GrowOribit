import { Metadata } from "next";
import { Check, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | GrowOrbit",
  description: "Flexible pricing plans for businesses of all sizes",
};

const plans = [
  {
    name: "Starter",
    price: "$999",
    period: "/month",
    description: "Perfect for small businesses and startups",
    features: [
      "Custom Website Design",
      "Mobile Responsive",
      "SEO Optimization",
      "3 Revisions",
      "Basic Analytics",
      "Email Support",
      "1 Month Support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "$2,499",
    period: "/month",
    description: "Ideal for growing businesses",
    features: [
      "Everything in Starter",
      "Advanced Web App",
      "API Integration",
      "Unlimited Revisions",
      "Advanced Analytics",
      "Priority Support",
      "3 Months Support",
      "Performance Optimization",
      "Security Features",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with specific needs",
    features: [
      "Everything in Professional",
      "Custom AI Solutions",
      "Dedicated Team",
      "24/7 Support",
      "Custom Integrations",
      "Advanced Security",
      "Ongoing Maintenance",
      "Training & Onboarding",
      "SLA Guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const addons = [
  {
    name: "AI Chatbot Integration",
    price: "$499/month",
    description: "Add intelligent chatbot to your platform",
  },
  {
    name: "Mobile App Development",
    price: "$3,999",
    description: "Native iOS and Android applications",
  },
  {
    name: "Advanced Analytics",
    price: "$299/month",
    description: "Deep insights and custom reporting",
  },
  {
    name: "Marketing Automation",
    price: "$799/month",
    description: "Automated email and social campaigns",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
              Simple, <span className="text-primary">Transparent</span> Pricing
            </h1>
            <p className="text-lg md:text-xl text-white/60">
              Choose the perfect plan for your business. No hidden fees, cancel anytime.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 ${
                  plan.popular
                    ? "border-primary scale-105 shadow-2xl shadow-primary/20"
                    : "border-white/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full text-white text-xs font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/60 text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-white">{plan.price}</span>
                    <span className="text-white/60">{plan.period}</span>
                  </div>
                </div>

                <button
                  className={`w-full py-3 rounded-xl font-bold transition-all duration-300 mb-8 ${
                    plan.popular
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {plan.cta}
                </button>

                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-white/70 text-sm">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Add-ons */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Add-ons & Extras
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {addons.map((addon, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-white mb-2">{addon.name}</h3>
                  <div className="text-primary font-bold mb-3">{addon.price}</div>
                  <p className="text-white/60 text-sm">{addon.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Note */}
          <div className="mt-20 text-center">
            <p className="text-white/60">
              Have questions? <a href="#" className="text-primary hover:underline">Contact our sales team</a> for a custom quote.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
