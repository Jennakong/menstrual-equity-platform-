"use client";

import { useCartStore } from "@/store/useCartStore";
import type { SubscriptionPlan } from "@/types";
import CTAButton from "./CTAButton";

interface Props {
  plan: SubscriptionPlan;
  onSelect?: () => void;
}

const colorMap = {
  sage: {
    badge: "bg-sage-100 text-sage-700 border-sage-200",
    ring: "ring-sage-400",
    icon: "bg-sage-50 text-sage-500",
    check: "text-sage-500",
    border: "border-sage-200 hover:border-sage-400",
    selected: "border-sage-500 bg-sage-50/50",
  },
  coral: {
    badge: "bg-coral-100 text-coral-700 border-coral-200",
    ring: "ring-coral-400",
    icon: "bg-coral-50 text-coral-500",
    check: "text-coral-500",
    border: "border-coral-200 hover:border-coral-400",
    selected: "border-coral-500 bg-coral-50/50",
  },
  blush: {
    badge: "bg-blush-100 text-blush-700 border-blush-200",
    ring: "ring-blush-400",
    icon: "bg-blush-50 text-blush-500",
    check: "text-blush-500",
    border: "border-blush-200 hover:border-blush-400",
    selected: "border-blush-500 bg-blush-50/50",
  },
} as const;

export default function SubscriptionCard({ plan, onSelect }: Props) {
  const { setPlan, plan: activePlan } = useCartStore();
  const isSelected = activePlan?.id === plan.id;
  const c = colorMap[plan.color as keyof typeof colorMap] ?? colorMap.sage;

  function handleSelect() {
    setPlan(plan);
    onSelect?.();
  }

  return (
    <div
      className={`relative flex flex-col rounded-3xl border-2 p-6 transition-all duration-200 cursor-pointer shadow-soft hover:shadow-card ${
        isSelected ? `${c.selected} ring-2 ${c.ring}` : c.border
      } ${plan.isPopular ? "scale-[1.02]" : ""}`}
      onClick={handleSelect}
    >
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-coral-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-soft whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="font-display text-xl font-bold text-sage-900">{plan.name}</h3>
        <p className="text-xs text-gray-400 mt-0.5">{plan.tagline}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-end gap-1">
          <span className="font-display text-4xl font-bold text-sage-900">
            ₦{plan.price.toLocaleString()}
          </span>
          <span className="text-gray-400 text-sm mb-1">/ year</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Annual · 12-month plan</p>
      </div>

      <div className={`rounded-xl px-3 py-2 mb-5 ${c.icon}`}>
        <p className="text-xs font-semibold">🌍 {plan.impactStatement}</p>
      </div>

      <ul className="space-y-2 mb-6 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
            <svg
              className={`w-4 h-4 mt-0.5 shrink-0 ${c.check}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <CTAButton
        fullWidth
        variant={isSelected ? "primary" : "secondary"}
        onClick={(e) => {
          e.stopPropagation();
          handleSelect();
        }}
      >
        {isSelected ? "Selected ✓" : `Choose ${plan.name}`}
      </CTAButton>
    </div>
  );
}
