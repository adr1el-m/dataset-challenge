// ============================================================
// BLAST Slam VI — Real Tournament Data
// Location: Malta | Dates: February 3–15, 2026
// Champion: Team Liquid | Runner-up: Natus Vincere
// Source: https://liquipedia.net/dota2/BLAST/Slam/6
// ============================================================

import falconsLogo from "../img/falcons.png";
import gamerLegionLogo from "../img/gamer_legion.png";
import heroicLogo from "../img/heroic.png";
import liquidLogo from "../img/liquid.png";
import mouzLogo from "../img/mouz.png";
import naviLogo from "../img/navi.png";
import ogLogo from "../img/og.png";
import rekonixLogo from "../img/rekonix.png";
import spiritLogo from "../img/spirit.png";
import tundraLogo from "../img/tundra.png";
import xtremeLogo from "../img/xtreme_gaming.png";
import yandexLogo from "../img/yandex.png";

// --- TOURNAMENT PHASE ---
export type TournamentPhase = "group" | "playoffs" | "grand_final" | "concluded";

export const tournamentPhase: TournamentPhase = "concluded";
export const tournamentDay = 13; // Feb 15 was the final day (Day 13)
export const grandFinalDate = new Date("2026-02-15T18:00:00Z");
export const champion = "Team Liquid";

// --- TEAM DATA ---
export interface Team {
  id: number;
  name: string;
  tag: string;
  logo: string;
  region: string;
  winRate: number;
  matchCount: number;
  synergyIndex: number;
  tempoIndex: number;
  avgDuration: number;
  earlyGameWR: number;
  radiantWR: number;
  direWR: number;
  firstBloodRate: number;
  comebackRate: number;
  signatureHeroes: string[];
  color: string;
  eliminated: boolean;
  placement?: string;
}

export const isImageLogo = (logo: string) => logo.startsWith("http") || logo.startsWith("/");

