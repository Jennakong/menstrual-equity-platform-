import CTAButton from "./CTAButton";
import { IMPACT_STATS } from "@/lib/constants";

export default function Hero() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-white to-sage-50 pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Background blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-coral-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-sage-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Copy */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-coral-50 text-coral-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-coral-100">
                <span className="w-1.5 h-1.5 bg-coral-500 rounded-full animate-pulse" />
                Buy-One, Give-One • Together We Can End Period Poverty in Africa
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-sage-900 leading-tight">
                One Subscription.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-500 to-blush-500">
                  Two Lives
                </span>{" "}
                Changed.
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                A 12-month menstrual care subscription that delivers premium, sustainable products
                to you — while funding a girl in Africa with dignity and education.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <CTAButton href="/choose-path" size="lg" variant="coral">
                  Start Your Subscription
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </CTAButton>
                <CTAButton href="#how-it-works" size="lg" variant="secondary">
                  See How It Works
                </CTAButton>
              </div>

              <p className="mt-4 text-xs text-gray-400">
                Cancel anytime · Eco-friendly packaging · Ships across Kenya & internationally
              </p>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-sage-100 via-cream-100 to-coral-50 flex flex-col items-center justify-center border border-sage-100 shadow-card overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-sage-200/30 to-coral-100/30" />
                <div className="relative text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-white/60 flex items-center justify-center mx-auto mb-4 shadow-soft">
                    <svg className="w-10 h-10 text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sage-500 font-medium text-sm">Hero Image</p>
                  <p className="text-sage-400 text-xs mt-1">Dignified women & girls — community, empowerment</p>
                </div>
              </div>

              {/* Floating impact card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-elevated px-4 py-3 flex items-center gap-3 border border-sage-50">
                <div className="w-10 h-10 bg-coral-50 rounded-xl flex items-center justify-center text-lg">
                  🌸
                </div>
                <div>
                  <p className="font-bold text-sage-900 text-sm">12,400+ Girls</p>
                  <p className="text-xs text-gray-400">Supported across Africa</p>
                </div>
              </div>

              {/* Floating eco card */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-elevated px-4 py-3 flex items-center gap-3 border border-sage-50">
                <div className="w-10 h-10 bg-sage-50 rounded-xl flex items-center justify-center text-lg">
                  🌿
                </div>
                <div>
                  <p className="font-bold text-sage-900 text-sm">100% Organic</p>
                  <p className="text-xs text-gray-400">Biodegradable materials</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-sage-900">
              How It Works
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Simple, meaningful, and impactful — in three steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: "📋",
                title: "Choose Your Plan",
                desc: "Pick a 12-month care plan that suits your needs. Every tier gives back.",
                color: "bg-sage-50 border-sage-100",
                stepColor: "text-sage-400",
              },
              {
                step: "02",
                icon: "📦",
                title: "Receive Your Supply",
                desc: "Your full 12-month supply of sustainable menstrual care products, delivered at once or monthly.",
                color: "bg-coral-50 border-coral-100",
                stepColor: "text-coral-400",
              },
              {
                step: "03",
                icon: "🌍",
                title: "A Girl Gets Hers Too",
                desc: "Your subscription funds a matched supply for a girl in an underserved community across Africa.",
                color: "bg-blush-50 border-blush-100",
                stepColor: "text-blush-400",
              },
            ].map(({ step, icon, title, desc, color, stepColor }) => (
              <div
                key={step}
                className={`rounded-3xl p-8 border ${color} relative overflow-hidden group hover:shadow-card transition-shadow duration-300`}
              >
                <span className={`absolute top-4 right-6 font-display text-6xl font-bold ${stepColor} opacity-20 select-none`}>
                  {step}
                </span>
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-display text-xl font-bold text-sage-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Impact Stats ─────────────────────────────────────────────────── */}
      <section id="impact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sage-800 to-sage-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Real Impact, Measurable Change
            </h2>
            <p className="mt-3 text-sage-300 max-w-xl mx-auto">
              Every subscription translates directly into dignity and opportunity.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPACT_STATS.map(({ value, label, description, icon }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-center border border-white/10 hover:bg-white/15 transition-colors"
              >
                <div className="text-4xl mb-3">{icon}</div>
                <p className="font-display text-3xl sm:text-4xl font-bold text-white">{value}</p>
                <p className="mt-1 font-semibold text-sage-200 text-sm">{label}</p>
                <p className="mt-2 text-sage-400 text-xs leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          {/* Image placeholder */}
          <div className="mt-14 rounded-3xl bg-white/5 border border-white/10 aspect-[16/5] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-sage-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sage-400 text-sm">Community impact photo banner</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust Badges ─────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream-50">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8">
            Why thousands trust Bloom & Give
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: "🌿", label: "Biodegradable Materials" },
              { icon: "🏛️", label: "NGO Partnerships" },
              { icon: "🏫", label: "School Outreach" },
              { icon: "🔒", label: "Secure Distribution" },
              { icon: "♻️", label: "Carbon-Neutral" },
              { icon: "✅", label: "Clinically Verified" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="bg-white rounded-2xl p-4 text-center shadow-soft border border-cream-100 hover:shadow-card transition-shadow"
              >
                <div className="text-2xl mb-2">{icon}</div>
                <p className="text-xs font-medium text-sage-700 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-coral-500 to-blush-500">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Start Creating Impact Today
          </h2>
          <p className="text-coral-100 text-lg mb-10 leading-relaxed">
            Join thousands of women funding menstrual equity — one subscription at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/choose-path" size="lg" variant="white">
              Choose Your Plan
            </CTAButton>
            <CTAButton href="/corporate" size="lg" variant="ghost" className="text-white border-white/40 border-2 hover:bg-white/10">
              Corporate Plans
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
