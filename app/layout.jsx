import "./globals.css";
import { Fraunces, JetBrains_Mono, Instrument_Serif, Caveat_Brush } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-mono",
  preload: true,
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument",
});

const caveat = Caveat_Brush({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-caveat",
});

export const metadata = {
  title: "Sahil Sapariya — Portfolio 2026",
  description:
    "Full-stack developer specializing in backend-first web. Selected work, experience, and contact.",
  openGraph: {
    title: "Sahil Sapariya — Portfolio 2026",
    description: "Backend-first full-stack developer based in Ahmedabad.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jetbrains.variable} ${instrument.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
