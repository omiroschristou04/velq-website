# VELQ launch review — 3 November 2026

## Delivered in this build

- Redesigned responsive sales homepage with new typography, original CSS process illustration, student-led copy, welcome-guide language and transparent product previews.
- Four interactive recruitment-stage routes: spring weeks, internships, placements and graduates.
- Five preparation routes: numerical, judgement/reasoning, technical, interview and assessment centre.
- Sixteen-family industry map with role work, overlaps, office positioning, possible development and preparation prompts.
- Ten-question interest-reflection prototype with complete ranking, explanatory themes, downloadable notes and published scoring weights. This is an editorial model, not a validated matching instrument.
- Session planner offering one practical task based on an immediate bottleneck.
- Source-linked 2026 market context with scope limits.
- Draft native lessons: expanded welcome, finance map, online assessments, technical preparation.
- Official-source outreach seed: three published recruiting inboxes and two specialist employer programme portals.

## Commercial scope

The existing live site and Whop billing are unchanged. No payments are taken on the private preview. The previously observed Whop plan was £19.99 recurring every six months with a three-day trial. Earlier £29 one-time wording is a proposal, not the current configured offer; do not publish either as a verified final commercial decision without checking the saved checkout.

## Release blockers

1. Confirm final price, tax presentation, renewal arrangement, access length and trial. Test the real customer-facing checkout without making a purchase.
2. Upload the corrected tracker and test a member download. Prior attempts were blocked by the browser extension’s file-URL permission. Do not advertise successful delivery until verified.
3. Confirm business identity, support route and approved privacy/refund terms. Avoid generic no-refund wording.
4. Verify course visibility and membership app access in member preview. The preparation course has been hidden during drafting.
5. Review new lesson content and exact links. Verify all release claims against the visible member experience.
6. Approve the homepage draft before replacing the Render production site. Work should be reviewed through the draft PR.

## Claims matrix

| Claim | Evidence / status | Website treatment |
|---|---|---|
| Practical application, interview and AC resources | Existing native lessons plus new drafts | Concrete scope, no outcome guarantee |
| Downloadable application tracker | Corrected workbook exists; member attachment pending | Pending explicitly disclosed |
| Live vacancies tracker | Not implemented | Explicitly excluded from current offer |
| Smaller-firm directory | Small verified seed, incomplete coverage | No full-directory claim |
| Personalised career matching | Ten-question editorial reflection only | Prototype and limitations clearly labelled |
| Member profiles / stored assessment history | No backend implemented | No record collection promised |
| Interviews, jobs or ATS pass guarantees | No evidence and not controllable | No such claims |
| Testimonials, member counts, endorsements | None verified | None added |
| Registered trademark | No registration verified | Removed ® from draft branding |

## Market evidence

Source: https://ise.org.uk/knowledge/insights/615/graduate_jobs_stabilise_but_ai_use_disrupts_recruitment

The homepage’s London and financial/professional-services averages are separate categories, not a combined rate or probability. The source is a survey of employers, not the complete labour market. Do not present it as proof of the hardest market in history, a finance-division acceptance rate or a count of London finance hires. No reliable cross-division annual London hiring total has been established for this product.

## Role and assessment sources

- CFA Institute career overview: https://www.cfainstitute.org/programs/cfa-program/careers
- CFA Institute portfolio-manager overview: https://www.cfainstitute.org/programs/cfa-program/careers/portfolio-manager
- CFA Institute risk overview: https://www.cfainstitute.org/programs/cfa-program/careers/risk-analyst-risk-manager
- Aon candidate guidance and practice: https://www.aon.com/en/capabilities/talent-and-rewards/prepare-for-your-online-assessment

These support orientation. They do not validate the editorial quiz or establish every employer’s requirements.

## Profile-data design still to build

The current prototype processes answers in memory. To retain member history, first agree the purpose and minimum fields, appropriate legal basis, retention and deletion rules, and the production notice. Implement account ownership, access control, encryption, export and deletion; test cross-account isolation. Do not collect date of birth, protected characteristics or detailed financial circumstances for a simple interest reflection. A privacy specialist should review the final production plan where needed.

## Efficient next work

Use one source-of-truth offer sheet for website and Whop. Reuse the native lesson content rather than making competing PDF versions. Maintain a small verified directory with checked dates before expanding. Use free tooling and existing source control; no extra ads service, paid automation or bot has been connected in this build.

## Whop execution log for this build

- Start Here: personal welcome introduction inserted before the existing practical roadmap; saved successfully.
- Chapter 04: new online-assessment lesson created and saved, including original numerical/verbal drills and an error-review process.
- Chapter 04: new technical-preparation lesson created and saved, with role-specific study routes and original examples.
- The course remains a preparation draft. No billing changes or course publication have been performed in this build.
- Chapter 02: expanded 16-family industry map added as a separate native lesson; the original map is retained.

## Verification completed

- JavaScript syntax and site checks pass: all 16 role records, score bounds, uniform-answer ties, invalid-answer handling, coding/client-interest differentiation, sorted rankings, local links and anchors, unique IDs, viewport metadata and no answer-transmission code.
- Desktop browser: stage and preparation tab changes, role selection, generated session task and no page-wide horizontal overflow verified.
- Role explorer browser: ten ratings produce three expanded results and thirteen remaining entries. Recalculation does not duplicate results; reset clears ratings and hides results. Exploration-notes download completes.
