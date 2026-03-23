import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nir Moran — AI-Native Builder",
  description:
    "8 projects built in 6 months. No coding background. I'm the architect — AI is my development team.",
  openGraph: {
    title: "Nir Moran — AI-Native Builder",
    description:
      "8 projects built in 6 months. No coding background.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nir Moran — AI-Native Builder",
    description:
      "8 projects built in 6 months. No coding background.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-dm antialiased">{children}</body>
    </html>
  );
}
