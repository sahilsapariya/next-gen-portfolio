import "./globals.css";
import { Newsreader, JetBrains_Mono, Caveat_Brush, Inter } from "next/font/google";
import {
  DESCRIPTION_LONG,
  DESCRIPTION_SHORT,
  KEYWORDS,
  PERSON,
  SITE_LOCALE,
  SITE_NAME,
  SITE_SHORT,
  SITE_URL,
  personSchema,
  websiteSchema,
} from "@/lib/seo";

/* Newsreader — variable, optical sizing axis, italic+roman.
   Single editorial serif for display + body. */
const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-mono",
  preload: true,
});

/* Caveat Brush — one use only: the signature wordmark in Contact */
const caveat = Caveat_Brush({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-script",
});

/* Inter — subtle sans-serif for long-form body. Field Notes only. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-sans",
});

/* ──────────────────────────────────────────────────────────────────────
   Metadata — SEO-comprehensive. Drives <title>, <meta description>,
   Open Graph, Twitter cards, robots directives, canonical URL.
   ────────────────────────────────────────────────────────────────────── */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME + " | " + PERSON.location.city + ", " + PERSON.location.country,
    template: "%s — " + SITE_SHORT,
  },
  description: DESCRIPTION_LONG,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  publisher: PERSON.name,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  category: "technology",
  classification: "Personal Portfolio · Engineering",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME + " | " + PERSON.location.city + ", " + PERSON.location.country,
    description: DESCRIPTION_SHORT,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: PERSON.name + " — " + PERSON.jobTitle + ", Product Builder",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: PERSON.twitterHandle,
    creator: PERSON.twitterHandle,
    title: SITE_NAME,
    description: DESCRIPTION_SHORT,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

/* Viewport — drives mobile browser chrome colour. */
export const viewport = {
  themeColor: "#0E0E0C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  /* JSON-LD strings built outside JSX so the script tags can render
     them as text children — safe (our own static data, fully serialized
     by JSON.stringify which strips any non-JSON-safe value). */
  const personLd = JSON.stringify(personSchema());
  const websiteLd = JSON.stringify(websiteSchema());

  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${jetbrains.variable} ${caveat.variable} ${inter.variable}`}
    >
      <head>
        {/* JSON-LD structured data — Person + WebSite schemas. Search
            engines use these to build knowledge-panel results for
            queries like "who is sahil sapariya". */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          {...{ dangerouslySetInnerHTML: { __html: personLd } }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          {...{ dangerouslySetInnerHTML: { __html: websiteLd } }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
