"use client";

import { useEffect, useState, useRef } from "react";

/* ──────────────────────────────────────────────
   DATA DEFINITIONS
   ────────────────────────────────────────────── */

type ProjectCategory = "all" | "backend" | "fullstack" | "desktop";

interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  architecture: string;
  stack: string[];
  href: string | null;
  cta: string;
}

const projects: Project[] = [
  {
    id: "faculty-sched",
    title: "AI-Powered Faculty Workload & Scheduling System",
    category: "backend",
    categoryLabel: "Capstone · Optimization Engine",
    description:
      "An automated academic scheduling platform designed to eliminate timetable collisions, balance faculty teaching hours, and optimize course assignments across departments.",
    architecture:
      "Constraint satisfaction model formulated with Google OR-Tools, paired with a Django REST backend and relational PostgreSQL schemas.",
    stack: ["Python", "Django", "Google OR-Tools", "PostgreSQL", "Bootstrap", "REST APIs"],
    href: "https://github.com/echo10000/faculty_sched",
    cta: "View repository",
  },
  {
    id: "cba-inventory",
    title: "CBA Asset & Inventory Management System",
    category: "fullstack",
    categoryLabel: "Full-Stack Web System",
    description:
      "An institutional equipment tracker managing department inventories, transfer histories, maintenance cycles, and QR-based mobile scanning for campus assets.",
    architecture:
      "Role-based permission architecture, relational audit trails, QR-code decoding pipeline, deployed on Linux with Gunicorn and WhiteNoise.",
    stack: ["Python", "Django", "PostgreSQL", "Nginx", "Gunicorn", "QR Engine"],
    href: null,
    cta: "Institutional project",
  },
  {
    id: "attendance-monitoring",
    title: "NORSU Attendance Monitoring System",
    category: "desktop",
    categoryLabel: "Desktop Application",
    description:
      "A high-speed desktop application featuring camera QR code verification, student credential checks, CSV roster sync, and exportable PDF attendance sheets.",
    architecture:
      "Java Swing desktop architecture with native camera integration via ZXing, JDBC transactions to MySQL, and Apache PDFBox reporting.",
    stack: ["Java", "Swing", "MySQL", "ZXing", "Apache PDFBox", "JDBC"],
    href: null,
    cta: "Details on request",
  },
];

interface SkillCategory {
  category: string;
  items: string[];
}

const skillCategories: SkillCategory[] = [
  {
    category: "BACKEND",
    items: ["Python", "Django", "REST APIs"],
  },
  {
    category: "DATABASE",
    items: ["PostgreSQL", "MySQL", "Relational Data Modeling"],
  },
  {
    category: "APPLIED AI",
    items: [
      "AI-Assisted Development",
      "Prompt Engineering",
      "LLM Workflows",
      "AI Prototyping",
    ],
  },
  {
    category: "TOOLS & DEPLOYMENT",
    items: [
      "Git & GitHub",
      "Google OR-Tools",
      "Linux",
      "Nginx",
      "Gunicorn",
      "WhiteNoise",
      "Vercel",
    ],
  },
  {
    category: "FRONTEND / DESKTOP",
    items: ["JavaScript", "HTML & CSS", "Bootstrap", "Java", "Swing"],
  },
];

const timeline = [
  {
    year: "2026 – Present",
    title: "Capstone: AI-Powered Academic Scheduling",
    desc: "Designing an algorithmic constraint-solver engine in Django to automate timetable generation.",
  },
  {
    year: "2026",
    title: "CBA Department Asset Management",
    desc: "Delivered a complete QR-based inventory and maintenance tracking system for campus staff.",
  },
  {
    year: "2025",
    title: "Cebu Mini Hotel Management System",
    desc: "Developed a web-based reservation and room management system for hotel operations.",
  },
  {
    year: "2024",
    title: "NORSU Attendance Monitoring System",
    desc: "Engineered a Java Swing desktop app with camera QR scanning and automated PDF rosters.",
  },
  {
    year: "2023",
    title: "Started BS in Information Technology",
    desc: "Enrolled at NORSU, focusing on algorithms, database architecture, and backend systems.",
  },
];

interface GithubDay {
  date: string;
  level: number;
}

interface GithubStats {
  totalContributions: string;
  days: GithubDay[];
  loading: boolean;
}

/* ──────────────────────────────────────────────
   ICON HELPERS
   ────────────────────────────────────────────── */

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.53 9.53 0 0 1 12 6.85c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.73c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   INTERACTIVE PROFILE PORTRAIT
   ────────────────────────────────────────────── */

