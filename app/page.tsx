import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
};

export default function HomePage() {
  return <Hero />;
}
