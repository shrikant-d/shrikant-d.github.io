"use client";
import { useState } from "react";
import { PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

const Hop = ({ text }: { text: string }) => (
  <>{text.split("").map((c, i) => c === " " ? " " : <span key={i} className="hop">{c}</span>)}</>
);

export default function Contact() {
  const { scrollTo } = useScroll();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard blocked */ }
  };
  return (
    <>
      <section id="contact" className="section contact">
        <div className="wrap">
          <p className="tag rv"><span>06</span> — Contact</p>
          <h2 className="big" aria-label="Let's build something together.">
            <span aria-hidden><Hop text="Let's build" /><br /><Hop text="something " /><em><Hop text="together." /></em></span>
          </h2>
          <div className="mail rv">
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            <button className="copy" onClick={copy}>{copied ? "Copied ✓" : "Copy"}</button>
            <span className="sr" aria-live="polite">{copied ? "Email copied" : ""}</span>
          </div>
          <div className="cta rv">
            <a className="btn primary" href={PROFILE.linkedin} rel="noopener">LinkedIn ↗</a>
            <a className="btn ghost" href={PROFILE.github} rel="noopener">GitHub ↗</a>
          </div>
          <svg className="badge" viewBox="0 0 120 120" aria-hidden>
            <defs><path id="c" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" /></defs>
            <text><textPath href="#c">say hello · say hello · say hello · </textPath></text>
            <text x="60" y="68" textAnchor="middle" className="hi">hi</text>
          </svg>
        </div>
      </section>
      <footer className="foot">
        <div className="wrap">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <a href="#top" onClick={(e) => { e.preventDefault(); scrollTo("top"); }}>Back to top ↑</a>
          <span>Built with Next.js</span>
        </div>
      </footer>
    </>
  );
}
