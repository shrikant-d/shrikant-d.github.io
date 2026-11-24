"use client";
import Lenis from "lenis";
import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "./hooks";

type Api = { scrollTo: (id: string) => void; lock: (on: boolean) => void };
const Ctx = createContext<Api>({ scrollTo: () => {}, lock: () => {} });
export const useScroll = () => useContext(Ctx);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const lenis = useRef<Lenis | null>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const l = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) });
    lenis.current = l;
    let raf = requestAnimationFrame(function loop(t) { l.raf(t); raf = requestAnimationFrame(loop); });
    return () => { cancelAnimationFrame(raf); l.destroy(); lenis.current = null; };
  }, []);
  const api = useMemo<Api>(() => ({
    scrollTo: (id) => {
      const el = id === "top" ? document.body : document.getElementById(id);
      if (!el) return;
      if (lenis.current) lenis.current.scrollTo(id === "top" ? 0 : el, { offset: 0 });
      else el.scrollIntoView({ behavior: "auto" });
      history.replaceState(null, "", id === "top" ? location.pathname : "#" + id);
    },
    lock: (on) => { document.documentElement.style.overflow = on ? "hidden" : ""; on ? lenis.current?.stop() : lenis.current?.start(); },
  }), []);
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
