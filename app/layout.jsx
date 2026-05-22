import "./globals.css";
import { Newsreader, JetBrains_Mono, Caveat_Brush, Inter } from "next/font/google";

/* Newsreader — variable, optical sizing axis, italic+roman.
   Replaces Fraunces. Single editorial serif for display + body. */
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

/* Inter — subtle sans-serif for long-form body where readability beats editorial.
   Used only in Field Notes; doesn't displace Newsreader as the main voice. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata = {
  title: "Sahil Sapariya — Engineer, Product Builder",
  description:
    "An engineer building systems end to end. Selected work, current focus, and notes.",
  openGraph: {
    title: "Sahil Sapariya — Engineer, Product Builder",
    description: "Backend-first engineer based in Vadodara.",
  },
};

/* viewport export (Next.js 14 API) — drives the browser chrome colour
   on mobile (Safari address bar tint, Android theme) so it matches the
   site instead of defaulting to white. */
export const viewport = {
  themeColor: "#0E0E0C",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${jetbrains.variable} ${caveat.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
