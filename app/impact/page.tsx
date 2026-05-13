import ImpactCard from "@/components/ImpactCard";
import CTAButton from "@/components/CTAButton";
import { IMPACT_STATS } from "@/lib/constants";

// ─── Image placeholder helper ─────────────────────────────────────────────────

function ImgPlaceholder({
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
        <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center mx-auto mb-3 shadow-soft">
          <svg className="w-6 h-6 text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-sage-500 font-medium text-xs leading-relaxed">{label}</p>
      </div>
    </div>
  );
}

// ─── Testimonials data ────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote:
      "Before the outreach, I missed school almost every month. Now I don't have to worry anymore. I can focus.",
    name: "Amara, 15",
    location: "Ogun State, Nigeria",
    icon: "🌸",
  },
  {
    quote:
      "Our school has seen a real shift. Girls are present, engaged, and confident. That's what dignified access does.",
    name: "Mrs. Okafor",
    location: "Head Teacher, Anambra",
    icon: "📚",
  },
  {
    quote:
      "I subscribed because I wanted to do something real. Knowing a girl is supported because of my plan — that matters deeply to me.",
    name: "Chidinma, Subscriber",
    location: "Lagos, Nigeria",
    icon: "💚",
  },
];

// ─── Timeline stages ──────────────────────────────────────────────────────────

