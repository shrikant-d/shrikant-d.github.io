"use client";
import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS } from "@/lib/data";
import { prefersReducedMotion, useInView } from "@/lib/hooks";
import Head from "./Head";

function Count({ to, suffix, go }: { to: number; suffix: string; go: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go) return;
    if (prefersReducedMotion()) { setV(to); return; }
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 1400);
      setV(Math.round(to * (1 - Math.pow(1 - k, 4))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, to]);
  return <>{v}{suffix}</>;
}

function Card({ a, i, near }: { a: (typeof ACHIEVEMENTS)[number]; i: number; near: boolean }) {
  const [ref, seen] = useInView<HTMLElement>(0.5);
  return (
    <article className={"ach" + (near ? " near" : "")} ref={ref}>
      <div className="ach-top"><span className="logo-tile">{a.mark}</span><span className="idx">{String(i + 1).padStart(2, "0")} / {String(ACHIEVEMENTS.length).padStart(2, "0")}</span></div>
      <div className="ach-bot">
        <div><p className="tag"><span>{a.label}</span></p><h3>{a.caption}</h3><p>{a.detail}</p></div>
        <div className="num" aria-label={`${a.value}${a.suffix}`}><Count to={a.value} suffix={a.suffix} go={seen} /></div>
      </div>
    </article>
  );
}

export default function Achievements() {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [travel, setTravel] = useState(0);
  const [near, setNear] = useState(0);
  useEffect(() => {
    const measure = () => {
      const t = track.current; if (!t) return;
      setTravel(Math.max(0, t.scrollWidth - innerWidth));
    };
    const on = () => {
      const el = outer.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const span = el.offsetHeight - innerHeight;
      setProgress(span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0);
    };
    measure(); on();
    addEventListener("resize", measure); addEventListener("scroll", on, { passive: true });
    return () => { removeEventListener("resize", measure); removeEventListener("scroll", on); };
  }, []);
  useEffect(() => {
    const t = track.current; if (!t) return;
    const cards = Array.from(t.children) as HTMLElement[];
    const mid = innerWidth / 2;
    let best = 0, bd = Infinity;
    cards.forEach((c, i) => { const r = c.getBoundingClientRect(); const dd = Math.abs(r.left + r.width / 2 - mid); if (dd < bd) { bd = dd; best = i; } });
    setNear(best);
  }, [progress]);
  return (
    <section id="achievements" ref={outer} className="pin" style={{ height: `calc(100svh + ${travel}px)` }}>
      <div className="pin-in">
        <div className="wrap pin-head">
          <Head n="05" label="Achievements">Numbers that <em>matter.</em></Head>
          <div className="bar" aria-hidden><span style={{ transform: `scaleX(${progress})` }} /></div>
        </div>
        <div className="track" ref={track} style={{ transform: `translateX(${-progress * travel}px)` }}>
          {ACHIEVEMENTS.map((a, i) => <Card key={a.caption} a={a} i={i} near={near === i} />)}
          <div className="ach-end">and counting →</div>
        </div>
      </div>
    </section>
  );
}
