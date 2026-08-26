import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IdeaBucket — 1,697 Ranked Venture Ideas",
  description: "A brutally honest, evidence-scored directory of 1,697 venture and AI product ideas.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