const TIMELINE_STAGES = [
  {
    number: "01",
    title: "Subscription Purchased",
    description: "A customer subscribes to a menstrual care plan. Every tier directly funds a girl's annual supply.",
    icon: "🛒",
    color: "bg-coral-50 border-coral-200",
    dotColor: "bg-coral-400",
    numberColor: "text-coral-500",
    iconBg: "bg-coral-100",
  },
  {
    number: "02",
    title: "Cohort Assignment",
    description: "The subscription is assigned to a verified outreach cohort based on the purchase period. Each cohort represents a batch of subscriptions collected within a specific time window.",
    icon: "📋",
    color: "bg-sage-50 border-sage-200",
    dotColor: "bg-sage-500",
    numberColor: "text-sage-600",
    iconBg: "bg-sage-100",
  },
  {
    number: "03",
    title: "Outreach Preparation",
    description: "Products and logistics are prepared for school and community distribution programs. Partner NGOs coordinate school selection, community access, and educational session planning.",
    icon: "📦",
    color: "bg-cream-50 border-cream-200",
    dotColor: "bg-amber-400",
    numberColor: "text-amber-600",
    iconBg: "bg-amber-50",
  },
  {
    number: "04",
    title: "Community Distribution",
    description: "Pads and support materials are distributed during organised outreach events. Educational sessions on menstrual health, dignity, and hygiene may also take place alongside product distribution.",
    icon: "🤝",
    color: "bg-blush-50 border-blush-200",
    dotColor: "bg-blush-400",
    numberColor: "text-blush-600",
    iconBg: "bg-blush-100",
  },
  {
    number: "05",
    title: "Impact Recap & Livestream Access",
    description: "Subscribers may receive livestream invitations, outreach summaries, recap videos, and verified impact updates after distributions are completed. Your subscription becomes a story you can follow.",
    icon: "🎥",
    color: "bg-sage-50 border-sage-200",
    dotColor: "bg-sage-500",
    numberColor: "text-sage-600",
    iconBg: "bg-sage-100",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ═══════════════════════════════════════════════════════════════════════
          EXISTING SECTIONS
      ═══════════════════════════════════════════════════════════════════════ */}

      {/* ── Real Impact ── */}
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
            {IMPACT_STATS.map((stat) => (
              <ImpactCard key={stat.label} stat={stat} variant="dark" />
            ))}
          </div>

          {/* Community photography section */}
          <div className="mt-14">
            <ImgPlaceholder
              label="Community impact photo banner — girls at school, outreach distribution"
              aspect="aspect-[16/5]"
              className="border-white/10 bg-white/5"
            />
          </div>
        </div>
      </section>

      {/* ── Community photography grid ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            <ImgPlaceholder
              label="Girls at outreach event — dignity and community"
              aspect="aspect-square"
            />
            <ImgPlaceholder
              label="Product distribution — school setting"
              aspect="aspect-square"
            />
            <ImgPlaceholder
              label="Educational session — menstrual health awareness"
              aspect="aspect-square"
            />
          </div>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <ImgPlaceholder
              label="Community gathering — rural outreach"
              aspect="aspect-[16/7]"
            />
            <ImgPlaceholder
              label="NGO partner team — on-ground distribution"
              aspect="aspect-[16/7]"
            />
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cream-50 to-sage-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-sage-900">
              Voices From The Community
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Impact is not just a number. It is a girl in school, a teacher who sees the difference, a subscriber who knows they helped.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ quote, name, location, icon }) => (
              <div key={name} className="bg-white rounded-3xl border border-sage-100 p-7 shadow-soft flex flex-col">
                <div className="w-10 h-10 bg-sage-50 rounded-2xl flex items-center justify-center text-xl mb-5">
                  {icon}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 italic">"{quote}"</p>
                <div className="mt-5 pt-4 border-t border-sage-100">
                  <p className="font-semibold text-sage-900 text-sm">{name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          NEW SECTIONS — added below existing testimonial section
      ═══════════════════════════════════════════════════════════════════════ */}

      {/* ── Track Your Impact ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-coral-500 mb-4 block">
                Subscriber Transparency
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-sage-900 leading-tight">
                Track Your Impact
              </h2>
              <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                Every subscription becomes part of a verified outreach cohort delivering menstrual care access to girls across schools and communities.
              </p>
              <p className="mt-4 text-gray-500 leading-relaxed">
                This isn't a black-box donation. We believe you deserve to see exactly where your subscription goes — which cohort it joins, which communities it reaches, and what changes as a result.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {[
                  { icon: "📊", title: "Verified Reporting", desc: "Every distribution is documented with field data from our NGO partners." },
                  { icon: "🎥", title: "Outreach Recaps", desc: "Video summaries and photo documentation shared after each cohort distribution." },
                  { icon: "📬", title: "Subscriber Updates", desc: "Quarterly emails with impact data, stories, and community feedback." },
                  { icon: "📡", title: "Livestream Access", desc: "Some outreach events are streamed live so subscribers can witness the moment." },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="bg-cream-50 border border-cream-100 rounded-2xl p-4">
                    <div className="text-2xl mb-2">{icon}</div>
                    <p className="font-semibold text-sage-900 text-sm mb-1">{title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <ImgPlaceholder
                label="Subscriber receiving impact update — phone with outreach summary"
                aspect="aspect-[3/4]"
              />
              <div className="bg-sage-50 border border-sage-100 rounded-3xl px-6 py-5 flex gap-4 items-start">
                <div className="w-10 h-10 bg-sage-100 rounded-xl flex items-center justify-center text-lg shrink-0">
                  🌸
                </div>
                <div>
                  <p className="font-semibold text-sage-900 text-sm">Cohort 001 — Completed</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    January–March subscriptions · April distribution · 312 girls reached across 4 schools in Ogun and Lagos States.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How Our Outreach Cohorts Work ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sage-800 to-sage-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-coral-400 mb-4 block">
              Our Process
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              How Our Outreach Cohorts Work
            </h2>
            <p className="mt-4 text-sage-300 max-w-2xl mx-auto leading-relaxed">
              A cohort represents a batch of subscriptions collected within a specific time period. When enough subscriptions are gathered, a full outreach distribution is coordinated — products reach girls, schools are supported, and communities are served.
            </p>
          </div>

          {/* Cohort example callout */}
          <div className="bg-white/10 border border-white/10 rounded-3xl px-6 py-5 flex flex-wrap sm:flex-nowrap items-center gap-6 mb-12 backdrop-blur-sm">
            <div className="shrink-0 text-4xl">📁</div>
            <div className="flex-1">
              <p className="font-bold text-white text-sm mb-1">Example: Cohort 001</p>
              <p className="text-sage-300 text-sm leading-relaxed">
                Subscriptions collected January – March are grouped into Cohort 001. By April, outreach logistics are finalised, schools and communities are selected, and distribution takes place. Subscribers in this cohort receive a full recap.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              {[
                { label: "Jan–Mar", sublabel: "Collection" },
                { label: "April", sublabel: "Distribution" },
              ].map(({ label, sublabel }) => (
                <div key={label} className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 text-center">
                  <p className="font-display font-bold text-white text-sm">{label}</p>
                  <p className="text-sage-400 text-xs mt-0.5">{sublabel}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connector line — desktop */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-white/10 mx-20" />

            <div className="grid lg:grid-cols-5 gap-5">
              {TIMELINE_STAGES.map(({ number, title, description, icon, color, dotColor, numberColor, iconBg }, idx) => (
                <div key={number} className="relative flex flex-col">
                  {/* Mobile connector */}
                  {idx < TIMELINE_STAGES.length - 1 && (
                    <div className="lg:hidden absolute left-7 top-16 bottom-0 w-px bg-gradient-to-b from-sage-600 to-transparent" />
                  )}

                  {/* Desktop: dot on line */}
                  <div className="hidden lg:flex justify-center mb-6">
                    <div className={`w-4 h-4 rounded-full border-2 border-sage-700 ${dotColor} shadow-lg`} />
                  </div>

                  {/* Card */}
                  <div className={`${color} border rounded-3xl p-5 flex-1 flex flex-col lg:block`}>
                    <div className="flex lg:block items-start gap-4 mb-0 lg:mb-4">
                      {/* Mobile: icon + number inline */}
                      <div className={`w-10 h-10 lg:w-10 lg:h-10 ${iconBg} rounded-xl flex items-center justify-center text-lg shrink-0`}>
                        {icon}
                      </div>
                      <div className="flex-1 lg:mt-3">
                        <span className={`font-display text-xs font-bold ${numberColor} opacity-60 block mb-1`}>
                          {number}
                        </span>
                        <h3 className="font-semibold text-sage-900 text-sm leading-snug">{title}</h3>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mt-3">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Transparency card ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-sage-50 via-cream-50 to-coral-50 border border-sage-100 rounded-3xl overflow-hidden shadow-card">
            <div className="px-8 py-8 sm:px-10 sm:py-10">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-soft flex items-center justify-center text-2xl shrink-0">
                  🔍
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral-500 mb-3">
                    Our Transparency Commitment
                  </p>
                  <p className="font-display text-xl sm:text-2xl font-bold text-sage-900 leading-snug mb-5">
                    "Every outreach cohort is documented through verified distribution reports, outreach recaps, and community impact updates."
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { icon: "📄", label: "Outreach summaries", desc: "Written field reports from every distribution event." },
                      { icon: "📊", label: "Impact reports", desc: "Verified data on girls reached, schools supported, products distributed." },
                      { icon: "🎬", label: "Recap videos", desc: "Short documentary-style videos from outreach events." },
                      { icon: "📡", label: "Livestream invitations", desc: "Selected distributions are streamed live for subscribers." },
                      { icon: "🏘️", label: "Community updates", desc: "Ongoing stories from supported schools and communities." },
                    ].map(({ icon, label, desc }) => (
                      <div key={label} className="flex items-start gap-3 bg-white/70 rounded-2xl px-4 py-3 border border-white">
                        <span className="text-base leading-none mt-0.5 shrink-0">{icon}</span>
                        <div>
                          <p className="font-semibold text-sage-900 text-xs">{label}</p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Community appreciation ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cream-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-sage-500 mb-4 block">
                Community Connection
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-sage-900 leading-tight">
                A Connection Built on Dignity
              </h2>
              <p className="mt-5 text-gray-600 leading-relaxed">
                Some outreach events include moments where supported communities collectively acknowledge the people who made the outreach possible. These are quiet, genuine expressions of gratitude — not performances, and never manufactured.
              </p>
              <p className="mt-4 text-gray-500 leading-relaxed text-sm">
                When a community knows that real people — subscribers — chose to extend care to them, the impact goes beyond products. It creates a thread of solidarity between women who will never meet, but who share something important.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                {[
                  "Appreciation is always community-led and dignified",
                  "Subscribers are never identified without consent",
                  "Communities retain full agency in how they participate",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-sage-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <ImgPlaceholder
                label="Community gathering — warm, dignified acknowledgement"
                aspect="aspect-[4/3]"
              />
              <div className="bg-white border border-sage-100 rounded-2xl px-5 py-4 shadow-soft flex gap-3 items-start">
                <span className="text-xl leading-none mt-0.5">🌿</span>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  "These girls didn't just receive products — they received a message that someone cares. That changes how a girl sees herself."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-coral-500 to-blush-500">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
            Be Part of the Story
          </h2>
          <p className="text-coral-100 text-lg mb-10 leading-relaxed">
            Your subscription funds real girls, verified outreach, and documented impact. Join a cohort today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/choose-path" size="lg" variant="white">
              Start Your Subscription
            </CTAButton>
            <CTAButton href="/our-story" size="lg" variant="ghost" className="text-white border-white/40 border-2 hover:bg-white/10">
              Read Our Story
            </CTAButton>
          </div>
        </div>
      </section>

    </div>
  );
}
