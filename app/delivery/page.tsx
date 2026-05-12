"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import CheckoutSummary from "@/components/CheckoutSummary";
import type { DeliveryZoneId } from "@/types";

// ─── Nigerian states mapped to their nearest fulfillment hub ───────────────────

type HubId = "lagos" | "abuja" | "south-south";

const NIGERIAN_STATES: { value: string; label: string; hub: HubId }[] = [
  // Lagos hub
  { value: "lagos", label: "Lagos", hub: "lagos" },
  { value: "ogun", label: "Ogun", hub: "lagos" },
  { value: "oyo", label: "Oyo", hub: "lagos" },
  { value: "osun", label: "Osun", hub: "lagos" },
  { value: "ekiti", label: "Ekiti", hub: "lagos" },
  { value: "kwara", label: "Kwara", hub: "lagos" },
  { value: "ondo", label: "Ondo", hub: "lagos" },
  // Abuja hub
  { value: "fct", label: "FCT (Abuja)", hub: "abuja" },
  { value: "kogi", label: "Kogi", hub: "abuja" },
  { value: "niger", label: "Niger", hub: "abuja" },
  { value: "nasarawa", label: "Nasarawa", hub: "abuja" },
  { value: "benue", label: "Benue", hub: "abuja" },
  { value: "kaduna", label: "Kaduna", hub: "abuja" },
  { value: "kano", label: "Kano", hub: "abuja" },
  { value: "plateau", label: "Plateau", hub: "abuja" },
  { value: "sokoto", label: "Sokoto", hub: "abuja" },
  { value: "kebbi", label: "Kebbi", hub: "abuja" },
  { value: "zamfara", label: "Zamfara", hub: "abuja" },
  { value: "katsina", label: "Katsina", hub: "abuja" },
  { value: "jigawa", label: "Jigawa", hub: "abuja" },
  { value: "gombe", label: "Gombe", hub: "abuja" },
  { value: "taraba", label: "Taraba", hub: "abuja" },
  { value: "adamawa", label: "Adamawa", hub: "abuja" },
  { value: "yobe", label: "Yobe", hub: "abuja" },
  { value: "borno", label: "Borno", hub: "abuja" },
  // Calabar hub (South-South + South-East)
  { value: "rivers", label: "Rivers", hub: "south-south" },
  { value: "delta", label: "Delta", hub: "south-south" },
  { value: "edo", label: "Edo", hub: "south-south" },
  { value: "cross-river", label: "Cross River", hub: "south-south" },
  { value: "akwa-ibom", label: "Akwa Ibom", hub: "south-south" },
  { value: "bayelsa", label: "Bayelsa", hub: "south-south" },
  { value: "anambra", label: "Anambra", hub: "south-south" },
  { value: "imo", label: "Imo", hub: "south-south" },
  { value: "abia", label: "Abia", hub: "south-south" },
  { value: "enugu", label: "Enugu", hub: "south-south" },
  { value: "ebonyi", label: "Ebonyi", hub: "south-south" },
];

// ─── Hub display config ────────────────────────────────────────────────────────

const HUB_CONFIG: Record<HubId, {
  name: string;
  location: string;
  costRange: string;
  costFrom: number;
  days: string;
  zone: DeliveryZoneId;
  bg: string;
  border: string;
  text: string;
  iconBg: string;
  dot: string;
}> = {
  lagos: {
    name: "Lagos Hub",
    location: "Victoria Island, Lagos",
    costRange: "₦2,500 – ₦5,000",
    costFrom: 2500,
    days: "1–2 business days",
    zone: "lagos",
    bg: "bg-coral-50",
    border: "border-coral-200",
    text: "text-coral-700",
    iconBg: "bg-coral-100",
    dot: "bg-coral-400",
  },
  abuja: {
    name: "Abuja Hub",
    location: "Wuse 2, Abuja",
    costRange: "₦3,000 – ₦7,000",
    costFrom: 3000,
    days: "2–4 business days",
    zone: "abuja",
    bg: "bg-sage-50",
    border: "border-sage-200",
    text: "text-sage-700",
    iconBg: "bg-sage-100",
    dot: "bg-sage-500",
  },
  "south-south": {
    name: "Calabar Hub",
    location: "GRA, Calabar",
    costRange: "₦5,000 – ₦10,000",
    costFrom: 5000,
    days: "3–5 business days",
    zone: "south-south",
    bg: "bg-blush-50",
    border: "border-blush-200",
    text: "text-blush-700",
    iconBg: "bg-blush-100",
    dot: "bg-blush-400",
  },
};

