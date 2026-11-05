import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PreviewNote } from "@/components/velq";
import { useStudyMotion } from "@/components/public-study/motion";
import { StudyNavigation } from "@/components/public-study/navigation";
import { ProductPreview } from "@/components/public-study/product-preview";
import { ProcessScene } from "@/components/public-study/process";
import { GalleryScene } from "@/components/public-study/gallery";
import { TicketCollection } from "@/components/public-study/tickets";
import { WorkspaceScene } from "@/components/public-study/workspace";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "VELQ — Your finance career. A clearer way in." },
    { name: "description", content: "Explore UK finance roles, build your evidence and prepare for the next round. Start with the free ten-question interests questionnaire. Unpublished membership preview." },
    { property: "og:title", content: "VELQ — Your finance career. A clearer way in." },
    { property: "og:description", content: "From spring-week exploration to graduate preparation. Find your roles with the free interests questionnaire." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "robots", content: "noindex, nofollow" },
  ] }), component: Home,
});

const faq = [
  ["Is VELQ for me if I’m still exploring?", "Yes. Begin with the role map and the work different teams do. You can choose a first area to explore without committing to a lifelong career decision."],
  ["What if I’m already applying?", "Start with your biggest bottleneck: choosing targets, tailoring, assessments or interviews. Use the relevant guide, produce one useful output and record your next action."],
  ["Will this help me prepare for assessment centres?", "The membership contains an assessment-centre field guide and interview playbook. They cover preparation, case and group exercises, presentations and reviewing your performance. Always confirm the actual format with the employer."],
  ["Does it include coaching or application reviews?", "This is a self-directed resource membership. Individual CV reviews, coaching calls and recruiter introductions are not included."],
  ["How do the opportunity directory and application tracker differ?", "The member opportunity directory helps you discover opportunities with role and programme filters, employer careers sources and direct links, partial employer-controlled feeds, a dated selection of one-off employer-verified adverts and wider search links. Coverage is partial, not comprehensive or real-time. Feeds refresh when you open the directory and may use a server cache up to 15 minutes old. One-off adverts retain their verification date and need manual rechecking with the employer. The downloadable Excel tracker is separate: a personal record of applications you have submitted, with stages, deadlines and CV and cover-letter attachment areas. The directory and private Excel download require membership."],
  ["Can the role explorer tell me my ideal career?", "No. It ranks areas to research using your stated interests. It is an exploratory tool, not a validated aptitude test, hiring prediction or career decision. Your answers are processed in your browser and are not sent to VELQ."],
  ["Will my progress follow me between devices?", "Progress, role choices and story drafts currently stay in the browser on your device. Export a backup before switching devices or clearing browser data, then import it in the library. Account-based syncing is not included."],
  ["How do the checklists and knowledge checks work?", "Each session contains two practical tasks and two multiple-choice questions. Tick the tasks and answer both questions correctly to mark the session complete. You can retry with explanations. Completion records your activity, rather than certifying professional competence."],
  ["Can VELQ guarantee an interview or offer?", "No. VELQ helps structure your preparation. Employers make hiring decisions. Use official employer information and your university careers service alongside the resources."],
  ["How much is membership and how long does access last?", "The current Whop plan is £19.99 every six months with a three-day trial. This preview does not take payment. We still need to verify the member journey, renewal and cancellation disclosures, and applicable refund terms before directing customers to checkout."],
];

