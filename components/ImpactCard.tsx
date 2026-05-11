import type { ImpactStat } from "@/types";

interface Props {
  stat: ImpactStat;
  variant?: "dark" | "light";
}

export default function ImpactCard({ stat, variant = "light" }: Props) {
  const isDark = variant === "dark";

  return (
    <div
      className={`rounded-3xl p-6 text-center border transition-all hover:shadow-card ${
        isDark
          ? "bg-white/10 border-white/10 hover:bg-white/15"
          : "bg-white border-sage-100 shadow-soft"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 ${
          isDark ? "bg-white/10" : "bg-sage-50"
        }`}
      >
        {stat.icon}
      </div>
      <p
        className={`font-display text-3xl sm:text-4xl font-bold mb-1 ${
          isDark ? "text-white" : "text-sage-900"
        }`}
      >
        {stat.value}
      </p>
      <p
        className={`font-semibold text-sm mb-2 ${
          isDark ? "text-sage-200" : "text-sage-700"
        }`}
      >
        {stat.label}
      </p>
      <p
        className={`text-xs leading-relaxed ${
          isDark ? "text-sage-400" : "text-gray-400"
        }`}
      >
        {stat.description}
      </p>
    </div>
  );
}
