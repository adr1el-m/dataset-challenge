/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three", "react-plotly.js", "plotly.js"],
};

export default nextConfig;
