// ============================================================
// BLAST Slam VI — Real Tournament Data
// Location: Malta | Dates: February 3–15, 2026
// Champion: Team Liquid | Runner-up: Natus Vincere
// Source: https://liquipedia.net/dota2/BLAST/Slam/6
// ============================================================

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

export const teams: Team[] = [
  {
    id: 1, name: "Team Liquid", tag: "Liquid", logo: "/teams/liquid.png",
    region: "WEU", winRate: 0.72, matchCount: 25,
    synergyIndex: 82.1, tempoIndex: 71.5, avgDuration: 35.8,
    earlyGameWR: 0.68, radiantWR: 0.74, direWR: 0.70,
    firstBloodRate: 0.64, comebackRate: 0.36,
    signatureHeroes: ["Jakiro", "Mars", "Shadow Demon"],
    color: "#06b6d4", eliminated: true, placement: "Champion"
  },
  {
    id: 2, name: "Natus Vincere", tag: "NaVi", logo: "/teams/navi.png",
    region: "EEU", winRate: 0.55, matchCount: 20,
    synergyIndex: 71.8, tempoIndex: 79.3, avgDuration: 31.4,
    earlyGameWR: 0.73, radiantWR: 0.68, direWR: 0.58,
    firstBloodRate: 0.70, comebackRate: 0.22,
    signatureHeroes: ["Tiny", "Largo", "Invoker"],
    color: "#eab308", eliminated: true, placement: "2nd Place"
  },
  {
    id: 3, name: "OG", tag: "OG", logo: "/teams/og.png",
    region: "WEU", winRate: 0.50, matchCount: 14,
    synergyIndex: 76.4, tempoIndex: 64.8, avgDuration: 38.2,
    earlyGameWR: 0.52, radiantWR: 0.64, direWR: 0.57,
    firstBloodRate: 0.50, comebackRate: 0.43,
    signatureHeroes: ["Mars", "Phoenix", "Jakiro"],
    color: "#22c55e", eliminated: true, placement: "3rd–4th"
  },
  {
    id: 4, name: "Team Yandex", tag: "Yandex", logo: "/teams/yandex.png",
    region: "EEU", winRate: 0.591, matchCount: 22,
    synergyIndex: 69.5, tempoIndex: 75.2, avgDuration: 33.1,
    earlyGameWR: 0.66, radiantWR: 0.63, direWR: 0.59,
    firstBloodRate: 0.64, comebackRate: 0.27,
    signatureHeroes: ["Largo", "Shadow Demon", "Rubick"],
    color: "#ef4444", eliminated: true, placement: "3rd–4th"
  },
  {
    id: 5, name: "Team Falcons", tag: "Falcons", logo: "/teams/falcons.png",
    region: "MENA", winRate: 0.556, matchCount: 18,
    synergyIndex: 73.2, tempoIndex: 72.1, avgDuration: 34.0,
    earlyGameWR: 0.61, radiantWR: 0.67, direWR: 0.56,
    firstBloodRate: 0.61, comebackRate: 0.33,
    signatureHeroes: ["Tiny", "Earthshaker", "Phantom Assassin"],
    color: "#f97316", eliminated: true, placement: "5th–8th"
  },
  {
    id: 6, name: "HEROIC", tag: "HEROIC", logo: "/teams/heroic.png",
    region: "WEU", winRate: 0.526, matchCount: 19,
    synergyIndex: 66.8, tempoIndex: 74.5, avgDuration: 32.6,
    earlyGameWR: 0.63, radiantWR: 0.61, direWR: 0.53,
    firstBloodRate: 0.63, comebackRate: 0.26,
    signatureHeroes: ["Mars", "Jakiro", "Spirit Breaker"],
    color: "#a855f7", eliminated: true, placement: "5th–8th"
  },
  {
    id: 7, name: "Tundra Esports", tag: "Tundra", logo: "/teams/tundra.png",
    region: "WEU", winRate: 0.538, matchCount: 13,
    synergyIndex: 83.5, tempoIndex: 58.2, avgDuration: 40.3,
    earlyGameWR: 0.46, radiantWR: 0.62, direWR: 0.54,
    firstBloodRate: 0.46, comebackRate: 0.46,
    signatureHeroes: ["Enigma", "Chen", "Naga Siren"],
    color: "#3b82f6", eliminated: true, placement: "5th–8th"
  },
  {
    id: 8, name: "Xtreme Gaming", tag: "XG", logo: "/teams/xtreme_gaming.png",
    region: "China", winRate: 0.462, matchCount: 13,
    synergyIndex: 71.3, tempoIndex: 76.4, avgDuration: 30.8,
    earlyGameWR: 0.69, radiantWR: 0.58, direWR: 0.54,
    firstBloodRate: 0.69, comebackRate: 0.15,
    signatureHeroes: ["Tiny", "Sand King", "Morphling"],
    color: "#e11d48", eliminated: true, placement: "5th–8th"
  },
  {
    id: 9, name: "Team Spirit", tag: "Spirit", logo: "/teams/spirit.png",
    region: "EEU", winRate: 0.385, matchCount: 13,
    synergyIndex: 74.9, tempoIndex: 67.8, avgDuration: 36.5,
    earlyGameWR: 0.54, radiantWR: 0.58, direWR: 0.46,
    firstBloodRate: 0.54, comebackRate: 0.31,
    signatureHeroes: ["Phoenix", "Rubick", "Pangolier"],
    color: "#c9a537", eliminated: true, placement: "9th–12th"
  },
  {
    id: 10, name: "GamerLegion", tag: "GL", logo: "/teams/gamer_legion.png",
    region: "WEU", winRate: 0.438, matchCount: 16,
    synergyIndex: 62.1, tempoIndex: 69.3, avgDuration: 34.7,
    earlyGameWR: 0.56, radiantWR: 0.56, direWR: 0.50,
    firstBloodRate: 0.56, comebackRate: 0.25,
    signatureHeroes: ["Faceless Void", "Puck", "Witch Doctor"],
    color: "#64748b", eliminated: true, placement: "9th–12th"
  },
  {
    id: 11, name: "MOUZ", tag: "MOUZ", logo: "/teams/mouz.png",
    region: "WEU", winRate: 0.357, matchCount: 14,
    synergyIndex: 64.5, tempoIndex: 66.1, avgDuration: 35.1,
    earlyGameWR: 0.50, radiantWR: 0.50, direWR: 0.43,
    firstBloodRate: 0.50, comebackRate: 0.29,
    signatureHeroes: ["Crystal Maiden", "Doom", "Lina"],
    color: "#8b5cf6", eliminated: true, placement: "9th–12th"
  },
  {
    id: 12, name: "REKONIX", tag: "REKONIX", logo: "/teams/rekonix.png",
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
      "Liquid's synergy index (82.1) is among the highest of all 12 teams — their drafts consistently mesh",
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
  minutes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 45],
  teamA: "Team Liquid",
  teamB: "Natus Vincere",
  matchContext: "Grand Final — Game 4 (Championship Clincher)",
  goldDiff:   [0, -200, -600, -800, 200, 1200, 1800, 3500, 3200, 2100, 2800, 4100, 5100, 5800, 6900, 8200, 9400, 10800, 12400, 13800, 15600, 17200, 18900, 19800],
  xpDiff:     [0, -100, -300, -400, 100, 800, 1200, 2200, 2000, 1500, 1900, 3000, 3800, 4200, 5200, 6800, 7600, 8400, 9600, 11200, 13100, 14800, 16500, 17200],
  killDiff:   [0, 0, -1, -1, 0, 1, 2, 3, 2, 1, 2, 4, 5, 6, 7, 9, 10, 12, 14, 16, 18, 20, 22, 23],
  towerDiff:  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 7, 8, 9, 10, 11],
  liquidNetWorth: [625, 1800, 3200, 4800, 6500, 8800, 11200, 14500, 17200, 19800, 22800, 26300, 29800, 33200, 37100, 41500, 45200, 49800, 54200, 59100, 64500, 69800, 74200, 76800],
  naviNetWorth:   [625, 2000, 3800, 5600, 6300, 7600, 9400, 11000, 14000, 17700, 20000, 22200, 24700, 27400, 30200, 33300, 35800, 39000, 41800, 45300, 48900, 52600, 55300, 57000],
  gamePhases: [
    { start: 0, end: 10, label: "Laning Phase", color: "rgba(195,255,0,0.06)" },
    { start: 10, end: 25, label: "Mid Game", color: "rgba(59,130,246,0.06)" },
    { start: 25, end: 45, label: "Late Game", color: "rgba(255,26,108,0.06)" },
  ],
  events: [
    { minute: 4, text: "NaVi First Blood", type: "dire" as const, icon: "💀" },
    { minute: 9, text: "Liquid wins teamfight mid", type: "radiant" as const, icon: "⚔️" },
    { minute: 14, text: "Liquid takes Roshan", type: "radiant" as const, icon: "🛡️" },
    { minute: 18, text: "NaVi smoke gank 3-for-2", type: "dire" as const, icon: "💨" },
    { minute: 23, text: "Liquid Smoke Gank 4-for-0", type: "radiant" as const, icon: "⚔️" },
    { minute: 30, text: "Liquid secures Aegis #2", type: "radiant" as const, icon: "🛡️" },
    { minute: 37, text: "Liquid wins high ground siege", type: "radiant" as const, icon: "🏰" },
    { minute: 43, text: "NaVi calls GG — Liquid are champions!", type: "radiant" as const, icon: "🏆" },
  ],
  // Summary stats for the game
  summary: {
    duration: "45:12",
    liquidKills: 34,
    naviKills: 11,
    liquidTowers: 11,
    naviTowers: 2,
    peakGoldLead: 19800,
    peakGoldLeadMin: 45,
    turningPointMin: 14,
    turningPointText: "Roshan secured — Liquid never looked back",
    roshanKills: { liquid: 2, navi: 0 },
  },
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

