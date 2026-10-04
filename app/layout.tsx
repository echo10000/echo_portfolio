import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jericho Blando | IT Student & Full-Stack Developer",
  description:
    "Portfolio of Jericho Blando — BS Information Technology student specializing in Django, backend architecture, PostgreSQL, and practical web systems.",
  metadataBase: new URL("https://example.vercel.app"),
  authors: [{ name: "Jericho Blando" }],
  keywords: [
    "Jericho Blando",
    "Portfolio",
    "Full-Stack Developer",
    "Django",
    "Python",
    "PostgreSQL",
    "Next.js",
    "IT Student",
    "LinkedIn",
    "GitHub",
  ],
  other: {
    "linkedin:profile": "https://www.linkedin.com/in/jericho-blando-5530172b0/",
  },
  openGraph: {
    title: "Jericho Blando | IT Student & Full-Stack Developer",
    description:
      "BSIT student building practical web systems with Python, Django, PostgreSQL, JavaScript, and modern stacks.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f2ed" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1011" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('jb-theme');
                  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = stored ? stored : (systemDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
