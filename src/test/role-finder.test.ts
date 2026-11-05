import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { ROLES, QUESTIONS, canConfirm, rankRoles, sanitiseRoles, suggestion, validateAnswers, type Answer } from "@/lib/velq/roles";
import { emptyFunnel, parseFunnel } from "@/lib/velq/funnel-storage";
import { checkoutHref, RELEASE_READY, VERIFIED_CHECKOUT_URL, PRICE } from "@/lib/velq/checkout-config";

const all = (v: Answer) => QUESTIONS.map(() => v);

describe("approved data", () => {
  it("has exactly 10 questions and 16 roles with 10 weights each", () => {
    expect(QUESTIONS).toHaveLength(10);
    expect(ROLES).toHaveLength(16);
    ROLES.forEach((r) => expect(r.weights).toHaveLength(10));
  });
});

describe("validation", () => {
  it("rejects unanswered (null) but accepts 0 as an answer", () => {
    const a: Answer[] = [5, 5, 5, 5, 5, 5, 0, 0, 0, null];
    expect(validateAnswers(a)).toMatchObject({ ok: false, reason: "unanswered" });
    a[9] = 0;
    expect(validateAnswers(a).ok).toBe(true);
  });
  it("requires at least six rated tasks", () => {
    expect(validateAnswers([5, 5, 5, 5, 5, 0, 0, 0, 0, 0])).toMatchObject({ ok: false, reason: "too-few-rated" });
    expect(() => rankRoles([5, 5, 5, 5, 5, 0, 0, 0, 0, 0])).toThrow();
  });
});

describe("ranking", () => {
  it("matches the formula for investment banking", () => {
    const a: Answer[] = [5, 1, 3, 2, 4, 5, 1, 2, 3, 4];
    const ib = ROLES.find((r) => r.id === "ib")!;
    let n = 0, d = 0;
    a.forEach((x, j) => { n += ib.weights[j]! * (x! - 1); d += 4 * ib.weights[j]!; });
    expect(rankRoles(a).find((r) => r.id === "ib")!.score).toBe(Math.round((100 * n) / d));
  });
  it("excludes unknowns from the denominator", () => {
    const a: Answer[] = [5, 5, 5, 5, 5, 5, 0, 0, 0, 0];
    rankRoles(a).forEach((r) => expect(r.score).toBe(100));
  });
  it("changes when preferences change", () => {
    const a = rankRoles([5, 1, 1, 1, 1, 5, 1, 1, 5, 5])[0]!.id;
    const b = rankRoles([1, 5, 5, 5, 5, 1, 5, 5, 1, 1])[0]!.id;
    expect(a).not.toBe(b);
  });
  it("identical ratings make every role tie at rank 1 and suggest nothing automatically", () => {
    const r = rankRoles(all(3));
    r.forEach((x) => expect(x.rank).toBe(1));
    const s = suggestion(r);
    expect(s.kind).toBe("tie");
    if (s.kind === "tie") { expect(s.fixed).toEqual([]); expect(s.tied).toHaveLength(16); }
  });
  it("equal displayed scores share a rank", () => {
    const r = rankRoles([5, 1, 3, 2, 4, 5, 1, 2, 3, 4]);
    r.forEach((x, i) => { if (i && r[i - 1]!.score === x.score) expect(x.rank).toBe(r[i - 1]!.rank); });
  });
});

describe("shortlist", () => {
  it("allows 1 to 4 roles only", () => {
    expect(canConfirm([])).toBe(false);
    expect(canConfirm(["ib"])).toBe(true);
    expect(canConfirm(ROLES.slice(0, 4).map((r) => r.id))).toBe(true);
    expect(canConfirm(ROLES.slice(0, 5).map((r) => r.id))).toBe(false);
  });
  it("drops unknown ids, duplicates and caps at 4", () => {
    expect(sanitiseRoles(["ib", "ib", "hack", ...ROLES.map((r) => r.id)])).toHaveLength(4);
    expect(sanitiseRoles(["nope"])).toEqual([]);
  });
});

describe("storage", () => {
  it("falls back on corrupt or wrong-version records", () => {
    expect(parseFunnel("{oops")).toEqual(emptyFunnel());
    expect(parseFunnel(JSON.stringify({ v: 2, answers: all(5) }))).toEqual(emptyFunnel());
  });
  it("keeps 0 distinct from null and sanitises roles", () => {
    const s = parseFunnel(JSON.stringify({ v: 1, answers: [0, 9, "3", 5], step: 99, roles: ["ib", "bad"], confirmed: true }));
    expect(s.answers.slice(0, 4)).toEqual([0, null, null, 5]);
    expect(s.step).toBe(9);
    expect(s.roles).toEqual(["ib"]);
    expect(s.confirmed).toBe(true);
  });
});

describe("checkout", () => {
  it("is disabled until release-ready with a verified URL", () => {
    expect(RELEASE_READY).toBe(false);
    expect(VERIFIED_CHECKOUT_URL).toBe("");
    expect(checkoutHref()).toBeNull();
    expect(checkoutHref(true, "")).toBeNull();
    expect(checkoutHref(true, "https://evil.example/x")).toBeNull();
  });
  it("uses the approved price and trial", () => {
    expect(PRICE).toEqual({ amount: "£19.99", period: "every six months", trial: "three-day trial" });
  });
});

describe("public source", () => {
  it("contains no paid lesson file or answer keys", () => {
    const walk = (d: string): string[] => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
    const files = walk("src").filter((f) => !f.includes("/test/"));
    expect(files.some((f) => f.includes("approved-lesson"))).toBe(false);
    const text = files.map((f) => readFileSync(f, "utf8")).join("\n");
    expect(text).not.toContain("Your first useful step");
    expect(text).not.toContain('"quiz"');
  });
});

import { captureInvite, hasInvite, freeClaimHref, FREE_CLAIM_URL, INVITE_KEY } from "@/lib/velq/invite";
import { checkoutHref as ch2, RELEASE_READY as RR2, VERIFIED_CHECKOUT_URL as VU2 } from "@/lib/velq/checkout-config";
describe("free invitation", () => {
  const mk = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k) }; };
  it("captures only the exact flag and survives later pages", () => {
    const s = mk(); captureInvite("?invite=velq-first-review", s); expect(hasInvite(s)).toBe(true);
    captureInvite("", s); expect(hasInvite(s)).toBe(true);
  });
  it("invalid values clear and never store arbitrary data", () => {
    const s = mk(); captureInvite("?invite=velq-first-review", s); captureInvite("?invite=https://evil.example", s);
    expect(hasInvite(s)).toBe(false); expect(s.getItem(INVITE_KEY)).toBeNull();
    captureInvite("?invite=VELQ-FIRST-REVIEW", s); expect(hasInvite(s)).toBe(false);
  });
  it("claim link requires invite AND valid shortlist, exact URL only", () => {
    expect(freeClaimHref(false, true)).toBeNull();
    expect(freeClaimHref(true, false)).toBeNull();
    expect(freeClaimHref(true, true)).toBe("https://whop.com/checkout/plan_6NicMNmBO0ZzB");
    expect(FREE_CLAIM_URL).toBe("https://whop.com/checkout/plan_6NicMNmBO0ZzB");
  });
  it("paid checkout stays off", () => { expect(RR2).toBe(false); expect(VU2).toBe(""); expect(ch2()).toBeNull(); });
});
