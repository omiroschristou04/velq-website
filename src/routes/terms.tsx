import { createFileRoute, Link } from "@tanstack/react-router";
import { PreviewNote, Wordmark } from "@/components/velq";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Membership terms — VELQ" },
      { name: "description", content: "Preview of the confirmed VELQ membership features and usage rules. Sales are not enabled on this website." },
      { property: "og:title", content: "VELQ membership terms" },
      { property: "og:description", content: "Preview of the confirmed membership features and usage rules. Sales are not enabled." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Terms,
});

function Terms() {
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
          <h1 className="headline [word-spacing:0.12em] text-4xl md:text-6xl">Membership terms</h1>

          <p className="mt-8 border-l-2 border-signal pl-5 text-lg leading-relaxed">
            <strong>Preview — not yet in force.</strong> This page describes the confirmed membership features and usage rules. Sales are not enabled on this website. Complete supplier, billing and privacy information must be available before purchases begin.
          </p>

          <section aria-labelledby="t-includes" className="mt-12 border-t border-ink pt-8">
            <h2 id="t-includes" className="headline text-2xl md:text-3xl">What membership includes</h2>
            <p className="mt-5 leading-relaxed">The VELQ library brings together finance role guides, application and interview preparation, original exercises, practical checklists, role-exploration tools, story drafts, an opportunity directory and a downloadable Excel application record. Membership includes all role guides; your shortlist only personalises your starting point.</p>
            <p className="mt-4 leading-relaxed">VELQ is a self-directed educational resource. Individual coaching, personal CV reviews, recruiter introductions and guaranteed interviews or offers are not included. Employers control recruitment decisions. References to employers do not imply their endorsement.</p>
          </section>

          <section aria-labelledby="t-opportunities" className="mt-12 border-t border-ink pt-8">
            <h2 id="t-opportunities" className="headline text-2xl md:text-3xl">Opportunity listings</h2>
            <p className="mt-5 leading-relaxed">The directory combines selected employer feeds, dated manually checked adverts and links to wider searches. Coverage is partial. One-off adverts retain their verification dates and do not automatically refresh. Check the employer advert for eligibility, deadlines and availability before applying.</p>
          </section>

          <section aria-labelledby="t-account" className="mt-12 border-t border-ink pt-8">
            <h2 id="t-account" className="headline text-2xl md:text-3xl">Your account and records</h2>
            <p className="mt-5 leading-relaxed">Use your own Whop account and keep your login private. A current browser and internet connection are required. Your questionnaire answers, role choices, progress and story drafts currently save in the browser on your device. Use the available export/import tools to keep a backup. Automatic cross-device synchronisation is not included.</p>
            <p className="mt-4 leading-relaxed">The downloadable Excel tracker is a blank workbook; it does not include your documents. It reserves cells for manually inserting CV and cover-letter PDF icons in desktop Excel. The workbook’s Start here sheet records a test in one Windows desktop setup; behaviour can vary across versions and spreadsheet apps. Keep separate copies of your submitted files.</p>
            <p className="mt-4 leading-relaxed">The reading library has no download button. Screenshots and copying cannot be completely prevented.</p>
          </section>

          <section aria-labelledby="t-personal" className="mt-12 border-t border-ink pt-8">
            <h2 id="t-personal" className="headline text-2xl md:text-3xl">Personal use</h2>
            <p className="mt-5 leading-relaxed">Use the resources for your own preparation. Do not resell, publicly repost or redistribute the library, or share membership credentials. You keep ownership of your own answers, stories and documents.</p>
            <p className="mt-4 leading-relaxed">You may keep using your legitimately downloaded workbook for your personal records after online membership access ends. This does not provide continuing access to the online library or future updates.</p>
          </section>

          <section aria-labelledby="t-access" className="mt-12 border-t border-ink pt-8">
            <h2 id="t-access" className="headline text-2xl md:text-3xl">Access and support</h2>
            <p className="mt-5 leading-relaxed">Whop provides platform and payment services under its own terms. VELQ supplies the membership resources. Contact <a href="mailto:velqfinance@gmail.com" className="link-underline font-semibold">velqfinance@gmail.com</a> about access problems, cancellations, refunds or complaints. Do not email card details or identity documents.</p>
            <p className="mt-4 leading-relaxed">Cancelling a renewal and requesting a refund are separate actions. The final billing, cancellation and refund policy will be shown before sales begin. No additional voluntary refund guarantee is promised by this preview.</p>
          </section>

          <section aria-labelledby="t-updates" className="mt-12 border-t border-ink pt-8">
            <h2 id="t-updates" className="headline text-2xl md:text-3xl">Updates and your rights</h2>
            <p className="mt-5 leading-relaxed">We may correct errors and improve resources. Material changes will be explained clearly. Contact support if access fails or a resource is not as described. Employer websites and other external services are controlled by their operators.</p>
            <p className="mt-4 leading-relaxed">Nothing here excludes statutory consumer rights, remedies for faulty or misdescribed content or services, or liability that cannot legally be excluded. VELQ does not guarantee a recruitment outcome and does not provide personal investment, legal or immigration advice.</p>
          </section>
        </article>
      </main>
      <footer className="border-t border-ink">
        <div className="mx-auto flex max-w-[1100px] flex-wrap justify-between gap-3 px-5 py-6 md:px-8">
          <p className="text-sm text-muted-foreground">Support: <a href="mailto:velqfinance@gmail.com" className="link-underline">velqfinance@gmail.com</a></p>
          <PreviewNote />
        </div>
      </footer>
    </div>
  );
}
