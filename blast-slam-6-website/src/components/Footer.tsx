"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-20 px-6 border-t border-dota-border/20">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-dota-gold to-dota-gold-light flex items-center justify-center text-dota-bg font-heading font-bold text-sm">
              B6
            </div>
            <span className="font-heading font-bold text-lg tracking-wider">
              <span className="text-dota-gold">BLAST</span>{" "}
              <span className="text-dota-text-dim">SLAM 6</span>
            </span>
          </div>

          <p className="text-sm text-dota-text-dim max-w-lg mx-auto mb-8 leading-relaxed">
            A data-driven analysis of BLAST Slam 6 — celebrating Team Liquid&apos;s historic championship and the greatest reverse sweep in tournament history.
            All data sourced from{" "}
            <a href="https://www.opendota.com" target="_blank" rel="noopener noreferrer" className="text-dota-gold hover:text-dota-gold-light transition-colors underline underline-offset-2">
              OpenDota API
            </a>{" "}
            and{" "}
            <a href="https://liquipedia.net/dota2/BLAST/Slam/6" target="_blank" rel="noopener noreferrer" className="text-dota-gold hover:text-dota-gold-light transition-colors underline underline-offset-2">
              Liquipedia
            </a>.
          </p>

          <div className="flex items-center justify-center gap-6 mb-8 text-xs text-dota-text-dim">
            <span>Next.js</span>
            <span className="text-dota-border">•</span>
            <span>Three.js</span>
            <span className="text-dota-border">•</span>
            <span>Plotly</span>
            <span className="text-dota-border">•</span>
            <span>Framer Motion</span>
            <span className="text-dota-border">•</span>
            <span>XGBoost</span>
          </div>

          <div className="text-xs text-dota-text-dim/50">
            © 2026 BLAST Slam 6 Analysis. Not affiliated with Valve Corporation or BLAST.
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
