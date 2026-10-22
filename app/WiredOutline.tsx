"use client";

import { useEffect, useRef, useState } from "react";

// Unlike the previous hand-drawn cartoon, these ink paths come directly
// from pixels in the original artist illustration.
const IMAGE_URL = "/api/lain-art";
const ART_URL = "https://i.ebayimg.com/images/g/Ey0AAOSwCndh6qnQ/s-l500.jpg";
const ARTIST_URL = "https://x.com/abfly";
const WIDTH = 500, HEIGHT = 392;

type Line = { points: number[]; group: number; length: number };

function traceRealContours(image: HTMLImageElement): Line[] {
  const w = WIDTH, h = HEIGHT;
  const buffer = document.createElement("canvas");
  buffer.width = w; buffer.height = h;
  const context = buffer.getContext("2d", { willReadFrequently: true });
  if (!context) return [];
  context.drawImage(image, 0, 0, w, h);
  const pixels = context.getImageData(0, 0, w, h).data;
  const gray = new Float32Array(w*h);
  for (let i=0; i<gray.length; i++) {
    const p=i*4;
    gray[i]=pixels[p]*.299+pixels[p+1]*.587+pixels[p+2]*.114;
  }
  const blur = new Float32Array(w*h);
  for (let y=1;y<h-1;y++) for(let x=1;x<w-1;x++) {
    const i=y*w+x;
    blur[i]=(gray[i-w-1]+2*gray[i-w]+gray[i-w+1]+2*gray[i-1]+
      4*gray[i]+2*gray[i+1]+gray[i+w-1]+2*gray[i+w]+gray[i+w+1])/16;
  }
  const magnitude = new Float32Array(w*h);
  const direction = new Uint8Array(w*h);
  for(let y=2;y<h-2;y++) for(let x=2;x<w-2;x++) {
    const i=y*w+x;
    const gx=-blur[i-w-1]+blur[i-w+1]-2*blur[i-1]+2*blur[i+1]-blur[i+w-1]+blur[i+w+1];
    const gy=-blur[i-w-1]-2*blur[i-w]-blur[i-w+1]+blur[i+w-1]+2*blur[i+w]+blur[i+w+1];
    magnitude[i]=Math.sqrt(gx*gx+gy*gy);
    let a=Math.atan2(gy,gx)*180/Math.PI;
    if(a<0)a+=180;
    direction[i]=a<22.5||a>=157.5?0:a<67.5?1:a<112.5?2:3;
  }
  // Nonmaximum suppression produces thin lines instead of broad random scribbles.
  const edge = new Uint8Array(w*h);
  const offsets=[[1,-1],[w+1,-w-1],[w,-w],[w-1,-w+1]];
  for(let y=3;y<h-3;y++) for(let x=3;x<w-3;x++) {
    const i=y*w+x, m=magnitude[i];
    if(m<69)continue;
    const pair=offsets[direction[i]];
    if(m>=magnitude[i+pair[0]]&&m>=magnitude[i+pair[1]])edge[i]=1;
  }
  const seen=new Uint8Array(w*h);
  const neighbors=[-w-1,-w,-w+1,-1,1,w-1,w,w+1];
  const lines:Line[]=[];
  const degree=(i:number)=>{
    let n=0;
    for(const off of neighbors)if(edge[i+off])n++;
    return n;
  };
  function walk(start:number){
    const points:number[]=[];
    let i=start,prev=-1,length=0;
    for(let step=0;step<600;step++){
      if(seen[i]||!edge[i])break;
      seen[i]=1;
      const x=i%w, y=Math.floor(i/w);
      if(points.length>=2){
        length+=Math.hypot(x-points[points.length-2],y-points[points.length-1]);
      }
      points.push(x,y);
      let best=-1,bestScore=-Infinity;
      for(const off of neighbors){
        const next=i+off;
        if(next<=w||next>=(h-1)*w||!edge[next]||seen[next])continue;
        const dx=next%w-x,dy=Math.floor(next/w)-y;
        let score=magnitude[next]*.01;
        if(prev>=0){
          const px=x-prev%w,py=y-Math.floor(prev/w);
          score+=(px*dx+py*dy)/(Math.hypot(px,py)*Math.hypot(dx,dy))*8;
        }
        if(score>bestScore){bestScore=score;best=next;}
      }
      if(best<0)break;
      prev=i; i=best;
    }
    if(points.length<7||length<9)return;
    const reduced:number[]=[];
    for(let j=0;j<points.length;j+=2){
      if(j===0||j>=points.length-2||j%4===0)reduced.push(points[j],points[j+1]);
    }
    const center=Math.floor(points.length/4)*2;
    const mx=points[center]??points[0],my=points[center+1]??points[1];
    const group=(mx>86&&mx<260&&my<155)?0:
      (mx>75&&mx<310&&my>=140&&my<385)?1:
      (mx>=292&&my<232)?2:3;
    lines.push({points:reduced,group,length});
  }
  // First trace paths that have clear endpoints; then closed loops and branches.
  for(let y=4;y<h-4;y++)for(let x=4;x<w-4;x++){
    const i=y*w+x;
    if(edge[i]&&!seen[i]&&degree(i)===1)walk(i);
  }
  for(let y=4;y<h-4;y++)for(let x=4;x<w-4;x++){
    const i=y*w+x;
    if(edge[i]&&!seen[i])walk(i);
  }
  const groupCount=[0,0,0,0],groupLimit=[290,400,290,260];
  return lines.sort((a,b)=>a.group-b.group||b.length-a.length)
    .filter(line=>++groupCount[line.group]<=groupLimit[line.group]);
}

