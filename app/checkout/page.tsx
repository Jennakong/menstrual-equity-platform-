"use client";

import { useRouter } from "next/navigation";
import CheckoutSummary from "@/components/CheckoutSummary";
import { useCartStore } from "@/store/useCartStore";
import { calculateOrderSummary } from "@/lib/pricing";
import { getDeliveryZoneById } from "@/lib/deliveryZones";

export default function CheckoutPage() {
  const router = useRouter();
  const { plan, addOns, delivery, promoDiscount, resetCart } = useCartStore();

  const zone = delivery?.zone ? getDeliveryZoneById(delivery.zone) : undefined;
  const deliveryFee = delivery?.useHub ? 0 : (zone?.price ?? 0);
  const summary = calculateOrderSummary(plan, addOns, deliveryFee, promoDiscount);

  function handlePlaceOrder() {
    resetCart();
    router.push("/success");
  }

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
          <span
            onClick={() => router.push("/add-ons")}
            className="cursor-pointer hover:text-sage-600 transition-colors"
          >
            2. Add-Ons
          </span>
          <span className="text-gray-300">›</span>
          <span
            onClick={() => router.push("/delivery")}
            className="cursor-pointer hover:text-sage-600 transition-colors"
          >
            3. Delivery
          </span>
          <span className="text-gray-300">›</span>
          <span className="font-semibold text-sage-700 bg-sage-100 px-2.5 py-1 rounded-full">
            4. Checkout
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
          {/* Payment form */}
          <div>
            <div className="mb-8">
              <h1 className="font-display text-4xl font-bold text-sage-900">Checkout</h1>
              <p className="mt-2 text-gray-500">Review your order and complete payment.</p>
            </div>

            {/* Delivery review */}
            {delivery && (
              <div className="bg-white rounded-3xl border border-sage-100 shadow-soft p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sage-900">Delivery To</h3>
                  <button
                    onClick={() => router.push("/delivery")}
                    className="text-xs text-sage-500 hover:text-sage-700 transition-colors"
                  >
                    Edit
                  </button>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium text-sage-800">{delivery.fullName}</p>
                  <p>{delivery.email}</p>
                  <p>{delivery.phone}</p>
                  {delivery.useHub ? (
                    <p className="text-sage-600">Hub Pickup Selected</p>
                  ) : (
                    <>
                      <p>{delivery.addressLine1}{delivery.addressLine2 ? `, ${delivery.addressLine2}` : ""}</p>
                      <p>{delivery.city} · {zone?.label}</p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Payment placeholder */}
            <div className="bg-white rounded-3xl border border-sage-100 shadow-soft p-6 sm:p-8">
              <h3 className="font-semibold text-sage-900 mb-6">Payment Details</h3>

              <div className="space-y-4">
                {/* Card number placeholder */}
                <div>
                  <label className="block text-xs font-semibold text-sage-700 mb-1.5 uppercase tracking-wide">
                    Card Number
                  </label>
                  <div className="w-full px-4 py-3 rounded-xl border border-sage-200 bg-gray-50 text-sm text-gray-400 flex items-center justify-between">
                    <span>Payment integration coming soon</span>
                    <div className="flex gap-1.5">
                      {["V", "M", "P"].map((b) => (
                        <span key={b} className="w-7 h-5 bg-gray-200 rounded text-[10px] flex items-center justify-center font-bold text-gray-400">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-sage-700 mb-1.5 uppercase tracking-wide">
                      Expiry Date
                    </label>
                    <div className="w-full px-4 py-3 rounded-xl border border-sage-200 bg-gray-50 text-sm text-gray-400">
                      MM / YY
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-sage-700 mb-1.5 uppercase tracking-wide">
                      CVV
                    </label>
                    <div className="w-full px-4 py-3 rounded-xl border border-sage-200 bg-gray-50 text-sm text-gray-400">
                      •••
                    </div>
                  </div>
                </div>

                {/* Paystack / mobile money placeholder */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-blue-700 font-bold text-xs">₦</span>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-800 text-sm">Paystack & Bank Transfer Coming Soon</p>
                    <p className="text-xs text-blue-600">We'll be supporting Paystack, Flutterwave, and USSD in our next release.</p>
                  </div>
                </div>
              </div>

              {/* Place order */}
              <button
                onClick={handlePlaceOrder}
                className="w-full mt-8 bg-coral-500 hover:bg-coral-600 text-white font-bold py-4 rounded-2xl transition-all shadow-soft hover:shadow-card text-lg"
              >
                Place Order — ₦{summary.total.toLocaleString()}
              </button>

              <p className="text-center text-xs text-gray-400 mt-3">
                🔒 Secure, encrypted checkout · Cancel anytime
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
