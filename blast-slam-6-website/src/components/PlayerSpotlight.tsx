"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playerSpotlights, PlayerData } from "@/data/tournament";
import { getHeroIcon, getPlayerAvatar } from "@/lib/assets";

const ROLE_COLORS: Record<string, string> = {
  carry: "#ff6b6b",
  mid: "#ffd93d",
  offlane: "#6bcb77",
  support: "#4d96ff",
  hard_support: "#9b59b6",
};

function PlayerCard({ player, index }: { player: PlayerData; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const roleColor = ROLE_COLORS[player.role] || "#888";
  const kda = `${player.kda.kills}/${player.kda.deaths}/${player.kda.assists}`;
  const isLiquid = player.team === "Team Liquid";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      layout
      className="relative"
    >
      <div
        className={`glass-card overflow-hidden cursor-pointer transition-all duration-300 ${
          isExpanded ? "ring-1 ring-dota-gold/30" : "hover:border-dota-gold/20"
        } ${player.isMVP ? "ring-1 ring-dota-gold/20" : ""}`}
        onClick={() => setIsExpanded((p) => !p)}
      >
        {/* MVP Badge */}
        {player.isMVP && (
          <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded bg-dota-gold/20 border border-dota-gold/40">
            <span className="text-[10px] font-mono font-bold text-dota-gold tracking-wider">MVP</span>
          </div>
        )}

        {/* Header */}
        <div className="p-5 pb-4">
          <div className="flex items-start gap-4">
            {/* Player avatar */}
            <div className={`w-12 h-12 rounded-full overflow-hidden border-2 flex-shrink-0 ${
              isLiquid ? "border-[#06b6d4]/40" : "border-[#eab308]/40"
            }`}>
              <img
                src={getPlayerAvatar(player.name)}
                alt={player.name}
                className="w-full h-full object-cover bg-dota-surface/50"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-lg font-heading font-bold text-white">{player.name}</h3>
                <span className="text-xs text-gray-500 font-mono">{player.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: `${roleColor}20`,
                    color: roleColor,
                    border: `1px solid ${roleColor}40`,
                  }}
                >
                  {player.roleLabel}
                </span>
                <span className="text-xs text-gray-500">{player.realName}</span>
              </div>
            </div>

            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="text-dota-gold/40 text-sm flex-shrink-0 mt-1"
            >
              ▼
            </motion.div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            <div>
              <div className="text-[10px] font-mono text-gray-500 uppercase">KDA</div>
              <div className="text-sm font-bold text-white">{player.avgKDA.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-gray-500 uppercase">GPM</div>
              <div className="text-sm font-bold text-dota-gold">{player.gpm}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-gray-500 uppercase">XPM</div>
              <div className="text-sm font-bold text-gray-300">{player.xpm}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-gray-500 uppercase">K/D/A</div>
              <div className="text-xs font-mono text-gray-400">{kda}</div>
            </div>
          </div>

          {/* Hero Pool */}
          <div className="mt-3">
            <div className="text-[10px] font-mono text-gray-500 uppercase mb-1.5">Hero Pool</div>
            <div className="flex gap-1.5">
              {player.heroPool.map((hero) => (
                <div
                  key={hero}
                  className="w-8 h-8 rounded border border-dota-border/30 overflow-hidden hover:border-dota-gold/40 transition-all group relative"
                >
                  <img
                    src={getHeroIcon(hero)}
                    alt={hero}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[7px] text-white text-center leading-tight">{hero}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-2 border-t border-dota-border/20">
                {/* Signature Plays */}
                <div className="mb-4">
                  <div className="text-[10px] font-mono text-dota-gold uppercase tracking-wider mb-2">
                    Signature Plays
                  </div>
                  <div className="space-y-2">
                    {player.signaturePlays.map((play, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-2 items-start"
                      >
                        <span className="text-dota-gold/60 text-xs mt-0.5 flex-shrink-0">▹</span>
                        <p className="text-xs text-gray-400 leading-relaxed">{play}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tournament Highlight */}
                <div className={`p-3 rounded-lg border ${
                  player.isMVP
                    ? "bg-dota-gold/5 border-dota-gold/20"
                    : isLiquid
                    ? "bg-[#06b6d4]/5 border-[#06b6d4]/20"
                    : "bg-[#eab308]/5 border-[#eab308]/20"
                }`}>
                  <div className="text-[10px] font-mono text-gray-500 uppercase mb-1">Tournament Highlight</div>
                  <p className="text-xs text-gray-300 leading-relaxed">{player.tournamentHighlight}</p>
                </div>

                {/* Stat Bars */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] font-mono text-gray-500">Kills</span>
                      <span className="text-[9px] font-mono text-gray-400">{player.kda.kills}</span>
                    </div>
                    <div className="h-1 bg-dota-surface rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#ff6b6b]/70"
                        style={{ width: `${Math.min((player.kda.kills / 210) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] font-mono text-gray-500">Assists</span>
                      <span className="text-[9px] font-mono text-gray-400">{player.kda.assists}</span>
                    </div>
                    <div className="h-1 bg-dota-surface rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#4d96ff]/70"
                        style={{ width: `${Math.min((player.kda.assists / 310) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function PlayerSpotlight() {
  const [teamFilter, setTeamFilter] = useState<string>("all");

  const liquidPlayers = playerSpotlights.filter((p) => p.team === "Team Liquid");
  const naviPlayers = playerSpotlights.filter((p) => p.team === "Natus Vincere");

  const filteredPlayers =
    teamFilter === "liquid"
      ? liquidPlayers
      : teamFilter === "navi"
      ? naviPlayers
      : playerSpotlights;

  return (
    <section id="players" className="relative py-20 sm:py-32 px-4 sm:px-6 minimap-grid">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dota-surface/80 border border-dota-gold/20 text-xs font-mono text-dota-gold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-dota-gold animate-pulse" />
            GRAND FINALISTS
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gradient-gold mb-3">
            Player Spotlights
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            The stars of BLAST Slam VI. Click any card to reveal signature plays and tournament stats.
          </p>
        </motion.div>

        {/* Team Filter */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[
            { key: "all", label: "All Players" },
            { key: "liquid", label: "Team Liquid", color: "#06b6d4" },
            { key: "navi", label: "Natus Vincere", color: "#eab308" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setTeamFilter(f.key)}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                teamFilter === f.key
                  ? "bg-dota-gold/15 text-dota-gold border border-dota-gold/40"
                  : "bg-dota-surface/60 text-gray-500 border border-dota-border/20 hover:text-gray-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Player Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredPlayers.map((player, i) => (
              <PlayerCard key={player.name} player={player} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
