"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions, teams, modelResults } from "@/data/tournament";
import TeamLogo from "./TeamLogo";

type QuizState = "intro" | "playing" | "result";

const streakMessages = [
  "",
  "Off to a start!",
  "Building momentum...",
  "Hot streak!",
  "On fire!",
  "Unstoppable analyst!",
];

export default function PredictTheWinner() {
  const [state, setState] = useState<QuizState>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const question = quizQuestions[currentQ];
  const progress = ((currentQ + (showExplanation ? 1 : 0)) / quizQuestions.length) * 100;

  const handleSelect = useCallback((answer: string) => {
    setSelected(answer);
    setShowExplanation(true);
    const correct = answer === question.correctAnswer;
    if (correct) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const newStreak = s + 1;
        setMaxStreak((m) => Math.max(m, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }
    setAnswers((a) => [...a, correct]);
  }, [question]);

  const handleNext = useCallback(() => {
    setSelected(null);
    setShowExplanation(false);
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      setState("result");
    }
  }, [currentQ]);

  const handleRestart = useCallback(() => {
    setCurrentQ(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setSelected(null);
    setShowExplanation(false);
    setAnswers([]);
    setState("playing");
  }, []);

  const getTeamColor = (name: string) => teams.find((t) => t.name === name)?.color || "#64748b";

  const accuracy = useMemo(() => {
    if (answers.length === 0) return 0;
    return Math.round((score / answers.length) * 100);
  }, [score, answers]);

  const resultTier = useMemo(() => {
    const pct = score / quizQuestions.length;
    if (pct === 1) return { title: "Perfect Analyst", subtitle: "Flawless read on every matchup.", color: "#c3ff00", bg: "from-dota-gold/20 to-transparent" };
    if (pct >= 0.8) return { title: "Draft Genius", subtitle: "You read the meta like a pro.", color: "#c3ff00", bg: "from-dota-gold/10 to-transparent" };
    if (pct >= 0.6) return { title: "Solid Read", subtitle: "Above average — better than most broadcasts.", color: "#3b82f6", bg: "from-blue-500/10 to-transparent" };
    if (pct >= 0.4) return { title: "Coin Flip", subtitle: "Even our ML model struggles sometimes.", color: "#a855f7", bg: "from-purple-500/10 to-transparent" };
    return { title: "Upset City", subtitle: "Dota is chaos — the data proves it.", color: "#ff1a6c", bg: "from-blast-pink/10 to-transparent" };
  }, [score]);

  return (
    <section id="predict" className="relative py-20 sm:py-32 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
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
            Interactive Challenge
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Predict the Winner
          </h2>
          <p className="text-dota-text-dim max-w-xl mx-auto text-sm sm:text-base">
            {quizQuestions.length} real matchups. Can you out-predict our ML model?
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {state === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-8 sm:p-10 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-radial from-dota-gold/5 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10">
                <img
                  src="/blast_slam_logo.png"
                  alt="BLAST Slam VI"
                  className="w-16 h-auto mx-auto mb-5 object-contain"
                  style={{ aspectRatio: "auto" }}
                />
                <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
                  Test Your Match Analysis
                </h3>
                <p className="text-sm text-dota-text-dim mb-6 max-w-md mx-auto">
                  Real results from BLAST Slam VI playoffs. Study the matchup context, trust your instincts,
                  and see if you can beat the algorithm.
                </p>

                <div className="flex items-center justify-center gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-heading font-bold text-dota-gold">{quizQuestions.length}</div>
                    <div className="text-[10px] text-dota-text-dim uppercase tracking-wider">Matches</div>
                  </div>
                  <div className="w-px h-8 bg-dota-border/30" />
                  <div className="text-center">
                    <div className="text-2xl font-heading font-bold text-blast-pink">
                      {(modelResults.xgbAccuracy * 100).toFixed(2)}%
                    </div>
                    <div className="text-[10px] text-dota-text-dim uppercase tracking-wider">ML Accuracy</div>
                  </div>
                  <div className="w-px h-8 bg-dota-border/30" />
                  <div className="text-center">
                    <div className="text-2xl font-heading font-bold text-white">???</div>
                    <div className="text-[10px] text-dota-text-dim uppercase tracking-wider">Your Score</div>
                  </div>
                </div>

                <motion.button
                  onClick={() => setState("playing")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-3.5 rounded-full bg-dota-gold text-dota-bg font-heading font-bold text-lg shadow-lg shadow-dota-gold/20"
                >
                  Begin Challenge
                </motion.button>
              </div>
            </motion.div>
          )}

          {state === "playing" && (
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="glass-card p-5 sm:p-8 relative overflow-hidden"
            >
              {streak >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-3 right-3 px-3 py-1 rounded-full bg-dota-gold/10 border border-dota-gold/30"
                >
                  <span className="text-[10px] text-dota-gold font-bold">
                    {streak}x STREAK {streakMessages[Math.min(streak, streakMessages.length - 1)]}
                  </span>
                </motion.div>
              )}

              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-dota-text-dim font-mono">
                  MATCH {currentQ + 1} / {quizQuestions.length}
                </div>
                <div className="text-xs font-mono" style={{ color: accuracy >= 50 ? "#c3ff00" : "#ff1a6c" }}>
                  {score} correct {answers.length > 0 && `(${accuracy}%)`}
                </div>
              </div>
              <div className="h-1 bg-dota-bg/50 rounded-full mb-6 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #c3ff00, #ff1a6c)" }}
                  initial={{ width: `${(currentQ / quizQuestions.length) * 100}%` }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="flex items-center justify-center gap-1.5 mb-6">
                {quizQuestions.map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{
                      backgroundColor:
                        i < answers.length
                          ? answers[i] ? "#c3ff00" : "#ff1a6c"
                          : i === currentQ
                          ? "#ffffff"
                          : "rgba(255,255,255,0.1)",
                      transform: i === currentQ ? "scale(1.5)" : "scale(1)",
                    }}
                  />
                ))}
              </div>

              <div className="text-center mb-2">
                <div className="text-xs text-dota-text-dim uppercase tracking-wider mb-3 font-mono">Who won this match?</div>
              </div>

              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 rounded-lg bg-dota-surface/60 border border-dota-border/20">
                  <p className="text-xs text-dota-text-dim italic">{question.hint}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-3 sm:gap-4 mb-6 items-center">
                {[question.teamA, question.teamB].map((team, idx) => {
                  const isCorrect = team === question.correctAnswer;
                  const isSelected = team === selected;
                  let borderColor = "rgba(30,37,80,0.6)";
                  let bgExtra = "";

                  if (showExplanation) {
                    if (isCorrect) {
                      borderColor = "rgba(195,255,0,0.5)";
                      bgExtra = " bg-dota-gold/5";
                    } else if (isSelected && !isCorrect) {
                      borderColor = "rgba(255,26,108,0.5)";
                      bgExtra = " bg-blast-pink/5";
                    }
                  }

                  const btn = (
                    <motion.button
                      key={team}
                      onClick={() => !showExplanation && handleSelect(team)}
                      disabled={showExplanation}
                      whileHover={!showExplanation ? { scale: 1.04 } : {}}
                      whileTap={!showExplanation ? { scale: 0.96 } : {}}
                      className={`glass-card p-5 sm:p-6 cursor-pointer transition-all text-center relative${bgExtra} ${
                        showExplanation && !isCorrect && !isSelected ? "opacity-40" : ""
                      }`}
                      style={{ borderColor }}
                    >
                      {showExplanation && isCorrect && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-dota-gold flex items-center justify-center"
                        >
                          <span className="text-dota-bg text-xs font-bold">&#10003;</span>
                        </motion.div>
                      )}
                      <TeamLogo name={team} size={56} className="mx-auto mb-3" />
                      <div className="font-heading font-bold text-lg" style={{ color: getTeamColor(team) }}>
                        {team}
                      </div>
                      {showExplanation && isSelected && !isCorrect && (
                        <span className="text-blast-pink text-xs font-semibold mt-1 block">Incorrect</span>
                      )}
                    </motion.button>
                  );

                  if (idx === 0) {
                    return (
                      <div key={`wrapper-${team}`} className="contents">
                        {btn}
                        <div className="hidden sm:flex items-center justify-center">
                          <span className="font-heading font-bold text-lg text-dota-text-dim/30">VS</span>
                        </div>
                      </div>
                    );
                  }
                  return btn;
                })}
              </div>

              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 rounded-lg bg-dota-surface/60 border border-dota-border/30 mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-4 rounded-full bg-dota-gold" />
                        <span className="text-xs font-heading font-bold text-dota-gold uppercase tracking-wider">Analysis</span>
                      </div>
                      <p className="text-sm text-dota-text-dim leading-relaxed pl-3">
                        {question.explanation}
                      </p>
                    </div>
                    <div className="text-center">
                      <motion.button
                        onClick={handleNext}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-2.5 rounded-full bg-dota-gold text-dota-bg font-heading font-bold shadow-lg shadow-dota-gold/20"
                      >
                        {currentQ < quizQuestions.length - 1 ? "Next Match" : "See Results"}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {state === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-6 sm:p-10 text-center relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${resultTier.bg} pointer-events-none`} />

              <div className="relative z-10">
                <img
                  src="/blast_slam_logo.png"
                  alt="BLAST Slam VI"
                  className="w-12 h-auto mx-auto mb-4 object-contain"
                  style={{ aspectRatio: "auto" }}
                />

                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="inline-block mb-4"
                >
                  <div
                    className="px-4 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider"
                    style={{ backgroundColor: `${resultTier.color}15`, color: resultTier.color, border: `1px solid ${resultTier.color}40` }}
                  >
                    {resultTier.title}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-heading text-5xl sm:text-6xl font-bold mb-1" style={{ color: resultTier.color }}>
                    {score} / {quizQuestions.length}
                  </h3>
                  <p className="text-sm text-dota-text-dim mb-6">{resultTier.subtitle}</p>
                </motion.div>

                <div className="grid grid-cols-3 gap-4 mb-6 max-w-sm mx-auto">
                  <div className="p-3 rounded-lg bg-dota-surface/40 border border-dota-border/20">
                    <div className="text-lg font-heading font-bold text-white">{Math.round((score / quizQuestions.length) * 100)}%</div>
                    <div className="text-[9px] text-dota-text-dim uppercase">Accuracy</div>
                  </div>
                  <div className="p-3 rounded-lg bg-dota-surface/40 border border-dota-border/20">
                    <div className="text-lg font-heading font-bold text-dota-gold">{maxStreak}x</div>
                    <div className="text-[9px] text-dota-text-dim uppercase">Best Streak</div>
                  </div>
                  <div className="p-3 rounded-lg bg-dota-surface/40 border border-dota-border/20">
                    <div className="text-lg font-heading font-bold text-blast-pink">
                      {((modelResults?.grandFinalPrediction?.liquidWinProb || 0.612) * 100).toFixed(0)}%
                    </div>
                    <div className="text-[9px] text-dota-text-dim uppercase">ML Accuracy</div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 mb-6">
                  {answers.map((correct, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.08 }}
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: correct ? "#c3ff00" : "#ff1a6c" }}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={handleRestart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-2.5 rounded-full bg-dota-gold text-dota-bg font-heading font-bold shadow-lg shadow-dota-gold/20"
                >
                  Play Again
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="section-divider mt-20 sm:mt-32" />
    </section>
  );
}
