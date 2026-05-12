// ─── Subscription Plans ───────────────────────────────────────────────────────

export type PlanTier = "essentials" | "comfort" | "premium";

export interface SubscriptionPlan {
  id: PlanTier;
  name: string;
  tagline: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  color: string;
  impactStatement: string;
}

// ─── Add-Ons ──────────────────────────────────────────────────────────────────

export type AddOnId =
  | "cramp-relief"
  | "heating-pad"
  | "wellness-tea"
  | "self-care-kit"
  | "organic-upgrade"
  | "extra-impact"
  | "sponsor-girl"
  | "school-kit"
  | "double-impact";

export interface AddOn {
  id: AddOnId;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
}

// ─── Delivery ─────────────────────────────────────────────────────────────────

export type DeliveryZoneId = "lagos" | "abuja" | "south-south" | "international";

export interface DeliveryZone {
  id: DeliveryZoneId;
  label: string;
  price: number;
  estimatedDays: string;
  hubAvailable: boolean;
}

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  country?: string;
  zone: DeliveryZoneId;
  useHub: boolean;
  hubId?: string;
}

// ─── Delivery Hubs ────────────────────────────────────────────────────────────

export interface DeliveryHub {
  id: string;
  name: string;
  address: string;
  zone: DeliveryZoneId;
  openHours: string;
}

// ─── Cart / Order ─────────────────────────────────────────────────────────────

export interface CartState {
  plan: SubscriptionPlan | null;
  addOns: AddOn[];
  delivery: DeliveryAddress | null;
  promoCode: string;
  promoDiscount: number;
}

export interface OrderSummary {
  subtotal: number;
  addOnsTotal: number;
  deliveryFee: number;
  promoDiscount: number;
  total: number;
  impactCount: number;
}

// ─── Impact ───────────────────────────────────────────────────────────────────

export interface ImpactStat {
  value: string;
  label: string;
  description: string;
  icon: string;
}

export interface ImpactStory {
  id: string;
  name: string;
  age: number;
  location: string;
  story: string;
  image: string;
}

// ─── Corporate ────────────────────────────────────────────────────────────────

export interface CorporatePackage {
  id: string;
  name: string;
  minSeats: number;
  pricePerSeat: number;
  features: string[];
  impactMultiplier: number;
}

export interface CorporateInquiry {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  employeeCount: string;
  message: string;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}