export default function WiredOutline(){
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const [run,setRun]=useState(0);
  const [ready,setReady]=useState(false);
  const [failed,setFailed]=useState(false);

  useEffect(()=>{
    let disposed=false,frame=0;
    setReady(false);setFailed(false);
    const canvas=canvasRef.current;
    if(!canvas)return;
    canvas.width=WIDTH;canvas.height=HEIGHT;
    const ctx=canvas.getContext("2d");
    if(!ctx)return;
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    const art=new Image();
    art.onload=()=>{
      if(disposed)return;
      let strokes:Line[];
      try{strokes=traceRealContours(art);}catch{setFailed(true);return;}
      if(!strokes.length){setFailed(true);return;}
      ctx.lineCap="round";ctx.lineJoin="round";
      ctx.strokeStyle="rgba(46,42,53,.87)";ctx.lineWidth=.82;
      let drawn=0;
      const start=performance.now();
      setReady(true);
      const render=(now:number)=>{
        if(disposed)return;
        const elapsed=Math.min(1,(now-start)/4800);
        const target=Math.ceil(strokes.length*elapsed);
        while(drawn<target){
          const stroke=strokes[drawn++];
          const pts=stroke.points;
          ctx.beginPath();
          ctx.moveTo(pts[0],pts[1]);
          for(let j=2;j<pts.length;j+=2)ctx.lineTo(pts[j],pts[j+1]);
          ctx.stroke();
        }
        if(elapsed<1)frame=requestAnimationFrame(render);
      };
      frame=requestAnimationFrame(render);
    };
    art.onerror=()=>{if(!disposed)setFailed(true);};
    art.src=IMAGE_URL;
    return()=>{
      disposed=true;cancelAnimationFrame(frame);
      art.onload=null;art.onerror=null;
    };
  },[run]);

  return (
    <figure className="inkStudy" aria-label="Lain at her NAVI, with real artwork contours drawn before the color develops">
      <div className="inkStudy__header">
        <span>WIRED ARCHIVE / ORIGINAL CONTOURS</span>
        <span>● SIGNAL ACTIVE</span>
      </div>
      <div className="inkStudy__frame">
        {failed?(
          <a className="inkStudy__fallback" href={ART_URL} target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ART_URL} alt="Lain seated beside her computer, illustration attributed to Yoshitoshi ABe"/>
          </a>
        ):(
          <>
            <canvas ref={canvasRef} className="inkStudy__lines" width={WIDTH} height={HEIGHT} aria-hidden="true"/>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={"paint-"+run} src={IMAGE_URL}
              alt="Illustration attributed to Yoshitoshi ABe: Lain seated by her computer in a blue room."
              className={"inkStudy__final"+(ready?" inkStudy__final--ready":"")}
              width={WIDTH} height={HEIGHT} loading="eager"
              onError={()=>setFailed(true)}/>
          </>
        )}
        <span className="inkStudy__tag" aria-hidden="true">ORIGINAL ART / LIVE TRACING</span>
      </div>
      <figcaption className="inkStudy__footer">
        <div className="inkStudy__credits">
          <span>ART BY <a href={ARTIST_URL} target="_blank" rel="noopener noreferrer">YOSHITOSHI ABe ↗</a></span>
          <a href={ART_URL} target="_blank" rel="noopener noreferrer">VIEW ARTWORK ↗</a>
        </div>
        <button type="button" onClick={()=>setRun(n=>n+1)} aria-label="Replay the original artwork sketch animation">↺ REPLAY SKETCH</button>
      </figcaption>
    </figure>
  );
}
