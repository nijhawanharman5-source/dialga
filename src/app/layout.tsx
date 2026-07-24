import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DIALGA — Contemporary Streetwear",
  description:
    "Discover DIALGA collections, new arrivals and contemporary streetwear. Premium fashion built for those who don't dress to blend in.",
  keywords: ["DIALGA", "streetwear", "fashion", "clothing", "contemporary", "India"],
  openGraph: {
    title: "DIALGA — Contemporary Streetwear",
    description:
      "Discover DIALGA collections, new arrivals and contemporary streetwear.",
    type: "website",
    locale: "en_IN",
    siteName: "DIALGA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-body antialiased">
        <AnnouncementBar />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
