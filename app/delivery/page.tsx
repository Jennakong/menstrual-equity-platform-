"use client";

import { useRouter } from "next/navigation";
import DeliveryForm from "@/components/DeliveryForm";
import CheckoutSummary from "@/components/CheckoutSummary";
import { useCartStore } from "@/store/useCartStore";

export default function DeliveryPage() {
  const router = useRouter();
  const plan = useCartStore((s) => s.plan);

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
          <span className="font-semibold text-sage-700 bg-sage-100 px-2.5 py-1 rounded-full">
            3. Delivery
          </span>
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
                Delivery Details
              </h1>
              <p className="mt-2 text-gray-500">
                Tell us where to send your first shipment. Free pickup available in major cities.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-sage-100 shadow-soft p-6 sm:p-8">
              <DeliveryForm />
            </div>

            {/* Shipping promise */}
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {[
                { icon: "🌿", title: "Eco Packaging", desc: "Plastic-free, fully compostable" },
                { icon: "📦", title: "Discreet Delivery", desc: "Plain outer packaging always" },
                { icon: "🔄", title: "Easy Returns", desc: "30-day no-questions policy" },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl border border-sage-100 p-4 flex gap-3 items-start shadow-soft">
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="font-semibold text-sage-800 text-sm">{title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
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
