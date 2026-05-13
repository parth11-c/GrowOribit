"use client";

import React from "react";
import { Rocket, Mail, MapPin, Phone, ArrowRight, Send } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FooterProps {
  logo?: {
    url: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
  className?: string;
}

const defaultSections = [
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Web Development", href: "/services" },
      { name: "App Development", href: "/services" },
      { name: "SEO", href: "/services" },
      { name: "Social Media", href: "/services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "FAQs", href: "/pricing" },
      { name: "Case Studies", href: "/portfolio" },
    ],
  },
];

const defaultSocialLinks = [
  {
    icon: <FaInstagram className="size-4" />,
    href: "#",
    label: "Instagram",
  },
  {
    icon: <FaFacebook className="size-4" />,
    href: "#",
    label: "Facebook",
  },
  {
    icon: <FaTwitter className="size-4" />,
    href: "#",
    label: "Twitter",
  },
  {
    icon: <FaLinkedin className="size-4" />,
    href: "#",
    label: "LinkedIn",
  },
];

const defaultLegalLinks = [
  { name: "Privacy Policy", href: "#privacy" },
  { name: "Terms of Service", href: "#terms" },
];

export const Footer = ({
  logo = {
    url: "/",
    title: "GrowOrbit",
  },
  sections = defaultSections,
  description = "AI-powered digital growth agency helping businesses build, scale, and succeed with cutting-edge technology and data-driven strategies.",
  socialLinks = defaultSocialLinks,
  copyright = `© ${new Date().getFullYear()} GrowOrbit. All rights reserved.`,
  legalLinks = defaultLegalLinks,
  className,
}: FooterProps) => {
  return (
    <footer
      className={cn(
        "relative bg-[#0a0809]",
        className
      )}
    >
      {/* Gradient accent line at top */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff0006]/40 to-transparent" />

      {/* Newsletter Section */}
      <div className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-12 lg:px-16">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-bold text-white mb-2">
                Stay ahead of the <span className="gradient-text">curve</span>
              </h3>
              <p className="text-sm text-white/50 max-w-md">
                Get weekly insights on AI, digital growth, and marketing strategies delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full max-w-md items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.06] text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#ff0006]/50 backdrop-blur-sm"
              />
              <Button size="md" className="whitespace-nowrap group">
                <Send className="w-4 h-4" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-20 lg:px-16">
        <div className="flex w-full flex-col justify-between gap-12 lg:flex-row lg:items-start lg:text-left">
          {/* Brand Column */}
          <div className="flex w-full flex-col justify-between gap-6 lg:max-w-sm lg:items-start">
            {/* Logo */}
            <a
              href={logo.url}
              className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff0006] to-[#ff3d4a] shadow-lg shadow-[#ff0006]/25">
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Grow<span className="gradient-text">Orbit</span>
              </span>
            </a>

            <p className="max-w-[85%] text-sm leading-relaxed text-white/50">
              {description}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:hello@groworbit.com"
                className="group flex items-center gap-2.5 text-sm text-white/50 transition-colors hover:text-[#ff3d4a]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] transition-colors group-hover:bg-[#ff0006]/10">
                  <Mail className="h-4 w-4 text-white/60 group-hover:text-[#ff0006] transition-colors" />
                </div>
                hello@groworbit.com
              </a>
              <a
                href="tel:+15551234567"
                className="group flex items-center gap-2.5 text-sm text-white/50 transition-colors hover:text-[#ff3d4a]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] transition-colors group-hover:bg-[#ff0006]/10">
                  <Phone className="h-4 w-4 text-white/60 group-hover:text-[#ff0006] transition-colors" />
                </div>
                +1 (555) 123-4567
              </a>
              <div className="group flex items-center gap-2.5 text-sm text-white/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06]">
                  <MapPin className="h-4 w-4 text-white/60" />
                </div>
                San Francisco, CA
              </div>
            </div>

            {/* Social Links */}
            <ul className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <li key={idx}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-white/50 transition-all duration-200 hover:bg-[#ff0006]/10 hover:text-[#ff0006] hover:scale-105 border border-white/[0.04]"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link Columns */}
          <div className="grid w-full gap-8 sm:grid-cols-3 lg:gap-16">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.15em] text-[#ff3d4a]">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        className="group text-sm font-medium text-white/45 transition-all duration-200 hover:text-white hover:translate-x-1 inline-flex items-center gap-1"
                      >
                        <span className="inline-block w-0 h-1 bg-[#ff0006] transition-all duration-200 group-hover:w-2 rounded-full" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/[0.06] pt-8 md:flex-row md:items-center md:text-left">
          <p className="order-2 text-xs font-medium text-white/30 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row md:gap-6">
            {legalLinks.map((link, idx) => (
              <li
                key={idx}
                className="text-xs font-medium text-white/30 transition-colors duration-200 hover:text-[#ff3d4a]"
              >
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;