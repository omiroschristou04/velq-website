import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { FunnelHeading, FunnelShell } from "@/components/funnel-shell";
import { MAX_ROLES, QUESTIONS, ROLES, canConfirm, rankRoles, roleById, suggestion, validateAnswers, type Ranked } from "@/lib/velq/roles";
import { useFunnel } from "@/lib/velq/use-funnel";

export const Route = createFileRoute("/your-roles")({
  head: () => ({
    meta: [
      { title: "Your role results — VELQ" },
      { name: "description", content: "Your ranked interest alignment across sixteen UK finance roles, and a shortlist you choose." },
      { property: "og:title", content: "Your role results — VELQ" },
      { property: "og:description", content: "Ranked interest alignment and a shortlist of up to four finance roles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: YourRoles,
});

const ord = (n: number) => `${n}${n % 10 === 1 && n !== 11 ? "st" : n % 10 === 2 && n !== 12 ? "nd" : n % 10 === 3 && n !== 13 ? "rd" : "th"}`;

function RoleResult({ r, tieCount, big }: { r: Ranked; tieCount: number; big?: boolean }) {
  return (
    <article className={`border-[1.5px] border-ink p-5 ${big ? "md:p-6" : ""}`}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm font-medium">Ranked {ord(r.rank)}{tieCount > 1 ? ` (tied with ${tieCount - 1} other${tieCount > 2 ? "s" : ""})` : ""}</p>
        <p className="text-sm"><span className="display text-2xl">{r.score}</span> interest alignment</p>
      </div>
      <h3 className={`headline mt-2 [word-spacing:0.12em] ${big ? "text-2xl md:text-3xl" : "text-xl"}`}>{r.name}</h3>
      <p className="mt-3 text-muted-foreground">{r.work}</p>
      {r.reasons.length > 0 && <p className="mt-3 text-sm"><strong>Why it lines up:</strong> you rated {r.reasons.join(" and ")} highly, and this role weights {r.reasons.length > 1 ? "them" : "it"} strongly.</p>}
    </article>
  );
}

function YourRoles() {
  const { state, ready, update, reset } = useFunnel();
  const navigate = useNavigate();
  const valid = validateAnswers(state.answers).ok;
  const [mode, setMode] = useState<"none" | "suggested" | "own">("none");
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (ready && !valid) navigate({ to: "/find-your-roles", replace: true });
  }, [ready, valid, navigate]);
  useEffect(() => {
    if (ready && state.roles.length) setMode("own");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const ranked = useMemo(() => (valid ? rankRoles(state.answers) : []), [valid, state.answers]);
  const sug = useMemo(() => (ranked.length ? suggestion(ranked) : null), [ranked]);
  const tieSize = (score: number) => ranked.filter((r) => r.score === score).length;

  if (!ready || !valid || !sug) return <FunnelShell current={1}><p className="text-muted-foreground">Checking your answers…</p></FunnelShell>;

  const allTied = ranked[0]!.score === ranked[ranked.length - 1]!.score;
  const selected = state.roles;
  const setRoles = (roles: string[]) => update((s) => ({ ...s, roles, confirmed: false }));
  const toggle = (id: string) => {
    setNotice(null);
    if (selected.includes(id)) return setRoles(selected.filter((x) => x !== id));
    if (selected.length >= MAX_ROLES) return setNotice(`You can choose up to ${MAX_ROLES} roles. Remove one to add another.`);
    setRoles([...selected, id]);
  };
  const useSuggested = () => {
    setMode("suggested");
    setNotice(null);
    setRoles(sug.kind === "clear" ? sug.ids : sug.fixed);
  };
  const confirmRoles = () => {
    if (!canConfirm(selected)) return setNotice("Choose at least one role to continue.");
    update((s) => ({ ...s, confirmed: true }));
    navigate({ to: "/membership" });
  };

  const top = ranked.slice(0, 3);
  const rest = ranked.slice(3);
  const pickList = mode === "suggested" && sug.kind === "tie" ? [...sug.fixed, ...sug.tied].map((id) => roleById(id)!) : ROLES;

  return (
    <FunnelShell current={1}>
      <FunnelHeading>Your role results</FunnelHeading>
      <p className="mt-4 max-w-[60ch] text-lg text-muted-foreground">
        Interest alignment shows how your answers match the tasks each role emphasises. It is not a measure of aptitude, a prediction of offers or a validated career test.
      </p>

      {allTied && <p className="mt-6 max-w-[60ch] border-l-4 border-signal pl-4">You gave every rated task the same score, so all sixteen roles tie. Try separating what you enjoy most and least, or choose roles yourself below.</p>}

      <section aria-labelledby="top-h" className="mt-10">
        <FunnelHeading as="h2"><span id="top-h">Highest alignment</span></FunnelHeading>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {top.map((r) => <RoleResult key={r.id} r={r} tieCount={tieSize(r.score)} big />)}
        </div>
        {sug.kind === "tie" && !allTied && (
          <p className="mt-4 max-w-[60ch] border-l-4 border-signal pl-4">
            {sug.tied.length} roles share the score at third place ({sug.tied.map((id) => roleById(id)!.name).join(", ")}). We won’t pick between them for you.
          </p>
        )}
        <details className="mt-6 border-t border-ink pt-4">
          <summary className="cursor-pointer font-semibold">See the other {rest.length} roles</summary>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {rest.map((r) => <RoleResult key={r.id} r={r} tieCount={tieSize(r.score)} />)}
          </div>
        </details>
        <details className="mt-4 border-t border-border pt-4">
          <summary className="cursor-pointer font-semibold">How the scores are worked out</summary>
          <div className="reading mt-3 space-y-3 text-muted-foreground">
            <p>VELQ’s editors gave each role a weight from 1 to 5 for each of the ten tasks, based on how central that task is to typical entry-level work. These are editorial judgements, not research findings.</p>
            <p>For each role we add up weight × (your rating − 1) across the tasks you rated, and divide by the highest possible total for those tasks. Tasks you marked as not tried yet are left out. The result is shown from 0 to 100 and rounded; roles with the same rounded score share a rank.</p>
            <p>You need to rate at least six tasks for a useful comparison.</p>
          </div>
        </details>
      </section>

      <section aria-labelledby="short-h" className="mt-14 border-t-2 border-ink pt-10">
        <FunnelHeading as="h2"><span id="short-h">Choose your starting roles</span></FunnelHeading>
        <p className="mt-3 max-w-[60ch] text-muted-foreground">Pick 1 to {MAX_ROLES} roles. Your shortlist only sets where you start; every member gets the whole library and you can change roles later. Your ranking stays the same whatever you choose.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" aria-pressed={mode === "suggested"} onClick={useSuggested} className={mode === "suggested" ? "btn-ink" : "btn-line"}>Use suggested roles</button>
          <button type="button" aria-pressed={mode === "own"} onClick={() => { setMode("own"); setNotice(null); }} className={mode === "own" ? "btn-ink" : "btn-line"}>Choose my own roles</button>
        </div>

        {mode === "suggested" && (
          <p className="mt-5 max-w-[60ch]">
            {sug.kind === "clear"
              ? "We’ve added your top three. Review them below and change anything you like."
              : `We’ve added ${sug.fixed.length ? "your clear leaders" : "nothing yet"}. Because of the tie, choose ${sug.slots} more from the tied roles${sug.fixed.length ? "" : ""}, or add up to ${MAX_ROLES} in total.`}
          </p>
        )}

        {mode !== "none" && (
          <fieldset className="mt-6">
            <legend className="font-semibold">{mode === "suggested" && sug.kind === "tie" ? "Leaders and tied roles" : "All sixteen roles"} · {selected.length} of {MAX_ROLES} chosen</legend>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {pickList.map((r) => {
                const on = selected.includes(r.id);
                const rk = ranked.find((x) => x.id === r.id)!;
                return (
                  <li key={r.id}>
                    <button type="button" aria-pressed={on} onClick={() => toggle(r.id)} className={`flex w-full items-start justify-between gap-3 border-[1.5px] p-3 text-left transition-colors ${on ? "border-ink bg-ink text-ivory" : "border-ink/30 hover:border-ink"}`}>
                      <span><span className="font-semibold">{r.name}</span><span className={`block text-sm ${on ? "opacity-80" : "text-muted-foreground"}`}>Ranked {ord(rk.rank)} · {rk.score}</span></span>
                      <span aria-hidden="true" className="text-xl">{on ? "✓" : "+"}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {mode === "suggested" && sug.kind === "tie" && <button type="button" className="link-underline mt-3 text-sm" onClick={() => setMode("own")}>Show all sixteen roles</button>}
          </fieldset>
        )}
        <div aria-live="polite">{notice && <p className="mt-4 border-l-4 border-destructive pl-4 font-medium">{notice}</p>}</div>

        {selected.length > 0 && (
          <div className="sticky bottom-0 z-20 -mx-5 mt-8 border-t-2 border-ink bg-paper px-5 py-4 md:mx-0 md:border-2 md:px-6">
            <p className="font-semibold">Your shortlist ({selected.length} of {MAX_ROLES})</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {selected.map((id) => (
                <li key={id}><button type="button" onClick={() => toggle(id)} className="border border-ink px-3 py-1 text-sm hover:bg-ivory" aria-label={`Remove ${roleById(id)!.name}`}>{roleById(id)!.name} <span aria-hidden="true">×</span></button></li>
              ))}
            </ul>
            <button type="button" onClick={confirmRoles} className="btn-ink mt-4">Confirm shortlist <span aria-hidden="true">→</span></button>
          </div>
        )}

        {selected.length > 1 && (
          <details className="mt-6 border-t border-border pt-4">
            <summary className="cursor-pointer font-semibold">Compare your shortlist</summary>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {selected.map((id) => { const r = roleById(id)!; return (
                <div key={id} className="border border-ink/30 p-4"><p className="font-semibold">{r.name}</p><p className="mt-2 text-sm text-muted-foreground">{r.work}</p></div>
              ); })}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Full role guides are part of the membership.</p>
          </details>
        )}
      </section>

      <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <Link to="/find-your-roles" className="link-underline">Edit my answers</Link>
        <button type="button" className="link-underline" onClick={() => { if (confirm("Clear all answers and chosen roles?")) { reset(); navigate({ to: "/find-your-roles" }); } }}>Start again</button>
        <span className="text-muted-foreground">Based on {state.answers.filter((a) => (a ?? 0) > 0).length} of {QUESTIONS.length} tasks rated.</span>
      </div>
    </FunnelShell>
  );
}
