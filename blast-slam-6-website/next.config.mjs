/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three", "react-plotly.js", "plotly.js"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
