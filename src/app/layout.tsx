import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { siteDescription, siteUrl } from "@/lib/site";

const themeScript = `
  try {
    const storedTheme = localStorage.getItem("portfolio-theme");
    const isDark = storedTheme === "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  } catch (_) {
    document.documentElement.dataset.theme = "light";
  }
`;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Filippo Piggici | Lead Frontend Engineer",
    template: "%s | Filippo Piggici",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Filippo Piggici" }],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Filippo Piggici | Portfolio",
    title: "Filippo Piggici | Lead Frontend Engineer",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Filippo Piggici | Lead Frontend Engineer",
    description: siteDescription,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="min-h-full antialiased">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        id="home"
        className="flex min-h-screen flex-col overflow-x-hidden bg-canvas/40 p-1.5 font-sans text-text-primary sm:p-4"
      >
        <div className="flex min-h-[calc(100svh-0.5rem)] w-full flex-col overflow-hidden rounded-xl border-[0.5px] border-border-subtle bg-canvas outline-[0.5px] outline-text-primary/8 outline-offset-1 sm:min-h-[calc(100svh-2rem)] sm:rounded-3xl sm:outline-offset-2">
          <SiteHeader />
          <main className="flex flex-1 flex-col px-page-padding">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
