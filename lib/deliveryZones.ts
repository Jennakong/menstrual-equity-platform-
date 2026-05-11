import type { DeliveryZone } from "@/types";

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: "nairobi",
    label: "Nairobi (CBD & Estates)",
    price: 0,
    estimatedDays: "1–2 business days",
    hubAvailable: true,
  },
  {
    id: "mombasa",
    label: "Mombasa",
    price: 5,
    estimatedDays: "2–3 business days",
    hubAvailable: true,
  },
  {
    id: "kisumu",
    label: "Kisumu",
    price: 5,
    estimatedDays: "2–3 business days",
    hubAvailable: true,
  },
  {
    id: "nakuru",
    label: "Nakuru",
    price: 4,
    estimatedDays: "2–3 business days",
    hubAvailable: false,
  },
  {
    id: "other-kenya",
    label: "Other Kenya Regions",
    price: 8,
    estimatedDays: "3–5 business days",
    hubAvailable: false,
  },
  {
    id: "international",
    label: "International Shipping",
    price: 18,
    estimatedDays: "7–14 business days",
    hubAvailable: false,
  },
];

export function getDeliveryZoneById(id: string): DeliveryZone | undefined {
  return DELIVERY_ZONES.find((z) => z.id === id);
}
