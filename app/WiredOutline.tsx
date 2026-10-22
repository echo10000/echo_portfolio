"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Anatomy-informed portrait: derive line art from the real anime illustration.
 * Unlike the earlier SVG, the contour pass cannot distort the character.
 */
function drawContours(image: HTMLImageElement, canvas: HTMLCanvasElement) {
  const w = image.naturalWidth, h = image.naturalHeight;
  if (!w || !h) return;
  const input = document.createElement("canvas");
  input.width = w; input.height = h;
  const ctx = input.getContext("2d", { willReadFrequently: true });
  if (!ctx) return;
  ctx.drawImage(image, 0, 0);
  const source = ctx.getImageData(0, 0, w, h).data;
  canvas.width = w; canvas.height = h;
  const outCtx = canvas.getContext("2d");
  if (!outCtx) return;
  const output = outCtx.createImageData(w, h);
  const dst = output.data;
  const brightness = (p: number) => (
    (source[p] * .299 + source[p + 1] * .587 + source[p + 2] * .114) *
    (source[p + 3] / 255)
  );
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = (y * w + x) * 4;
      if (source[i + 3] < 25) continue;
      const edge = Math.min(255, Math.max(0,
        (Math.abs(brightness(i + 4) - brightness(i - 4)) +
         Math.abs(brightness(i + 4 * w) - brightness(i - 4 * w)) - 20) * 2.8));
      if (edge < 23) continue;
      const blueScreen = source[i + 2] > source[i] * 1.22;
      dst[i] = blueScreen ? 44 : 65;
      dst[i + 1] = blueScreen ? 77 : 47;
      dst[i + 2] = blueScreen ? 111 : 57;
      dst[i + 3] = Math.min(210, edge);
    }
  }
  outCtx.putImageData(output, 0, 0);
}

export default function WiredOutline() {
  const [pass, setPass] = useState(0);
  const [ready, setReady] = useState(false);
  const [power, setPower] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const traceImage = useCallback(() => {
    if (imgRef.current?.complete && canvasRef.current && imgRef.current.naturalWidth) {
      drawContours(imgRef.current, canvasRef.current);
      setReady(true);
    }
  }, []);
  useEffect(() => { traceImage(); }, [pass, traceImage]);

  return (
    <figure className={"lainFilm lainFilm--anime" + (power ? "" : " lainFilm--sleep")} aria-label="Illustration of a quiet anime girl with a 1990s NAVI computer, progressively drawn from its actual contours">
      <div className="lainFilm__bar">
        <span>ANATOMY / WIRED TERMINAL 001</span>
        <span className="lainFilm__status"><span aria-hidden="true">●</span> {power ? "CONNECTED" : "STANDBY"}</span>
      </div>
      <div className="lainFilm__canvas lainFilm__canvas--anime">
        <div className="lainFilm__ambient" aria-hidden="true" />
        <div className="lainFilm__screenGlow" aria-hidden="true" />
        <div className="lainFilm__inkStage" key={"ink-" + pass} data-ready={ready} aria-hidden="true">
          <canvas ref={canvasRef} width={600} height={750} className="lainFilm__contours" />
        </div>
        <div className="lainFilm__colorStage" key={"color-" + pass} data-ready={ready}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src="/lain-computer.avif"
            alt="Detailed anime illustration of a brown-haired girl with crossed hairclip, navy clothing and red ribbon typing at a glowing blue retro CRT computer"
            className="lainFilm__anime"
            width={600} height={750}
            loading="eager"
            decoding="async"
            onLoad={traceImage}
          />
        </div>
        <div className="lainFilm__scanCursor" key={"cursor-" + pass} aria-hidden="true" />
        <span className="lainFilm__index" aria-hidden="true">NAVIGATION / MEMORY 01</span>
        <span className="lainFilm__reticle" aria-hidden="true">＋</span>
      </div>
      <figcaption className="lainFilm__footer">
        <span><span className="lainFilm__live" aria-hidden="true" /> {power ? "IMAGE TRANSMISSION / LIVE" : "NAVI / STANDBY"}</span>
        <div className="lainFilm__controls">
          <button type="button" onClick={() => setPower(v => !v)} aria-label={power ? "Put NAVI on standby" : "Wake NAVI"}>
            {power ? "◉ POWER" : "○ WAKE"}
          </button>
          <button type="button" onClick={() => { setReady(false); setPass(n => n + 1); }} aria-label="Replay the outline drawing">
            ↺ DRAW AGAIN
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
