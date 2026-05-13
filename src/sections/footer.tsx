"use client";

import {
  Rocket,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Globe,
  MessageCircle,
  Users,
  Code,
} from "lucide-react";

const footerLinks = {
  Services: [
    "Web Development",
    "Mobile Apps",
    "Social Media Growth",
    "Branding & Design",
    "SEO Optimization",
    "AI Automation",
    "Digital Marketing",
  ],
  Company: [
    "About Us",
    "Our Team",
    "Careers",
    "Case Studies",
    "Blog",
    "Press Kit",
  ],
  Resources: [
    "Documentation",
    "Help Center",
    "Community",
    "Templates",
    "Changelog",
    "Status",
  ],
  Legal: [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
    "GDPR",
  ],
};

const socialLinks = [
  { icon: MessageCircle, href: "#", label: "Twitter / X" },
  { icon: Users, href: "#", label: "LinkedIn" },
  { icon: Globe, href: "#", label: "Instagram" },
  { icon: Code, href: "#", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-white/70 backdrop-blur-md">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 pr-8">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Grow<span className="gradient-text">Orbit</span>
              </span>
            </a>
            <p className="text-sm text-muted leading-relaxed mb-6 max-w-xs">
              Transforming small businesses into digital powerhouses with
              cutting-edge technology and data-driven strategies.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:hello@groworbit.com"
                className="flex items-center gap-2.5 text-sm text-muted hover:text-foreground transition-colors group"
              >
                <Mail className="w-4 h-4 text-primary-light" />
                hello@groworbit.com
              </a>
              <div className="flex items-center gap-2.5 text-sm text-muted">
                <Phone className="w-4 h-4 text-primary-light" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2.5 text-sm text-muted">
                <MapPin className="w-4 h-4 text-primary-light" />
                San Francisco, CA
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-foreground mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                    >
                      {link}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GrowOrbit. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
