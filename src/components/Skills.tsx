"use client";
import { useState } from "react";
import { FAMILIES, PROJECTS, SKILLS, type Family } from "@/lib/data";
import { LOGOS } from "@/lib/logos.generated";
import Head from "./Head";

export const isBrand = (name: string) => name in LOGOS;

const CONCEPT: Record<Family, React.ReactNode> = {
  "AI & Agents": <><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M8 7l3 9M16 7l-3 9M8.5 6h7" /></>,
  Backend: <><rect x="4" y="4" width="16" height="6" rx="1.5" /><rect x="4" y="14" width="16" height="6" rx="1.5" /><path d="M8 7h.01M8 17h.01" /></>,
  Languages: <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />,
  Robotics: <><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></>,
  "Cloud & DevOps": <path d="M7 18a4 4 0 010-8 5.5 5.5 0 0110.6-1A4.5 4.5 0 0117 18z" />,
  Databases: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" /></>,
  Practices: <path d="M4 12a8 8 0 0114-5.3L20 4v6h-6l2.2-2.2A5.5 5.5 0 006.5 12M20 12a8 8 0 01-14 5.3L4 20v-6h6l-2.2 2.2A5.5 5.5 0 0017.5 12" />,
};

export function TechLogo({ name, family, size = 24 }: { name: string; family: Family; size?: number }) {
  const logo = LOGOS[name];
  if (logo) return <svg width={size} height={size} viewBox="0 0 24 24" fill={logo.hex} aria-hidden><path d={logo.path} /></svg>;
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{CONCEPT[family]}</svg>;
}

export default function Skills() {
  const [filter, setFilter] = useState<Family | null>(null);
  const [sel, setSel] = useState(0);
  const s = SKILLS[sel];
  const used = PROJECTS.filter((p) => p.tech.includes(s.name));
  const hex = LOGOS[s.name]?.hex;
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <Head n="02" label="Skills">The periodic table of my <em>stack.</em></Head>
        <div className="chips rv" role="group" aria-label="Filter by family">
          <button aria-pressed={filter === null} onClick={() => setFilter(null)}>All</button>
          {FAMILIES.map((f) => (
            <button key={f} aria-pressed={filter === f} onClick={() => setFilter(filter === f ? null : f)}>{f}</button>
          ))}
        </div>
        <div className="table-grid">
          <ul className="periodic">
            {SKILLS.map((k, i) => (
              <li key={k.name} className="rv" style={{ "--d": `${((i % 8) + Math.floor(i / 8)) * 40}ms` } as React.CSSProperties}>
                <button className={"el" + (filter && filter !== k.family ? " dim" : "") + (sel === i ? " sel" : "")}
                        onMouseEnter={() => setSel(i)} onFocus={() => setSel(i)} onClick={() => setSel(i)}
                        aria-label={`${k.name}, ${k.family}`}>
                  <small>{k.n}</small><b>{k.symbol}</b><span>{k.name}</span>
                </button>
              </li>
            ))}
          </ul>
          <aside className="inspector" aria-live="polite">
            <div className="glow" style={hex ? { background: `radial-gradient(circle, ${hex}22, transparent 65%)` } : undefined} />
            <div className="big" key={s.name}><TechLogo name={s.name} family={s.family} size={96} /></div>
            <p className="tag"><span>{String(s.n).padStart(2, "0")}</span> — {s.family}</p>
            <h3>{s.name}</h3>
            <p className="used">{used.length ? "Used in" : "Part of my toolkit."}</p>
            {used.length > 0 && <ul>{used.map((p) => <li key={p.id}>{p.title}</li>)}</ul>}
          </aside>
        </div>
      </div>
    </section>
  );
}
