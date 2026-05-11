import CTAButton from "./CTAButton";
import type { ReactNode } from "react";

// ─── Internal helpers ──────────────────────────────────────────────────────────

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-block text-[11px] font-bold uppercase tracking-[0.18em] mb-3 ${
        light ? "text-coral-300" : "text-coral-500"
      }`}
    >
      {children}
    </span>
  );
}

function ImagePlaceholder({
  label,
  sublabel,
  gradient = "from-sage-100 via-cream-50 to-coral-50",
  className = "",
  dark = false,
}: {
  label: string;
  sublabel?: string;
  gradient?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden ${
        dark
          ? "bg-gradient-to-br from-sage-700 via-sage-800 to-sage-900 border border-white/10"
          : `bg-gradient-to-br ${gradient} border border-white/80 shadow-card`
      } ${className}`}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle, ${dark ? "#fff" : "#000"} 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      />
      {/* Soft glows */}
      <div className="absolute top-4 left-4 w-28 h-28 rounded-full bg-white/20 blur-2xl pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-36 h-36 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      {/* Icon + label */}
      <div className="relative flex flex-col items-center justify-center h-full text-center p-10">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-soft ${
            dark ? "bg-white/10 backdrop-blur-sm" : "bg-white/60 backdrop-blur-sm"
          }`}
        >
          <svg
            className={`w-7 h-7 ${dark ? "text-sage-300" : "text-sage-400"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className={`font-semibold text-sm ${dark ? "text-sage-300" : "text-sage-600"}`}>{label}</p>
        {sublabel && (
          <p
            className={`text-xs mt-1.5 max-w-[180px] leading-relaxed ${
              dark ? "text-sage-500" : "text-sage-400"
            }`}
          >
            {sublabel}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Section 1: Hero ──────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-white to-sage-50 pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background blobs */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-coral-100 rounded-full blur-[80px] opacity-35 pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-80 h-80 bg-sage-100 rounded-full blur-[60px] opacity-40 pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-blush-100 rounded-full blur-[70px] opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center min-h-[80vh] lg:min-h-0 py-8">

          {/* ── Left: Copy ── */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 self-center lg:self-start bg-white text-coral-600 text-xs font-bold px-4 py-2 rounded-full mb-8 border border-coral-100 shadow-soft">
              <span className="w-2 h-2 bg-coral-500 rounded-full animate-pulse" />
              Buy-One, Give-One &middot; Ending Period Poverty in Africa
            </div>

            {/* Heading */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-[5.5rem] font-bold text-sage-900 leading-[1.05] tracking-tight">
              One
              <br />
              Subscription.
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-500 via-blush-400 to-coral-400">
                  Two Lives
                </span>
              </span>{" "}
              Changed.
            </h1>

            {/* Sub copy */}
            <p className="mt-7 text-lg sm:text-xl text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              A 12-month menstrual care subscription that delivers premium, sustainable products
              to you — while funding a girl in Africa with the dignity she deserves.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <CTAButton href="/choose-path" size="lg" variant="coral">
                Get Started
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </CTAButton>
              <CTAButton href="#impact" size="lg" variant="secondary">
                See Our Impact
              </CTAButton>
            </div>

            {/* Micro trust */}
            <p className="mt-5 text-xs text-gray-400 text-center lg:text-left">
              Cancel anytime &nbsp;·&nbsp; Eco-friendly packaging &nbsp;·&nbsp; Ships across Kenya & internationally
            </p>

            {/* Stat strip */}
            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6 pt-8 border-t border-sage-100">
              {[
                { value: "12,400+", label: "Girls Supported" },
                { value: "280+", label: "Communities" },
                { value: "6", label: "NGO Partners" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display text-2xl font-bold text-sage-900">{value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Visuals ── */}
          <div className="relative flex flex-col gap-4">
            {/* Main image placeholder */}
            <div className="relative">
              <ImagePlaceholder
                label="Hero Photography"
                sublabel="Dignified African women & girls — education, confidence, community"
                gradient="from-sage-100 via-cream-100 to-blush-50"
                className="aspect-[4/3] w-full"
              />

              {/* Floating: Girls funded */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white rounded-2xl shadow-elevated px-5 py-3.5 flex items-center gap-3 border border-sage-50">
                <div className="w-11 h-11 bg-coral-50 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-coral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-sage-900 text-sm leading-tight">12,400+ Girls Funded</p>
                  <p className="text-xs text-gray-400 mt-0.5">Across East Africa this year</p>
                </div>
              </div>

              {/* Floating: Organic */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white rounded-2xl shadow-elevated px-5 py-3.5 flex items-center gap-3 border border-sage-50">
                <div className="w-11 h-11 bg-sage-50 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-sage-900 text-sm leading-tight">100% Organic</p>
                  <p className="text-xs text-gray-400 mt-0.5">Biodegradable materials</p>
                </div>
              </div>
            </div>

            {/* Two small thumbnail placeholders below */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <ImagePlaceholder
                label="Distribution"
                sublabel="NGO partner delivery"
                gradient="from-coral-50 to-blush-50"
                className="aspect-[5/3]"
              />
              <ImagePlaceholder
                label="Community"
                sublabel="School outreach"
                gradient="from-sage-50 to-cream-50"
                className="aspect-[5/3]"
              />
            </div>
          </div>
        </div>

        {/* Press / partner strip */}
        <div className="mt-16 pt-10 border-t border-sage-100">
          <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-gray-300 mb-6">
            As featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {["TechCrunch Africa", "Forbes Africa", "The Guardian", "Al Jazeera", "BBC"].map((name) => (
              <div
                key={name}
                className="px-5 py-2.5 bg-gray-50 rounded-xl border border-gray-100 text-gray-300 text-xs font-bold tracking-wide"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 2: Mission ───────────────────────────────────────────────────────

function MissionSection() {
  return (
    <section id="mission" className="relative overflow-hidden bg-sage-900 py-24 px-4 sm:px-6 lg:px-8">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-coral-800/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sage-700/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Copy ── */}
          <div>
            <SectionLabel light>Our Purpose</SectionLabel>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mt-2">
              Ending Period Poverty{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-300 to-blush-300">
                in Africa
              </span>
            </h2>

            {/* Pull quote */}
            <blockquote className="mt-8 pl-5 border-l-2 border-coral-400">
              <p className="text-xl sm:text-2xl font-display italic text-sage-200 leading-snug">
                "No girl should miss school because she doesn&apos;t have a pad."
              </p>
            </blockquote>

            <p className="mt-7 text-sage-300 text-base sm:text-lg leading-relaxed">
              This platform exists to ensure that no girl misses school because of lack of access
              to menstrual products. Every subscription directly funds access, dignity, and
              education continuity for girls in underserved communities across Africa.
            </p>

            {/* Key points */}
            <ul className="mt-8 space-y-4">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  ),
                  text: "1 in 10 girls in sub-Saharan Africa misses school during her period",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  text: "Access to products improves school retention by up to 94%",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  text: "Our NGO partners distribute directly to schools and communities",
                },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-coral-500/20 border border-coral-400/20 flex items-center justify-center text-coral-300 shrink-0 mt-0.5">
                    {icon}
                  </div>
                  <p className="text-sage-300 text-sm leading-relaxed pt-1.5">{text}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <CTAButton href="/corporate" variant="ghost" className="text-coral-300 hover:text-coral-200 border border-coral-400/30 hover:border-coral-300/50 hover:bg-coral-400/10">
                Read our impact report
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </CTAButton>
            </div>
          </div>

          {/* ── Right: Visuals ── */}
          <div className="relative">
            {/* Large quote mark behind image */}
            <div className="absolute -top-8 -left-6 font-display text-[180px] leading-none text-white/5 select-none pointer-events-none">
              &ldquo;
            </div>

            {/* Tall image placeholder */}
            <ImagePlaceholder
              label="Mission Photography"
              sublabel="Young woman in school uniform — hope, education, dignity"
              dark
              className="aspect-[3/4] w-full"
            />

            {/* Overlay badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 px-5 py-4">
              <p className="text-white font-semibold text-sm">
                &ldquo;She came back to school. She said she finally felt safe.&rdquo;
              </p>
              <p className="text-sage-400 text-xs mt-1.5">— Amara, NGO Field Partner, Kenya</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: How It Works ──────────────────────────────────────────────────

function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      colorBg: "bg-sage-50",
      colorBorder: "border-sage-100",
      colorNum: "text-sage-200",
      colorIcon: "bg-sage-100 text-sage-600",
      colorTag: "bg-sage-100 text-sage-600",
      title: "Subscribe",
      desc: "Choose a menstrual equity subscription plan that suits your needs. Every tier gives back — no exceptions.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      detail: "3 plans from $18/mo",
    },
    {
      num: "02",
      colorBg: "bg-coral-50",
      colorBorder: "border-coral-100",
      colorNum: "text-coral-200",
      colorIcon: "bg-coral-100 text-coral-600",
      colorTag: "bg-coral-100 text-coral-600",
      title: "We Deliver",
      desc: "Receive your 12-month supply of sustainable, organic menstrual care products delivered directly to your home or a pickup hub.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      detail: "Free shipping in Nairobi",
    },
    {
      num: "03",
      colorBg: "bg-blush-50",
      colorBorder: "border-blush-100",
      colorNum: "text-blush-200",
      colorIcon: "bg-blush-100 text-blush-600",
      colorTag: "bg-blush-100 text-blush-600",
      title: "A Girl Receives Care",
      desc: "Your purchase funds a matched 12-month menstrual care supply for a girl in an underserved community across Africa.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      detail: "1–3 girls per subscription",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-sage-900 leading-tight">
            Simple. Meaningful. Impactful.
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Three steps that connect your self-care to someone else&apos;s future.
          </p>
        </div>

        {/* Cards grid */}
        <div className="relative grid md:grid-cols-3 gap-6 lg:gap-8">

          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-[3.5rem] left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px border-t-2 border-dashed border-sage-100 z-0" />

          {steps.map(({ num, colorBg, colorBorder, colorNum, colorIcon, colorTag, title, desc, icon, detail }) => (
            <div
              key={num}
              className={`relative z-10 rounded-3xl border-2 ${colorBg} ${colorBorder} p-8 group hover:shadow-card hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Background step number */}
              <span
                className={`absolute top-5 right-6 font-display text-7xl font-bold ${colorNum} select-none leading-none`}
              >
                {num}
              </span>

              {/* Icon circle */}
              <div className={`w-14 h-14 rounded-2xl ${colorIcon} flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                {icon}
              </div>

              <h3 className="font-display text-2xl font-bold text-sage-900 mb-3">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{desc}</p>

              {/* Detail tag */}
              <div className={`inline-flex items-center gap-1.5 ${colorTag} text-xs font-semibold px-3 py-1.5 rounded-full`}>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {detail}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <CTAButton href="/choose-path" size="lg" variant="primary">
            Choose Your Plan
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: Impact Stats ──────────────────────────────────────────────────

function ImpactSection() {
  const stats = [
    {
      value: "12,400+",
      label: "Girls Supported",
      desc: "Girls across East Africa who received a full year's menstrual care supply",
      gradient: "from-coral-500 to-blush-500",
    },
    {
      value: "280+",
      label: "Communities Reached",
      desc: "Schools, villages, and urban centres in our active distribution network",
      gradient: "from-sage-500 to-sage-700",
    },
    {
      value: "40+",
      label: "Schools Impacted",
      desc: "Partner schools where students no longer miss class due to period poverty",
      gradient: "from-blush-400 to-coral-500",
    },
  ];

  return (
    <section id="impact" className="py-24 px-4 sm:px-6 lg:px-8 bg-cream-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabel>Real Impact</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-sage-900 leading-tight">
            Measurable Change, <br className="hidden sm:block" />Every Single Day
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Every subscription translates directly into dignity, access, and opportunity.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map(({ value, label, desc, gradient }) => (
            <div
              key={label}
              className="bg-white rounded-3xl border border-sage-100 shadow-soft p-8 text-center hover:shadow-card hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Number */}
              <p
                className={`font-display text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br ${gradient} leading-none mb-4`}
              >
                {value}
              </p>
              {/* Label */}
              <p className="font-bold text-sage-900 text-lg mb-2">{label}</p>
              {/* Divider */}
              <div className={`w-10 h-0.5 bg-gradient-to-r ${gradient} mx-auto mb-3 rounded-full`} />
              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Wide impact image placeholder */}
        <ImagePlaceholder
          label="Community Impact Photography"
          sublabel="Girls in school, smiling, in uniform — before and after distribution"
          gradient="from-sage-100 via-cream-100 to-blush-50"
          className="aspect-[21/7] w-full hidden sm:flex"
        />
        <ImagePlaceholder
          label="Impact Photography"
          gradient="from-sage-100 via-cream-100 to-blush-50"
          className="aspect-[4/3] w-full sm:hidden"
        />

        {/* Testimonial */}
        <div className="mt-10 bg-white rounded-3xl border border-sage-100 shadow-soft p-8 sm:p-10 text-center max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-sage-50 flex items-center justify-center mx-auto mb-5">
            <svg className="w-6 h-6 text-sage-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <blockquote className="font-display text-xl sm:text-2xl italic text-sage-800 leading-snug mb-5">
            &ldquo;For the first time, our girls didn&apos;t miss a single exam week last semester. That is everything.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            {/* Avatar placeholder */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-200 to-coral-100 border border-sage-200" />
            <div className="text-left">
              <p className="font-semibold text-sage-900 text-sm">Dr. Fatima Nkosi</p>
              <p className="text-xs text-gray-400">Head Teacher, Kibera Girls School, Nairobi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: Trust & Sustainability ────────────────────────────────────────

function TrustSection() {
  const trustCards = [
    {
      title: "Biodegradable Materials",
      desc: "Every product we ship uses 100% organic, biodegradable materials — zero plastic waste. Our packaging is fully compostable.",
      color: "bg-sage-50 border-sage-100",
      iconBg: "bg-sage-100",
      iconColor: "text-sage-600",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "NGO Partnerships",
      desc: "We work exclusively with vetted, locally-led NGOs to distribute matched supplies directly to communities — no middlemen.",
      color: "bg-coral-50 border-coral-100",
      iconBg: "bg-coral-100",
      iconColor: "text-coral-600",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "School Outreach Programs",
      desc: "Beyond products, our partners run menstrual health education in schools — breaking stigma and building lasting confidence.",
      color: "bg-blush-50 border-blush-100",
      iconBg: "bg-blush-100",
      iconColor: "text-blush-600",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: "Secure Distribution System",
      desc: "Every supply chain step is tracked and verified. Subscribers receive impact reports confirming their girl's supply was received.",
      color: "bg-sage-50 border-sage-100",
      iconBg: "bg-sage-100",
      iconColor: "text-sage-600",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <SectionLabel>Trust & Sustainability</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-sage-900 leading-tight">
            Why Thousands Trust Us
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            We hold ourselves to the highest standards — for you, and for the girls we serve.
          </p>
        </div>

        {/* 2×2 trust cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-14">
          {trustCards.map(({ title, desc, color, iconBg, iconColor, icon }) => (
            <div
              key={title}
              className={`rounded-3xl border-2 ${color} p-8 flex gap-6 items-start group hover:shadow-card hover:-translate-y-0.5 transition-all duration-300`}
            >
              <div className={`w-14 h-14 rounded-2xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                {icon}
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-sage-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional mini badges */}
        <div className="bg-sage-50 rounded-3xl border border-sage-100 p-6 sm:p-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-sage-400 mb-6">
            Additional Certifications & Commitments
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {[
              { icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              ), label: "Carbon-Neutral Shipping" },
              { icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
              ), label: "Clinically Verified" },
              { icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              ), label: "UN SDG Aligned" },
              { icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              ), label: "SSL Secured Payments" },
              { icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              ), label: "B Corp Pending" },
              { icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
              ), label: "100% Transparent Pricing" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-sage-100 shadow-soft text-sage-600"
              >
                {icon}
                <span className="text-xs font-semibold text-sage-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 6: Final CTA ─────────────────────────────────────────────────────

function FinalCTASection() {
  return (
    <section className="relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-coral-500 via-coral-500 to-blush-500">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-blush-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-coral-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          Join 12,400+ women making a difference
        </div>

        {/* Heading */}
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Start Creating Impact Today
        </h2>

        {/* Sub copy */}
        <p className="text-coral-100 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          Every subscription supports dignity, education, and menstrual equity — for you
          and for a girl who deserves the same.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <CTAButton href="/choose-path" size="lg" variant="white">
            Get Started
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </CTAButton>
          <CTAButton
            href="/corporate"
            size="lg"
            variant="ghost"
            className="border-2 border-white/40 text-white hover:bg-white/15"
          >
            Corporate Plans
          </CTAButton>
        </div>

        {/* Reassurance */}
        <p className="text-coral-200 text-sm">
          Cancel anytime &nbsp;·&nbsp; Eco-friendly packaging &nbsp;·&nbsp; Ships worldwide
        </p>

        {/* Bottom stat row */}
        <div className="mt-14 pt-10 border-t border-white/20 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { value: "12,400+", label: "Girls Funded" },
            { value: "280+", label: "Communities" },
            { value: "94%", label: "School Retention" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-2xl sm:text-3xl font-bold text-white">{value}</p>
              <p className="text-coral-200 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page composition ─────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <HowItWorksSection />
      <ImpactSection />
      <TrustSection />
      <FinalCTASection />
    </>
  );
}