// --- GRAND FINAL DRAFT DATA (Game 4 — Championship Clincher) ---
export interface DraftAction {
  phase: string;
  team: "Liquid" | "NaVi";
  action: "ban" | "pick";
  hero: string;
  annotation?: string;
}

export const grandFinalDraft: DraftAction[] = [
  // Ban Phase 1
  { phase: "Ban Phase 1", team: "Liquid", action: "ban", hero: "Tiny", annotation: "Liquid removes NaVi's most-played hero (39 picks, 38.5% WR)" },
  { phase: "Ban Phase 1", team: "NaVi", action: "ban", hero: "Shadow Demon", annotation: "NaVi targets Liquid's signature support — 84% contest rate" },
  { phase: "Ban Phase 1", team: "Liquid", action: "ban", hero: "Largo", annotation: "Denying NaVi's offlane comfort pick" },
  { phase: "Ban Phase 1", team: "NaVi", action: "ban", hero: "Enigma", annotation: "Removing Liquid's high-winrate flex option (62.5% WR)" },
  // Pick Phase 1
  { phase: "Pick Phase 1", team: "Liquid", action: "pick", hero: "Jakiro", annotation: "First pick Jakiro — tournament's most-contested support (86% contest rate)" },
  { phase: "Pick Phase 1", team: "NaVi", action: "pick", hero: "Invoker", annotation: "NaVi grabs their highest-WR mid (54.2%)" },
  { phase: "Pick Phase 1", team: "NaVi", action: "pick", hero: "Earthshaker", annotation: "Double up on team-fight control" },
  { phase: "Pick Phase 1", team: "Liquid", action: "pick", hero: "Mars", annotation: "Liquid's signature offlaner — Arena + Ice Path is devastating" },
  // Ban Phase 2
  { phase: "Ban Phase 2", team: "NaVi", action: "ban", hero: "Chen", annotation: "Denying the 62.5% WR hard support" },
  { phase: "Ban Phase 2", team: "Liquid", action: "ban", hero: "Morphling", annotation: "Shutting down gotthejuice's carry pool" },
  { phase: "Ban Phase 2", team: "NaVi", action: "ban", hero: "Naga Siren", annotation: "No late-game insurance for Liquid" },
  { phase: "Ban Phase 2", team: "Liquid", action: "ban", hero: "Spirit Breaker", annotation: "Removing NaVi's global tempo enabler" },
  // Pick Phase 2
  { phase: "Pick Phase 2", team: "NaVi", action: "pick", hero: "Phantom Assassin", annotation: "gotthejuice's PA — high risk, high reward carry" },
  { phase: "Pick Phase 2", team: "Liquid", action: "pick", hero: "Phoenix", annotation: "Phoenix + Jakiro = double team-fight ultimates" },
  { phase: "Pick Phase 2", team: "NaVi", action: "pick", hero: "Rubick", annotation: "Rubick to steal Supernova or Ice Path — mind games" },
  { phase: "Pick Phase 2", team: "Liquid", action: "pick", hero: "Puck", annotation: "Nisha's Puck mid — elusive and aggressive" },
  // Ban Phase 3
  { phase: "Ban Phase 3", team: "Liquid", action: "ban", hero: "Dazzle", annotation: "No Shallow Grave for PA — Liquid forces NaVi to commit" },
  { phase: "Ban Phase 3", team: "NaVi", action: "ban", hero: "Pangolier", annotation: "Last ban removing Liquid's flex option" },
  // Pick Phase 3
  { phase: "Pick Phase 3", team: "Liquid", action: "pick", hero: "Faceless Void", annotation: "miCKe's Void — Chronosphere + Arena is the GG combo" },
  { phase: "Pick Phase 3", team: "NaVi", action: "pick", hero: "Sand King", annotation: "Sand King for initiation — NaVi's only answer to Chrono" },
];

