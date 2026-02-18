"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { teams, type Team } from "@/data/tournament";
import TeamLogo from "./TeamLogo";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

function RadarChart({ team, compareTeam, isMobile }: { team: Team; compareTeam?: Team; isMobile: boolean }) {
  const categories = ["Win Rate", "Synergy", "Tempo", "Early Game", "Comeback", "First Blood"];
  const normalizeValue = (val: number, max: number) => (val / max) * 100;

  const teamValues = [
    normalizeValue(team.winRate, 1),
    normalizeValue(team.synergyIndex, 100),
    normalizeValue(team.tempoIndex, 100),
    normalizeValue(team.earlyGameWR, 1),
    normalizeValue(team.comebackRate, 1),
    normalizeValue(team.firstBloodRate, 1),
  ];

  const traces: Plotly.Data[] = [
    {
      type: "scatterpolar" as const,
      r: [...teamValues, teamValues[0]],
      theta: [...categories, categories[0]],
      fill: "toself",
      name: team.tag,
      fillcolor: `${team.color}20`,
      line: { color: team.color, width: 2 },
      marker: { size: isMobile ? 4 : 6, color: team.color },
    },
  ];

  if (compareTeam) {
    const compareValues = [
      normalizeValue(compareTeam.winRate, 1),
      normalizeValue(compareTeam.synergyIndex, 100),
      normalizeValue(compareTeam.tempoIndex, 100),
      normalizeValue(compareTeam.earlyGameWR, 1),
      normalizeValue(compareTeam.comebackRate, 1),
      normalizeValue(compareTeam.firstBloodRate, 1),
    ];
    traces.push({
      type: "scatterpolar" as const,
      r: [...compareValues, compareValues[0]],
      theta: [...categories, categories[0]],
      fill: "toself",
      name: compareTeam.tag,
      fillcolor: `${compareTeam.color}20`,
      line: { color: compareTeam.color, width: 2 },
      marker: { size: isMobile ? 4 : 6, color: compareTeam.color },
    });
  }

  return (
    <Plot
      data={traces}
      layout={{
        polar: {
          bgcolor: "transparent",
          radialaxis: { visible: true, range: [0, 100], showticklabels: false, gridcolor: "rgba(30,37,80,0.5)" },
          angularaxis: { gridcolor: "rgba(30,37,80,0.5)", linecolor: "rgba(30,37,80,0.3)" },
        },
        showlegend: compareTeam ? true : false,
        legend: { font: { color: "#9ca3af", size: 11 }, bgcolor: "transparent" },
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        font: { color: "#9ca3af", family: "system-ui" },
        margin: { l: 40, r: 40, t: 30, b: 30 },
        height: isMobile ? 300 : 380,
      }}
      config={{ displayModeBar: false, responsive: true }}
      style={{ width: "100%", height: isMobile ? "300px" : "380px" }}
    />
  );
}

function TeamCard({ team, isSelected, onClick }: { team: Team; isSelected: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      layout
      className={`w-full text-left p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
        isSelected
          ? "bg-dota-card border-dota-gold/40 glow-gold"
          : "bg-dota-surface/50 border-dota-border/30 hover:border-dota-border/60"
      }`}
    >
      <div className="flex items-center gap-3">
        <TeamLogo name={team.name} size={28} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-sm truncate">{team.name}</span>
            {team.placement?.includes("Champion") && (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-dota-gold/20 text-dota-gold uppercase tracking-wider shrink-0">🏆</span>
            )}
          </div>
          <div className="text-xs text-dota-text-dim">{team.region} • {team.placement}</div>
        </div>
      </div>
    </motion.button>
  );
}

