# VELQ website on Render

Public website imported from approved Lovable commit `776414879696d5f58a1cbefe5fa47ddb7884f220`.
The previous single-file website remains in Git history at `f234ba7b5d1a5ce44b83821c083051da7ae56f16`.

## Build and deployment

Use Node 24 and `npm ci`. Run `npm test`, then `npm run build`.
Render builds the `main` branch using `npm ci --no-audit --no-fund && npm run build` and publishes **only `dist/client`**.
The existing service remains `srv-dbda2a6i0phs7392h4vg`, at https://velq-website.onrender.com.
Rewrite `/*` to `/index.html` so direct client routes and reloads work.
`render.yaml` records this configuration; the existing dashboard configuration is authoritative.

The public site is a static TanStack Start SPA. No backend, database, Worker, paid server, secrets, analytics or paid membership content are deployed here.
Fonts ship with the build. The member library remains protected separately through Whop.

## Free tester flow

The exact invitation query is implemented in `src/lib/velq/invite.ts` and persists only in that browser tab's sessionStorage.
After the questionnaire, ranking and a confirmed 1–4-role shortlist, the membership page offers the verified, one-claim free Whop plan.
It grants 180 days on the same membership product, expires automatically and has no paid renewal.
Do not consume the sole claim during tests. The student creates their own Whop account and accepts platform terms themselves.
The shortlist transfer is manual: copy the VELQ1 code, then paste into Bring your shortlist in the protected library.

Paid checkout remains disabled in `src/lib/velq/checkout-config.ts`.
The invitation is not proof of membership: the member server verifies Whop identity and product access independently.

## Future edits

This GitHub repository is the Render deployment source. Lovable changes do not automatically appear here: export and review them before updating main.
Keep the public-only content boundary and checkout safeguards intact.