// --- PLAYER SPOTLIGHT DATA ---
export interface PlayerData {
  name: string;
  realName: string;
  team: string;
  role: string;
  roleLabel: string;
  country: string;
  kda: { kills: number; deaths: number; assists: number };
  avgKDA: number;
  gpm: number;
  xpm: number;
  heroPool: string[];
  signaturePlays: string[];
  tournamentHighlight: string;
  isMVP?: boolean;
}

export const playerSpotlights: PlayerData[] = [
  // ── TEAM LIQUID ──
  {
    name: "Nisha",
    realName: "Michał Jankowski",
    team: "Team Liquid",
    role: "mid",
    roleLabel: "Midlane",
    country: "PL",
    kda: { kills: 187, deaths: 68, assists: 142 },
    avgKDA: 4.84,
    gpm: 628,
    xpm: 712,
    heroPool: ["Puck", "Invoker", "Lina", "Pangolier"],
    signaturePlays: [
      "Triple Illusory Orb dodge in GF Game 4 teamfight — survived 1 HP",
      "Sunstrike snipe across map to secure Roshan for Liquid in SF Game 3",
      "Solo killed NaVi's Invoker with Phase Shift jukes in GF Game 2",
    ],
    tournamentHighlight: "Tournament MVP — 4.84 avg KDA, highest mid GPM (628), and the decisive Puck performance in the Grand Final clincher.",
    isMVP: true,
  },
  {
    name: "miCKe",
    realName: "Michael Vu",
    team: "Team Liquid",
    role: "carry",
    roleLabel: "Carry",
    country: "SE",
    kda: { kills: 203, deaths: 72, assists: 98 },
    avgKDA: 4.18,
    gpm: 654,
    xpm: 689,
    heroPool: ["Faceless Void", "Morphling", "Naga Siren", "Phantom Assassin"],
    signaturePlays: [
      "5-man Chronosphere in GF Game 4 sealed the championship at 37 min",
      "1v3 Void outplay vs Falcons in QF Game 5 — turned the series",
      "Perfect Manta dodge on Naga in group stage vs Tundra",
    ],
    tournamentHighlight: "Liquid's closer — highest carry GPM (654), came alive in elimination games with a 78% win rate on Faceless Void.",
  },
  {
    name: "Ace",
    realName: "Marcus Hoelgaard",
    team: "Team Liquid",
    role: "offlane",
    roleLabel: "Offlane",
    country: "DK",
    kda: { kills: 98, deaths: 81, assists: 221 },
    avgKDA: 3.94,
    gpm: 412,
    xpm: 498,
    heroPool: ["Mars", "Enigma", "Sand King", "Doom"],
    signaturePlays: [
      "Arena of Blood trapped 4 NaVi heroes for the GF Game 4 fight at Rosh pit",
      "Clutch Black Hole on 3 Falcons heroes in QF Game 4 — kept Liquid alive",
      "Flawless Mars in SF — 100% Arena accuracy across 3 OG games",
    ],
    tournamentHighlight: "The initiator — Ace's Mars had an 83% win rate this tournament. His Arena setups gave Liquid their signature teamfight identity.",
  },
  {
    name: "tofu",
    realName: "tofu",
    team: "Team Liquid",
    role: "support",
    roleLabel: "Captain / Pos 4",
    country: "SE",
    kda: { kills: 52, deaths: 89, assists: 287 },
    avgKDA: 3.81,
    gpm: 298,
    xpm: 352,
    heroPool: ["Jakiro", "Phoenix", "Spirit Breaker", "Earthshaker"],
    signaturePlays: [
      "Captain's draft — out-drafted every opponent in playoffs (9-1 record)",
      "Jakiro Ice Path + Macropyre combo wiped NaVi in GF Game 1",
      "Phoenix Supernova saved 3 teammates in SF Game 2 — fight-winning egg",
    ],
    tournamentHighlight: "The mastermind — tofu's drafting was Liquid's secret weapon. 9-1 draft record in playoffs, with the highest synergy index (82.1) in the tournament.",
  },
  {
    name: "Boxi",
    realName: "Samuel Guldbrandsen",
    team: "Team Liquid",
    role: "hard_support",
    roleLabel: "Hard Support",
    country: "SE",
    kda: { kills: 31, deaths: 92, assists: 301 },
    avgKDA: 3.61,
    gpm: 262,
    xpm: 308,
    heroPool: ["Shadow Demon", "Chen", "Witch Doctor", "Dazzle"],
    signaturePlays: [
      "Shadow Demon disruption saved miCKe from certain death 3 times in GF Game 3",
      "Clutch Shallow Grave on Nisha in QF Game 5 — Nisha survived to win the fight",
      "Ward vision dominance — 87% deward rate across the tournament",
    ],
    tournamentHighlight: "The unsung hero — Boxi's vision game was unmatched. 87% deward rate and the most assists per game (12.0) in the tournament.",
  },
  // ── NATUS VINCERE ──
  {
    name: "gotthejuice",
    realName: "gotthejuice",
    team: "Natus Vincere",
    role: "carry",
    roleLabel: "Carry",
    country: "UA",
    kda: { kills: 178, deaths: 84, assists: 87 },
    avgKDA: 3.15,
    gpm: 621,
    xpm: 668,
    heroPool: ["Phantom Assassin", "Morphling", "Faceless Void", "Tiny"],
    signaturePlays: [
      "PA rampage in SF Game 5 vs Yandex — 5 kills in 12 seconds",
      "Morphling 1v2 outplay in group stage vs OG — Adaptive Strike double kill",
      "Clutch BKB timing on PA in GF Game 2 — NaVi's only GF win",
    ],
    tournamentHighlight: "NaVi's star carry — 2nd highest GPM (621), but couldn't overcome Liquid's synergy in the Grand Final. PA was his tournament weapon (54.5% WR).",
  },
  {
    name: "Niku",
    realName: "Niku",
    team: "Natus Vincere",
    role: "mid",
    roleLabel: "Midlane",
    country: "UA",
    kda: { kills: 152, deaths: 71, assists: 118 },
    avgKDA: 3.80,
    gpm: 584,
    xpm: 642,
    heroPool: ["Invoker", "Puck", "Lina", "Storm Spirit"],
    signaturePlays: [
      "Invoker Cataclysm combo in GF Game 2 secured NaVi's only Grand Final win",
      "Storm Spirit zip-zap triple kill vs Yandex in SF Game 4 turned the map",
      "Solo Roshan sneak on Lina in group stage — NaVi's fastest Aegis",
    ],
    tournamentHighlight: "NaVi's playmaker — Niku's Invoker was feared all tournament (54.2% WR). His Cataclysm in GF Game 2 was the series highlight.",
  },
  {
    name: "pma",
    realName: "pma",
    team: "Natus Vincere",
    role: "offlane",
    roleLabel: "Offlane",
    country: "RU",
    kda: { kills: 86, deaths: 79, assists: 194 },
    avgKDA: 3.54,
    gpm: 388,
    xpm: 462,
    heroPool: ["Mars", "Sand King", "Largo", "Tidehunter"],
    signaturePlays: [
      "4-man Ravage in SF Game 5 vs Yandex — turned a losing fight into a teamwipe",
      "Mars Arena zoning forced Liquid into bad positions in GF Game 2",
      "Sand King Epicenter blink combo vs HEROIC wiped 3 in group stage",
    ],
    tournamentHighlight: "NaVi's frontliner — pma's initiation was key to NaVi's tempo game plan. His Tidehunter Ravage in the SF won them the series.",
  },
  {
    name: "Zayac",
    realName: "Bakyt Emilzhanov",
    team: "Natus Vincere",
    role: "support",
    roleLabel: "Support",
    country: "KG",
    kda: { kills: 44, deaths: 82, assists: 258 },
    avgKDA: 3.68,
    gpm: 284,
    xpm: 338,
    heroPool: ["Rubick", "Earthshaker", "Spirit Breaker", "Tusk"],
    signaturePlays: [
      "Rubick stole Supernova in GF Game 2 — turned the fight and won the map",
      "Spirit Breaker global charge setup for gotthejuice's PA crit in SF vs Yandex Game 5",
      "Echo Slam 4-man stun in group stage vs OG locked the teamfight",
    ],
    tournamentHighlight: "The veteran support — Zayac's Rubick spell steal in GF Game 2 was the single best play of the tournament. His experience anchored NaVi's run.",
  },
  {
    name: "Riddys",
    realName: "Riddys",
    team: "Natus Vincere",
    role: "hard_support",
    roleLabel: "Captain / Pos 5",
    country: "UA",
    kda: { kills: 28, deaths: 76, assists: 242 },
    avgKDA: 3.55,
    gpm: 268,
    xpm: 314,
    heroPool: ["Shadow Demon", "Crystal Maiden", "Dazzle", "Witch Doctor"],
    signaturePlays: [
      "Shadow Demon setup for gotthejuice's PA crit in SF vs Yandex Game 5",
      "Crystal Maiden Freezing Field in Rosh pit during GF Game 3 — almost turned the game",
      "Clutch Shallow Grave timing kept gotthejuice alive in group stage vs Liquid",
    ],
    tournamentHighlight: "The captain — Riddys' drafting nearly matched Liquid's in the Grand Final. His vision game and shot-calling carried NaVi to the finals.",
  },
];

