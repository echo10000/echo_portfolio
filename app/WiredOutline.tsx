"use client";

import { useId, useState } from "react";

// Artwork reproduced from an externally hosted poster preview; it is NOT generated
// by this portfolio. Credit the original artist and preserve the original source.
// This URL may disappear if the seller removes the listing; never mislabel it as licensed.
const ART_URL = "https://i.ebayimg.com/images/g/Ey0AAOSwCndh6qnQ/s-l500.jpg";
const ARTIST_URL = "https://x.com/abfly";
const ART_SOURCE_URL = "https://www.ebay.com/itm/393889608986";

type InkStroke = readonly [path: string, width: number, begin: number];

/*
  A local, contour-aware stroke order in artwork coordinates (500 x 392).
  Hair and face draw first, followed by the uniform, computer and desk.
  Each path reveals the ORIGINAL artwork along a hand-shaped stroke.
  This is deliberately not a left-to-right CSS clip.
*/
const inkStrokes: InkStroke[] = [
  // Bob silhouette / crown
  ["M93 111 C88 80 102 50 129 27 C154 7 202 4 224 28", 36, .15],
  ["M109 66 C114 33 147 19 176 17 C207 16 226 34 229 69", 30, .37],
  ["M123 41 C146 54 167 42 191 38 C213 40 228 63 236 86", 31, .56],
  ["M101 79 Q124 94 120 117 L109 162", 25, .76],
  ["M116 65 C143 77 162 70 172 54 M142 93 C164 73 184 69 202 78", 24, .93],
  ["M207 67 C226 86 225 109 214 132", 27, 1.15],
  ["M226 66 C241 87 239 120 223 142", 19, 1.30],
  ["M90 114 C94 140 110 160 131 174", 23, 1.46],
  // Face/eyes, not a substitute cartoon drawing
  ["M124 94 C140 82 164 83 178 96", 15, 1.59],
  ["M179 96 Q199 80 219 94", 15, 1.69],
  ["M134 111 Q149 125 166 113", 17, 1.78],
  ["M183 108 Q201 121 214 104", 18, 1.88],
  ["M128 112 C132 134 145 152 164 166 C187 177 205 163 217 140", 26, 2.00],
  ["M153 129 Q163 134 168 126 M183 133 Q191 134 196 130", 15, 2.14],
  ["M169 140 L176 142 M160 154 Q180 160 198 149", 16, 2.24],
  // Lain's asymmetric lock
  ["M214 115 C228 148 223 178 211 198", 23, 2.37],
  ["M224 124 Q242 155 237 194", 20, 2.48],
  // Hair highlights
  ["M116 48 Q140 23 179 26 M145 58 Q177 30 202 40", 16, 2.60],
  // Neck and broad blue top
  ["M134 167 Q143 185 158 192 Q185 197 205 171", 23, 2.79],
  ["M110 156 C91 174 86 196 89 233 C93 269 121 292 154 308", 48, 2.98],
  ["M142 176 Q165 198 184 201 M186 178 Q200 199 215 213", 32, 3.13],
  ["M94 194 C102 229 121 257 135 286", 48, 3.25],
  ["M124 194 C149 220 181 236 202 270", 50, 3.42],
  ["M184 191 C216 215 245 242 268 268", 49, 3.60],
  ["M230 199 Q269 231 291 276", 45, 3.75],
  ["M104 254 Q138 290 187 315 Q238 323 285 310", 60, 3.86],
  ["M103 284 Q170 318 253 318", 50, 4.05],
  ["M224 260 L251 307 M247 239 L268 289", 35, 4.21],
  ["M145 264 Q181 289 202 305", 40, 4.38],
  // Hands and shorts / seated legs
  ["M121 274 Q121 306 133 324 Q148 333 170 325", 34, 4.50],
  ["M179 304 Q205 309 230 321 L260 353", 45, 4.65],
  ["M232 316 Q270 321 307 343", 50, 4.81],
  ["M268 322 C295 327 329 350 353 386", 57, 5.02],
  ["M204 342 Q231 365 241 392", 56, 5.23],
  ["M151 327 C161 343 159 369 156 391", 45, 5.43],
  ["M267 340 Q307 357 321 388", 43, 5.59],
  // Computer / navigation monitor at right
  ["M314 28 L463 29 L481 55 L473 171", 34, 5.78],
  ["M314 28 L315 150 L471 171", 29, 5.93],
  ["M327 42 L455 43 L454 142 L330 138 Z", 27, 6.08],
  ["M335 59 L435 60 M348 75 L424 73 M339 99 L449 101", 17, 6.19],
  ["M449 58 L445 127 M355 117 L426 124", 20, 6.31],
  ["M296 152 L463 160 L478 186 L310 176 Z", 28, 6.50],
  ["M304 181 Q369 204 485 188", 32, 6.71],
  ["M328 160 L341 198 M359 160 L365 202 M398 166 L403 198", 22, 6.84],
  // Computer clutter / cables / desk outlines
  ["M262 177 C283 185 287 217 305 237", 26, 7.04],
  ["M331 190 Q366 207 383 228", 21, 7.19],
  ["M409 200 Q440 222 476 221", 20, 7.29],
  ["M286 225 C338 218 401 219 472 236", 30, 7.41],
  ["M11 201 Q56 188 103 185", 36, 7.49],
  ["M16 235 Q50 227 85 235", 34, 7.60],
  ["M20 289 Q57 271 105 276", 34, 7.68],
  ["M29 348 Q78 328 112 338", 40, 7.73],
  ["M348 251 C399 252 451 254 497 244", 38, 7.83],
  ["M357 272 Q419 265 497 279", 29, 7.92],
  // Small scattered pen marks across the image
  ["M31 76 Q64 63 80 46 M29 119 Q56 99 89 101", 29, 8.01],
  ["M469 322 C482 305 490 291 494 271", 29, 8.12],
  ["M389 345 Q436 357 487 342", 42, 8.19],
  ["M9 379 Q58 361 105 379", 36, 8.25]
];

