"use client";

import { useState } from "react";

/**
 * Original line-art transmission: a quiet operator using a retro CRT.
 * Every path is a real SVG stroke. CSS reveals the contour in sequence,
 * rather than cross-fading a pre-rendered photograph.
 */
type TraceTone = "ink" | "faint" | "red" | "signal";
type Trace = readonly [path: string, tone?: TraceTone];

const contours: Trace[] = [
  // Distant wire / signal scaffolding
  ["M22 141 C183 112 341 140 477 108 C633 71 758 70 889 82","faint"],
  ["M9 195 C202 160 332 203 493 161 C653 122 779 152 889 137","faint"],
  ["M41 111 L49 345 M18 153 L94 149 M28 210 L101 205","faint"],
  ["M795 72 L802 265 M756 106 L843 106 M776 176 L832 177","faint"],
  ["M663 86 L665 151 M641 108 L692 108","faint"],
  ["M16 697 L888 697 M29 714 L884 714","faint"],

  // Computer / deep frame and perspective body
  ["M71 235 L435 216 L464 606 L84 625 Z"],
  ["M435 216 L485 251 L501 600 L464 606"],
  ["M71 235 L105 257 L111 583 L84 625","faint"],
  ["M105 267 L402 254 Q412 253 414 267 L426 535 Q427 547 413 548 L111 570 Q99 571 99 559 L93 283 Q93 271 105 267 Z"],
  ["M119 282 L390 270 L402 522 L123 542 Z","red"],
  ["M109 266 L121 281 M402 254 L390 270 M426 535 L402 522 M111 570 L123 542","faint"],
  ["M89 603 Q230 593 422 579 L463 604","faint"],
  ["M130 629 L423 620 L427 641 L134 649 Z"],
  ["M170 649 L177 678 L369 676 L389 641","faint"],
  ["M146 621 L435 608","faint"],
  ["M445 291 L459 522 M466 281 L479 529","faint"],
  ["M443 558 L452 561 M443 568 L452 570 M444 580 L453 582","faint"],
  ["M441 586 A5 5 0 1 0 451 586 A5 5 0 1 0 441 586","red"],
  ["M457 252 L477 267 M466 268 L479 280","faint"],

  // The CRT displays a small ghost of the outside world
  ["M151 476 L151 393 L175 393 L175 463 M176 466 L176 350 L192 350 L192 471","faint"],
  ["M201 475 L201 407 L224 407 L224 474 M226 473 L226 369 L244 369 L244 474","faint"],
  ["M254 474 L254 389 L276 389 L276 472 M282 468 L282 428 L310 428 L310 470","faint"],
  ["M314 470 L314 356 L321 356 L321 470 M319 379 L361 382","faint"],
  ["M135 437 C200 417 270 427 380 406","red"],
  ["M139 446 C217 458 310 439 383 433","faint"],
  ["M129 478 L388 462 M142 489 L381 482","faint"],
  ["M175 345 L180 318 M156 328 L204 331","faint"],
  ["M319 356 L318 296 M289 319 L348 319","faint"],
  ["M151 363 Q270 351 386 342","faint"],
  ["M136 512 L208 509 M238 505 L309 501 M325 500 L380 497","red"],

  // Side cabinet, tower, floppy-drive architecture
  ["M474 597 L539 595 L543 670 L469 672 Z","faint"],
  ["M483 613 L529 610 M485 623 L530 620 M484 641 L530 637","faint"],
  ["M500 651 L524 649","red"],
  ["M81 631 L81 676 M465 606 L468 681","faint"],

  // Girl's hair silhouette / crown: distinct anime profile
  ["M521 352 C506 325 500 282 505 244 C510 176 542 129 599 112 C645 96 699 105 733 129 C778 160 803 209 793 272 C806 317 800 366 773 402"],
  ["M521 350 C509 382 504 412 493 440 C517 431 533 416 546 399","ink"],
  ["M529 209 C544 162 577 133 624 119 C694 102 753 147 771 214","faint"],
  ["M515 246 C508 216 510 185 529 158 C537 204 538 238 526 265"],
  ["M551 151 C538 202 546 242 527 282 C552 272 569 240 575 218"],
  ["M591 125 C576 185 585 237 551 282 C580 279 600 256 605 225"],
  ["M624 116 C629 162 622 216 596 256 C620 245 649 217 652 180"],
  ["M665 115 C691 145 708 201 696 244 C714 224 717 199 714 177"],
  ["M717 131 C751 177 758 215 750 254 C765 235 770 213 767 199"],
  ["M777 234 C788 273 785 329 768 354 C773 310 748 269 737 246"],
  ["M787 303 C808 345 804 395 779 426 L747 401"],
  ["M747 237 C764 277 758 328 751 377 C747 411 767 440 798 446","faint"],
  ["M757 351 C744 388 749 431 780 461","faint"],
  ["M510 286 C505 308 505 323 494 337 Q488 344 500 350 L517 356"],
  // face, ear, neck
  ["M527 280 C527 315 526 354 543 379 C556 399 579 411 608 411 C644 411 661 389 679 364","ink"],
  ["M515 351 C527 359 537 359 545 352","faint"],
  ["M534 379 C548 385 561 386 570 382","faint"],
  ["M589 409 L590 445 M656 400 C656 420 663 438 683 454","ink"],
  ["M599 427 C617 435 640 437 655 429","faint"],
  ["M652 346 Q664 345 674 338","faint"],
  ["M654 351 C656 355 658 355 663 356","faint"],
  // ear and hardware
  ["M672 287 C687 273 701 286 701 304 C701 326 691 337 681 342","ink"],
  ["M684 297 C691 298 695 312 687 321","faint"],
  ["M691 294 L711 291 L716 318 L698 322 Z","red"],
  ["M703 293 L708 318 M714 308 C738 320 763 345 771 367","red"],
  // anime eye, expression, bangs
  ["M516 301 Q535 290 553 295 Q562 299 570 307"],
  ["M521 304 Q540 313 558 307","ink"],
  ["M540 297 C533 300 533 309 541 311 C548 309 549 301 544 298","red"],
  ["M528 293 L524 287 M536 291 L535 285 M548 293 L549 287","faint"],
  ["M518 280 Q542 268 565 277","faint"],
  ["M506 343 L520 344","faint"],
  ["M538 367 Q552 374 566 368","red"],
  ["M560 372 Q564 375 568 372","faint"],

  // Oversized shirt and distant shoulder
  ["M598 438 C632 431 663 440 691 448 C739 460 780 494 800 545 C816 586 815 643 835 687","ink"],
  ["M584 438 C553 444 530 465 517 502 C497 551 477 587 443 607","ink"],
  ["M690 450 C721 470 732 497 746 532 C759 561 779 587 796 612","faint"],
  ["M801 544 C838 581 845 624 843 661","faint"],
  ["M596 437 C593 455 587 466 572 485","faint"],
  ["M671 444 Q656 461 637 467 M687 455 Q678 480 665 500","faint"],
  // sleeves, reaching keyboard with pose
  ["M551 491 C532 535 505 573 470 600 C450 613 434 621 407 627"],
  ["M577 503 C558 559 532 610 494 634 C477 643 459 644 446 645"],
  ["M470 602 Q490 617 500 637 M446 614 Q468 635 472 646","faint"],
  ["M767 546 C757 594 729 621 676 639 C637 652 583 662 549 657"],
  ["M786 595 C782 647 753 687 710 708 L653 715","ink"],
  ["M693 635 C705 653 710 669 714 686","faint"],
  ["M735 611 C748 627 754 649 747 661","faint"],
  ["M611 506 Q628 539 630 568 M620 484 L627 497","faint"],
  // keyboard and desk in front, foreground perspective
  ["M170 676 L476 657 L589 722 L246 758 Z"],
  ["M246 758 L246 770 L592 735 L589 722 M170 676 L170 689 L246 770","faint"],
  ["M198 690 L480 674 L553 720 L259 743 Z","faint"],
  ["M215 699 L490 685 M227 710 L509 696 M240 722 L530 708 M254 733 L545 718","faint"],
  ["M230 687 L282 731 M274 683 L326 729 M321 681 L374 725 M369 677 L423 722 M420 674 L477 719 M466 670 L521 715","faint"],
  ["M179 683 L240 750 M585 728 L637 748 L889 732","faint"],
  ["M187 774 L899 753","faint"],
  // hands at keyboard: wrists/palm/fingers
  ["M405 630 C417 623 427 626 441 637 L469 648"],
  ["M407 629 C389 625 372 630 362 640 Q354 649 360 653 Q365 657 382 652 L405 646","ink"],
  ["M374 640 Q355 639 336 650 Q324 659 331 665 Q337 671 351 665 L377 657"],
  ["M363 647 Q342 646 318 661 Q311 668 318 675 Q324 680 336 674 L361 664"],
  ["M351 653 Q331 661 312 675 Q303 683 311 690 Q320 694 339 680","faint"],
  ["M555 650 C538 646 523 649 512 657 Q500 665 505 672 Q511 676 530 669","ink"],
  ["M541 663 Q522 659 512 673 Q508 681 516 685 Q526 691 539 680","faint"],
  ["M536 678 Q524 684 526 692 Q533 699 552 692","faint"],
  // clothing folds and cable tangles
  ["M551 500 Q556 532 539 551 M574 553 Q582 594 556 616","faint"],
  ["M636 568 Q666 587 685 621 M650 701 Q679 693 698 680","faint"],
  ["M814 682 C816 744 804 792 775 826 M779 713 C773 750 742 780 718 825","ink"],
  ["M590 709 C590 747 597 785 620 827 M633 725 C638 766 648 789 662 831","ink"],
  ["M528 746 Q570 744 604 754","faint"],
  ["M80 638 C34 661 48 732 100 747 C145 767 190 746 186 797","faint"],
  ["M456 589 C498 581 510 613 488 629","faint"],
  ["M496 598 Q550 577 575 615","faint"],
  ["M880 405 C853 429 847 480 875 514","faint"],
  ["M710 298 Q745 317 759 342","faint"],
  // Signal etch fragments
  ["M756 121 L805 121 M783 95 L783 146","red"],
  ["M57 743 L57 777 M42 758 L74 758","red"],
  ["M480 127 L536 127 M492 118 L492 136","red"],
  ["M835 676 L871 676 M853 658 L853 696","red"],
];

