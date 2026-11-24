"use client";
import { PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

const d = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function Hero() {
  const { scrollTo } = useScroll();
  const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); scrollTo(id); };
  return (
    <section id="top" className="hero" aria-label="Introduction">
      <div className="ghostword" aria-hidden>{PROFILE.first.toUpperCase()}</div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="tag rv"><span>{PROFILE.tagline}</span></p>
          <h1 className="rv-mask"><span>{PROFILE.role}<em>.</em></span></h1>
          <p className="lede rv" style={d(2)}>
            I build LLM agents, RAG pipelines and the backend services around them, and take them from proof of concept to production.
          </p>
          <div className="cta rv" style={d(3)}>
            <a className="btn primary" href="#work" onClick={go("work")}>Explore work</a>
            <a className="btn ghost" href="#contact" onClick={go("contact")}>Let&apos;s talk</a>
          </div>
        </div>
        <div className="hero-photo rv" style={d(1)}>
          <img src="/hero-photo.webp" width={900} height={975} alt="Shrikant Dubale standing at a railing with a red suspension bridge behind him" fetchPriority="high" />
        </div>
      </div>
    </section>
  );
}
