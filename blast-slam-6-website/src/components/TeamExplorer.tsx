"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { teams, type Team, isImageLogo } from "@/data/tournament";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

function RadarChart({ team, compareTeam }: { team: Team; compareTeam?: Team }) {
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
      marker: { size: 6, color: team.color },
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
      marker: { size: 6, color: compareTeam.color },
    });
  }

  return (
    <Plot
      data={traces}
      layout={{
        polar: {
          bgcolor: "transparent",
          radialaxis: { visible: true, range: [0, 100], showticklabels: false, gridcolor: "rgba(42,42,64,0.5)" },
          angularaxis: { gridcolor: "rgba(42,42,64,0.5)", linecolor: "rgba(42,42,64,0.3)" },
        },
        showlegend: compareTeam ? true : false,
        legend: { font: { color: "#9ca3af", size: 11 }, bgcolor: "transparent" },
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        font: { color: "#9ca3af", family: "system-ui" },
        margin: { l: 60, r: 60, t: 40, b: 40 },
        height: 380,
      }}
      config={{ displayModeBar: false, responsive: true }}
      style={{ width: "100%", height: "380px" }}
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
      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
        isSelected
          ? "bg-dota-card border-dota-gold/40 glow-gold"
          : "bg-dota-surface/50 border-dota-border/30 hover:border-dota-border/60"
      }`}
    >
      <div className="flex items-center gap-3">
        {isImageLogo(team.logo) ? (
          <Image
            src={team.logo}
            alt={`${team.name} logo`}
            width={32}
            height={32}
            sizes="32px"
            className="h-8 w-8 object-contain drop-shadow-[0_0_4px_rgba(0,0,0,0.35)]"
          />
        ) : (
          <span className="text-2xl">{team.logo}</span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-sm truncate">{team.name}</span>
            {team.placement?.includes("Champion") && (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-400 uppercase tracking-wider shrink-0">🏆</span>
            )}
            {team.placement?.includes("Runner") && (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-dota-gold/20 text-dota-gold uppercase tracking-wider shrink-0">🥈</span>
            )}
          </div>
          <div className="text-xs text-dota-text-dim">{team.region} {team.placement && `• ${team.placement}`}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold" style={{ color: team.color }}>
            {(team.winRate * 100).toFixed(0)}%
          </div>
          <div className="text-[10px] text-dota-text-dim uppercase tracking-wider">WR</div>
        </div>
      </div>
    </motion.button>
  );
}

export default function TeamExplorer() {
  const [selectedTeam, setSelectedTeam] = useState<Team>(teams[0]);
  const [compareTeam, setCompareTeam] = useState<Team | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  const sortedTeams = useMemo(() => [...teams].sort((a, b) => {
    // Sort by placement priority: champion first, then runner-up, then by win rate
    const placementPriority = (t: Team) => {
      if (t.placement?.includes("Champion")) return 0;
      if (t.placement?.includes("Runner")) return 1;
      if (t.placement?.includes("3rd")) return 2;
      return 3;
    };
    const pa = placementPriority(a);
    const pb = placementPriority(b);
    if (pa !== pb) return pa - pb;
    return b.winRate - a.winRate;
  }), []);

  return (
    <section id="teams" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
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
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Team Explorer
          </h2>
          <p className="text-dota-text-dim max-w-xl mx-auto">
            Select a team to explore their playstyle fingerprint. Compare any two teams head-to-head across all key metrics.
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
            {isComparing ? "✕ Exit Comparison" : "⚔️ Compare Teams"}
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <motion.div
            className={`space-y-2 ${isComparing ? "lg:col-span-3" : "lg:col-span-4"}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs text-dota-text-dim uppercase tracking-wider mb-3 font-semibold">
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
                <TeamCard
                  team={team}
                  isSelected={selectedTeam.id === team.id}
                  onClick={() => setSelectedTeam(team)}
                />
              </motion.div>
            ))}
          </motion.div>

          {isComparing && (
            <motion.div
              className="lg:col-span-3 space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-xs text-dota-text-dim uppercase tracking-wider mb-3 font-semibold">Team B</div>
              {sortedTeams.map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  isSelected={compareTeam?.id === team.id}
                  onClick={() => setCompareTeam(team)}
                />
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
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring" }}
                  >
                    <motion.span
                      className="flex h-10 w-10 items-center justify-center"
                      animate={{ rotateY: [0, 360] }}
                      transition={{ duration: 1 }}
                    >
                      {isImageLogo(selectedTeam.logo) ? (
                        <Image
                          src={selectedTeam.logo}
                          alt={`${selectedTeam.name} logo`}
                          width={40}
                          height={40}
                          sizes="40px"
                          className="h-10 w-10 object-contain drop-shadow-[0_0_6px_rgba(0,0,0,0.35)]"
                        />
                      ) : (
                        <span className="text-3xl">{selectedTeam.logo}</span>
                      )}
                    </motion.span>
                    <div>
                      <h3 className="font-heading text-xl font-bold">{selectedTeam.name}</h3>
                      <span className="text-xs text-dota-text-dim">{selectedTeam.region} • {selectedTeam.matchCount} matches</span>
                    </div>
                  </motion.div>
                  {isComparing && compareTeam && (
                    <motion.div
                      className="flex items-center gap-3"
                      initial={{ x: 20 }}
                      animate={{ x: 0 }}
                      transition={{ type: "spring" }}
                    >
                      <div className="text-right">
                        <h3 className="font-heading text-xl font-bold">{compareTeam.name}</h3>
                        <span className="text-xs text-dota-text-dim">{compareTeam.region} • {compareTeam.matchCount} matches</span>
                      </div>
                      {isImageLogo(compareTeam.logo) ? (
                        <Image
                          src={compareTeam.logo}
                          alt={`${compareTeam.name} logo`}
                          width={40}
                          height={40}
                          sizes="40px"
                          className="h-10 w-10 object-contain drop-shadow-[0_0_6px_rgba(0,0,0,0.35)]"
                        />
                      ) : (
                        <span className="text-3xl">{compareTeam.logo}</span>
                      )}
                    </motion.div>
                  )}
                </div>

                <div className="chart-container mb-6">
                  <RadarChart team={selectedTeam} compareTeam={compareTeam || undefined} />
                </div>

                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    { label: "Win Rate", value: `${(selectedTeam.winRate * 100).toFixed(1)}%`, compare: compareTeam ? `${(compareTeam.winRate * 100).toFixed(1)}%` : null },
                    { label: "Synergy", value: selectedTeam.synergyIndex.toFixed(1), compare: compareTeam ? compareTeam.synergyIndex.toFixed(1) : null },
                    { label: "Tempo", value: selectedTeam.tempoIndex.toFixed(1), compare: compareTeam ? compareTeam.tempoIndex.toFixed(1) : null },
                    { label: "Avg Duration", value: `${selectedTeam.avgDuration.toFixed(1)}m`, compare: compareTeam ? `${compareTeam.avgDuration.toFixed(1)}m` : null },
                    { label: "Radiant WR", value: `${(selectedTeam.radiantWR * 100).toFixed(0)}%`, compare: compareTeam ? `${(compareTeam.radiantWR * 100).toFixed(0)}%` : null },
                    { label: "Dire WR", value: `${(selectedTeam.direWR * 100).toFixed(0)}%`, compare: compareTeam ? `${(compareTeam.direWR * 100).toFixed(0)}%` : null },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-dota-bg/50 rounded-lg p-3 text-center"
                    >
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
                    </motion.div>
                  ))}
                </motion.div>

                <div className="mt-6 pt-6 border-t border-dota-border/30">
                  <div className="text-xs text-dota-text-dim uppercase tracking-wider mb-3">Signature Heroes</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTeam.signatureHeroes.map((hero) => (
                      <motion.span
                        key={hero}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, type: "spring" }}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-dota-surface border border-dota-border/50"
                        style={{ borderColor: `${selectedTeam.color}40` }}
                      >
                        {hero}
                      </motion.span>
                    ))}
                    {isComparing && compareTeam && (
                      <>
                        <span className="text-dota-text-dim text-xs self-center mx-2">vs</span>
                        {compareTeam.signatureHeroes.map((hero) => (
                          <motion.span
                            key={hero}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-dota-surface border border-dota-border/50"
                            style={{ borderColor: `${compareTeam.color}40` }}
                          >
                            {hero}
                          </motion.span>
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

      <div className="section-divider mt-32" />
    </section>
  );
}
