"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { SUBSCRIPTION_PLANS } from "@/lib/pricing";
import type { ReactNode } from "react";

// ─── Internal helpers ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-coral-500 mb-3">
      {children}
    </span>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-4 h-4 shrink-0 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

// ─── Path icons ────────────────────────────────────────────────────────────────

const IndividualIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ExplorerIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CorporateIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

// ─── Path options config ───────────────────────────────────────────────────────

type PathId = "individual" | "explorer" | "corporate";

const PATH_OPTIONS = [
  {
    id: "individual" as PathId,
    badge: "Most Popular",
    title: "Individual Subscription",
    price: "₦45,000",
    priceNote: "/ year · 12-month plan",
    tagline: "Premium care for you, dignity for her",
    highlighted: true,
    planId: "comfort",
    cta: "Continue",
    href: "/add-ons",
    features: [
      "12-month menstrual care supply",
      "Funds 1 girl for 12 months",
      "Personal delivery to your address",
      "Access to add-ons & upgrades",
    ],
    impactTag: "1 girl funded per year",
    illustration: {
      gradient: "from-coral-100 via-blush-50 to-coral-50",
      iconBg: "bg-coral-500",
      Icon: IndividualIcon,
    },
    card: {
      border: "border-coral-300 hover:border-coral-400",
      selectedRing: "ring-2 ring-coral-400 border-coral-500",
      bg: "bg-white",
      impactBg: "bg-coral-50 border-coral-100",
      impactText: "text-coral-700",
      ctaBg: "bg-coral-500 hover:bg-coral-600 text-white shadow-soft hover:shadow-card",
      checkColor: "text-coral-500",
    },
  },
  {
    id: "explorer" as PathId,
    badge: null,
    title: "Impact Explorer",
    price: "₦60,000 – ₦100,000",
    priceNote: "/ year · flexible tier",
    tagline: "For those who want to give more",
    highlighted: false,
    planId: "premium",
    cta: "Maximise Impact",
    href: "/add-ons",
    features: [
      "Support multiple girls",
      "Extended impact contribution",
      "Higher community reach",
      "Premium supporter tier",
    ],
    impactTag: "2–3 girls funded per year",
    illustration: {
      gradient: "from-sage-100 via-cream-50 to-sage-50",
      iconBg: "bg-sage-600",
      Icon: ExplorerIcon,
    },
    card: {
      border: "border-sage-200 hover:border-sage-400",
      selectedRing: "ring-2 ring-sage-400 border-sage-500",
      bg: "bg-white",
      impactBg: "bg-sage-50 border-sage-100",
      impactText: "text-sage-700",
      ctaBg: "bg-sage-600 hover:bg-sage-700 text-white shadow-soft hover:shadow-card",
      checkColor: "text-sage-500",
    },
  },
  {
    id: "corporate" as PathId,
    badge: null,
    title: "Corporate & NGO",
    price: null,
    priceNote: "Custom pricing",
    tagline: "Scale impact for your organisation",
    highlighted: false,
    planId: null,
    cta: "Request Proposal",
    href: "/corporate",
    features: [
      "Bulk impact distribution",
      "CSR partnerships",
      "School outreach support",
      "NGO collaboration",
    ],
    impactTag: "Unlimited community reach",
    illustration: {
      gradient: "from-blush-100 via-cream-50 to-blush-50",
      iconBg: "bg-blush-500",
      Icon: CorporateIcon,
    },
    card: {
      border: "border-blush-200 hover:border-blush-400",
      selectedRing: "ring-2 ring-blush-400 border-blush-500",
      bg: "bg-white",
      impactBg: "bg-blush-50 border-blush-100",
      impactText: "text-blush-700",
      ctaBg: "border-2 border-sage-300 text-sage-700 hover:bg-sage-50 hover:border-sage-400",
      checkColor: "text-blush-500",
    },
  },
] as const;