export default function WiredOutline() {
  const [run, setRun] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const reactId = useId().replace(/:/g, "");
  const maskId = "lainInkMask-" + reactId;

  return (
    <figure className="abeArtwork" aria-label="Yoshitoshi ABe illustration of Lain at her computer with a progressive ink tracing animation">
      <header className="abeArtwork__header">
        <span>WIRED ARCHIVE / LAYER 01</span>
        <span>● INK TRANSMISSION</span>
      </header>
      <div className="abeArtwork__canvas">
        {imageFailed ? (
          <div className="abeArtwork__fallback">
            <p>Original artwork preview unavailable.</p>
            <a href={ART_SOURCE_URL} target="_blank" rel="noopener noreferrer">View the artwork source ↗</a>
          </div>
        ) : (
          <>
            <svg
              className="abeArtwork__tracing"
              viewBox="0 0 500 392"
              preserveAspectRatio="xMidYMid meet"
              key={"ink-" + run}
              role="img"
              aria-label="Lain's hair, face, clothes, the computer and its wires appear stroke by stroke."
            >
              <defs>
                <mask id={maskId} x="0" y="0" width="500" height="392" maskUnits="userSpaceOnUse">
                  <rect width="500" height="392" fill="black" />
                  {inkStrokes.map(([d, width, delay], i) => (
                    <path
                      key={i}
                      d={d}
                      fill="none"
                      stroke="white"
                      strokeWidth={width}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength={1}
                      strokeDasharray={1}
                      strokeDashoffset={1}
                      className="abeArtwork__maskStroke"
                      style={{ animationDelay: delay + "s" }}
                    />
                  ))}
                </mask>
              </defs>
              <image
                x="0" y="0" width="500" height="392"
                preserveAspectRatio="xMidYMid meet"
                href={ART_URL}
                mask={"url(#" + maskId + ")"}
                className="abeArtwork__inkImage"
              />
            </svg>
            <img
              src={ART_URL}
              alt="Original Yoshitoshi ABe illustration of Lain sitting beside her 1990s computer in a blue room."
              className="abeArtwork__finished"
              key={"color-" + run}
              width={500}
              height={392}
              loading="eager"
              onError={() => setImageFailed(true)}
            />
          </>
        )}
        <span className="abeArtwork__issue" aria-hidden="true">SERIAL EXPERIMENTS / 001</span>
      </div>
      <figcaption className="abeArtwork__footer">
        <div className="abeArtwork__credit">
          <span>ARTWORK BY <a href={ARTIST_URL} target="_blank" rel="noopener noreferrer">YOSHITOSHI ABe ↗</a></span>
          <a href={ART_SOURCE_URL} target="_blank" rel="noopener noreferrer">ARTWORK REFERENCE ↗</a>
        </div>
        <button type="button" onClick={() => setRun(n => n + 1)} aria-label="Draw the artwork again">
          ↺ DRAW AGAIN
        </button>
      </figcaption>
    </figure>
  );
}
