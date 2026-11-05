import { MAX_ROLES } from "./roles";

/** Manual copy-and-paste shortlist transfer. Code holds only allowlisted role IDs. */
export const CODE_PREFIX = "VELQ1:";
export const CODE_IDS = ["ib", "am", "wm", "risk", "st", "quant", "er", "private", "corp", "treasury", "fpna", "actuarial", "compliance", "operations", "technology", "consulting"] as const;

/** Internal role-finder IDs that differ from the shared code IDs. */
const TO_CODE: Record<string, string> = { research: "er", "corporate-banking": "corp" };

export function toCodeId(id: string): string | null {
  const c = TO_CODE[id] ?? id;
  return (CODE_IDS as readonly string[]).includes(c) ? c : null;
}

/** Returns VELQ1:a,b,c for 1–4 unique known IDs in order; null for empty, unknown or >4. */
export function shortlistCode(ids: readonly string[]): string | null {
  if (!Array.isArray(ids) || ids.length < 1 || ids.length > MAX_ROLES) return null;
  const out: string[] = [];
  for (const id of ids) {
    const c = typeof id === "string" ? toCodeId(id) : null;
    if (!c || out.includes(c)) return null;
    out.push(c);
  }
  return CODE_PREFIX + out.join(",");
}
