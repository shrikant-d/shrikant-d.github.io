"use client";
import { useEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

export default function Navigation() {
  const { scrollTo, lock } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const on = () => {
      setScrolled(scrollY > 40);
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? scrollY / max : 0);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const margin = { rootMargin: "-45% 0px -50% 0px" };
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), margin);
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    const hero = document.getElementById("top");
    const ho = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(""); }, margin);
    if (hero) ho.observe(hero);
    return () => { io.disconnect(); ho.disconnect(); };
  }, []);

  useEffect(() => {
    const el = links.current[active];
    setPill(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
  }, [active]);

  useEffect(() => {
    if (!open) return;
    lock(true);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    return () => { removeEventListener("keydown", esc); lock(false); };
  }, [open, lock]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    setTimeout(() => scrollTo(id), wasOpen ? 60 : 0);
  };

  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden />
      <a className="skip" href="#main">Skip to content</a>
      <header className={"nav" + (scrolled ? " is-scrolled" : "")}>
        <a className="brand" href="#top" onClick={go("top")} aria-label={`${PROFILE.name}, back to top`}>
          <span className="mark">{PROFILE.initials}</span>
          <span className="brand-name">{PROFILE.name}</span>
        </a>
        <nav className="pillnav" aria-label="Main">
          {pill && <span className="indicator" style={{ transform: `translateX(${pill.x}px)`, width: pill.w }} aria-hidden />}
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} ref={(el) => { links.current[n.id] = el; }}
               className={active === n.id ? "on" : ""} onClick={go(n.id)}>{n.label}</a>
          ))}
        </nav>
        <button className="menu-btn" aria-expanded={open} aria-controls="overlay" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
      </header>
      <div id="overlay" className={"overlay" + (open ? " open" : "")} aria-hidden={!open}>
        {NAV.map((n, i) => (
          <a key={n.id} href={`#${n.id}`} tabIndex={open ? 0 : -1} onClick={go(n.id)} style={{ "--i": i } as React.CSSProperties}>
            <span>0{i + 1}</span>{n.label}
          </a>
        ))}
      </div>
    </>
  );
}
