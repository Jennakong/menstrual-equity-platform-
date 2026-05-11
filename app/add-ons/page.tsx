"use client";

import { useRouter } from "next/navigation";
import AddOnCard from "@/components/AddOnCard";
import CheckoutSummary from "@/components/CheckoutSummary";
import { ADD_ONS } from "@/lib/pricing";
import { useCartStore } from "@/store/useCartStore";

export default function AddOnsPage() {
  const router = useRouter();
  const { addOns, plan } = useCartStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white">
      {/* Progress bar */}
      <div className="bg-white border-b border-sage-100 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <span
            onClick={() => router.push("/choose-path")}
            className="cursor-pointer hover:text-sage-600 transition-colors"
          >
            1. Choose Plan
          </span>
          <span className="text-gray-300">›</span>
          <span className="font-semibold text-sage-700 bg-sage-100 px-2.5 py-1 rounded-full">
            2. Add-Ons
          </span>
          <span className="text-gray-300">›</span>
          <span>3. Delivery</span>
          <span className="text-gray-300">›</span>
          <span>4. Checkout</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          {/* Main content */}
          <div>
            <div className="mb-8">
              <h1 className="font-display text-4xl font-bold text-sage-900">
                Enhance Your Box
              </h1>
              <p className="mt-2 text-gray-500">
                Upgrade your self-care routine with curated extras — all optional.
              </p>
            </div>

            {addOns.length > 0 && (
              <div className="bg-sage-50 border border-sage-100 rounded-2xl px-4 py-3 mb-6 flex items-center gap-2">
                <span className="text-sage-500 font-semibold text-sm">
                  {addOns.length} add-on{addOns.length > 1 ? "s" : ""} selected
                </span>
                <span className="text-sage-300">·</span>
                <span className="text-sage-600 text-sm">
                  +${addOns.reduce((s, a) => s + a.price, 0)} added to your order
                </span>
              </div>
            )}

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {ADD_ONS.map((addOn) => (
                <AddOnCard key={addOn.id} addOn={addOn} />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-4 mt-10">
              <button
                onClick={() => router.push("/choose-path")}
                className="px-6 py-3 border-2 border-sage-200 text-sage-600 font-semibold rounded-2xl hover:border-sage-400 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={() => router.push("/delivery")}
                disabled={!plan}
                className="flex-1 px-8 py-3 bg-coral-500 hover:bg-coral-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all shadow-soft hover:shadow-card"
              >
                Continue to Delivery →
              </button>
            </div>
          </div>

          {/* Sidebar summary */}
          <div className="lg:sticky lg:top-24">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
