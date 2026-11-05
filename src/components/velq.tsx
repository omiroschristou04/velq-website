import { Link } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 display text-2xl tracking-tight ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <rect x="1" y="1" width="22" height="22" className="fill-ink" />
        <path d="M5 6 L12 19 L19 6" className="stroke-signal" strokeWidth="3" fill="none" />
      </svg>
      VELQ
    </span>
  );
}

export function PreviewNote({ className = "" }: { className?: string }) {
  return <p className={`label text-muted-foreground ${className}`}>Preview only. Membership is not yet open.</p>;
}

/** Scroll-reveal wrapper; content is visible without JS and with reduced motion. */
export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "section" | "li" }) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      el.classList.add("is-in");
      return;
    }
    el.classList.add("reveal");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export function HomeLink({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`folio link-underline ${className}`}>
      ← Back to home
    </Link>
  );
}

/** Original geometric motifs */
export function Motif({ kind, className = "" }: { kind: "orbit" | "steps" | "grid" | "half"; className?: string }) {
  if (kind === "orbit")
    return (
      <svg aria-hidden="true" viewBox="0 0 200 200" className={className}>
        <g className="spin-slow" style={{ transformOrigin: "100px 100px" }}>
          <circle cx="100" cy="100" r="92" fill="none" className="stroke-ink" strokeWidth="1.5" strokeDasharray="4 6" />
          <circle cx="100" cy="8" r="7" className="fill-signal" />
        </g>
        <circle cx="100" cy="100" r="54" className="fill-ink" />
        <rect x="84" y="84" width="32" height="32" className="fill-ivory" />
      </svg>
    );
  if (kind === "steps")
    return (
      <svg aria-hidden="true" viewBox="0 0 120 120" className={className}>
        <rect x="0" y="80" width="40" height="40" className="fill-ink" />
        <rect x="40" y="40" width="40" height="80" className="fill-ink" />
        <rect x="80" y="0" width="40" height="120" className="fill-signal" />
      </svg>
    );
  if (kind === "half")
    return (
      <svg aria-hidden="true" viewBox="0 0 120 120" className={className}>
        <path d="M0 120 A60 60 0 0 1 120 120 Z" className="fill-signal" />
        <rect x="0" y="0" width="60" height="60" className="fill-ink" />
      </svg>
    );
  return (
    <svg aria-hidden="true" viewBox="0 0 120 120" className={className}>
      {Array.from({ length: 36 }).map((_, i) => (
        <circle key={i} cx={10 + (i % 6) * 20} cy={10 + Math.floor(i / 6) * 20} r={i === 21 ? 6 : 2} className={i === 21 ? "fill-signal" : "fill-ink"} />
      ))}
    </svg>
  );
}
