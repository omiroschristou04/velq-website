import { ArrowUpRight, Check, FileText, Map, Layers } from "lucide-react";

export const previewNames = ["Direction", "Applications", "Preparation"] as const;

/** Original presentation artwork: public role names and empty workflow structures only. */
export function ProductPreview({ view = 0 }: { view?: number }) {
  return <div className={`product-art product-art-${view}`}>
    <div className="art-top"><span>VELQ / {previewNames[view]}</span><span>Interface preview</span></div>
    <div className="art-layout">
      <aside className="art-sidebar"><span className="art-brand">V<span>↗</span></span><Map/><Layers/><FileText/><span className="art-sidebar-bottom">Your next move</span></aside>
      <div className="art-content">
        {view === 0 ? <><p className="art-caption">Explore before you choose</p><h3>Find your<br/><em>direction.</em></h3><div className="role-orbit" aria-hidden="true"><span>Asset management</span><span>Risk</span><span>Investment banking</span><span>Wealth management</span><div className="orbit-centre">You<ArrowUpRight/></div></div><div className="art-bottom"><span>10 questions · 16 role families</span><span>Interest alignment, not aptitude</span></div></> : view === 1 ? <><p className="art-caption">A place for your own evidence</p><h3>Make it<br/><em>reusable.</em></h3><div className="evidence-sheet"><div><FileText/><span>Experience story</span><span>Blank structure</span></div>{["Situation", "Your action", "Result", "What you learned"].map((s)=><p key={s}><span>{s}</span><i/></p>)}</div><div className="art-bottom"><span>Five story drafts in membership</span><span>Your words. Your evidence.</span></div></> : <><p className="art-caption">Give each session a purpose</p><h3>One useful<br/><em>next step.</em></h3><div className="practice-sheet">{["Choose a focus", "Prepare for the format", "Record what changed"].map((s,i)=><div key={s}><span className="practice-number">0{i+1}</span><span>{s}</span><Check/></div>)}<div className="practice-route" aria-hidden="true"><span/><span/><span/><span/></div></div><div className="art-bottom"><span>Preparation · review · progress</span><span>Full sessions require membership</span></div></>}
      </div>
    </div>
  </div>;
}