import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Link } from "@tanstack/react-router";
import { FileText, Map, ListChecks, X, RotateCcw, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductPreview } from "./product-preview";
import { TicketCollection } from "./tickets";

const files = [
  {id:"roles", title:"Role map", icon:Map},
  {id:"stories", title:"Story bank", icon:FileText},
  {id:"record", title:"Application record", icon:FileText},
  {id:"checklist", title:"Preparation checklist", icon:ListChecks},
] as const;
type FileId = typeof files[number]["id"];
type WindowState = { id:FileId; x:number; y:number; z:number };

export function WorkspaceScene() {
  const [windows,setWindows] = useState<WindowState[]>([]);
  const [checks,setChecks] = useState<string[]>([]);
  const [serial,setSerial] = useState(5);
  const desktop = useRef<HTMLDivElement>(null);
  const buttons = useRef<Partial<Record<FileId,HTMLButtonElement>>>({});
  const drag = useRef<{id:FileId; x:number; y:number; px:number; py:number} | null>(null);
  const focused = useRef<FileId | null>(null);
  useEffect(() => {
    const newest = windows.reduce<WindowState | undefined>((a,w)=>!a || w.z>a.z?w:a,undefined);
    if (newest && focused.current !== newest.id) {
      desktop.current?.querySelector<HTMLElement>(`[data-window="${newest.id}"]`)?.focus({preventScroll:true});
      focused.current = newest.id;
    }
  }, [windows]);
  const activate = (id:FileId) => {setSerial(n=>n+1);setWindows(ws=>ws.map(w=>w.id===id?{...w,z:serial+1}:w));};
  const open = (id:FileId) => {setSerial(n=>n+1);setWindows(ws=>ws.some(w=>w.id===id)?ws.map(w=>w.id===id?{...w,z:serial+1}:w):[...ws,{id,x:Math.min(180+ws.length*28,280),y:55+ws.length*24,z:serial+1}]);};
  const close = (id:FileId) => {setWindows(ws=>ws.filter(w=>w.id!==id));buttons.current[id]?.focus();};
  const move = (e:PointerEvent<HTMLElement>) => {
    const d=drag.current; const area=desktop.current;
    if (!d || !area) return;
    const windowElement=area.querySelector<HTMLElement>(`[data-window="${d.id}"]`);
    const width=windowElement?.offsetWidth ?? 420;
    const height=windowElement?.offsetHeight ?? 360;
    const x=Math.max(0,Math.min(area.clientWidth-width,d.x+e.clientX-d.px));
    const y=Math.max(0,Math.min(area.clientHeight-height,d.y+e.clientY-d.py));
    setWindows(ws=>ws.map(w=>w.id===d.id?{...w,x,y}:w));
  };
  return <section id="workspace" data-scene="workspace" className="workspace-scene"><div className="workspace-pin"><div className="device-shell"><div className="device-bar"><span>VELQ preparation desktop</span><span>Interface preview</span></div><div className="preparation-desktop" ref={desktop}>
    <div className="desktop-grid" aria-hidden="true"/><div className="desktop-title" aria-hidden="true">A little more<br/><em>headspace.</em></div>
    <div className="desktop-files">{files.map(f=><Button key={f.id} ref={el=>{if(el) buttons.current[f.id]=el; else delete buttons.current[f.id];}} variant="ghost" className="desktop-file" onClick={()=>open(f.id)} aria-haspopup="dialog"><f.icon/><span>{f.title}</span></Button>)}</div>
    <div className="membership-mini"><div className="mini-bar">VELQ / Included resources</div><TicketCollection compact/></div>
    {windows.map(w=>{const file=files.find(f=>f.id===w.id);return <section key={w.id} data-window={w.id} className="desktop-window" role="dialog" aria-modal="false" aria-label={`${file?.title} interface preview`} tabIndex={-1} style={{left:w.x,top:w.y,zIndex:w.z}} onPointerDown={()=>activate(w.id)} onKeyDown={e=>{if(e.key==="Escape"){e.stopPropagation();close(w.id);}}}>
      <div className="window-title" onPointerDown={e=>{if((e.target as HTMLElement).closest("button") || window.matchMedia("(max-width: 767px)").matches)return;drag.current={id:w.id,x:w.x,y:w.y,px:e.clientX,py:e.clientY};e.currentTarget.setPointerCapture(e.pointerId);}} onPointerMove={move} onPointerUp={()=>{drag.current=null;}} onPointerCancel={()=>{drag.current=null;}}><span>{file?.title}</span><div><Button variant="ghost" size="icon" title="Reset window position" aria-label={`Reset ${file?.title} position`} onClick={()=>setWindows(ws=>ws.map(a=>a.id===w.id?{...a,x:160,y:55}:a))}><RotateCcw/></Button><Button variant="ghost" size="icon" title="Close window" aria-label={`Close ${file?.title}`} onClick={()=>close(w.id)}><X/></Button></div></div>
      <div className="window-content"><p className="window-preview-note">Interface preview · No member content</p>{w.id==="roles"?<><ProductPreview view={0}/><Button asChild variant="link"><Link to="/find-your-roles">Open the free interests questionnaire <ArrowUpRight/></Link></Button></>:w.id==="stories"?<><h3>Your own experience,<br/><em>in your own words.</em></h3><p>Membership includes five story drafts. This blank structure illustrates the workspace, not a lesson.</p>{["Situation", "Your action", "Result", "What you learned"].map(s=><div className="blank-story" key={s}><span>{s}</span><i/></div>)}</>:w.id==="record"?<><h3>Remember<br/><em>what you submitted.</em></h3><p>The member Excel download holds your personal application record, including CV and cover-letter attachment areas.</p><div className="empty-record"><span>Application</span><span>Stage</span><span>Next action</span>{Array.from({length:9},(_,i)=><i key={i}/>)}</div><p>The opportunity directory is a separate discovery tool. Neither the workbook nor directory records are public here.</p></>:<><h3>A first<br/><em>useful session.</em></h3><p>An exploration checklist for this preview. These ticks are temporary, not member progress.</p>{["Research what your target roles involve", "Check the employer’s graduation-date eligibility", "Choose one preparation priority"].map(s=><label className="preview-check" key={s}><input type="checkbox" checked={checks.includes(s)} onChange={()=>setChecks(c=>c.includes(s)?c.filter(v=>v!==s):[...c,s])}/><span>{s}</span></label>)}<p aria-live="polite">{checks.length} / 3 checked in this preview</p></>}</div>
    </section>;})}
    <div className="desktop-dock"><span>VELQ / Your preparation space</span><Button variant="ghost" onClick={()=>setWindows(ws=>ws.map((w,i)=>({...w,x:160+i*22,y:50+i*22})))}><RotateCcw/>Reset windows</Button></div>
  </div><div className="device-chin"><span>VELQ</span></div></div><p className="workspace-outro">Tools for the work.<br/><em>Space for your own thinking.</em></p></div></section>;
}