"use client";
import { useState } from "react";

/** Hand-drawn SVG line art. Every contour has its own timed stroke reveal. */
type Ink = "ink" | "faint" | "red" | "screen";
type Path = readonly [string, Ink?];

const outlines: Path[] = [
  // 1998-era NAVI terminal
  ["M63 221 L395 205 Q418 206 429 228 L458 554 Q460 577 444 584 L105 607 Q85 607 81 585 L61 240 Q60 225 63 221Z"],
  ["M395 205 L447 227 L469 558 L444 584","faint"],
  ["M103 252 Q103 243 116 243 L386 231 Q398 230 401 244 L415 520 Q418 535 405 539 L134 558 Q122 560 120 546Z"],
  ["M141 268 L382 250 Q391 250 391 261 L403 507 Q403 521 390 521 L151 537 Q143 538 142 529 Z","screen"],
  ["M82 236 L102 253 M105 606 L132 557 M443 581 L415 538","faint"],
  ["M124 575 L387 556 M129 588 L393 575","faint"],
  ["M427 561 A6 6 0 1 0 439 561 A6 6 0 1 0 427 561","red"],
  ["M170 606 L179 635 L397 622 L404 588","faint"],
  ["M210 633 L213 650 L365 645 L365 624","faint"],
  ["M476 337 L515 330 L522 626 L470 635 Z","faint"],
  ["M482 382 H510 M482 397 H510 M485 414 H510","faint"],
  // bright NAVI graphics
  ["M163 298 L368 284 M163 307 L307 297","screen"],
  ["M187 374 Q222 337 261 371 Q221 404 187 374Z","screen"],
  ["M222 352 C203 352 203 388 224 388 C245 388 245 352 222 352Z","screen"],
  ["M219 361 V380 M211 370 H233","screen"],
  ["M279 360 L361 355 M279 373 L340 370 M279 386 L365 381","screen"],
  ["M166 445 L363 433 M170 456 L320 449 M170 469 L359 455","screen"],
  ["M172 483 L237 477 M258 475 L355 468","screen"],
  // Head: short choppy brown bob, not generic long black hair
  ["M523 302 Q511 280 518 238 Q527 172 579 146 Q609 127 647 127 Q722 126 759 183 Q790 222 776 293"],
  ["M533 235 Q526 191 559 161 Q594 131 645 131","faint"],
  ["M672 133 Q735 151 758 219","faint"],
  ["M535 253 L549 292 L558 270 L576 300 L586 270 L604 295 L614 268 L630 289 L641 258 L654 280 L669 258 L682 275 L698 251 L710 263 L724 244"],
  ["M541 191 Q551 224 540 259","faint"],
  ["M572 158 Q585 195 572 243","faint"],
  ["M612 136 Q625 185 614 236","faint"],
  ["M650 131 Q673 170 667 224","faint"],
  ["M701 148 Q733 179 739 220","faint"],
  ["M532 289 Q522 318 530 355 Q535 383 555 400"],
  ["M765 248 Q784 284 773 328 Q759 358 748 368"],
  // Lain's thin single long side lock
  ["M733 301 C740 371 737 439 728 505 Q742 526 751 525","ink"],
  ["M748 310 C756 362 754 432 751 525","faint"],
  ["M756 356 C776 392 780 416 773 443","faint"],
  // Face with smaller pointed chin
  ["M554 283 C550 315 553 364 572 395 Q593 426 636 431 Q676 432 709 395 Q733 363 731 285"],
  ["M709 288 Q725 275 738 293 Q747 308 731 333","faint"],
  ["M725 295 Q734 307 725 317","faint"],
  // Eyes, deliberately 90s anime proportions
  ["M576 324 Q603 298 636 325","ink"],
  ["M577 330 Q605 347 636 329","ink"],
  ["M658 324 Q683 302 712 326","ink"],
  ["M659 332 Q686 347 711 330","ink"],
  ["M591 325 C589 307 618 305 619 324 Q618 344 604 342 Q591 339 591 325","faint"],
  ["M673 326 C670 308 699 307 699 326 Q698 345 687 341 Q674 341 673 326","faint"],
  ["M582 310 Q609 296 632 306","faint"],
  ["M664 307 Q691 297 707 309","faint"],
  ["M644 334 Q635 350 640 360 L648 364","faint"],
  ["M624 389 Q636 396 650 388","red"],
  ["M616 399 Q639 409 659 397","faint"],
  // Critical unmistakable crossed hairclip
  ["M722 273 L750 307 M748 272 L724 305","red"],
  ["M726 268 L730 266 M750 307 L753 309","faint"],
  // Neck, school blazer, ivory lapels and red ribbon
  ["M593 423 L590 459 M692 407 L696 459"],
  ["M594 459 Q565 468 533 501 Q499 535 479 583"],
  ["M700 455 Q758 470 791 513 Q822 557 831 661"],
  ["M596 465 L640 528 L699 460","faint"],
  ["M599 460 L612 522 L642 535 M695 460 L677 525 L647 535"],
  ["M631 536 L646 553 L660 540 L647 523Z","red"],
  ["M638 556 Q635 609 645 656 M653 554 Q655 604 664 639","red"],
  ["M573 513 L609 572 M721 503 L684 579","faint"],
  ["M540 498 Q559 507 576 553 M757 488 Q741 517 744 554","faint"],
  ["M551 553 Q526 612 482 646"],
  ["M805 550 Q802 616 776 674"],
  ["M590 618 L583 733 Q656 764 769 734 L773 643"],
  ["M603 630 Q628 649 639 674 M686 607 L700 715","faint"],
  ["M575 719 Q660 745 766 727","faint"],
  // Arms / hands on keyboard
  ["M544 555 Q519 589 497 629 L465 653"],
  ["M570 569 Q562 620 514 665"],
  ["M465 652 Q448 645 430 664 L417 678 Q414 685 423 688 L448 678"],
  ["M440 670 L416 688 Q408 697 416 701 L456 684","faint"],
  ["M457 687 L429 703 Q424 711 433 716 L470 701","faint"],
  ["M472 699 L463 714 Q467 722 480 715","faint"],
  ["M772 631 Q750 674 709 688 L575 701"],
  ["M766 667 Q744 719 697 732","faint"],
  ["M577 696 Q544 687 519 705 Q510 714 522 719 L553 707"],
  ["M549 714 L529 726 Q529 733 547 731 L568 720","faint"],
  // keyboard and desk
  ["M179 647 L476 628 L582 711 L273 746Z"],
  ["M273 746 L273 760 L584 723 L582 711","faint"],
  ["M179 647 L179 663 L273 760","faint"],
  ["M201 660 L486 647 M219 673 L502 663 M239 688 L519 679 M256 704 L545 698 M267 721 L558 712","faint"],
  ["M224 652 L303 737 M266 648 L345 732 M307 645 L392 729 M352 641 L437 725 M400 637 L484 717 M448 633 L531 715","faint"],
  ["M125 770 L879 746 M83 788 L891 764","faint"],
  // cables and broadcast fragments
  ["M97 609 C34 643 42 711 94 723 C172 745 218 759 202 821","faint"],
  ["M448 582 Q511 562 501 621","faint"],
  ["M780 397 Q835 429 838 496","faint"],
  ["M810 136 L842 136 M826 119 L826 153","red"],
  ["M70 137 L99 137 M85 123 L85 150","red"]
];

