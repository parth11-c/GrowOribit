"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
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
        isScrolled
          ? "border-b border-white/10"
          : ""
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-24 md:h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group ml-8">
            <span className="text-2xl mar-2 font-black text-white tracking-tight group-hover:text-primary transition-colors" style={{  marginLeft:20 ,fontFamily: '"Courier New", Impact, system-ui, sans-serif' }}>
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
              <SignInButton mode="modal">
                <button className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary/90 transition-all hover:scale-105 active:scale-95">
                  Sign In
                </button>
              </SignInButton>
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
              <SignInButton mode="modal">
                <button className="block w-full px-6 py-3 bg-primary text-white text-center text-sm font-bold rounded-full hover:bg-primary/90 transition-all">
                  Sign In
                </button>
              </SignInButton>
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
