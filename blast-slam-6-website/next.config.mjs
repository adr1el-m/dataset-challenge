/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  transpilePackages: ["three", "react-plotly.js", "plotly.js"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
