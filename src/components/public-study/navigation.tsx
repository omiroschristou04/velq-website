import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/velq";

const links = [["#pathway","Spring weeks"],["#approach","The approach"],["#inside","Inside VELQ"],["#membership","Membership"]];
export function StudyNavigation() {
  const [open,setOpen]=useState(false);
  const dialog=useRef<HTMLDivElement>(null);
  const trigger=useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    if(!open)return;
    const previous=document.body.style.overflow;
    document.body.style.overflow="hidden";
    dialog.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const key=(e:KeyboardEvent)=>{
      if(e.key==="Escape")setOpen(false);
      if(e.key!=="Tab")return;
      const items=dialog.current?.querySelectorAll<HTMLElement>('a,button');
      const first=items?.[0],last=items?.[items.length-1];
      if(e.shiftKey && document.activeElement===first){e.preventDefault();last?.focus();}
      else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first?.focus();}
    };
    document.addEventListener("keydown",key);
    return()=>{document.body.style.overflow=previous;document.removeEventListener("keydown",key);trigger.current?.focus();};
  },[open]);
  return <><header className="study-nav"><Link to="/" aria-label="VELQ home" className="compact-wordmark"><Wordmark /></Link><nav aria-label="Primary">{links.map(([url,text])=><a href={url} key={url}>{text}</a>)}</nav><Button asChild variant="link" className="nav-questionnaire"><Link to="/find-your-roles">Find your roles <ArrowUpRight/></Link></Button><Button ref={trigger} variant="ghost" size="icon" className="menu-trigger" aria-label="Open navigation" aria-expanded={open} onClick={()=>setOpen(true)}><Menu/></Button></header>{open && <div ref={dialog} className="study-menu" role="dialog" aria-modal="true" aria-label="Navigation"><div className="menu-top"><Wordmark className="text-[28px]" /><Button variant="ghost" size="icon" aria-label="Close navigation" onClick={()=>setOpen(false)}><X/></Button></div><nav>{links.map(([url,text])=><a href={url} key={url} onClick={()=>setOpen(false)}>{text}</a>)}<Link to="/find-your-roles">Find your roles ↗</Link></nav><a href="mailto:velqfinance@gmail.com">velqfinance@gmail.com</a><p>Preview only. Membership is not yet open.</p></div>}</>;
}
