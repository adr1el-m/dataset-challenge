"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { synergyTempoScatter, teams } from "@/data/tournament";
import TeamLogo from "./TeamLogo";
import { getTeamLogo } from "@/lib/assets";
import ErrorBoundary from "./ErrorBoundary";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <div className="w-full h-[480px] rounded-lg bg-dota-surface/50 border border-dota-border/20 shimmer-overlay" />,
});

export default function SynergyVsTempo() {
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);

  /* Build Plotly images array — one team logo per data point, positioned on the chart */
  const plotImages = synergyTempoScatter.map((d) => ({
    source: getTeamLogo(d.name),
    xref: "x" as const,
    yref: "y" as const,
    x: d.synergy,
    y: d.tempo,
    sizex: 5,
    sizey: 5,
    xanchor: "center" as const,
    yanchor: "middle" as const,
    layer: "above" as const,
    opacity: hoveredTeam === null || hoveredTeam === d.name ? 1 : 0.3,
  }));

  return (
    <section id="synergy" className="relative py-20 sm:py-32 px-4 sm:px-6">
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
            Playstyle Fingerprints
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Synergy vs Tempo
          </h2>
          <p className="text-dota-text-dim max-w-xl mx-auto text-sm sm:text-base">
            The two core philosophies of competitive Dota — mapped across all <span className="text-dota-gold">12 teams</span>.
            Marker size reflects win rate; team logos positioned on chart coordinates.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Scatter Plot */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 glass-card p-4 sm:p-6"
          >
            <div className="chart-container">
              <ErrorBoundary
                fallback={<div className="w-full h-[480px] rounded-lg bg-dota-surface/50 border border-dota-border/20" />}
              >
                <Plot
                data={[
                  {
                    type: "scatter" as const,
                    mode: "markers" as const,
                    x: synergyTempoScatter.map((d) => d.synergy),
                    y: synergyTempoScatter.map((d) => d.tempo),
                    marker: {
                      size: synergyTempoScatter.map((d) => d.winRate * 60 + 8),
                      color: synergyTempoScatter.map((d) => d.color),
                      opacity: 0.2,
                      line: { width: 2, color: synergyTempoScatter.map((d) => d.color) },
                    },
                    customdata: synergyTempoScatter.map((d) => {
                      const team = teams.find((t) => t.name === d.name);
                      return [
                        d.name,
                        d.synergy.toFixed(1),
                        d.tempo.toFixed(1),
                        (d.winRate * 100).toFixed(1),
                        team?.matchCount ?? 0,
                        team?.placement ?? "—",
                        team?.region ?? "—",
                        team?.avgDuration?.toFixed(1) ?? "—",
                        (team?.firstBloodRate ? (team.firstBloodRate * 100).toFixed(0) : "—"),
                      ];
                    }),
                    hovertemplate:
                      "<b>%{customdata[0]}</b> (%{customdata[6]})<br>" +
                      "━━━━━━━━━━━━━━<br>" +
                      "Synergy Index: <b>%{customdata[1]}</b><br>" +
                      "Tempo Index: <b>%{customdata[2]}</b><br>" +
                      "Win Rate: <b>%{customdata[3]}%</b><br>" +
                      "Games Played: <b>%{customdata[4]}</b><br>" +
                      "Avg Duration: <b>%{customdata[7]} min</b><br>" +
                      "First Blood Rate: <b>%{customdata[8]}%</b><br>" +
                      "Placement: <b>%{customdata[5]}</b>" +
                      "<extra></extra>",
                    hoverlabel: {
                      bgcolor: "#131836",
                      bordercolor: "rgba(195,255,0,0.3)",
                      font: { color: "#e5e7eb", family: "Inter, sans-serif", size: 11 },
                    },
                    showlegend: false,
                  },
                ]}
                layout={{
                  xaxis: {
                    title: { text: "Synergy Index →", font: { color: "#c3ff00", size: 12 } },
                    tickfont: { color: "#9ca3af", size: 10 },
                    gridcolor: "rgba(30,37,80,0.4)",
                    gridwidth: 1,
                    range: [48, 92],
                    showspikes: true,
                    spikecolor: "rgba(195,255,0,0.4)",
                    spikethickness: 1,
                    spikedash: "dot" as const,
                    dtick: 5,
                  },
                  yaxis: {
                    title: { text: "Tempo Index →", font: { color: "#ff1a6c", size: 12 } },
                    tickfont: { color: "#9ca3af", size: 10 },
                    gridcolor: "rgba(30,37,80,0.4)",
                    gridwidth: 1,
                    range: [48, 87],
                    showspikes: true,
                    spikecolor: "rgba(255,26,108,0.4)",
                    spikethickness: 1,
                    spikedash: "dot" as const,
                    dtick: 5,
                  },
                  margin: { l: 60, r: 20, t: 20, b: 60 },
                  paper_bgcolor: "transparent",
                  plot_bgcolor: "transparent",
                  font: { color: "#9ca3af" },
                  height: 480,
                  showlegend: false,
                  hovermode: "closest" as const,
                  images: plotImages,
                  shapes: [
                    {
                      type: "line",
                      x0: 70,
                      x1: 70,
                      y0: 48,
                      y1: 87,
                      line: { color: "rgba(195,255,0,0.25)", dash: "dash", width: 1.5 },
                    },
                    {
                      type: "line",
                      x0: 48,
                      x1: 92,
                      y0: 68,
                      y1: 68,
                      line: { color: "rgba(255,26,108,0.25)", dash: "dash", width: 1.5 },
                    },
                    /* Quadrant fill: top-right (elite) gets a subtle glow */
                    {
                      type: "rect" as const,
                      x0: 70,
                      x1: 92,
                      y0: 68,
                      y1: 87,
                      fillcolor: "rgba(195,255,0,0.03)",
                      line: { width: 0 },
                      layer: "below" as const,
                    },
                  ],
                  annotations: [
                    {
                      x: 88, y: 52,
                      text: "High Synergy<br>Low Tempo",
                      showarrow: false,
                      font: { color: "rgba(195,255,0,0.4)", size: 9 },
                      align: "center" as const,
                    },
                    {
                      x: 53, y: 84,
                      text: "Low Synergy<br>High Tempo",
                      showarrow: false,
                      font: { color: "rgba(255,26,108,0.4)", size: 9 },
                      align: "center" as const,
                    },
                    {
                      x: 87, y: 84,
                      text: "Balanced<br>Elite",
                      showarrow: false,
                      font: { color: "rgba(255,255,255,0.35)", size: 10, family: "Space Grotesk, sans-serif" },
                      align: "center" as const,
                    },
                    {
                      x: 53, y: 52,
                      text: "Low Synergy<br>Low Tempo",
                      showarrow: false,
                      font: { color: "rgba(255,255,255,0.15)", size: 9 },
                      align: "center" as const,
                    },
                  ],
                }}
                config={{ displayModeBar: false, responsive: true }}
                style={{ width: "100%", height: "480px" }}
              />
              </ErrorBoundary>
            </div>
            {/* Team grid legend below chart */}
            <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {synergyTempoScatter.map((d) => (
                <button
                  key={d.name}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all text-left ${
                    hoveredTeam === d.name ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                  onMouseEnter={() => setHoveredTeam(d.name)}
                  onMouseLeave={() => setHoveredTeam(null)}
                >
                  <TeamLogo name={d.name} size={14} />
                  <span className="text-[10px] text-dota-text-dim truncate">{teams.find(t => t.name === d.name)?.tag || d.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Interpretation card */}
            <div className="glass-card p-4 sm:p-5">
              <h3 className="font-heading text-base font-bold mb-3">Key Insight</h3>
              <p className="text-sm text-dota-text-dim leading-relaxed mb-4">
                <span className="text-dota-gold font-semibold">Synergy conquered tempo</span> in this tournament.
                Team Liquid proved that cohesive draft composition outweighs raw aggression when it matters most.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-dota-gold/10 border border-dota-gold/20">
                  <TeamLogo name="Team Liquid" size={24} />
                  <div>
                    <div className="text-sm font-medium">Team Liquid</div>
                    <div className="text-xs text-dota-text-dim">Synergy: 82.1 | Tempo: 71.5</div>
                  </div>
                  <div className="ml-auto text-dota-gold font-heading font-bold text-xs">Champion</div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-dota-surface/50 border border-dota-border/30">
                  <TeamLogo name="Natus Vincere" size={24} />
                  <div>
                    <div className="text-sm font-medium">Natus Vincere</div>
                    <div className="text-xs text-dota-text-dim">Synergy: 71.8 | Tempo: 79.3</div>
                  </div>
                  <div className="ml-auto text-dota-text-dim font-heading font-bold text-sm">2nd</div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-dota-surface/50 border border-dota-border/30">
                  <TeamLogo name="Tundra Esports" size={24} />
                  <div>
                    <div className="text-sm font-medium">Tundra Esports</div>
                    <div className="text-xs text-dota-text-dim">Synergy: 83.5 | Tempo: 58.2</div>
                  </div>
                  <div className="ml-auto text-xs text-dota-text-dim">Too slow</div>
                </div>
              </div>
            </div>

            {/* Stat blocks */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-card p-3 text-center">
                <div className="text-xl font-heading font-bold text-dota-gold">1.15</div>
                <div className="text-[10px] text-dota-text-dim uppercase tracking-wider mt-1">Synergy / Tempo Ratio</div>
              </div>
              <div className="glass-card p-3 text-center">
                <div className="text-xl font-heading font-bold text-blast-pink">82.1</div>
                <div className="text-[10px] text-dota-text-dim uppercase tracking-wider mt-1">Champion Synergy</div>
              </div>
            </div>

            <div className="glass-card p-4">
              <h4 className="font-heading text-sm font-bold mb-2">Playstyle Spectrum</h4>
              <div className="space-y-2">
                {teams.slice(0, 6).map((team) => (
                  <div key={team.id} className="flex items-center gap-2">
                    <TeamLogo name={team.name} size={16} />
                    <span className="text-xs font-medium w-16 truncate">{team.tag}</span>
                    <div className="flex-1 h-1.5 bg-dota-bg/50 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(team.synergyIndex / (team.synergyIndex + team.tempoIndex)) * 100}%`,
                          background: `linear-gradient(90deg, #c3ff00, #ff1a6c)`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-dota-text-dim w-8 text-right">
                      {((team.synergyIndex / (team.synergyIndex + team.tempoIndex)) * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-dota-text-dim">
                <span className="text-dota-gold">← Synergy</span>
                <span className="text-blast-pink">Tempo →</span>
              </div>
            </div>

            {/* Quick comparison table */}
            <div className="glass-card p-4">
              <h4 className="font-heading text-sm font-bold mb-2">Top 4 Comparison</h4>
              <div className="space-y-1.5">
                {teams.slice(0, 4).map((team) => (
                  <div key={team.id} className="flex items-center gap-2 text-[10px]">
                    <TeamLogo name={team.name} size={14} />
                    <span className="w-12 truncate font-medium text-white">{team.tag}</span>
                    <div className="flex-1 grid grid-cols-3 gap-1 text-center text-dota-text-dim">
                      <span className="text-dota-gold">{(team.winRate * 100).toFixed(0)}%</span>
                      <span>{team.synergyIndex.toFixed(0)}</span>
                      <span>{team.tempoIndex.toFixed(0)}</span>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-2 text-[9px] text-dota-text-dim/50 mt-1 pt-1 border-t border-white/5">
                  <span className="w-12 ml-5"></span>
                  <div className="flex-1 grid grid-cols-3 gap-1 text-center">
                    <span>Win Rate</span>
                    <span>Synergy</span>
                    <span>Tempo</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="section-divider mt-20 sm:mt-32" />
    </section>
  );
}
