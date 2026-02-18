"use client";

import { motion } from "framer-motion";
import { goldTimeline, modelResults, playoffBracket, tournamentStats } from "@/data/tournament";

const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

export default function KeyFindings() {
  const grandFinal = playoffBracket.find((m) => m.round === "Grand Final");
  const gfScore = grandFinal ? `${grandFinal.scoreA}–${grandFinal.scoreB}` : "—";
  const playoffSummary = playoffBracket.map((m) => `${m.teamA} ${m.scoreA}–${m.scoreB} ${m.teamB}`);
  const { summary } = goldTimeline;
  const modelSummary = [
    { label: "LR AUC", value: modelResults.lrAUC.toFixed(3) },
    { label: "XGB AUC", value: modelResults.xgbAUC.toFixed(3) },
    { label: "LR Acc", value: `${(modelResults.lrAccuracy * 100).toFixed(1)}%` },
    { label: "XGB Acc", value: `${(modelResults.xgbAccuracy * 100).toFixed(1)}%` },
  ];

  return (
    <section id="findings" className="relative py-20 sm:py-32 px-4 sm:px-6 hex-pattern">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-dota-gold text-xs font-semibold uppercase block mb-3"
          >
            Key Takeaways
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Key Findings
          </h2>
          <p className="text-dota-text-dim max-w-xl mx-auto text-sm sm:text-base">
            Data-first takeaways sourced from official results and this project’s dataset.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass-card p-5 sm:p-6 group cursor-default"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 font-mono font-bold text-xs text-dota-gold bg-dota-gold/15 border border-dota-gold/30">
                {tournamentStats.totalGames}
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-dota-gold">
                  Tournament Scale
                </h3>
              </div>
            </div>
            <p className="text-sm text-dota-text-dim leading-relaxed mb-4">
              {tournamentStats.totalGames} official games across {tournamentStats.teamsParticipated} teams in {tournamentStats.location}.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-mono text-dota-text-dim">
              <span className="px-2 py-1 rounded bg-dota-surface/60 border border-dota-border/30">
                Prize Pool {formatCurrency(tournamentStats.prizePool)}
              </span>
              <span className="px-2 py-1 rounded bg-dota-surface/60 border border-dota-border/30">
                Dates Feb 3–15
              </span>
              <span className="px-2 py-1 rounded bg-dota-surface/60 border border-dota-border/30">
                Format Bo5 Grand Final
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass-card p-5 sm:p-6 group cursor-default"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 font-mono font-bold text-xs text-[#06b6d4] bg-[#06b6d4]/15 border border-[#06b6d4]/30">
                {gfScore}
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-[#06b6d4]">
                  Championship Result
                </h3>
              </div>
            </div>
            <p className="text-sm text-dota-text-dim leading-relaxed mb-4">
              {tournamentStats.champion} defeated {tournamentStats.runnerUp} in the Grand Final, {gfScore}.
            </p>
            <div className="space-y-1 text-[10px] font-mono text-dota-text-dim">
              {playoffSummary.map((line) => (
                <div key={line} className="px-2 py-1 rounded bg-dota-surface/60 border border-dota-border/30">
                  {line}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass-card p-5 sm:p-6 group cursor-default"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 font-mono font-bold text-[10px] text-blast-pink bg-blast-pink/15 border border-blast-pink/30">
                {summary.duration}
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-blast-pink">
                  Game 4 Snapshot
                </h3>
              </div>
            </div>
            <p className="text-sm text-dota-text-dim leading-relaxed mb-4">
              Decisive clincher at {summary.duration} with a peak gold lead of {summary.peakGoldLead.toLocaleString()}.
            </p>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-dota-text-dim">
              <div className="px-2 py-1 rounded bg-dota-surface/60 border border-dota-border/30">
                Peak Lead +{summary.peakGoldLead.toLocaleString()}
              </div>
              <div className="px-2 py-1 rounded bg-dota-surface/60 border border-dota-border/30">
                Peak Minute {summary.peakGoldLeadMin}
              </div>
              <div className="px-2 py-1 rounded bg-dota-surface/60 border border-dota-border/30">
                Kills {summary.liquidKills}–{summary.naviKills}
              </div>
              <div className="px-2 py-1 rounded bg-dota-surface/60 border border-dota-border/30">
                Roshan {summary.roshanKills.liquid}–{summary.roshanKills.navi}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass-card p-5 sm:p-6 group cursor-default"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 font-mono font-bold text-[10px] text-purple-300 bg-purple-400/15 border border-purple-400/30">
                12
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-purple-200">
                  Finalists Profile
                </h3>
              </div>
            </div>
            <p className="text-sm text-dota-text-dim leading-relaxed mb-4">
              Two best teams emerged from a 12‑team field, setting up a Liquid vs NaVi finale.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-mono text-dota-text-dim">
              <span className="px-2 py-1 rounded bg-dota-surface/60 border border-dota-border/30">
                Champion {tournamentStats.champion}
              </span>
              <span className="px-2 py-1 rounded bg-dota-surface/60 border border-dota-border/30">
                Runner‑Up {tournamentStats.runnerUp}
              </span>
              <span className="px-2 py-1 rounded bg-dota-surface/60 border border-dota-border/30">
                Location {tournamentStats.location}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass-card p-5 sm:p-6 group cursor-default lg:col-span-2"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 font-mono font-bold text-[10px] text-cyan-200 bg-cyan-400/15 border border-cyan-400/30">
                ML
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-cyan-200">
                  Model Performance
                </h3>
              </div>
            </div>
            <p className="text-sm text-dota-text-dim leading-relaxed mb-4">
              Model metrics derived from the project dataset, not official tournament stats.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono text-dota-text-dim">
              {modelSummary.map((stat) => (
                <div key={stat.label} className="px-2 py-1 rounded bg-dota-surface/60 border border-dota-border/30 text-center">
                  <div className="text-white text-xs font-heading">{stat.value}</div>
                  <div className="text-[9px] text-dota-text-dim">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Summary Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 glass-card p-6 sm:p-8 text-center max-w-3xl mx-auto"
        >
          <h3 className="font-heading text-xl sm:text-2xl font-bold mb-3">
            The Verdict
          </h3>
          <p className="text-sm sm:text-base text-dota-text-dim leading-relaxed">
            {tournamentStats.champion} closed the event in {tournamentStats.location}, winning {gfScore} in the Grand Final.
            The tournament delivered {tournamentStats.totalGames} official games and a {formatCurrency(tournamentStats.prizePool)} prize pool.
          </p>
        </motion.div>
      </div>

      <div className="section-divider mt-20 sm:mt-32" />
    </section>
  );
}
