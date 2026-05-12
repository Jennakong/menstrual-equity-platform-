import type { Metadata } from "next";
import CTAButton from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Corporate Partnerships",
};

const CORPORATE_PACKAGES = [
  {
    id: "starter",
    name: "Starter",
    seats: "10–49",
    pricePerSeat: 22,
    impactMultiplier: "1x",
    features: [
      "10–49 employee subscriptions",
      "Centralised billing",
      "Impact dashboard",
      "Quarterly impact report",
      "1 girl funded per employee",
    ],
    color: "border-sage-200",
    badge: null,
  },
  {
    id: "growth",
    name: "Growth",
    seats: "50–249",
    pricePerSeat: 19,
    impactMultiplier: "2x",
    features: [
      "50–249 employee subscriptions",
      "Volume discount (14% off)",
      "Dedicated account manager",
      "Custom impact branding",
      "Monthly impact reports",
      "2 girls funded per employee",
    ],
    color: "border-coral-300",
    badge: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    seats: "250+",
    pricePerSeat: "Custom",
    impactMultiplier: "3x",
    features: [
      "250+ employee subscriptions",
      "Fully negotiated pricing",
      "White-label impact portal",
      "CEO co-impact certificate",
      "On-site team workshops",
      "3 girls funded per employee",
    ],
    color: "border-blush-300",
    badge: "Maximum Impact",
  },
];

export default function CorporatePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-sage-800 to-sage-900 text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-sage-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-white/10">
            <span className="w-1.5 h-1.5 bg-coral-400 rounded-full" />
            Corporate Wellness & CSR Programs
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Give Your Team More.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-300 to-blush-300">
              Change the World.
            </span>
          </h1>
          <p className="text-sage-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Empower your female employees with premium menstrual care — while your company funds
            life-changing support for girls across Africa. Real CSR impact, measurable results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <CTAButton href="#packages" size="lg" variant="coral">
              View Packages
            </CTAButton>
            <CTAButton href="#inquiry" size="lg" variant="ghost" className="text-white border-white/30 border-2 hover:bg-white/10">
              Talk to Sales
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Why partner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-sage-900 text-center mb-12">
            Why Companies Partner With Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "👩‍💼",
                title: "Employee Wellbeing",
                desc: "Menstrual health is health. Show your team you take it seriously.",
              },
              {
                icon: "🌍",
                title: "Verified CSR Impact",
                desc: "We issue quarterly impact certificates and SDG alignment reports.",
              },
              {
                icon: "📊",
                title: "Retention & Loyalty",
                desc: "Benefits that matter build teams that stay. 78% report increased satisfaction.",
              },
              {
                icon: "🏆",
                title: "Brand Recognition",
                desc: "Feature your company in our impact campaigns and annual reports.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-3xl p-6 shadow-soft border border-sage-50 text-center hover:shadow-card transition-shadow">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-semibold text-sage-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-sage-900">Corporate Packages</h2>
            <p className="mt-3 text-gray-400">Scaled pricing, maximum impact.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {CORPORATE_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-3xl border-2 p-6 ${pkg.color} hover:shadow-card transition-shadow`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-coral-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-soft whitespace-nowrap">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="mb-4 pt-2">
                  <h3 className="font-display text-xl font-bold text-sage-900">{pkg.name}</h3>
                  <p className="text-xs text-gray-400">{pkg.seats} employees</p>
                </div>

                <div className="mb-5">
                  <div className="flex items-end gap-1">
                    <span className="font-display text-3xl font-bold text-sage-900">
                      {typeof pkg.pricePerSeat === "number" ? `$${pkg.pricePerSeat}` : pkg.pricePerSeat}
                    </span>
                    {typeof pkg.pricePerSeat === "number" && (
                      <span className="text-gray-400 text-sm mb-1">/employee/yr</span>
                    )}
                  </div>
                  <span className="inline-block mt-1 text-xs font-semibold bg-sage-100 text-sage-700 px-2 py-0.5 rounded-full">
                    {pkg.impactMultiplier} impact multiplier
                  </span>
                </div>

                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 mt-0.5 shrink-0 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <CTAButton href="#inquiry" fullWidth variant={pkg.badge ? "coral" : "secondary"}>
                  Get Started
                </CTAButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section id="inquiry" className="py-20 px-4 sm:px-6 lg:px-8 bg-cream-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-sage-900">Get in Touch</h2>
            <p className="mt-2 text-gray-400">We'll be in touch within 1 business day.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-card border border-sage-100 p-8">
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-sage-700 mb-1.5 uppercase tracking-wide">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Corp"
                    className="w-full px-4 py-3 rounded-xl border border-sage-200 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-sage-700 mb-1.5 uppercase tracking-wide">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 rounded-xl border border-sage-200 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-sage-700 mb-1.5 uppercase tracking-wide">
                  Work Email
                </label>
                <input
                  type="email"
                  placeholder="jane@acmecorp.com"
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-sage-700 mb-1.5 uppercase tracking-wide">
                  Team Size
                </label>
                <select className="w-full px-4 py-3 rounded-xl border border-sage-200 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400">
                  <option value="">Select team size</option>
                  <option>10–49 employees</option>
                  <option>50–249 employees</option>
                  <option>250+ employees</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-sage-700 mb-1.5 uppercase tracking-wide">
                  Tell Us More (optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="What you're looking for, timeline, questions..."
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400 resize-none"
                />
              </div>

              <button className="w-full bg-sage-500 hover:bg-sage-600 text-white font-semibold py-4 rounded-2xl transition-colors shadow-soft hover:shadow-card">
                Send Inquiry →
              </button>

              <p className="text-center text-xs text-gray-400">
                Or email us directly at{" "}
                <a href="mailto:corporate@luwa.com" className="text-sage-500 hover:underline">
                  corporate@luwa.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
