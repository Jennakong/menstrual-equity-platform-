"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useCartStore } from "@/store/useCartStore";
import { IMPACT_ADD_ONS } from "@/lib/pricing";
import type { AddOn } from "@/types";

// ─── Icons ─────────────────────────────────────────────────────────────────────

function GirlIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function SchoolIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  );
}

function DoubleIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

// ─── Per-option display config ─────────────────────────────────────────────────

const CARD_CONFIG = {
  "sponsor-girl": {
    Icon: GirlIcon,
    category: "Girl Sponsorship",
    impactTag: "+1 girl funded",
    impactCount: 1,
    cardBg: "bg-coral-50",
    cardBorder: "border-coral-300",
    cardRing: "ring-coral-200",
    iconBg: "bg-coral-500",
    tagBg: "bg-coral-100",
    tagText: "text-coral-700",
    tagBorder: "border-coral-200",
    details: [
      "12-month supply of organic menstrual pads",
      "Delivered via vetted NGO partner network",
      "Personal impact certificate mailed to you",
    ],
  },
  "school-kit": {
    Icon: SchoolIcon,
    category: "School Outreach",
    impactTag: "+3 girls reached",
    impactCount: 3,
    cardBg: "bg-sage-50",
    cardBorder: "border-sage-400",
    cardRing: "ring-sage-200",
    iconBg: "bg-sage-600",
    tagBg: "bg-sage-100",
    tagText: "text-sage-700",
    tagBorder: "border-sage-200",
    details: [
      "Menstrual health education booklet per kit",
      "Reusable cloth pads + washable carry pouch",
      "Donated directly to a partner school",
    ],
  },
  "double-impact": {
    Icon: DoubleIcon,
    category: "Impact Multiplier",
    impactTag: "2× your reach",
    impactCount: 0,
    cardBg: "bg-blush-50",
    cardBorder: "border-blush-300",
    cardRing: "ring-blush-200",
    iconBg: "bg-blush-500",
    tagBg: "bg-blush-100",
    tagText: "text-blush-700",
    tagBorder: "border-blush-200",
    details: [
      "Doubles the number of girls your plan funds",
      "Priority placement in our quarterly impact reports",
      "Named in our annual donor recognition",
    ],
  },
} as const;

type ImpactId = keyof typeof CARD_CONFIG;

// ─── Toggle card ───────────────────────────────────────────────────────────────

