"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Show, UserButton } from "@clerk/nextjs";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact Us", href: "/contact us" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/80 backdrop-blur-lg",
        isScrolled ? "border-b border-white/10" : ""
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group ml-4">
            <span
              className="text-2xl mar-2 font-black text-white tracking-tight group-hover:text-primary transition-colors"
              style={{ marginLeft: 20, fontFamily: '"Courier New", Impact, system-ui, sans-serif' }}
            >
              GrowOrbit
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Clerk Auth */}
          <div className="hidden lg:flex items-center gap-4">
            <Show when="signed-out">
              <Link
                href="/sign-in"
                className="go-button"
                aria-label="Log in"
                style={{ fontSize: 14, lineHeight: 1 }}
              >
                <span className="go-button-outer">
                  <span className="go-button-inner" style={{ padding: "0.6em 1.1em" }}>
                    <span>Log in</span>
                  </span>
                </span>
              </Link>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "w-6 h-0.5 bg-white transition-all duration-300",
                isMobileMenuOpen && "rotate-45 translate-y-2"
              )}
            />
            <span
              className={cn(
                "w-6 h-0.5 bg-white transition-all duration-300",
                isMobileMenuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "w-6 h-0.5 bg-white transition-all duration-300",
                isMobileMenuOpen && "-rotate-45 -translate-y-2"
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 bg-black/95 backdrop-blur-lg border-t border-white/10",
          isMobileMenuOpen ? "max-h-screen" : "max-h-0"
        )}
      >
        <div className="px-6 py-8 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-lg font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10">
            <Show when="signed-out">
              <Link
                href="/sign-in"
                className="go-button w-full inline-flex"
                aria-label="Log in"
                style={{ fontSize: 14, lineHeight: 1 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="go-button-outer w-full">
                  <span
                    className="go-button-inner"
                    style={{ padding: "0.75em 1.1em", width: "100%", textAlign: "center" }}
                  >
                    <span>Log in</span>
                  </span>
                </span>
              </Link>
            </Show>
            <Show when="signed-in">
              <div className="flex items-center justify-center">
                <UserButton />
              </div>
            </Show>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
