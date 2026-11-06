import { createFileRoute, Link } from "@tanstack/react-router";
import { FunnelHeading, FunnelShell } from "@/components/funnel-shell";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Member library — VELQ" },
      { name: "description", content: "The full VELQ library is available through your Whop membership." },
      { property: "og:title", content: "VELQ member library" },
      { property: "og:description", content: "The full library is available through your Whop membership." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LibraryPlaceholder,
});

function LibraryPlaceholder() {
  return (
    <FunnelShell current={null}>
      <div className="max-w-[60ch]">
        <FunnelHeading>Member library</FunnelHeading>
        <p className="mt-5 text-xl">The full library is available through your Whop membership.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="btn-ink" href="https://whop.com/velq-website-onrender-com/exp_64cDl3rcw2jNzk/app/">Open member library on Whop</a>
          <Link to="/your-roles" className="btn-line">Back to your results</Link>
          <Link to="/find-your-roles" className="btn-line">Find your roles</Link>
        </div>
      </div>
    </FunnelShell>
  );
}
