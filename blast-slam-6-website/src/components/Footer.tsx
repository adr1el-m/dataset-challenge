"use client";

import Image from "next/image";
import { blurDataUrl } from "@/lib/assets";

export default function Footer() {
  return (
    <footer className="relative py-12 sm:py-16 px-4 sm:px-6 border-t border-dota-border/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image
                src="/blast_slam_logo.png"
                alt="BLAST Slam VI"
                width={96}
                height={32}
                className="h-8 w-auto object-contain"
                placeholder="blur"
                blurDataURL={blurDataUrl}
              />
              <span className="font-heading font-bold text-lg">
                <span className="text-dota-gold">BLAST</span>{" "}
                <span className="text-white">SLAM VI</span>
              </span>
            </div>
            <p className="text-xs text-dota-text-dim leading-relaxed max-w-xs">
              A data-driven analysis of BLAST Slam VI — the premier Dota 2 tournament held in Malta, February 2026.
              Champion: Team Liquid 🏆
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold mb-3 text-dota-gold uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-2">
              {[
                { href: "#overview", label: "Tournament Overview" },
                { href: "#teams", label: "Team Explorer" },
                { href: "#heroes", label: "Hero Meta" },
                { href: "#model", label: "Model Dashboard" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-xs text-dota-text-dim hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold mb-3 text-dota-gold uppercase tracking-wider">Data Sources</h4>
            <div className="space-y-2">
              <a
                href="https://liquipedia.net/dota2/BLAST/Slam/6"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-dota-text-dim hover:text-white transition-colors"
              >
                Liquipedia — BLAST Slam 6 →
              </a>
              <p className="text-xs text-dota-text-dim">
                Hero statistics from tournament parse data
              </p>
              <p className="text-xs text-dota-text-dim">
                ML models: Logistic Regression &amp; XGBoost
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-dota-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-dota-text-dim">
            © 2026 BLAST Slam VI Analysis • Built for educational/analytical purposes
          </p>
          <div className="flex items-center gap-4 text-[10px] text-dota-text-dim">
            <span>Next.js</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Plotly.js</span>
            <span>•</span>
            <span>Three.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