function ImpactToggleCard({
  addOn,
  isSelected,
  onToggle,
  baseGirls,
}: {
  addOn: AddOn;
  isSelected: boolean;
  onToggle: () => void;
  baseGirls: number;
}) {
  const cfg = CARD_CONFIG[addOn.id as ImpactId];
  if (!cfg) return null;

  const { Icon, category, impactCount, cardBg, cardBorder, cardRing, iconBg, tagBg, tagText, tagBorder, details } = cfg;

  const impactLabel =
    addOn.id === "double-impact"
      ? `+${baseGirls} more girl${baseGirls !== 1 ? "s" : ""}`
      : cfg.impactTag;

  return (
    <div
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => (e.key === " " || e.key === "Enter") && onToggle()}
      className={`group relative cursor-pointer rounded-3xl border-2 transition-all duration-200 outline-none
        focus-visible:ring-2 focus-visible:ring-sage-400 focus-visible:ring-offset-2
        ${isSelected
          ? `${cardBg} ${cardBorder} ring-4 ${cardRing} shadow-card`
          : "bg-white border-sage-100 hover:border-sage-200 shadow-soft hover:shadow-card hover:-translate-y-0.5"
        }`}
    >
      {/* Badge */}
      {addOn.badge && !isSelected && (
        <div className="absolute -top-3 left-6">
          <span className="bg-coral-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-soft">
            {addOn.badge}
          </span>
        </div>
      )}

      <div className="p-6 sm:p-7">
        <div className="flex gap-4 sm:gap-6">
          {/* Icon column */}
          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${iconBg} flex items-center justify-center shrink-0 shadow-soft transition-transform duration-200 group-hover:scale-105`}>
            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>

          {/* Content column */}
          <div className="flex-1 min-w-0">
            {/* Row 1: category + toggle */}
            <div className="flex items-start justify-between gap-3 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                {category}
              </span>
              {/* Checkbox */}
              <div
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 mt-0.5
                  ${isSelected
                    ? "bg-sage-500 border-sage-500 shadow-soft"
                    : "bg-white border-sage-300 group-hover:border-sage-400"
                  }`}
              >
                {isSelected && <CheckIcon className="w-3.5 h-3.5 text-white" />}
              </div>
            </div>

            {/* Row 2: title + price */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg sm:text-xl font-bold text-sage-900 leading-tight">
                {addOn.name}
              </h3>
              <div className="text-right shrink-0">
                <span className="font-display text-xl font-bold text-sage-900">
                  ₦{addOn.price.toLocaleString()}
                </span>
                {addOn.id === "double-impact" && (
                  <span className="text-xs text-gray-400 ml-0.5">+</span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              {addOn.description}
            </p>

            {/* Impact tag + added label */}
            <div className="flex items-center justify-between gap-3 mt-4">
              <div className={`inline-flex items-center gap-1.5 ${tagBg} ${tagText} border ${tagBorder} text-xs font-bold px-3 py-1.5 rounded-full`}>
                <GirlIcon className="w-3.5 h-3.5" />
                {impactLabel}
              </div>
              {isSelected && (
                <span className="text-xs font-semibold text-sage-600 flex items-center gap-1.5 shrink-0">
                  <CheckIcon className="w-3 h-3" />
                  Added
                </span>
              )}
            </div>

            {/* Detail bullets — always visible */}
            <ul className="mt-4 space-y-2">
              {details.map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-xs text-gray-500">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isSelected ? iconBg : "bg-gray-300"}`} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sticky bottom bar ─────────────────────────────────────────────────────────

function StickyBar({
  selectedCount,
  addedTotal,
  totalGirls,
  canContinue,
  onContinue,
  onSkip,
}: {
  selectedCount: number;
  addedTotal: number;
  totalGirls: number;
  canContinue: boolean;
  onContinue: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-sage-100 shadow-elevated">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">

          {/* Impact summary */}
          <div className="flex-1 min-w-0">
            {selectedCount > 0 ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-coral-100 flex items-center justify-center">
                    <GirlIcon className="w-4 h-4 text-coral-500" />
                  </div>
                  <span className="font-bold text-sage-900 text-sm">
                    {totalGirls} girl{totalGirls !== 1 ? "s" : ""} funded this year
                  </span>
                </div>
                <div className="flex items-center gap-2 pl-9 sm:pl-0">
                  <span className="text-sage-300 hidden sm:inline">·</span>
                  <span className="text-sm text-sage-600 font-semibold">
                    +₦{addedTotal.toLocaleString()} in add-ons
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                Add impact boosts above — or skip to continue.
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 sm:shrink-0">
            <button
              onClick={onSkip}
              className="text-sm text-gray-400 hover:text-sage-600 transition-colors font-medium whitespace-nowrap"
            >
              Skip →
            </button>
            <button
              onClick={onContinue}
              disabled={!canContinue}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-coral-500 hover:bg-coral-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-semibold text-sm px-7 py-3.5 rounded-2xl transition-all duration-200 shadow-soft hover:shadow-card whitespace-nowrap"
            >
              Continue to Delivery
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AddOnsPage() {
  const router = useRouter();
  const { addOns, plan, toggleAddOn } = useCartStore();

  const baseGirls = plan
    ? plan.id === "essentials" ? 1 : plan.id === "comfort" ? 2 : 3
    : 1;

  const selectedImpact = IMPACT_ADD_ONS.filter((a) => addOns.some((s) => s.id === a.id));
  const selectedCount = selectedImpact.length;
  const addedTotal = selectedImpact.reduce((sum, a) => sum + a.price, 0);

  const extraGirls = selectedImpact.reduce((sum, a) => {
    if (a.id === "sponsor-girl") return sum + 1;
    if (a.id === "school-kit") return sum + 3;
    if (a.id === "double-impact") return sum + baseGirls;
    return sum;
  }, 0);

  const totalGirls = baseGirls + extraGirls;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-cream-50 via-white to-sage-50/30 pb-32">

        {/* ── Progress bar ── */}
        <div className="bg-white/90 backdrop-blur-sm border-b border-sage-100 px-4 py-3 sticky top-16 z-40">
          <div className="max-w-3xl mx-auto flex items-center gap-2 text-xs overflow-x-auto">
            <button
              onClick={() => router.push("/choose-path")}
              className="text-gray-400 hover:text-sage-600 transition-colors whitespace-nowrap shrink-0"
            >
              1. Choose Path
            </button>
            {["›", ""].map((sep, i) =>
              i === 0 ? (
                <span key={i} className="text-gray-300 shrink-0">{sep}</span>
              ) : null
            )}
            <span className="text-gray-300 shrink-0">›</span>
            <span className="flex items-center gap-1.5 font-bold text-sage-700 bg-sage-100 px-3 py-1.5 rounded-full whitespace-nowrap shrink-0">
              <span className="w-1.5 h-1.5 bg-sage-500 rounded-full" />
              2. Add-Ons
            </span>
            {["3. Delivery", "4. Checkout"].map((step) => (
              <span key={step} className="flex items-center gap-2 shrink-0">
                <span className="text-gray-300">›</span>
                <span className="text-gray-400 whitespace-nowrap">{step}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 lg:py-16">

          {/* ── Page header ── */}
          <div className="mb-10">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-coral-500 mb-3">
              Optional
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-sage-900 leading-tight">
              Increase Your Impact
            </h1>
            <p className="mt-3 text-gray-500 text-lg leading-relaxed max-w-xl">
              Every add-on directly funds more menstrual care and education support. Completely optional — skip anytime.
            </p>
          </div>

          {/* ── Current plan context card ── */}
          {plan && (
            <div className="bg-white rounded-2xl border border-sage-100 shadow-soft px-5 py-4 mb-8 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center shrink-0">
                <GirlIcon className="w-5 h-5 text-sage-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-sage-900">
                  Your <span className="text-coral-600">{plan.name}</span> plan already funds{" "}
                  <span className="font-bold">{baseGirls} girl{baseGirls !== 1 ? "s" : ""}</span> for 12 months.
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Add options below to increase your reach.
                </p>
              </div>
              {extraGirls > 0 && (
                <div className="shrink-0 text-right">
                  <p className="text-xs text-gray-400 leading-none">Total</p>
                  <p className="font-display text-xl font-bold text-coral-500 leading-tight mt-0.5">
                    {totalGirls}
                  </p>
                  <p className="text-[10px] text-gray-400 leading-none mt-0.5">girls</p>
                </div>
              )}
            </div>
          )}

          {/* ── Impact toggle cards ── */}
          <div className="space-y-4 sm:space-y-5">
            {IMPACT_ADD_ONS.map((addOn) => (
              <ImpactToggleCard
                key={addOn.id}
                addOn={addOn}
                isSelected={addOns.some((a) => a.id === addOn.id)}
                onToggle={() => toggleAddOn(addOn)}
                baseGirls={baseGirls}
              />
            ))}
          </div>

          {/* ── Impact summary block (appears once ≥1 selected) ── */}
          {selectedCount > 0 && (
            <div className="mt-8 bg-gradient-to-br from-sage-800 to-sage-900 rounded-3xl px-6 py-7 text-center">
              <div
                className="absolute inset-0 rounded-3xl opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: "20px 20px" }}
              />
              <p className="text-sage-400 text-xs font-bold uppercase tracking-widest mb-2">
                Your impact this year
              </p>
              <p className="font-display text-5xl font-bold text-white">
                {totalGirls}
              </p>
              <p className="text-sage-300 text-sm mt-1">
                girl{totalGirls !== 1 ? "s" : ""} with access to menstrual care
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-5">
                <div className="bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-center">
                  <p className="font-bold text-white text-sm">{baseGirls}</p>
                  <p className="text-sage-400 text-xs">from your plan</p>
                </div>
                {addOns.some((a) => a.id === "sponsor-girl") && (
                  <div className="bg-coral-500/20 border border-coral-400/20 rounded-xl px-4 py-2 text-center">
                    <p className="font-bold text-coral-300 text-sm">+1</p>
                    <p className="text-sage-400 text-xs">sponsored girl</p>
                  </div>
                )}
                {addOns.some((a) => a.id === "school-kit") && (
                  <div className="bg-sage-600/30 border border-sage-500/20 rounded-xl px-4 py-2 text-center">
                    <p className="font-bold text-sage-300 text-sm">+3</p>
                    <p className="text-sage-400 text-xs">school kit reach</p>
                  </div>
                )}
                {addOns.some((a) => a.id === "double-impact") && (
                  <div className="bg-blush-500/20 border border-blush-400/20 rounded-xl px-4 py-2 text-center">
                    <p className="font-bold text-blush-300 text-sm">×2</p>
                    <p className="text-sage-400 text-xs">plan doubled</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Reassurance footer ── */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              "All add-ons are one-time, not recurring",
              "100% goes to verified NGO partners",
              "Impact report sent within 30 days",
            ].map((note) => (
              <div key={note} className="flex items-center gap-1.5 text-xs text-gray-400">
                <svg className="w-3 h-3 text-sage-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {note}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Sticky bottom bar ── */}
      <StickyBar
        selectedCount={selectedCount}
        addedTotal={addedTotal}
        totalGirls={totalGirls}
        canContinue={!!plan}
        onContinue={() => router.push("/delivery")}
        onSkip={() => router.push("/delivery")}
      />
    </>
  );
}
