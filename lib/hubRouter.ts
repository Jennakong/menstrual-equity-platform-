import type { DeliveryHub, DeliveryZoneId } from "@/types";

export const DELIVERY_HUBS: DeliveryHub[] = [
  {
    id: "hub-lag-vi",
    name: "Victoria Island Hub",
    address: "Civic Tower, Ozumba Mbadiwe Ave, Victoria Island, Lagos",
    zone: "lagos",
    openHours: "Mon–Sat 8am–8pm",
  },
  {
    id: "hub-lag-ikeja",
    name: "Ikeja Hub",
    address: "Ikeja City Mall, Obafemi Awolowo Way, Ikeja, Lagos",
    zone: "lagos",
    openHours: "Mon–Sun 9am–8pm",
  },
  {
    id: "hub-lag-lekki",
    name: "Lekki Hub",
    address: "The Palms Shopping Mall, Bisway St, Lekki, Lagos",
    zone: "lagos",
    openHours: "Mon–Sun 9am–7pm",
  },
  {
    id: "hub-abj-wuse",
    name: "Wuse 2 Hub",
    address: "Jabi Lake Mall, Jabi, Abuja",
    zone: "abuja",
    openHours: "Mon–Sat 9am–7pm",
  },
  {
    id: "hub-ph-gra",
    name: "GRA Hub",
    address: "Genesis Centre, Peter Odili Rd, Port Harcourt",
    zone: "port-harcourt",
    openHours: "Mon–Sat 8am–7pm",
  },
];

export function getHubsByZone(zone: DeliveryZoneId): DeliveryHub[] {
  return DELIVERY_HUBS.filter((h) => h.zone === zone);
}

export function getHubById(id: string): DeliveryHub | undefined {
  return DELIVERY_HUBS.find((h) => h.id === id);
}
