const steps = [
  ["Choose your targets.", "Understand the work. Use the free interests questionnaire, then review and edit your shortlist."],
  ["Build your evidence.", "Connect your own experiences to the roles you are researching. Keep your examples genuine."],
  ["Practise deliberately.", "Prepare for the employer’s actual format. Notice where your reasoning or delivery needs work."],
  ["Review and improve.", "Record what happened, change one part of your approach and choose your next action."],
];

export function ProcessScene() {
  return <section data-scene="process" className="process-scene">
    <div className="process-pin">
      <div className="process-preface"><div className="route-caption">Exploring <span aria-hidden="true">────────→</span> Focused preparation</div><p>A more coherent process.<br/>Not a promise of an offer.</p></div>
      <h2 className="study-title">From scattered,<br/><em>to a next step.</em></h2>
      <div className="process-panels">{steps.map(([title,text],i)=><article className={`process-panel process-panel-${i}`} key={title}><div className="process-fill"/><div className="process-copy"><span className="study-counter">0{i+1}</span><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      <svg className="process-drawing" viewBox="0 0 1200 200" aria-hidden="true"><path className="broken-route" d="M0 150 L50 110 L100 155 L150 80 L210 150 L270 95 L330 150 L390 120 L450 150 L510 130 L570 150 L650 140 L750 150 H1200"/><path className="straight-route" d="M0 150 H1200"/><path className="reference-route" d="M0 70 H1200"/><g className="travelling-shape"><path className="shape-angular" d="M0 -35 L34 0 L0 35 L-34 0 Z"/><circle className="shape-round" r="34"/><circle r="3" className="shape-centre"/></g></svg>
    </div>
  </section>;
}