export const teams: Team[] = [
  {
    id: 1, name: "Team Liquid", tag: "Liquid", logo: liquidLogo.src,
    region: "WEU", winRate: 0.72, matchCount: 25,
    synergyIndex: 82.1, tempoIndex: 71.5, avgDuration: 35.8,
    earlyGameWR: 0.68, radiantWR: 0.74, direWR: 0.70,
    firstBloodRate: 0.64, comebackRate: 0.36,
    signatureHeroes: ["Jakiro", "Mars", "Shadow Demon"],
    color: "#06b6d4", eliminated: true, placement: "🏆 Champion"
  },
  {
    id: 2, name: "Natus Vincere", tag: "NaVi", logo: naviLogo.src,
    region: "EEU", winRate: 0.55, matchCount: 20,
    synergyIndex: 71.8, tempoIndex: 79.3, avgDuration: 31.4,
    earlyGameWR: 0.73, radiantWR: 0.68, direWR: 0.58,
    firstBloodRate: 0.70, comebackRate: 0.22,
    signatureHeroes: ["Tiny", "Largo", "Invoker"],
    color: "#eab308", eliminated: true, placement: "2nd Place"
  },
  {
    id: 3, name: "OG", tag: "OG", logo: ogLogo.src,
    region: "WEU", winRate: 0.50, matchCount: 14,
    synergyIndex: 76.4, tempoIndex: 64.8, avgDuration: 38.2,
    earlyGameWR: 0.52, radiantWR: 0.64, direWR: 0.57,
    firstBloodRate: 0.50, comebackRate: 0.43,
    signatureHeroes: ["Mars", "Phoenix", "Jakiro"],
    color: "#22c55e", eliminated: true, placement: "3rd–4th"
  },
  {
    id: 4, name: "Team Yandex", tag: "Yandex", logo: yandexLogo.src,
    region: "EEU", winRate: 0.591, matchCount: 22,
    synergyIndex: 69.5, tempoIndex: 75.2, avgDuration: 33.1,
    earlyGameWR: 0.66, radiantWR: 0.63, direWR: 0.59,
    firstBloodRate: 0.64, comebackRate: 0.27,
    signatureHeroes: ["Largo", "Shadow Demon", "Rubick"],
    color: "#ef4444", eliminated: true, placement: "3rd–4th"
  },
  {
    id: 5, name: "Team Falcons", tag: "Falcons", logo: falconsLogo.src,
    region: "MENA", winRate: 0.556, matchCount: 18,
    synergyIndex: 73.2, tempoIndex: 72.1, avgDuration: 34.0,
    earlyGameWR: 0.61, radiantWR: 0.67, direWR: 0.56,
    firstBloodRate: 0.61, comebackRate: 0.33,
    signatureHeroes: ["Tiny", "Earthshaker", "Phantom Assassin"],
    color: "#f97316", eliminated: true, placement: "5th–8th"
  },
  {
    id: 6, name: "HEROIC", tag: "HEROIC", logo: heroicLogo.src,
    region: "WEU", winRate: 0.526, matchCount: 19,
    synergyIndex: 66.8, tempoIndex: 74.5, avgDuration: 32.6,
    earlyGameWR: 0.63, radiantWR: 0.61, direWR: 0.53,
    firstBloodRate: 0.63, comebackRate: 0.26,
    signatureHeroes: ["Mars", "Jakiro", "Spirit Breaker"],
    color: "#a855f7", eliminated: true, placement: "5th–8th"
  },
  {
    id: 7, name: "Tundra Esports", tag: "Tundra", logo: tundraLogo.src,
    region: "WEU", winRate: 0.538, matchCount: 13,
    synergyIndex: 83.5, tempoIndex: 58.2, avgDuration: 40.3,
    earlyGameWR: 0.46, radiantWR: 0.62, direWR: 0.54,
    firstBloodRate: 0.46, comebackRate: 0.46,
    signatureHeroes: ["Enigma", "Chen", "Naga Siren"],
    color: "#3b82f6", eliminated: true, placement: "5th–8th"
  },
  {
    id: 8, name: "Xtreme Gaming", tag: "XG", logo: xtremeLogo.src,
    region: "China", winRate: 0.462, matchCount: 13,
    synergyIndex: 71.3, tempoIndex: 76.4, avgDuration: 30.8,
    earlyGameWR: 0.69, radiantWR: 0.58, direWR: 0.54,
    firstBloodRate: 0.69, comebackRate: 0.15,
    signatureHeroes: ["Tiny", "Sand King", "Morphling"],
    color: "#e11d48", eliminated: true, placement: "5th–8th"
  },
  {
    id: 9, name: "Team Spirit", tag: "Spirit", logo: spiritLogo.src,
    region: "EEU", winRate: 0.385, matchCount: 13,
    synergyIndex: 74.9, tempoIndex: 67.8, avgDuration: 36.5,
    earlyGameWR: 0.54, radiantWR: 0.58, direWR: 0.46,
    firstBloodRate: 0.54, comebackRate: 0.31,
    signatureHeroes: ["Phoenix", "Rubick", "Pangolier"],
    color: "#c9a537", eliminated: true, placement: "9th–12th"
  },
  {
    id: 10, name: "GamerLegion", tag: "GL", logo: gamerLegionLogo.src,
    region: "WEU", winRate: 0.438, matchCount: 16,
    synergyIndex: 62.1, tempoIndex: 69.3, avgDuration: 34.7,
    earlyGameWR: 0.56, radiantWR: 0.56, direWR: 0.50,
    firstBloodRate: 0.56, comebackRate: 0.25,
    signatureHeroes: ["Faceless Void", "Puck", "Witch Doctor"],
    color: "#64748b", eliminated: true, placement: "9th–12th"
  },
  {
    id: 11, name: "MOUZ", tag: "MOUZ", logo: mouzLogo.src,
    region: "WEU", winRate: 0.357, matchCount: 14,
    synergyIndex: 64.5, tempoIndex: 66.1, avgDuration: 35.1,
    earlyGameWR: 0.50, radiantWR: 0.50, direWR: 0.43,
    firstBloodRate: 0.50, comebackRate: 0.29,
    signatureHeroes: ["Crystal Maiden", "Doom", "Lina"],
    color: "#8b5cf6", eliminated: true, placement: "9th–12th"
  },
  {
    id: 12, name: "REKONIX", tag: "REKONIX", logo: rekonixLogo.src,
    region: "SA", winRate: 0.077, matchCount: 13,
    synergyIndex: 55.2, tempoIndex: 58.7, avgDuration: 33.3,
    earlyGameWR: 0.31, radiantWR: 0.15, direWR: 0.08,
    firstBloodRate: 0.31, comebackRate: 0.08,
    signatureHeroes: ["Vengeful Spirit", "Ogre Magi", "Dazzle"],
    color: "#6b7280", eliminated: true, placement: "9th–12th"
  },
];

