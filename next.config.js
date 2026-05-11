/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? "/menstrual-equity-platform-" : "",
  assetPrefix: isProd ? "/menstrual-equity-platform-/" : "",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
