"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef, useEffect, useState } from "react";
import { tournamentStats, matches, grandFinal, teams, champion } from "@/data/tournament";

function Counter({ target, duration = 2000, prefix = "", suffix = "" }: { target: number; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="counter-number tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const completedMatches = matches.filter((m) => m.status === "completed");

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const liquidData = teams.find((t) => t.tag === "Liquid")!;
const naviData = teams.find((t) => t.tag === "NaVi")!;

export default function TournamentOverview() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="overview" className="relative py-32 px-6" ref={sectionRef}>
      {/* Parallax background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dota-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-dota-purple/5 rounded-full blur-[100px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-dota-gold text-xs font-semibold uppercase block mb-3"
          >
            The Tournament
          </motion.span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Tournament Overview
          </h2>
          <p className="text-dota-text-dim max-w-xl mx-auto">
            Ten of the world&apos;s best Dota 2 teams clashed over 13 days in Malta. {champion} emerged victorious with a dominant 3-1 Grand Final victory.
          </p>
        </motion.div>

        {/* Stats grid with stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {[
            { label: "Total Games", value: tournamentStats.totalGames, icon: "🎮" },
            { label: "Avg Duration", value: tournamentStats.avgDuration, suffix: " min", icon: "⏱️" },
            { label: "Heroes Picked", value: tournamentStats.totalHeroesPicked, icon: "⚔️" },
            { label: "Comeback Rate", value: Math.round(tournamentStats.comebackRate * 100), suffix: "%", icon: "🔄" },
            { label: "Longest Game", value: tournamentStats.longestGame, suffix: " min", icon: "🕐" },
            { label: "Shortest Game", value: tournamentStats.shortestGame, suffix: " min", icon: "⚡" },
            { label: "Radiant WR", value: Math.round(tournamentStats.radiantWinRate * 100), suffix: "%", icon: "☀️" },
            { label: "First Blood → Win", value: Math.round(tournamentStats.firstBloodLeadToWin * 100), suffix: "%", icon: "🩸" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass-card p-5 text-center group cursor-default"
            >
              <motion.div
                className="text-2xl mb-2"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                {stat.icon}
              </motion.div>
              <div className="text-2xl sm:text-3xl font-heading font-bold text-white">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-dota-text-dim mt-1.5 uppercase tracking-wider group-hover:text-dota-gold transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 🏆 CHAMPION Grand Final Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative mb-16 rounded-2xl overflow-hidden"
        >
          <div className="rounded-2xl border border-cyan-400/30 shadow-[0_0_60px_rgba(6,182,212,0.12)]">
            <div className="glass-card p-8 sm:p-12 relative overflow-hidden rounded-2xl">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-400/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-dota-gold/5 rounded-full blur-3xl" />

              <div className="text-center relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-400/15 border border-cyan-400/40 mb-6"
                >
                  <span className="text-cyan-300 text-xs font-bold tracking-widest uppercase">
                    🏆 Grand Final — Completed
                  </span>
                </motion.div>

                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
                  {champion} Are Your Champions
                </h3>
                <p className="text-sm text-dota-text-dim mb-8">
                  Dominant 3-1 victory — synergy conquered tempo in Malta
                </p>

                <div className="flex items-center justify-center gap-6 sm:gap-12 mb-8">
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                  >
                    <div className="text-5xl mb-2 float-slow">�</div>
                    <h4 className="font-heading text-xl sm:text-2xl font-bold text-cyan-400">{grandFinal.teamA}</h4>
                    <div className="text-cyan-400/60 text-xs mt-1 uppercase tracking-wider">🏆 Champion</div>
                    <div className="text-xs text-dota-text-dim mt-2">Synergy: {liquidData.synergyIndex} • WR: {(liquidData.winRate * 100).toFixed(0)}%</div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="flex flex-col items-center"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-heading font-bold text-cyan-400">{grandFinal.scoreA}</span>
                      <span className="text-xl font-heading font-bold text-dota-text-dim/50">-</span>
                      <span className="text-3xl font-heading font-bold text-dota-text-dim">{grandFinal.scoreB}</span>
                    </div>
                    <span className="text-[10px] text-dota-text-dim/50 mt-1">Best of 5</span>
                  </motion.div>

                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
                  >
                    <div className="text-5xl mb-2 float-slow" style={{ animationDelay: "2s" }}>⚔️</div>
                    <h4 className="font-heading text-xl sm:text-2xl font-bold text-dota-gold">{grandFinal.teamB}</h4>
                    <div className="text-dota-gold/60 text-xs mt-1 uppercase tracking-wider">Runner-up</div>
                    <div className="text-xs text-dota-text-dim mt-2">Tempo: {naviData.tempoIndex} • WR: {(naviData.winRate * 100).toFixed(0)}%</div>
                  </motion.div>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="text-sm text-dota-text-dim max-w-lg mx-auto"
                >
                  Liquid controlled the series from start to finish. miCKe and Nisha&apos;s synergistic play dismantled NaVi&apos;s tempo approach across four games.
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Match Results Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-heading text-2xl font-bold text-center mb-3">Match Results</h3>
          <p className="text-center text-sm text-dota-text-dim mb-10">All {completedMatches.length} matches completed</p>

          <div className="space-y-3 max-w-3xl mx-auto">
            {completedMatches.map((match, i) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04, type: "spring", stiffness: 120 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className={`glass-card p-4 flex items-center gap-4 cursor-default ${match.isUpset ? "border-dota-dire/30" : ""}`}
              >
                <div className="hidden sm:block text-xs text-dota-text-dim w-32 shrink-0 font-mono">
                  {match.round}
                </div>
                <div className="flex-1 flex items-center justify-between gap-2">
                  <span className={`font-medium text-sm ${match.winner === match.teamA ? "text-dota-radiant" : "text-dota-text-dim"}`}>
                    {match.teamA}
                  </span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className={`text-lg font-bold ${match.winner === match.teamA ? "text-white" : "text-dota-text-dim"}`}>
                      {match.scoreA}
                    </span>
                    <span className="text-dota-text-dim text-xs">:</span>
                    <span className={`text-lg font-bold ${match.winner === match.teamB ? "text-white" : "text-dota-text-dim"}`}>
                      {match.scoreB}
                    </span>
                  </div>
                  <span className={`font-medium text-sm ${match.winner === match.teamB ? "text-dota-radiant" : "text-dota-text-dim"}`}>
                    {match.teamB}
                  </span>
                </div>
                {match.isUpset && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.3 }}
                    className="px-2 py-0.5 rounded-full bg-dota-dire/20 text-dota-dire text-[10px] font-semibold uppercase tracking-wider shrink-0"
                  >
                    Upset
                  </motion.span>
                )}
              </motion.div>
            ))}

            {/* Grand Final Result in timeline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card p-4 flex items-center gap-4 border-cyan-400/30 relative overflow-hidden"
            >
              <div className="hidden sm:block text-xs text-cyan-400 w-32 shrink-0 font-mono font-bold">
                Grand Final
              </div>
              <div className="flex-1 flex items-center justify-between gap-2">
                <span className="font-medium text-sm text-cyan-400">Team Liquid</span>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-lg font-bold text-cyan-400">{grandFinal.scoreA}</span>
                  <span className="text-dota-text-dim text-xs">:</span>
                  <span className="text-lg font-bold text-dota-text-dim">{grandFinal.scoreB}</span>
                </div>
                <span className="font-medium text-sm text-dota-text-dim">Natus Vincere</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-semibold uppercase tracking-wider shrink-0">
                🏆 Champion
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="section-divider mt-32" />
    </section>
  );
}