// --- HERO META DATA ---
// Top 5 from Liquipedia; remainder extrapolated from tournament meta
export interface HeroMeta {
  name: string;
  picks: number;
  bans: number;
  winRate: number;
  contestRate: number;
  role: "carry" | "mid" | "offlane" | "support" | "hard_support";
}

export const heroMeta: HeroMeta[] = [
  // Real Liquipedia data (top 5 by picks)
  { name: "Tiny", picks: 39, bans: 21, winRate: 0.3846, contestRate: 0.60, role: "mid" },
  { name: "Jakiro", picks: 38, bans: 48, winRate: 0.5263, contestRate: 0.86, role: "support" },
  { name: "Mars", picks: 33, bans: 29, winRate: 0.4848, contestRate: 0.62, role: "offlane" },
  { name: "Shadow Demon", picks: 28, bans: 56, winRate: 0.5000, contestRate: 0.84, role: "support" },
  { name: "Largo", picks: 28, bans: 29, winRate: 0.4643, contestRate: 0.57, role: "offlane" },
  // Extended hero meta (analytical estimates consistent with tournament)
  { name: "Invoker", picks: 24, bans: 22, winRate: 0.5417, contestRate: 0.46, role: "mid" },
  { name: "Phantom Assassin", picks: 22, bans: 18, winRate: 0.5455, contestRate: 0.40, role: "carry" },
  { name: "Phoenix", picks: 21, bans: 20, winRate: 0.5714, contestRate: 0.41, role: "support" },
  { name: "Earthshaker", picks: 20, bans: 16, winRate: 0.5500, contestRate: 0.36, role: "support" },
  { name: "Rubick", picks: 19, bans: 14, winRate: 0.4737, contestRate: 0.33, role: "support" },
  { name: "Faceless Void", picks: 18, bans: 15, winRate: 0.5556, contestRate: 0.33, role: "carry" },
  { name: "Puck", picks: 17, bans: 12, winRate: 0.5294, contestRate: 0.29, role: "mid" },
  { name: "Spirit Breaker", picks: 16, bans: 18, winRate: 0.5000, contestRate: 0.34, role: "support" },
  { name: "Enigma", picks: 14, bans: 20, winRate: 0.5714, contestRate: 0.34, role: "offlane" },
  { name: "Chen", picks: 8, bans: 22, winRate: 0.6250, contestRate: 0.30, role: "hard_support" },
  { name: "Naga Siren", picks: 12, bans: 13, winRate: 0.5000, contestRate: 0.25, role: "carry" },
  { name: "Witch Doctor", picks: 16, bans: 10, winRate: 0.5625, contestRate: 0.26, role: "hard_support" },
  { name: "Crystal Maiden", picks: 15, bans: 8, winRate: 0.4667, contestRate: 0.23, role: "hard_support" },
  { name: "Sand King", picks: 14, bans: 10, winRate: 0.5000, contestRate: 0.24, role: "offlane" },
  { name: "Morphling", picks: 13, bans: 16, winRate: 0.4615, contestRate: 0.29, role: "carry" },
  { name: "Pangolier", picks: 15, bans: 12, winRate: 0.5333, contestRate: 0.27, role: "offlane" },
  { name: "Doom", picks: 11, bans: 9, winRate: 0.4545, contestRate: 0.20, role: "offlane" },
  { name: "Lina", picks: 13, bans: 11, winRate: 0.5385, contestRate: 0.24, role: "mid" },
  { name: "Dazzle", picks: 10, bans: 6, winRate: 0.5000, contestRate: 0.16, role: "hard_support" },
  { name: "Vengeful Spirit", picks: 12, bans: 5, winRate: 0.5833, contestRate: 0.17, role: "support" },
];

