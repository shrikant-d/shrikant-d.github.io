"use client";
import { useState } from "react";
import { PROJECTS, SKILLS, type Project } from "@/lib/data";
import Head from "./Head";
import { TechLogo } from "./Skills";

/** Grayscale mini-UIs that hint at what each product does. Labelled "Illustrative UI" in the panel. */
function Mini({ kind }: { kind: Project["ui"] }) {
  switch (kind) {
    case "sql":
      return <div className="mini"><div className="m-bar">Ask your database</div><div className="m-line w70" /><div className="m-code"><i /><i className="w80" /><i className="w55" /></div>
        <div className="m-table">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div><div className="m-badge">Result checked</div></div>;
    case "code":
      return <div className="mini"><div className="m-split"><div className="m-shot"><i /><i /><i /><b /></div><div className="m-arrow">→</div><div className="m-code"><i className="w60" /><i className="w85" /><i className="w40" /><i className="w75" /></div></div></div>;
    case "search":
      return <div className="mini"><div className="m-bar">Search in any language</div><div className="m-res"><i /><i className="w75" /></div><div className="m-res"><i /><i className="w60" /></div><div className="m-res"><i /><i className="w80" /></div></div>;
    case "robot":
      return <div className="mini"><div className="m-map">{Array.from({ length: 48 }, (_, i) => <i key={i} className={[9, 10, 17, 25, 26, 33, 41].includes(i) ? "wall" : ""} />)}<b className="path" /></div></div>;
    case "model":
      return <div className="mini"><div className="m-bars">{[90, 64, 52, 38, 24].map((w) => <div key={w}><i style={{ width: `${w}%` }} /></div>)}</div><div className="m-badge">Feature impact</div></div>;
  }
}

export default function Work() {
  const [open, setOpen] = useState(0);
  return (
    <section id="work" className="section">
      <div className="wrap">
        <Head n="03" label="Selected work">Things I&apos;ve <em>built.</em></Head>
      </div>
      <div className="wrap">
        <div className="panels rv">
          {PROJECTS.map((p, i) => (
            <article key={p.id} className={"panel" + (open === i ? " open" : "")}
                     onMouseEnter={() => matchMedia("(hover: hover) and (min-width: 821px)").matches && setOpen(i)}>
              <button className="spine" aria-expanded={open === i} aria-controls={`pn-${p.id}`} onClick={() => setOpen(i)}>
                <span className="n">{p.index}</span><span className="vt">{p.title}</span><span className="plus" aria-hidden>+</span>
              </button>
              <div className="body" id={`pn-${p.id}`}>
                <div className="info">
                  <p className="tag"><span>{p.index}</span> — {p.kicker}</p>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <ul className="feat">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                  <ul className="tech">
                    {p.tech.map((t) => {
                      const sk = SKILLS.find((s) => s.name === t);
                      return <li key={t}>{sk && <TechLogo name={t} family={sk.family} size={14} />}{t}</li>;
                    })}
                  </ul>
                </div>
                <div className="ui" aria-label={`Illustrative interface for ${p.title}`}>
                  <Mini kind={p.ui} />
                  <span className="ill">Illustrative UI</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
