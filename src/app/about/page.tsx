import { Metadata } from "next";
import AboutSection from "@/sections/about-section";

export const metadata: Metadata = {
  title: "About Us | GrowOrbit",
  description: "Learn about our mission, vision, and the team behind GrowOrbit",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black pt-16">
      <AboutSection />
    </main>
  );
}