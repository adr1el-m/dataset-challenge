import type { DotaHero } from "../data/tournament";

type FeatureImportance = {
  feature: string;
  importance: number;
};

type HeroStats = {
  name: string;
  winRate: number;
  contestRate: number;
};

type BreakdownItem = {
  label: string;
  value: number;
  max: number;
};

const combos = [
  { heroes: ["Faceless Void", "Mars"], bonus: 12 },
  { heroes: ["Jakiro", "Mars"], bonus: 8 },
  { heroes: ["Phoenix", "Faceless Void"], bonus: 10 },
  { heroes: ["Enigma", "Jakiro"], bonus: 9 },
  { heroes: ["Shadow Demon", "Faceless Void"], bonus: 7 },
  { heroes: ["Phoenix", "Enigma"], bonus: 11 },
  { heroes: ["Invoker", "Faceless Void"], bonus: 10 },
  { heroes: ["Earthshaker", "Enigma"], bonus: 8 },
  { heroes: ["Naga Siren", "Enigma"], bonus: 9 },
  { heroes: ["Crystal Maiden", "Faceless Void"], bonus: 7 },
  { heroes: ["Magnus", "Faceless Void"], bonus: 10 },
  { heroes: ["Dark Seer", "Enigma"], bonus: 8 },
  { heroes: ["Tidehunter", "Earthshaker"], bonus: 7 },
  { heroes: ["Centaur Warrunner", "Io"], bonus: 9 },
  { heroes: ["Tiny", "Io"], bonus: 11 },
  { heroes: ["Drow Ranger", "Vengeful Spirit"], bonus: 6 },
  { heroes: ["Weaver", "Dazzle"], bonus: 7 },
  { heroes: ["Huskar", "Dazzle"], bonus: 8 },
  { heroes: ["Juggernaut", "Crystal Maiden"], bonus: 6 },
  { heroes: ["Ursa", "Io"], bonus: 8 },
];

export function calculateSynergy(
  heroes: DotaHero[],
  heroStats: HeroStats[],
  featureImportance: FeatureImportance[],
  tournamentAvgSynergy = 72.5
): { synergyIndex: number; winProb: number; breakdown: BreakdownItem[] } {
  if (heroes.length === 0) return { synergyIndex: 0, winProb: 0.5, breakdown: [] };

  const synergyWeight = featureImportance.find((w) => w.feature === "Synergy Index")?.importance || 0.342;
  const tempoWeight = featureImportance.find((w) => w.feature === "Tempo Index")?.importance || 0.298;

  const attrCounts: Record<string, number> = {};
  heroes.forEach((h) => {
    attrCounts[h.attribute] = (attrCounts[h.attribute] || 0) + 1;
  });
  const uniqueAttrs = Object.keys(attrCounts).length;
  const attrScore = Math.min(uniqueAttrs / Math.min(heroes.length, 4), 1);

  const statsArr = heroes.map((h) => {
    const s = heroStats.find((stat) => stat.name === h.name);
    return { winRate: s?.winRate ?? 0.5, contestRate: s?.contestRate ?? 0.3 };
  });
  const avgWR = statsArr.reduce((s, x) => s + x.winRate, 0) / heroes.length;
  const avgContest = statsArr.reduce((s, x) => s + x.contestRate, 0) / heroes.length;

  const heroNames = heroes.map((h) => h.name);
  let comboBonus = 0;
  combos.forEach((c) => {
    if (c.heroes.every((h) => heroNames.includes(h))) {
      comboBonus += c.bonus;
    }
  });

  const rawSynergy =
    attrScore * 30 * synergyWeight +
    avgWR * 40 * tempoWeight +
    avgContest * 20 +
    Math.min(comboBonus, 25);

  const synergyIndex = Math.min(Math.round(rawSynergy * 10) / 10, 100);
  const exponent = (synergyIndex - tournamentAvgSynergy) / 15;
  const winProb = Math.round((1 / (1 + Math.exp(-exponent))) * 1000) / 1000;

  const breakdown = [
    { label: "Attribute Diversity", value: Math.round(attrScore * 100), max: 100 },
    { label: "Avg Win Rate", value: Math.round(avgWR * 100), max: 100 },
    { label: "Meta Relevance", value: Math.round(avgContest * 100), max: 100 },
    { label: "Combo Bonus", value: Math.min(Math.round(comboBonus), 25), max: 25 },
  ];

  return { synergyIndex, winProb, breakdown };
}
