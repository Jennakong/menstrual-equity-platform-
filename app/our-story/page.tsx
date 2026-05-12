import CTAButton from "@/components/CTAButton";
import { IMPACT_STATS } from "@/lib/constants";

// ─── Image placeholder helper ─────────────────────────────────────────────────

function ImagePlaceholder({
  label,
  aspect = "aspect-[4/3]",
  className = "",
}: {
  label: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`${aspect} ${className} rounded-3xl bg-gradient-to-br from-sage-100 via-cream-100 to-coral-50 border border-sage-100 flex flex-col items-center justify-center overflow-hidden relative`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sage-200/20 to-coral-100/20" />
      <div className="relative text-center p-6">
        <div className="w-14 h-14 rounded-full bg-white/60 flex items-center justify-center mx-auto mb-3 shadow-soft">
          <svg className="w-7 h-7 text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-sage-500 font-medium text-xs leading-relaxed">{label}</p>
      </div>
    </div>
  );
}

// ─── Values data ──────────────────────────────────────────────────────────────

const VALUES = [
  {
    icon: "🌸",
    title: "Dignity",
    description:
      "Every girl deserves to manage her period with confidence and without shame. Dignity is the foundation everything else is built on.",
    bg: "bg-coral-50",
    border: "border-coral-100",
    iconBg: "bg-coral-100",
  },
  {
    icon: "🤝",
    title: "Accessibility",
    description:
      "Menstrual care should not be a privilege. We design our model so it reaches girls in rural, peri-urban, and underserved communities.",
    bg: "bg-sage-50",
    border: "border-sage-100",
    iconBg: "bg-sage-100",
  },
  {
    icon: "♻️",
    title: "Sustainability",
    description:
      "Organic, biodegradable materials that are kind to bodies and the planet — because the environment is part of the mission too.",
    bg: "bg-cream-50",
    border: "border-cream-200",
    iconBg: "bg-cream-100",
  },
  {
    icon: "📚",
    title: "Education",
    description:
      "Keeping girls in school is the most powerful investment any community can make. Menstrual equity directly protects that future.",
    bg: "bg-blush-50",
    border: "border-blush-100",
    iconBg: "bg-blush-100",
  },
  {
    icon: "🌍",
    title: "Community Impact",
    description:
      "We work with vetted NGO partners and local schools — not around them. Sustainable impact requires deep community roots.",
    bg: "bg-sage-50",
    border: "border-sage-100",
    iconBg: "bg-sage-100",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sage-900 to-sage-800 pt-20 pb-0 px-4 sm:px-6 lg:px-8">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-coral-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

        <div className="relative max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center pb-16">
            <span className="inline-flex items-center gap-2 bg-white/10 text-sage-200 text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-white/10">
              <span className="w-1.5 h-1.5 bg-coral-400 rounded-full animate-pulse" />
              Our Mission & Story
            </span>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Our Story
            </h1>

            <p className="mt-6 text-xl sm:text-2xl text-sage-300 leading-relaxed max-w-2xl mx-auto">
              We believe no girl should miss school because of her period.
            </p>
          </div>

          {/* Hero image */}
          <div className="relative z-20 -mb-1">
            <ImagePlaceholder
              label="Empowered girls — education, dignity, community"
              aspect="aspect-[16/6]"
              className="rounded-b-none rounded-t-3xl shadow-elevated"
            />
          </div>
        </div>
      </section>

      {/* ── Section 1: The Problem ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-coral-500 mb-4 block">
                The Problem
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-sage-900 leading-tight">
                Period Poverty Is An Education Problem
              </h2>
              <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                Across Africa, millions of girls miss school every single month — not because they lack ability or ambition, but because they lack access to basic menstrual care.
              </p>

              <div className="mt-8 space-y-5">
                {[
                  {
                    icon: "📖",
                    stat: "1 in 10",
                    label: "Girls miss school during their period",
                    detail: "That's up to 4 days per month, 48 days per year — nearly two full months of schooling lost.",
                  },
                  {
                    icon: "💔",
                    stat: "30%",
                    label: "Drop out of school entirely",
                    detail: "When period poverty persists without support, too many girls leave education for good.",
                  },
                  {
                    icon: "🌱",
                    stat: "94%",
                    label: "School retention when supported",
                    detail: "When girls have reliable menstrual care, they stay in school and their confidence soars.",
                  },
                ].map(({ icon, stat, label, detail }) => (
                  <div key={stat} className="flex gap-4 p-4 bg-cream-50 border border-cream-100 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg shrink-0 shadow-soft">
                      {icon}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-display text-2xl font-bold text-coral-500">{stat}</span>
                        <span className="font-semibold text-sage-900 text-sm">{label}</span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <ImagePlaceholder
                label="A girl studying — education as possibility"
                aspect="aspect-[3/4]"
              />
              <div className="grid grid-cols-2 gap-4">
                <ImagePlaceholder
                  label="Community gathering"
                  aspect="aspect-square"
                />
                <ImagePlaceholder
                  label="School classroom"
                  aspect="aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Why We Built This ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cream-50 to-sage-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Image first on large screens */}
            <div className="order-2 lg:order-1">
              <ImagePlaceholder
                label="Subscription box and care products — sustainable, dignified"
                aspect="aspect-[4/3]"
              />
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { icon: "🌿", label: "Organic" },
                  { icon: "♻️", label: "Biodegradable" },
                  { icon: "💚", label: "Verified Safe" },
                ].map(({ icon, label }) => (
                  <div key={label} className="bg-white border border-sage-100 rounded-2xl p-3 text-center shadow-soft">
                    <div className="text-xl mb-1">{icon}</div>
                    <p className="text-xs font-semibold text-sage-700">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-sage-500 mb-4 block">
                Why This Exists
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-sage-900 leading-tight">
                Why This Platform Exists
              </h2>
              <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                We built Luwá on a simple but powerful belief: when one person takes care of herself, another girl can too.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Our buy-one-give-one model means every subscription you take out funds a matched supply for a girl in an underserved community across Nigeria and West Africa. No complex charity mechanics — just a direct, dignified exchange.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {[
                  { icon: "🔁", title: "Buy One, Give One", desc: "Your subscription directly funds a girl's annual menstrual care supply." },
                  { icon: "🌱", title: "Sustainable Products", desc: "Organic, biodegradable materials that are better for bodies and the earth." },
                  { icon: "📊", title: "Tracked Impact", desc: "Quarterly reports show exactly which communities your subscription reached." },
                  { icon: "🤝", title: "NGO-Verified", desc: "Distribution managed by vetted local partners with deep community trust." },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="bg-white rounded-2xl border border-sage-100 p-4 shadow-soft">
                    <div className="text-2xl mb-2">{icon}</div>
                    <p className="font-semibold text-sage-900 text-sm mb-1">{title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Our Vision ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sage-800 to-sage-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-coral-400 mb-4 block">
              Our Vision
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              A Future Without Period Poverty
            </h2>
            <p className="mt-5 text-sage-300 text-lg max-w-2xl mx-auto leading-relaxed">
              We're starting in Nigeria, but our vision is the entire continent. A generation of girls who never have to choose between their dignity and their education.
            </p>
          </div>

          {/* Vision pillars */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {[
              { icon: "🌍", title: "Africa-Wide Distribution", desc: "Expanding hub-by-hub across West, East, and Southern Africa as we grow." },
              { icon: "🏫", title: "School Outreach", desc: "On-site menstrual health education and product distribution in partner schools." },
              { icon: "🏛️", title: "NGO Partnerships", desc: "Deep collaborations with local organisations who know their communities." },
              { icon: "♻️", title: "Sustainable Access", desc: "Products and models designed for long-term access, not one-off charity drives." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-sm hover:bg-white/15 transition-colors">
                <div className="text-3xl mb-3">{icon}</div>
                <p className="font-semibold text-white text-sm mb-2">{title}</p>
                <p className="text-sage-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Impact stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {IMPACT_STATS.map(({ value, label, description, icon }) => (
              <div
                key={label}
                className="bg-white/5 border border-white/10 rounded-3xl p-5 text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl mb-2">{icon}</div>
                <p className="font-display text-3xl font-bold text-white">{value}</p>
                <p className="font-semibold text-sage-200 text-xs mt-1">{label}</p>
                <p className="text-sage-500 text-xs mt-2 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          {/* Vision image */}
          <div className="mt-12">
            <ImagePlaceholder
              label="Community distribution — girls receiving care kits at school"
              aspect="aspect-[16/5]"
              className="border-white/10"
            />
          </div>
        </div>
      </section>

      {/* ── Section 4: Values ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-coral-500 mb-4 block">
              What Guides Us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-sage-900">
              Our Values
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto leading-relaxed">
              These are the principles that shape every product we choose, every partnership we form, and every girl we serve.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map(({ icon, title, description, bg, border, iconBg }) => (
              <div
                key={title}
                className={`${bg} ${border} border rounded-3xl p-7 relative overflow-hidden group hover:shadow-card transition-shadow duration-300`}
              >
                <div className={`w-12 h-12 ${iconBg} rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-soft`}>
                  {icon}
                </div>
                <h3 className="font-display text-xl font-bold text-sage-900 mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}

            {/* Sixth card — quote */}
            <div className="bg-gradient-to-br from-coral-500 to-blush-500 border-transparent border rounded-3xl p-7 relative overflow-hidden sm:col-span-2 lg:col-span-1">
              <div className="text-6xl font-display font-bold text-white/20 leading-none mb-4 select-none">"</div>
              <p className="text-white text-lg font-medium leading-relaxed italic">
                Brighter days start when we decide no one gets left behind.
              </p>
              <p className="mt-4 text-coral-100 text-xs font-semibold uppercase tracking-widest">
                Luwá · Brighter Days · Always
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cream-50 to-sage-50">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-coral-50 text-coral-600 text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-coral-100">
            <span className="w-1.5 h-1.5 bg-coral-500 rounded-full animate-pulse" />
            Be part of the change
          </span>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-sage-900 leading-tight mb-6">
            Join The Mission
          </h2>

          <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
            One subscription. One girl supported. Thousands of school days protected. Your impact starts the moment you choose a plan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/choose-path" size="lg" variant="coral">
              Start Creating Impact
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </CTAButton>
            <CTAButton href="/corporate" size="lg" variant="secondary">
              Corporate Partnerships
            </CTAButton>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            Cancel anytime · Eco-friendly packaging · 100% impact-tracked
          </p>
        </div>
      </section>

    </div>
  );
}
