import { Metadata } from "next";
import { Sparkles, Code, Smartphone, Search, TrendingUp, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Services | GrowOrbit",
  description: "AI-powered digital services to help your business grow",
};

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom websites and web applications built with cutting-edge technologies for optimal performance and user experience.",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Secure & Scalable"],
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Native and cross-platform mobile applications that deliver seamless experiences across all devices.",
    features: ["iOS & Android", "Cross-Platform", "Cloud Integration", "Push Notifications"],
  },
  {
    icon: Search,
    title: "SEO & Marketing",
    description: "Data-driven SEO strategies and digital marketing campaigns that increase visibility and drive conversions.",
    features: ["Keyword Research", "Content Strategy", "Link Building", "Analytics & Reporting"],
  },
  {
    icon: Sparkles,
    title: "AI Integration",
    description: "Leverage artificial intelligence to automate processes, gain insights, and enhance customer experiences.",
    features: ["Chatbots", "Predictive Analytics", "Automation", "Machine Learning"],
  },
  {
    icon: TrendingUp,
    title: "Growth Strategy",
    description: "Comprehensive growth strategies tailored to your business goals and market opportunities.",
    features: ["Market Analysis", "Competitor Research", "Growth Hacking", "Performance Tracking"],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Optimize your digital assets for speed, efficiency, and maximum ROI.",
    features: ["Speed Optimization", "Conversion Rate", "A/B Testing", "User Experience"],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60">
              Comprehensive digital solutions powered by AI to accelerate your business growth
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-white/60 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-white/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
