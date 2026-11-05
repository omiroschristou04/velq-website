import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { shortlistCode } from "@/lib/velq/shortlist-code";

export function ShortlistTransfer({ roles }: { roles: string[] }) {
  const code = shortlistCode(roles);
  const ref = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "ok" | "fail">("idle");
  useEffect(() => setStatus("idle"), [code]);
  if (!code) return null;

  const copy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("no clipboard");
      await navigator.clipboard.writeText(code);
      setStatus("ok");
    } catch {
      ref.current?.focus();
      ref.current?.select();
      setStatus("fail");
    }
  };

  return (
    <section aria-labelledby="xfer-h" className="mt-8 border-t border-ink pt-5">
      <h2 id="xfer-h" className="font-semibold">Take your roles into Whop</h2>
      <p className="mt-2 text-muted-foreground">Copy this code. In the Whop library, choose Bring your shortlist and paste it once. It saves your chosen roles on that device; it does not transfer questionnaire answers or sync accounts.</p>
      <label htmlFor="xfer-code" className="mt-4 block text-sm font-medium">Your shortlist code</label>
      <div className="mt-1 flex flex-wrap gap-2">
        <input id="xfer-code" ref={ref} readOnly value={code} onFocus={(e) => e.currentTarget.select()} className="min-w-0 flex-1 border-[1.5px] border-ink bg-paper px-3 py-2 font-mono text-sm" />
        <button type="button" onClick={copy} className="btn-line">Copy shortlist</button>
      </div>
      <p aria-live="polite" className="mt-2 text-sm">
        {status === "ok" && "Copied."}
        {status === "fail" && "Couldn’t copy automatically. The code is selected — copy it manually."}
      </p>
      <Link to="/your-roles" className="link-underline mt-2 inline-block text-sm">Edit roles</Link>
    </section>
  );
}
