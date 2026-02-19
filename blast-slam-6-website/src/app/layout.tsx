import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://adr1el-m.github.io/dataset-challenge";
const title = "BLAST Slam 6 | Dota 2 Tournament Analysis";
const description =
  "Deep data-driven analysis of the BLAST Slam 6 Dota 2 tournament. Draft Synergy vs Tempo — what really wins championships?";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: ["Dota 2", "BLAST Slam 6", "esports analytics", "draft analysis", "tournament data"],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/blast_slam_logo.png",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "BLAST Slam VI Analysis",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "BLAST Slam VI Analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "BLAST Slam VI Analysis",
        url: siteUrl,
        description,
        publisher: {
          "@type": "Organization",
          name: "BLAST Slam VI Analysis",
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/blast_slam_logo.png`,
          },
        },
      },
      {
        "@type": "WebPage",
        name: title,
        url: siteUrl,
        description,
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body bg-dota-bg text-dota-text antialiased grain-overlay">
        <Script id="structured-data" type="application/ld+json">
          {JSON.stringify(structuredData)}
        </Script>
        <div className="bg-particles" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
