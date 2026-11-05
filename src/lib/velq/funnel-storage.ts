import { QUESTIONS, sanitiseRoles, type Answer } from "./roles";

/** Public funnel only. Separate, versioned key; never holds paid content. */
export const FUNNEL_KEY = "velq-public-funnel-v1";

export type FunnelState = { v: 1; answers: Answer[]; step: number; roles: string[]; confirmed: boolean };

export const emptyFunnel = (): FunnelState => ({ v: 1, answers: QUESTIONS.map(() => null), step: 0, roles: [], confirmed: false });

export function parseFunnel(raw: string | null): FunnelState {
  const base = emptyFunnel();
  if (!raw) return base;
  try {
    const d = JSON.parse(raw);
    if (!d || d.v !== 1) return base;
    const answers = base.answers.map((_, i) => {
      const x = d.answers?.[i];
      return Number.isInteger(x) && x >= 0 && x <= 5 ? (x as Answer) : null;
    });
    const step = Number.isInteger(d.step) ? Math.min(Math.max(d.step, 0), QUESTIONS.length - 1) : 0;
    const roles = sanitiseRoles(d.roles);
    return { v: 1, answers, step, roles, confirmed: d.confirmed === true && roles.length > 0 };
  } catch {
    return base;
  }
}

export function loadFunnel(): FunnelState {
  try {
    return parseFunnel(window.localStorage.getItem(FUNNEL_KEY));
  } catch {
    return emptyFunnel();
  }
}

export function saveFunnel(s: FunnelState): boolean {
  try {
    window.localStorage.setItem(FUNNEL_KEY, JSON.stringify(s));
    return true;
  } catch {
    return false;
  }
}

export function clearFunnel() {
  try {
    window.localStorage.removeItem(FUNNEL_KEY);
  } catch {
    /* storage unavailable */
  }
}
