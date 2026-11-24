"use client";
import { useEffect } from "react";
import { ScrollProvider } from "@/lib/scroll";
import Navigation from "./Navigation";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Work from "./Work";
import Experience from "./Experience";
import Achievements from "./Achievements";
import Contact from "./Contact";

/** One global observer: .rv and .rv-mask get .is-in the first time they enter the viewport. */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll(".rv, .rv-mask").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  useReveal();
  return (
    <ScrollProvider>
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Achievements />
        <Contact />
      </main>
    </ScrollProvider>
  );
}
