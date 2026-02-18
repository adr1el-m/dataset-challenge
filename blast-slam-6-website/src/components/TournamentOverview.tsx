"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { tournamentStats, matches, goldTimeline, playoffBracket } from "@/data/tournament";
import TeamLogo from "./TeamLogo";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

/* ───────────────────────────────────────
   BRACKET MATCH ROW (compact inline card)
   ─────────────────────────────────────── */
function BracketMatch({ match }: { match: typeof playoffBracket[0] }) {
  return (
    <div className="bg-dota-card/80 border border-white/5 rounded-lg overflow-hidden w-full">
      {[
        { name: match.teamA, score: match.scoreA, won: match.winner === match.teamA },
        { name: match.teamB, score: match.scoreB, won: match.winner === match.teamB },
      ].map((team, i) => (
        <div
          key={team.name}
          className={`flex items-center justify-between gap-2 px-2.5 py-1.5 ${
            i === 0 ? "border-b border-white/5" : ""
          } ${team.won ? "bg-dota-gold/8" : ""}`}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <TeamLogo name={team.name} size={16} />
            <span className={`text-[11px] font-medium truncate ${team.won ? "text-white" : "text-dota-text-dim"}`}>
              {team.name}
            </span>
          </div>
          <span className={`font-heading font-bold text-xs tabular-nums ${team.won ? "text-dota-gold" : "text-dota-text-dim/60"}`}>
            {team.score}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────────────────────
   GOLD DIFF CHART MODES
   ─────────────────────────────────────── */
type ChartMode = "gold" | "networth" | "kills";

/* ───────────────────────────────────────
   MAIN COMPONENT
   ─────────────────────────────────────── */
export default function TournamentOverview() {
  const highlightMatches = matches.filter(
    (m) => m.isUpset || m.round === "Grand Final" || m.round.includes("Semifinal")
  );
  const [chartMode, setChartMode] = useState<ChartMode>("gold");

  /* ── Bracket ref for connector lines ── */
  const bracketRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);

  useEffect(() => {
    function calcLines() {
      const container = bracketRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const cards = container.querySelectorAll<HTMLElement>("[data-bracket]");
      const pos: Record<string, DOMRect> = {};
      cards.forEach((el) => {
        const id = el.getAttribute("data-bracket");
        if (id) pos[id] = el.getBoundingClientRect();
      });

      const newLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
      const rel = (r: DOMRect) => ({
        left: r.left - rect.left,
        right: r.right - rect.left,
        midY: r.top - rect.top + r.height / 2,
      });

      // QF0 → SF0
      if (pos["qf-0"] && pos["sf-0"]) {
        const qf0 = rel(pos["qf-0"]);
        const sf0 = rel(pos["sf-0"]);
        const midX = (qf0.right + sf0.left) / 2;
        newLines.push({ x1: qf0.right, y1: qf0.midY, x2: midX, y2: qf0.midY });
        newLines.push({ x1: midX, y1: qf0.midY, x2: midX, y2: sf0.midY });
        newLines.push({ x1: midX, y1: sf0.midY, x2: sf0.left, y2: sf0.midY });
      }

      // QF1 → SF1
      if (pos["qf-1"] && pos["sf-1"]) {
        const qf1 = rel(pos["qf-1"]);
        const sf1 = rel(pos["sf-1"]);
        const midX = (qf1.right + sf1.left) / 2;
        newLines.push({ x1: qf1.right, y1: qf1.midY, x2: midX, y2: qf1.midY });
        newLines.push({ x1: midX, y1: qf1.midY, x2: midX, y2: sf1.midY });
        newLines.push({ x1: midX, y1: sf1.midY, x2: sf1.left, y2: sf1.midY });
      }

      // SF0 → GF, SF1 → GF
      if (pos["sf-0"] && pos["sf-1"] && pos["gf-0"]) {
        const s0 = rel(pos["sf-0"]);
        const s1 = rel(pos["sf-1"]);
        const gf = rel(pos["gf-0"]);
        const midX = (s0.right + gf.left) / 2;
        newLines.push({ x1: s0.right, y1: s0.midY, x2: midX, y2: s0.midY });
        newLines.push({ x1: s1.right, y1: s1.midY, x2: midX, y2: s1.midY });
        newLines.push({ x1: midX, y1: s0.midY, x2: midX, y2: s1.midY });
        const gfMidY = gf.midY;
        newLines.push({ x1: midX, y1: gfMidY, x2: gf.left, y2: gfMidY });
      }

      setLines(newLines);
    }

    calcLines();
    window.addEventListener("resize", calcLines);
    // Recalc after animations settle
    const t = setTimeout(calcLines, 600);
    return () => {
      window.removeEventListener("resize", calcLines);
      clearTimeout(t);
    };
  }, []);

  /* ── Chart data builders ── */
  const getPlotData = () => {
    const hoverCommon = {
      hoverlabel: {
        bgcolor: "#131836",
        bordercolor: "rgba(195,255,0,0.3)",
        font: { color: "#e5e7eb", family: "Inter, sans-serif", size: 12 },
      },
    };

    switch (chartMode) {
      case "gold":
        return [
          {
            type: "scatter" as const,
            mode: "lines+markers" as const,
            x: goldTimeline.minutes,
            y: goldTimeline.goldDiff,
            name: "Gold Difference",
            line: { color: "#c3ff00", width: 3, shape: "spline" as const },
            marker: { size: 4, color: "#c3ff00" },
            fill: "tozeroy" as const,
            fillcolor: "rgba(195,255,0,0.07)",
            hovertemplate:
              "<b>Minute %{x}</b><br>" +
              "Gold Lead: <b>%{y:+,}</b><br>" +
              "<extra></extra>",
            ...hoverCommon,
          },
          {
            type: "scatter" as const,
            mode: "lines" as const,
            x: goldTimeline.minutes,
            y: goldTimeline.xpDiff,
            name: "XP Difference",
            line: { color: "#ff1a6c", width: 2, dash: "dot" as const, shape: "spline" as const },
            hovertemplate:
              "<b>Minute %{x}</b><br>" +
              "XP Lead: <b>%{y:+,}</b><br>" +
              "<extra></extra>",
            ...hoverCommon,
          },
          {
            type: "scatter" as const,
            mode: "lines" as const,
            x: goldTimeline.minutes,
            y: goldTimeline.killDiff.map((k) => k * 500),
            name: "Kill Differential (\u00d7500 scale)",
            line: { color: "#60a5fa", width: 1.5, dash: "dash" as const, shape: "spline" as const },
            hovertemplate:
              "<b>Minute %{x}</b><br>" +
              "Kill Diff: <b>%{customdata:+}</b><br>" +
              "<extra></extra>",
            customdata: goldTimeline.killDiff,
            yaxis: "y" as const,
            ...hoverCommon,
          },
        ];
      case "networth":
        return [
          {
            type: "scatter" as const,
            mode: "lines+markers" as const,
            x: goldTimeline.minutes,
            y: goldTimeline.naviNetWorth,
            name: "Natus Vincere",
            line: { color: "#eab308", width: 3, shape: "spline" as const },
            marker: { size: 4, color: "#eab308" },
            hovertemplate:
              "<b>Minute %{x}</b><br>" +
              "NaVi: <b>%{y:,}g</b><br>" +
              "<extra></extra>",
            ...hoverCommon,
          },
          {
            type: "scatter" as const,
            mode: "lines+markers" as const,
            x: goldTimeline.minutes,
            y: goldTimeline.liquidNetWorth,
            name: "Team Liquid",
            line: { color: "#06b6d4", width: 3, shape: "spline" as const },
            marker: { size: 4, color: "#06b6d4" },
            fill: "tonexty" as const,
            fillcolor: "rgba(6,182,212,0.06)",
            hovertemplate:
              "<b>Minute %{x}</b><br>" +
              "Liquid: <b>%{y:,}g</b><br>" +
              "<extra></extra>",
            ...hoverCommon,
          },
        ];
      case "kills":
        return [
          {
            type: "bar" as const,
            x: goldTimeline.minutes,
            y: goldTimeline.killDiff,
            name: "Kill Differential",
            marker: {
              color: goldTimeline.killDiff.map((v) =>
                v > 0 ? "rgba(195,255,0,0.7)" : v < 0 ? "rgba(255,26,108,0.7)" : "rgba(156,163,175,0.3)"
              ),
            },
            hovertemplate:
              "<b>Minute %{x}</b><br>" +
              "Kill Diff: <b>%{y:+}</b><br>" +
              "<extra></extra>",
            ...hoverCommon,
          },
          {
            type: "scatter" as const,
            mode: "lines" as const,
            x: goldTimeline.minutes,
            y: goldTimeline.towerDiff,
            name: "Tower Differential",
            yaxis: "y2" as const,
            line: { color: "#a78bfa", width: 2.5, shape: "hv" as const },
            hovertemplate:
              "<b>Minute %{x}</b><br>" +
              "Tower Diff: <b>%{y:+}</b><br>" +
              "<extra></extra>",
            ...hoverCommon,
          },
        ];
    }
  };

  const getLayout = (): Record<string, unknown> => {
    const base = {
      margin: { l: 55, r: 45, t: 10, b: 45 },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: { color: "#9ca3af", family: "Inter, sans-serif" },
      height: 400,
      showlegend: true,
      legend: {
        font: { color: "#9ca3af", size: 10 },
        bgcolor: "transparent",
        orientation: "h" as const,
        y: 1.14,
        x: 0.5,
        xanchor: "center" as const,
      },
      hovermode: "x unified" as const,
      hoverlabel: {
        bgcolor: "#131836",
        bordercolor: "rgba(195,255,0,0.3)",
        font: { color: "#e5e7eb", size: 12 },
      },
      xaxis: {
        title: { text: "Game Time (minutes)", font: { size: 11 } },
        tickfont: { color: "#9ca3af", size: 10 },
        gridcolor: "rgba(30,37,80,0.3)",
        range: [0, 46],
        spikemode: "across" as const,
        spikesnap: "cursor" as const,
        spikecolor: "rgba(195,255,0,0.5)",
        spikethickness: 1,
        spikedash: "dot" as const,
        showspikes: true,
      },
      shapes: goldTimeline.gamePhases.map((phase) => ({
        type: "rect" as const,
        xref: "x" as const,
        yref: "paper" as const,
        x0: phase.start,
        x1: phase.end,
        y0: 0,
        y1: 1,
        fillcolor: phase.color,
        line: { width: 0 },
        layer: "below" as const,
      })),
    };

    switch (chartMode) {
      case "gold":
        return {
          ...base,
          yaxis: {
            title: { text: "Advantage (Liquid)", font: { size: 11 } },
            tickfont: { color: "#9ca3af", size: 10 },
            gridcolor: "rgba(30,37,80,0.3)",
            zeroline: true,
            zerolinecolor: "rgba(195,255,0,0.3)",
            zerolinewidth: 1.5,
          },
          annotations: goldTimeline.events.map((e) => ({
            x: e.minute,
            y: goldTimeline.goldDiff[goldTimeline.minutes.indexOf(e.minute)] || 0,
            text: e.text,
            showarrow: true,
            arrowhead: 2,
            arrowsize: 0.7,
            arrowcolor: e.type === "radiant" ? "#c3ff00" : "#ff1a6c",
            font: { color: e.type === "radiant" ? "#c3ff00" : "#ff1a6c", size: 8 },
            bgcolor: "rgba(6,9,26,0.92)",
            bordercolor: e.type === "radiant" ? "rgba(195,255,0,0.25)" : "rgba(255,26,108,0.25)",
            borderpad: 4,
            ax: 0,
            ay: e.type === "radiant" ? -35 : 30,
          })),
        };
      case "networth":
        return {
          ...base,
          yaxis: {
            title: { text: "Team Net Worth (gold)", font: { size: 11 } },
            tickfont: { color: "#9ca3af", size: 10 },
            gridcolor: "rgba(30,37,80,0.3)",
            tickformat: ",",
          },
        };
      case "kills":
        return {
          ...base,
          yaxis: {
            title: { text: "Kill Differential", font: { size: 11 } },
            tickfont: { color: "#9ca3af", size: 10 },
            gridcolor: "rgba(30,37,80,0.3)",
            zeroline: true,
            zerolinecolor: "rgba(195,255,0,0.2)",
          },
          yaxis2: {
            title: { text: "Tower Differential", font: { size: 11 } },
            tickfont: { color: "#a78bfa", size: 10 },
            overlaying: "y" as const,
            side: "right" as const,
            gridcolor: "transparent",
          },
          bargap: 0.35,
        };
    }
  };

  /* ── Bracket helpers ── */
  const qf = playoffBracket.filter((m) => m.round === "Quarterfinal");
  const sf = playoffBracket.filter((m) => m.round === "Semifinal");
  const gf = playoffBracket.filter((m) => m.round === "Grand Final");

  return (
    <section id="overview" className="relative py-20 sm:py-32 px-4 sm:px-6 minimap-grid">
      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
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
            Tournament Pulse
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Tournament Overview
          </h2>
          <p className="text-dota-text-dim max-w-xl mx-auto text-sm sm:text-base">
            100 games of elite Dota 2 across Groups, Play-Ins, Playoffs, &amp; a dominant Grand Final.
          </p>
        </motion.div>

        {/* ── Stats Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12 sm:mb-16"
        >
          {[
            { label: "Total Games", value: tournamentStats.totalGames },
            { label: "Avg Duration", value: `${tournamentStats.avgDuration}m` },
            { label: "Radiant Win Rate", value: `${(tournamentStats.radiantWinRate * 100).toFixed(1)}%` },
            { label: "Heroes Picked", value: tournamentStats.totalHeroesPicked },
            { label: "Comeback Rate", value: `${(tournamentStats.comebackRate * 100).toFixed(0)}%` },
            { label: "MVP", value: tournamentStats.mvp },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-3 sm:p-4 text-center"
            >
              <div className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-white">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-dota-text-dim uppercase tracking-wider mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════
            GOLD DIFFERENCE TIMELINE — Enhanced
           ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-4 sm:p-6 mb-12 sm:mb-16"
        >
          {/* Title row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold flex items-center gap-2">
                Gold Difference Timeline
              </h3>
              <p className="text-xs text-dota-text-dim">{goldTimeline.matchContext}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <TeamLogo name={goldTimeline.teamA} size={22} />
                <span className="text-xs font-medium text-cyan-400">Liquid</span>
              </div>
              <span className="text-dota-text-dim text-xs font-heading font-bold">3 — 1</span>
              <div className="flex items-center gap-1.5">
                <TeamLogo name={goldTimeline.teamB} size={22} />
                <span className="text-xs font-medium text-yellow-400">NaVi</span>
              </div>
            </div>
          </div>

          {/* Chart mode tabs */}
          <div className="flex items-center gap-1 mb-3 p-1 bg-dota-surface/60 rounded-xl w-fit">
            {([
              { key: "gold" as ChartMode, label: "Gold & XP" },
              { key: "networth" as ChartMode, label: "Net Worth" },
              { key: "kills" as ChartMode, label: "Kills & Towers" },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setChartMode(tab.key)}
                className={`px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold transition-all ${
                  chartMode === tab.key
                    ? "bg-dota-gold/20 text-dota-gold border border-dota-gold/30"
                    : "text-dota-text-dim hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Game phase legend */}
          <div className="flex items-center gap-4 mb-2">
            {goldTimeline.gamePhases.map((p) => (
              <div key={p.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: p.color.replace("0.06", "0.5") }} />
                <span className="text-[9px] sm:text-[10px] text-dota-text-dim">{p.label}</span>
              </div>
            ))}
          </div>

          {/* The chart */}
          <div className="chart-container">
            <Plot
              data={getPlotData() as Plotly.Data[]}
              layout={getLayout() as Partial<Plotly.Layout>}
              config={{ displayModeBar: false, responsive: true }}
              style={{ width: "100%", height: "400px" }}
            />
          </div>

          {/* Summary stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-4">
            {[
              { label: "Game Duration", value: goldTimeline.summary.duration },
              { label: "Peak Gold Lead", value: `+${goldTimeline.summary.peakGoldLead.toLocaleString()}`, sub: `at ${goldTimeline.summary.peakGoldLeadMin} min` },
              { label: "Kill Score", value: `${goldTimeline.summary.liquidKills} – ${goldTimeline.summary.naviKills}` },
              { label: "Roshan Control", value: `${goldTimeline.summary.roshanKills.liquid} – ${goldTimeline.summary.roshanKills.navi}`, sub: "Liquid dominated" },
            ].map((s) => (
              <div key={s.label} className="bg-dota-surface/50 rounded-xl p-3 border border-white/5">
                <span className="text-[9px] sm:text-[10px] text-dota-text-dim uppercase tracking-wider">{s.label}</span>
                <div className="font-heading font-bold text-white text-sm sm:text-base mt-0.5">{s.value}</div>
                {s.sub && <div className="text-[9px] text-dota-text-dim mt-0.5">{s.sub}</div>}
              </div>
            ))}
          </div>

          {/* Turning point callout */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-dota-gold/5 border border-dota-gold/15"
          >
            <TeamLogo name="Team Liquid" size={18} />
            <div>
              <div className="text-xs font-semibold text-dota-gold">Turning Point — Minute {goldTimeline.summary.turningPointMin}</div>
              <div className="text-[11px] text-dota-text-dim">{goldTimeline.summary.turningPointText}</div>
            </div>
          </motion.div>
        </motion.div>

        {/* ══════════════════════════════════════════
            PLAYOFF BRACKET — JS-calculated lines
           ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-center mb-2">
            Playoff Bracket
          </h3>
          <p className="text-xs text-dota-text-dim text-center mb-8">Complete elimination bracket results</p>

          {/* ─── Desktop bracket (md+) ─── */}
          <div className="hidden md:block" ref={bracketRef}>
            <div className="relative">
              {/* SVG connector lines calculated from actual card positions */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {lines.map((l, i) => (
                  <line
                    key={i}
                    x1={l.x1}
                    y1={l.y1}
                    x2={l.x2}
                    y2={l.y2}
                    stroke="rgba(195,255,0,0.3)"
                    strokeWidth="2"
                  />
                ))}
              </svg>

              {/* 3-column layout: QF | SF | GF */}
              <div className="relative z-10 grid grid-cols-[1fr_1fr_1fr] gap-x-16 lg:gap-x-24">
                {/* Quarterfinals */}
                <div className="flex flex-col">
                  <div className="text-[10px] text-dota-text-dim uppercase tracking-wider text-center mb-3 font-semibold">
                    Quarterfinals
                  </div>
                  <div className="flex flex-col justify-around flex-1 gap-6">
                    {qf.map((m, i) => (
                      <div key={`qf-${i}`} data-bracket={`qf-${i}`}>
                        <BracketMatch match={m} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Semifinals */}
                <div className="flex flex-col">
                  <div className="text-[10px] text-dota-text-dim uppercase tracking-wider text-center mb-3 font-semibold">
                    Semifinals
                  </div>
                  <div className="flex flex-col justify-around flex-1 gap-6">
                    {sf.map((m, i) => (
                      <div key={`sf-${i}`} data-bracket={`sf-${i}`}>
                        <BracketMatch match={m} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grand Final */}
                <div className="flex flex-col">
                  <div className="text-[10px] text-dota-gold uppercase tracking-wider text-center mb-3 font-bold">
                    Grand Final
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <div data-bracket="gf-0" className="border-gradient-animated rounded-lg">
                      <BracketMatch match={gf[0]} />
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mt-3">
                      <TeamLogo name="Team Liquid" size={18} />
                      <span className="text-[11px] font-heading font-bold text-dota-gold tracking-wide">CHAMPIONS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Mobile bracket (< md) — vertical flow ─── */}
          <div className="md:hidden space-y-5">
            {[
              { label: "Quarterfinals", items: qf, color: "text-dota-text-dim" },
              { label: "Semifinals", items: sf, color: "text-dota-text-dim" },
              { label: "Grand Final", items: gf, color: "text-dota-gold" },
            ].map((round, ri) => (
              <div key={round.label}>
                {ri > 0 && (
                  <div className="flex justify-center mb-4">
                    <div className="w-px h-6 bg-gradient-to-b from-dota-gold/30 to-transparent" />
                  </div>
                )}
                <div className={`text-[10px] ${round.color} uppercase tracking-wider text-center mb-3 font-semibold`}>
                  {round.label}
                </div>
                <div className={`grid ${round.items.length > 1 ? "grid-cols-2" : "max-w-xs mx-auto"} gap-3`}>
                  {round.items.map((m, i) => (
                    <div key={`mobile-${round.label}-${i}`} className={round.label === "Grand Final" ? "border-gradient-animated rounded-lg" : ""}>
                      <BracketMatch match={m} />
                    </div>
                  ))}
                </div>
                {round.label === "Grand Final" && (
                  <div className="flex items-center justify-center gap-1.5 mt-3">
                    <TeamLogo name="Team Liquid" size={18} />
                    <span className="text-[11px] font-heading font-bold text-dota-gold tracking-wide">CHAMPIONS</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Key Matches ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-center mb-2">Key Matches</h3>
          <p className="text-xs text-dota-text-dim text-center mb-6">Pivotal moments that defined the tournament</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {highlightMatches.map((match, i) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card p-4"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] text-dota-gold uppercase tracking-wider font-semibold">{match.round}</span>
                  {match.isUpset && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blast-pink/20 text-blast-pink font-semibold">UPSET</span>
                  )}
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TeamLogo name={match.teamA} size={20} />
                    <span className={`text-sm font-medium ${match.winner === match.teamA ? "text-white" : "text-dota-text-dim"}`}>
                      {match.teamA}
                    </span>
                  </div>
                  <div className="font-heading font-bold text-sm">
                    <span className={match.winner === match.teamA ? "text-dota-gold" : "text-dota-text-dim"}>{match.scoreA}</span>
                    <span className="text-dota-text-dim mx-1">–</span>
                    <span className={match.winner === match.teamB ? "text-dota-gold" : "text-dota-text-dim"}>{match.scoreB}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${match.winner === match.teamB ? "text-white" : "text-dota-text-dim"}`}>
                      {match.teamB}
                    </span>
                    <TeamLogo name={match.teamB} size={20} />
                  </div>
                </div>
                <p className="text-xs text-dota-text-dim leading-relaxed">{match.keyMoment}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-dota-text-dim">
                  <span>{match.duration.toFixed(1)} min</span>
                  <span>Gold Diff: {match.goldDiff > 0 ? "+" : ""}{match.goldDiff.toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="section-divider mt-20 sm:mt-32" />
    </section>
  );
}
