# Member onboarding integration

Status: the public funnel stores answers and the shortlist in browser localStorage only
(`velq-public-funnel-v1`). Nothing is sent to Whop or any server. Checkout is disabled
(`src/lib/velq/checkout-config.ts`).

## Implemented: manual copy-and-paste shortlist code

`/membership` shows a read-only "Your shortlist code" field and an explicit "Copy shortlist"
button (`src/lib/velq/shortlist-code.ts`, `src/components/shortlist-transfer.tsx`).

- Format: `VELQ1:` + comma-separated unique role IDs in selected order, 1–4 IDs,
  e.g. `VELQ1:am,wm,risk`.
- Allowlist: ib, am, wm, risk, st, quant, er, private, corp, treasury, fpna, actuarial,
  compliance, operations, technology, consulting (internal `research` → `er`,
  `corporate-banking` → `corp`).
- Contains no answers, scores, personal data, email or purchase proof. It is a preference only
  and never grants access.
- The member pastes it once in the Whop library ("Bring your shortlist"); it is saved on that
  device only. The receiving side must re-validate the same format and allowlist.

## Not implemented: automatic account sync

No automatic transfer, cross-device or member-account synchronisation exists yet.

## Proposed automatic interface (to build later)

```ts
// Server function, called after Whop confirms a membership via verified webhook/API.
type ShortlistHandoff = { roleIds: string[] }; // 1–4 IDs from ROLE_IDS allowlist
createServerFn({ method: "POST" })
  .middleware([requireMemberAuth])        // member identity from Whop, not from the client
  .inputValidator(z.object({ roleIds: z.array(z.enum(ROLE_IDS)).min(1).max(4) }))
  .handler(saveStartingPoint);
```

## Acceptance criteria

1. Paid access is granted only from a server-verified Whop membership (webhook signature or
   Whop API lookup with a server secret). Success query parameters never grant access.
2. Role IDs are validated server-side against the allowlist, deduplicated, max 4.
3. Answers are never placed in the checkout URL. If checkout metadata is used, only allowlisted
   role IDs are sent, through Whop's documented metadata mechanism (to be confirmed).
4. Members can change their shortlist at any time; it only changes the starting point.
5. Paid lesson content is served only to verified members from the server, never bundled publicly.
6. No secret is added until the owner supplies the real Whop credentials and docs are confirmed.

## Remaining launch prerequisites (private, not customer-facing)

A `/terms` preview page now exists (noindex, not in force). Before sales can begin, the
following are still outstanding and must be completed and approved by the owner:

1. Supplier identity and address: legal seller details to display to customers.
2. Billing, cancellation and refund policy: final customer-facing policy to be shown
   before checkout opens; the terms preview explicitly promises no voluntary refund
   guarantee beyond statutory rights.
3. Privacy information: a privacy notice covering what is stored and where (currently
   browser-local only) must be written and approved.
4. Legal eligibility: confirmation the seller is eligible to trade and that terms have
   had proper legal review. The current terms page is a preview only and is not legal
   sign-off.
