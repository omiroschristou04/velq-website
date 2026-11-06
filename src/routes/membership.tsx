import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FunnelHeading, FunnelShell } from "@/components/funnel-shell";
import { PRICE, checkoutHref } from "@/lib/velq/checkout-config";
import { roleById, validateAnswers } from "@/lib/velq/roles";
import { useFunnel } from "@/lib/velq/use-funnel";
import { freeClaimHref, hasInvite } from "@/lib/velq/invite";
import { ShortlistTransfer } from "@/components/shortlist-transfer";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "VELQ membership — £19.99 every six months" },
      { name: "description", content: "Every member gets the whole VELQ library. Three-day trial, then £19.99 every six months." },
      { property: "og:title", content: "VELQ membership" },
      { property: "og:description", content: "The whole finance careers library. Three-day trial, then £19.99 every six months." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Membership,
});

const includes = [
  "Every role guide for all sixteen roles",
  "Application, assessment and interview preparation chapters",
  "Practical tasks and knowledge checks throughout",
  "Opportunity directory with partial employer feeds, a dated selection of employer-verified adverts and wider search links",
  "Downloadable Excel personal tracker for submitted applications, with CV and cover-letter attachment areas",
  "A starting point based on your shortlist, which you can change later",
];

function Membership() {
  const { state, ready } = useFunnel();
  const navigate = useNavigate();
  const [invited, setInvited] = useState(false);
  useEffect(() => { try { setInvited(hasInvite(window.sessionStorage)); } catch { setInvited(false); } }, []);
  const ok = validateAnswers(state.answers).ok && state.confirmed && state.roles.length > 0;
  useEffect(() => {
    if (!ready || ok) return;
    navigate({ to: validateAnswers(state.answers).ok ? "/your-roles" : "/find-your-roles", replace: true });
  }, [ready, ok, state.answers, navigate]);

  if (!ready || !ok) return <FunnelShell current={2}><p className="text-muted-foreground">Checking your shortlist…</p></FunnelShell>;
  const href = checkoutHref();
  const freeHref = freeClaimHref(invited, ok);

  return (
    <FunnelShell current={2}>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <FunnelHeading>Your membership</FunnelHeading>
          <p className="mt-5 text-xl">Your membership includes every role guide. Your shortlist only personalises your starting point.</p>
          <section aria-labelledby="sel-h" className="mt-8 border-t border-ink pt-5">
            <h2 id="sel-h" className="font-semibold">Your starting roles</h2>
            <ul className="mt-3 flex flex-wrap gap-2">{state.roles.map((id) => <li key={id} className="border border-ink px-3 py-1">{roleById(id)!.name}</li>)}</ul>
            <Link to="/your-roles" className="link-underline mt-4 inline-block text-sm">Change roles</Link>
          </section>
          <ShortlistTransfer roles={state.roles} />
          <section aria-labelledby="inc-h" className="mt-8 border-t border-ink pt-5">
            <h2 id="inc-h" className="font-semibold">Included for every member</h2>
            <ul className="mt-3 space-y-2">{includes.map((i) => <li key={i} className="flex gap-3"><span aria-hidden="true" className="text-signal">✓</span>{i}</li>)}</ul>
          </section>
        </div>
        {freeHref ? (
          <aside className="border-2 border-ink p-6 lg:col-span-5" aria-labelledby="inv-h">
            <h2 id="inv-h" className="headline text-3xl [word-spacing:0.12em]">Your invitation</h2>
            <p className="mt-3 text-lg">180 days free. Full library access. No card, paid renewal or cancellation required. Access ends automatically.</p>
            <p className="mt-4 text-sm text-muted-foreground">Copy your shortlist code first. After joining, choose Bring your shortlist in the library and paste it. Your roles aren’t sent to Whop automatically.</p>
            <a href={freeHref} className="btn-ink mt-6 w-full justify-center" rel="noopener">Activate free access on Whop <span aria-hidden="true">→</span></a>
            <p className="mt-4 text-sm text-muted-foreground">You’ll sign in or create a Whop account. The library opens only once Whop confirms your access.</p>
          </aside>
        ) : (
      <aside className="border-2 border-ink p-6 lg:col-span-5">
            <p className="display text-6xl">{PRICE.amount}</p>
            <p className="mt-2 text-lg">{PRICE.period}, after a {PRICE.trial}</p>
            <p className="mt-4 text-sm text-muted-foreground">Your three-day trial starts at checkout. If you don’t cancel before it ends, you’ll be charged {PRICE.amount} and membership renews {PRICE.period} until you cancel. Checkout, billing and cancellation are handled by Whop.</p>
            {href ? (
              <a href={href} className="btn-ink mt-6 w-full justify-center" rel="noopener">Continue to Whop <span aria-hidden="true">→</span></a>
            ) : (
              <>
                <p className="mt-6 font-semibold" role="status">Paid checkout is closed on this website.</p>
                <button type="button" disabled aria-disabled="true" className="btn-ink mt-3 w-full cursor-not-allowed justify-center opacity-50">Continue to Whop</button>
              </>
            )}
            <p className="mt-4 text-sm text-muted-foreground">Your shortlist stays in this browser. It isn’t sent to Whop automatically or saved to a member account.</p>
          </aside>
        )}
      </div>
    </FunnelShell>
  );
}
