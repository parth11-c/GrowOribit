import { Metadata } from "next";
import ServicesSection from "@/sections/services-section";

export const metadata: Metadata = {
  title: "Services | GrowOrbit",
  description: "AI-powered digital services to help your business grow",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black pt-16">
      <ServicesSection />
    </main>
  );
}