export default function TeamExplorer() {
  const [selectedTeam, setSelectedTeam] = useState<Team>(teams[0]);
  const [compareTeam, setCompareTeam] = useState<Team | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInView = useInView(chartRef, { once: true, margin: "-120px" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  const sortedTeams = useMemo(() => [...teams].sort((a, b) => {
    const placementPriority = (t: Team) => {
      if (t.placement?.includes("Champion")) return 0;
      if (t.placement?.includes("2nd")) return 1;
      if (t.placement?.includes("3rd")) return 2;
      return 3;
    };
    const pa = placementPriority(a);
    const pb = placementPriority(b);
    if (pa !== pb) return pa - pb;
    return b.winRate - a.winRate;
  }), []);

  return (
    <section id="teams" className="relative py-20 sm:py-32 px-4 sm:px-6">
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
            Team Breakdown
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Team Explorer
          </h2>
          <p className="text-dota-text-dim max-w-xl mx-auto text-sm sm:text-base">
            Select a team to explore their playstyle fingerprint. Compare any two teams head-to-head.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <motion.button
            onClick={() => {
              setIsComparing(!isComparing);
              if (!isComparing) setCompareTeam(teams[1]);
              else setCompareTeam(null);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              isComparing
                ? "bg-dota-gold text-dota-bg"
                : "bg-dota-gold/10 text-dota-gold border border-dota-gold/30 hover:bg-dota-gold/20"
            }`}
          >
            {isComparing ? "✕ Exit Comparison" : "Compare Teams"}
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-12 gap-4 sm:gap-8">
          <motion.div
            className={`space-y-2 max-h-[50vh] lg:max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin ${isComparing ? "lg:col-span-3" : "lg:col-span-4"}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs text-dota-gold uppercase tracking-wider mb-3 font-semibold">
              {isComparing ? "Team A" : "Select Team"}
            </div>
            {sortedTeams.map((team, i) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <TeamCard team={team} isSelected={selectedTeam.id === team.id} onClick={() => setSelectedTeam(team)} />
              </motion.div>
            ))}
          </motion.div>

          {isComparing && (
            <motion.div
              className="lg:col-span-3 space-y-2 max-h-[50vh] lg:max-h-[70vh] overflow-y-auto pr-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-xs text-blast-pink uppercase tracking-wider mb-3 font-semibold">Team B</div>
              {sortedTeams.map((team) => (
                <TeamCard key={team.id} team={team} isSelected={compareTeam?.id === team.id} onClick={() => setCompareTeam(team)} />
              ))}
            </motion.div>
          )}

          <div className={isComparing ? "lg:col-span-6" : "lg:col-span-8"}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedTeam.id}-${compareTeam?.id || "none"}`}
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -10 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="glass-card p-4 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <TeamLogo name={selectedTeam.name} size={40} />
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl font-bold">{selectedTeam.name}</h3>
                      <span className="text-xs text-dota-text-dim">{selectedTeam.region} • {selectedTeam.matchCount} matches</span>
                    </div>
                  </div>
                  {isComparing && compareTeam && (
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <h3 className="font-heading text-lg sm:text-xl font-bold">{compareTeam.name}</h3>
                        <span className="text-xs text-dota-text-dim">{compareTeam.region} • {compareTeam.matchCount} matches</span>
                      </div>
                      <TeamLogo name={compareTeam.name} size={40} />
                    </div>
                  )}
                </div>

              <div className="text-[11px] text-dota-text-dim mb-4">
                Metrics below are modelled estimates from the project dataset.
              </div>

              <div className="chart-container mb-6" ref={chartRef}>
                {chartInView ? (
                  <RadarChart team={selectedTeam} compareTeam={compareTeam || undefined} isMobile={isMobile} />
                ) : (
                  <div className="h-[300px] sm:h-[380px] flex items-center justify-center text-xs text-dota-text-dim">
                    Loading chart…
                  </div>
                )}
              </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { label: "Win Rate", value: `${(selectedTeam.winRate * 100).toFixed(1)}%`, compare: compareTeam ? `${(compareTeam.winRate * 100).toFixed(1)}%` : null },
                    { label: "Synergy", value: selectedTeam.synergyIndex.toFixed(1), compare: compareTeam ? compareTeam.synergyIndex.toFixed(1) : null },
                    { label: "Tempo", value: selectedTeam.tempoIndex.toFixed(1), compare: compareTeam ? compareTeam.tempoIndex.toFixed(1) : null },
                    { label: "Avg Duration", value: `${selectedTeam.avgDuration.toFixed(1)}m`, compare: compareTeam ? `${compareTeam.avgDuration.toFixed(1)}m` : null },
                    { label: "Radiant WR", value: `${(selectedTeam.radiantWR * 100).toFixed(0)}%`, compare: compareTeam ? `${(compareTeam.radiantWR * 100).toFixed(0)}%` : null },
                    { label: "Dire WR", value: `${(selectedTeam.direWR * 100).toFixed(0)}%`, compare: compareTeam ? `${(compareTeam.direWR * 100).toFixed(0)}%` : null },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-dota-bg/50 rounded-lg p-3 text-center">
                      <div className="text-xs text-dota-text-dim uppercase tracking-wider mb-1">{stat.label}</div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-heading font-bold text-white">{stat.value}</span>
                        {stat.compare && (
                          <>
                            <span className="text-dota-text-dim text-xs">vs</span>
                            <span className="font-heading font-bold text-dota-text-dim">{stat.compare}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-dota-border/30">
                  <div className="text-xs text-dota-text-dim uppercase tracking-wider mb-3">Signature Heroes</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTeam.signatureHeroes.map((hero) => (
                      <span key={hero} className="px-3 py-1 rounded-full text-xs font-medium bg-dota-surface border border-dota-border/50" style={{ borderColor: `${selectedTeam.color}40` }}>
                        {hero}
                      </span>
                    ))}
                    {isComparing && compareTeam && (
                      <>
                        <span className="text-dota-text-dim text-xs self-center mx-2">vs</span>
                        {compareTeam.signatureHeroes.map((hero) => (
                          <span key={hero} className="px-3 py-1 rounded-full text-xs font-medium bg-dota-surface border border-dota-border/50" style={{ borderColor: `${compareTeam.color}40` }}>
                            {hero}
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="section-divider mt-20 sm:mt-32" />
    </section>
  );
}
