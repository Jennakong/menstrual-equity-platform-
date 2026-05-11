"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SubscriptionCard from "@/components/SubscriptionCard";
import { SUBSCRIPTION_PLANS } from "@/lib/pricing";
import { useCartStore } from "@/store/useCartStore";
import type { PlanFrequency } from "@/types";

export default function ChoosePathPage() {
  const router = useRouter();
  const { plan, setFrequency, frequency } = useCartStore();
  const [localFreq, setLocalFreq] = useState<PlanFrequency>(frequency);

  function handleFrequency(f: PlanFrequency) {
    setLocalFreq(f);
    setFrequency(f);
  }

  function handleContinue() {
    if (plan) router.push("/add-ons");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white">
      {/* Progress bar */}
      <div className="bg-white border-b border-sage-100 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <span className="font-semibold text-sage-700 bg-sage-100 px-2.5 py-1 rounded-full">
            1. Choose Plan
          </span>
          <span className="text-gray-300">›</span>
          <span>2. Add-Ons</span>
          <span className="text-gray-300">›</span>
          <span>3. Delivery</span>
          <span className="text-gray-300">›</span>
          <span>4. Checkout</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-sage-900">
            Choose Your Plan
          </h1>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto">
            Every plan funds a matched 12-month supply for a girl in need across Africa.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center bg-sage-100 rounded-full p-1 mt-6 gap-1">
            {(["annual", "monthly"] as PlanFrequency[]).map((f) => (
              <button
                key={f}
                onClick={() => handleFrequency(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  localFreq === f
                    ? "bg-white text-sage-800 shadow-soft"
                    : "text-sage-600 hover:text-sage-800"
                }`}
              >
                {f === "annual" ? "Annual (Save up to $60)" : "Monthly"}
              </button>
            ))}
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-3 gap-6 items-start mt-4">
          {SUBSCRIPTION_PLANS.map((p) => (
            <SubscriptionCard key={p.id} plan={p} frequency={localFreq} />
          ))}
        </div>

        {/* Continue */}
        <div className="mt-10 text-center">
          <button
            onClick={handleContinue}
            disabled={!plan}
            className="px-10 py-4 bg-coral-500 hover:bg-coral-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all shadow-soft hover:shadow-card text-lg"
          >
            {plan ? `Continue with ${plan.name} →` : "Select a plan to continue"}
          </button>
          {plan && (
            <p className="mt-3 text-xs text-gray-400">
              You can add extras and review pricing on the next step.
            </p>
          )}
        </div>

        {/* Mission note */}
        <div className="mt-14 bg-gradient-to-r from-sage-800 to-sage-900 rounded-3xl p-8 text-center text-white">
          <div className="text-4xl mb-3">🌍</div>
          <h3 className="font-display text-xl font-bold mb-2">Why This Model Works</h3>
          <p className="text-sage-300 text-sm max-w-xl mx-auto leading-relaxed">
            Across sub-Saharan Africa, 1 in 10 girls misses school during their period due to lack
            of access to menstrual products. Your subscription breaks that cycle — permanently.
          </p>
        </div>
      </div>
    </div>
  );
}