export default function WiredOutline() {
  const [pass, setPass] = useState(0);
  return (
    <div className="wtrace wtrace--lain" aria-label="Animated line drawing of Lain Iwakura at her NAVI computer">
      <div className="wtrace__top" aria-hidden="true">
        <span>LAYER_01 / LAIN IWAKURA</span>
        <span className="wtrace__online">● CONNECTING</span>
      </div>
      <div className="wtrace__paper wtrace__paper--lain">
        <svg key={pass} className="wtrace__svg" viewBox="0 0 900 850" role="img" aria-label="Lain with short brown bangs, a crossed hairclip, a long side lock, navy school uniform and red ribbon beside a blue NAVI monitor. Her outlines gradually draw themselves.">
          <defs>
            <linearGradient id="lain-blue-screen" x1="0" y1="0" x2=".7" y2="1">
              <stop offset="0" stopColor="#b9d2db"/>
              <stop offset=".5" stopColor="#5d8ab5"/>
              <stop offset="1" stopColor="#183864"/>
            </linearGradient>
            <linearGradient id="lain-brown-hair" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#715053"/>
              <stop offset="1" stopColor="#322630"/>
            </linearGradient>
          </defs>
          <g className="wtrace__color">
            <path d="M63 221L395 205Q418 206 429 228L458 554Q460 577 444 584L105 607Q85 607 81 585L61 240Q60 225 63 221Z" fill="#c3baad"/>
            <path d="M395 205 447 227 469 558 444 584Z" fill="#87857e"/>
            <path d="M103 252Q103 243 116 243L386 231Q398 230 401 244L415 520Q418 535 405 539L134 558Q122 560 120 546Z" fill="#393b44"/>
            <path d="M141 268 382 250Q391 250 391 261L403 507Q403 521 390 521L151 537Q143 538 142 529Z" fill="url(#lain-blue-screen)"/>
            <path d="M168 606 404 588 397 622 179 635Z" fill="#b9b5a9"/>
            <path d="M476 337 515 330 522 626 470 635Z" fill="#343d4b"/>
            {/* Angled bob behind youthful face */}
            <path d="M522 305Q502 258 525 205Q555 131 646 127Q736 122 763 185Q792 240 776 294Q788 368 773 443L751 525L729 489L720 411L567 423Q533 389 527 335Z" fill="url(#lain-brown-hair)"/>
            <path d="M553 280Q545 320 558 374Q578 422 635 431Q686 435 715 390Q740 344 730 285Z" fill="#e5d2c6"/>
            <path d="M555 338Q563 398 616 420Q578 416 558 382Z" fill="#c8b1a9" opacity=".5"/>
            <path d="M594 420 593 463 644 498 696 457 692 408Z" fill="#d8bdb1"/>
            {/* recognizable white collar / dark navy blazer / red ribbon */}
            <path d="M591 458Q561 466 533 501Q502 528 478 582L461 652 583 733Q650 765 770 734L836 657Q812 547 789 514Q751 468 701 454L644 534Z" fill="#303647"/>
            <path d="M597 459 644 533 618 548 593 507Z" fill="#ebe5db"/>
            <path d="M695 454 647 532 674 548 708 498Z" fill="#eee9df"/>
            <path d="M630 535 646 552 660 540 648 521Z" fill="#a23b52"/>
            <path d="M637 550 633 598 646 649 658 609 654 550Z" fill="#9b364d"/>
            {/* Lain hair in FRONT of eyes, distinctive choppy bangs and long clipped lock */}
            <path d="M538 207Q561 144 628 133Q701 119 746 171Q769 203 772 244L728 276 711 242 698 264 683 249 667 280 653 259 641 279 631 259 615 286 601 268 586 299 571 268 559 302 539 259 528 293Z" fill="#493139"/>
            <path d="M733 305Q756 341 752 397Q746 462 751 525L729 484Q739 406 733 305Z" fill="#49343a"/>
            {/* characteristic teen anime eyes */}
            <path d="M576 326Q604 302 636 326Q611 346 577 333Z M658 326Q687 304 713 329Q686 349 659 333Z" fill="#faf3eb"/>
            <ellipse cx="605" cy="327" rx="13" ry="17" fill="#7e7075"/>
            <ellipse cx="687" cy="327" rx="12" ry="17" fill="#7e7075"/>
            <ellipse cx="604" cy="330" rx="6" ry="10" fill="#2c2a33"/>
            <ellipse cx="687" cy="330" rx="6" ry="10" fill="#2c2a33"/>
            <circle cx="600" cy="320" r="4" fill="#e4e8df"/>
            <circle cx="683" cy="321" r="4" fill="#e4e8df"/>
            {/* iconographic crossed silver hairclip */}
            <path d="M722 272 750 305 755 299 728 267Z" fill="#cac8c5"/>
            <path d="M751 268 722 302 727 306 754 273Z" fill="#dadad5"/>
            {/* hands on the front keyboard */}
            <path d="M465 651Q443 642 419 677Q410 691 430 687Q406 694 417 704L452 685Q423 708 437 716L468 700Q459 724 479 715L505 660Z" fill="#d9bfb6"/>
            <path d="M576 698Q542 683 519 705Q508 718 540 711Q522 730 536 732L562 722Q544 739 566 738L584 718Z" fill="#d7beb5"/>
            <path d="M179 647 476 628 582 711 273 746Z" fill="#aaa69a"/>
            <path d="M273 746 582 711 584 723 273 760Z" fill="#62616a"/>
          </g>
          {outlines.map(([d, ink = "ink"], i) => (
            <path key={i} d={d} pathLength={1} className={"wtrace__stroke wtrace__stroke--lain-" + ink} style={{animationDelay: (i * 68) + "ms"}} />
          ))}
          <g className="wtrace__completion" aria-hidden="true">
            <path d="M805 107h28m-14-14v28" stroke="#a43a4b" strokeWidth="1.4"/>
            <text x="824" y="145" fontSize="11" fontFamily="monospace" fill="#a43a4b" textAnchor="end">NAVI: CONNECTED</text>
          </g>
        </svg>
        <div className="wtrace__serial" aria-hidden="true">岩倉玲音 / lain iwakura</div>
        <div className="wtrace__caption" aria-hidden="true">PRESENT DAY. PRESENT TIME. // THE WIRED</div>
      </div>
      <div className="wtrace__bottom">
        <div className="wtrace__bottomLabel"><span className="wtrace__redDot" aria-hidden="true"/> VECTOR TRACE / 001</div>
        <button type="button" className="wtrace__replay" onClick={() => setPass((n) => n + 1)} aria-label="Replay the outline drawing">↺ REPLAY DRAWING</button>
      </div>
    </div>
  );
}
