import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  viewportFit: "cover",
};

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "247 Tyre Care | Emergency mobile tyre fitting Rugby & Warwickshire",
    template: "%s | 247 Tyre Care",
  },
  description:
    "Emergency mobile tyre fitting and 24-hour service from Rugby. Flat tyre repair at the roadside, home, or work — Coventry, Daventry & Warwickshire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={dmSans.variable}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
