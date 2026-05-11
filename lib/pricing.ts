import type { SubscriptionPlan, AddOn, OrderSummary, PlanFrequency } from "@/types";

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "essentials",
    name: "Essentials",
    tagline: "Everything you need, nothing more",
    monthlyPrice: 18,
    annualPrice: 180,
    color: "sage",
    impactStatement: "Funds 1 girl's supply for the year",
    features: [
      "24 organic pads per month",
      "12-month subscription",
      "Eco-friendly packaging",
      "Impact tracker access",
      "1 girl supported",
    ],
  },
  {
    id: "comfort",
    name: "Comfort",
    tagline: "Premium care for you and her",
    monthlyPrice: 28,
    annualPrice: 280,
    color: "coral",
    isPopular: true,
    impactStatement: "Funds 2 girls' supplies for the year",
    features: [
      "24 organic pads + 12 tampons",
      "Menstrual cup included",
      "Cramp relief roll-on",
      "Priority shipping",
      "Impact tracker + story updates",
      "2 girls supported",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "The full luxury wellness experience",
    monthlyPrice: 45,
    annualPrice: 450,
    color: "blush",
    impactStatement: "Funds 3 girls' supplies for the year",
    features: [
      "Full product suite (pads, tampons, cup, liners)",
      "Wellness extras each month",
      "Dedicated impact report",
      "Free express shipping",
      "Concierge customer care",
      "3 girls supported",
    ],
  },
];

export const ADD_ONS: AddOn[] = [
  {
    id: "cramp-relief",
    name: "Cramp Relief Kit",
    description: "Natural roll-on oil + herbal heat patch combo",
    price: 12,
    image: "/images/addon-cramp-relief.jpg",
    badge: "Best Seller",
  },
  {
    id: "heating-pad",
    name: "Reusable Heating Pad",
    description: "USB-powered, cordless, ultra-soft cover",
    price: 24,
    image: "/images/addon-heating-pad.jpg",
  },
  {
    id: "wellness-tea",
    name: "Wellness Tea Bundle",
    description: "4 blends: Raspberry Leaf, Ginger, Chamomile & Peppermint",
    price: 16,
    image: "/images/addon-tea.jpg",
    badge: "New",
  },
  {
    id: "self-care-kit",
    name: "Self-Care Kit",
    description: "Face mask, body scrub & aromatherapy candle",
    price: 30,
    image: "/images/addon-selfcare.jpg",
  },
  {
    id: "organic-upgrade",
    name: "Organic Upgrade",
    description: "Switch to 100% certified organic cotton across your plan",
    price: 8,
    image: "/images/addon-organic.jpg",
  },
  {
    id: "extra-impact",
    name: "Double Your Impact",
    description: "Fund an extra girl's annual supply — pure giving, no products",
    price: 10,
    image: "/images/addon-impact.jpg",
    badge: "Give More",
  },
];

export function getPlanPrice(plan: SubscriptionPlan, frequency: PlanFrequency): number {
  return frequency === "annual" ? plan.annualPrice : plan.monthlyPrice * 12;
}

export function getAnnualSavings(plan: SubscriptionPlan): number {
  return plan.monthlyPrice * 12 - plan.annualPrice;
}

export function calculateOrderSummary(
  plan: SubscriptionPlan | null,
  frequency: PlanFrequency,
  addOns: AddOn[],
  deliveryFee: number,
  promoDiscount: number
): OrderSummary {
  const subtotal = plan ? getPlanPrice(plan, frequency) : 0;
  const addOnsTotal = addOns.reduce((sum, a) => sum + a.price, 0);
  const discountAmount = Math.round((subtotal + addOnsTotal) * promoDiscount);
  const total = Math.max(0, subtotal + addOnsTotal + deliveryFee - discountAmount);

  const impactCount = plan
    ? plan.id === "essentials"
      ? 1
      : plan.id === "comfort"
      ? 2
      : 3
    : 0;

  return {
    subtotal,
    addOnsTotal,
    deliveryFee,
    promoDiscount: discountAmount,
    total,
    impactCount,
  };
}
