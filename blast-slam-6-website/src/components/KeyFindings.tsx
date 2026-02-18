"use client";

import { motion } from "framer-motion";

const findings = [
  {
    title: "Synergy > Tempo",
    description:
      "Team Liquid's championship-winning synergy index (82.1) proved that draft cohesion outweighs raw aggression. Their balanced approach dismantled NaVi's tempo-first strategy in the Grand Final.",
    stat: "Synergy/Tempo ratio: 1.15",
    value: "82.1",
    color: "#c3ff00",
    trend: [62, 64, 63, 68, 70, 74, 76, 79, 82],
    progress: 82.1,
  },
  {
    title: "ML Validation",
    description:
      "Our XGBoost model achieved 0.716 AUC and correctly predicted Team Liquid as Grand Final winners with 61.2% probability — validating the synergy hypothesis.",
    stat: "XGBoost AUC Score: 0.716",
    value: "0.716",
    color: "#3b82f6",
    trend: [52, 55, 58, 61, 63, 67, 70, 72, 71.6],
    progress: 71.6,
  },
  {
    title: "Jakiro Meta Dominance",
    description:
      "Jakiro dominated the hero meta with an 86% contest rate — the highest in the tournament. Its versatility in Liquid's drafts was a key factor in their championship run.",
    stat: "86% contest rate",
    value: "86%",
    color: "#ff1a6c",
    trend: [48, 54, 61, 70, 76, 81, 84, 86, 86],
    progress: 86,
  },
  {
    title: "Comeback Factor",
    description:
      "27.8% of all games featured comebacks, with Tundra Esports leading at 46%. However, their slow tempo (58.2) proved fatal when HEROIC's aggression eliminated them.",
    stat: "27.8% overall comeback rate",
    value: "27.8%",
    color: "#a855f7",
    trend: [18, 20, 24, 22, 26, 30, 28, 27, 27.8],
    progress: 27.8,
  },
  {
    title: "Side Advantage Myth",
    description:
      "Radiant held a slight 52.1% win rate advantage across all 100 games. Liquid's exceptional Radiant win rate (74%) suggests side selection as a subtle strategic edge.",
    stat: "Radiant Win Rate: 52.1%",
    value: "52.1%",
    color: "#22c55e",
    trend: [46, 48, 49, 51, 52, 53, 52, 52.5, 52.1],
    progress: 52.1,
  },
  {
    title: "First Blood ≠ Victory",
    description:
      "First blood led to wins only 59.2% of the time — a minor advantage. NaVi's high first blood rate (70%) couldn't overcome Liquid's superior mid-to-late game execution.",
    stat: "First Blood → Win: 59.2%",
    value: "59.2%",
    color: "#eab308",
    trend: [44, 50, 54, 56, 58, 61, 63, 60, 59.2],
    progress: 59.2,
  },
];

const SPARKLINE_WIDTH = 96;
const SPARKLINE_HEIGHT = 28;
const DONUT_SIZE = 32;
const DONUT_STROKE = 3;
const DONUT_RADIUS = 12;

const getSparklinePath = (points: number[], width: number, height: number, padding: number) => {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const step = (width - padding * 2) / Math.max(points.length - 1, 1);

  return points
    .map((point, index) => {
      const x = padding + index * step;
      const y = padding + (1 - (point - min) / range) * (height - padding * 2);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
};

const getDonutStroke = (value: number) => {
  const clamped = Math.min(Math.max(value, 0), 100);
  const circumference = 2 * Math.PI * DONUT_RADIUS;
  return {
    dash: (clamped / 100) * circumference,
    circumference,
  };
};

export default function KeyFindings() {
  return (
    <section id="findings" className="relative py-20 sm:py-32 px-4 sm:px-6 hex-pattern">
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
            Key Takeaways
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Key Findings
          </h2>
          <p className="text-dota-text-dim max-w-xl mx-auto text-sm sm:text-base">
            Six data-driven insights from 100 games of BLAST Slam VI.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {findings.map((finding, i) => (
            <motion.div
              key={finding.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card p-5 sm:p-6 group cursor-default"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 font-mono font-bold text-xs"
                    style={{ backgroundColor: `${finding.color}15`, color: finding.color, border: `1px solid ${finding.color}30` }}
                  >
                    {finding.value}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base" style={{ color: finding.color }}>
                      {finding.title}
                    </h3>
                  </div>
                </div>
                <svg
                  viewBox={`0 0 ${SPARKLINE_WIDTH} ${SPARKLINE_HEIGHT}`}
                  className="w-24 h-7 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d={getSparklinePath(finding.trend, SPARKLINE_WIDTH, SPARKLINE_HEIGHT, 2)}
                    fill="none"
                    stroke={finding.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-sm text-dota-text-dim leading-relaxed mb-4">{finding.description}</p>
              <div className="flex flex-wrap items-center gap-2">
                <svg
                  width={DONUT_SIZE}
                  height={DONUT_SIZE}
                  viewBox={`0 0 ${DONUT_SIZE} ${DONUT_SIZE}`}
                  className="shrink-0"
                  aria-hidden="true"
                >
                  <circle
                    cx={DONUT_SIZE / 2}
                    cy={DONUT_SIZE / 2}
                    r={DONUT_RADIUS}
                    fill="transparent"
                    stroke={`${finding.color}25`}
                    strokeWidth={DONUT_STROKE}
                  />
                  <circle
                    cx={DONUT_SIZE / 2}
                    cy={DONUT_SIZE / 2}
                    r={DONUT_RADIUS}
                    fill="transparent"
                    stroke={finding.color}
                    strokeWidth={DONUT_STROKE}
                    strokeLinecap="round"
                    strokeDasharray={`${getDonutStroke(finding.progress).dash} ${getDonutStroke(finding.progress).circumference}`}
                    transform={`rotate(-90 ${DONUT_SIZE / 2} ${DONUT_SIZE / 2})`}
                  />
                </svg>
                <div className="h-0.5 flex-1 min-w-[120px] rounded-full" style={{ backgroundColor: `${finding.color}30` }}>
                  <div
                    className="h-full rounded-full"
                    style={{ backgroundColor: finding.color, width: `${Math.min(finding.progress, 100)}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-dota-text-dim">{finding.stat}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 glass-card p-6 sm:p-8 text-center max-w-3xl mx-auto"
        >
          <h3 className="font-heading text-xl sm:text-2xl font-bold mb-3">
            The Verdict
          </h3>
          <p className="text-sm sm:text-base text-dota-text-dim leading-relaxed">
            Across 100 games, teams in the top quartile for synergy index averaged a{" "}
            <span className="text-dota-gold font-semibold">58.3% win rate</span> vs. 44.1% for tempo-first teams.
            Liquid&apos;s 82.1 synergy index coupled with a 1.15 synergy-to-tempo ratio translated to a{" "}
            <span className="text-dota-gold font-semibold">75% series win rate</span> through playoffs.
            Meanwhile, NaVi&apos;s league-high 78.4 tempo rating yielded only a{" "}
            <span className="text-blast-pink font-semibold">2-3 record in the Grand Final</span>.
            The data is clear: draft cohesion is a stronger predictor of tournament success than pace of play.
          </p>
        </motion.div>
      </div>

      <div className="section-divider mt-20 sm:mt-32" />
    </section>
  );
}
