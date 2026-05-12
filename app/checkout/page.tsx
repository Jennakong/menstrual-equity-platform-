"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { calculateOrderSummary } from "@/lib/pricing";
import { getDeliveryZoneById } from "@/lib/deliveryZones";
import { buildImpactSummary } from "@/lib/impactLogic";

type PaymentMethod = "card" | "bank" | "paystack";

export default function CheckoutPage() {
  const router = useRouter();
  const { plan, addOns, delivery, promoCode, promoDiscount, applyPromoCode, clearPromoCode, resetCart } =
    useCartStore();

  const [promoInput, setPromoInput] = useState("");
  const [promoMsg, setPromoMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paystack");
  const [placing, setPlacing] = useState(false);

  const zone = delivery?.zone ? getDeliveryZoneById(delivery.zone) : undefined;
  const deliveryFee = delivery?.useHub ? 0 : (zone?.price ?? 0);
  const summary = calculateOrderSummary(plan, addOns, deliveryFee, promoDiscount);
  const impact = plan ? buildImpactSummary(summary) : null;

  function handleApplyPromo() {
    const result = applyPromoCode(promoInput);
    setPromoMsg({ text: result.message, ok: result.success });
    if (result.success) setPromoInput("");
  }

  function handleCompletePayment() {
    setPlacing(true);
    setTimeout(() => {
      resetCart();
      router.push("/success");
    }, 800);
  }

  const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; description: string; icon: string }[] = [
    { id: "paystack", label: "Paystack", description: "Pay securely via card, bank, or USSD through Paystack", icon: "⚡" },
    { id: "card", label: "Debit / Credit Card", description: "Visa, Mastercard, or Verve cards accepted", icon: "💳" },
    { id: "bank", label: "Bank Transfer", description: "Direct transfer to our Nigerian bank account", icon: "🏦" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50">

      {/* ── Page header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-coral-500 mb-3">
              <span className="w-1.5 h-1.5 bg-coral-400 rounded-full" />
              Step 4 of 4
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-sage-900 leading-tight">
              Review Your Impact
            </h1>
            <p className="mt-3 text-gray-500 text-base sm:text-lg leading-relaxed">
              Every subscription contributes directly to menstrual equity and education support.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">

          {/* ── LEFT: Main checkout flow ── */}
          <div className="space-y-6">

            {/* Order summary */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-sage-50 to-cream-50">
                <h2 className="font-display font-bold text-sage-900 text-lg">Order Summary</h2>
              </div>

              <div className="px-6 py-6 space-y-4">
                {/* Plan row */}
                {plan ? (
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-sage-900">{plan.name} Plan</p>
                      <p className="text-xs text-gray-400 mt-0.5">Annual · 12-month subscription</p>
                    </div>
                    <span className="font-bold text-sage-900 whitespace-nowrap">
                      ₦{plan.price.toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">No plan selected</p>
                )}

                {/* Add-ons */}
                {addOns.length > 0 && (
                  <>
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Add-Ons</p>
                      <div className="space-y-2.5">
                        {addOns.map((a) => (
                          <div key={a.id} className="flex justify-between text-sm">
                            <span className="text-gray-600">{a.name}</span>
                            <span className="text-sage-800 font-medium">+₦{a.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Delivery */}
                <div className="border-t border-gray-100 pt-4 flex justify-between text-sm">
                  <span className="text-gray-600">
                    {delivery?.useHub ? "Hub Pickup" : `Delivery (${zone?.label ?? "—"})`}
                  </span>
                  <span className={deliveryFee === 0 ? "text-sage-500 font-semibold" : "text-sage-800 font-medium"}>
                    {deliveryFee === 0 ? "FREE" : `₦${deliveryFee.toLocaleString()}`}
                  </span>
                </div>

                {/* Promo */}
                {promoDiscount > 0 ? (
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Promo code</span>
                      <span className="font-mono text-xs bg-sage-100 text-sage-700 px-2 py-0.5 rounded-lg">{promoCode}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sage-600 font-semibold">−₦{summary.promoDiscount.toLocaleString()}</span>
                      <button onClick={clearPromoCode} className="text-xs text-red-400 hover:text-red-600 transition-colors">
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
                        placeholder="Enter promo code"
                        className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 hover:border-sage-300 transition-colors"
                        onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="px-4 py-2.5 bg-sage-100 hover:bg-sage-200 text-sage-700 text-sm font-semibold rounded-xl transition-colors"
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

                {/* Total */}
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sage-900 text-base">Total Due</p>
                    <p className="text-xs text-gray-400">Billed annually · Cancel anytime</p>
                  </div>
                  <p className="font-display text-3xl font-bold text-sage-900">
                    ₦{summary.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Impact highlight card */}
            {impact && (
              <div className="bg-gradient-to-br from-sage-800 to-sage-900 rounded-3xl overflow-hidden shadow-elevated">
                <div className="px-6 py-5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌍</span>
                    <h2 className="font-display font-bold text-white text-lg">Your Impact</h2>
                  </div>
                  <p className="mt-2 text-sage-300 text-sm leading-relaxed">
                    You are funding menstrual care access and education continuity for girls in underserved communities.
                  </p>
                </div>

                <div className="px-6 py-6 grid sm:grid-cols-3 gap-4">
                  <div className="bg-white/10 rounded-2xl p-4 text-center border border-white/10">
                    <p className="text-3xl font-display font-bold text-white">
                      {impact.girls}
                    </p>
                    <p className="text-xs text-sage-300 mt-1 font-medium uppercase tracking-wide">
                      {impact.girls === 1 ? "Girl" : "Girls"} Supported
                    </p>
                    <p className="text-xs text-sage-400 mt-2 leading-relaxed">
                      Full 12-month menstrual care supply, funded by you
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-4 text-center border border-white/10">
                    <p className="text-3xl font-display font-bold text-white">
                      {impact.schoolDaysProtected.toLocaleString()}
                    </p>
                    <p className="text-xs text-sage-300 mt-1 font-medium uppercase tracking-wide">
                      School Days Protected
                    </p>
                    <p className="text-xs text-sage-400 mt-2 leading-relaxed">
                      Days girls stay in school instead of missing class
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-4 text-center border border-white/10">
                    <p className="text-3xl font-display font-bold text-white">
                      {impact.co2Saved}
                    </p>
                    <p className="text-xs text-sage-300 mt-1 font-medium uppercase tracking-wide">
                      CO₂ Saved
                    </p>
                    <p className="text-xs text-sage-400 mt-2 leading-relaxed">
                      Compared to conventional disposable products
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-5">
                  <p className="text-xs text-sage-500 text-center">
                    🌸 Impact tracked and reported to you quarterly
                  </p>
                </div>
              </div>
            )}

            {/* Payment section */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-coral-100 text-coral-600 text-xs font-bold flex items-center justify-center">
                    💳
                  </div>
                  <h2 className="font-semibold text-sage-900 text-sm">Payment Method</h2>
                </div>
              </div>

              <div className="px-6 py-6 space-y-3">
                {PAYMENT_OPTIONS.map(({ id, label, description, icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPaymentMethod(id)}
                    className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${
                      paymentMethod === id
                        ? "border-coral-300 bg-coral-50 shadow-soft"
                        : "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-2xl leading-none mt-0.5">{icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm ${paymentMethod === id ? "text-coral-700" : "text-sage-900"}`}>
                        {label}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                      paymentMethod === id ? "border-coral-500 bg-coral-500" : "border-gray-300"
                    }`}>
                      {paymentMethod === id && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </button>
                ))}

                <div className="mt-2 bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3 items-start">
                  <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Payment integration is coming soon. Clicking <strong>Complete Payment</strong> will confirm your order and our team will contact you to process payment via your chosen method.
                  </p>
                </div>
              </div>
            </div>

            {/* Complete payment CTA */}
            <button
              onClick={handleCompletePayment}
              disabled={placing}
              className="w-full bg-coral-500 hover:bg-coral-600 disabled:opacity-70 active:scale-[0.99] text-white font-bold py-5 rounded-2xl transition-all shadow-soft hover:shadow-card text-lg flex items-center justify-center gap-3"
            >
              {placing ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing…
                </>
              ) : (
                <>
                  Complete Payment — ₦{summary.total.toLocaleString()}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400">
              🔒 Your information is encrypted and secure · Cancel anytime
            </p>
          </div>

          {/* ── RIGHT: Delivery + trust ── */}
          <div className="lg:sticky lg:top-24 space-y-5">

            {/* Delivery details */}
            {delivery && (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/60 flex items-center justify-between">
                  <h3 className="font-semibold text-sage-900 text-sm">Delivering To</h3>
                  <button
                    onClick={() => router.push("/delivery")}
                    className="text-xs text-sage-500 hover:text-sage-700 transition-colors font-medium"
                  >
                    Edit
                  </button>
                </div>
                <div className="px-6 py-5 space-y-1.5 text-sm text-gray-600">
                  <p className="font-semibold text-sage-900">{delivery.fullName}</p>
                  <p>{delivery.email}</p>
                  <p>{delivery.phone}</p>
                  {delivery.useHub ? (
                    <p className="text-sage-600">Hub Pickup</p>
                  ) : (
                    <>
                      <p>{delivery.addressLine1}</p>
                      <p className="text-gray-500">{delivery.city} · {zone?.label}</p>
                    </>
                  )}
                  {deliveryFee > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-sm">
                      <span className="text-gray-500">Delivery fee</span>
                      <span className="font-semibold text-sage-900">₦{deliveryFee.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Trust signals */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-soft px-6 py-5">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                You're in safe hands
              </p>
              <div className="space-y-3">
                {[
                  { icon: "🔒", title: "Encrypted Checkout", desc: "Your data is always protected" },
                  { icon: "♻️", title: "Eco-Friendly Products", desc: "Biodegradable, certified organic" },
                  { icon: "🌍", title: "Verified Impact", desc: "Quarterly reports on girls funded" },
                  { icon: "📦", title: "Discreet Packaging", desc: "Plain packaging, no logos outside" },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <span className="text-xl leading-none mt-0.5">{icon}</span>
                    <div>
                      <p className="font-semibold text-sage-900 text-xs">{title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Need help */}
            <div className="bg-sage-50 border border-sage-100 rounded-3xl px-6 py-5 text-center">
              <p className="text-sm font-semibold text-sage-900 mb-1">Need help?</p>
              <p className="text-xs text-sage-600 leading-relaxed">
                Reach us at{" "}
                <span className="font-medium text-coral-600">hello@luwa.com</span>
                {" "}or via WhatsApp — we're happy to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
