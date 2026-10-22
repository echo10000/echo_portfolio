"use client";

import { useState } from "react";

/**
 * Anime illustration is a real optimized image in /public.
 * The old hand-coded face and anatomy have been retired.
 * A staggered ink exposure reveals the finished illustration.
 */
export default function WiredOutline() {
  const [pass, setPass] = useState(0);

  return (
    <figure className="lainFilm" aria-label="An anime-inspired girl at an old NAVI computer">
      <div className="lainFilm__bar">
        <span>THE WIRED / IMAGE DECODER</span>
        <span className="lainFilm__status"><span aria-hidden="true">●</span> ONLINE</span>
      </div>

      <div className="lainFilm__canvas">
        <div className="lainFilm__ambient" aria-hidden="true" />
        <div className="lainFilm__screenGlow" aria-hidden="true" />
        <div className="lainFilm__imageReveal" key={pass}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="lainFilm__anime"
            src="/lain-computer.png"
            alt="Quiet brown-haired anime-inspired girl wearing a navy uniform and red ribbon, seated beside a glowing blue 1990s CRT computer"
            width={160}
            height={200}
            loading="eager"
            decoding="async"
          />
          <span className="lainFilm__trace" aria-hidden="true" />
        </div>
        <span className="lainFilm__index" aria-hidden="true">SERIAL NO. 01 / NAVI</span>
        <span className="lainFilm__reticle" aria-hidden="true">＋</span>
      </div>

      <figcaption className="lainFilm__footer">
        <span><span className="lainFilm__live" aria-hidden="true" /> IMAGE LINK ESTABLISHED</span>
        <button
          type="button"
          onClick={() => setPass((n) => n + 1)}
          aria-label="Replay the anime image drawing reveal"
        >
          ↺ REPLAY TRANSMISSION
        </button>
      </figcaption>
    </figure>
  );
}
