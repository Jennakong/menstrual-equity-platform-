"use client";

import { useState } from "react";
import CTAButton from "@/components/CTAButton";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "subscriptions",
    icon: "📋",
    label: "Subscriptions",
    color: "text-coral-600",
    bgColor: "bg-coral-50",
    borderColor: "border-coral-100",
    activeBg: "bg-coral-50",
    activeBorder: "border-coral-200",
    questions: [
      {
        q: "How does the buy-one-give-one model work?",
        a: "When you subscribe to a Luwá plan, we match your subscription with a funded supply for a girl in an underserved community in Nigeria or West Africa. Every tier gives back — the plan you choose determines how many girls receive support. The Essentials plan funds 1 girl, Comfort funds 2, and Premium funds 3 for the full year.",
      },
      {
        q: "How long does my subscription last?",
        a: "All Luwá subscriptions are annual — 12 months of care. We work on an annual model because consistent, year-round access to menstrual care is what actually makes a difference in school attendance and confidence. You'll receive your products as a full upfront shipment or staggered monthly deliveries depending on your plan.",
      },
      {
        q: "Can I cancel my subscription?",
        a: "Yes, you can cancel at any time before your next renewal. Since Luwá is an annual subscription, cancellations take effect at the end of your current plan year. We don't offer mid-year refunds, but we will never auto-renew without reminding you in advance.",
      },
      {
        q: "Can I upgrade or change my plan?",
        a: "Yes. You can upgrade to a higher tier at any time — the price difference is prorated for the remaining months. Downgrades apply at your next renewal. Reach out to our support team and we'll handle it for you.",
      },
      {
        q: "Can I sponsor additional girls beyond my plan?",
        a: "Absolutely. During checkout you can add impact add-ons — including sponsoring an extra girl's annual supply, donating a school health kit, or doubling your impact. You can also contact us directly to set up ongoing sponsorships.",
      },
    ],
  },
  {
    id: "delivery",
    icon: "📦",
    label: "Delivery",
    color: "text-sage-700",
    bgColor: "bg-sage-50",
    borderColor: "border-sage-100",
    activeBg: "bg-sage-50",
    activeBorder: "border-sage-200",
    questions: [
      {
        q: "Which areas do you deliver to?",
        a: "We currently deliver across all 36 Nigerian states and the FCT, with fulfillment hubs in Lagos, Abuja, and Calabar. International shipping is available to select countries — contact us for your location. We're actively expanding to more West African countries.",
      },
      {
        q: "Do you offer international shipping?",
        a: "Yes. We ship internationally, though delivery timelines and costs vary by destination. International orders typically take 7–14 business days. Final shipping costs are confirmed after order placement. Contact us at hello@luwa.com for a shipping quote before you order.",
      },
      {
        q: "How much does delivery cost?",
        a: "Delivery costs depend on your region: Lagos hub area (₦2,500–₦5,000 · 1–2 business days), Abuja hub area (₦3,000–₦7,000 · 2–4 business days), South-South via Calabar hub (₦5,000–₦10,000 · 3–5 business days). Free delivery is available on qualifying orders.",
      },
      {
        q: "How is packaging handled?",
        a: "All Luwá orders are shipped in plain, discreet outer packaging — no logos or product details on the outside. Inside, your products are wrapped in our signature eco-friendly packaging made from recycled and biodegradable materials.",
      },
      {
        q: "Can I pick up from a hub instead of home delivery?",
        a: "Yes. We have pickup points in Lagos (Victoria Island, Ikeja, Lekki), Abuja (Wuse 2 / Jabi), and Calabar (GRA). Hub pickup is available at no delivery charge. Select hub pickup during checkout and choose your nearest location.",
      },
    ],
  },
  {
    id: "impact",
    icon: "🌍",
    label: "Impact Model",
    color: "text-blush-600",
    bgColor: "bg-blush-50",
    borderColor: "border-blush-100",
    activeBg: "bg-blush-50",
    activeBorder: "border-blush-200",
    questions: [
      {
        q: "How are girls selected for support?",
        a: "Girls are identified through our vetted NGO and school partners, who have deep knowledge of their local communities. Priority is given to girls in rural and peri-urban areas where period poverty is most acute and where absence of menstrual care has the highest impact on school attendance. Our partners handle on-the-ground distribution with dignity and discretion.",
      },
      {
        q: "How does outreach distribution work?",
        a: "Products are distributed through a network of NGO partners and partner schools. Each partner organisation receives a consignment matched to the number of subscribers they're allocated. Girls receive their supplies directly at school or through community hubs, along with basic menstrual health education.",
      },
      {
        q: "How can I track my impact?",
        a: "Every subscriber receives quarterly impact updates. These include the communities reached, the number of girls supported, school attendance data from partner schools, and sustainability metrics. You'll be able to see the direct effect your subscription is having.",
      },
      {
        q: "Are the impact claims verified?",
        a: "Yes. Our NGO partners provide regular reporting and our internal impact team conducts quarterly field reviews. We do not report figures we cannot verify. Our goal is transparent, honest impact communication — not inflated numbers.",
      },
    ],
  },
  {
    id: "products",
    icon: "🌿",
    label: "Products",
    color: "text-sage-600",
    bgColor: "bg-sage-50",
    borderColor: "border-sage-100",
    activeBg: "bg-sage-50",
    activeBorder: "border-sage-200",
    questions: [
      {
        q: "Are the products biodegradable?",
        a: "Yes. All Luwá products use organic, biodegradable materials — certified organic cotton cores, plant-based outer layers, and compostable packaging where possible. We choose suppliers who meet international organic and safety certifications. No harsh chemicals, fragrances, or synthetic materials.",
      },
      {
        q: "Are the products clinically verified?",
        a: "Yes. All products are clinically tested and meet applicable safety standards. We only partner with manufacturers who hold independent certification for their materials. If you have specific medical requirements or sensitivities, contact us before subscribing.",
      },
      {
        q: "What products are included in each plan?",
        a: "Essentials includes 24 organic pads per month. Comfort adds 12 tampons and a menstrual cup plus cramp relief roll-on. Premium includes the full suite — pads, tampons, menstrual cup, liners, and monthly wellness extras. All tiers come with eco-friendly packaging.",
      },
      {
        q: "Can I customise what's in my subscription?",
        a: "During checkout, you can add optional add-ons like a Cramp Relief Kit, Reusable Heating Pad, Wellness Tea Bundle, and more. Full product customisation within tiers is on our roadmap — for now, reach out to support and we'll do our best to accommodate specific needs.",
      },
    ],
  },
  {
    id: "corporate",
    icon: "🏛️",
    label: "Corporate Partnerships",
    color: "text-coral-600",
    bgColor: "bg-coral-50",
    borderColor: "border-coral-100",
    activeBg: "bg-coral-50",
    activeBorder: "border-coral-200",
    questions: [
      {
        q: "Can corporations partner with the platform?",
        a: "Yes. We offer corporate wellness plans for businesses that want to provide menstrual care benefits to employees, and CSR packages for organisations looking to fund large-scale outreach. Both models include impact reporting suitable for ESG and sustainability disclosures.",
      },
      {
        q: "How do corporate plans work?",
        a: "Corporate plans are seat-based — your company purchases subscriptions for a group of employees or beneficiaries. Minimum group size is 10 seats. All corporate plans include dedicated account management, bulk pricing, and quarterly impact reports branded for your organisation.",
      },
      {
        q: "Can NGOs access discounted rates?",
        a: "Yes. Registered NGOs and educational institutions may qualify for subsidised distribution partnerships. We evaluate these on a case-by-case basis. Contact us at corporate@luwa.com with your organisation's details and we'll get back to you within 3 business days.",
      },
      {
        q: "How do I contact support?",
        a: "You can reach us via email at hello@luwa.com for general enquiries, or corporate@luwa.com for partnership discussions. We also offer WhatsApp support — contact details are listed on our contact page. Our team typically responds within 24 hours on business days.",
      },
    ],
  },
];

