"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import CTAButton from "./CTAButton";
import { SITE_TAGLINE } from "@/lib/constants";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const addOns = useCartStore((s) => s.addOns);
  const plan = useCartStore((s) => s.plan);
  const cartCount = addOns.length + (plan ? 1 : 0);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-sage-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group flex flex-col leading-none" aria-label="Luwá">
            <div className="flex items-baseline">
              <span className="font-display font-bold text-2xl text-sage-900 tracking-tight transition-colors group-hover:text-sage-700">
                Luw
              </span>
              <span className="font-display font-bold text-2xl text-coral-500 italic tracking-tight transition-colors group-hover:text-coral-600">
                á
              </span>
            </div>
            <span className="hidden sm:block text-[8px] font-semibold uppercase tracking-[0.22em] text-sage-400 transition-colors group-hover:text-sage-500 mt-0.5">
              {SITE_TAGLINE}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/#how-it-works"
              className="text-sm text-gray-600 hover:text-sage-600 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#impact"
              className="text-sm text-gray-600 hover:text-sage-600 transition-colors"
            >
              Impact
            </Link>
            <Link
              href="/corporate"
              className="text-sm text-gray-600 hover:text-sage-600 transition-colors"
            >
              Corporate
            </Link>
          </nav>

          {/* CTA + Cart */}
          <div className="hidden md:flex items-center gap-3">
            {cartCount > 0 && (
              <Link
                href="/checkout"
                className="relative p-2 text-sage-600 hover:text-sage-800 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-coral-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </Link>
            )}
            <CTAButton href="/choose-path" size="sm">
              Get Started
            </CTAButton>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-sage-600 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-sage-100 px-4 py-4 space-y-3">
          <Link
            href="/#how-it-works"
            className="block text-sm text-gray-700 hover:text-sage-600 py-2"
            onClick={() => setMobileOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="/#impact"
            className="block text-sm text-gray-700 hover:text-sage-600 py-2"
            onClick={() => setMobileOpen(false)}
          >
            Impact
          </Link>
          <Link
            href="/corporate"
            className="block text-sm text-gray-700 hover:text-sage-600 py-2"
            onClick={() => setMobileOpen(false)}
          >
            Corporate
          </Link>
          <div className="pt-2">
            <CTAButton href="/choose-path" fullWidth>
              Get Started
            </CTAButton>
          </div>
        </div>
      )}
    </header>
  );
}
