import type { Metadata } from "next";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-coral-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated check */}
        <div className="w-24 h-24 bg-gradient-to-br from-sage-400 to-sage-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-elevated">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-bold text-sage-900 mb-4">
          You Did It! 🌸
        </h1>
        <p className="text-gray-500 text-lg mb-8 leading-relaxed max-w-md mx-auto">
          Your order is confirmed. You've just taken a powerful step — for yourself and for a girl
          in Africa who will now have what she needs to thrive.
        </p>

        {/* What happens next */}
        <div className="bg-white rounded-3xl border border-sage-100 shadow-card p-8 mb-8 text-left space-y-5">
          <h2 className="font-display text-xl font-bold text-sage-900 text-center mb-6">
            What Happens Next
          </h2>

          {[
            {
              icon: "📧",
              title: "Confirmation Email",
              desc: "Check your inbox — your order details and receipt are on their way.",
            },
            {
              icon: "📦",
              title: "We Prepare Your Box",
              desc: "Your 12-month supply is carefully packed in eco-friendly materials.",
            },
            {
              icon: "🚀",
              title: "Delivery in 1–5 Business Days",
              desc: "You'll receive tracking info once your package is dispatched.",
            },
            {
              icon: "🌍",
              title: "Your Impact is Activated",
              desc: "Our NGO partners are notified to allocate your matched donation.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="w-10 h-10 bg-sage-50 rounded-xl flex items-center justify-center text-xl shrink-0">
                {icon}
              </div>
              <div>
                <p className="font-semibold text-sage-900 text-sm">{title}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Impact highlight */}
        <div className="bg-gradient-to-r from-coral-500 to-blush-500 rounded-3xl p-6 text-white mb-8">
          <p className="text-2xl mb-2">🌸</p>
          <p className="font-display text-xl font-bold mb-1">Thank You for Making a Difference</p>
          <p className="text-coral-100 text-sm leading-relaxed">
            Because of you, a girl in an underserved community will attend school with confidence
            this year. Your impact is real and measurable.
          </p>
        </div>

        {/* Share */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <CTAButton href="/" variant="primary" size="lg">
            Back to Home
          </CTAButton>
          <CTAButton href="#" variant="secondary" size="lg">
            Share Your Impact
          </CTAButton>
        </div>

        <p className="text-xs text-gray-400">
          Questions?{" "}
          <Link href="#" className="text-sage-500 hover:text-sage-700 underline transition-colors">
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  );
}