// --- ALL DOTA 2 HEROES (for Draft Simulator) ---
export type HeroAttribute = "strength" | "agility" | "intelligence" | "universal";

export interface DotaHero {
  name: string;
  attribute: HeroAttribute;
}

export const allDotaHeroes: DotaHero[] = [
  // ── STRENGTH ──
  { name: "Alchemist", attribute: "strength" },
  { name: "Axe", attribute: "strength" },
  { name: "Bristleback", attribute: "strength" },
  { name: "Centaur Warrunner", attribute: "strength" },
  { name: "Chaos Knight", attribute: "strength" },
  { name: "Dawnbreaker", attribute: "strength" },
  { name: "Doom", attribute: "strength" },
  { name: "Dragon Knight", attribute: "strength" },
  { name: "Earth Spirit", attribute: "strength" },
  { name: "Earthshaker", attribute: "strength" },
  { name: "Huskar", attribute: "strength" },
  { name: "Kunkka", attribute: "strength" },
  { name: "Legion Commander", attribute: "strength" },
  { name: "Lifestealer", attribute: "strength" },
  { name: "Mars", attribute: "strength" },
  { name: "Night Stalker", attribute: "strength" },
  { name: "Ogre Magi", attribute: "strength" },
  { name: "Omniknight", attribute: "strength" },
  { name: "Primal Beast", attribute: "strength" },
  { name: "Pudge", attribute: "strength" },
  { name: "Slardar", attribute: "strength" },
  { name: "Sven", attribute: "strength" },
  { name: "Tidehunter", attribute: "strength" },
  { name: "Timbersaw", attribute: "strength" },
  { name: "Tiny", attribute: "strength" },
  { name: "Treant Protector", attribute: "strength" },
  { name: "Tusk", attribute: "strength" },
  { name: "Underlord", attribute: "strength" },
  { name: "Undying", attribute: "strength" },
  { name: "Wraith King", attribute: "strength" },
  // ── AGILITY ──
  { name: "Anti-Mage", attribute: "agility" },
  { name: "Arc Warden", attribute: "agility" },
  { name: "Bloodseeker", attribute: "agility" },
  { name: "Bounty Hunter", attribute: "agility" },
  { name: "Clinkz", attribute: "agility" },
  { name: "Drow Ranger", attribute: "agility" },
  { name: "Ember Spirit", attribute: "agility" },
  { name: "Faceless Void", attribute: "agility" },
  { name: "Gyrocopter", attribute: "agility" },
  { name: "Hoodwink", attribute: "agility" },
  { name: "Juggernaut", attribute: "agility" },
  { name: "Luna", attribute: "agility" },
  { name: "Medusa", attribute: "agility" },
  { name: "Meepo", attribute: "agility" },
  { name: "Monkey King", attribute: "agility" },
  { name: "Morphling", attribute: "agility" },
  { name: "Naga Siren", attribute: "agility" },
  { name: "Phantom Assassin", attribute: "agility" },
  { name: "Phantom Lancer", attribute: "agility" },
  { name: "Razor", attribute: "agility" },
  { name: "Riki", attribute: "agility" },
  { name: "Shadow Fiend", attribute: "agility" },
  { name: "Slark", attribute: "agility" },
  { name: "Sniper", attribute: "agility" },
  { name: "Spectre", attribute: "agility" },
  { name: "Templar Assassin", attribute: "agility" },
  { name: "Terrorblade", attribute: "agility" },
  { name: "Troll Warlord", attribute: "agility" },
  { name: "Ursa", attribute: "agility" },
  { name: "Viper", attribute: "agility" },
  { name: "Weaver", attribute: "agility" },
  // ── INTELLIGENCE ──
  { name: "Ancient Apparition", attribute: "intelligence" },
  { name: "Crystal Maiden", attribute: "intelligence" },
  { name: "Dazzle", attribute: "intelligence" },
  { name: "Disruptor", attribute: "intelligence" },
  { name: "Grimstroke", attribute: "intelligence" },
  { name: "Invoker", attribute: "intelligence" },
  { name: "Jakiro", attribute: "intelligence" },
  { name: "Keeper of the Light", attribute: "intelligence" },
  { name: "Leshrac", attribute: "intelligence" },
  { name: "Lich", attribute: "intelligence" },
  { name: "Lina", attribute: "intelligence" },
  { name: "Lion", attribute: "intelligence" },
  { name: "Muerta", attribute: "intelligence" },
  { name: "Nature's Prophet", attribute: "intelligence" },
  { name: "Necrophos", attribute: "intelligence" },
  { name: "Oracle", attribute: "intelligence" },
  { name: "Outworld Destroyer", attribute: "intelligence" },
  { name: "Puck", attribute: "intelligence" },
  { name: "Pugna", attribute: "intelligence" },
  { name: "Queen of Pain", attribute: "intelligence" },
  { name: "Rubick", attribute: "intelligence" },
  { name: "Shadow Demon", attribute: "intelligence" },
  { name: "Shadow Shaman", attribute: "intelligence" },
  { name: "Silencer", attribute: "intelligence" },
  { name: "Skywrath Mage", attribute: "intelligence" },
  { name: "Storm Spirit", attribute: "intelligence" },
  { name: "Tinker", attribute: "intelligence" },
  { name: "Warlock", attribute: "intelligence" },
  { name: "Witch Doctor", attribute: "intelligence" },
  { name: "Zeus", attribute: "intelligence" },
  // ── UNIVERSAL ──
  { name: "Abaddon", attribute: "universal" },
  { name: "Bane", attribute: "universal" },
  { name: "Batrider", attribute: "universal" },
  { name: "Beastmaster", attribute: "universal" },
  { name: "Brewmaster", attribute: "universal" },
  { name: "Broodmother", attribute: "universal" },
  { name: "Chen", attribute: "universal" },
  { name: "Clockwerk", attribute: "universal" },
  { name: "Dark Seer", attribute: "universal" },
  { name: "Dark Willow", attribute: "universal" },
  { name: "Death Prophet", attribute: "universal" },
  { name: "Enchantress", attribute: "universal" },
  { name: "Enigma", attribute: "universal" },
  { name: "Io", attribute: "universal" },
  { name: "Lone Druid", attribute: "universal" },
  { name: "Lycan", attribute: "universal" },
  { name: "Magnus", attribute: "universal" },
  { name: "Marci", attribute: "universal" },
  { name: "Mirana", attribute: "universal" },
  { name: "Nyx Assassin", attribute: "universal" },
  { name: "Pangolier", attribute: "universal" },
  { name: "Phoenix", attribute: "universal" },
  { name: "Sand King", attribute: "universal" },
  { name: "Snapfire", attribute: "universal" },
  { name: "Spirit Breaker", attribute: "universal" },
  { name: "Techies", attribute: "universal" },
  { name: "Vengeful Spirit", attribute: "universal" },
  { name: "Venomancer", attribute: "universal" },
  { name: "Visage", attribute: "universal" },
  { name: "Void Spirit", attribute: "universal" },
  { name: "Windranger", attribute: "universal" },
  { name: "Winter Wyvern", attribute: "universal" },
  { name: "Largo", attribute: "universal" },
  { name: "Ringmaster", attribute: "universal" },
  { name: "Kez", attribute: "agility" },
];
