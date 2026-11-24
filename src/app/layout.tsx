import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import { PROFILE } from "@/lib/data";

const url = "https://shrikant-d.github.io";
const description = "Shrikant Dubale is an AI engineer who builds LLM agents, RAG pipelines and backend services, backed by 10+ years of software engineering.";
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: `${PROFILE.name} · ${PROFILE.role}`,
  description,
  openGraph: { title: `${PROFILE.name} · ${PROFILE.role}`, description, url, type: "website", images: ["/og.jpg"] },
  icons: { icon: "/favicon.svg" },
};
export const viewport: Viewport = { themeColor: "#f4f2ee" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} /></head>
      <body>{children}</body>
    </html>
  );
}
