/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  // Static export only for GitHub Pages — Vercel handles Next.js natively
  ...(isGitHubPages && {
    output: "export",
    basePath: "/menstrual-equity-platform-",
    assetPrefix: "/menstrual-equity-platform-/",
  }),
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
