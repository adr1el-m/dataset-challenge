import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "BLAST Slam 6 | Dota 2 Tournament Analysis",
  description:
    "Deep data-driven analysis of the BLAST Slam 6 Dota 2 tournament. Draft Synergy vs Tempo — what really wins championships?",
  keywords: ["Dota 2", "BLAST Slam 6", "esports analytics", "draft analysis", "tournament data"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body bg-dota-bg text-dota-text antialiased grain-overlay">
        <div className="bg-particles" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
