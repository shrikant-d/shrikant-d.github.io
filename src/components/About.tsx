"use client";
import { useEffect, useRef, useState } from "react";
import { FACTS, PROFILE } from "@/lib/data";
import { prefersReducedMotion, useInView } from "@/lib/hooks";
import Head from "./Head";

const d = (i: number) => ({ "--i": i }) as React.CSSProperties;

/** Damped pendulum: pointer velocity kicks the card, a spring pulls it back, a faint idle sway keeps it alive. */
function useSwing(active: boolean) {
  const swing = useRef<HTMLDivElement>(null);
  const kick = useRef(0);
  useEffect(() => {
    if (!active || prefersReducedMotion()) return;
    let angle = 0, vel = 0, last = performance.now(), lastX = -1, raf = 0;
    const move = (e: PointerEvent) => {
      if (lastX >= 0) kick.current += Math.max(-40, Math.min(40, e.clientX - lastX)) * 0.04;
      lastX = e.clientX;
    };
    const tick = (t: number) => {
      const dt = Math.min(0.032, (t - last) / 1000); last = t;
      const idle = Math.sin(t / 1400) * 0.9;
      vel += (-26 * (angle - idle) - 3.2 * vel) * dt + kick.current;
      kick.current = 0;
      angle += vel * dt;
      if (swing.current) swing.current.style.transform = `rotate(${Math.max(-24, Math.min(24, angle)).toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    };
    addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, [active]);
  return swing;
}

function IdCard() {
  const [flipped, setFlipped] = useState(false);
  const [ref, seen] = useInView<HTMLDivElement>(0.1, false);
  const swing = useSwing(seen);
  const toggle = (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped((f) => !f); } };
  return (
    <div className="lanyard" ref={ref}>
      <div className="swing" ref={swing}>
        <div className="strap" aria-hidden>
          <div className="strap-text"><span>{PROFILE.name} · {PROFILE.role} · </span><span>{PROFILE.name} · {PROFILE.role} · </span></div>
        </div>
        <div className="clip" aria-hidden />
        <div className={"idcard" + (flipped ? " flipped" : "")} role="button" tabIndex={0} aria-pressed={flipped}
             aria-label="ID card, press to flip" onClick={() => setFlipped((f) => !f)} onKeyDown={toggle}
             onMouseEnter={() => matchMedia("(hover: hover)").matches && setFlipped(true)}
             onMouseLeave={() => matchMedia("(hover: hover)").matches && setFlipped(false)}>
          <div className="face front">
            <div className="band">DEVELOPER ID</div>
            <div className="photo"><img src="/portrait-bust.webp" width={480} height={600} alt="Portrait of Shrikant Dubale" /></div>
            <h3>{PROFILE.name}</h3>
            <p className="role">{PROFILE.role}</p>
            <dl>
              <div><dt>Focus</dt><dd>LLM &amp; agents</dd></div>
              <div><dt>Study</dt><dd>M.Sc., TU Ilmenau</dd></div>
            </dl>
            <div className="barcode" aria-hidden />
            <div className="holo" aria-hidden />
          </div>
          <div className="face back">
            <p className="tag"><span>What I am</span></p>
            <ul>
              <li>AI engineer, 10+ years in software</li>
              <li>M.Sc. thesis: RAG for databases</li>
              <li>1st place, JiVS Hackathon 2025</li>
              <li>Built a multilingual RAG knowledge base for BMW Innovation Day</li>
              <li>Backend roots: REST APIs and microservices</li>
            </ul>
            <p className="sig">Shrikant</p>
            <p className="found">If found, say hello · {PROFILE.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="wrap">
        <Head n="01" label="About">A bit about <em>me.</em></Head>
        <div className="about-grid">
          <div className="about-copy">
            <h3 className="rv">Hi, I&apos;m {PROFILE.first}.</h3>
            <p className="rv" style={d(1)}>{PROFILE.summary}</p>
            <p className="rv" style={d(2)}>{PROFILE.extra}</p>
            <div className="cta rv" style={d(3)}>
              <a className="btn ghost" href={PROFILE.github} rel="noopener">GitHub ↗</a>
              <a className="btn ghost" href={PROFILE.linkedin} rel="noopener">LinkedIn ↗</a>
            </div>
          </div>
          <IdCard />
          <aside className="facts">
            <h3 className="rv">Quick facts</h3>
            <dl>
              {FACTS.map(([k, v], i) => (
                <div key={k} className="rv" style={d(i)}><dt>{k}</dt><dd>{k === "Email" ? <a href={`mailto:${v}`}>{v}</a> : v}</dd></div>
              ))}
            </dl>
            <blockquote className="rv">{PROFILE.quote}</blockquote>
          </aside>
        </div>
      </div>
    </section>
  );
}