function InteractivePortrait() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, isHovered: false });
  const cardRef = useRef<HTMLButtonElement>(null);
  const [isTouchOrReduced, setIsTouchOrReduced] = useState(false);

  useEffect(() => {
    const checkCapabilities = () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      setIsTouchOrReduced(reduced || coarse);
    };
    checkCapabilities();

    const mqlReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqlCoarse = window.matchMedia("(pointer: coarse)");
    mqlReduced.addEventListener("change", checkCapabilities);
    mqlCoarse.addEventListener("change", checkCapabilities);
    return () => {
      mqlReduced.removeEventListener("change", checkCapabilities);
      mqlCoarse.removeEventListener("change", checkCapabilities);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouchOrReduced || isFlipped) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max rotation 2.5 degrees (strictly within 2-3 degrees requirement)
    const rotX = ((y - centerY) / centerY) * -2.5;
    const rotY = ((x - centerX) / centerX) * 2.5;
    setTilt({ x: rotX, y: rotY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, isHovered: false });
  };

  const handleToggle = () => {
    setIsFlipped((prev) => !prev);
    setTilt({ x: 0, y: 0, isHovered: false });
  };

  const tiltTransform =
    !isTouchOrReduced && tilt.isHovered && !isFlipped
      ? `translateY(-3.5px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`
      : !isTouchOrReduced && tilt.isHovered && isFlipped
      ? "translateY(-3.5px)"
      : "translateY(0px) rotateX(0deg) rotateY(0deg)";

  return (
    <div className="portraitContainer">
      <button
        ref={cardRef}
        type="button"
        className={`portraitButton ${isFlipped ? "flipped" : ""}`}
        onClick={handleToggle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label={
          isFlipped
            ? "Developer identity card for Jericho Blando. Click or press Enter to return to portrait."
            : "Portrait of Jericho Blando. Click or press Enter to inspect developer identity card."
        }
        aria-pressed={isFlipped}
      >
        <div
          className="portraitTiltWrapper"
          style={{ transform: tiltTransform }}
        >
          <div className="portraitFlipper">
            {/* FRONT: Portrait Photograph */}
            <div className="portraitFace portraitFront">
              <div className="cornerMarker cornerTL" aria-hidden="true" />
              <div className="cornerMarker cornerTR" aria-hidden="true" />
              <div className="cornerMarker cornerBL" aria-hidden="true" />
              <div className="cornerMarker cornerBR" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/jericho-profile.png"
                alt="Jericho Blando"
                loading="eager"
              />
              <div className="inspectBadge" aria-hidden="true">
                [ inspect ]
              </div>
            </div>

            {/* BACK: Terminal Developer Identity Card */}
            <div className="portraitFace portraitBack" aria-hidden={!isFlipped}>
              <div className="devCardHeader">
                <div className="devCardDots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="devCardTag">DEV</span>
              </div>

              <div className="devCardBody">
                <p className="devCmd">
                  <span className="devPrompt">$</span> whoami
                </p>
                <div className="devOutput">
                  <span className="devName">&gt; Jericho Blando</span>
                  <span>&gt; BS Information Technology</span>
                  <span>&gt; Backend / Django</span>
                  <span>&gt; Python + PostgreSQL</span>
                </div>

                <p className="devCmd" style={{ marginTop: "14px" }}>
                  <span className="devPrompt">$</span> status
                </p>
                <div className="devOutput">
                  <span className="devStatus">&gt; open_to_opportunities</span>
                </div>

                <div className="devCursor">█</div>
              </div>

              <div className="devCardFooter">
                <span>[ click to flip back ]</span>
              </div>
            </div>
          </div>
        </div>
      </button>

      <div className="portraitMeta">
        <span>Jericho Blando</span>
        <span className="inspectHint">
          {isFlipped ? "[ show portrait ]" : "[ inspect ]"}
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────── */

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeSection, setActiveSection] = useState<string>("top");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeTerminalTab, setActiveTerminalTab] = useState<string>("stack");
  const [projectFilter, setProjectFilter] = useState<ProjectCategory>("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Form states
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");

  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Live GitHub Contributions State
  const [githubStats, setGithubStats] = useState<GithubStats>({
    totalContributions: "158",
    days: [],
    loading: true,
  });

  // Initialize theme
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark";
    if (currentTheme) {
      setTheme(currentTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "dark" : "light";
      setTheme(initial);
      document.documentElement.setAttribute("data-theme", initial);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("jb-theme", nextTheme);
    } catch {
      // Storage safety
    }
    showToast(`Switched to ${nextTheme} theme`);
  };

  // Fetch real GitHub activity
  useEffect(() => {
    async function loadGithubActivity() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (data.success && Array.isArray(data.days)) {
          setGithubStats({
            totalContributions: data.totalContributions || "158",
            days: data.days,
            loading: false,
          });
        }
      } catch {
        setGithubStats((prev) => ({ ...prev, loading: false }));
      }
    }
    loadGithubActivity();
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowBackToTop(scrollTop > 400);

      const sections = ["top", "about", "projects", "skills", "journey", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => setToastMessage(null), 2600);
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`Copied ${label} to clipboard`);
    } catch {
      showToast(`Could not copy automatically`);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMsg.trim()) {
      showToast("Please complete all form fields");
      return;
    }
    const subject = encodeURIComponent(`Portfolio Inquiry from ${contactName}`);
    const body = encodeURIComponent(
      `Hello Jericho,\n\n${contactMsg}\n\nFrom: ${contactName} (${contactEmail})`
    );
    window.location.href = `mailto:blando.jericho26@gmail.com?subject=${subject}&body=${body}`;
    showToast("Launching email client...");
  };

  const filteredProjects =
    projectFilter === "all" ? projects : projects.filter((p) => p.category === projectFilter);

  return (
    <main>
      <div className="noise" aria-hidden="true" />
      <div className="scrollProgress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      {/* ── HEADER NAVIGATION ── */}
      <header className="headerWrapper">
        <nav className="nav shell" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="00 / INDEX — Return to top">
            <span className="brandIndex">00 /</span> INDEX
          </a>

          <div className="navActions">
            <div className="navLinks">
              <a href="#about" className={`navLink ${activeSection === "about" ? "active" : ""}`}>
                About
              </a>
              <a href="#projects" className={`navLink ${activeSection === "projects" ? "active" : ""}`}>
                Work
              </a>
              <a href="#skills" className={`navLink ${activeSection === "skills" ? "active" : ""}`}>
                Toolkit
              </a>
              <a href="#journey" className={`navLink ${activeSection === "journey" ? "active" : ""}`}>
                Journey
              </a>
              <a href="#contact" className={`navLink ${activeSection === "contact" ? "active" : ""}`}>
                Contact
              </a>
            </div>

            <button
              className="themeToggle"
              onClick={toggleTheme}
              aria-label={`Toggle theme (currently ${theme})`}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>

            <a
              className="navCta"
              href="/Jericho_Blando_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              title="Download Resume PDF"
            >
              <DownloadIcon /> Resume
            </a>

            <button
              className="menuToggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileMenuOpen ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <div className={`mobileDrawer ${mobileMenuOpen ? "open" : ""}`} aria-hidden={!mobileMenuOpen}>
        {[
          { id: "about", label: "About" },
          { id: "projects", label: "Selected Work" },
          { id: "skills", label: "Technical Toolkit" },
          { id: "journey", label: "Developer Journey" },
          { id: "contact", label: "Contact" },
        ].map((item, idx) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`mobileNavLink ${activeSection === item.id ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>{item.label}</span>
            <span style={{ fontSize: "12px", color: "var(--muted)" }}>0{idx + 1}</span>
          </a>
        ))}

        <div className="mobileActions">
          <a
            className="button primary"
            href="/Jericho_Blando_Resume.pdf"
            download
            onClick={() => setMobileMenuOpen(false)}
          >
            <DownloadIcon /> Download Resume PDF
          </a>
          <button className="button secondary" onClick={toggleTheme}>
            {theme === "light" ? <MoonIcon /> : <SunIcon />} Toggle Theme
          </button>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <section className="hero shell" id="top">
        <div>
          <div className="statusPill">
            <span className="statusDot" />
            Available for Internships &amp; Junior Roles
          </div>

          <h1>
            I engineer reliable
            <span>software systems.</span>
          </h1>

          <p className="heroLead">
            I&apos;m <strong>Jericho Blando</strong>, a BS Information Technology student specializing in backend architecture, constraint optimization algorithms, Django web services, and relational databases.
          </p>

          <div className="heroActions">
            <a className="button primary" href="#projects">
              View selected work <ArrowIcon />
            </a>
            <a
              className="button secondary"
              href="https://github.com/echo10000"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon /> GitHub
            </a>
            <a
              className="button secondary"
              href="https://www.linkedin.com/in/jericho-blando-5530172b0/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
        </div>

        {/* Hero Terminal */}
        <aside className="terminalCard" aria-label="Technical summary terminal">
          <div className="terminalTop">
            <div className="terminalDots">
              <span className="terminalDot" />
              <span className="terminalDot" />
              <span className="terminalDot" />
            </div>
            <div className="terminalTitle">jericho@blando-arch: ~</div>
          </div>

          <div className="terminalTabs">
            {[
              { id: "stack", label: "$ stack" },
              { id: "capstone", label: "$ capstone" },
              { id: "architecture", label: "$ architecture" },
              { id: "status", label: "$ status" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`terminalTab ${activeTerminalTab === tab.id ? "activeTab" : ""}`}
                onClick={() => setActiveTerminalTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="terminalBody">
            {activeTerminalTab === "stack" && (
              <>
                <p className="termLine">
                  <span className="termPrompt">$</span>
                  <span className="termCmd">cat core_technologies.json</span>
                </p>
                <p className="termOutput">
                  &gt; Backend: Python 3, Django, Django REST Framework
                  <br />
                  &gt; Optimization: Google OR-Tools (Constraint Satisfaction)
                  <br />
                  &gt; Storage: PostgreSQL, MySQL, Normalized Relational Schemas
                  <br />
                  &gt; DevOps &amp; Tools: Linux, Git/GitHub, Nginx, Gunicorn
                </p>
              </>
            )}

            {activeTerminalTab === "capstone" && (
              <>
                <p className="termLine">
                  <span className="termPrompt">$</span>
                  <span className="termCmd">inspect capstone_system</span>
                </p>
                <p className="termOutput">
                  &gt; Name: AI-Powered Faculty Workload &amp; Scheduling Platform
                  <br />
                  &gt; Core: Automated Timetable Generation &amp; Clash Prevention
                  <br />
                  &gt; Solvers: Multi-dimensional constraint balancing
                </p>
              </>
            )}

            {activeTerminalTab === "architecture" && (
              <>
                <p className="termLine">
                  <span className="termPrompt">$</span>
                  <span className="termCmd">query engineering_principles</span>
                </p>
                <p className="termOutput">
                  &gt; 01. Correct relational constraints before query caching
                  <br />
                  &gt; 02. Deterministic business logic in robust service layers
                  <br />
                  &gt; 03. Usable interfaces backed by resilient backend services
                </p>
              </>
            )}

            {activeTerminalTab === "status" && (
              <>
                <p className="termLine">
                  <span className="termPrompt">$</span>
                  <span className="termCmd">systemctl status developer.target</span>
                </p>
                <p className="termOutput">
                  &gt; State: <span className="termSuccess">● active (building &amp; shipping)</span>
                  <br />
                  &gt; Focus: Backend &amp; Full-Stack Engineering Roles
                  <br />
                  &gt; Location: Bayawan City, Philippines · Open to Remote
                </p>
              </>
            )}

            <p className="termLine" style={{ marginTop: "12px" }}>
              <span className="termPrompt">$</span>
              <span className="cursor" />
            </p>
          </div>
        </aside>
      </section>

      {/* ── 01 / ABOUT SECTION ── */}
      <section className="section shell" id="about">
        <div className="sectionLabel">01 / ABOUT</div>

        <div className="aboutLayout">
          {/* Interactive Portrait with Flip & Tilt */}
          <InteractivePortrait />

          {/* Copy and Editorial Metadata Strip */}
          <div className="aboutText">
            <h2>Building software that solves tangible operational problems.</h2>

            <div className="aboutCopy">
              <p>
                My projects are centered on real academic and departmental workflows: <strong>automated scheduling</strong>, <strong>workload balancing</strong>, <strong>asset accountability</strong>, and <strong>QR-based attendance verification</strong>. I prioritize solid database modeling and backend correctness just as much as an intuitive user interface.
              </p>
              <p>
                I am actively strengthening my mastery of Python, Django, PostgreSQL, relational schema design, API engineering, Git workflows, and deployment fundamentals so I can step directly into a junior developer role with practical production experience.
              </p>
            </div>

            {/* Editorial Metadata Strip (Replaces card boxes) */}
            <div className="metadataStrip">
              <div className="metadataItem">
                <span className="metadataValue">BSIT</span>
                <span className="metadataLabel">Information Technology</span>
              </div>
              <div className="metadataItem">
                <span className="metadataValue">NORSU</span>
                <span className="metadataLabel">Bayawan Campus</span>
              </div>
              <div className="metadataItem">
                <span className="metadataValue">2027</span>
                <span className="metadataLabel">Target Graduation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 / SELECTED WORK ── */}
      <section className="section shell" id="projects">
        <div className="sectionHeading">
          <div>
            <div className="sectionLabel">02 / SELECTED WORK</div>
            <h2>Systems built for operational campus use cases.</h2>
          </div>
          <p>Each system addresses a specific scheduling, accountability, or departmental bottleneck.</p>
        </div>

        {/* Category filter pills */}
        <div className="filterBar" role="tablist" aria-label="Project filter categories">
          {[
            { val: "all" as ProjectCategory, label: `All Systems (${projects.length})` },
            { val: "backend" as ProjectCategory, label: "Backend & Capstone" },
            { val: "fullstack" as ProjectCategory, label: "Full-Stack Web" },
            { val: "desktop" as ProjectCategory, label: "Desktop Application" },
          ].map((f) => (
            <button
              key={f.val}
              className={`filterBtn ${projectFilter === f.val ? "activeFilter" : ""}`}
              onClick={() => setProjectFilter(f.val)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="projectGrid">
          {filteredProjects.map((project, index) => (
            <article className="projectCard" key={project.id}>
              <div className="projectHeader">
                <span className="projectCategory">{project.categoryLabel}</span>
                <span className="projectNumber">0{index + 1}</span>
              </div>

              <div className="projectBody">
                <h3>{project.title}</h3>
                <p className="projectDescription">{project.description}</p>

                <div className="architectureStrip">
                  <strong>Architecture: </strong>
                  {project.architecture}
                </div>

                <div className="stackList">
                  {project.stack.map((item) => (
                    <span className="stackTag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>

                <div className="projectFooter">
                  {project.href ? (
                    <a
                      className="projectLink"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.cta} <ArrowIcon />
                    </a>
                  ) : (
                    <span className="projectLink muted">{project.cta}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── 03 / TOOLKIT ── */}
      <section className="section shell" id="skills">
        <div className="sectionHeading">
          <div>
            <div className="sectionLabel">03 / TOOLKIT</div>
            <h2>Technologies &amp; frameworks I work with.</h2>
          </div>
          <p>
            I build backend-focused web systems and use modern AI tools to accelerate prototyping, debugging, testing, and development workflows.
          </p>
        </div>

        <div className="toolkitGrid">
          {skillCategories.map((group, idx) => (
            <div
              className={`skillCategoryCard skillGroup${idx}`}
              key={group.category}
            >
              <div className="skillCategoryTitle">
                <span>{group.category}</span>
              </div>

              <div className="skillPills">
                {group.items.map((item) => (
                  <span className="skillPill" key={item}>
                    <span className="skillDot" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 04 / JOURNEY & REAL GITHUB ACTIVITY ── */}
      <section className="section shell" id="journey">
        <div className="sectionHeading">
          <div>
            <div className="sectionLabel">04 / JOURNEY &amp; ACTIVITY</div>
            <h2>Track record of practical development.</h2>
          </div>
          <p>Key milestones alongside live commit activity fetched directly from GitHub.</p>
        </div>

        <div className="journeyGrid">
          <div>
            {/* Horizontal Metric Strip (Replaces 3 individual box cards) */}
            <div className="metricsLine">
              <div className="metricBlock">
                <span className="metricNum">4+</span>
                <span className="metricText">Systems Shipped</span>
              </div>
              <div className="metricBlock">
                <span className="metricNum">1.4K</span>
                <span className="metricText">Items Tracked (CBA)</span>
              </div>
              <div className="metricBlock">
                <span className="metricNum">0</span>
                <span className="metricText">Scheduling Conflicts</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="timelineList">
              {timeline.map((item, idx) => (
                <div className="timelineItem" key={idx}>
                  <div className="timelineDot" />
                  <div className="timelineYear">{item.year}</div>
                  <div className="timelineTitle">{item.title}</div>
                  <div className="timelineDesc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Activity Card */}
          <div>
            <div className="heatmapWrapper">
              <div className="heatmapHeader">
                <div className="heatmapHeaderLeft">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                  <span>GitHub Activity</span>
                </div>

                <a
                  className="heatmapLink"
                  href="https://github.com/echo10000"
                  target="_blank"
                  rel="noreferrer"
                >
                  {githubStats.totalContributions} contributions this year →
                </a>
              </div>

              <div className="heatmapGrid">
                {githubStats.days.length > 0
                  ? githubStats.days.map((day, i) => (
                      <div
                        key={i}
                        className={`heatCell heat${day.level}`}
                        title={`${day.date}: ${day.level > 0 ? day.level + " contributions" : "No contributions"}`}
                      />
                    ))
                  : Array.from({ length: 182 }).map((_, i) => (
                      <div key={i} className="heatCell heat0" />
                    ))}
              </div>

              <div className="heatmapFooter">
                <span>Verified @echo10000 on GitHub</span>
                <div className="legendScale">
                  <span>Less</span>
                  <span className="heat0" />
                  <span className="heat1" />
                  <span className="heat2" />
                  <span className="heat3" />
                  <span className="heat4" />
                  <span className="heat5" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 / GET IN TOUCH ── */}
      <section className="section shell" id="contact">
        <div className="sectionHeading">
          <div>
            <div className="sectionLabel">05 / GET IN TOUCH</div>
            <h2>Let&apos;s discuss opportunities and projects.</h2>
          </div>
          <p>Open to internships, junior developer roles, and technical collaborations.</p>
        </div>

        <div className="contactLayout">
          <div>
            <p className="contactCopy">
              Whether you have an internship opening, a project to collaborate on, or want to discuss software engineering, feel free to reach out directly.
            </p>

            {/* Clean Contact Roster (Replaces bulky card boxes) */}
            <div className="contactRoster">
              <div className="contactRow">
                <div className="contactRowLeft">
                  <MailIcon />
                  <span>blando.jericho26@gmail.com</span>
                </div>
                <button
                  className="actionBtn"
                  onClick={() => copyToClipboard("blando.jericho26@gmail.com", "Email")}
                >
                  Copy
                </button>
              </div>

              <div className="contactRow">
                <div className="contactRowLeft">
                  <PhoneIcon />
                  <span>+63 924 324 9877</span>
                </div>
                <button
                  className="actionBtn"
                  onClick={() => copyToClipboard("+639243249877", "Phone number")}
                >
                  Copy
                </button>
              </div>

              <div className="contactRow">
                <div className="contactRowLeft">
                  <GithubIcon />
                  <span>github.com/echo10000</span>
                </div>
                <a
                  className="actionBtn"
                  href="https://github.com/echo10000"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit
                </a>
              </div>

              <div className="contactRow">
                <div className="contactRowLeft">
                  <LinkedInIcon />
                  <span>linkedin.com/in/jericho-blando</span>
                </div>
                <a
                  className="actionBtn"
                  href="https://www.linkedin.com/in/jericho-blando-5530172b0/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit
                </a>
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <form className="messageForm" onSubmit={handleSendMessage}>
            <h3>Send a Message</h3>
            <p>Send a direct inquiry to my inbox.</p>

            <div className="fieldGroup">
              <label className="fieldLabel" htmlFor="nameInput">
                Your Name
              </label>
              <input
                id="nameInput"
                className="fieldInput"
                type="text"
                placeholder="Jane Doe"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
              />
            </div>

            <div className="fieldGroup">
              <label className="fieldLabel" htmlFor="emailInput">
                Your Email
              </label>
              <input
                id="emailInput"
                className="fieldInput"
                type="email"
                placeholder="jane@organization.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
              />
            </div>

            <div className="fieldGroup">
              <label className="fieldLabel" htmlFor="messageInput">
                Message
              </label>
              <textarea
                id="messageInput"
                className="fieldTextarea"
                placeholder="Details about your opportunity or project..."
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                required
              />
            </div>

            <button
              className="button primary"
              style={{ width: "100%", marginTop: "6px" }}
              type="submit"
            >
              Send Inquiry <ArrowIcon />
            </button>
          </form>
        </div>
      </section>

      {/* ── BACK TO TOP ── */}
      {showBackToTop && (
        <button
          className="backToTop"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          title="Back to top"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}

      {/* ── TOAST NOTIFICATION ── */}
      {toastMessage && (
        <div className="toast" role="status" aria-live="polite">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="footer shell">
        <div>
          <span>© 2026 Jericho Blando · All rights reserved</span>
        </div>
        <div className="footerLinks">
          <a href="https://github.com/echo10000" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/jericho-blando-5530172b0/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="#about">About</a>
          <a href="#projects">Work</a>
          <a href="#journey">Journey</a>
          <a href="/Jericho_Blando_Resume.pdf" download>
            Resume
          </a>
        </div>
      </footer>
    </main>
  );
}
