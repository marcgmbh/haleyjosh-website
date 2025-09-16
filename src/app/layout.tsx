import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const ribes = localFont({
  src: [
    {
      path: "./../../public/font/Ribes-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./../../public/font/Ribes-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./../../public/font/Ribes-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-ribes",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Haley + Josh get married",
  description: "Haley + Josh get married",
  openGraph: {
    title: "Haley + Josh get married",
    description: "Haley + Josh get married",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Haley + Josh get married",
      },
    ],
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
        className={`${ribes.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
