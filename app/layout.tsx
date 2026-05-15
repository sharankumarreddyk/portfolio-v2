import type { Metadata, Viewport } from "next";
import {
  Inter,
  Space_Grotesk,
  JetBrains_Mono,
  Newsreader,
} from "next/font/google";
import "./globals.css";
import Loader from "@/components/Loader";
import CommandPalette from "@/components/CommandPalette";
import ScrollProgress from "@/components/ScrollProgress";
import SectionDrift from "@/components/SectionDrift";
import EasterEgg from "@/components/EasterEgg";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import ShortcutHelp from "@/components/ShortcutHelp";
import RouteTransition from "@/components/RouteTransition";
import { profile } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["400", "500"],
  style: ["italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sharan.dev"),
  title: `${profile.name} — ${profile.role}`,
  description: profile.blurb,
  keywords: [
    "Software Engineer",
    "Full-stack Developer",
    "AI Engineer",
    "React",
    "Next.js",
    "Python",
    "TypeScript",
    profile.name,
    profile.location,
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.blurb,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f6f5f0" },
  ],
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  worksFor: { "@type": "Organization", name: profile.company },
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location.split(",")[0]?.trim(),
    addressCountry: "IN",
  },
  url: "https://sharan.dev",
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "Python",
    "AI engineering",
    "Full-stack development",
  ],
};

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          suppressHydrationWarning
        />
      </head>
      <body className="grain bg-[color:var(--color-bg)] text-[color:var(--color-fg)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Loader />
        <RouteTransition />
        <ScrollProgress />
        <SectionDrift />
        <EasterEgg />
        <KeyboardShortcuts />
        <ShortcutHelp />
        <CommandPalette />
        {children}
      </body>
    </html>
  );
}
