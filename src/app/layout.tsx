import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Makan Kharido — Buy, Sell & Rent Properties in India",
  description:
    "India's most trusted real estate marketplace. Find verified properties for sale, rent, and lease across Mumbai, Delhi, Bangalore, and more.",
  keywords: "real estate, property, buy, sell, rent, India, apartments, villas, Mumbai, Delhi, Bangalore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