export default function WiredOutline() {
  const [renderPass, setRenderPass] = useState(0);

  return (
    <div className="wtrace" aria-label="Animated hand-drawn scene of a quiet girl at a 1990s computer">
      <div className="wtrace__top" aria-hidden="true">
        <span>INK_DECODER.EXE / V.03</span>
        <span className="wtrace__online">● CAPTURING</span>
      </div>

      <div className="wtrace__paper">
        <div className="wtrace__serial" aria-hidden="true">SUBJECT / UNKNOWN_01</div>
        <svg
          className="wtrace__svg"
          key={renderPass}
          viewBox="0 0 900 850"
          role="img"
          aria-label="A line drawing gradually traces a dark-haired anime-inspired girl sitting beside an old CRT monitor, wires, and keyboard."
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="wtrace-screen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ebe8db" stopOpacity=".95" />
              <stop offset="1" stopColor="#9a9a90" stopOpacity=".56" />
            </linearGradient>
            <pattern id="wtrace-grid" width="35" height="35" patternUnits="userSpaceOnUse">
              <path d="M35 0 H0 V35" stroke="#766b68" strokeWidth=".5" opacity=".09" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="900" height="850" fill="url(#wtrace-grid)" />
          <path className="wtrace__underpaint" d="M69 233 L435 216 L501 600 L465 640 L87 657 Z" fill="#655e61" opacity=".11" />
          <path className="wtrace__underpaint wtrace__underpaint--screen" d="M107 270 L400 257 L413 531 L113 556 Z" fill="url(#wtrace-screen)" opacity=".68" />
          <path className="wtrace__underpaint wtrace__underpaint--hair" d="M521 347 C492 300 499 211 536 159 Q610 76 706 119 Q810 156 798 272 Q808 371 764 419 L743 397 Q755 334 740 273 Q730 217 681 186 Q601 156 550 227 Z" fill="#343036" opacity=".19" />
          <path className="wtrace__underpaint wtrace__underpaint--shirt" d="M582 439 Q630 425 690 449 Q797 481 820 610 L840 703 L778 830 L614 831 L550 721 Q499 679 463 654 Q524 595 550 491 Z" fill="#5a5d58" opacity=".13" />
          {contours.map(([d, tone = "ink"], index) => (
            <path
              key={index}
              d={d}
              pathLength={1}
              className={"wtrace__stroke wtrace__stroke--" + tone}
              style={{ animationDelay: `${index * 68}ms` }}
            />
          ))}
          <g className="wtrace__completion" aria-hidden="true">
            <circle cx="745" cy="79" r="3.5" fill="#aa394f" />
            <path d="M717 79 H735 M755 79 H788" stroke="#aa394f" strokeWidth="1" />
            <text x="791" y="83" fill="#91364a" fontSize="12" fontFamily="monospace" letterSpacing="2" textAnchor="end">001</text>
          </g>
        </svg>
        <div className="wtrace__focus" aria-hidden="true">+</div>
        <div className="wtrace__caption" aria-hidden="true">TRACING THE BOUNDARY / REAL ↔ WIRED</div>
      </div>

      <div className="wtrace__bottom">
        <div className="wtrace__bottomLabel">
          <span className="wtrace__redDot" aria-hidden="true" />
          <span>IDENTITY TRACE / AUTO DRAW</span>
        </div>
        <button
          className="wtrace__replay"
          type="button"
          onClick={() => setRenderPass((pass) => pass + 1)}
          aria-label="Replay the line-drawing animation"
        >
          ↺ REPLAY DRAWING
        </button>
      </div>
    </div>
  );
}