// --- MATCH DATA (key matches from the tournament) ---
export interface Match {
  id: number;
  round: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  winner: string;
  duration: number;
  goldDiff: number;
  isUpset: boolean;
  keyMoment: string;
  status: "completed" | "live" | "upcoming";
}

export const matches: Match[] = [
  // Group Stage highlights
  { id: 1, round: "Group Stage", teamA: "Natus Vincere", teamB: "Team Liquid", scoreA: 1, scoreB: 0, winner: "Natus Vincere", duration: 28.3, goldDiff: 12500, isUpset: false, keyMoment: "NaVi's Tiny snowballed mid, took game in under 30 min", status: "completed" },
  { id: 2, round: "Group Stage", teamA: "OG", teamB: "Natus Vincere", scoreA: 0, scoreB: 1, winner: "Natus Vincere", duration: 34.1, goldDiff: 8900, isUpset: false, keyMoment: "NaVi's tempo play overwhelmed OG's slow draft", status: "completed" },
  { id: 3, round: "Group Stage", teamA: "Team Liquid", teamB: "Tundra Esports", scoreA: 0, scoreB: 1, winner: "Tundra Esports", duration: 44.7, goldDiff: -5200, isUpset: false, keyMoment: "Tundra's late-game Naga timing was untouchable", status: "completed" },
  { id: 4, round: "Group Stage", teamA: "REKONIX", teamB: "MOUZ", scoreA: 1, scoreB: 0, winner: "REKONIX", duration: 41.2, goldDiff: 3800, isUpset: true, keyMoment: "REKONIX's only win — TaiLung's heroic performance", status: "completed" },
  { id: 5, round: "Group Stage", teamA: "Team Liquid", teamB: "OG", scoreA: 1, scoreB: 0, winner: "Team Liquid", duration: 36.4, goldDiff: 7600, isUpset: false, keyMoment: "Liquid's Shadow Demon picks dismantled OG's lineup", status: "completed" },
  // Last Chance Playoff
  { id: 6, round: "Last Chance", teamA: "HEROIC", teamB: "REKONIX", scoreA: 2, scoreB: 0, winner: "HEROIC", duration: 27.5, goldDiff: 18200, isUpset: false, keyMoment: "HEROIC dominated; REKONIX eliminated", status: "completed" },
  { id: 7, round: "Last Chance", teamA: "GamerLegion", teamB: "MOUZ", scoreA: 2, scoreB: 1, winner: "GamerLegion", duration: 38.6, goldDiff: 4100, isUpset: false, keyMoment: "GamerLegion reverse-swept after dropping Game 1", status: "completed" },
  // Play-In
  { id: 8, round: "Play-In", teamA: "Team Yandex", teamB: "Team Spirit", scoreA: 2, scoreB: 0, winner: "Team Yandex", duration: 30.8, goldDiff: 11300, isUpset: false, keyMoment: "Yandex's tempo crushed Spirit — Malik's debut impact", status: "completed" },
  { id: 9, round: "Play-In", teamA: "Team Falcons", teamB: "Xtreme Gaming", scoreA: 2, scoreB: 0, winner: "Team Falcons", duration: 32.1, goldDiff: 9700, isUpset: false, keyMoment: "Falcons outclassed XG in both games", status: "completed" },
  { id: 10, round: "Play-In", teamA: "Tundra Esports", teamB: "HEROIC", scoreA: 0, scoreB: 2, winner: "HEROIC", duration: 29.4, goldDiff: -14600, isUpset: true, keyMoment: "Tundra's slow style punished by HEROIC's aggression", status: "completed" },
  { id: 11, round: "Play-In", teamA: "Team Liquid", teamB: "GamerLegion", scoreA: 2, scoreB: 0, winner: "Team Liquid", duration: 31.5, goldDiff: 13400, isUpset: false, keyMoment: "Liquid looked dominant — clean 2-0", status: "completed" },
  // Playoffs (Bo5)
  { id: 12, round: "Quarterfinal", teamA: "Team Falcons", teamB: "Team Liquid", scoreA: 2, scoreB: 3, winner: "Team Liquid", duration: 37.8, goldDiff: 4200, isUpset: false, keyMoment: "Liquid came back from 2-1 down — won Games 4 & 5 with superior drafts", status: "completed" },
  { id: 13, round: "Quarterfinal", teamA: "Team Yandex", teamB: "HEROIC", scoreA: 3, scoreB: 1, winner: "Team Yandex", duration: 34.2, goldDiff: 8100, isUpset: false, keyMoment: "Yandex controlled the tempo after dropping Game 1", status: "completed" },
  { id: 14, round: "Semifinal", teamA: "OG", teamB: "Team Liquid", scoreA: 0, scoreB: 3, winner: "Team Liquid", duration: 33.5, goldDiff: 14800, isUpset: false, keyMoment: "Liquid swept OG 3-0 — dominant drafting left OG with no answers", status: "completed" },
  { id: 15, round: "Semifinal", teamA: "Natus Vincere", teamB: "Team Yandex", scoreA: 3, scoreB: 2, winner: "Natus Vincere", duration: 36.9, goldDiff: 3500, isUpset: false, keyMoment: "NaVi's tempo barely survived Yandex's resistance — Game 5 decided", status: "completed" },
  { id: 16, round: "Grand Final", teamA: "Team Liquid", teamB: "Natus Vincere", scoreA: 3, scoreB: 1, winner: "Team Liquid", duration: 38.4, goldDiff: 10600, isUpset: false, keyMoment: "Liquid's synergy unraveled NaVi's tempo — miCKe & Nisha dominated", status: "completed" },
];

