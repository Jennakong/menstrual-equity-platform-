import type { DeliveryZone } from "@/types";

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: "lagos",
    label: "Lagos (Island & Mainland)",
    price: 0,
    estimatedDays: "1–2 business days",
    hubAvailable: true,
  },
  {
    id: "abuja",
    label: "Abuja (FCT)",
    price: 2000,
    estimatedDays: "2–3 business days",
    hubAvailable: true,
  },
  {
    id: "port-harcourt",
    label: "Port Harcourt",
    price: 2500,
    estimatedDays: "2–3 business days",
    hubAvailable: true,
  },
  {
    id: "ibadan",
    label: "Ibadan",
    price: 2000,
    estimatedDays: "2–3 business days",
    hubAvailable: false,
  },
  {
    id: "kano",
    label: "Kano",
    price: 3000,
    estimatedDays: "3–5 business days",
    hubAvailable: false,
  },
  {
    id: "other-nigeria",
    label: "Other Nigerian Cities",
    price: 4000,
    estimatedDays: "3–5 business days",
    hubAvailable: false,
  },
  {
    id: "international",
    label: "International Shipping",
    price: 15000,
    estimatedDays: "7–14 business days",
    hubAvailable: false,
  },
];

export function getDeliveryZoneById(id: string): DeliveryZone | undefined {
  return DELIVERY_ZONES.find((z) => z.id === id);
}