function Home() {
  const ref = useStudyMotion();
  return <div ref={ref} className="public-study">
    <a className="study-skip" href="#main">Skip to content</a>
    <StudyNavigation/>
    <main id="main">
      <section className="study-opening">
        <div className="giant-wordmark" aria-label="VELQ">VELQ<span className="wordmark-cut" aria-hidden="true"/></div>
        <div className="opening-meta"><p>UK finance career preparation.<br/>For students finding their way.</p><nav aria-label="Opening navigation"><a href="#approach">The approach</a><a href="#inside">Inside VELQ</a><a href="#membership">Membership</a></nav><a className="serif-contact" href="mailto:velqfinance@gmail.com">velqfinance@gmail.com</a></div>
        <div className="offset-intro"><h1>Your finance career.<br/><em>A clearer way in.</em></h1><p>The applications. The assessments. The feeling you should be doing more. Choose your targets. Build your evidence. Prepare for the next round.</p><Button asChild variant="link" className="study-action"><Link to="/find-your-roles">Find your roles <ArrowUpRight/></Link></Button></div>
        <div className="opening-bottom"><span>Spring weeks → Graduate roles</span><a href="#product-scene">Take a closer look <ArrowDown/></a><span>Free interests questionnaire</span></div>
      </section>
      <section id="product-scene" data-scene="reel" className="growing-scene"><div className="growing-pin"><div className="growing-product"><ProductPreview/><div className="reel-overlay"><span>Direction, before the next application.</span><Link to="/find-your-roles" className="reel-link" aria-label="Find your roles from the interface preview"><ArrowUpRight/></Link></div></div></div></section>
      <div className="equation-strip"><span>Direction</span><b>+</b><span>Evidence</span><b>+</b><span>Practice</span><b>=</b><span>A clearer process</span></div>
      <section className="study-editorial">
        <h2 className="study-title">You’re putting<br/>in the hours.<br/><em>Find the thread.</em></h2>
        <div className="editorial-right"><div className="scattered-art" aria-label="Original illustration of scattered preparation tabs"><span>cv_final_v6</span><span>Which role?</span><span>Next deadline</span><span>Test preparation</span><div className="thread-line"/><p>Effort → Direction</p></div><h3>Less searching.<br/><em>More putting it to work.</em></h3></div>
        <div className="editorial-copy"><p>Another application. Another test. Another evening trying to work out whether you’re even targeting the right roles.</p><p>When every employer asks for something different, effort can feel hard to measure. A rejection leaves you wondering what to change. University carries on around it all.</p><p>VELQ gives that effort a structure. Understand the industry, build credible evidence, prepare for the stage ahead and review what you learn.</p></div>
        <p className="editorial-welcome">You do not need to do everything today.<br/><em>You need to know what matters next.</em></p>
      </section>
      <section id="pathway" className="spring-entry">
        <div><span className="study-counter">Spring-week exploration</span><h2 className="study-title">Start curious.<br/><em>Not certain.</em></h2><p>Learn what finance roles actually involve before trying to sound like you already know everything. Spring programmes can help you explore teams and build an informed next step.</p></div>
        <div className="spring-route"><h3>First year? Explore first.</h3><p>First-year status alone does not establish eligibility. Check each employer’s current advert: graduation date, degree length and other programme requirements decide who can apply.</p><ol><li><span>01</span><div>Find your interests<p>Take the free ten-question interests questionnaire. It explores interest alignment, not aptitude or your odds of admission.</p></div></li><li><span>02</span><div>Choose your starting roles<p>Review the ranked summaries. Keep suggestions or manually choose one to four roles; edit your shortlist whenever you need.</p></div></li><li><span>03</span><div>Prepare one useful next step<p>In the protected member library, start with a first-session preparation focus. The full library is not available in this public preview.</p></div></li></ol><Button asChild variant="link" className="study-action"><Link to="/find-your-roles">Explore your spring-week direction <ArrowUpRight/></Link></Button></div>
        <p className="stage-line">Spring weeks <span> / </span> Internships <span> / </span> Placements <span> / </span> Graduate roles</p>
      </section>
      <ProcessScene/>
      <GalleryScene/>
      <section className="directory-band"><h2>Discover opportunities.<br/><em>Keep your own record.</em></h2><div><p>The member opportunity directory offers role and programme filters, direct employer links, partial employer feeds, dated employer-verified adverts and wider search links. Coverage is not comprehensive or real-time; recheck current details with the employer.</p><p>The Excel personal application record is separate: keep submitted applications, stages, deadlines, document versions and CV and cover-letter attachments. Both tools require membership.</p></div></section>
      <section className="focus-scene"><p>A little less noise.<br/><em>A more useful next move.</em></p><span>Explore. Build. Practise. Review.</span></section>
      <section data-scene="tickets" className="ticket-scene"><div className="ticket-pin"><div className="ticket-heading"><h2 className="study-title">All included.<br/><em>One membership.</em></h2><p>Your shortlist personalises your starting point.<br/>It does not restrict the library.</p></div><TicketCollection/></div></section>
      <WorkspaceScene/>
      <section id="membership" className="membership-editorial"><div><h2 className="study-title">Put your effort<br/><em>behind a plan.</em></h2><p>For students and graduates exploring UK finance—whether you’re choosing your first targets, applying actively or preparing for the next round.</p></div><div className="membership-price"><p>Membership preview</p><div className="price-amount">£19.99</div><p>every six months, after a three-day trial</p><p>Start with a three-day trial. If you don’t cancel before it ends, you’ll be charged £19.99 and membership renews every six months until you cancel. Every member gets the whole library.</p><p className="price-caveat">This preview does not accept payment. Member access, checkout, renewal and cancellation details, and applicable refund terms still need to be verified before launch.</p><strong>Checkout is not open yet.</strong><Button asChild variant="link" className="study-action"><Link to="/find-your-roles">Start the free questionnaire <ArrowUpRight/></Link></Button></div></section>
      <section className="expectations-section"><div><h2 className="study-title">Clear expectations.<br/><em>From the start.</em></h2><p>Self-directed resources, not coaching or a hiring promise.</p><ul>{["Comprehensive live vacancy coverage", "Cross-device syncing", "Coaching calls", "Personal CV or application reviews", "Guaranteed interviews or offers"].map(s=><li key={s}>{s} — not included</li>)}</ul></div><div className="study-faq">{faq.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
      <section className="context-band"><h2>A demanding market.<br/><em>Your effort still matters.</em></h2><div><div className="context-figures"><p><strong>172</strong>applications per graduate vacancy in London</p><p><strong>158</strong>applications per graduate vacancy in financial & professional services</p></div><p>ISE Student Recruitment Report 2026, surveying 155 employers. These are separate averages—not a London-finance acceptance rate or your personal odds. Graduate recruitment in the sample grew 4%; competition is high, but opportunities remain.</p><p className="label">ISE findings, October 2026</p></div></section>
      <section className="study-close"><h2>Make your next<br/><em>move count.</em></h2><p>You don’t need to do it all today.<br/>Start with the next right thing.</p><Button asChild variant="link" className="study-action"><Link to="/find-your-roles">[ Find your roles <ArrowUpRight/> ]</Link></Button><div className="close-geometry" aria-hidden="true"><span/><span/></div></section>
    </main>
    <footer className="study-footer"><div className="footer-top"><div><p>Support</p><a href="mailto:velqfinance@gmail.com">velqfinance@gmail.com</a></div><nav aria-label="Footer"><Link to="/find-your-roles">Find your roles ↗</Link><Link to="/library">Member access ↗</Link><Link to="/terms">Terms preview ↗</Link></nav><div><PreviewNote/><p>© 2026 VELQ<br/>Independent educational resources</p></div></div><div className="giant-wordmark" aria-hidden="true">VELQ<span className="wordmark-cut"/></div></footer>
  </div>;
}
