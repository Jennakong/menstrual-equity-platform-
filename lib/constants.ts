export const SITE_NAME = "Bloom & Give";
export const SITE_TAGLINE = "One Subscription. Two Lives Changed.";
export const SITE_DESCRIPTION =
  "A 12-month menstrual care subscription that funds dignity and education for a girl in need in Africa.";

export const IMPACT_STATS = [
  {
    value: "12,400+",
    label: "Girls Supported",
    description: "Girls across East Africa who've received a full year's supply",
    icon: "🌸",
  },
  {
    value: "280+",
    label: "Communities Reached",
    description: "Schools, villages, and urban centres in our network",
    icon: "🏡",
  },
  {
    value: "94%",
    label: "School Retention Rate",
    description: "Girls who stay in school when period poverty is addressed",
    icon: "📚",
  },
  {
    value: "6",
    label: "NGO Partners",
    description: "Vetted local organisations managing on-the-ground distribution",
    icon: "🤝",
  },
] as const;

export const TRUST_BADGES = [
  { icon: "🌿", label: "Biodegradable Materials" },
  { icon: "🏛️", label: "NGO Partnerships" },
  { icon: "🏫", label: "School Outreach Programs" },
  { icon: "🔒", label: "Secure Distribution" },
  { icon: "♻️", label: "Carbon-Neutral Shipping" },
  { icon: "✅", label: "Clinically Verified" },
] as const;

export const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Our Mission", href: "#mission" },
  { label: "Impact", href: "#impact" },
  { label: "Corporate", href: "/corporate" },
] as const;

export const PROMO_CODES: Record<string, number> = {
  BLOOM10: 0.1,
  IMPACT20: 0.2,
  GIVEBACK: 0.15,
};
