"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { modelResults } from "@/data/tournament";
import TeamLogo from "./TeamLogo";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function ModelDashboard() {
  const { featureImportance, rocCurve, grandFinalPrediction } = modelResults;

  return (
    <section id="model" className="relative py-20 sm:py-32 px-4 sm:px-6 minimap-grid">
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
            Machine Learning
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Model Dashboard
          </h2>
          <p className="text-dota-text-dim max-w-xl mx-auto text-sm sm:text-base">
            Win-probability models trained on tournament match features — validated against the actual Grand Final result.
          </p>
        </motion.div>

        {/* Model Performance Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {[
            { label: "Logistic Regression AUC", value: modelResults.lrAUC.toFixed(3) },
            { label: "XGBoost AUC Score", value: modelResults.xgbAUC.toFixed(3) },
            { label: "Logistic Regression Accuracy", value: `${(modelResults.lrAccuracy * 100).toFixed(1)}%` },
            { label: "XGBoost Accuracy", value: `${(modelResults.xgbAccuracy * 100).toFixed(1)}%` },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-3 sm:p-4 text-center"
            >
              <div className="text-xl sm:text-2xl font-heading font-bold text-white">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-dota-text-dim uppercase tracking-wider mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 mb-12">
          {/* ROC Curve */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-4 sm:p-6"
          >
            <h3 className="font-heading text-lg font-bold mb-1">ROC Curve</h3>
            <p className="text-xs text-dota-text-dim mb-4">Model discrimination ability — higher is better</p>
            <div className="chart-container">
              <Plot
                data={[
                  ...rocCurve.map((curve) => ({
                    type: "scatter" as const,
                    mode: "lines" as const,
                    x: curve.fpr,
                    y: curve.tpr,
                    name: curve.model,
                    line: {
                      color: curve.model.includes("Logistic") ? "#c3ff00" : "#ff1a6c",
                      width: 2.5,
                    },
                    hovertemplate: `${curve.model}<br>FPR: %{x:.2f}<br>TPR: %{y:.2f}<extra></extra>`,
                  })),
                  {
                    type: "scatter" as const,
                    mode: "lines" as const,
                    x: [0, 1],
                    y: [0, 1],
                    name: "Random",
                    line: { color: "#64748b", width: 1, dash: "dash" as const },
                    showlegend: true,
                  },
                ]}
                layout={{
                  xaxis: { title: { text: "False Positive Rate" }, tickfont: { color: "#9ca3af" }, gridcolor: "rgba(30,37,80,0.3)", range: [0, 1] },
                  yaxis: { title: { text: "True Positive Rate" }, tickfont: { color: "#9ca3af" }, gridcolor: "rgba(30,37,80,0.3)", range: [0, 1] },
                  margin: { l: 60, r: 20, t: 10, b: 50 },
                  paper_bgcolor: "transparent",
                  plot_bgcolor: "transparent",
                  font: { color: "#9ca3af" },
                  height: 380,
                  legend: { font: { color: "#9ca3af", size: 10 }, bgcolor: "transparent", x: 0.55, y: 0.15 },
                }}
                config={{ displayModeBar: false, responsive: true }}
                style={{ width: "100%", height: "380px" }}
              />
            </div>
          </motion.div>

          {/* Feature Importance */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-4 sm:p-6"
          >
            <h3 className="font-heading text-lg font-bold mb-1">Feature Importance</h3>
            <p className="text-xs text-dota-text-dim mb-4">What matters most for winning?</p>
            <div className="space-y-4">
              {featureImportance.map((feat, i) => (
                <motion.div
                  key={feat.feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{feat.feature}</span>
                    <span className="text-xs text-dota-text-dim font-mono">
                      {(feat.importance * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-3 bg-dota-bg/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${feat.importance * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${feat.coefficient > 0 ? "#c3ff00" : "#ff1a6c"}, ${feat.coefficient > 0 ? "#c3ff0050" : "#ff1a6c50"})`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[10px] text-dota-text-dim">
                      Coefficient: {feat.coefficient > 0 ? "+" : ""}{feat.coefficient.toFixed(3)}
                    </span>
                    <span className={`text-[10px] font-medium ${feat.coefficient > 0 ? "text-dota-gold" : "text-blast-pink"}`}>
                      {feat.coefficient > 0 ? "↑ Positive" : "↓ Negative"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-3 rounded-lg bg-dota-gold/5 border border-dota-gold/20">
              <p className="text-xs text-dota-text-dim">
                <span className="text-dota-gold font-semibold">Key finding:</span> Synergy Index has the strongest predictive power ({(featureImportance[0].importance * 100).toFixed(1)}%), supporting the thesis that draft cohesion — not raw aggression — separates champions.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Grand Final Prediction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-4 sm:p-8"
        >
          <div className="text-center mb-6">
            <h3 className="font-heading text-xl sm:text-2xl font-bold mb-1">Grand Final Prediction</h3>
            <p className="text-xs text-dota-text-dim">Pre-match model output — validated post-tournament</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-8">
            <div className="flex items-center gap-3 text-center sm:text-right">
              <div className="sm:order-1">
                <TeamLogo name="Team Liquid" size={48} />
              </div>
              <div className="sm:order-0">
                <div className="font-heading text-xl sm:text-2xl font-bold" style={{ color: "#06b6d4" }}>
                  {(grandFinalPrediction.liquidWinProb * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-dota-text-dim">Team Liquid</div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-xs text-dota-text-dim uppercase tracking-wider mb-2">Win Probability</div>
              <div className="w-48 sm:w-64 h-3 flex rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${grandFinalPrediction.liquidWinProb * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-cyan-400"
                />
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${grandFinalPrediction.naviWinProb * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-yellow-500"
                />
              </div>
              {grandFinalPrediction.validated && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, type: "spring" }}
                  className={`mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                    grandFinalPrediction.correct
                      ? "bg-dota-gold/20 text-dota-gold"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {grandFinalPrediction.correct ? "✓ Prediction Correct" : "✗ Prediction Incorrect"}
                </motion.div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <TeamLogo name="Natus Vincere" size={48} />
              <div>
                <div className="font-heading text-xl sm:text-2xl font-bold text-yellow-500">
                  {(grandFinalPrediction.naviWinProb * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-dota-text-dim">Natus Vincere</div>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <h4 className="text-sm font-heading font-bold mb-3">Key Factors</h4>
            <div className="space-y-2">
              {grandFinalPrediction.keyFactors.map((factor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-dota-gold text-sm mt-0.5 shrink-0">▸</span>
                  <p className="text-xs text-dota-text-dim leading-relaxed">{factor}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="section-divider mt-20 sm:mt-32" />
    </section>
  );
}
