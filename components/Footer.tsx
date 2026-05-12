import Link from "next/link";
import { SITE_TAGLINE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-sage-900 text-sage-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-baseline mb-1">
              <span className="font-display font-bold text-2xl text-white tracking-tight">Luw</span>
              <span className="font-display font-bold text-2xl text-coral-400 italic tracking-tight">á</span>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-400 mb-4">
              {SITE_TAGLINE}
            </p>
            <div className="flex gap-3 mt-6">
              {["Instagram", "Twitter", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-full bg-sage-700 hover:bg-sage-600 flex items-center justify-center text-sage-300 hover:text-white transition-colors text-xs"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-sage-300">
              {[
                { label: "Subscription Plans", href: "/choose-path" },
                { label: "Add-Ons", href: "/add-ons" },
                { label: "Corporate Packages", href: "/corporate" },
                { label: "Gift a Subscription", href: "/choose-path" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Mission
            </h4>
            <ul className="space-y-2 text-sm text-sage-300">
              {[
                { label: "Our Story", href: "#" },
                { label: "Impact Reports", href: "#" },
                { label: "NGO Partners", href: "#" },
                { label: "Press & Media", href: "#" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-sage-300">
              {[
                { label: "FAQ", href: "#" },
                { label: "Shipping Policy", href: "#" },
                { label: "Returns", href: "#" },
                { label: "Contact Us", href: "#" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-sage-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sage-400">
          <p>© {new Date().getFullYear()} Luwá. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-sage-200 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-sage-200 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-sage-200 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
