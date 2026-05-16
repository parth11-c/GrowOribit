"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const defaultCompanies = [
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-1.svg",
    alt: "Arc",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-2.svg",
    alt: "Descript",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-3.svg",
    alt: "Mercury",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-4.svg",
    alt: "Ramp",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-5.svg",
    alt: "Retool",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-6.svg",
    alt: "Watershed",
  },
];

const defaultAchievements = [
  { label: "Companies Supported", value: "300+" },
  { label: "Projects Finalized", value: "800+" },
  { label: "Happy Customers", value: "99%" },
  { label: "Recognized Awards", value: "10+" },
];

export default function AboutSection() {
  return (
    <section className="py-32 bg-black">
      <div className="container mx-auto px-4">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold text-white">About Us</h1>
          <p className="text-zinc-400">
            GrowOrbit is a passionate team dedicated to creating innovative solutions that empower businesses to thrive in the digital age.
          </p>
        </div>
        <div className="grid gap-7 lg:grid-cols-3">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
            alt="Team collaboration"
            width={800}
            height={600}
            className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-black p-7 md:w-1/2 lg:w-auto border border-zinc-800">
              <div className="text-2xl font-bold text-white">GrowOrbit</div>
              <div>
                <p className="mb-2 text-lg font-semibold text-white">Building Digital Excellence</p>
                <p className="text-zinc-400">
                  Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.
                </p>
              </div>
              <Button variant="outline" className="mr-auto border-zinc-700 text-white hover:bg-zinc-800 hover:text-white" asChild>
                <Link href="/contact">
                  Get Started
                </Link>
              </Button>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
              alt="Meeting"
              width={400}
              height={300}
              className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
            />
          </div>
        </div>
        <div className="py-32">
          <p className="text-center text-zinc-400">Trusted by industry leaders</p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {defaultCompanies.map((company, idx) => (
              <div className="flex items-center gap-3" key={company.src + idx}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={company.src}
                  alt={company.alt}
                  className="h-6 w-auto md:h-8 opacity-70"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-black p-10 md:p-16 border border-zinc-800">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-4xl font-semibold text-white">Our Achievements in Numbers</h2>
            <p className="max-w-screen-sm text-zinc-400">
              Delivering exceptional results through innovative digital solutions and dedicated partnership with our clients.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-10 text-center">
            {defaultAchievements.map((item, idx) => (
              <div className="flex flex-col gap-4" key={item.label + idx}>
                <p className="text-zinc-400">{item.label}</p>
                <span className="text-4xl font-semibold md:text-5xl text-white">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
