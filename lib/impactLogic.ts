import type { PlanTier, OrderSummary } from "@/types";

export function getImpactCount(tier: PlanTier): number {
  const map: Record<PlanTier, number> = {
    essentials: 1,
    comfort: 2,
    premium: 3,
  };
  return map[tier];
}

export function getImpactMessage(count: number): string {
  if (count === 1) return "You're funding 1 girl's menstrual care for an entire year.";
  if (count === 2) return "You're funding 2 girls' menstrual care for an entire year.";
  return `You're funding ${count} girls' menstrual care for an entire year.`;
}

export function cumulativeImpact(subscribers: number, avgImpact: number): string {
  const total = subscribers * avgImpact;
  return total.toLocaleString();
}

export function buildImpactSummary(summary: OrderSummary): {
  girls: number;
  schoolDaysProtected: number;
  co2Saved: string;
} {
  return {
    girls: summary.impactCount,
    schoolDaysProtected: summary.impactCount * 180,
    co2Saved: `${(summary.impactCount * 4.2).toFixed(1)} kg`,
  };
}
