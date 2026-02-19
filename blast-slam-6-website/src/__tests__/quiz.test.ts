import { describe, expect, it } from "vitest";
import { applyQuizAnswer } from "../lib/quiz";

describe("applyQuizAnswer", () => {
  it("increments score and streak on correct answers", () => {
    const state = { score: 0, streak: 0, maxStreak: 0, answers: [] as boolean[] };
    const next = applyQuizAnswer(state, true);
    expect(next.score).toBe(1);
    expect(next.streak).toBe(1);
    expect(next.maxStreak).toBe(1);
    expect(next.answers).toEqual([true]);
  });

  it("resets streak on incorrect answers and preserves max streak", () => {
    const state = { score: 2, streak: 2, maxStreak: 2, answers: [true, true] };
    const next = applyQuizAnswer(state, false);
    expect(next.score).toBe(2);
    expect(next.streak).toBe(0);
    expect(next.maxStreak).toBe(2);
    expect(next.answers).toEqual([true, true, false]);
  });
});
