"use client";

import { useState } from "react";

/**
 * Identity / 001 — an editorial portrait that stays visible while information
 * is inspected. The former 3-D card flip is intentionally removed.
 */
export default function IdentityDossier() {
  const [expanded, setExpanded] = useState(false);

  return (
    <figure className={"identityDossier" + (expanded ? " identityDossier--open" : "")}>
      <div className="identityDossier__topline" aria-hidden="true">
        <span>SUBJECT / 001</span>
        <span className="identityDossier__live"><i /> IDENTITY FILE</span>
      </div>

      <div className="identityDossier__imageFrame">
        {/* The real portrait is the primary subject, with its natural colors intact. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="identityDossier__photo"
          src="/jericho-profile.png"
          alt="Portrait photograph of Jericho Blando"
          loading="lazy"
          width={640}
          height={800}
        />
        <span className="identityDossier__corner identityDossier__corner--tl" aria-hidden="true" />
        <span className="identityDossier__corner identityDossier__corner--tr" aria-hidden="true" />
        <span className="identityDossier__corner identityDossier__corner--bl" aria-hidden="true" />
        <span className="identityDossier__corner identityDossier__corner--br" aria-hidden="true" />
        <div className="identityDossier__photoIndex" aria-hidden="true">
          <span>J.B. / PH</span>
          <span>FRAME 01</span>
        </div>
        <span className="identityDossier__vertical" aria-hidden="true">PHYSICAL SELF / NO FILTER REQUIRED</span>
      </div>

      <figcaption className="identityDossier__caption">
        <div className="identityDossier__captionText">
          <strong>JERICHO BLANDO</strong>
          <span>DEVELOPER / HUMAN SIDE</span>
        </div>
        <button
          type="button"
          className="identityDossier__inspect"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls="identity-dossier-details"
        >
          <span aria-hidden="true">{expanded ? "−" : "+"}</span>
          {expanded ? "CLOSE FILE" : "INSPECT IDENTITY"}
        </button>
      </figcaption>

      <div id="identity-dossier-details" className="identityDossier__details" hidden={!expanded}>
        <div className="identityDossier__detailsHead">
          <span>PUBLIC PROFILE / DECODED</span>
          <span aria-hidden="true">↳ 001</span>
        </div>
        <dl>
          <div><dt>CURRENT FOCUS</dt><dd>Backend systems and practical automation</dd></div>
          <div><dt>WORK IN PROGRESS</dt><dd>Academic scheduling and inventory workflows</dd></div>
          <div><dt>TOOLSET</dt><dd>Python · Django · SQL · Git</dd></div>
        </dl>
        <a
          className="identityDossier__github"
          href="https://github.com/echo10000"
          target="_blank"
          rel="noopener noreferrer"
        >
          INSPECT SOURCE / GITHUB <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="identityDossier__serial" aria-hidden="true">
        <span>ANALOG CAPTURE / DIGITAL IDENTITY</span>
        <span>J/B · 0001</span>
      </div>
    </figure>
  );
}
