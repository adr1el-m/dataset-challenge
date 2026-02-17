"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { quizQuestions, teams, isImageLogo } from "@/data/tournament";

function getTeamLogo(name: string) {
  return teams.find((t) => t.name === name)?.logo || "🎮";
}
export default function PredictTheWinner() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const q = quizQuestions[currentQ];
  const logoA = getTeamLogo(q.teamA);
  const logoB = getTeamLogo(q.teamB);

  const handleSelect = useCallback(
    (answer: string) => {
      if (selected) return;
      setSelected(answer);
      if (answer === q.correctAnswer) setScore((s) => s + 1);
      setShowResult(true);
    },
    [selected, q.correctAnswer]
  );

  const handleNext = useCallback(() => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setIsComplete(true);
    }
  }, [currentQ]);

  const handleRestart = useCallback(() => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setIsComplete(false);
  }, []);

  return (
    <section id="quiz" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-dota-gold text-xs font-semibold uppercase block mb-3"
          >
            Interactive Challenge
          </motion.span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            Predict the Winner
          </h2>
          <p className="text-dota-text-dim max-w-md mx-auto">
            Can you predict match results using what you&apos;ve learned about
            synergy and tempo? Test yourself on real tournament matches.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-dota-text-dim mb-2">
            <span>
              Question {Math.min(currentQ + 1, quizQuestions.length)} of{" "}
              {quizQuestions.length}
            </span>
            <span>
              Score: {score}/{isComplete ? quizQuestions.length : currentQ + (showResult ? 1 : 0)}
            </span>
          </div>
          <div className="h-1.5 bg-dota-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-dota-gold"
              animate={{
                width: `${
                  ((currentQ + (showResult || isComplete ? 1 : 0)) /
                    quizQuestions.length) *
                  100
                }%`,
              }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
              className="glass-card p-8"
            >
              <div className="text-center mb-8">
                <p className="text-sm text-dota-text-dim mb-2">
                  Who won this match?
                </p>
                <div className="flex items-center justify-center gap-4 sm:gap-8">
                  <motion.button
                    onClick={() => handleSelect(q.teamA)}
                    whileHover={!selected ? { scale: 1.05 } : {}}
                    whileTap={!selected ? { scale: 0.95 } : {}}
                    className={`flex-1 max-w-[200px] p-6 rounded-xl border-2 transition-all duration-300 ${
                      !selected
                        ? "border-dota-border/30 hover:border-dota-blue/50 bg-dota-surface/30 cursor-pointer"
                        : selected === q.teamA
                        ? q.teamA === q.correctAnswer
                          ? "border-dota-radiant bg-dota-radiant/10"
                          : "border-dota-dire bg-dota-dire/10"
                        : q.teamA === q.correctAnswer
                        ? "border-dota-radiant/50 bg-dota-radiant/5"
                        : "border-dota-border/10 bg-dota-surface/10 opacity-50"
                    }`}
                  >
                    <motion.span
                      className="block mb-2 h-12 w-12 mx-auto"
                      animate={
                        selected === q.teamA && q.teamA === q.correctAnswer
                          ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }
                          : {}
                      }
                    >
                      {isImageLogo(logoA) ? (
                        <Image
                          src={logoA}
                          alt={`${q.teamA} logo`}
                          width={48}
                          height={48}
                          sizes="48px"
                          className="h-full w-full object-contain drop-shadow-[0_0_6px_rgba(0,0,0,0.35)]"
                        />
                      ) : (
                        <span className="text-4xl">{logoA}</span>
                      )}
                    </motion.span>
                    <span className="font-heading font-bold text-sm block">
                      {q.teamA}
                    </span>
                  </motion.button>

                  <div className="relative">
                    <span className="font-heading text-2xl font-bold text-dota-gold">
                      VS
                    </span>
                  </div>

                  <motion.button
                    onClick={() => handleSelect(q.teamB)}
                    whileHover={!selected ? { scale: 1.05 } : {}}
                    whileTap={!selected ? { scale: 0.95 } : {}}
                    className={`flex-1 max-w-[200px] p-6 rounded-xl border-2 transition-all duration-300 ${
                      !selected
                        ? "border-dota-border/30 hover:border-dota-dire/50 bg-dota-surface/30 cursor-pointer"
                        : selected === q.teamB
                        ? q.teamB === q.correctAnswer
                          ? "border-dota-radiant bg-dota-radiant/10"
                          : "border-dota-dire bg-dota-dire/10"
                        : q.teamB === q.correctAnswer
                        ? "border-dota-radiant/50 bg-dota-radiant/5"
                        : "border-dota-border/10 bg-dota-surface/10 opacity-50"
                    }`}
                  >
                    <motion.span
                      className="block mb-2 h-12 w-12 mx-auto"
                      animate={
                        selected === q.teamB && q.teamB === q.correctAnswer
                          ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }
                          : {}
                      }
                    >
                      {isImageLogo(logoB) ? (
                        <Image
                          src={logoB}
                          alt={`${q.teamB} logo`}
                          width={48}
                          height={48}
                          sizes="48px"
                          className="h-full w-full object-contain drop-shadow-[0_0_6px_rgba(0,0,0,0.35)]"
                        />
                      ) : (
                        <span className="text-4xl">{logoB}</span>
                      )}
                    </motion.span>
                    <span className="font-heading font-bold text-sm block">
                      {q.teamB}
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* Hint */}
              {!selected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center mb-4"
                >
                  <p className="text-xs text-dota-text-dim italic">
                    💡 Hint: {q.hint}
                  </p>
                </motion.div>
              )}

              {/* Explanation */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -20, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`p-4 rounded-lg mb-4 ${
                        selected === q.correctAnswer
                          ? "bg-dota-radiant/10 border border-dota-radiant/30"
                          : "bg-dota-dire/10 border border-dota-dire/30"
                      }`}
                    >
                      <p
                        className={`text-sm font-semibold mb-1 ${
                          selected === q.correctAnswer
                            ? "text-dota-radiant"
                            : "text-dota-dire"
                        }`}
                      >
                        {selected === q.correctAnswer
                          ? "✓ Correct!"
                          : `✗ Wrong — ${q.correctAnswer} won`}
                      </p>
                      <p className="text-xs text-dota-text-dim leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>

                    <div className="text-center">
                      <motion.button
                        onClick={handleNext}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 rounded-full text-sm font-semibold bg-dota-gold text-dota-bg hover:bg-dota-gold/90 transition-all"
                      >
                        {currentQ < quizQuestions.length - 1
                          ? "Next Question →"
                          : "See Results"}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="glass-card p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="text-6xl mb-4"
              >
                {score === quizQuestions.length
                  ? "🏆"
                  : score >= quizQuestions.length * 0.6
                  ? "🎯"
                  : "📚"}
              </motion.div>

              <h3 className="font-heading text-3xl font-bold mb-2">
                {score === quizQuestions.length
                  ? "Perfect Score!"
                  : score >= quizQuestions.length * 0.6
                  ? "Well Done!"
                  : "Keep Studying!"}
              </h3>
              <p className="text-dota-text-dim mb-2">
                You got{" "}
                <span className="text-dota-gold font-bold">
                  {score}/{quizQuestions.length}
                </span>{" "}
                correct
              </p>
              <p className="text-xs text-dota-text-dim mb-6">
                {score === quizQuestions.length
                  ? "You have a deep understanding of competitive Dota 2 — synergy vs tempo analysis is second nature to you."
                  : score >= quizQuestions.length * 0.6
                  ? "Good intuition! You can see how synergy and tempo shape outcomes."
                  : "Dota 2 outcomes are tricky to predict — even our ML models only hit ~67% accuracy!"}
              </p>

              <motion.button
                onClick={handleRestart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-full text-sm font-semibold bg-dota-gold/10 text-dota-gold border border-dota-gold/30 hover:bg-dota-gold/20 transition-all"
              >
                🔄 Try Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="section-divider mt-32" />
    </section>
  );
}
