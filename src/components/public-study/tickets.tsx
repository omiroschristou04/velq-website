import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ticketGroups = [
  {title:"Direction", description:"Understand the work before choosing where to focus.", items:["16 role families", "10-question interests explorer", "A manually editable shortlist"]},
  {title:"Applications", description:"Turn your own experience into evidence you can use.", items:["CV & cover-letter preparation", "Five experience-story drafts", "Excel personal application record"]},
  {title:"Preparation", description:"Build understanding. Practise the format. Review your next move.", items:["35 guided sessions", "70 original knowledge checks", "Assessments & interviews"]},
];

export function TicketCollection({ compact = false }: { compact?: boolean }) {
  return <div className={`ticket-collection ${compact ? "ticket-collection-compact" : ""}`}>{ticketGroups.map((g,i)=><article className={`study-ticket ticket-${i}`} key={g.title}><div className="ticket-rotator"><div className="ticket-back" aria-hidden="true"><span>VELQ</span><span>Included in one membership</span></div><div className="ticket-front"><div className="ticket-body"><span className="study-counter">0{i+1} / Included resources</span><h3>{g.title}</h3><p>{g.description}</p><ul>{g.items.map(t=><li key={t}>{t}</li>)}</ul></div><div className="ticket-stub"><span>One library. All roles.</span><Button asChild variant="link"><Link to="/find-your-roles">Find your roles <ArrowUpRight/></Link></Button></div></div></div></article>)}</div>;
}