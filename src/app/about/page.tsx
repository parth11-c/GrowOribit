import { Metadata } from "next";
import { Target, Users, Zap, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | GrowOrbit",
  description: "Learn about our mission, vision, and the team behind GrowOrbit",
};

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're committed to helping businesses achieve their digital transformation goals through innovative AI-powered solutions.",
  },
  {
    icon: Users,
    title: "Client-Focused",
    description: "Your success is our success. We build lasting partnerships and deliver solutions that exceed expectations.",
  },
  {
    icon: Zap,
    title: "Innovation First",
    description: "We stay ahead of the curve, leveraging the latest technologies to give your business a competitive edge.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in everything we do, from code quality to customer service.",
  },
];

const stats = [
  { number: "500+", label: "Projects Completed" },
  { number: "200+", label: "Happy Clients" },
  { number: "50+", label: "Team Members" },
  { number: "15+", label: "Countries Served" },
];

const team = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    bio: "15+ years in tech leadership",
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    bio: "AI & Machine Learning Expert",
  },
  {
    name: "Michael Brown",
    role: "Head of Design",
    bio: "Award-winning UX Designer",
  },
  {
    name: "Emily Davis",
    role: "Head of Marketing",
    bio: "Growth Strategy Specialist",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
              About <span className="text-primary">GrowOrbit</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60">
              We're a team of passionate innovators dedicated to transforming businesses through AI-powered digital solutions
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Story Section */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Our Story
            </h2>
            <div className="space-y-4 text-white/60 text-lg leading-relaxed">
              <p>
                Founded in 2020, GrowOrbit emerged from a simple belief: that every business deserves access to cutting-edge technology and AI-powered solutions to compete in the digital age.
              </p>
              <p>
                What started as a small team of developers and designers has grown into a full-service digital agency serving clients worldwide. We've helped hundreds of businesses transform their digital presence, streamline operations, and achieve remarkable growth.
              </p>
              <p>
                Today, we continue to push boundaries, exploring new technologies and methodologies to deliver exceptional results for our clients. Our commitment to innovation, quality, and client success remains unwavering.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-white/60 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Meet Our Team
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-500 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <div className="text-primary text-sm font-semibold mb-2">{member.role}</div>
                  <p className="text-white/60 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
