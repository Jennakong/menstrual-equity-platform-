import type { DeliveryHub, DeliveryZoneId } from "@/types";

export const DELIVERY_HUBS: DeliveryHub[] = [
  {
    id: "hub-nbi-westlands",
    name: "Westlands Hub",
    address: "Sarit Centre, Westlands, Nairobi",
    zone: "nairobi",
    openHours: "Mon–Sat 8am–8pm",
  },
  {
    id: "hub-nbi-cbd",
    name: "CBD Hub",
    address: "Anniversary Towers, University Way, Nairobi CBD",
    zone: "nairobi",
    openHours: "Mon–Fri 8am–6pm",
  },
  {
    id: "hub-nbi-karen",
    name: "Karen Hub",
    address: "Karen Shopping Centre, Karen Road, Nairobi",
    zone: "nairobi",
    openHours: "Mon–Sun 9am–7pm",
  },
  {
    id: "hub-msa-nyali",
    name: "Nyali Hub",
    address: "City Mall Nyali, Mombasa",
    zone: "mombasa",
    openHours: "Mon–Sun 9am–8pm",
  },
  {
    id: "hub-ksm-central",
    name: "Kisumu Central Hub",
    address: "Mega City Mall, Kisumu",
    zone: "kisumu",
    openHours: "Mon–Sat 8am–7pm",
  },
];

export function getHubsByZone(zone: DeliveryZoneId): DeliveryHub[] {
  return DELIVERY_HUBS.filter((h) => h.zone === zone);
}

export function getHubById(id: string): DeliveryHub | undefined {
  return DELIVERY_HUBS.find((h) => h.id === id);
}
