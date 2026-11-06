import { afterEach, expect, it, vi } from "vitest";
import { clearFunnel, emptyFunnel, loadFunnel, saveFunnel } from "@/lib/velq/funnel-storage";

afterEach(() => {
  vi.restoreAllMocks();
  clearFunnel();
});

it("keeps a confirmed shortlist during navigation when a persistent write fails", () => {
  const state = { ...emptyFunnel(), roles: ["risk"], confirmed: true };
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new DOMException("Storage is full", "QuotaExceededError");
  });

  expect(saveFunnel(state)).toBe(false);
  expect(loadFunnel()).toEqual(state);
  clearFunnel();
  expect(loadFunnel()).toEqual(emptyFunnel());
});
