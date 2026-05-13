"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";

export default function FloatingNavDemo() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Services", link: "/services" },
    { name: "Portfolio", link: "/portfolio" },
    { name: "Pricing", link: "/pricing" },
    { name: "About", link: "/about" },
    { name: "Blog", link: "/blog" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <div className="relative w-full ">
      <FloatingNav
        navItems={navItems}
        logo={{ name: "GrowOrbit", href: "/" }}
      />
    </div>
  );
}
