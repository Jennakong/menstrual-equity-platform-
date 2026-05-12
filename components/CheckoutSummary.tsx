"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { calculateOrderSummary } from "@/lib/pricing";
import { getDeliveryZoneById } from "@/lib/deliveryZones";
import { buildImpactSummary } from "@/lib/impactLogic";

export default function CheckoutSummary() {
  const { plan, addOns, delivery, promoCode, promoDiscount, applyPromoCode, clearPromoCode } =
    useCartStore();

  const [promoInput, setPromoInput] = useState("");
  const [promoMsg, setPromoMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const zone = delivery?.zone ? getDeliveryZoneById(delivery.zone) : undefined;
  const deliveryFee = delivery?.useHub ? 0 : (zone?.price ?? 0);

  const summary = calculateOrderSummary(plan, addOns, deliveryFee, promoDiscount);
  const impact = plan ? buildImpactSummary(summary) : null;

  function handleApplyPromo() {
    const result = applyPromoCode(promoInput);
    setPromoMsg({ text: result.message, ok: result.success });
    if (result.success) setPromoInput("");
  }

  return (
    <div className="bg-white rounded-3xl border border-sage-100 shadow-card overflow-hidden">
      <div className="bg-gradient-to-r from-sage-50 to-cream-50 px-6 py-4 border-b border-sage-100">
        <h3 className="font-display font-bold text-sage-900 text-lg">Order Summary</h3>
      </div>

      <div className="px-6 py-5 space-y-4">
        {/* Plan */}
        {plan ? (
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-sage-900 text-sm">{plan.name} Plan</p>
              <p className="text-xs text-gray-400">Annual · 12-month plan</p>
            </div>
            <span className="font-semibold text-sage-900 text-sm">
              ₦{plan.price.toLocaleString()}
            </span>
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">No plan selected</p>
        )}

        {/* Add-ons */}
        {addOns.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Add-Ons</p>
            {addOns.map((a) => (
              <div key={a.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{a.name}</span>
                <span className="text-sage-800">+₦{a.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}

        {/* Delivery */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            {delivery?.useHub ? "Hub Pickup" : `Delivery (${zone?.label ?? "—"})`}
          </span>
          <span className={deliveryFee === 0 ? "text-sage-500 font-semibold" : "text-sage-800"}>
            {deliveryFee === 0 ? "FREE" : `₦${deliveryFee.toLocaleString()}`}
          </span>
        </div>

        {/* Promo */}
        {promoDiscount > 0 ? (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">
              Promo <span className="font-mono text-xs bg-sage-100 px-1.5 py-0.5 rounded">{promoCode}</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sage-500 font-semibold">−₦{summary.promoDiscount.toLocaleString()}</span>
              <button
                onClick={clearPromoCode}
                className="text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Promo Code</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                placeholder="Enter code"
                className="flex-1 px-3 py-2 text-sm border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-sage-400"
                onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
              />
              <button
                onClick={handleApplyPromo}
                className="px-4 py-2 bg-sage-100 hover:bg-sage-200 text-sage-700 text-sm font-semibold rounded-xl transition-colors"
              >
                Apply
              </button>
            </div>
            {promoMsg && (
              <p className={`text-xs mt-1.5 ${promoMsg.ok ? "text-sage-600" : "text-red-500"}`}>
                {promoMsg.text}
              </p>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-sage-100 pt-4">
          <div className="flex justify-between items-center">
            <span className="font-bold text-sage-900">Total</span>
            <span className="font-display text-2xl font-bold text-sage-900">₦{summary.total.toLocaleString()}</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Billed annually · Cancel anytime
          </p>
        </div>

        {/* Impact summary */}
        {impact && (
          <div className="bg-gradient-to-br from-sage-50 to-coral-50 rounded-2xl p-4 border border-sage-100">
            <p className="text-xs font-bold text-sage-700 uppercase tracking-wide mb-3">
              Your Impact This Year
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-sage-700">
                <span>🌸</span>
                <span>{impact.girls} girl{impact.girls !== 1 ? "s" : ""} funded with a full year's supply</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-sage-700">
                <span>📚</span>
                <span>{impact.schoolDaysProtected.toLocaleString()} school days protected</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-sage-700">
                <span>🌿</span>
                <span>{impact.co2Saved} CO₂ saved vs disposables</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
