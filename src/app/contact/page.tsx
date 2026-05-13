"use client";

import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Rocket,
  Clock,
  MessageCircle,
  ArrowRight,
  Globe,
  Smartphone,
} from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/ui/section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import FloatingNavDemo from "@/components/floating-navbar-demo";
import { Footer } from "@/components/footer";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    value: "hello@groworbit.com",
    description: "We reply within 2 hours during business hours.",
    href: "mailto:hello@groworbit.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+1 (555) 123-4567",
    description: "Mon–Fri, 9am–6pm PST.",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "San Francisco, CA",
    description: "By appointment only.",
    href: "#",
  },
];

const quickServices = [
  "Web Development",
  "Mobile Apps",
  "SEO Optimization",
  "Social Media Growth",
  "AI Automation",
  "Digital Marketing",
  "Branding & Design",
  "Full Strategy Package",
];

export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#141011] selection:bg-primary selection:text-white">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,0,6,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,0,6,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden
      />

      <FloatingNavDemo />

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[128px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[128px] animate-pulse-glow" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="badge-brand mb-6">
              <span className="badge-brand__dot animate-pulse" aria-hidden />
              Contact
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white">
              Let&apos;s Start a{" "}
              <span className="gradient-text">Conversation</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
              Have a project in mind? Want to explore how we can help your
              business grow? We&apos;d love to hear from you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Methods */}
      <SectionWrapper className="!pt-8 !pb-12">
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <StaggerItem key={method.title}>
                <motion.a
                  href={method.href}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="group block rounded-2xl glass-dark p-8 text-center hover:bg-white/[0.08] transition-colors duration-300"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff0006]/20 to-[#ff3d4a]/20 mb-5 group-hover:from-[#ff0006]/30 group-hover:to-[#ff3d4a]/30 transition-all duration-300">
                    <Icon className="w-7 h-7 text-[#ff0006]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {method.title}
                  </h3>
                  <p className="text-base font-medium text-white mb-1">
                    {method.value}
                  </p>
                  <p className="text-sm text-white/40">{method.description}</p>
                </motion.a>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </SectionWrapper>

      {/* Contact Form + Info */}
      <SectionWrapper className="!pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <FadeIn direction="right">
              <div className="rounded-2xl glass-dark-strong p-8 md:p-10">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Send Us a Message
                </h3>
                <p className="text-sm text-white/50 mb-8">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.06] text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#ff0006]/50 backdrop-blur-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.06] text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#ff0006]/50 backdrop-blur-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.06] text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#ff0006]/50 backdrop-blur-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Service Interested In
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.06] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff0006]/50 backdrop-blur-sm transition-all [&>option]:bg-[#1a1d2e] [&>option]:text-white">
                      <option value="">Select a service</option>
                      {quickServices.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Budget Range
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.06] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff0006]/50 backdrop-blur-sm transition-all [&>option]:bg-[#1a1d2e] [&>option]:text-white">
                      <option value="">Select a range</option>
                      <option value="1k-3k">$1,000 – $3,000</option>
                      <option value="3k-5k">$3,000 – $5,000</option>
                      <option value="5k-10k">$5,000 – $10,000</option>
                      <option value="10k+">$10,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Tell Us About Your Project
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe your project, goals, and timeline..."
                      className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.06] text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#ff0006]/50 backdrop-blur-sm transition-all resize-none"
                    />
                  </div>

                  <Button size="lg" className="w-full group">
                    <Send className="w-4 h-4" />
                    Send Message
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </div>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <FadeIn direction="left">
              <div className="rounded-2xl glass-dark p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff0006] to-[#ff3d4a] flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-base font-semibold text-white">
                    Free Strategy Call
                  </h4>
                </div>
                <p className="text-sm text-white/50 leading-relaxed mb-5">
                  Book a complimentary 30-minute call with our growth experts.
                  We&apos;ll analyze your digital presence and outline a
                  tailored growth plan.
                </p>
                <Button size="md" className="w-full group">
                  Book a Call
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <div className="rounded-2xl glass-dark p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff0006]/20 to-[#ff3d4a]/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#ff0006]" />
                  </div>
                  <h4 className="text-base font-semibold text-white">
                    Response Time
                  </h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Email inquiries</span>
                    <span className="font-medium text-white">
                      Within 2 hours
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Project proposals</span>
                    <span className="font-medium text-white">
                      Within 24 hours
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Strategy calls</span>
                    <span className="font-medium text-white">
                      Same week
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="rounded-2xl glass-dark p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff0006]/20 to-[#ff3d4a]/20 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-[#ff0006]" />
                  </div>
                  <h4 className="text-base font-semibold text-white">
                    Services
                  </h4>
                </div>
                <ul className="space-y-2">
                  {quickServices.map((s) => (
                    <li
                      key={s}
                      className="flex items-center gap-2 text-sm text-white/50"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff0006]" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  );
}