const TRUST_ITEMS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Secure Logistics",
    desc: "End-to-end tracked delivery, every order",
    iconBg: "bg-sage-100",
    iconColor: "text-sage-600",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Verified Impact",
    desc: "Impact reports confirm every girl's supply",
    iconBg: "bg-coral-100",
    iconColor: "text-coral-600",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Biodegradable Products",
    desc: "100% organic, plastic-free packaging",
    iconBg: "bg-sage-100",
    iconColor: "text-sage-600",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Community Distribution",
    desc: "NGO-led delivery direct to schools & homes",
    iconBg: "bg-blush-100",
    iconColor: "text-blush-600",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ChoosePathPage() {
  const router = useRouter();
  const { setPlan, setFrequency } = useCartStore();
  const [selected, setSelected] = useState<PathId | null>(null);
  const [loading, setLoading] = useState<PathId | null>(null);

  function handleSelect(option: (typeof PATH_OPTIONS)[number]) {
    setSelected(option.id);

    if (option.planId) {
      const plan = SUBSCRIPTION_PLANS.find((p) => p.id === option.planId);
      if (plan) {
        setPlan(plan);
        setFrequency("annual");
      }
    }
  }

  function handleCTA(option: (typeof PATH_OPTIONS)[number]) {
    setLoading(option.id);
    handleSelect(option);
    router.push(option.href);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 via-white to-sage-50/30">

      {/* ── Progress bar ── */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-sage-100 px-4 py-3 sticky top-16 z-40">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-xs overflow-x-auto">
          <span className="flex items-center gap-1.5 font-bold text-sage-700 bg-sage-100 px-3 py-1.5 rounded-full whitespace-nowrap shrink-0">
            <span className="w-1.5 h-1.5 bg-sage-500 rounded-full" />
            1. Choose Path
          </span>
          {["2. Add-Ons", "3. Delivery", "4. Checkout"].map((step) => (
            <div key={step} className="flex items-center gap-2 shrink-0">
              <span className="text-gray-300">›</span>
              <span className="text-gray-400 whitespace-nowrap">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">

        {/* ── Page header ── */}
        <div className="relative text-center mb-16">
          {/* Decorative blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-gradient-to-r from-coral-100/40 via-blush-100/30 to-sage-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute -top-8 left-1/4 w-40 h-40 bg-sage-100/50 rounded-full blur-2xl pointer-events-none -z-10" />
          <div className="absolute -top-4 right-1/4 w-32 h-32 bg-coral-100/50 rounded-full blur-2xl pointer-events-none -z-10" />

          <SectionLabel>Impact Path</SectionLabel>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-sage-900 leading-tight max-w-3xl mx-auto">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-500 to-blush-400">
              Impact Path
            </span>
          </h1>

          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Every option helps fund menstrual care access and education support for girls across
            underserved communities.
          </p>

          {/* Visual divider row */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-sage-200" />
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-coral-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-sage-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-blush-400" />
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-sage-200" />
          </div>
        </div>

        {/* ── Path cards ── */}
        <div className="grid lg:grid-cols-3 gap-6 xl:gap-8 mb-16">
          {PATH_OPTIONS.map((option) => {
            const isSelected = selected === option.id;
            const isLoading = loading === option.id;
            const { illustration, card } = option;

            return (
              <div
                key={option.id}
                onClick={() => handleSelect(option)}
                className={`relative flex flex-col rounded-3xl border-2 ${card.bg} transition-all duration-300 cursor-pointer overflow-hidden
                  ${isSelected ? card.selectedRing : card.border}
                  ${option.highlighted ? "lg:-translate-y-2 lg:shadow-elevated" : "shadow-soft hover:shadow-card hover:-translate-y-1"}
                `}
              >
                {/* Popular badge */}
                {option.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-coral-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-soft">
                      {option.badge}
                    </span>
                  </div>
                )}

                {/* Selected checkmark */}
                {isSelected && (
                  <div className="absolute top-4 left-4 z-10 w-6 h-6 rounded-full bg-sage-500 flex items-center justify-center shadow-soft">
                    <CheckIcon className="text-white w-3 h-3" />
                  </div>
                )}

                {/* Illustration area */}
                <div className={`relative h-40 bg-gradient-to-br ${illustration.gradient} overflow-hidden`}>
                  {/* Dot grid overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                      backgroundSize: "18px 18px",
                    }}
                  />
                  {/* Soft glow */}
                  <div className="absolute top-2 right-4 w-24 h-24 bg-white/40 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-4 w-20 h-20 bg-white/30 rounded-full blur-xl" />

                  {/* Icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className={`w-16 h-16 rounded-2xl ${illustration.iconBg} flex items-center justify-center shadow-soft`}>
                      <illustration.Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1 h-1 rounded-full bg-white/50"
                          style={{ opacity: i === 1 ? 0.8 : 0.4 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6">

                  {/* Title + tagline */}
                  <div className="mb-4">
                    <h2 className="font-display text-xl font-bold text-sage-900 leading-tight">
                      {option.title}
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">{option.tagline}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-5">
                    {option.price ? (
                      <>
                        <p className="font-display text-3xl font-bold text-sage-900 leading-none">
                          {option.price}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{option.priceNote}</p>
                      </>
                    ) : (
                      <>
                        <p className="font-display text-xl font-bold text-sage-500 leading-none">
                          Custom Pricing
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Tailored to your organisation</p>
                      </>
                    )}
                  </div>

                  {/* Impact tag */}
                  <div className={`inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-full border text-xs font-semibold mb-5 ${card.impactBg} ${card.impactText}`}>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {option.impactTag}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {option.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <CheckIcon className={card.checkColor} />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCTA(option);
                    }}
                    disabled={isLoading}
                    className={`w-full py-3.5 px-6 rounded-2xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 ${card.ctaBg}`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Loading…
                      </>
                    ) : (
                      <>
                        {option.cta}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Compare note ── */}
        <p className="text-center text-sm text-gray-400 mb-14">
          Not sure which to choose?{" "}
          <Link href="#trust" className="text-sage-600 hover:text-sage-800 underline underline-offset-2 transition-colors">
            Scroll down
          </Link>{" "}
          to see what&apos;s included in every option, or{" "}
          <Link href="/corporate" className="text-sage-600 hover:text-sage-800 underline underline-offset-2 transition-colors">
            talk to our team
          </Link>
          .
        </p>

        {/* ── Trust strip ── */}
        <div id="trust" className="bg-white rounded-3xl border border-sage-100 shadow-soft overflow-hidden">
          {/* Header bar */}
          <div className="px-6 py-4 bg-gradient-to-r from-sage-50 to-cream-50 border-b border-sage-100 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-sage-500">
              Included with every option
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-sage-100">
            {TRUST_ITEMS.map(({ icon, title, desc, iconBg, iconColor }) => (
              <div
                key={title}
                className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-3 px-6 py-6 sm:text-center hover:bg-sage-50/50 transition-colors group"
              >
                <div className={`w-12 h-12 rounded-2xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200 shadow-soft`}>
                  {icon}
                </div>
                <div>
                  <p className="font-semibold text-sage-900 text-sm">{title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mission footnote ── */}
        <div className="mt-10 relative overflow-hidden rounded-3xl bg-sage-900 px-8 py-10 text-center">
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute top-0 right-0 w-64 h-64 bg-coral-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-sage-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-5">
              <svg className="w-6 h-6 text-coral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3">
              Why This Model Works
            </h3>
            <p className="text-sage-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Across sub-Saharan Africa, 1 in 10 girls misses school during her period due to lack of
              access to menstrual products. Your subscription breaks that cycle — permanently and
              measurably.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {[
                { value: "94%", label: "school retention uplift" },
                { value: "12,400+", label: "girls supported so far" },
                { value: "6", label: "vetted NGO partners" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white/10 border border-white/10 rounded-2xl px-5 py-3 text-center">
                  <p className="font-display text-xl font-bold text-white">{value}</p>
                  <p className="text-sage-400 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
