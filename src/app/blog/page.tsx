import { Metadata } from "next";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | GrowOrbit",
  description: "Insights, tips, and news about AI, digital growth, and technology",
};

const blogPosts = [
  {
    title: "The Future of AI in Digital Marketing",
    excerpt: "Explore how artificial intelligence is revolutionizing digital marketing strategies and customer engagement.",
    category: "AI & Technology",
    date: "May 10, 2026",
    readTime: "5 min read",
    author: "Sarah Chen",
    slug: "future-of-ai-digital-marketing",
  },
  {
    title: "10 Web Design Trends for 2026",
    excerpt: "Stay ahead of the curve with these cutting-edge web design trends that will dominate the digital landscape.",
    category: "Design",
    date: "May 8, 2026",
    readTime: "7 min read",
    author: "Michael Brown",
    slug: "web-design-trends-2026",
  },
  {
    title: "Building Scalable SaaS Applications",
    excerpt: "A comprehensive guide to architecting and developing SaaS applications that scale with your business.",
    category: "Development",
    date: "May 5, 2026",
    readTime: "10 min read",
    author: "Alex Johnson",
    slug: "building-scalable-saas",
  },
  {
    title: "SEO Best Practices in the AI Era",
    excerpt: "Learn how to optimize your content for both search engines and AI-powered search experiences.",
    category: "SEO & Marketing",
    date: "May 3, 2026",
    readTime: "6 min read",
    author: "Emily Davis",
    slug: "seo-best-practices-ai-era",
  },
  {
    title: "Mobile-First Development Strategy",
    excerpt: "Why mobile-first approach is crucial for modern web development and how to implement it effectively.",
    category: "Development",
    date: "April 28, 2026",
    readTime: "8 min read",
    author: "Alex Johnson",
    slug: "mobile-first-development",
  },
  {
    title: "Maximizing ROI with Growth Hacking",
    excerpt: "Proven growth hacking strategies that helped our clients achieve 10x growth in record time.",
    category: "Growth Strategy",
    date: "April 25, 2026",
    readTime: "9 min read",
    author: "Emily Davis",
    slug: "maximizing-roi-growth-hacking",
  },
];

const categories = [
  "All Posts",
  "AI & Technology",
  "Design",
  "Development",
  "SEO & Marketing",
  "Growth Strategy",
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
              Our <span className="text-primary">Blog</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60">
              Insights, tips, and news about AI, digital growth, and technology
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  index === 0
                    ? "bg-primary text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          <div className="mb-12">
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group">
              <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                <div className="flex flex-col justify-center">
                  <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full mb-4 w-fit">
                    FEATURED
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-white/60 mb-6">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-white/50 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {blogPosts[0].date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {blogPosts[0].readTime}
                    </div>
                  </div>
                  <a
                    href={`/blog/${blogPosts[0].slug}`}
                    className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300 font-semibold"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <div className="relative h-64 md:h-auto bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                  <div className="text-white/20 text-8xl font-black">
                    {blogPosts[0].title.charAt(0)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <article
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
              >
                {/* Post Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                  <div className="text-white/20 text-6xl font-black">
                    {post.title.charAt(0)}
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
                    {post.category}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-white/50 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>

                  {/* Author & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-sm text-white/60">By {post.author}</span>
                    <a
                      href={`/blog/${post.slug}`}
                      className="text-primary hover:text-primary/80 transition-colors text-sm font-semibold"
                    >
                      Read →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition-all duration-300 font-semibold">
              Load More Posts
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
