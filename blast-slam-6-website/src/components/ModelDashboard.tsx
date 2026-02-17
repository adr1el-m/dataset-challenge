"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { modelResults, tournamentStats } from "@/data/tournament";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function ModelDashboard() {
  const { lrAUC, xgbAUC, xgbAccuracy, cvAUC, cvStd, featureImportance, rocCurve, grandFinalPrediction } = modelResults;

  return (
    <section id="model" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-dota-gold text-xs font-semibold uppercase block mb-3"
          >
            Machine Learning
          </motion.span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Model Dashboard
          </h2>
          <p className="text-dota-text-dim max-w-xl mx-auto">
            We trained two models on {tournamentStats.totalGames} games to predict match outcomes. Here&apos;s what they learned — and how they predicted the Grand Final.
          </p>
        </motion.div>

        {/* Model performance cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { label: "LR AUC-ROC", value: lrAUC.toFixed(4), color: "#3b82f6", description: "Logistic Regression" },
            { label: "XGB AUC-ROC", value: xgbAUC.toFixed(4), color: "#ef4444", description: "XGBoost" },
            { label: "XGB Accuracy", value: `${(xgbAccuracy * 100).toFixed(1)}%`, color: "#c9a537", description: "Best model" },
            { label: "CV AUC", value: `${cvAUC.toFixed(3)} ± ${cvStd.toFixed(3)}`, color: "#22c55e", description: "5-fold cross-validation" },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <div className="text-3xl font-heading font-bold mb-1" style={{ color: metric.color }}>
                {metric.value}
              </div>
              <div className="text-sm font-medium text-white mb-1">{metric.label}</div>
              <div className="text-xs text-dota-text-dim">{metric.description}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* ROC Curve */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6"
          >
            <h3 className="font-heading text-lg font-bold mb-2">ROC Curve Comparison</h3>
            <p className="text-xs text-dota-text-dim mb-4">How well each model separates wins from losses</p>
            <Plot
              data={[
                ...rocCurve.map((curve, i) => ({
                  type: "scatter" as const,
                  x: curve.fpr,
                  y: curve.tpr,
                  mode: "lines" as const,
                  name: `${curve.model} (AUC = ${i === 0 ? lrAUC.toFixed(3) : xgbAUC.toFixed(3)})`,
                  line: {
                    color: i === 0 ? "#3b82f6" : "#ef4444",
                    width: 2.5,
                    ...(i === 0 ? {} : {}),
                  },
                })),
                {
                  type: "scatter" as const,
                  x: [0, 1],
                  y: [0, 1],
                  mode: "lines" as const,
                  name: "Random (AUC = 0.500)",
                  line: { color: "rgba(107,114,128,0.4)", width: 1, dash: "dash" as const },
                  showlegend: true,
                },
              ]}
              layout={{
                paper_bgcolor: "transparent",
                plot_bgcolor: "transparent",
                font: { color: "#9ca3af", size: 11, family: "system-ui" },
                margin: { l: 50, r: 20, t: 10, b: 50 },
                height: 420,
                xaxis: {
                  title: { text: "False Positive Rate" },
                  gridcolor: "rgba(42,42,64,0.3)",
                  zerolinecolor: "rgba(42,42,64,0.3)",
                  range: [0, 1],
                },
                yaxis: {
                  title: { text: "True Positive Rate" },
                  gridcolor: "rgba(42,42,64,0.3)",
                  zerolinecolor: "rgba(42,42,64,0.3)",
                  range: [0, 1],
                },
                legend: {
                  x: 0.4, y: 0.1,
                  font: { color: "#9ca3af", size: 10 },
                  bgcolor: "rgba(10,10,18,0.8)",
                  bordercolor: "rgba(42,42,64,0.3)",
                  borderwidth: 1,
                },
              }}
              config={{ displayModeBar: false, responsive: true }}
              style={{ width: "100%", height: "420px" }}
            />
          </motion.div>

          {/* Feature Importance */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6"
          >
            <h3 className="font-heading text-lg font-bold mb-2">Feature Importance (XGBoost)</h3>
            <p className="text-xs text-dota-text-dim mb-4">Which factors matter most for predicting match outcomes?</p>
            <Plot
              data={[
                {
                  type: "bar" as const,
                  y: featureImportance.map((f) => f.feature),
                  x: featureImportance.map((f) => f.importance),
                  orientation: "h" as const,
                  marker: {
                    color: featureImportance.map((f) =>
                      f.feature.includes("Synergy") ? "#3b82f6" :
                      f.feature.includes("Tempo") ? "#ef4444" : "#6b7280"
                    ),
                    opacity: 0.85,
                    line: {
                      color: featureImportance.map((f) =>
                        f.feature.includes("Synergy") ? "#3b82f6" :
                        f.feature.includes("Tempo") ? "#ef4444" : "#6b7280"
                      ),
                      width: 1,
                    },
                  },
                  text: featureImportance.map((f) => `${(f.importance * 100).toFixed(1)}%`),
                  textposition: "outside" as const,
                  textfont: { color: "#9ca3af", size: 11 },
                },
              ]}
              layout={{
                paper_bgcolor: "transparent",
                plot_bgcolor: "transparent",
                font: { color: "#9ca3af", size: 11, family: "system-ui" },
                margin: { l: 120, r: 60, t: 10, b: 50 },
                height: 300,
                xaxis: {
                  title: { text: "Importance Score" },
                  gridcolor: "rgba(42,42,64,0.3)",
                  zerolinecolor: "rgba(42,42,64,0.3)",
                  range: [0, 0.42],
                },
                yaxis: { autorange: "reversed" as const },
                showlegend: false,
              }}
              config={{ displayModeBar: false, responsive: true }}
              style={{ width: "100%", height: "300px" }}
            />

            {/* LR Coefficients */}
            <div className="mt-6 pt-6 border-t border-dota-border/30">
              <h4 className="text-sm font-semibold mb-3">Logistic Regression Coefficients</h4>
              <div className="space-y-2">
                {featureImportance.map((f) => (
                  <div key={f.feature} className="flex items-center gap-3">
                    <span className="text-xs text-dota-text-dim w-28 shrink-0">{f.feature}</span>
                    <div className="flex-1 h-2 bg-dota-surface rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${(Math.abs(f.coefficient) / 0.5) * 100}%`,
                          backgroundColor: f.coefficient > 0 ? "#22c55e" : "#ef4444",
                        }}
                      />
                    </div>
                    <span className={`text-xs font-mono w-12 text-right ${f.coefficient > 0 ? "text-dota-radiant" : "text-dota-dire"}`}>
                      {f.coefficient > 0 ? "+" : ""}{f.coefficient.toFixed(3)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Grand Final Prediction from Models */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-6 mb-12 border border-dota-gold/20"
        >
          <h3 className="font-heading text-lg font-bold mb-4 text-center">
            🎯 Model&apos;s Grand Final Prediction {grandFinalPrediction.validated ? grandFinalPrediction.correct ? '✅ Correct!' : '❌ Incorrect' : ''}
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-dota-text-dim mb-1">Liquid Win Prob</div>
              <motion.div
                className="text-3xl font-heading font-bold"
                style={{ color: "#06b6d4" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {(grandFinalPrediction.liquidWinProb * 100).toFixed(1)}%
              </motion.div>
            </div>
            <div>
              <div className="text-sm text-dota-text-dim mb-1">NaVi Win Prob</div>
              <motion.div
                className="text-3xl font-heading font-bold"
                style={{ color: "#c9a537" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {(grandFinalPrediction.naviWinProb * 100).toFixed(1)}%
              </motion.div>
            </div>
            <div>
              <div className="text-sm text-dota-text-dim mb-1">Model Used</div>
              <div className="text-xl font-heading font-bold text-dota-radiant">XGBoost</div>
              <div className="text-xs text-dota-text-dim">AUC {xgbAUC.toFixed(3)}</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-dota-border/30 max-w-xl mx-auto">
            <div className="h-3 rounded-full overflow-hidden flex bg-dota-surface">
              <motion.div
                initial={{ width: "50%" }}
                whileInView={{ width: `${grandFinalPrediction.liquidWinProb * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full rounded-l-full"
                style={{ backgroundColor: "#06b6d4" }}
              />
              <motion.div
                initial={{ width: "50%" }}
                whileInView={{ width: `${grandFinalPrediction.naviWinProb * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full rounded-r-full"
                style={{ backgroundColor: "#c9a537" }}
              />
            </div>
            <div className="flex justify-between text-xs text-dota-text-dim mt-1">
              <span>💧 Liquid</span>
              <span>NaVi ⚔️</span>
            </div>
          </div>
        </motion.div>

        {/* Methodology note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-6 sm:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="text-2xl shrink-0">📊</div>
            <div>
              <h4 className="font-heading font-bold text-lg mb-2">Methodology</h4>
              <div className="text-sm text-dota-text-dim leading-relaxed space-y-2">
                <p>
                  <strong className="text-white">Data:</strong> {tournamentStats.totalGames} games from {tournamentStats.teamsParticipated} teams, 
                  sourced via OpenDota API. Each match includes draft data, duration, gold/XP differentials, and objective timings.
                </p>
                <p>
                  <strong className="text-white">Features:</strong> Synergy Index (team composition consistency + hero pair win rates), 
                  Tempo Index (early game dominance + side advantage + game closure speed), match duration, and map side.
                </p>
                <p>
                  <strong className="text-white">Models:</strong> Logistic Regression (baseline) and XGBoost (gradient boosted trees). 
                  Both trained with 80/20 split and validated via 5-fold cross-validation. XGBoost shows {((xgbAUC - lrAUC) * 100).toFixed(1)}% 
                  higher AUC, capturing non-linear feature interactions.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="section-divider mt-32" />
    </section>
  );
}
