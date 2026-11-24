"use client";
import { PATH } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";
import Head from "./Head";

export default function Experience() {
  const [ref, p] = useScrollProgress<HTMLOListElement>();
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <Head n="04" label="Experience & education">The <em>path.</em></Head>
        <ol className="timeline" ref={ref}>
          <span className="spine-line" aria-hidden><span style={{ transform: `scaleY(${p})` }} /></span>
          {PATH.map((s, i) => {
            const lit = p >= (i + 0.4) / (PATH.length + 1);
            return (
              <li key={s.when + s.title} className={lit ? "lit" : ""}>
                <span className="dot" aria-hidden />
                <span className="yr">{s.year}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p className="place">{s.place} · <span>{s.when}</span></p>
                  <p className="detail">{s.detail}</p>
                </div>
              </li>
            );
          })}
          <li className={"next" + (p > 0.97 ? " lit" : "")}><span className="dot" aria-hidden /><div className="next-card"><p className="tag"><span>Next</span> —</p><h3>Your team?</h3></div></li>
        </ol>
      </div>
    </section>
  );
}
