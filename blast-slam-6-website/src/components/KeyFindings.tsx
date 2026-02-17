"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  modelResults,
  tournamentStats,
  teams,
  isImageLogo,
} from "@/data/tournament";

export default function KeyFindings() {
  const { scrollYProgress } = useScroll();
  const glowX = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const { grandFinalPrediction } = modelResults;
  const liquid = teams.find((t) => t.tag === "Liquid")!;
  const navi = teams.find((t) => t.tag === "NaVi")!;

  const findings = [
    {
      icon: "🧠",
      title: "Synergy Is King",
      stat: `${tournamentStats.synergyVsTempoRatio.toFixed(2)}×`,
      description:
        "Synergy index correlates more strongly with match wins than tempo index. Teams that draft cohesively outperform those that rely on raw speed.",
      color: "#3b82f6",
    },
    {
      icon: "⚡",
      title: "Tempo Has a Ceiling",
      stat: "54.1%",
      description:
        "High-tempo teams win 54.1% of games — barely above coin-flip. Tempo alone isn't enough at the highest level.",
      color: "#ef4444",
    },
    {
      icon: "🐉",
      title: "Liquid's Dominance",
      stat: `${(grandFinalPrediction.liquidWinProb * 100).toFixed(1)}%`,
      description:
        "Our XGBoost model gave Liquid the edge pre-Grand Final. Their synergy index (82.1) and consistent form were the primary drivers — and it proved correct.",
      color: "#06b6d4",
    },
    {
      icon: "⚔️",
      title: "NaVi's X-Factor",
      stat: "79.3",
      description:
        "NaVi's tempo index was the highest among finalists. They pushed early fights and snowballed in the group stage, but this approach fell short in a Bo5 Grand Final.",
      color: "#c9a537",
    },
    {
      icon: "📊",
      title: "Model Confidence",
      stat: `${(modelResults.xgbAUC * 100).toFixed(1)}%`,
      description:
        `XGBoost achieves ${(modelResults.xgbAUC * 100).toFixed(1)}% AUC-ROC — meaningful signal, but Dota's chaos factor means upsets are always possible.`,
      color: "#22c55e",
    },
    {
      icon: "🎯",
      title: "Draft Decided It",
      stat: "86%",
      description:
        "Jakiro sat at 86% contest rate — the most contested hero of the tournament. Teams that adapted their drafts around the meta thrived.",
      color: "#a855f7",
    },
  ];

  return (
    <section id="predictions" className="relative py-32 px-6 overflow-hidden">
      {/* Parallax glow */}
      <motion.div
        style={{ x: glowX }}
        className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-dota-gold/3 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-dota-gold text-xs font-semibold uppercase block mb-3"
          >
            Predictions & Projections
          </motion.span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Key Findings
          </h2>
          <p className="text-dota-text-dim max-w-xl mx-auto">
            What the data revealed about the Grand Final between Team Liquid
            and Natus Vincere on February 15 — and how our model predicted the outcome.
          </p>
        </motion.div>

        {/* Grand Final Prediction Hero Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring" }}
          className="glass-card p-8 mb-16 relative overflow-hidden upcoming-pulse"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-dota-gold/5 via-transparent to-dota-blue/5 pointer-events-none" />
          <div className="relative z-10">
            <h3 className="font-heading text-2xl font-bold text-center mb-8">
              Model Prediction vs Reality — Grand Final
            </h3>

            {/* VS matchup with probability bars */}
            <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80 }}
                className="text-center flex-1 max-w-[200px]"
              >
                <motion.span
                  className="block mb-2 h-12 w-12 mx-auto"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {isImageLogo(liquid.logo) ? (
                    <Image
                      src={liquid.logo}
                      alt={`${liquid.name} logo`}
                      width={48}
                      height={48}
                      sizes="48px"
                      className="h-full w-full object-contain drop-shadow-[0_0_6px_rgba(0,0,0,0.35)]"
                    />
                  ) : (
                    <span className="text-5xl">{liquid.logo}</span>
                  )}
                </motion.span>
                <span className="font-heading font-bold text-lg block">{liquid.name}</span>
                <span className="text-xs text-dota-text-dim">{liquid.placement}</span>
              </motion.div>

              <div className="text-center">
                <span className="font-heading text-3xl font-bold text-dota-gold">VS</span>
              </div>

              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80 }}
                className="text-center flex-1 max-w-[200px]"
              >
                <motion.span
                  className="block mb-2 h-12 w-12 mx-auto"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                >
                  {isImageLogo(navi.logo) ? (
                    <Image
                      src={navi.logo}
                      alt={`${navi.name} logo`}
                      width={48}
                      height={48}
                      sizes="48px"
                      className="h-full w-full object-contain drop-shadow-[0_0_6px_rgba(0,0,0,0.35)]"
                    />
                  ) : (
                    <span className="text-5xl">{navi.logo}</span>
                  )}
                </motion.span>
                <span className="font-heading font-bold text-lg block">{navi.name}</span>
                <span className="text-xs text-dota-text-dim">{navi.placement}</span>
              </motion.div>
            </div>

            {/* Probability bar */}
            <div className="max-w-lg mx-auto mb-8">
              <div className="flex justify-between text-sm font-heading font-bold mb-2">
                <span style={{ color: liquid.color }}>
                  {(grandFinalPrediction.liquidWinProb * 100).toFixed(1)}%
                </span>
                <span className="text-dota-text-dim text-xs self-center">Win Probability</span>
                <span style={{ color: navi.color }}>
                  {(grandFinalPrediction.naviWinProb * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-4 rounded-full overflow-hidden flex bg-dota-surface">
                <motion.div
                  initial={{ width: "50%" }}
                  whileInView={{ width: `${grandFinalPrediction.liquidWinProb * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                  className="h-full rounded-l-full"
                  style={{ backgroundColor: liquid.color }}
                />
                <motion.div
                  initial={{ width: "50%" }}
                  whileInView={{ width: `${grandFinalPrediction.naviWinProb * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                  className="h-full rounded-r-full"
                  style={{ backgroundColor: navi.color }}
                />
              </div>
            </div>

            {/* Key Factors */}
            <div>
              <h4 className="text-sm font-semibold text-center mb-4 text-dota-text-dim uppercase tracking-wider">
                Key Factors
              </h4>
              <div className="space-y-2 max-w-xl mx-auto">
                {grandFinalPrediction.keyFactors.map((factor, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3 text-sm text-dota-text-dim"
                  >
                    <span className="text-dota-gold mt-0.5 shrink-0">▸</span>
                    <span>{factor}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Findings Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {findings.map((finding, i) => (
            <motion.div
              key={finding.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="glass-card p-6 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.span
                  className="text-2xl"
                  whileHover={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {finding.icon}
                </motion.span>
                <h4 className="font-heading font-bold">{finding.title}</h4>
              </div>
              <div
                className="text-3xl font-heading font-bold mb-3"
                style={{ color: finding.color }}
              >
                {finding.stat}
              </div>
              <p className="text-sm text-dota-text-dim leading-relaxed">
                {finding.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-xs text-dota-text-dim max-w-lg mx-auto">
            ⚠️ These predictions are based on statistical models trained on {tournamentStats.totalGames} games.
            Dota 2 is inherently unpredictable — draft innovation, player condition, and momentum
            can override any model. Use these insights as context, not gospel.
          </p>
        </motion.div>
      </div>

      <div className="section-divider mt-32" />
    </section>
  );
}
