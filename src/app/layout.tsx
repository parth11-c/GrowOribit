import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

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
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-black">
        <ClerkProvider>
          {/* Site-wide background wrapper (applies to Navbar + all pages + Footer) */}
          <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-black font-sans selection:bg-primary selection:text-white">
            <Navbar />
            <div className="relative z-10 h-14 shrink-0 bg-black md:h-16" />

            {/* Content above the background grid */}
            <div className="relative z-10 flex-1">{children}</div>

            <Footer />
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
