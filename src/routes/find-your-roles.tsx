import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { FunnelHeading, FunnelShell } from "@/components/funnel-shell";
import { QUESTIONS, validateAnswers, type Answer } from "@/lib/velq/roles";
import { useFunnel } from "@/lib/velq/use-funnel";

export const Route = createFileRoute("/find-your-roles")({
  head: () => ({
    meta: [
      { title: "Find your roles — VELQ" },
      { name: "description", content: "A free ten-question interests questionnaire that compares sixteen UK finance roles. Your answers stay in your browser." },
      { property: "og:title", content: "Find your roles — VELQ" },
      { property: "og:description", content: "Ten questions. Sixteen finance roles. A ranked interest comparison, free." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: FindYourRoles,
});

const SCALE: { v: Exclude<Answer, null>; label: string }[] = [
  { v: 1, label: "1 — Not for me" },
  { v: 2, label: "2 — Not much" },
  { v: 3, label: "3 — Neutral" },
  { v: 4, label: "4 — Quite enjoy it" },
  { v: 5, label: "5 — Really enjoy it" },
  { v: 0, label: "I haven’t tried this enough to judge" },
];

function FindYourRoles() {
  const { state, ready, update, reset, saved } = useFunnel();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const step = state.step;
  const q = QUESTIONS[step]!;
  const value = state.answers[step];
  const total = QUESTIONS.length;
  const answered = state.answers.filter((a) => a !== null).length;

  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    headingRef.current?.focus();
  }, [step]);

  const setAnswer = (v: Exclude<Answer, null>) => {
    setError(null);
    update((s) => ({ ...s, answers: s.answers.map((a, i) => (i === step ? v : a)), confirmed: false }));
  };
  const go = (n: number) => { setError(null); update((s) => ({ ...s, step: n })); };

  const next = () => {
    if (value === null) return setError("Choose an answer to continue.");
    if (step < total - 1) return go(step + 1);
    const v = validateAnswers(state.answers);
    if (!v.ok) {
      if (v.reason === "unanswered") {
        const miss = state.answers.findIndex((a) => a === null);
        go(miss);
        return setError(`Question ${miss + 1} still needs an answer.`);
      }
      return setError(`${v.message} You’ve marked ${state.answers.filter((a) => a === 0).length} as not tried yet. Go back and rate a few more if you can.`);
    }
    navigate({ to: "/your-roles" });
  };

  if (!ready) return <FunnelShell current={0}><p className="text-muted-foreground">Loading your questions…</p></FunnelShell>;

  return (
    <FunnelShell current={0}>
      <div className="max-w-[68ch]">
        <p className="text-sm font-medium">Question {step + 1} of {total}</p>
        <div className="mt-2 h-1.5 bg-muted" role="progressbar" aria-label="Questionnaire progress" aria-valuemin={0} aria-valuemax={total} aria-valuenow={answered}>
          <div className="h-full bg-signal transition-[width] duration-500" style={{ width: `${(answered / total) * 100}%` }} />
        </div>

        <form className="mt-10" onSubmit={(e) => { e.preventDefault(); next(); }}>
          <fieldset aria-describedby="q-hint">
            <legend className="w-full">
              <FunnelHeading className="!text-3xl md:!text-5xl"><span ref={headingRef} tabIndex={-1} className="outline-none">{q.title}</span></FunnelHeading>
              <span className="mt-4 block text-xl">{q.prompt}</span>
            </legend>
            <p id="q-hint" className="mt-3 text-muted-foreground">{q.hint}</p>
            <div className="mt-8 grid gap-2">
              {SCALE.map((o) => {
                const sel = value === o.v;
                return (
                  <label key={o.v} className={`flex cursor-pointer items-center gap-3 border-[1.5px] p-4 text-lg transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-signal ${sel ? "border-ink bg-ink text-ivory" : "border-ink/30 hover:border-ink"} ${o.v === 0 ? "mt-3" : ""}`}>
                    <input type="radio" name="answer" value={o.v} checked={sel} onChange={() => setAnswer(o.v)} className="h-5 w-5 accent-signal" />
                    {o.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
          <div aria-live="polite" className="min-h-[2rem]">{error && <p className="mt-4 border-l-4 border-destructive pl-4 font-medium">{error}</p>}</div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button type="button" className="btn-line" disabled={step === 0} onClick={() => go(step - 1)} aria-disabled={step === 0}>← Back</button>
            <button type="submit" className="btn-ink">{step === total - 1 ? "See my results" : "Next"} <span aria-hidden="true">→</span></button>
          </div>
        </form>

        <details className="mt-12 border-t border-ink pt-4">
          <summary className="cursor-pointer font-semibold">Review or edit your answers</summary>
          <ol className="mt-4 divide-y divide-border">
            {QUESTIONS.map((qq, i) => (
              <li key={qq.title} className="flex items-center justify-between gap-3 py-2 text-sm">
                <span>{i + 1}. {qq.title}: <strong>{state.answers[i] === null ? "Not answered" : state.answers[i] === 0 ? "Not tried yet" : state.answers[i]}</strong></span>
                <button type="button" className="link-underline" onClick={() => go(i)}>Edit</button>
              </li>
            ))}
          </ol>
        </details>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>{saved ? "Your answers stay in this browser. No email, no account." : "Your answers are temporary in this tab. Refreshing or closing it clears them."}</p>
          <button type="button" className="link-underline text-foreground" onClick={() => { if (confirm("Clear all answers and chosen roles?")) reset(); }}>Clear answers</button>
        </div>
        <p className="mt-6 text-sm"><Link to="/" className="link-underline">← Back to home</Link></p>
      </div>
    </FunnelShell>
  );
}
