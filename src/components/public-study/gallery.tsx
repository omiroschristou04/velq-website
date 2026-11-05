import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductPreview, previewNames } from "./product-preview";

const descriptions = ["Explore sixteen role families. Rank interests, compare the work and choose one to four starting roles. Your shortlist is always yours to change.", "Build reusable evidence for CVs, cover letters and interviews. Keep your submitted documents and application details in your own Excel record.", "Prepare for assessments, technical questions and interviews. Practical tasks and knowledge checks help structure your next session."];

export function GalleryScene() {
  const [selected,setSelected] = useState(0);
  const [manual,setManual] = useState(false);
  const [start,setStart] = useState<number | null>(null);
  const choose = (n:number) => { setSelected((n+3)%3); setManual(true); };
  return <section id="inside" className="gallery-scene" data-scene="gallery" data-manual={manual ? selected : undefined}>
    <div className="gallery-pin">
      <div className="gallery-editorial"><h2 className="study-title">Your effort.<br/><em>Put to work.</em></h2><p>One membership. Every role guide.<br/>A starting point that can change with you.</p><div className="gallery-rows">{previewNames.map((name,i)=><Button key={name} variant="ghost" className={`gallery-row gallery-row-${i}`} aria-pressed={manual ? selected===i : undefined} onClick={()=>choose(i)}><span className="study-counter">0{i+1}</span><span>{name}</span><ArrowUpRight/></Button>)}</div><Link className="study-text-link" to="/find-your-roles">Start with the free questionnaire <ArrowUpRight/></Link></div>
      <div className="gallery-media" onTouchStart={(e)=>setStart(e.touches[0]?.clientX ?? null)} onTouchEnd={(e)=>{const x=e.changedTouches[0]?.clientX;if(start!==null && x!==undefined && Math.abs(x-start)>40) choose(selected+(x<start?1:-1));setStart(null);}} onKeyDown={(e)=>{if(e.key==="ArrowRight" || e.key==="ArrowLeft"){e.preventDefault();choose(selected+(e.key==="ArrowRight"?1:-1));}}}>
        {previewNames.map((name,i)=><figure className={`gallery-view gallery-view-${i}`} key={name}><ProductPreview view={i}/><figcaption>{descriptions[i]}</figcaption></figure>)}
        <div className="gallery-controls"><Button variant="ghost" size="icon" aria-label="Previous product preview" onClick={()=>choose(selected-1)}><ArrowLeft/></Button><span>{selected+1} / 3</span><Button variant="ghost" size="icon" aria-label="Next product preview" onClick={()=>choose(selected+1)}><ArrowRight/></Button></div>
      </div>
    </div>
  </section>;
}