const COST_GUIDE = [
  { hub: "Lagos", cost: "₦2,500–₦5,000", days: "1–2 days", dot: "bg-coral-400" },
  { hub: "Abuja", cost: "₦3,000–₦7,000", days: "2–4 days", dot: "bg-sage-500" },
  { hub: "South-South", cost: "₦5,000–₦10,000", days: "3–5 days", dot: "bg-blush-400" },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function DeliveryPage() {
  const router = useRouter();
  const setDelivery = useCartStore((s) => s.setDelivery);

  const [country, setCountry] = useState("nigeria");
  const [stateVal, setStateVal] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedState = NIGERIAN_STATES.find((s) => s.value === stateVal);
  const hubId: HubId | null = country === "international" ? null : (selectedState?.hub ?? null);
  const hub = hubId ? HUB_CONFIG[hubId] : null;
  const zone: DeliveryZoneId = country === "international" ? "international" : (hub?.zone ?? "lagos");

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full name is required";
    if (!phone.trim()) errs.phone = "Phone number is required";
    if (!email.trim() || !email.includes("@")) errs.email = "Valid email is required";
    if (country === "nigeria" && !stateVal) errs.state = "Please select a state";
    if (!city.trim()) errs.city = "City is required";
    if (!address.trim()) errs.address = "Full address is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setDelivery({
      fullName,
      phone,
      email,
      addressLine1: address,
      city,
      state: stateVal,
      country,
      zone,
      useHub: false,
    });
    router.push("/checkout");
  }

  const inputCls = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-sage-400 bg-white ${
      errors[field]
        ? "border-red-300 focus:ring-red-300"
        : "border-sage-200 focus:border-sage-400"
    }`;

  const labelCls = "block text-xs font-semibold text-sage-700 mb-1.5 uppercase tracking-wide";

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white">

      {/* ── Progress bar ── */}
      <div className="bg-white border-b border-sage-100 px-4 py-3 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs overflow-x-auto">
          {[
            { label: "1. Choose Plan", href: "/choose-path" },
            { label: "2. Add-Ons", href: "/add-ons" },
          ].map(({ label, href }) => (
            <div key={label} className="flex items-center gap-2 shrink-0">
              <span
                onClick={() => router.push(href)}
                className="cursor-pointer text-gray-400 hover:text-sage-600 transition-colors whitespace-nowrap"
              >
                {label}
              </span>
              <span className="text-gray-300">›</span>
            </div>
          ))}
          <span className="flex items-center gap-1.5 font-bold text-sage-700 bg-sage-100 px-3 py-1.5 rounded-full whitespace-nowrap shrink-0">
            <span className="w-1.5 h-1.5 bg-sage-500 rounded-full" />
            3. Delivery
          </span>
          <span className="text-gray-300 shrink-0">›</span>
          <span className="text-gray-400 whitespace-nowrap shrink-0">4. Checkout</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">

          {/* ── LEFT: Form ── */}
          <div>
            <div className="mb-8">
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-coral-500 mb-2">
                Step 3 of 4
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-sage-900">
                Delivery Details
              </h1>
              <p className="mt-2 text-gray-500 text-sm">
                Tell us where to send your first shipment.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Contact details */}
              <div className="bg-white rounded-3xl border border-sage-100 shadow-soft p-6 sm:p-8">
                <h2 className="font-semibold text-sage-900 mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-sage-100 text-sage-600 text-xs font-bold flex items-center justify-center">1</span>
                  Contact Details
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Full Name</label>
                    <input
                      type="text"
                      className={inputCls("fullName")}
                      placeholder="Adaeze Okonkwo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Phone Number</label>
                    <input
                      type="tel"
                      className={inputCls("phone")}
                      placeholder="+234 801 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div className="mt-4">
                  <label className={labelCls}>Email Address</label>
                  <input
                    type="email"
                    className={inputCls("email")}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Delivery address */}
              <div className="bg-white rounded-3xl border border-sage-100 shadow-soft p-6 sm:p-8">
                <h2 className="font-semibold text-sage-900 mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-sage-100 text-sage-600 text-xs font-bold flex items-center justify-center">2</span>
                  Delivery Address
                </h2>

                <div className="space-y-4">
                  {/* Country */}
                  <div>
                    <label className={labelCls}>Country</label>
                    <select
                      className={inputCls("country")}
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                        setStateVal("");
                      }}
                    >
                      <option value="nigeria">Nigeria</option>
                      <option value="international">Other Country (International)</option>
                    </select>
                  </div>

                  {/* State — Nigeria only */}
                  {country === "nigeria" && (
                    <div>
                      <label className={labelCls}>State</label>
                      <select
                        className={inputCls("state")}
                        value={stateVal}
                        onChange={(e) => setStateVal(e.target.value)}
                      >
                        <option value="">Select your state</option>
                        {NIGERIAN_STATES.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                      {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                    </div>
                  )}

                  {/* City */}
                  <div>
                    <label className={labelCls}>City</label>
                    <input
                      type="text"
                      className={inputCls("city")}
                      placeholder="Lagos"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                  </div>

                  {/* Full address */}
                  <div>
                    <label className={labelCls}>Full Address</label>
                    <textarea
                      className={`${inputCls("address")} resize-none`}
                      rows={3}
                      placeholder="House number, street name, area / estate"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                  </div>
                </div>

                {/* International note */}
                {country === "international" && (
                  <div className="mt-4 bg-cream-50 border border-cream-200 rounded-2xl p-4 flex gap-3">
                    <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      International shipping costs will be confirmed after order placement.
                      Estimated delivery: 7–14 business days.
                    </p>
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-coral-500 hover:bg-coral-600 active:scale-[0.99] text-white font-bold py-4 rounded-2xl transition-all shadow-soft hover:shadow-card text-base flex items-center justify-center gap-2"
              >
                Continue to Checkout
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              {/* Trust chips */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: "🌿", label: "Eco Packaging" },
                  { icon: "📦", label: "Discreet Delivery" },
                  { icon: "🔒", label: "Secure Checkout" },
                ].map(({ icon, label }) => (
                  <div key={label} className="bg-white border border-sage-100 rounded-2xl p-3 flex flex-col items-center gap-1.5 text-center shadow-soft">
                    <span className="text-lg">{icon}</span>
                    <p className="text-xs font-medium text-sage-700">{label}</p>
                  </div>
                ))}
              </div>
            </form>
          </div>

          {/* ── RIGHT: Hub info + order summary ── */}
          <div className="lg:sticky lg:top-24 space-y-5">

            {/* Hub info panel */}
            <div className="bg-white rounded-3xl border border-sage-100 shadow-card overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-sage-50 to-cream-50 px-6 py-4 border-b border-sage-100">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="font-semibold text-sage-900 text-sm">Fulfillment Hub</h3>
                </div>
              </div>

              <div className="px-6 py-5 space-y-5">

                {/* Static message */}
                <div className="bg-sage-50 border border-sage-100 rounded-2xl px-4 py-3">
                  <p className="text-xs text-sage-700 leading-relaxed">
                    Your order will be fulfilled from your nearest hub:{" "}
                    <span className="font-semibold">Lagos, Abuja, or Calabar.</span>
                  </p>
                </div>

                {/* Dynamic hub card — shown once state is selected */}
                {hub ? (
                  <div className={`rounded-2xl border ${hub.border} ${hub.bg} p-4`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl ${hub.iconBg} flex items-center justify-center shrink-0`}>
                        <svg className={`w-5 h-5 ${hub.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm ${hub.text}`}>{hub.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{hub.location}</p>
                      </div>
                      <span className={`w-2 h-2 rounded-full ${hub.dot} shrink-0 mt-1.5`} />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1">Delivery Cost</p>
                        <p className={`font-bold text-sm ${hub.text}`}>{hub.costRange}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1">Est. Delivery</p>
                        <p className={`font-semibold text-sm ${hub.text}`}>{hub.days}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-sage-200 p-4 text-center">
                    <p className="text-xs text-gray-400">
                      Select your state above to see your nearest hub and delivery cost.
                    </p>
                  </div>
                )}

                {/* Delivery cost guide */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Delivery Cost Guide
                  </p>
                  <div className="space-y-2">
                    {COST_GUIDE.map(({ hub: hubName, cost, days, dot }) => (
                      <div key={hubName} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
                          <span className="text-sage-800 font-medium">{hubName}</span>
                        </div>
                        <div className="flex items-center gap-3 text-right">
                          <span className="text-gray-500">{days}</span>
                          <span className="font-semibold text-sage-900">{cost}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Order summary */}
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
