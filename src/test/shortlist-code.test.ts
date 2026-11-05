import { describe, expect, it } from "vitest";
import { CODE_IDS, shortlistCode } from "@/lib/velq/shortlist-code";
import { ROLE_IDS } from "@/lib/velq/roles";

describe("shortlist code", () => {
  it("formats one role", () => expect(shortlistCode(["am"])).toBe("VELQ1:am"));
  it("formats four roles in selected order", () => {
    expect(shortlistCode(["risk", "am", "wm", "ib"])).toBe("VELQ1:risk,am,wm,ib");
    expect(shortlistCode(["am", "wm", "risk"])).toBe("VELQ1:am,wm,risk");
  });
  it("maps internal ids to code ids", () => expect(shortlistCode(["research", "corporate-banking"])).toBe("VELQ1:er,corp"));
  it("every role finder id maps to one of the 16 allowlisted code ids", () => {
    expect(CODE_IDS).toHaveLength(16);
    const mapped = ROLE_IDS.map((id) => shortlistCode([id])!.slice(6));
    expect(new Set(mapped).size).toBe(16);
    mapped.forEach((c) => expect(CODE_IDS).toContain(c));
  });
  it("rejects empty, unknown, duplicate and more than four", () => {
    expect(shortlistCode([])).toBeNull();
    expect(shortlistCode(["am", "nope"])).toBeNull();
    expect(shortlistCode(["am", "am"])).toBeNull();
    expect(shortlistCode(["ib", "am", "wm", "risk", "st"])).toBeNull();
  });
  it("changes when the selection changes", () => {
    const a = shortlistCode(["am", "wm"]);
    const b = shortlistCode(["am", "wm", "risk"]);
    const c = shortlistCode(["wm", "am"]);
    expect(a).not.toBe(b);
    expect(a).not.toBe(c);
  });
});
