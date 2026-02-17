"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { heroMeta, type HeroMeta as HeroMetaType } from "@/data/tournament";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type RoleFilter = "all" | HeroMetaType["role"];

const roleColors: Record<string, string> = {
  carry: "#c9a537",
  mid: "#3b82f6",
  offlane: "#ef4444",
  support: "#22c55e",
  hard_support: "#a855f7",
};

const roleLabels: Record<string, string> = {
  all: "All Roles",
  carry: "Carry",
  mid: "Mid",
  offlane: "Offlane",
  support: "Support",
  hard_support: "Hard Support",
};

export default function HeroMeta() {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [sortBy, setSortBy] = useState<"contestRate" | "winRate" | "picks">("contestRate");
  const [hoveredHero, setHoveredHero] = useState<string | null>(null);

  const filteredHeroes = useMemo(() => {
    const filtered = roleFilter === "all" ? heroMeta : heroMeta.filter((h) => h.role === roleFilter);
    return [...filtered].sort((a, b) => {
      if (sortBy === "picks") return b.picks - a.picks;
      return b[sortBy] - a[sortBy];
    });
  }, [roleFilter, sortBy]);

  const topContested = useMemo(() => [...heroMeta].sort((a, b) => b.contestRate - a.contestRate).slice(0, 10), []);
  return (
    <section id="heroes" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
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
            Hero Meta Analysis
          </motion.span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Who Rules the Meta?
          </h2>
          <p className="text-dota-text-dim max-w-xl mx-auto">
            Complete hero pick/ban data across all <span className="text-dota-gold">100 games</span> — the meta that crowned Team Liquid champions.
          </p>
        </motion.div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
            className="glass-card p-5"
          >
            <h3 className="font-heading text-lg font-bold mb-1">Most Contested Heroes</h3>
            <p className="text-xs text-dota-text-dim mb-4">Pick + Ban Rate (top 10)</p>
            <div className="chart-container">
              <Plot
                data={[
                  {
                    type: "bar" as const,
                    orientation: "h" as const,
                    y: topContested.map((h) => h.name),
                    x: topContested.map((h) => h.contestRate * 100),
                    marker: {
                      color: topContested.map((h) => roleColors[h.role] || "#64748b"),
                    },
                    text: topContested.map((h) => `${(h.contestRate * 100).toFixed(0)}%`),
                    textposition: "outside" as const,
                    textfont: { color: "#e2e8f0", size: 10 },
                    hovertemplate: "%{y}: %{x:.1f}% contest rate<extra></extra>",
                  },
                ]}
                layout={{
                  yaxis: { autorange: "reversed" as const, tickfont: { color: "#9ca3af", size: 11 }, gridcolor: "transparent" },
                  xaxis: { title: { text: "Contest Rate (%)" }, tickfont: { color: "#9ca3af" }, gridcolor: "rgba(42,42,64,0.3)", range: [0, 100] },
                  margin: { l: 120, r: 50, t: 10, b: 40 },
                  paper_bgcolor: "transparent",
                  plot_bgcolor: "transparent",
                  font: { color: "#9ca3af" },
                  height: 400,
                }}
                config={{ displayModeBar: false, responsive: true }}
                style={{ width: "100%", height: "400px" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
            className="glass-card p-5"
          >
            <h3 className="font-heading text-lg font-bold mb-1">Win Rate vs Pick Rate</h3>
            <p className="text-xs text-dota-text-dim mb-4">Bubble size = total picks (min 10 picks shown)</p>
            <div className="chart-container">
              <Plot
                data={[
                  {
                    type: "scatter" as const,
                    mode: "text+markers" as const,
                    x: heroMeta.filter((h) => h.picks >= 10).map((h) => h.picks),
                    y: heroMeta.filter((h) => h.picks >= 10).map((h) => h.winRate * 100),
                    text: heroMeta.filter((h) => h.picks >= 10).map((h) => h.name.slice(0, 3)),
                    textposition: "top center" as const,
                    textfont: { color: "#e2e8f0", size: 9 },
                    marker: {
                      size: heroMeta.filter((h) => h.picks >= 10).map((h) => h.picks * 1.2 + 6),
                      color: heroMeta.filter((h) => h.picks >= 10).map((h) => roleColors[h.role] || "#64748b"),
                      opacity: 0.8,
                      line: { width: 1, color: "rgba(255,255,255,0.2)" },
                    },
                    hovertemplate: "%{text}: %{y:.1f}% WR, %{x} picks<extra></extra>",
                  },
                ]}
                layout={{
                  xaxis: { title: { text: "Total Picks" }, tickfont: { color: "#9ca3af" }, gridcolor: "rgba(42,42,64,0.3)" },
                  yaxis: { title: { text: "Win Rate (%)" }, tickfont: { color: "#9ca3af" }, gridcolor: "rgba(42,42,64,0.3)", range: [40, 70] },
                  margin: { l: 60, r: 20, t: 10, b: 50 },
                  paper_bgcolor: "transparent",
                  plot_bgcolor: "transparent",
                  font: { color: "#9ca3af" },
                  height: 400,
                  shapes: [
                    { type: "line", x0: 0, x1: 30, y0: 50, y1: 50, line: { color: "rgba(201,165,55,0.3)", dash: "dash", width: 1 } },
                  ],
                  annotations: [
                    { x: 26, y: 50.5, text: "50% WR", showarrow: false, font: { color: "#c9a537", size: 9 } },
                  ],
                }}
                config={{ displayModeBar: false, responsive: true }}
                style={{ width: "100%", height: "400px" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Hero Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h3 className="font-heading text-xl font-bold">Hero Breakdown</h3>
            <div className="flex flex-wrap gap-2">
              {(["all", "carry", "mid", "offlane", "support", "hard_support"] as const).map((role) => (
                <motion.button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    roleFilter === role
                      ? "text-dota-bg"
                      : "bg-dota-surface/50 text-dota-text-dim border border-dota-border/30 hover:border-dota-border/60"
                  }`}
                  style={roleFilter === role ? { backgroundColor: roleColors[role] || "#c9a537" } : {}}
                >
                  {roleLabels[role]}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            {(["contestRate", "winRate", "picks"] as const).map((field) => (
              <button
                key={field}
                onClick={() => setSortBy(field)}
                className={`text-xs font-medium transition-colors ${
                  sortBy === field ? "text-dota-gold" : "text-dota-text-dim hover:text-white"
                }`}
              >
                Sort: {field === "contestRate" ? "Contest %" : field === "winRate" ? "Win Rate" : "Picks"}{" "}
                {sortBy === field && "▼"}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-dota-text-dim text-xs uppercase tracking-wider border-b border-dota-border/30">
                  <th className="pb-3 pr-4">#</th>
                  <th className="pb-3 pr-4">Hero</th>
                  <th className="pb-3 pr-4">Role</th>
                  <th className="pb-3 pr-4 text-center">Picks</th>
                  <th className="pb-3 pr-4 text-center">Bans</th>
                  <th className="pb-3 pr-4 text-center">Win Rate</th>
                  <th className="pb-3">Contest Rate</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredHeroes.map((hero, i) => (
                    <motion.tr
                      key={hero.name}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: i * 0.02, type: "spring", stiffness: 200 }}
                      onMouseEnter={() => setHoveredHero(hero.name)}
                      onMouseLeave={() => setHoveredHero(null)}
                      className={`border-b border-dota-border/10 transition-colors ${
                        hoveredHero === hero.name ? "bg-dota-surface/40" : ""
                      }`}
                    >
                      <td className="py-3 pr-4 text-dota-text-dim text-xs">{i + 1}</td>
                      <td className="py-3 pr-4 font-medium">{hero.name}</td>
                      <td className="py-3 pr-4">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{ backgroundColor: `${roleColors[hero.role]}20`, color: roleColors[hero.role] }}
                        >
                          {roleLabels[hero.role]}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-center font-mono">{hero.picks}</td>
                      <td className="py-3 pr-4 text-center font-mono text-dota-text-dim">{hero.bans}</td>
                      <td className="py-3 pr-4 text-center">
                        <span className={hero.winRate >= 0.55 ? "text-dota-radiant" : hero.winRate < 0.5 ? "text-dota-dire" : ""}>
                          {(hero.winRate * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-dota-bg/50 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${hero.contestRate * 100}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: i * 0.03, ease: "easeOut" }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: roleColors[hero.role] }}
                            />
                          </div>
                          <span className="text-xs font-mono w-10 text-right">{(hero.contestRate * 100).toFixed(0)}%</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-4 p-3 rounded-lg bg-dota-gold/5 border border-dota-gold/20"
          >
            <p className="text-xs text-dota-text-dim">
              <span className="text-cyan-400 font-semibold">Tournament Insight:</span> Jakiro dominated with 86% contest rate, while Tiny was the most picked hero (39 picks). Liquid&apos;s adaptable drafting — never relying on a single comfort pick — proved decisive in their championship run.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="section-divider mt-32" />
    </section>
  );
}