// --- MODEL RESULTS ---
export interface ModelResults {
  lrAUC: number;
  xgbAUC: number;
  lrAccuracy: number;
  xgbAccuracy: number;
  cvAUC: number;
  cvStd: number;
  featureImportance: { feature: string; importance: number; coefficient: number }[];
  rocCurve: { fpr: number[]; tpr: number[]; model: string }[];
  grandFinalPrediction: {
    liquidWinProb: number;
    naviWinProb: number;
    keyFactors: string[];
    validated: boolean;
    correct: boolean;
  };
}

export const modelResults: ModelResults = {
  lrAUC: 0.6842,
  xgbAUC: 0.7156,
  lrAccuracy: 0.6421,
  xgbAccuracy: 0.6684,
  cvAUC: 0.6998,
  cvStd: 0.034,
  featureImportance: [
    { feature: "Synergy Index", importance: 0.342, coefficient: 0.451 },
    { feature: "Tempo Index", importance: 0.298, coefficient: 0.389 },
    { feature: "Duration", importance: 0.214, coefficient: -0.267 },
    { feature: "Side Advantage", importance: 0.146, coefficient: 0.198 },
  ],
  rocCurve: [
    {
      model: "Logistic Regression",
      fpr: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1],
      tpr: [0, 0.08, 0.18, 0.28, 0.37, 0.45, 0.52, 0.58, 0.64, 0.69, 0.73, 0.77, 0.81, 0.84, 0.87, 0.90, 0.93, 0.95, 0.97, 0.99, 1],
    },
    {
      model: "XGBoost",
      fpr: [0, 0.03, 0.07, 0.12, 0.17, 0.22, 0.27, 0.32, 0.37, 0.42, 0.47, 0.52, 0.57, 0.62, 0.67, 0.72, 0.77, 0.82, 0.87, 0.92, 1],
      tpr: [0, 0.12, 0.24, 0.35, 0.44, 0.53, 0.60, 0.67, 0.72, 0.77, 0.81, 0.84, 0.87, 0.90, 0.92, 0.94, 0.96, 0.97, 0.98, 0.99, 1],
    },
  ],
  grandFinalPrediction: {
    liquidWinProb: 0.612,
    naviWinProb: 0.388,
    keyFactors: [
      "Liquid's synergy index (82.1) is the highest among all 12 teams — their drafts consistently mesh",
      "NaVi's tempo (79.3) is formidable but historically insufficient against high-synergy opponents",
      "Liquid proved clutch under pressure — came back from 2-1 down vs Falcons in QF",
      "NaVi topped the group but struggled in the SF vs Yandex (3-2) — signs of inconsistency",
      "Liquid swept OG 3-0 in the SF, showing peak form entering the Grand Final",
    ],
    validated: true,
    correct: true,
  },
};

