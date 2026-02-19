import { describe, expect, it } from "vitest";
import { allDotaHeroes, heroMeta, quizQuestions, teams } from "../data/tournament";

describe("data integrity", () => {
  it("has unique hero names in the full hero list", () => {
    const names = allDotaHeroes.map((h) => h.name);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });

  it("has unique hero names in hero meta", () => {
    const names = heroMeta.map((h) => h.name);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });

  it("quiz questions reference valid teams and answers", () => {
    const teamNames = new Set(teams.map((t) => t.name));
    quizQuestions.forEach((q) => {
      expect(teamNames.has(q.teamA)).toBe(true);
      expect(teamNames.has(q.teamB)).toBe(true);
      expect([q.teamA, q.teamB]).toContain(q.correctAnswer);
    });
  });
});
