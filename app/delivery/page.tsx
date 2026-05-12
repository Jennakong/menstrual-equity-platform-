"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import type { DeliveryZoneId } from "@/types";

// ─── Nigerian states mapped to their nearest fulfillment hub ───────────────────

type HubId = "lagos" | "abuja" | "south-south";

const NIGERIAN_STATES: { value: string; label: string; hub: HubId }[] = [
  { value: "lagos", label: "Lagos", hub: "lagos" },
  { value: "ogun", label: "Ogun", hub: "lagos" },
  { value: "oyo", label: "Oyo", hub: "lagos" },
  { value: "osun", label: "Osun", hub: "lagos" },
  { value: "ekiti", label: "Ekiti", hub: "lagos" },
  { value: "kwara", label: "Kwara", hub: "lagos" },
  { value: "ondo", label: "Ondo", hub: "lagos" },
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

const HUB_CONFIG: Record<HubId, {
  name: string;
  city: string;
  address: string;
  costRange: string;
  days: string;
  zone: DeliveryZoneId;
  accent: string;
  accentLight: string;
  accentBorder: string;
  dot: string;
  icon: string;
}> = {
  lagos: {
    name: "Lagos Hub",
    city: "Lagos",
    address: "Victoria Island, Lagos",
    costRange: "₦2,500 – ₦5,000",
    days: "1–2 business days",
    zone: "lagos",
    accent: "text-coral-600",
    accentLight: "bg-coral-50",
    accentBorder: "border-coral-200",
    dot: "bg-coral-400",
    icon: "🏙️",
  },
  abuja: {
    name: "Abuja Hub",
    city: "Abuja",
    address: "Wuse 2, Abuja",
    costRange: "₦3,000 – ₦7,000",
    days: "2–4 business days",
    zone: "abuja",
    accent: "text-sage-700",
    accentLight: "bg-sage-50",
    accentBorder: "border-sage-200",
    dot: "bg-sage-500",
    icon: "🏛️",
  },
  "south-south": {
    name: "Calabar Hub",
    city: "Calabar",
    address: "GRA, Calabar",
    costRange: "₦5,000 – ₦10,000",
    days: "3–5 business days",
    zone: "south-south",
    accent: "text-blush-600",
    accentLight: "bg-blush-50",
    accentBorder: "border-blush-200",
    dot: "bg-blush-400",
    icon: "🌿",
  },
};

const ALL_HUBS: HubId[] = ["lagos", "abuja", "south-south"];

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
  const activeHubId: HubId | null = country === "international" ? null : (selectedState?.hub ?? null);
  const zone: DeliveryZoneId = country === "international" ? "international" : (HUB_CONFIG[activeHubId ?? "lagos"]?.zone ?? "lagos");

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full name is required";
    if (!email.trim() || !email.includes("@")) errs.email = "Valid email is required";
    if (!phone.trim()) errs.phone = "Phone number is required";
    if (country === "nigeria" && !stateVal) errs.state = "Please select a state";
    if (!city.trim()) errs.city = "City is required";
    if (!address.trim()) errs.address = "Delivery address is required";
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
    `w-full px-4 py-3.5 rounded-2xl border text-sm text-sage-900 placeholder-gray-400 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-sage-300 ${
      errors[field]
        ? "border-red-300 focus:ring-red-200"
        : "border-gray-200 hover:border-sage-300 focus:border-sage-400"
    }`;

  const labelCls = "block text-xs font-semibold text-sage-700 mb-1.5 tracking-wide uppercase";

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50">

      {/* ── Page header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-coral-500 mb-3">
              <span className="w-1.5 h-1.5 bg-coral-400 rounded-full" />
              Step 3 of 4
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-sage-900 leading-tight">
              Delivery Information
            </h1>
            <p className="mt-3 text-gray-500 text-base sm:text-lg leading-relaxed">
              We distribute through our Lagos, Abuja, and Calabar fulfillment hubs.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">

          {/* ── LEFT: Form ── */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Contact info */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-coral-100 text-coral-600 text-xs font-bold flex items-center justify-center">
                    1
                  </div>
                  <h2 className="font-semibold text-sage-900 text-sm">Contact Details</h2>
                </div>
              </div>

              <div className="px-6 py-6 space-y-5">
                <div>
                  <label className={labelCls}>Full Name</label>
                  <input
                    type="text"
                    className={inputCls("fullName")}
                    placeholder="e.g. Adaeze Okonkwo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {errors.fullName && <p className="text-xs text-red-500 mt-1.5">{errors.fullName}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>Email Address</label>
                    <input
                      type="email"
                      className={inputCls("email")}
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
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
                    {errors.phone && <p className="text-xs text-red-500 mt-1.5">{errors.phone}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery address */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-sage-100 text-sage-600 text-xs font-bold flex items-center justify-center">
                    2
                  </div>
                  <h2 className="font-semibold text-sage-900 text-sm">Delivery Address</h2>
                </div>
              </div>

              <div className="px-6 py-6 space-y-5">
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
                    <option value="international">International</option>
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
                    {errors.state && <p className="text-xs text-red-500 mt-1.5">{errors.state}</p>}
                  </div>
                )}

                {/* City */}
                <div>
                  <label className={labelCls}>City</label>
                  <input
                    type="text"
                    className={inputCls("city")}
                    placeholder="e.g. Lagos Island"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {errors.city && <p className="text-xs text-red-500 mt-1.5">{errors.city}</p>}
                </div>

                {/* Full address */}
                <div>
                  <label className={labelCls}>Delivery Address</label>
                  <textarea
                    className={`${inputCls("address")} resize-none`}
                    rows={3}
                    placeholder="House number, street name, area or estate"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {errors.address && <p className="text-xs text-red-500 mt-1.5">{errors.address}</p>}
                </div>

                {country === "international" && (
                  <div className="flex gap-3 bg-amber-50 border border-amber-100 rounded-2xl p-4">
                    <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      International shipping is available. Final costs are confirmed after order placement — estimated 7–14 business days.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="w-full bg-coral-500 hover:bg-coral-600 active:scale-[0.99] text-white font-bold py-4 rounded-2xl transition-all shadow-soft hover:shadow-card text-base flex items-center justify-center gap-2.5"
            >
              Continue to Checkout
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            {/* Trust pills */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🌿", label: "Eco Packaging" },
                { icon: "📦", label: "Discreet Delivery" },
                { icon: "🔒", label: "Secure Checkout" },
              ].map(({ icon, label }) => (
                <div key={label} className="bg-white border border-gray-100 rounded-2xl p-3 flex flex-col items-center gap-1.5 text-center shadow-soft">
                  <span className="text-xl">{icon}</span>
                  <p className="text-xs font-medium text-sage-700 leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </form>

          {/* ── RIGHT: Delivery summary ── */}
          <div className="lg:sticky lg:top-24 space-y-5">

            {/* Fulfillment hubs */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-sage-50 to-cream-50">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="font-semibold text-sage-900 text-sm">Fulfillment Hubs</h3>
                </div>
              </div>

              <div className="px-6 py-5 space-y-3">
                {ALL_HUBS.map((hubId) => {
                  const h = HUB_CONFIG[hubId];
                  const isActive = hubId === activeHubId;
                  return (
                    <div
                      key={hubId}
                      className={`rounded-2xl border p-4 transition-all ${
                        isActive
                          ? `${h.accentBorder} ${h.accentLight} shadow-soft`
                          : "border-gray-100 bg-gray-50/50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xl leading-none">{h.icon}</span>
                          <div>
                            <p className={`font-semibold text-sm ${isActive ? h.accent : "text-sage-800"}`}>
                              {h.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">{h.address}</p>
                          </div>
                        </div>
                        {isActive && (
                          <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-white bg-coral-400 px-2.5 py-1 rounded-full">
                            Yours
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className={`font-semibold ${isActive ? h.accent : "text-gray-500"}`}>
                          {h.costRange}
                        </span>
                        <span className="text-gray-400">{h.days}</span>
                      </div>
                    </div>
                  );
                })}

                {!activeHubId && country === "nigeria" && (
                  <p className="text-xs text-gray-400 text-center pt-1">
                    Select your state to see your nearest hub highlighted.
                  </p>
                )}
              </div>
            </div>

            {/* Delivery estimates */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-sage-900 text-sm">Delivery Estimates</h3>
              </div>
              <div className="px-6 py-5 space-y-3">
                {[
                  { label: "Lagos", cost: "₦2,500 – ₦5,000", days: "1–2 days", dot: "bg-coral-400" },
                  { label: "Abuja", cost: "₦3,000 – ₦7,000", days: "2–4 days", dot: "bg-sage-500" },
                  { label: "South-South", cost: "₦5,000 – ₦10,000", days: "3–5 days", dot: "bg-blush-400" },
                  { label: "International", cost: "Contact us", days: "7–14 days", dot: "bg-gray-400" },
                ].map(({ label, cost, days, dot }) => (
                  <div key={label} className="flex items-center justify-between text-xs py-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
                      <span className="text-sage-800 font-medium">{label}</span>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <span className="text-gray-400">{days}</span>
                      <span className="font-semibold text-sage-900 w-28 text-right">{cost}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Free delivery notice */}
            <div className="bg-gradient-to-br from-sage-50 to-cream-50 border border-sage-100 rounded-3xl px-6 py-5 flex gap-4 items-start">
              <div className="w-9 h-9 bg-white rounded-xl shadow-soft flex items-center justify-center shrink-0 text-lg">
                🎁
              </div>
              <div>
                <p className="font-semibold text-sage-900 text-sm">Free Delivery Available</p>
                <p className="text-xs text-sage-600 mt-1 leading-relaxed">
                  Free delivery available on qualifying orders. Eligibility confirmed at checkout.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
