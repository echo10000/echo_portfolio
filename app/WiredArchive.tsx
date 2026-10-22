"use client";

import { useState } from "react";

type ArchiveProject = {
  id: string;
  title: string;
  categoryLabel: string;
  description: string;
  architecture: string;
  stack: string[];
  href: string | null;
  cta: string;
};

type Props = {
  projects: ArchiveProject[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

const FILES = [
  { short: "CBA IMS", code: "IMS", label: "ASSET MANAGEMENT", highlight: "Track. Reserve. Account.", diagram: ["STUDENT PORTAL", "DJANGO / PERMISSIONS", "INVENTORY RECORDS"], accent: "red" },
  { short: "SCHEDULER", code: "ORT", label: "ACADEMIC OPTIMIZATION", highlight: "Solve. Balance. Schedule.", diagram: ["ACADEMIC INPUTS", "OR-TOOLS / CONSTRAINTS", "VALIDATED TIMETABLE"], accent: "blue" },
  { short: "ATTENDANCE", code: "QRC", label: "DESKTOP VERIFICATION", highlight: "Scan. Verify. Export.", diagram: ["QR CODE / CAMERA", "JAVA SWING + JDBC", "ATTENDANCE REPORT"], accent: "green" },
] as const;

// FILES intentionally follows the existing site's projects order.
const FILE_ORDER = ["cba-inventory", "faculty-sched", "attendance-monitoring"] as const;

export default function WiredArchive({ projects, activeIndex, onSelect }: Props) {
  const [showInternals, setShowInternals] = useState(false);
  const project = projects.find((item) => item.id === FILE_ORDER[activeIndex]) || projects[0];
  const file = FILES[activeIndex] ?? FILES[0];
  const changeFile = (index: number) => {
    onSelect((index + FILES.length) % FILES.length);
    setShowInternals(false);
  };

  return (
    <section className="naviArchive" id="wired-archive" aria-labelledby="naviArchiveTitle">
      <div className="naviArchive__backdrop" aria-hidden="true">ACCESS<span>GRANTED</span></div>
      <div className="naviArchive__inner shell">
        <div className="naviArchive__intro">
          <div className="naviArchive__eyebrow"><span className="naviArchive__pulse"/> LIVE CONNECTION / PORT 03</div>
          <h2 id="naviArchiveTitle">THE WORK<span>ARCHIVE.</span></h2>
          <p>Actual systems, not just a list of technologies. Select a project file to inspect the problem, architecture, and tools behind it.</p>
          <div className="naviArchive__introFoot">
            <span>03 FILES / SELECT A RECORD</span>
            <span>ACCESS LEVEL: PUBLIC</span>
          </div>
        </div>

        <div className="naviArchive__window" aria-label="Interactive project archive">
          <div className="naviArchive__topbar">
            <div className="naviArchive__dots" aria-hidden="true"><i/><i/><i/></div>
            <span>navi://workspace/projects</span>
            <span className="naviArchive__on"><span/> CONNECTED</span>
          </div>
          <div className="naviArchive__workspace">
            <div className="naviArchive__files" aria-label="Project files">
              <div className="naviArchive__smallhead">
                <span>DIRECTORY / WORK</span>
                <span>03</span>
              </div>
              {FILES.map((entry, index) => (
                <button
                  type="button"
                  key={entry.code}
                  className={"naviArchive__file" + (activeIndex === index ? " isActive" : "")}
                  aria-pressed={activeIndex === index}
                  onClick={() => changeFile(index)}
                >
                  <span className="naviArchive__fileIcon" aria-hidden="true">▤</span>
                  <span className="naviArchive__fileCopy"><strong>{entry.short}</strong><small>{entry.label}</small></span>
                  <span className="naviArchive__fileArrow" aria-hidden="true">↗</span>
                </button>
              ))}
              <div className="naviArchive__fileHelp">
                <span>TIP / SELECT ANY FILE</span>
                <p>Each folder opens a different real project.</p>
              </div>
            </div>

            <div className={"naviArchive__record naviArchive__record--" + file.accent} key={project.id} aria-live="polite">
              <div className="naviArchive__recordMeta">
                <span>FILE 0{activeIndex + 1} / 03</span>
                <span className="naviArchive__access">● RECORD OPEN</span>
              </div>
              <div className="naviArchive__recordTitle">
                <span className="naviArchive__recordEyebrow">{file.label}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="naviArchive__system" aria-label="Simplified architecture diagram">
                <div className="naviArchive__systemTop">
                  <span>INSPECTOR / DATA FLOW</span>
                  <span>LIVE PREVIEW*</span>
                </div>
                <div className="naviArchive__diagram">
                  {file.diagram.map((node, i) => (
                    <div className="naviArchive__diagramPair" key={node}>
                      <div className={"naviArchive__node" + (i === 1 ? " isCore" : "")}>
                        <span>0{i + 1}</span><strong>{node}</strong>
                      </div>
                      {i !== file.diagram.length - 1 && <span className="naviArchive__flow" aria-hidden="true">→</span>}
                    </div>
                  ))}
                </div>
                <div className="naviArchive__systemFoot"><span>SCHEMATIC REPRESENTATION — NOT A PRODUCT SCREENSHOT</span><span>● SYSTEM MAP</span></div>
              </div>
              <div className="naviArchive__stack" aria-label="Technologies">
                {project.stack.slice(0, 6).map(tech => <span key={tech}>{tech}</span>)}
              </div>
              <button
                type="button"
                className="naviArchive__expand"
                onClick={() => setShowInternals(v => !v)}
                aria-expanded={showInternals}
                aria-controls="navi-architecture"
              >
                <span>{showInternals ? "− HIDE TECHNICAL DETAILS" : "+ INSPECT TECHNICAL DETAILS"}</span>
                <span>{showInternals ? "↑" : "↓"}</span>
              </button>
              {showInternals && (
                <div className="naviArchive__internals" id="navi-architecture">
                  <strong>ARCHITECTURE / IMPLEMENTATION</strong>
                  <p>{project.architecture}</p>
                </div>
              )}
              <div className="naviArchive__recordActions">
                <a href={"#project-" + project.id} className="naviArchive__primary">
                  VIEW COMPLETE RECORD <span aria-hidden="true">↗</span>
                </a>
                {project.href ? (
                  <a href={project.href} target="_blank" rel="noopener noreferrer" className="naviArchive__external">
                    SOURCE CODE ↗
                  </a>
                ) : (
                  <a href="#contact" className="naviArchive__external">ASK ABOUT THIS BUILD ↗</a>
                )}
              </div>
            </div>
          </div>
          <div className="naviArchive__statusbar">
            <span>↳ {file.code}.SYS / <strong>{project.categoryLabel}</strong></span>
            <div className="naviArchive__pager" aria-label="Switch project files">
              <button type="button" aria-label="Previous project" onClick={() => changeFile(activeIndex - 1)}>←</button>
              <span>0{activeIndex + 1} / 03</span>
              <button type="button" aria-label="Next project" onClick={() => changeFile(activeIndex + 1)}>→</button>
            </div>
          </div>
        </div>
      </div>
      <div className="naviArchive__bottomLine shell">
        <span>YOU ARE NOW CONNECTED.</span>
        <a href="#projects">BROWSE FULL PROJECT INDEX ↓</a>
      </div>
    </section>
  );
}
