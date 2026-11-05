/**
 * Single source of truth for checkout release.
 * Set VERIFIED_CHECKOUT_URL to the exact Whop purchase URL supplied by the owner,
 * and RELEASE_READY to true only after membership delivery is verified.
 * Never construct a URL from the IDs below; they are recorded for future server integration only.
 */
export const RELEASE_READY = false;
export const VERIFIED_CHECKOUT_URL = "";

export const WHOP_REFERENCE = {
  businessId: "biz_lQlqlJp4KwN0GS",
  productId: "prod_MLXTvJR8Hbx08",
  planId: "plan_CQFaO9FghE4J1",
} as const;

export const PRICE = { amount: "£19.99", period: "every six months", trial: "three-day trial" } as const;

export function checkoutHref(ready = RELEASE_READY, url = VERIFIED_CHECKOUT_URL): string | null {
  if (!ready) return null;
  if (!/^https:\/\/(www\.)?whop\.com\//.test(url)) return null;
  return url;
}
