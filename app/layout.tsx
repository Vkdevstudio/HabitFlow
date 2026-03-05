import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HabitFlow — Build habits that actually stick",
  description:
    "Track your daily habits, build streaks, and never miss a day. A clean, fast habit tracker built with Next.js and Supabase.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔥</text></svg>",
  },
  openGraph: {
    title: "HabitFlow — Build habits that actually stick",
    description:
      "Track your daily habits, build streaks, and never miss a day.",
    url: "https://habit-flow-kappa.vercel.app",
    siteName: "HabitFlow",
    images: [
      {
        url: "https://habit-flow-kappa.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "HabitFlow — Habit Tracker",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HabitFlow — Build habits that actually stick",
    description:
      "Track your daily habits, build streaks, and never miss a day.",
    images: ["https://habit-flow-kappa.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}