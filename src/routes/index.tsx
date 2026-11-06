import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/velq";
import { useStudyMotion } from "@/components/public-study/motion";
import { StudyNavigation } from "@/components/public-study/navigation";
import { ProductPreview } from "@/components/public-study/product-preview";
import { ProcessScene } from "@/components/public-study/process";
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

function Home() {
  const ref = useStudyMotion();
  return <div ref={ref} className="public-study">
    <a className="study-skip" href="#main">Skip to content</a>
    <StudyNavigation/>
    <main id="main">
      <section className="study-opening v2-opening">
        <div className="giant-wordmark" aria-label="VELQ">VELQ<span className="wordmark-cut" aria-hidden="true"/></div>
        <div className="opening-meta"><p>UK finance career preparation</p><nav aria-label="Opening navigation"><a href="#approach">The approach</a><a href="#inside">Inside VELQ</a><a href="#membership">Membership</a></nav><span>Spring weeks → Graduate roles</span></div>
        <div className="offset-intro"><h1>You're competing with hundreds of applicants. <em>Don't prepare like everyone else.</em></h1><p className="v2-desktop-copy">When everyone is applying, knowing where to focus makes the difference. Discover the finance roles that fit you, build a clearer preparation strategy, and approach recruitment with confidence.</p><p className="v2-mobile-copy">Find the finance roles that fit your interests and know what to prepare next.</p><div className="v2-hero-actions"><Link to="/find-your-roles" className="v2-primary-cta">Find your finance roles <ArrowUpRight aria-hidden="true"/></Link><a href="#membership" className="v2-secondary-cta">Explore VELQ membership</a></div><p className="v2-finder-note">Free career finder · 10 questions · No account required</p></div>
        <div className="opening-bottom"><span>Spring weeks · Internships · Placements · Graduate roles</span><a href="#approach">See how it works <ArrowDown aria-hidden="true"/></a></div>
      </section>
      <section id="approach" aria-labelledby="direction-title">
        <div className="v2-direction-intro">
          <h2 id="direction-title" className="study-title">Where should you<br/><em>focus first?</em></h2>
          <p>Investment banking, research, risk. The work differs, and so does the preparation. Answer ten questions, compare the roles and keep a shortlist of one to four interests.</p>
        </div>
        <div id="product-scene" data-scene="reel" className="growing-scene"><div className="growing-pin"><div className="growing-product"><ProductPreview/></div></div></div>
      </section>
      <section id="inside" aria-label="Inside VELQ membership">
        <ProcessScene/>
        <WorkspaceScene/>
        <div className="v2-mobile-story">
          <article className="v2-story-card">
            <h2 className="study-title">Remember <em>what you sent.</em></h2>
            <dl className="v2-mini-sheet">
              <dt>Application record · Example</dt><dd>Risk internship</dd>
              <dt>Stage</dt><dd>Assessment centre</dd>
              <dt>Documents submitted</dt><dd>Risk CV.pdf · Cover letter.pdf</dd>
            </dl>
            <p>Find openings in the member directory. Use the separate Excel workbook to keep the documents and answers you submitted.</p>
          </article>
          <article className="v2-story-card">
            <h2 className="study-title">Prepare for <em>the next round.</em></h2>
            <ol className="v2-mini-sheet"><li>Choose an experience relevant to the question.</li><li>Practise explaining your decision aloud.</li><li>Try a follow-up and record one improvement.</li></ol>
            <p>Build a bank of five stories, then practise adapting them for interviews and assessments.</p>
          </article>
        </div>
      </section>
      <section className="v2-team" aria-labelledby="v2-team-title"><h2 id="v2-team-title" className="study-title">The VELQ <em>team.</em></h2><p className="v2-team-desktop">The VELQ team recognises how competitive and overwhelming finance recruitment can be, with students often unsure which opportunities to pursue or how to prepare effectively. We created VELQ to bring clarity to that process, helping aspiring finance professionals identify their direction and focus on what matters. Our goal is to make career preparation more structured, accessible and efficient, so students can approach recruitment with greater confidence.</p><p className="v2-team-mobile">The VELQ team created VELQ to help aspiring finance professionals find direction, prepare more effectively and approach recruitment with greater confidence.</p></section>
      <section id="membership" className="membership-editorial"><div><h2 className="study-title">Put your effort<br/><em>behind a plan.</em></h2><p>Explore finance roles, build your evidence and prepare for assessments in one self-directed membership.</p></div><div className="membership-price"><p>VELQ Founding Membership · Preview</p><div className="price-amount">£19.99</div><p>every six months, after a three-day trial</p><ul className="v2-benefits"><li>Finance role guides and career pathways</li><li>Application and experience-story resources</li><li>Assessment and interview preparation</li></ul><p>Cancel before the trial ends to avoid the first charge. Membership renews every six months until cancelled.</p><strong>Paid checkout is closed on this website.</strong><Button asChild variant="link" className="study-action"><Link to="/find-your-roles">Find your finance roles <ArrowUpRight/></Link></Button><div className="v2-offer-faq"><details><summary>What is not included?</summary><p>Individual coaching, personal CV reviews, comprehensive live vacancies, cross-device syncing or guaranteed interviews and offers are not included.</p></details><details><summary>How do cancellation and access work?</summary><p>Final cancellation, access and refund terms will be confirmed before this website opens paid checkout.</p></details><Link to="/terms">Read membership terms</Link></div></div></section>
    </main>
    <footer className="study-footer"><div className="footer-top"><div><p>Support</p><a href="mailto:velqfinance@gmail.com">velqfinance@gmail.com</a></div><nav aria-label="Footer"><Link to="/library">Member access ↗</Link><Link to="/terms">Terms preview ↗</Link></nav><div><Wordmark/><p>© 2026 VELQ</p></div></div></footer>
  </div>;
}
