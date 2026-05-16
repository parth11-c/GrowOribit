"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@groworbit.com",
    href: "mailto:hello@groworbit.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon - Fri, 9:00 AM - 6:00 PM",
    href: "#",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Remote-first team",
    href: "#",
  },
];

const inputClass =
  "h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-white/40 focus:bg-white/[0.06]";

export default function ContactSection() {
  return (
    <section className="w-full bg-black px-4 py-16 text-white sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="flex flex-col">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
            Contact Us
          </p>
          <h1 className="mt-5 max-w-xl text-4xl font-bold tracking-tight md:text-6xl">
            Let&apos;s build something clear, useful, and ready to grow.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/60 md:text-lg">
            Tell us what you&apos;re planning. We&apos;ll reply with the next best step,
            a realistic timeline, and a simple way to move forward.
          </p>

          <div className="mt-10 grid gap-3">
            {contactMethods.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/25 hover:bg-white/[0.06]"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black">
                  <item.icon className="size-5 text-white" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-white/45">{item.label}</span>
                  <span className="block truncate text-base font-medium text-white">
                    {item.value}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-[#050505] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-7 md:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">Send a message</h2>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Keep it short or detailed. Either way, we&apos;ll make sense of it.
            </p>
          </div>

          <form className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70" htmlFor="first-name">
                  First name
                </label>
                <input id="first-name" className={inputClass} placeholder="John" type="text" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70" htmlFor="last-name">
                  Last name
                </label>
                <input id="last-name" className={inputClass} placeholder="Doe" type="text" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70" htmlFor="email">
                Email
              </label>
              <input id="email" className={inputClass} placeholder="you@company.com" type="email" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70" htmlFor="service">
                What do you need?
              </label>
              <select id="service" className={inputClass} defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                <option value="web">Web development</option>
                <option value="mobile">Mobile app development</option>
                <option value="marketing">Digital growth</option>
                <option value="automation">AI automation</option>
                <option value="other">Something else</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="min-h-36 w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white outline-none transition-colors placeholder:text-white/35 focus:border-white/40 focus:bg-white/[0.06]"
                placeholder="Tell us about your goals, timeline, and what success should look like."
              />
            </div>

            <Button className="h-12 w-full rounded-xl bg-white text-base font-semibold text-black hover:bg-white/90 hover:text-black">
              Send message
              <ArrowRight className="ml-2 size-4" aria-hidden="true" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
