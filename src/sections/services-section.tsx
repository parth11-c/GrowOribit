"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Code2, Smartphone, TrendingUp, Users } from "lucide-react";
import { ReactNode } from "react";

const services = [
  {
    icon: Code2,
    title: "Software & Web Development",
    description: "Custom software solutions and modern websites built with cutting-edge technologies to transform your business operations.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications that deliver seamless user experiences across all devices.",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing & SEO",
    description: "Data-driven marketing strategies and SEO optimization to boost your online visibility and drive qualified leads.",
  },
  {
    icon: Users,
    title: "Recruitment & Talent Acquisition",
    description: "Smart talent solutions to find, attract, and retain the best professionals for your organization's growth.",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-black py-16 md:py-32 min-h-screen w-full flex items-center">
      <div className="@container mx-auto max-w-5xl px-6 w-full">
        <div className="text-center mb-16">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl text-white">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to accelerate your business growth and success.
          </p>
        </div>
        <Card className="@min-4xl:max-w-full @min-4xl:grid-cols-2 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 bg-transparent border-zinc-800 md:mt-16">
          {services.map((service, index) => (
            <div key={index} className="group shadow-zinc-950/5 p-6 md:p-8">
              <CardHeader className="pb-3">
                <CardDecorator>
                  <service.icon className="size-6" aria-hidden />
                </CardDecorator>

                <h3 className="mt-6 font-medium text-xl text-white">{service.title}</h3>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-zinc-400">{service.description}</p>
              </CardContent>
            </div>
          ))}
        </Card>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div
    aria-hidden
    className="relative mx-auto size-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
  >
    <div className="bg-black absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l border-zinc-700">
      {children}
    </div>
  </div>
);
