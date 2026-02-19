"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { heroMeta, modelResults, allDotaHeroes } from "@/data/tournament";
import type { DotaHero } from "@/data/tournament";
import { getHeroIcon, imageBlurDataUrl } from "@/lib/assets";
import { calculateSynergy } from "@/lib/synergy";

const ATTRIBUTES = ["All", "strength", "agility", "intelligence", "universal"] as const;
const ATTRIBUTE_LABELS: Record<string, string> = {
  All: "All Heroes",
  strength: "Strength",
  agility: "Agility",
  intelligence: "Intelligence",
  universal: "Universal",
};
const ATTRIBUTE_COLORS: Record<string, string> = {
  strength: "#ef4444",
  agility: "#22c55e",
  intelligence: "#3b82f6",
  universal: "#a855f7",
};

// Lookup tournament stats by hero name (from heroMeta)
function getHeroStats(name: string) {
  return heroMeta.find((h) => h.name === name);
}


export default function DraftSimulator() {
  const [selectedHeroes, setSelectedHeroes] = useState<DotaHero[]>([]);
  const [search, setSearch] = useState("");
  const [attrFilter, setAttrFilter] = useState<string>("All");
  const [focusedHeroIndex, setFocusedHeroIndex] = useState(0);
  const [gridColumns, setGridColumns] = useState(5);
  const heroButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filteredHeroes = useMemo(() => {
    return allDotaHeroes
      .filter((h) => {
        if (attrFilter !== "All" && h.attribute !== attrFilter) return false;
        if (search && !h.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        // Sort by: has tournament data first, then alphabetical
        const aMeta = getHeroStats(a.name);
        const bMeta = getHeroStats(b.name);
        if (aMeta && !bMeta) return -1;
        if (!aMeta && bMeta) return 1;
        if (aMeta && bMeta) return bMeta.contestRate - aMeta.contestRate;
        return a.name.localeCompare(b.name);
      });
  }, [search, attrFilter]);

  const isSelected = useCallback(
    (name: string) => selectedHeroes.some((h) => h.name === name),
    [selectedHeroes]
  );

  const toggleHero = (hero: DotaHero) => {
    if (isSelected(hero.name)) {
      setSelectedHeroes((prev) => prev.filter((h) => h.name !== hero.name));
    } else if (selectedHeroes.length < 5) {
      setSelectedHeroes((prev) => [...prev, hero]);
    }
  };

  const clearDraft = () => setSelectedHeroes([]);

  const { synergyIndex, winProb, breakdown } = useMemo(
    () => calculateSynergy(selectedHeroes, heroMeta, modelResults.featureImportance),
    [selectedHeroes]
  );

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      setGridColumns(width >= 1024 ? 8 : width >= 768 ? 7 : width >= 640 ? 6 : 5);
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  useEffect(() => {
    setFocusedHeroIndex(0);
  }, [search, attrFilter, filteredHeroes.length]);

  const handleHeroKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = filteredHeroes.length - 1;
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = Math.min(lastIndex, index + 1);
    if (event.key === "ArrowLeft") nextIndex = Math.max(0, index - 1);
    if (event.key === "ArrowDown") nextIndex = Math.min(lastIndex, index + gridColumns);
    if (event.key === "ArrowUp") nextIndex = Math.max(0, index - gridColumns);
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = lastIndex;
    if (nextIndex !== index) {
      event.preventDefault();
      setFocusedHeroIndex(nextIndex);
      heroButtonRefs.current[nextIndex]?.focus();
    }
  }, [filteredHeroes.length, gridColumns]);

  // Liquid's actual GF draft for comparison
  const liquidDraft = useMemo(() => {
    const liquidHeroNames = ["Batrider", "Shadow Demon", "Earth Spirit", "Dragon Knight", "Ember Spirit"];
    const heroes: DotaHero[] = liquidHeroNames
      .map((name) => allDotaHeroes.find((h) => h.name === name))
      .filter((h): h is DotaHero => !!h);
    return calculateSynergy(heroes, heroMeta, modelResults.featureImportance);
  }, []);

  const synergyColor =
    synergyIndex >= 75 ? "#3b82f6" : synergyIndex >= 55 ? "#f59e0b" : "#a855f7";

  return (
    <section id="simulator" className="relative py-20 sm:py-32 px-4 sm:px-6 hex-pattern">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dota-surface/80 border border-dota-gold/20 text-xs font-mono text-dota-gold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blast-pink animate-pulse" />
            INTERACTIVE DRAFT LAB
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gradient-gold mb-3">
            Build Your Draft
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Pick 5 heroes and see the predicted synergy index &amp; win probability using our model weights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hero Picker */}
          <div className="lg:col-span-2 glass-card p-5">
            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search heroes..."
                  aria-label="Search heroes"
                  className="w-full px-4 py-2.5 rounded-lg bg-dota-bg/80 border border-dota-border/30 text-white text-sm focus:border-dota-gold/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-dota-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dota-bg font-mono placeholder:text-gray-600"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dota-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dota-bg"
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className="flex gap-1 flex-wrap">
                {ATTRIBUTES.map((attr) => (
                  <button
                    key={attr}
                    onClick={() => setAttrFilter(attr)}
                    aria-pressed={attrFilter === attr}
                    aria-label={`Filter by ${ATTRIBUTE_LABELS[attr]}`}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dota-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dota-bg ${
                      attrFilter === attr
                        ? "bg-dota-gold/20 text-dota-gold border border-dota-gold/40"
                        : "bg-dota-surface/60 text-gray-500 border border-dota-border/20 hover:text-gray-300"
                    }`}
                    style={
                      attrFilter === attr && attr !== "All"
                        ? { borderColor: `${ATTRIBUTE_COLORS[attr]}60`, color: ATTRIBUTE_COLORS[attr], backgroundColor: `${ATTRIBUTE_COLORS[attr]}15` }
                        : {}
                    }
                  >
                    {ATTRIBUTE_LABELS[attr]}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero Grid */}
            <div
              className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-2 max-h-[400px] overflow-y-auto pr-1 custom-scroll"
              role="listbox"
              aria-label="Hero selection grid"
              aria-multiselectable="true"
            >
              {filteredHeroes.map((hero, index) => {
                const selected = isSelected(hero.name);
                const disabled = !selected && selectedHeroes.length >= 5;
                const hasTournamentData = !!getHeroStats(hero.name);
                return (
                  <button
                    key={hero.name}
                    ref={(el) => { heroButtonRefs.current[index] = el; }}
                    onClick={() => toggleHero(hero)}
                    onKeyDown={(event) => handleHeroKeyDown(event, index)}
                    onFocus={() => setFocusedHeroIndex(index)}
                    tabIndex={index === focusedHeroIndex ? 0 : -1}
                    disabled={disabled}
                    className={`relative group flex flex-col items-center gap-1 p-1.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dota-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dota-bg ${
                      selected
                        ? "bg-dota-gold/15 ring-2 ring-dota-gold/50 scale-105"
                        : disabled
                        ? "opacity-30 cursor-not-allowed"
                        : "hover:bg-dota-surface/80 hover:scale-105"
                    }`}
                    role="option"
                    aria-selected={selected}
                    aria-disabled={disabled}
                    aria-label={`${hero.name}${selected ? " selected" : ""}${disabled && !selected ? " unavailable" : ""}${hasTournamentData ? ", played in tournament" : ""}`}
                  >
                    <div
                      className={`w-11 h-11 rounded-lg overflow-hidden border-2 transition-all ${
                        selected
                          ? "border-dota-gold/60"
                          : "border-dota-border/20 group-hover:border-dota-gold/30"
                      }`}
                    >
                      <Image
                        src={getHeroIcon(hero.name)}
                        alt={hero.name}
                        width={44}
                        height={44}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                        placeholder="blur"
                        blurDataURL={imageBlurDataUrl}
                      />
                    </div>
                    <span className="text-[9px] text-gray-400 truncate max-w-full leading-tight text-center">
                      {hero.name}
                    </span>
                    {/* Attribute indicator dot */}
                    <div
                      className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full border border-black/30"
                      style={{ backgroundColor: ATTRIBUTE_COLORS[hero.attribute] || "#666" }}
                      title={hero.attribute}
                    />
                    {/* Tournament data indicator */}
                    {hasTournamentData && (
                      <div className="absolute bottom-5 left-0.5 w-1 h-1 rounded-full bg-dota-gold/60" title="Played in tournament" />
                    )}
                    {selected && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-dota-gold text-dota-bg text-[10px] font-bold flex items-center justify-center">
                        {selectedHeroes.findIndex((h) => h.name === hero.name) + 1}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap gap-3 text-[10px] font-mono text-gray-500">
              {(["strength", "agility", "intelligence", "universal"] as const).map((attr) => (
                <span key={attr} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ATTRIBUTE_COLORS[attr] }} />
                  {ATTRIBUTE_LABELS[attr]}
                </span>
              ))}
              <span className="flex items-center gap-1 ml-2">
                <span className="w-1 h-1 rounded-full bg-dota-gold/60" />
                Played in tournament
              </span>
            </div>
          </div>

          {/* Results Panel */}
          <div className="flex flex-col gap-4">
            {/* Selected Draft */}
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-mono text-dota-gold uppercase tracking-wider">Your Draft</h3>
                {selectedHeroes.length > 0 && (
                  <button
                    onClick={clearDraft}
                  className="text-xs text-gray-500 hover:text-blast-pink transition-colors font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dota-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dota-bg"
                  aria-label="Clear selected heroes"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex gap-2 mb-4">
                {[0, 1, 2, 3, 4].map((i) => {
                  const hero = selectedHeroes[i];
                  return (
                    <div
                      key={i}
                      className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center overflow-hidden transition-all ${
                        hero
                          ? "border-dota-gold/50 bg-dota-gold/10"
                          : "border-dota-border/20 border-dashed bg-dota-surface/30"
                      }`}
                      style={
                        hero
                          ? { borderColor: `${ATTRIBUTE_COLORS[hero.attribute]}60` }
                          : {}
                      }
                    >
                      <AnimatePresence>
                        {hero ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="w-full h-full relative cursor-pointer"
                            onClick={() => toggleHero(hero)}
                          >
                            <Image
                              src={getHeroIcon(hero.name)}
                              alt={hero.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                              placeholder="blur"
                              blurDataURL={imageBlurDataUrl}
                            />
                          </motion.div>
                        ) : (
                          <span className="text-gray-600 text-xs">{i + 1}</span>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Synergy Gauge */}
              <div className="mb-4">
                <div className="flex items-end justify-between mb-1">
                  <span className="text-xs font-mono text-gray-500">Synergy Index</span>
                  <motion.span
                    key={synergyIndex}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-heading font-bold"
                    style={{ color: synergyColor }}
                  >
                    {selectedHeroes.length > 0 ? synergyIndex.toFixed(1) : "—"}
                  </motion.span>
                </div>
                <div className="h-2 bg-dota-surface rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: synergyColor }}
                    animate={{ width: `${selectedHeroes.length > 0 ? synergyIndex : 0}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Win Probability */}
              <div className="mb-4">
                <div className="flex items-end justify-between mb-1">
                  <span className="text-xs font-mono text-gray-500">Win Probability</span>
                  <span className="text-lg font-heading font-bold text-white">
                    {selectedHeroes.length > 0 ? `${(winProb * 100).toFixed(1)}%` : "—"}
                  </span>
                </div>
                <div className="h-1.5 bg-dota-surface rounded-full overflow-hidden" aria-hidden="true">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#f59e0b]"
                    animate={{ width: `${selectedHeroes.length > 0 ? winProb * 100 : 50}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Breakdown */}
              {selectedHeroes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  {breakdown.map((b) => (
                    <div key={b.label}>
                      <div className="flex justify-between text-[10px] font-mono mb-0.5">
                        <span className="text-gray-500">{b.label}</span>
                        <span className="text-gray-400">{b.value}/{b.max}</span>
                      </div>
                      <div className="h-1 bg-dota-surface/80 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-dota-gold/50"
                          animate={{ width: `${(b.value / b.max) * 100}%` }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Comparison with Liquid's Draft */}
            <div className="glass-card p-5">
              <h3 className="text-sm font-mono text-[#06b6d4] uppercase tracking-wider mb-3">
                vs Liquid&apos;s GF Draft
              </h3>
              <div className="flex items-center gap-2 mb-3">
                {["Batrider", "Shadow Demon", "Earth Spirit", "Dragon Knight", "Ember Spirit"].map((hero) => (
                  <div key={hero} className="w-8 h-8 rounded border border-[#06b6d4]/30 overflow-hidden">
                    <Image
                      src={getHeroIcon(hero)}
                      alt={hero}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                      placeholder="blur"
                      blurDataURL={imageBlurDataUrl}
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-mono">Liquid&apos;s Synergy</span>
                  <span className="text-[#06b6d4] font-bold">{liquidDraft.synergyIndex.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-mono">Your Synergy</span>
                  <span style={{ color: synergyColor }} className="font-bold">
                    {selectedHeroes.length > 0 ? synergyIndex.toFixed(1) : "—"}
                  </span>
                </div>
                <div className="dota-divider my-2" />
                <div className="flex justify-between">
                  <span className="text-gray-500 font-mono">Difference</span>
                  {selectedHeroes.length > 0 ? (
                    <span
                      className={`font-bold ${
                        synergyIndex > liquidDraft.synergyIndex
                          ? "text-[#92ff49]"
                          : synergyIndex < liquidDraft.synergyIndex
                          ? "text-[#ff4444]"
                          : "text-gray-400"
                      }`}
                    >
                      {synergyIndex > liquidDraft.synergyIndex ? "+" : ""}
                      {(synergyIndex - liquidDraft.synergyIndex).toFixed(1)}
                    </span>
                  ) : (
                    <span className="text-gray-600">—</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
