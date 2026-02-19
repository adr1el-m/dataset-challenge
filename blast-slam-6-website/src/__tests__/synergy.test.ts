import { describe, expect, it } from "vitest";
import { calculateSynergy } from "../lib/synergy";
import { allDotaHeroes, heroMeta, modelResults } from "../data/tournament";

describe("calculateSynergy", () => {
  it("returns defaults for empty hero list", () => {
    const result = calculateSynergy([], heroMeta, modelResults.featureImportance);
    expect(result.synergyIndex).toBe(0);
    expect(result.winProb).toBe(0.5);
    expect(result.breakdown).toEqual([]);
  });

  it("computes bounded values for a real lineup", () => {
    const heroNames = ["Batrider", "Shadow Demon", "Earth Spirit", "Dragon Knight", "Ember Spirit"];
    const heroes = allDotaHeroes.filter((h) => heroNames.includes(h.name));
    const result = calculateSynergy(heroes, heroMeta, modelResults.featureImportance);
    expect(result.synergyIndex).toBeGreaterThan(0);
    expect(result.synergyIndex).toBeLessThanOrEqual(100);
    expect(result.winProb).toBeGreaterThan(0);
    expect(result.winProb).toBeLessThanOrEqual(1);
    expect(result.breakdown.length).toBe(4);
  });
});
