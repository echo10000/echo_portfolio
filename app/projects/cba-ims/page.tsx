import Link from "next/link";
import "./case-study.css";

export const metadata = {
  title: "CBA IMS — Inventory Management Case Study | Jericho Blando",
  description:
    "A technical case study of the College of Business Administration Asset & Inventory Management System: operational workflows, role-aware access, QR tracking, and backend architecture.",
};

const capabilities = [
  {
    label: "01 / ASSET REGISTER",
    title: "Know what exists.",
    detail:
      "Catalog institutional equipment with identifiable asset records, physical location, condition and searchable inventory data.",
    tag: "INVENTORY",
  },
  {
    label: "02 / CUSTODY",
    title: "Know who has it.",
    detail:
      "Record faculty asset assignments, temporary borrowing, check-outs, returns and accountability history.",
    tag: "LIFECYCLE",
  },
  {
    label: "03 / VERIFICATION",
    title: "Make physical audits faster.",
    detail:
      "Generate QR labels and support camera-based scanning for checking assets during physical inventory work.",
    tag: "QR / CAMERA",
  },
  {
    label: "04 / OPERATIONS",
    title: "Keep the history.",
    detail:
      "Track maintenance and repair events, transfers and disposals, with operational reports and controlled exports.",
    tag: "AUDITABLE",
  },
];

const decisions = [
  {
    no: "01",
    title: "A relational source of truth",
    desc:
      "The project documents PostgreSQL for production use, with transactional updates and row locking for custody-sensitive operations. SQLite is used for local development and tests.",
  },
  {
    no: "02",
    title: "Access follows the user's role",
    desc:
      "The documented roles include Admin, Dean, Department Chair and Faculty, with different levels of inventory visibility, management permissions and report access.",
  },
  {
    no: "03",
    title: "Traceable operational events",
    desc:
      "Assignments, transfers, maintenance and stock movements are treated as lifecycle events rather than disconnected spreadsheet edits.",
  },
  {
    no: "04",
    title: "An interface for actual staff work",
    desc:
      "Server-rendered Django workflows provide inventory views, borrowing actions, reports and asset verification without making staff navigate unrelated screens.",
  },
];

