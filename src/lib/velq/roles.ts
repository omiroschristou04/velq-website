import data from "./role-finder.json";

export type Question = { title: string; prompt: string; hint: string };
export type Role = {
  id: string;
  name: string;
  office: string;
  work: string;
  overlap: string;
  future: string;
  prepare: string;
  weights: number[];
};

export const QUESTIONS: Question[] = data.questions;
export const ROLES: Role[] = data.roles;
export const ROLE_IDS = ROLES.map((r) => r.id);
export const MAX_ROLES = 4;
export const MIN_RATED = 6;
export const SUGGEST_COUNT = 3;

/** 0 = "I haven't tried this enough to judge"; null = not answered yet. */
export type Answer = 0 | 1 | 2 | 3 | 4 | 5 | null;

export type Ranked = Role & { score: number; rank: number; reasons: string[]; index: number };

export type Validation = { ok: true } | { ok: false; reason: "unanswered" | "too-few-rated"; message: string };

export function validateAnswers(answers: Answer[]): Validation {
  if (answers.length !== QUESTIONS.length || answers.some((v) => v === null || v === undefined || !Number.isInteger(v) || v < 0 || v > 5))
    return { ok: false, reason: "unanswered", message: "Answer all ten questions." };
  if (answers.filter((v) => (v as number) > 0).length < MIN_RATED)
    return { ok: false, reason: "too-few-rated", message: "Rate at least six tasks to produce a useful comparison." };
  return { ok: true };
}

/** Score = round(100 * Σ w·(r−1) / Σ 4w) over rated responses only. Equal displayed scores share a rank. */
export function rankRoles(answers: Answer[]): Ranked[] {
  const v = validateAnswers(answers);
  if (!v.ok) throw new Error(v.message);
  const a = answers as number[];
  const scored = ROLES.map((r, index) => {
    let num = 0;
    let den = 0;
    a.forEach((x, j) => {
      if (x > 0) {
        num += r.weights[j]! * (x - 1);
        den += 4 * r.weights[j]!;
      }
    });
    const reasons = r.weights
      .map((w, j) => ({ j, x: a[j]!, c: w * (a[j]! - 1) }))
      .filter((q) => q.x >= 4)
      .sort((p, q) => q.c - p.c || p.j - q.j)
      .slice(0, 2)
      .map((q) => QUESTIONS[q.j]!.title);
    return { ...r, score: den ? Math.round((100 * num) / den) : 0, reasons, index, rank: 0 };
  }).sort((p, q) => q.score - p.score || p.index - q.index);
  scored.forEach((r, i) => {
    r.rank = i > 0 && scored[i - 1]!.score === r.score ? scored[i - 1]!.rank : i + 1;
  });
  return scored;
}

/**
 * Suggest the top three only when the cutoff is distinctive.
 * If the 3rd and 4th scores tie, return the clear leaders plus the tied group so the user chooses.
 */
export function suggestion(ranked: Ranked[]):
  | { kind: "clear"; ids: string[] }
  | { kind: "tie"; fixed: string[]; tied: string[]; slots: number } {
  const cutoff = ranked[SUGGEST_COUNT - 1]!.score;
  const next = ranked[SUGGEST_COUNT]?.score;
  if (next !== cutoff) return { kind: "clear", ids: ranked.slice(0, SUGGEST_COUNT).map((r) => r.id) };
  const fixed = ranked.filter((r) => r.score > cutoff).map((r) => r.id);
  const tied = ranked.filter((r) => r.score === cutoff).map((r) => r.id);
  return { kind: "tie", fixed, tied, slots: SUGGEST_COUNT - fixed.length };
}

export const roleById = (id: string) => ROLES.find((r) => r.id === id);

export function sanitiseRoles(ids: unknown): string[] {
  if (!Array.isArray(ids)) return [];
  const out: string[] = [];
  for (const id of ids) if (typeof id === "string" && ROLE_IDS.includes(id) && !out.includes(id)) out.push(id);
  return out.slice(0, MAX_ROLES);
}

export const canConfirm = (ids: string[]) => ids.length >= 1 && ids.length <= MAX_ROLES;
