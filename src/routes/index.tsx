import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PreviewNote } from "@/components/velq";
import { useStudyMotion } from "@/components/public-study/motion";
import { StudyNavigation } from "@/components/public-study/navigation";
import { ProductPreview } from "@/components/public-study/product-preview";
import { ProcessScene } from "@/components/public-study/process";
import { GalleryScene } from "@/components/public-study/gallery";
import { WorkspaceScene } from "@/components/public-study/workspace";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "VELQ — Finance career preparation with a clearer direction" },
    { name: "description", content: "Explore UK finance roles, build your evidence and prepare for the next round. Start with the free ten-question interests questionnaire. Unpublished membership preview." },
    { property: "og:title", content: "VELQ — Finance career preparation with a clearer direction" },
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
      <section className="study-opening v2-opening">
        <div className="giant-wordmark" aria-label="VELQ">VELQ<span className="wordmark-cut" aria-hidden="true"/></div>
        <div className="opening-meta"><p>VELQ — FINANCE CAREER PREPARATION</p><nav aria-label="Opening navigation"><a href="#approach">The approach</a><a href="#inside">Inside VELQ</a><a href="#membership">Membership</a></nav><span>Spring weeks → Graduate roles</span></div>
        <div className="offset-intro"><h1>You're competing with hundreds of applicants. <em>Don't prepare like everyone else.</em></h1><p className="v2-desktop-copy">When everyone is applying, knowing where to focus makes the difference. Discover the finance roles that fit you, build a clearer preparation strategy, and approach recruitment with confidence.</p><p className="v2-mobile-copy">Find the finance roles that fit your interests and know what to prepare next.</p><div className="v2-hero-actions"><Link to="/find-your-roles" className="v2-primary-cta">Find your finance roles <ArrowUpRight aria-hidden="true"/></Link><a href="#membership" className="v2-secondary-cta">Explore VELQ membership</a></div><p className="v2-finder-note">Free career finder · 10 questions · No account required</p></div>
        <div className="opening-bottom"><span>Spring weeks · Internships · Placements · Graduate roles</span><a href="#product-scene">See how it works <ArrowDown aria-hidden="true"/></a></div>
      </section>
      <section id="product-scene" data-scene="reel" className="growing-scene"><div className="growing-pin"><div className="growing-product"><ProductPreview/><div className="reel-overlay"><span>Direction, before the next application.</span><Link to="/find-your-roles" className="reel-link" aria-label="Find your roles from the interface preview"><ArrowUpRight/></Link></div></div></div></section>
      <section id="approach" className="study-editorial">
        <h2 className="study-title">You’re putting<br/>in the hours.<br/><em>Find the thread.</em></h2>
        <div className="editorial-right"><div className="scattered-art" aria-label="Original illustration of scattered preparation tabs"><span>cv_final_v6</span><span>Which role?</span><span>Next deadline</span><span>Test preparation</span><div className="thread-line"/><p>Effort → Direction</p></div><h3>Less searching.<br/><em>More putting it to work.</em></h3></div>
        <div className="editorial-copy"><p>Another application. Another test. Another evening wondering which roles deserve your time.</p><p>VELQ helps you choose a direction, build your own evidence and prepare for the next stage. Explore first; check each employer’s eligibility requirements before applying.</p></div>
        <p className="editorial-welcome">You do not need to do everything today.<br/><em>You need to know what matters next.</em></p>
      </section>
      <ProcessScene/>
      <GalleryScene/>
      <WorkspaceScene/>
      <section className="v2-mobile-story" aria-label="How VELQ works">
        <div className="v2-story-intro"><span className="study-counter">Discover · Decide · Prepare</span><h2 className="study-title">A clearer next step.<br/><em>At every stage.</em></h2></div>
        <article className="v2-story-card"><span className="study-counter">01 / Free career finder</span><h3>Discover your direction.</h3><ProductPreview/><p>Answer ten questions, explore ranked interests and choose one to four roles. Your shortlist is yours to change.</p></article>
        <article className="v2-story-card"><span className="study-counter">02 / Membership · Applications</span><h3>Build your evidence.</h3><div className="v2-mini-sheet"><span>EXPERIENCE STORY</span><strong>Situation</strong><strong>Your action</strong><strong>Result</strong><strong>What you learned</strong></div><p>Prepare genuine experience stories, organise application details and keep your own records.</p></article>
        <article className="v2-story-card"><span className="study-counter">03 / Membership · Preparation</span><h3>Practise with purpose.</h3><div className="v2-mini-sheet"><span>PREPARATION SESSION</span><strong>01 · Choose a focus</strong><strong>02 · Practise the format</strong><strong>03 · Review what changed</strong></div><p>Work through practical tasks and knowledge checks, then decide what to improve next.</p></article>
      </section>
      <section className="v2-team" aria-labelledby="v2-team-title"><span className="study-counter">ABOUT THE VELQ TEAM</span><h2 id="v2-team-title" className="study-title">Built to bring clarity<br/><em>to finance recruitment.</em></h2><p className="v2-team-desktop">The VELQ team recognises how competitive and overwhelming finance recruitment can be, with students often unsure which opportunities to pursue or how to prepare effectively. We created VELQ to bring clarity to that process, helping aspiring finance professionals identify their direction and focus on what matters. Our goal is to make career preparation more structured, accessible and efficient, so students can approach recruitment with greater confidence.</p><p className="v2-team-mobile">The VELQ team created VELQ to help aspiring finance professionals find direction, prepare more effectively and approach recruitment with greater confidence.</p></section>
      <section id="membership" className="membership-editorial"><div><h2 className="study-title">Put your effort<br/><em>behind a plan.</em></h2><p>Explore finance roles, build your evidence and prepare for assessments in one self-directed membership.</p></div><div className="membership-price"><p>VELQ Founding Membership · Preview</p><div className="price-amount">£19.99</div><p>every six months, after a three-day trial</p><ul className="v2-benefits"><li>Finance role guides and career pathways</li><li>Application and experience-story resources</li><li>Assessment and interview preparation</li></ul><p>Start with a three-day trial. If you don’t cancel before it ends, you’ll be charged £19.99 and membership renews every six months until you cancel. Every member gets the whole library.</p><p className="price-caveat">This preview does not accept payment. Member access, checkout, renewal and cancellation details, and applicable refund terms still need to be verified before launch.</p><strong>Checkout is not open yet.</strong><Button asChild variant="link" className="study-action"><Link to="/find-your-roles">Find your finance roles <ArrowUpRight/></Link></Button><div className="v2-offer-faq"><details><summary>What is not included?</summary><p>Individual coaching, personal CV reviews, comprehensive live vacancies, cross-device syncing or guaranteed interviews and offers are not included.</p></details><details><summary>How do cancellation and access work?</summary><p>Checkout is currently closed. Final cancellation, access and refund terms will be confirmed before membership opens.</p></details><Link to="/membership">Read membership details</Link></div></div></section>
    </main>
    <footer className="study-footer"><div className="footer-top"><div><p>Support</p><a href="mailto:velqfinance@gmail.com">velqfinance@gmail.com</a></div><nav aria-label="Footer"><Link to="/find-your-roles">Find your finance roles ↗</Link><Link to="/library">Member access ↗</Link><Link to="/terms">Terms preview ↗</Link></nav><div><PreviewNote/><p>© 2026 VELQ<br/>Independent educational resources</p></div></div><div className="giant-wordmark" aria-hidden="true">VELQ<span className="wordmark-cut"/></div></footer>
  </div>;
}
