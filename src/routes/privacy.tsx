import { createFileRoute, Link } from "@tanstack/react-router";
import { PreviewNote, Wordmark } from "@/components/velq";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy preview — VELQ" },
      { name: "description", content: "A plain-language preview of the data used by the VELQ pilot." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="min-h-screen bg-paper">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:p-3 focus:text-ivory">Skip to content</a>
      <header className="border-b border-ink">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-3 px-5 py-3 md:px-8">
          <Link to="/" aria-label="VELQ home"><Wordmark className="text-xl" /></Link>
          <Link to="/" className="link-underline text-sm">← Back to home</Link>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-14">
        <article className="max-w-[720px]">
          <h1 className="headline [word-spacing:0.12em] text-4xl md:text-6xl">Privacy</h1>
          <p className="mt-8 border-l-2 border-signal pl-5 text-lg leading-relaxed">
            <strong>Preview — not yet in force.</strong> This is a pilot-stage summary of the current product. It is not the final privacy notice. Do not enter sensitive personal information. The service provider’s legal identity, hosting records, retention periods and request process must be confirmed before paid launch.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Last reviewed: 17 November 2026</p>

          <section aria-labelledby="p-finder" className="mt-12 border-t border-ink pt-8">
            <h2 id="p-finder" className="headline text-2xl md:text-3xl">The free role finder</h2>
            <p className="mt-5 leading-relaxed">The finder saves your questionnaire answers, selected roles and place in the flow in local storage in the browser you are using. The current implementation keeps these finder details on your device; it does not send them to a VELQ account or database. They are not automatically shared across devices. Clearing this browser’s site data can remove them.</p>
            <p className="mt-4 leading-relaxed">A pilot-access request opens a draft email in your own email app. Nothing is sent until you choose to send it. The request does not include your finder answers or role shortlist by default.</p>
          </section>

          <section aria-labelledby="p-membership" className="mt-12 border-t border-ink pt-8">
            <h2 id="p-membership" className="headline text-2xl md:text-3xl">Member access</h2>
            <p className="mt-5 leading-relaxed">Member sign-in and any payment are handled through Whop. If you visit or use Whop, it may process account, device and transaction information under its own privacy terms. Do not send card details or identity documents to VELQ by email.</p>
            <p className="mt-4 leading-relaxed">Some member tools save progress and story drafts in the browser on your device. The current product does not provide automatic cross-device synchronisation. Check the terms preview for details about local records and backups.</p>
          </section>

          <section aria-labelledby="p-hosting" className="mt-12 border-t border-ink pt-8">
            <h2 id="p-hosting" className="headline text-2xl md:text-3xl">Website operations</h2>
            <p className="mt-5 leading-relaxed">The public website is hosted by Render. Hosting providers can process technical request information to deliver and protect a site. The exact logs, cookies or analytics in use, their retention periods, and the relevant provider arrangements have not yet been verified for this pilot. This page does not claim that tracking is absent.</p>
          </section>

          <section aria-labelledby="p-contact" className="mt-12 border-t border-ink pt-8">
            <h2 id="p-contact" className="headline text-2xl md:text-3xl">Contact and your choices</h2>
            <p className="mt-5 leading-relaxed">For a pilot question, email <a href="mailto:velqfinance@gmail.com" className="link-underline font-semibold">velqfinance@gmail.com</a>. Do not include sensitive information. The final notice must identify the service provider, explain how to make a privacy request, and confirm how requests will be handled before paid membership opens.</p>
            <p className="mt-4 leading-relaxed">This preview does not set out a complete list of legal rights, lawful bases or retention periods. Those details depend on confirming the service provider and the final data flows.</p>
          </section>
        </article>
      </main>
      <footer className="border-t border-ink">
        <div className="mx-auto flex max-w-[1100px] flex-wrap justify-between gap-3 px-5 py-6 md:px-8">
          <Link to="/terms" className="link-underline text-sm text-muted-foreground">Terms preview</Link>
          <a href="mailto:velqfinance@gmail.com" className="link-underline text-sm text-muted-foreground">Contact VELQ</a>
          <PreviewNote />
        </div>
      </footer>
    </div>
  );
}