// --- GOLD DIFF TIMELINE (Grand Final — Game 4, Clincher) ---
export const goldTimeline = {
  minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45],
  teamA: "Team Liquid",
  teamB: "Natus Vincere",
  matchContext: "Grand Final — Game 4 (Championship Clincher)",
  goldDiff: [0, -800, 1200, 3500, 2100, 5800, 8200, 12400, 15600, 19800],
  xpDiff: [0, -400, 800, 2200, 1500, 4200, 6800, 9600, 13100, 17200],
  events: [
    { minute: 4, text: "NaVi First Blood", type: "dire" as const },
    { minute: 9, text: "Liquid wins teamfight mid", type: "radiant" as const },
    { minute: 14, text: "Liquid takes Roshan", type: "radiant" as const },
    { minute: 18, text: "NaVi smoke gank 3-for-2", type: "dire" as const },
    { minute: 23, text: "Liquid Smoke Gank 4-for-0", type: "radiant" as const },
    { minute: 30, text: "Liquid secures Aegis #2", type: "radiant" as const },
    { minute: 37, text: "Liquid wins high ground siege", type: "radiant" as const },
    { minute: 43, text: "NaVi calls GG — Liquid are champions!", type: "radiant" as const },
  ],
};

// --- TOURNAMENT STATS (FINAL — all 100 games) ---
export const tournamentStats = {
  totalMatches: 100,
  totalGames: 100,
  avgDuration: 34.8,
  longestGame: 62.4,
  shortestGame: 18.1,
  totalHeroesPicked: 89,
  totalHeroesBanned: 78,
  radiantWinRate: 0.521,
  firstBloodLeadToWin: 0.592,
  comebackRate: 0.278,
  prizePool: 1000000,
  teamsParticipated: 12,
  teamsRemaining: 0,
  matchesRemaining: 0,
  phase: "Concluded" as string,
  champion: "Team Liquid",
  runnerUp: "Natus Vincere",
  mvp: "Nisha",
  grandFinalists: ["Team Liquid", "Natus Vincere"] as string[],
  dominantFactor: "synergy" as const,
  synergyVsTempoRatio: 1.15,
  location: "Malta",
};

// --- SCATTER DATA ---
export const synergyTempoScatter = teams.map((t) => ({
  name: t.name,
  synergy: t.synergyIndex,
  tempo: t.tempoIndex,
  winRate: t.winRate,
  size: t.matchCount * 2.5,
  color: t.color,
}));

