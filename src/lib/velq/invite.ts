/**
 * Free-tester invitation (hidden pilot). Only the exact flag below is accepted.
 * The claim URL is a fixed constant; it is never read from the URL or storage.
 * This flag only changes what the public membership page shows. It never unlocks
 * paid content: the member library still requires Whop login and product entitlement.
 */
export const INVITE_PARAM = "invite";
export const INVITE_CODE = "velq-first-review";
export const INVITE_KEY = "velq-invite-v1";
export const FREE_CLAIM_URL = "https://whop.com/checkout/plan_6NicMNmBO0ZzB";

type Store = Pick<Storage, "getItem" | "setItem" | "removeItem">;

/** Reads ?invite= from a search string; stores only the exact flag, clears anything else. */
export function captureInvite(search: string, store: Store): void {
  try {
    const v = new URLSearchParams(search).get(INVITE_PARAM);
    if (v === null) return;
    if (v === INVITE_CODE) store.setItem(INVITE_KEY, INVITE_CODE);
    else store.removeItem(INVITE_KEY);
  } catch { /* storage unavailable */ }
}

export function hasInvite(store: Store | undefined): boolean {
  try {
    return store?.getItem(INVITE_KEY) === INVITE_CODE;
  } catch {
    return false;
  }
}

/** Claim link only when invitation is active and a valid shortlist is confirmed. */
export function freeClaimHref(invited: boolean, shortlistOk: boolean): string | null {
  return invited && shortlistOk ? FREE_CLAIM_URL : null;
}
