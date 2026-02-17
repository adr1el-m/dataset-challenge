"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroMeta, type HeroMeta as HeroMetaType } from "@/data/tournament";
import { getHeroIcon } from "@/lib/assets";

type RoleFilter = "all" | HeroMetaType["role"];

const roleColors: Record<string, string> = {
  carry: "#c3ff00",
  mid: "#3b82f6",
  offlane: "#ff1a6c",
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

function HeroIcon({ name, size = 24 }: { name: string; size?: number }) {
  return (
    <img
      src={getHeroIcon(name)}
      alt={name}
      width={size}
      height={size}
      className="rounded-sm object-cover shrink-0"
      style={{ width: size, height: size }}
      loading="lazy"
      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
    />
  );
}

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

  // Quadrant data for Win Rate vs Pick Rate
  const eligible = useMemo(() => heroMeta.filter((h) => h.picks >= 10), []);
  const pickMedian = 20; // ~median picks among eligible
  const quadrants = useMemo(() => {
    const metaFavorites = eligible
      .filter((h) => h.winRate >= 0.5 && h.picks >= pickMedian)
      .sort((a, b) => (b.winRate * b.picks) - (a.winRate * a.picks))
      .slice(0, 5);
    const nichePowerhouses = eligible
      .filter((h) => h.winRate >= 0.5 && h.picks < pickMedian)
      .sort((a, b) => b.winRate - a.winRate)
      .slice(0, 5);
    const workhorses = eligible
      .filter((h) => h.winRate < 0.5 && h.picks >= pickMedian)
      .sort((a, b) => b.picks - a.picks)
      .slice(0, 5);
    const underperformers = eligible
      .filter((h) => h.winRate < 0.5 && h.picks < pickMedian)
      .sort((a, b) => a.winRate - b.winRate)
      .slice(0, 5);
    return { metaFavorites, nichePowerhouses, workhorses, underperformers };
  }, [eligible]);

  return (
    <section id="heroes" className="relative py-20 sm:py-32 px-4 sm:px-6 hex-pattern">
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
            Hero Meta Analysis
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Who Rules the Meta?
          </h2>
          <p className="text-dota-text-dim max-w-xl mx-auto text-sm sm:text-base">
            Complete hero pick/ban data across all <span className="text-dota-gold">100 games</span> — the meta that crowned Team Liquid champions.
          </p>
        </motion.div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-4 sm:p-5"
          >
            <h3 className="font-heading text-lg font-bold mb-1">Most Contested Heroes</h3>
            <p className="text-xs text-dota-text-dim mb-4">Pick + Ban Rate (top 10)</p>
            <div className="space-y-2">
              {topContested.map((hero, i) => {
                const pct = hero.contestRate * 100;
                const color = roleColors[hero.role] || "#64748b";
                return (
                  <motion.div
                    key={hero.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/[0.03] transition-colors"
                  >
                    {/* Rank */}
                    <span className="text-[10px] text-dota-text-dim/50 w-4 text-right font-mono">{i + 1}</span>
                    {/* Hero icon */}
                    <HeroIcon name={hero.name} size={28} />
                    {/* Name + role */}
                    <div className="flex flex-col min-w-[80px] sm:min-w-[100px]">
                      <span className="text-xs font-medium text-white leading-tight">{hero.name}</span>
                      <span className="text-[9px] leading-tight" style={{ color }}>{roleLabels[hero.role]}</span>
                    </div>
                    {/* Bar */}
                    <div className="flex-1 h-5 bg-dota-bg/40 rounded overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 + i * 0.05 }}
                        className="h-full rounded"
                        style={{ background: `linear-gradient(90deg, ${color}, ${color}60)` }}
                      />
                      <span className="absolute inset-y-0 right-2 flex items-center text-[10px] font-mono font-bold text-white/80">
                        {pct.toFixed(0)}%
                      </span>
                    </div>
                    {/* Hover tooltip card */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 hidden group-hover:block pointer-events-none">
                      <div className="bg-dota-card border border-dota-gold/20 rounded-xl p-3 shadow-2xl whitespace-nowrap">
                        <div className="flex items-center gap-2 mb-2">
                          <HeroIcon name={hero.name} size={32} />
                          <div>
                            <div className="font-heading font-bold text-sm text-white">{hero.name}</div>
                            <div className="text-[10px]" style={{ color }}>{roleLabels[hero.role]}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div>
                            <div className="text-xs font-bold text-dota-gold">{hero.picks}</div>
                            <div className="text-[9px] text-dota-text-dim">Picks</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-blast-pink">{hero.bans}</div>
                            <div className="text-[9px] text-dota-text-dim">Bans</div>
                          </div>
                          <div>
                            <div className={`text-xs font-bold ${hero.winRate >= 0.5 ? "text-dota-radiant" : "text-dota-dire"}`}>{(hero.winRate * 100).toFixed(1)}%</div>
                            <div className="text-[9px] text-dota-text-dim">Win Rate</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-4 sm:p-5"
          >
            <h3 className="font-heading text-lg font-bold mb-1">Win Rate vs Pick Rate</h3>
            <p className="text-xs text-dota-text-dim mb-4">Heroes with 10+ picks grouped by performance quadrant</p>

            <div className="grid grid-cols-2 gap-3">
              {/* Meta Favorites — High WR, High Picks */}
              <div className="p-3 rounded-lg bg-dota-gold/[0.04] border border-dota-gold/15">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-2 h-2 rounded-full bg-dota-gold" />
                  <span className="text-[10px] font-heading font-bold text-dota-gold uppercase tracking-wider">Meta Favorites</span>
                </div>
                <p className="text-[9px] text-dota-text-dim mb-3">High win rate &amp; high picks</p>
                <div className="space-y-2">
                  {quadrants.metaFavorites.map((hero) => (
                    <div key={hero.name} className="flex items-center gap-2">
                      <HeroIcon name={hero.name} size={22} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-medium text-white truncate">{hero.name}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-dota-radiant font-mono">{(hero.winRate * 100).toFixed(0)}%</span>
                          <div className="flex-1 h-1 bg-dota-bg/40 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-dota-gold/60" style={{ width: `${hero.winRate * 100}%` }} />
                          </div>
                          <span className="text-[9px] text-dota-text-dim font-mono">{hero.picks}p</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Niche Powerhouses — High WR, Low Picks */}
              <div className="p-3 rounded-lg bg-purple-500/[0.04] border border-purple-500/15">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-[10px] font-heading font-bold text-purple-400 uppercase tracking-wider">Niche Picks</span>
                </div>
                <p className="text-[9px] text-dota-text-dim mb-3">High win rate &amp; low picks</p>
                <div className="space-y-2">
                  {quadrants.nichePowerhouses.map((hero) => (
                    <div key={hero.name} className="flex items-center gap-2">
                      <HeroIcon name={hero.name} size={22} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-medium text-white truncate">{hero.name}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-dota-radiant font-mono">{(hero.winRate * 100).toFixed(0)}%</span>
                          <div className="flex-1 h-1 bg-dota-bg/40 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-purple-400/60" style={{ width: `${hero.winRate * 100}%` }} />
                          </div>
                          <span className="text-[9px] text-dota-text-dim font-mono">{hero.picks}p</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workhorses — Low WR, High Picks */}
              <div className="p-3 rounded-lg bg-blue-500/[0.04] border border-blue-500/15">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-[10px] font-heading font-bold text-blue-400 uppercase tracking-wider">Workhorses</span>
                </div>
                <p className="text-[9px] text-dota-text-dim mb-3">Below 50% WR but popular</p>
                <div className="space-y-2">
                  {quadrants.workhorses.map((hero) => (
                    <div key={hero.name} className="flex items-center gap-2">
                      <HeroIcon name={hero.name} size={22} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-medium text-white truncate">{hero.name}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-dota-dire font-mono">{(hero.winRate * 100).toFixed(0)}%</span>
                          <div className="flex-1 h-1 bg-dota-bg/40 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-blue-400/60" style={{ width: `${hero.winRate * 100}%` }} />
                          </div>
                          <span className="text-[9px] text-dota-text-dim font-mono">{hero.picks}p</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Underperformers — Low WR, Low Picks */}
              <div className="p-3 rounded-lg bg-blast-pink/[0.04] border border-blast-pink/15">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-2 h-2 rounded-full bg-blast-pink" />
                  <span className="text-[10px] font-heading font-bold text-blast-pink uppercase tracking-wider">Underperformers</span>
                </div>
                <p className="text-[9px] text-dota-text-dim mb-3">Below 50% WR &amp; niche</p>
                <div className="space-y-2">
                  {quadrants.underperformers.map((hero) => (
                    <div key={hero.name} className="flex items-center gap-2">
                      <HeroIcon name={hero.name} size={22} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-medium text-white truncate">{hero.name}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-dota-dire font-mono">{(hero.winRate * 100).toFixed(0)}%</span>
                          <div className="flex-1 h-1 bg-dota-bg/40 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-blast-pink/60" style={{ width: `${hero.winRate * 100}%` }} />
                          </div>
                          <span className="text-[9px] text-dota-text-dim font-mono">{hero.picks}p</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
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
                  style={roleFilter === role ? { backgroundColor: roleColors[role] || "#c3ff00" } : {}}
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

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="text-left text-dota-text-dim text-xs uppercase tracking-wider border-b border-dota-border/30">
                  <th className="pb-3 pr-4 pl-4 sm:pl-0">#</th>
                  <th className="pb-3 pr-4">Hero</th>
                  <th className="pb-3 pr-4">Role</th>
                  <th className="pb-3 pr-4 text-center">Picks</th>
                  <th className="pb-3 pr-4 text-center">Bans</th>
                  <th className="pb-3 pr-4 text-center">Win Rate</th>
                  <th className="pb-3 pr-4">Contest Rate</th>
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
                      <td className="py-3 pr-4 pl-4 sm:pl-0 text-dota-text-dim text-xs">{i + 1}</td>
                      <td className="py-3 pr-4 font-medium">
                        <div className="flex items-center gap-2">
                          <HeroIcon name={hero.name} size={24} />
                          <span>{hero.name}</span>
                        </div>
                      </td>
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
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-dota-bg/50 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${hero.contestRate * 100}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: i * 0.03 }}
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
              <span className="text-dota-gold font-semibold">Tournament Insight:</span> Jakiro dominated with 86% contest rate, while Tiny was the most picked hero (39 picks). Liquid&apos;s adaptable drafting — never relying on a single comfort pick — proved decisive.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="section-divider mt-20 sm:mt-32" />
    </section>
  );
}
