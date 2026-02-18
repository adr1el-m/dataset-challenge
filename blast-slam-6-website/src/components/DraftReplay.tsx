"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { grandFinalDraft } from "@/data/tournament";
import { getHeroIcon } from "@/lib/assets";

const TIMER_DURATION = 2200; // ms per step

export default function DraftReplay() {
  const [currentStep, setCurrentStep] = useState(-1); // -1 = not started
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalSteps = grandFinalDraft.length;

  const advance = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= totalSteps - 1) {
        setIsPlaying(false);
        setShowFinal(true);
        return prev;
      }
      return prev + 1;
    });
  }, [totalSteps]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(advance, TIMER_DURATION);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, advance]);

  const handlePlayPause = () => {
    if (showFinal) {
      // Reset
      setShowFinal(false);
      setCurrentStep(-1);
      setIsPlaying(false);
      return;
    }
    if (currentStep === -1) {
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((p) => !p);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(-1);
    setShowFinal(false);
  };

  const handleStepTo = (index: number) => {
    setIsPlaying(false);
    setShowFinal(false);
    setCurrentStep(index);
  };

  // Gather picks for each team
  const liquidPicks = grandFinalDraft
    .filter((a) => a.team === "Liquid" && a.action === "pick")
    .slice(0, currentStep >= 0 ? grandFinalDraft.slice(0, currentStep + 1).filter((a) => a.team === "Liquid" && a.action === "pick").length : 0);
  const naviPicks = grandFinalDraft
    .filter((a) => a.team === "NaVi" && a.action === "pick")
    .slice(0, currentStep >= 0 ? grandFinalDraft.slice(0, currentStep + 1).filter((a) => a.team === "NaVi" && a.action === "pick").length : 0);
  const liquidBans = grandFinalDraft
    .filter((a) => a.team === "Liquid" && a.action === "ban")
    .slice(0, currentStep >= 0 ? grandFinalDraft.slice(0, currentStep + 1).filter((a) => a.team === "Liquid" && a.action === "ban").length : 0);
  const naviBans = grandFinalDraft
    .filter((a) => a.team === "NaVi" && a.action === "ban")
    .slice(0, currentStep >= 0 ? grandFinalDraft.slice(0, currentStep + 1).filter((a) => a.team === "NaVi" && a.action === "ban").length : 0);

  const currentAction = currentStep >= 0 ? grandFinalDraft[currentStep] : null;
  const currentPhase = currentAction?.phase || "Awaiting Draft";

  // Get distinct phases for progress tracker
  const phases = Array.from(new Set(grandFinalDraft.map((a) => a.phase)));
  const currentPhaseIndex = phases.indexOf(currentPhase);

  return (
    <section id="draft-replay" className="relative py-20 sm:py-32 px-4 sm:px-6 minimap-grid">
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
            GRAND FINAL — GAME 4 DRAFT
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gradient-gold mb-3">
            Draft Replay
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Step through the championship-clinching draft. See how Liquid out-drafted NaVi pick by pick.
          </p>
        </motion.div>

        {/* Phase Progress Bar */}
        <div className="flex items-center justify-center gap-1 mb-8 flex-wrap">
          {phases.map((phase, i) => (
            <div
              key={phase}
              className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${
                i === currentPhaseIndex
                  ? "bg-dota-gold/20 text-dota-gold border border-dota-gold/40 scale-105"
                  : i < currentPhaseIndex
                  ? "bg-dota-surface/60 text-gray-400 border border-dota-border/20"
                  : "bg-dota-surface/30 text-gray-600 border border-dota-border/10"
              }`}
            >
              {phase}
            </div>
          ))}
        </div>

        {/* Main Draft Board */}
        <div className="glass-card p-6 sm:p-8 mb-6">
          {/* Team Headers */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="text-lg font-bold text-[#06b6d4]">Team Liquid</div>
              <div className="text-xs text-gray-500 font-mono">RADIANT</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-[#eab308]">Natus Vincere</div>
              <div className="text-xs text-gray-500 font-mono">DIRE</div>
            </div>
          </div>

          {/* Picks Row */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Liquid Picks */}
            <div>
              <div className="text-xs font-mono text-dota-gold/60 mb-2 uppercase tracking-wider">Picks</div>
              <div className="flex gap-2 flex-wrap">
                {[0, 1, 2, 3, 4].map((i) => {
                  const pick = liquidPicks[i];
                  return (
                    <div
                      key={i}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 flex items-center justify-center overflow-hidden transition-all duration-300 ${
                        pick
                          ? "border-[#92ff49]/60 bg-[#92ff49]/10"
                          : "border-dota-border/20 bg-dota-surface/40"
                      }`}
                    >
                      <AnimatePresence>
                        {pick && (
                          <motion.div
                            initial={{ scale: 0, x: -40, opacity: 0 }}
                            animate={{ scale: 1, x: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="relative w-full h-full"
                          >
                            <img
                              src={getHeroIcon(pick.hero)}
                              alt={pick.hero}
                              className="w-full h-full object-cover rounded"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-[8px] text-center text-white py-0.5 truncate px-0.5">
                              {pick.hero}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* NaVi Picks */}
            <div>
              <div className="text-xs font-mono text-dota-gold/60 mb-2 uppercase tracking-wider">Picks</div>
              <div className="flex gap-2 flex-wrap justify-end">
                {[0, 1, 2, 3, 4].map((i) => {
                  const pick = naviPicks[i];
                  return (
                    <div
                      key={i}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 flex items-center justify-center overflow-hidden transition-all duration-300 ${
                        pick
                          ? "border-[#ff4444]/60 bg-[#ff4444]/10"
                          : "border-dota-border/20 bg-dota-surface/40"
                      }`}
                    >
                      <AnimatePresence>
                        {pick && (
                          <motion.div
                            initial={{ scale: 0, x: 40, opacity: 0 }}
                            animate={{ scale: 1, x: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="relative w-full h-full"
                          >
                            <img
                              src={getHeroIcon(pick.hero)}
                              alt={pick.hero}
                              className="w-full h-full object-cover rounded"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-[8px] text-center text-white py-0.5 truncate px-0.5">
                              {pick.hero}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bans Row */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* Liquid Bans */}
            <div>
              <div className="text-xs font-mono text-[#ff4444]/60 mb-2 uppercase tracking-wider">Bans</div>
              <div className="flex gap-1.5 flex-wrap">
                {[0, 1, 2, 3, 4].map((i) => {
                  const ban = liquidBans[i];
                  return (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded border relative overflow-hidden transition-all duration-300 ${
                        ban
                          ? "border-[#ff4444]/40 bg-[#ff4444]/10"
                          : "border-dota-border/10 bg-dota-surface/20"
                      }`}
                    >
                      <AnimatePresence>
                        {ban && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative w-full h-full"
                          >
                            <img
                              src={getHeroIcon(ban.hero)}
                              alt={ban.hero}
                              className="w-full h-full object-cover rounded opacity-40 grayscale"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-[#ff4444] text-lg font-bold">✕</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* NaVi Bans */}
            <div>
              <div className="text-xs font-mono text-[#ff4444]/60 mb-2 uppercase tracking-wider">Bans</div>
              <div className="flex gap-1.5 flex-wrap justify-end">
                {[0, 1, 2, 3, 4].map((i) => {
                  const ban = naviBans[i];
                  return (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded border relative overflow-hidden transition-all duration-300 ${
                        ban
                          ? "border-[#ff4444]/40 bg-[#ff4444]/10"
                          : "border-dota-border/10 bg-dota-surface/20"
                      }`}
                    >
                      <AnimatePresence>
                        {ban && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative w-full h-full"
                          >
                            <img
                              src={getHeroIcon(ban.hero)}
                              alt={ban.hero}
                              className="w-full h-full object-cover rounded opacity-40 grayscale"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-[#ff4444] text-lg font-bold">✕</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Current Action Annotation */}
          <AnimatePresence mode="wait">
            {currentAction && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-lg border mb-6 ${
                  currentAction.action === "ban"
                    ? "bg-[#ff4444]/5 border-[#ff4444]/20"
                    : currentAction.team === "Liquid"
                    ? "bg-[#92ff49]/5 border-[#92ff49]/20"
                    : "bg-[#eab308]/5 border-[#eab308]/20"
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className={`text-xs font-mono uppercase px-2 py-0.5 rounded ${
                      currentAction.action === "ban"
                        ? "bg-[#ff4444]/20 text-[#ff4444]"
                        : "bg-[#92ff49]/20 text-[#92ff49]"
                    }`}
                  >
                    {currentAction.action}
                  </span>
                  <span className={`text-sm font-bold ${
                    currentAction.team === "Liquid" ? "text-[#06b6d4]" : "text-[#eab308]"
                  }`}>
                    {currentAction.team === "Liquid" ? "Team Liquid" : "Natus Vincere"}
                  </span>
                  <span className="text-white font-semibold">{currentAction.hero}</span>
                </div>
                {currentAction.annotation && (
                  <p className="text-xs text-gray-400 ml-1">{currentAction.annotation}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-dota-surface/80 border border-dota-border/30 text-gray-400 hover:text-white hover:border-dota-gold/30 transition-all text-sm font-mono"
            >
              ↺ Reset
            </button>
            <button
              onClick={handlePlayPause}
              className={`px-6 py-2.5 rounded-lg font-mono text-sm font-bold transition-all ${
                showFinal
                  ? "bg-dota-gold/20 text-dota-gold border border-dota-gold/40 hover:bg-dota-gold/30"
                  : isPlaying
                  ? "bg-blast-pink/20 text-blast-pink border border-blast-pink/40 hover:bg-blast-pink/30"
                  : "bg-dota-gold/20 text-dota-gold border border-dota-gold/40 hover:bg-dota-gold/30"
              }`}
            >
              {showFinal ? "↺ Replay" : isPlaying ? "❚❚ Pause" : currentStep === -1 ? "▶ Start Draft" : "▶ Resume"}
            </button>
            <button
              onClick={() => { if (currentStep < totalSteps - 1) handleStepTo(currentStep + 1); }}
              disabled={currentStep >= totalSteps - 1}
              className="px-4 py-2 rounded-lg bg-dota-surface/80 border border-dota-border/30 text-gray-400 hover:text-white hover:border-dota-gold/30 transition-all text-sm font-mono disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Skip ▸
            </button>
          </div>

          {/* Step Counter */}
          <div className="text-center mt-3">
            <span className="text-xs font-mono text-gray-500">
              {currentStep >= 0 ? currentStep + 1 : 0} / {totalSteps}
            </span>
          </div>
        </div>

        {/* Step Timeline */}
        <div className="glass-card p-4 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {grandFinalDraft.map((action, i) => (
              <button
                key={i}
                onClick={() => handleStepTo(i)}
                className={`flex flex-col items-center gap-1 px-1.5 py-2 rounded transition-all min-w-[42px] ${
                  i === currentStep
                    ? "bg-dota-gold/15 ring-1 ring-dota-gold/50"
                    : i <= currentStep
                    ? "bg-dota-surface/60 hover:bg-dota-surface"
                    : "opacity-40 hover:opacity-70"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded overflow-hidden border ${
                    action.action === "ban"
                      ? "border-[#ff4444]/30 grayscale opacity-60"
                      : action.team === "Liquid"
                      ? "border-[#92ff49]/40"
                      : "border-[#eab308]/40"
                  }`}
                >
                  <img
                    src={getHeroIcon(action.hero)}
                    alt={action.hero}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className={`text-[8px] font-mono uppercase ${
                    action.action === "ban" ? "text-[#ff4444]" : "text-[#92ff49]"
                  }`}
                >
                  {action.action === "ban" ? "BAN" : action.team === "Liquid" ? "LIQ" : "NAV"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Final Lineup (shown after draft completes) */}
        <AnimatePresence>
          {showFinal && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 glass-card p-6 border-dota-gold/20"
            >
              <div className="text-center mb-6">
                <div className="text-xs font-mono text-dota-gold mb-2">DRAFT COMPLETE</div>
                <h3 className="text-xl font-heading font-bold text-white">
                  Final Lineups — Game 4
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {/* Liquid Final */}
                <div className="text-center">
                  <div className="text-sm font-bold text-[#06b6d4] mb-3">Team Liquid</div>
                  <div className="flex justify-center gap-3">
                    {grandFinalDraft
                      .filter((a) => a.team === "Liquid" && a.action === "pick")
                      .map((pick, i) => (
                        <motion.div
                          key={pick.hero}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex flex-col items-center gap-1"
                        >
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 border-[#92ff49]/50 overflow-hidden glow-radiant">
                            <img
                              src={getHeroIcon(pick.hero)}
                              alt={pick.hero}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-[9px] text-gray-400">{pick.hero}</span>
                        </motion.div>
                      ))}
                  </div>
                </div>
                {/* NaVi Final */}
                <div className="text-center">
                  <div className="text-sm font-bold text-[#eab308] mb-3">Natus Vincere</div>
                  <div className="flex justify-center gap-3">
                    {grandFinalDraft
                      .filter((a) => a.team === "NaVi" && a.action === "pick")
                      .map((pick, i) => (
                        <motion.div
                          key={pick.hero}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1 + 0.3 }}
                          className="flex flex-col items-center gap-1"
                        >
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 border-[#ff4444]/50 overflow-hidden glow-dire">
                            <img
                              src={getHeroIcon(pick.hero)}
                              alt={pick.hero}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-[9px] text-gray-400">{pick.hero}</span>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="text-center mt-6 pt-4 border-t border-dota-border/20">
                <p className="text-sm text-dota-gold font-mono">
                  Liquid closed Game 4 with Batrider, Shadow Demon, Earth Spirit, Dragon Knight, and Ember Spirit.
                </p>
                <p className="text-xs text-gray-500 mt-1">Result: Team Liquid win Game 4 in 32:27.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
