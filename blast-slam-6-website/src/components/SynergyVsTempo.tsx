"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  synergyTempoScatter,
  goldTimeline,
  tournamentStats,
  teams,
  isImageLogo,
} from "@/data/tournament";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function SynergyVsTempo() {
  const [showAnnotations, setShowAnnotations] = useState(true);
  const { scrollYProgress } = useScroll();
  const glowY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const grandFinalists = teams.filter((t) => t.tag === "Liquid" || t.tag === "NaVi");

  return (
    <section id="analysis" className="relative py-32 px-6 overflow-hidden">
      {/* Parallax background glow */}
      <motion.div
        style={{ y: glowY }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-dota-blue/5 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-60, 60]) }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-dota-dire/5 rounded-full blur-[120px] pointer-events-none"
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
            Core Analysis
          </motion.span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient-blue">Synergy</span> vs{" "}
            <span className="text-gradient-red">Tempo</span>
          </h2>
          <p className="text-dota-text-dim max-w-2xl mx-auto">
            Across {tournamentStats.totalGames} games, a clear pattern
            emerged: teams that mastered{" "}
            <span className="text-dota-blue font-semibold">
              draft synergy
            </span>{" "}
            won more than those relying on{" "}
            <span className="text-dota-dire font-semibold">
              raw early-game tempo
            </span>
            . The Grand Finalists embodied this tension perfectly.
          </p>
        </motion.div>

        {/* Grand Finalist Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {grandFinalists.map((team, i) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                type: "spring",
                stiffness: 80,
              }}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-6 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  background: `radial-gradient(circle at ${
                    i === 0 ? "top left" : "top right"
                  }, ${team.color}, transparent 70%)`,
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  {isImageLogo(team.logo) ? (
                    <Image
                      src={team.logo}
                      alt={`${team.name} logo`}
                      width={40}
                      height={40}
                      sizes="40px"
                      className="h-10 w-10 object-contain drop-shadow-[0_0_6px_rgba(0,0,0,0.35)]"
                    />
                  ) : (
                    <span className="text-3xl">{team.logo}</span>
                  )}
                  <div>
                    <h3 className="font-heading text-xl font-bold">
                      {team.name}
                    </h3>
                    <span className="text-xs text-dota-text-dim">
                      {team.placement}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-dota-text-dim uppercase tracking-wider mb-1">
                      Synergy Index
                    </div>
                    <div className="flex items-end gap-2">
                      <span
                        className="text-2xl font-heading font-bold"
                        style={{ color: "#3b82f6" }}
                      >
                        {team.synergyIndex.toFixed(1)}
                      </span>
                      <div className="flex-1 h-2 bg-dota-bg/50 rounded-full overflow-hidden mb-1">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${(team.synergyIndex / 100) * 100}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full rounded-full bg-dota-blue"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-dota-text-dim uppercase tracking-wider mb-1">
                      Tempo Index
                    </div>
                    <div className="flex items-end gap-2">
                      <span
                        className="text-2xl font-heading font-bold"
                        style={{ color: "#ef4444" }}
                      >
                        {team.tempoIndex.toFixed(1)}
                      </span>
                      <div className="flex-1 h-2 bg-dota-bg/50 rounded-full overflow-hidden mb-1">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${(team.tempoIndex / 100) * 100}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.4 }}
                          className="h-full rounded-full bg-dota-dire"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-dota-text-dim leading-relaxed">
                  {i === 0
                    ? "Liquid's strength was their adaptable drafting — high synergy let them counter any strategy mid-draft, leading to a dominant 3-1 Grand Final."
                    : "NaVi compensated for slightly lower synergy with raw aggression — the highest tempo index among finalists. But tempo alone wasn't enough."}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scatter Plot */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="glass-card p-6 mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading text-lg font-bold">
                The Playstyle Landscape
              </h3>
              <p className="text-xs text-dota-text-dim">
                Every team&apos;s position in the synergy–tempo space (bubble
                size = games played)
              </p>
            </div>
            <motion.button
              onClick={() => setShowAnnotations(!showAnnotations)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-dota-surface/50 text-dota-text-dim border border-dota-border/30 hover:border-dota-border/60 transition-all"
            >
              {showAnnotations ? "Hide" : "Show"} Labels
            </motion.button>
          </div>

          <div className="chart-container">
            <Plot
              data={[
                {
                  type: "scatter" as const,
                  mode: "text+markers" as const,
                  x: synergyTempoScatter.map((t) => t.synergy),
                  y: synergyTempoScatter.map((t) => t.tempo),
                  text: showAnnotations
                    ? synergyTempoScatter.map((t) => t.name)
                    : [],
                  textposition: "top center" as const,
                  textfont: { color: "#e2e8f0", size: 10 },
                  marker: {
                    size: synergyTempoScatter.map((t) => t.size),
                    color: synergyTempoScatter.map((t) => t.color),
                    opacity: synergyTempoScatter.map((t) => {
                      const team = teams.find((tm) => tm.name === t.name);
                      return team?.eliminated ? 0.4 : 0.9;
                    }),
                    line: {
                      width: synergyTempoScatter.map((t) => {
                        const team = teams.find((tm) => tm.name === t.name);
                        return team?.eliminated ? 0 : 2;
                      }),
                      color: "rgba(255,255,255,0.3)",
                    },
                  },
                  hovertemplate:
                    "%{text}<br>Synergy: %{x:.1f}<br>Tempo: %{y:.1f}<br>Win Rate: %{customdata:.0f}%<extra></extra>",
                  customdata: synergyTempoScatter.map(
                    (t) => t.winRate * 100
                  ),
                },
              ]}
              layout={{
                xaxis: {
                  title: { text: "Synergy Index", font: { color: "#3b82f6" } },
                  gridcolor: "rgba(42,42,64,0.3)",
                  zerolinecolor: "rgba(42,42,64,0.3)",
                  tickfont: { color: "#9ca3af" },
                  range: [55, 90],
                },
                yaxis: {
                  title: { text: "Tempo Index", font: { color: "#ef4444" } },
                  gridcolor: "rgba(42,42,64,0.3)",
                  zerolinecolor: "rgba(42,42,64,0.3)",
                  tickfont: { color: "#9ca3af" },
                  range: [52, 85],
                },
                paper_bgcolor: "transparent",
                plot_bgcolor: "transparent",
                font: { color: "#9ca3af" },
                margin: { l: 60, r: 30, t: 20, b: 60 },
                height: 500,
                showlegend: false,
                annotations: [
                  {
                    x: 82,
                    y: 78,
                    text: "⭐ IDEAL ZONE",
                    showarrow: false,
                    font: { color: "#c9a537", size: 11 },
                  },
                  {
                    x: 82,
                    y: 56,
                    text: "🧠 Synergy-Heavy",
                    showarrow: false,
                    font: { color: "#3b82f6", size: 10 },
                  },
                  {
                    x: 60,
                    y: 78,
                    text: "⚡ Tempo-Heavy",
                    showarrow: false,
                    font: { color: "#ef4444", size: 10 },
                  },
                ],
                shapes: [
                  {
                    type: "rect",
                    x0: 74,
                    x1: 85,
                    y0: 70,
                    y1: 82,
                    line: {
                      color: "rgba(201,165,55,0.15)",
                      width: 1,
                      dash: "dash",
                    },
                    fillcolor: "rgba(201,165,55,0.03)",
                  },
                ],
              }}
              config={{ displayModeBar: false, responsive: true }}
              style={{ width: "100%", height: "500px" }}
            />
          </div>
        </motion.div>

        {/* Gold Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-6 mb-12"
        >
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-heading text-lg font-bold">
                Gold Advantage Timeline
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-dota-gold/10 text-dota-gold border border-dota-gold/30 uppercase tracking-wider">
                Key Match
              </span>
            </div>
            <p className="text-xs text-dota-text-dim">
              {goldTimeline.matchContext} — {goldTimeline.teamA} vs{" "}
              {goldTimeline.teamB}
            </p>
          </div>

          <div className="chart-container">
            <Plot
              data={[
                {
                  type: "scatter" as const,
                  mode: "lines" as const,
                  x: goldTimeline.minutes,
                  y: goldTimeline.goldDiff,
                  name: "Gold Advantage",
                  fill: "tozeroy",
                  fillcolor: "rgba(201,165,55,0.1)",
                  line: { color: "#c9a537", width: 2.5, shape: "spline" as const },
                },
                {
                  type: "scatter" as const,
                  mode: "lines" as const,
                  x: goldTimeline.minutes,
                  y: goldTimeline.xpDiff,
                  name: "XP Advantage",
                  line: {
                    color: "#8b5cf6",
                    width: 1.5,
                    dash: "dot" as const,
                    shape: "spline" as const,
                  },
                },
              ]}
              layout={{
                xaxis: {
                  title: { text: "Game Time (minutes)" },
                  gridcolor: "rgba(42,42,64,0.3)",
                  tickfont: { color: "#9ca3af" },
                },
                yaxis: {
                  title: { text: "Gold Diff (+ = Liquid)" },
                  gridcolor: "rgba(42,42,64,0.3)",
                  tickfont: { color: "#9ca3af" },
                  zerolinecolor: "rgba(201,165,55,0.3)",
                  zerolinewidth: 2,
                },
                paper_bgcolor: "transparent",
                plot_bgcolor: "transparent",
                font: { color: "#9ca3af" },
                margin: { l: 70, r: 30, t: 10, b: 50 },
                height: 350,
                showlegend: true,
                legend: {
                  x: 0.02,
                  y: 0.98,
                  font: { color: "#9ca3af", size: 10 },
                  bgcolor: "rgba(10,10,18,0.8)",
                },
                annotations: goldTimeline.events.map((e) => ({
                  x: e.minute,
                  y:
                    goldTimeline.goldDiff[
                      goldTimeline.minutes.indexOf(
                        goldTimeline.minutes.reduce((prev, curr) =>
                          Math.abs(curr - e.minute) <
                          Math.abs(prev - e.minute)
                            ? curr
                            : prev
                        )
                      )
                    ] || 0,
                  text: e.text,
                  showarrow: true,
                  arrowhead: 2,
                  arrowsize: 0.8,
                  arrowcolor:
                    e.type === "radiant"
                      ? "rgba(34,197,94,0.6)"
                      : "rgba(239,68,68,0.6)",
                  font: {
                    size: 9,
                    color:
                      e.type === "radiant" ? "#22c55e" : "#ef4444",
                  },
                  bgcolor: "rgba(10,10,18,0.9)",
                  borderpad: 3,
                  ax: 0,
                  ay: e.type === "radiant" ? -30 : 30,
                })),
              }}
              config={{ displayModeBar: false, responsive: true }}
              style={{ width: "100%", height: "350px" }}
            />
          </div>
        </motion.div>

        {/* Key Insight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card p-6 sm:p-8 border-l-4 border-dota-gold"
        >
          <div className="flex items-start gap-4">
            <motion.span
              className="text-3xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🔬
            </motion.span>
            <div>
              <h4 className="font-heading font-bold text-lg mb-2">
                Confirmed Pattern
              </h4>
              <p className="text-sm text-dota-text-dim leading-relaxed">
                The full tournament data tells a compelling story: synergy-index
                had a {" "}
                <span className="text-dota-blue font-semibold">
                  {tournamentStats.synergyVsTempoRatio.toFixed(2)}×
                </span>{" "}
                stronger correlation with match wins than tempo-index alone.
                Teams with above-average synergy won{" "}
                <span className="text-dota-gold font-semibold">62.3%</span> of
                their games, while teams relying primarily on tempo won only{" "}
                <span className="text-dota-text-dim font-semibold">54.1%</span>.
                Liquid&apos;s balanced approach (high synergy, solid tempo)
                versus NaVi&apos;s tempo-first strategy made the Grand Final a
                perfect test — and synergy won decisively, 3-1.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="section-divider mt-32" />
    </section>
  );
}
