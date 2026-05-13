import { Metadata } from "next";
import { ExternalLink, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio | GrowOrbit",
  description: "Explore our successful projects and client success stories",
};

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A modern e-commerce platform with AI-powered recommendations and seamless checkout experience.",
    image: "/placeholder-project-1.jpg",
    tags: ["Next.js", "AI", "Stripe", "PostgreSQL"],
    link: "#",
    github: "#",
  },
  {
    title: "FinTech Mobile App",
    category: "App Development",
    description: "Secure mobile banking application with real-time transactions and biometric authentication.",
    image: "/placeholder-project-2.jpg",
    tags: ["React Native", "Node.js", "MongoDB", "AWS"],
    link: "#",
    github: "#",
  },
  {
    title: "SaaS Dashboard",
    category: "Web Development",
    description: "Analytics dashboard for SaaS businesses with real-time data visualization and reporting.",
    image: "/placeholder-project-3.jpg",
    tags: ["React", "TypeScript", "D3.js", "Firebase"],
    link: "#",
    github: "#",
  },
  {
    title: "AI Chatbot Platform",
    category: "AI Integration",
    description: "Intelligent chatbot platform with natural language processing and multi-channel support.",
    image: "/placeholder-project-4.jpg",
    tags: ["Python", "OpenAI", "FastAPI", "Redis"],
    link: "#",
    github: "#",
  },
  {
    title: "Healthcare Portal",
    category: "Web Development",
    description: "Patient management system with appointment scheduling and telemedicine capabilities.",
    image: "/placeholder-project-5.jpg",
    tags: ["Vue.js", "Laravel", "MySQL", "WebRTC"],
    link: "#",
    github: "#",
  },
  {
    title: "Social Media App",
    category: "App Development",
    description: "Social networking platform with real-time messaging and content sharing features.",
    image: "/placeholder-project-6.jpg",
    tags: ["Flutter", "Firebase", "GraphQL", "Redis"],
    link: "#",
    github: "#",
  },
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
              Our <span className="text-primary">Portfolio</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60">
              Showcasing our best work and the success stories of our clients
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-purple-500/20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-white/20 text-6xl font-black">
                    {project.title.charAt(0)}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-white/60 text-sm mb-4">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium bg-white/5 text-white/70 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <a
                      href={project.link}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Project
                    </a>
                    <a
                      href={project.github}
                      className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                    >
                      <Code className="w-4 h-4" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