// ─── Accordion item ───────────────────────────────────────────────────────────

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`border rounded-2xl overflow-hidden transition-colors duration-200 ${isOpen ? "border-sage-200 shadow-soft" : "border-gray-100"}`}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50/60 transition-colors"
      >
        <span className={`font-semibold text-sm leading-snug pr-2 transition-colors ${isOpen ? "text-sage-900" : "text-sage-800"}`}>
          {question}
        </span>
        <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 mt-0.5 ${isOpen ? "bg-coral-100 text-coral-600 rotate-45" : "bg-gray-100 text-gray-500"}`}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="px-5 pb-5 pt-1">
          <div className="h-px bg-gray-100 mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("subscriptions");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  function toggleItem(key: string) {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const currentCategory = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50">

      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
          <span className="inline-flex items-center gap-2 bg-sage-50 text-sage-600 text-xs font-semibold px-4 py-2 rounded-full mb-5 border border-sage-100">
            <span className="w-1.5 h-1.5 bg-sage-400 rounded-full" />
            Support & Information
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-sage-900 leading-tight">
            Frequently Asked
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-500 to-blush-500">
              Questions
            </span>
          </h1>
          <p className="mt-5 text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            Everything you need to know about subscriptions, delivery, and impact.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-[220px_1fr] gap-8 items-start">

          {/* ── Category nav (sidebar on desktop, pills on mobile) ── */}
          <div className="lg:sticky lg:top-24">
            {/* Mobile: horizontal scroll */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {CATEGORIES.map(({ id, icon, label, color, bgColor }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(id);
                    setOpenItems({});
                  }}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-sm font-semibold transition-all ${
                    activeCategory === id
                      ? `${bgColor} border-current ${color} shadow-soft`
                      : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
                  }`}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Desktop: vertical stack */}
            <div className="hidden lg:flex flex-col gap-1.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 px-3">
                Categories
              </p>
              {CATEGORIES.map(({ id, icon, label, color, bgColor, borderColor }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(id);
                    setOpenItems({});
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border text-sm font-semibold text-left transition-all ${
                    activeCategory === id
                      ? `${bgColor} ${borderColor} ${color} shadow-soft`
                      : "bg-white border-transparent text-gray-500 hover:bg-gray-50 hover:text-sage-700"
                  }`}
                >
                  <span className="text-base leading-none">{icon}</span>
                  <span>{label}</span>
                  {activeCategory === id && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-current" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Questions ── */}
          <div>
            {/* Category header */}
            <div className={`${currentCategory.bgColor} border ${currentCategory.borderColor} rounded-3xl px-6 py-5 mb-6 flex items-center gap-4`}>
              <div className="text-3xl leading-none">{currentCategory.icon}</div>
              <div>
                <h2 className={`font-display text-xl font-bold ${currentCategory.color}`}>
                  {currentCategory.label}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {currentCategory.questions.length} questions
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {currentCategory.questions.map((item, idx) => {
                const key = `${activeCategory}-${idx}`;
                return (
                  <AccordionItem
                    key={key}
                    question={item.q}
                    answer={item.a}
                    isOpen={!!openItems[key]}
                    onToggle={() => toggleItem(key)}
                  />
                );
              })}
            </div>

            {/* Quick links to other categories */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Other Topics
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.filter((c) => c.id !== activeCategory).map(({ id, icon, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(id);
                      setOpenItems({});
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-100 rounded-xl text-xs font-medium text-gray-600 hover:border-sage-200 hover:text-sage-700 hover:bg-sage-50 transition-all"
                  >
                    <span>{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Still have questions CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-sage-800 to-sage-900 rounded-3xl px-8 py-12 text-center shadow-elevated overflow-hidden relative">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-coral-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-sage-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl border border-white/10">
              💬
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-sage-300 leading-relaxed mb-8 max-w-sm mx-auto">
              Our team is here to help. Reach us by email or WhatsApp and we'll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <CTAButton href="mailto:hello@luwa.com" size="lg" variant="white">
                Contact Support
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </CTAButton>
              <CTAButton href="/choose-path" size="lg" variant="ghost" className="text-sage-300 hover:text-white hover:bg-white/10 border border-white/20">
                Start Your Subscription
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
