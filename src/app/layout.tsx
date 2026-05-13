import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
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
  title: "GrowOrbit — AI-Powered Digital Growth Agency",
  description:
    "Transform your small business into a digital powerhouse. GrowOrbit offers web development, mobile apps, social media growth, branding, SEO, AI automation, and digital marketing services.",
  keywords: [
    "digital agency",
    "web development",
    "mobile apps",
    "SEO",
    "AI automation",
    "social media growth",
    "branding",
    "digital marketing",
    "SaaS",
    "GrowOrbit",
  ],
  authors: [{ name: "GrowOrbit" }],
  openGraph: {
    title: "GrowOrbit — AI-Powered Digital Growth Agency",
    description:
      "Transform your small business into a digital powerhouse with cutting-edge technology and data-driven strategies.",
    type: "website",
    locale: "en_US",
    siteName: "GrowOrbit",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrowOrbit — AI-Powered Digital Growth Agency",
    description:
      "Transform your small business into a digital powerhouse with cutting-edge technology and data-driven strategies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await auth();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen">
        <ClerkProvider>
          <Navbar />
          {children}
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
