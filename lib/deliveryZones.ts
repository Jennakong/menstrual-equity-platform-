import type { DeliveryZone } from "@/types";

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: "lagos",
    label: "Lagos Hub Region",
    price: 2500,
    estimatedDays: "1–2 business days",
    hubAvailable: true,
  },
  {
    id: "abuja",
    label: "Abuja Hub Region",
    price: 3000,
    estimatedDays: "2–4 business days",
    hubAvailable: true,
  },
  {
    id: "south-south",
    label: "South-South (Calabar Hub)",
    price: 5000,
    estimatedDays: "3–5 business days",
    hubAvailable: true,
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
