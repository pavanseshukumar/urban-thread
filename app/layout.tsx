import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import PageTransition from "@/src/components/ui/PageTransition";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Urban Thread | Modern Everyday Wear",
  description:
    "Discover modern everyday wear at Urban Thread. Minimalist, high-quality clothing for the modern wardrobe.",
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geist.variable} font-sans antialiased`}>
        <Navbar />
        <PageTransition>
          <div className="min-h-screen">{children}</div>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