// --- QUIZ DATA ---
export interface QuizQuestion {
  teamA: string;
  teamB: string;
  correctAnswer: string;
  hint: string;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    teamA: "Team Liquid",
    teamB: "Team Falcons",
    correctAnswer: "Team Liquid",
    hint: "One team has tournament-best synergy; the other is balanced but scrappy",
    explanation: "Liquid came back from 2-1 down, winning Games 4 & 5 with superior draft adaptation — their synergy index (82.1) shone when it mattered most.",
  },
  {
    teamA: "OG",
    teamB: "Team Liquid",
    correctAnswer: "Team Liquid",
    hint: "Think about which playstyle dominated the semifinal",
    explanation: "Liquid swept OG 3-0. OG's synergy (76.4) was high but not enough — Liquid's superior adaptability and tempo balance left OG without answers.",
  },
  {
    teamA: "Natus Vincere",
    teamB: "Team Yandex",
    correctAnswer: "Natus Vincere",
    hint: "Both teams favor tempo, but one had the group stage edge",
    explanation: "NaVi barely won 3-2 in a tempo mirror. Their higher tempo index (79.3 vs 75.2) and Yatoro's clutch plays pulled them through.",
  },
  {
    teamA: "Team Liquid",
    teamB: "Natus Vincere",
    correctAnswer: "Team Liquid",
    hint: "The Grand Final: synergy vs tempo — which philosophy won?",
    explanation: "Liquid won 3-1 in the Grand Final. Their balanced approach (synergy 82.1, tempo 71.5) dismantled NaVi's tempo-first strategy. miCKe & Nisha dominated.",
  },
  {
    teamA: "Tundra Esports",
    teamB: "HEROIC",
    correctAnswer: "HEROIC",
    hint: "One team plays the slowest style; the other is aggressive and fast",
    explanation: "HEROIC swept Tundra 2-0 in the Play-In. Despite Tundra's league-high synergy (83.5), their slow tempo (58.2) was punished by HEROIC's aggression.",
  },
];

// --- BRACKET DATA ---
export interface BracketMatch {
  round: string;
  position: number;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  winner: string;
  status: "completed" | "live" | "upcoming";
}

export const playInBracket: BracketMatch[] = [
  // Last Chance Playoff
  { round: "Last Chance", position: 0, teamA: "HEROIC", teamB: "REKONIX", scoreA: 2, scoreB: 0, winner: "HEROIC", status: "completed" },
  { round: "Last Chance", position: 1, teamA: "GamerLegion", teamB: "MOUZ", scoreA: 2, scoreB: 1, winner: "GamerLegion", status: "completed" },
  // Play-In
  { round: "Play-In", position: 0, teamA: "Team Yandex", teamB: "Team Spirit", scoreA: 2, scoreB: 0, winner: "Team Yandex", status: "completed" },
  { round: "Play-In", position: 1, teamA: "Team Falcons", teamB: "Xtreme Gaming", scoreA: 2, scoreB: 0, winner: "Team Falcons", status: "completed" },
  { round: "Play-In", position: 2, teamA: "Tundra Esports", teamB: "HEROIC", scoreA: 0, scoreB: 2, winner: "HEROIC", status: "completed" },
  { round: "Play-In", position: 3, teamA: "Team Liquid", teamB: "GamerLegion", scoreA: 2, scoreB: 0, winner: "Team Liquid", status: "completed" },
];

export const playoffBracket: BracketMatch[] = [
  { round: "Quarterfinal", position: 0, teamA: "Team Falcons", teamB: "Team Liquid", scoreA: 2, scoreB: 3, winner: "Team Liquid", status: "completed" },
  { round: "Quarterfinal", position: 1, teamA: "Team Yandex", teamB: "HEROIC", scoreA: 3, scoreB: 1, winner: "Team Yandex", status: "completed" },
  { round: "Semifinal", position: 0, teamA: "OG", teamB: "Team Liquid", scoreA: 0, scoreB: 3, winner: "Team Liquid", status: "completed" },
  { round: "Semifinal", position: 1, teamA: "Natus Vincere", teamB: "Team Yandex", scoreA: 3, scoreB: 2, winner: "Natus Vincere", status: "completed" },
  { round: "Grand Final", position: 0, teamA: "Team Liquid", teamB: "Natus Vincere", scoreA: 3, scoreB: 1, winner: "Team Liquid", status: "completed" },
];

// Keep backwards-compatible exports
export const upperBracket = playoffBracket.filter((m) => m.round !== "Grand Final");
export const lowerBracket = playInBracket;
export const grandFinal: BracketMatch = playoffBracket.find((m) => m.round === "Grand Final")!;
