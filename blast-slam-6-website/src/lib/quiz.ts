"use client";

export type QuizScoreState = {
  score: number;
  streak: number;
  maxStreak: number;
  answers: boolean[];
};

export function applyQuizAnswer(state: QuizScoreState, correct: boolean): QuizScoreState {
  const nextScore = correct ? state.score + 1 : state.score;
  const nextStreak = correct ? state.streak + 1 : 0;
  const nextMaxStreak = Math.max(state.maxStreak, nextStreak);
  return {
    score: nextScore,
    streak: nextStreak,
    maxStreak: nextMaxStreak,
    answers: [...state.answers, correct],
  };
}
