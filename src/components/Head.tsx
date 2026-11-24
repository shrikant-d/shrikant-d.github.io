import type { ReactNode } from "react";

/** Section tag (mono index + label) and a heading that ends in one serif-italic word. */
export default function Head({ n, label, children }: { n: string; label: string; children: ReactNode }) {
  return (
    <header className="head">
      <p className="tag rv"><span>{n}</span> — {label}</p>
      <h2 className="rv-mask"><span>{children}</span></h2>
    </header>
  );
}
