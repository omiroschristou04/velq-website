import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PreviewNote, Wordmark } from "@/components/velq";

const steps = [
  { to: "/find-your-roles", label: "Questions" },
  { to: "/your-roles", label: "Your roles" },
  { to: "/membership", label: "Membership" },
] as const;

export function FunnelShell({ current, children }: { current: 0 | 1 | 2 | null; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:p-3 focus:text-ivory">Skip to content</a>
      <header className="border-b border-ink">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-3 px-5 py-3 md:px-8">
          <Link to="/" aria-label="VELQ home"><Wordmark className="text-xl" /></Link>
          {current !== null && (
            <ol aria-label="Steps" className="flex gap-4 text-sm">
              {steps.map((s, i) => (
                <li key={s.to} aria-current={i === current ? "step" : undefined} className={i === current ? "font-semibold underline decoration-signal decoration-2 underline-offset-4" : "text-muted-foreground"}>
                  {i + 1}. {s.label}
                </li>
              ))}
            </ol>
          )}
        </div>
      </header>
      <main id="main" className="mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-14">{children}</main>
      <footer className="border-t border-ink">
        <div className="mx-auto flex max-w-[1100px] flex-wrap justify-between gap-3 px-5 py-6 md:px-8">
          <p className="text-sm text-muted-foreground">Your answers stay in this browser.</p>
          <p className="text-sm text-muted-foreground">Support: <a href="mailto:velqfinance@gmail.com" className="link-underline">velqfinance@gmail.com</a></p>
          <Link to="/terms" className="link-underline text-sm text-muted-foreground">Terms preview</Link>
          <PreviewNote />
        </div>
      </footer>
    </div>
  );
}

/** Heading with explicit word spacing for new funnel headings. */
export function FunnelHeading({ children, as: Tag = "h1", className = "" }: { children: ReactNode; as?: "h1" | "h2"; className?: string }) {
  return <Tag className={`headline [word-spacing:0.12em] ${Tag === "h1" ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"} ${className}`}>{children}</Tag>;
}
