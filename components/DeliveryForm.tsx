"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { DELIVERY_ZONES } from "@/lib/deliveryZones";
import { getHubsByZone } from "@/lib/hubRouter";
import type { DeliveryAddress, DeliveryZoneId } from "@/types";

export default function DeliveryForm() {
  const router = useRouter();
  const setDelivery = useCartStore((s) => s.setDelivery);

  const [form, setForm] = useState<DeliveryAddress>({
    fullName: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    zone: "lagos" as const,
    useHub: false,
    hubId: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DeliveryAddress, string>>>({});

  const selectedZone = DELIVERY_ZONES.find((z) => z.id === form.zone);
  const availableHubs = form.zone ? getHubsByZone(form.zone as DeliveryZoneId) : [];

  function set(field: keyof DeliveryAddress, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const newErrors: typeof errors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.email.trim() || !form.email.includes("@")) newErrors.email = "Valid email is required";
    if (!form.useHub && !form.addressLine1.trim()) newErrors.addressLine1 = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (form.useHub && !form.hubId) newErrors.hubId = "Please select a pickup hub";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setDelivery(form);
    router.push("/checkout");
  }

  const inputCls = (field: keyof DeliveryAddress) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-sage-400 ${
      errors[field] ? "border-red-300 bg-red-50" : "border-sage-200 bg-white focus:border-sage-400"
    }`;

  const labelCls = "block text-xs font-semibold text-sage-700 mb-1.5 uppercase tracking-wide";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Full Name</label>
          <input
            type="text"
            className={inputCls("fullName")}
            placeholder="Amara Okafor"
            value={form.fullName}
            onChange={(e) => set("fullName", e.target.value)}
          />
          {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
        </div>
        <div>
          <label className={labelCls}>Phone Number</label>
          <input
            type="tel"
            className={inputCls("phone")}
            placeholder="+234 801 000 0000"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className={labelCls}>Email Address</label>
        <input
          type="email"
          className={inputCls("email")}
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
        />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className={labelCls}>Delivery Zone</label>
        <select
          className={inputCls("zone")}
          value={form.zone}
          onChange={(e) => {
            set("zone", e.target.value);
            set("useHub", false);
            set("hubId", "");
          }}
        >
          {DELIVERY_ZONES.map((zone) => (
            <option key={zone.id} value={zone.id}>
              {zone.label} — {zone.price === 0 ? "Free" : `₦${zone.price.toLocaleString()}`} · {zone.estimatedDays}
            </option>
          ))}
        </select>
      </div>

      {/* Hub pickup toggle */}
      {selectedZone?.hubAvailable && availableHubs.length > 0 && (
        <div className="bg-sage-50 rounded-2xl p-4 border border-sage-100">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 accent-sage-500"
              checked={form.useHub}
              onChange={(e) => {
                set("useHub", e.target.checked);
                if (!e.target.checked) set("hubId", "");
              }}
            />
            <div>
              <p className="text-sm font-semibold text-sage-800">Pick up from a local hub</p>
              <p className="text-xs text-sage-500 mt-0.5">Free pickup — no delivery fee</p>
            </div>
          </label>

          {form.useHub && (
            <div className="mt-4">
              <label className={labelCls}>Select Hub</label>
              <div className="space-y-2">
                {availableHubs.map((hub) => (
                  <label
                    key={hub.id}
                    className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-colors ${
                      form.hubId === hub.id ? "border-sage-500 bg-white" : "border-sage-200 bg-white/60"
                    }`}
                  >
                    <input
                      type="radio"
                      name="hub"
                      value={hub.id}
                      className="mt-0.5 accent-sage-500"
                      checked={form.hubId === hub.id}
                      onChange={() => set("hubId", hub.id)}
                    />
                    <div>
                      <p className="text-sm font-semibold text-sage-800">{hub.name}</p>
                      <p className="text-xs text-gray-400">{hub.address}</p>
                      <p className="text-xs text-sage-500 mt-0.5">{hub.openHours}</p>
                    </div>
                  </label>
                ))}
              </div>
              {errors.hubId && <p className="text-xs text-red-500 mt-1">{errors.hubId}</p>}
            </div>
          )}
        </div>
      )}

      {/* Home delivery fields */}
      {!form.useHub && (
        <>
          <div>
            <label className={labelCls}>Street Address</label>
            <input
              type="text"
              className={inputCls("addressLine1")}
              placeholder="12 Broad Street"
              value={form.addressLine1}
              onChange={(e) => set("addressLine1", e.target.value)}
            />
            {errors.addressLine1 && <p className="text-xs text-red-500 mt-1">{errors.addressLine1}</p>}
          </div>
          <div>
            <label className={labelCls}>Apartment / Floor (optional)</label>
            <input
              type="text"
              className={inputCls("addressLine2")}
              placeholder="Apt 4B"
              value={form.addressLine2}
              onChange={(e) => set("addressLine2", e.target.value)}
            />
          </div>
        </>
      )}

      <div>
        <label className={labelCls}>City</label>
        <input
          type="text"
          className={inputCls("city")}
          placeholder="Lagos"
          value={form.city}
          onChange={(e) => set("city", e.target.value)}
        />
        {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-sage-500 hover:bg-sage-600 text-white font-semibold py-4 rounded-2xl transition-colors shadow-soft hover:shadow-card"
      >
        Continue to Checkout →
      </button>
    </form>
  );
}