export default function CbaCaseStudyPage() {
  return (
    <main className="cbaStudy">
      <div className="cbaStudy__noise" aria-hidden="true" />
      <header className="cbaStudy__nav">
        <div className="cbaStudy__navInner">
          <Link href="/#projects" className="cbaStudy__back">← RETURN TO PORTFOLIO</Link>
          <span className="cbaStudy__navIdentity">JB:// THE WIRED <span>■</span></span>
          <a href="https://github.com/echo10000/cba_ims" target="_blank" rel="noopener noreferrer" className="cbaStudy__navRepo">SOURCE REPOSITORY ↗</a>
        </div>
      </header>

      <section className="cbaStudy__hero" aria-labelledby="cba-study-title">
        <div className="cbaStudy__heroInner">
          <div className="cbaStudy__heroText">
            <div className="cbaStudy__eyebrow"><span>●</span> PROJECT RECORD 001 / FEATURED CASE STUDY</div>
            <h1 id="cba-study-title">CBA<span>INVENTORY</span><em>MANAGEMENT.</em></h1>
            <p className="cbaStudy__heroLead">
              An operational system for tracking college assets, handling custody
              and borrowing, and keeping institutional inventory accountable.
            </p>
            <div className="cbaStudy__heroActions">
              <a className="cbaStudy__primary" href="https://github.com/echo10000/cba_ims" target="_blank" rel="noopener noreferrer">
                EXPLORE THE SOURCE <span aria-hidden="true">↗</span>
              </a>
              <a className="cbaStudy__secondary" href="#the-system">HOW IT WORKS ↓</a>
            </div>
          </div>
          <div className="cbaStudy__heroVisual" aria-label="Conceptual illustration of asset records and controlled transactions">
            <div className="cbaStudy__deviceBar">
              <span><i/> <i/> <i/></span>
              <span>CBA://OPERATIONS</span>
              <span>ARCHITECTURE VIEW</span>
            </div>
            <div className="cbaStudy__visualBody">
              <div className="cbaStudy__visualRail">
                <strong>IMS</strong><span>01</span><span>02</span><span>03</span><span>04</span>
              </div>
              <div className="cbaStudy__visualMain">
                <div className="cbaStudy__visualCaption"><span>ASSET / ACCOUNTABILITY</span><span className="cbaStudy__led">● RECORD FLOW</span></div>
                <div className="cbaStudy__visualTitle">ONE RECORD.<br/>A TRACEABLE LIFECYCLE.</div>
                <div className="cbaStudy__flow">
                  <div><small>01 / REGISTER</small><strong>ASSET</strong></div>
                  <span>→</span>
                  <div><small>02 / ASSIGN</small><strong>CUSTODY</strong></div>
                  <span>→</span>
                  <div><small>03 / VERIFY</small><strong>HISTORY</strong></div>
                </div>
                <div className="cbaStudy__visualBottom"><span>AUTHORIZATION / APPROVALS / AUDIT EVENTS</span><span>◉</span></div>
              </div>
            </div>
            <div className="cbaStudy__visualNote">SYSTEM-FLOW ILLUSTRATION — NOT AN APPLICATION SCREENSHOT</div>
          </div>
        </div>
        <div className="cbaStudy__facts">
          <div><small>PROJECT TYPE</small><strong>COLLEGE OPERATIONS</strong></div>
          <div><small>MY ROLE</small><strong>APPLICATION DEVELOPMENT</strong></div>
          <div><small>CORE STACK</small><strong>DJANGO / POSTGRESQL</strong></div>
          <div><small>PUBLIC DEMO</small><strong>NOT YET AVAILABLE</strong></div>
        </div>
      </section>

      <section className="cbaStudy__section cbaStudy__problem" id="the-system">
        <div className="cbaStudy__sectionInner">
          <div className="cbaStudy__sectionAside"><span>01 / THE PROBLEM</span><strong>FROM FRAGMENTED RECORDS TO ACCOUNTABILITY.</strong></div>
          <div className="cbaStudy__prose">
            <h2>Inventory is more than a list of equipment.</h2>
            <p>
              A college needs to know what equipment exists, where it is, who is
              responsible for it, whether it is usable, and what happened during
              transfers, borrowing or maintenance. When those steps live in
              scattered records, answering simple operational questions becomes harder.
            </p>
            <p>
              CBA IMS brings these connected tasks into a Django-backed workflow.
              Its purpose is to give authorized staff a clearer view of asset
              status and an auditable history of changes.
            </p>
            <div className="cbaStudy__problemQuote">
              <span>DESIGN OBJECTIVE</span>
              <strong>Make an asset traceable from registration through its operational lifecycle.</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="cbaStudy__section cbaStudy__capabilities" aria-labelledby="cba-capabilities-title">
        <div className="cbaStudy__heading">
          <div><span>02 / REAL WORKFLOWS</span><h2 id="cba-capabilities-title">WHAT THE SYSTEM DOES.</h2></div>
          <p>Four connected workflows from the documented project architecture.</p>
        </div>
        <div className="cbaStudy__capabilityGrid">
          {capabilities.map((capability) => (
            <article className="cbaStudy__capability" key={capability.label}>
              <div className="cbaStudy__capabilityTop"><span>{capability.label}</span><span>↗</span></div>
              <h3>{capability.title}</h3>
              <p>{capability.detail}</p>
              <span className="cbaStudy__capabilityTag">{capability.tag}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="cbaStudy__section cbaStudy__architecture" aria-labelledby="cba-architecture-title">
        <div className="cbaStudy__heading">
          <div><span>03 / ENGINEERING</span><h2 id="cba-architecture-title">THE THINKING BEHIND IT.</h2></div>
          <p>Engineering choices described in the project repository.</p>
        </div>
        <div className="cbaStudy__engineering">
          <div className="cbaStudy__architectureDiagram">
            <div className="cbaStudy__diagramLabel">DEPLOYMENT ARCHITECTURE / DOCUMENTED TARGET</div>
            <div className="cbaStudy__diagramNode"><small>CLIENT</small><strong>BROWSER / RESPONSIVE UI</strong></div>
            <span className="cbaStudy__arrow">↓ HTTPS</span>
            <div className="cbaStudy__diagramNode"><small>WEB EDGE</small><strong>NGINX / GUNICORN</strong></div>
            <span className="cbaStudy__arrow">↓ WSGI</span>
            <div className="cbaStudy__diagramNode cbaStudy__diagramNode--emphasis"><small>APPLICATION</small><strong>DJANGO / ROLE RULES / SERVICES</strong></div>
            <span className="cbaStudy__arrow">↓ SQL / TRANSACTIONS</span>
            <div className="cbaStudy__diagramNode"><small>DATA LAYER</small><strong>POSTGRESQL</strong></div>
            <div className="cbaStudy__diagramFooter">DEPLOYMENT TOPOLOGY IS DOCUMENTED; THIS IS NOT A CLAIM THAT A PUBLIC INSTANCE IS LIVE.</div>
          </div>
          <div className="cbaStudy__decisionList">
            {decisions.map((decision) => (
              <article key={decision.no}>
                <span>{decision.no} / DECISION</span>
                <h3>{decision.title}</h3>
                <p>{decision.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cbaStudy__section cbaStudy__journey" aria-labelledby="cba-journey-title">
        <div className="cbaStudy__heading">
          <div><span>04 / PRODUCT EXPERIENCE</span><h2 id="cba-journey-title">A TASK-BASED STAFF WORKFLOW.</h2></div>
          <p>A representative workflow derived from documented capabilities—not a claim about a completed user trial.</p>
        </div>
        <div className="cbaStudy__steps">
          <article><span>01</span><h3>Find an asset</h3><p>Locate a registered item by code, category, department or other searchable inventory information.</p></article>
          <article><span>02</span><h3>Perform an action</h3><p>Work through an assignment, temporary loan, transfer or maintenance flow subject to permissions.</p></article>
          <article><span>03</span><h3>Leave a record</h3><p>Preserve the operational event for later verification, reporting and accountability.</p></article>
        </div>
        <div className="cbaStudy__studentPortal">
          <div><span>COMING WORKFLOW / PUBLIC-FACING</span><h3>Student projector reservations</h3></div>
          <p>
            A student-facing reservation portal is part of the broader CBA IMS work.
            Staff and administrator operations remain behind role-based access.
            This feature is presented as ongoing development, not an active public service.
          </p>
        </div>
      </section>

      <section className="cbaStudy__section cbaStudy__evidence" aria-labelledby="cba-evidence-title">
        <div className="cbaStudy__heading">
          <div><span>05 / DEMONSTRATION</span><h2 id="cba-evidence-title">SHOW THE REAL PRODUCT.</h2></div>
          <p>Project evidence should be genuine and protect institutional data.</p>
        </div>
        <div className="cbaStudy__evidencePanel">
          <div className="cbaStudy__evidenceIndex"><span>SCREEN CAPTURE / NOT YET ADDED</span><strong>◎</strong></div>
          <div className="cbaStudy__evidenceBody">
            <div>
              <h3>Real screenshots and walkthrough coming next.</h3>
              <p>
                There are no verified app screenshots in the portfolio assets yet.
                Rather than showing a fabricated dashboard, this space will hold
                captures from a local demo with fictional seed data.
              </p>
            </div>
            <div className="cbaStudy__captureList">
              <span><i>01</i> STAFF DASHBOARD</span>
              <span><i>02</i> ASSET REGISTER / DETAILS</span>
              <span><i>03</i> BORROWING OR PROJECTOR RESERVATION FLOW</span>
            </div>
          </div>
        </div>
        <div className="cbaStudy__evidenceFoot">SCREENSHOTS SHOULD USE DEMONSTRATION DATA ONLY — NO STUDENT RECORDS, STAFF CREDENTIALS, OR INSTITUTIONAL SECRETS.</div>
      </section>

      <section className="cbaStudy__ending">
        <div className="cbaStudy__endingInner">
          <span>RECORD 001 / NEXT TRANSMISSION</span>
          <h2>THE BEST PROOF<br/><em>IS WHAT WORKS.</em></h2>
          <p>
            Source code and engineering documentation are available now.
            A public walkthrough can follow once safe demonstration captures are prepared.
          </p>
          <div className="cbaStudy__endingActions">
            <a href="https://github.com/echo10000/cba_ims" target="_blank" rel="noopener noreferrer">REVIEW CODE ↗</a>
            <Link href="/#projects">BACK TO PROJECTS ←</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
