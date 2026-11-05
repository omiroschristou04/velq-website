## Deployment repository
This repository imports the approved Lovable project at commit
`776414879696d5f58a1cbefe5fa47ddb7884f220` for the existing Render static site.
It is not automatically synced back to Lovable. Preserve the imported design,
public-only content boundary and disabled paid checkout. Build with `npm run build`;
publish only `dist/client`, never the repository root or server output.

<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Public funnel (/find-your-roles, /your-roles, /membership) uses only `src/lib/velq/role-finder.json` and browser localStorage; paid lesson content must never be bundled in public code, because client-hidden content is not a paywall.
- Checkout release is controlled only in `src/lib/velq/checkout-config.ts`; never build Whop URLs from IDs. Later server integration criteria live in `docs/member-onboarding-integration.md`.
- Public presentation scenes live in `src/components/public-study`; use one passive frame-coalesced scroll observer and CSS local progress, with static mobile/reduced-motion reading order, to avoid competing scroll systems.
- Public preview artwork contains only public role summaries and blank workflow structures, never protected member lessons or directory records; label it explicitly as an interface preview.

