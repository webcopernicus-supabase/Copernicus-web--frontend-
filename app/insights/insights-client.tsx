"use client"

import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BreadcrumbSchema } from "@/lib/schema"
import { ArrowRight, Clock, User } from "lucide-react"
import { useState } from "react"

const categories = [
  { id: "all", name: "All Articles", count: 9 },
  { id: "brand-strategy", name: "Brand Strategy", count: 3 },
  { id: "design", name: "Design", count: 2 },
  { id: "marketing", name: "Marketing", count: 2 },
  { id: "culture", name: "Culture", count: 2 },
]

const posts = [
  {
    id: "building-authentic-brands",
    title: "Building Authentic Brands in a Digital Age",
    excerpt:
      "Authenticity is no longer optional in brand building. Learn how to create genuine connections with your audience in an increasingly digital world through strategic storytelling and transparent communication.",
    category: "brand-strategy",
    categoryLabel: "Brand Strategy",
    author: "Sarah Al-Maktoum",
    date: "2024-01-15",
    readTime: "5 min",
    image: "/authentic-brand-design.jpg",
  },
  {
    id: "effective-brand-activations",
    title: "The Art of Effective Brand Activations",
    excerpt:
      "Brand activations create memorable experiences that drive engagement and loyalty. Discover the key principles behind successful activations that transform passive audiences into active brand advocates.",
    category: "marketing",
    categoryLabel: "Marketing",
    author: "Mohammed Hassan",
    date: "2024-01-10",
    readTime: "7 min",
    image: "/brand-activation-event.jpg",
  },
  {
    id: "visual-identity-systems",
    title: "Creating Cohesive Visual Identity Systems",
    excerpt:
      "A strong visual identity goes beyond a logo. Learn how to build comprehensive systems that work across all touchpoints, from digital to print, ensuring brand consistency.",
    category: "design",
    categoryLabel: "Design",
    author: "Fatima Al-Sayed",
    date: "2024-01-05",
    readTime: "6 min",
    image: "/brand-identity-design.png",
  },
  {
    id: "brand-storytelling-power",
    title: "The Power of Brand Storytelling",
    excerpt:
      "Stories have the power to connect emotionally with audiences and create lasting impressions. Explore how strategic storytelling transforms brands and builds deep customer relationships.",
    category: "brand-strategy",
    categoryLabel: "Brand Strategy",
    author: "Ahmed Al-Rashid",
    date: "2023-12-28",
    readTime: "8 min",
    image: "/brand-storytelling.jpg",
  },
  {
    id: "design-trends-2024",
    title: "Brand Design Trends Shaping 2024",
    excerpt:
      "From minimalism to bold typography, discover the design trends that are reshaping how brands present themselves and connect with audiences in the new year.",
    category: "design",
    categoryLabel: "Design",
    author: "Layla Al-Noor",
    date: "2023-12-20",
    readTime: "6 min",
    image: "/design-trends.jpg",
  },
  {
    id: "team-culture-success",
    title: "How Team Culture Drives Creative Success",
    excerpt:
      "The most innovative work comes from teams that collaborate effectively. Learn how we foster a culture of creativity, experimentation, and mutual support at Copernicus.",
    category: "culture",
    categoryLabel: "Culture",
    author: "Rayan Al-Mansouri",
    date: "2023-12-15",
    readTime: "5 min",
    image: "/team-culture.jpg",
  },
  {
    id: "marketing-strategy-framework",
    title: "Building a Strategic Marketing Framework",
    excerpt:
      "A solid marketing framework aligns all activities toward clear objectives. Discover the framework we use to create cohesive marketing strategies that drive real business results.",
    category: "marketing",
    categoryLabel: "Marketing",
    author: "Sarah Al-Maktoum",
    date: "2023-12-10",
    readTime: "9 min",
    image: "/marketing-framework.jpg",
  },
  {
    id: "brand-evolution-guide",
    title: "A Guide to Strategic Brand Evolution",
    excerpt:
      "Brands must evolve to stay relevant while maintaining their core identity. Learn how to navigate brand evolution strategically without losing your audience's trust.",
    category: "brand-strategy",
    categoryLabel: "Brand Strategy",
    author: "Mohammed Hassan",
    date: "2023-12-05",
    readTime: "7 min",
    image: "/brand-evolution.jpg",
  },
  {
    id: "culture-benefits",
    title: "Living Our Values: Culture That Works",
    excerpt:
      "Our culture isn't just words on a wall—it's lived every day through our actions, decisions, and how we treat each other. Discover what makes our team special.",
    category: "culture",
    categoryLabel: "Culture",
    author: "Fatima Al-Sayed",
    date: "2023-11-30",
    readTime: "4 min",
    image: "/culture-values.jpg",
  },
]

export default function InsightsClientPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredPosts = selectedCategory === "all" ? posts : posts.filter((post) => post.category === selectedCategory)

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://copernicus.com" },
          { name: "Insights", url: "https://copernicus.com/insights" },
        ]}
      />
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 text-balance leading-[1.1]"
                style={{ color: "var(--copernicus-text-primary)" }}
              >
                Insights & Perspectives
              </h1>
              <p
                className="text-xl sm:text-2xl leading-relaxed mb-8"
                style={{ color: "var(--copernicus-text-secondary)" }}
              >
                Thoughtful perspectives on brand strategy, design, marketing, and creative excellence from our team.
                Discover ideas that inspire and strategies that work.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--copernicus-section-bg)]">
          <div className="mx-auto max-w-7xl">
            <Link
              href={`/insights/${posts[0].id}`}
              className="group block overflow-hidden rounded-2xl border border-[var(--copernicus-border)] hover:shadow-2xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                  <Image
                    src={posts[0].image || "/placeholder.svg"}
                    alt={posts[0].title}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
                  <div className="mb-6">
                    <Badge
                      variant="outline"
                      className="text-xs border-[var(--copernicus-border)]"
                      style={{ color: "var(--copernicus-orange)" }}
                    >
                      {posts[0].categoryLabel}
                    </Badge>
                  </div>
                  <h2
                    className="text-3xl sm:text-4xl font-bold mb-4"
                    style={{ color: "var(--copernicus-text-primary)" }}
                  >
                    {posts[0].title}
                  </h2>
                  <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--copernicus-text-secondary)" }}>
                    {posts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-6 mb-6">
                    <div
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "var(--copernicus-text-secondary)" }}
                    >
                      <User className="w-4 h-4" />
                      {posts[0].author}
                    </div>
                    <div
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "var(--copernicus-text-secondary)" }}
                    >
                      <Clock className="w-4 h-4" />
                      {posts[0].readTime} read
                    </div>
                  </div>
                  <div
                    className="inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: "var(--copernicus-orange)" }}
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Categories - Now functional */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-y border-[var(--copernicus-border)]">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant="outline"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-sm font-semibold border-[var(--copernicus-border)] transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[var(--copernicus-orange)] text-white border-[var(--copernicus-orange)]"
                      : "bg-transparent hover:bg-[var(--copernicus-orange-soft)] hover:border-[var(--copernicus-orange)]"
                  }`}
                >
                  {cat.name}
                  <span
                    className={`ml-2 text-xs px-2 py-1 rounded-full ${
                      selectedCategory === cat.id
                        ? "bg-white/20 text-white"
                        : "bg-[var(--copernicus-orange-soft)] text-[var(--copernicus-orange)]"
                    }`}
                  >
                    {cat.count}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid - Now filtered */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post) => (
                <Link
                  key={post.id}
                  href={`/insights/${post.id}`}
                  className="group block overflow-hidden rounded-xl border border-[var(--copernicus-border)] hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={600}
                      height={375}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1" style={{ backgroundColor: "var(--copernicus-bg)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge
                        variant="outline"
                        className="text-xs border-[var(--copernicus-border)]"
                        style={{ color: "var(--copernicus-orange)" }}
                      >
                        {post.categoryLabel}
                      </Badge>
                      <span className="text-xs" style={{ color: "var(--copernicus-text-secondary)" }}>
                        {post.readTime} read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 flex-1" style={{ color: "var(--copernicus-text-primary)" }}>
                      {post.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--copernicus-text-secondary)" }}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t border-[var(--copernicus-border)]">
                      <div className="flex-1">
                        <p className="text-xs font-medium" style={{ color: "var(--copernicus-text-primary)" }}>
                          {post.author}
                        </p>
                        <p className="text-xs" style={{ color: "var(--copernicus-text-secondary)" }}>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <ArrowRight
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        style={{ color: "var(--copernicus-orange)" }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--copernicus-orange)" }}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">Subscribe to Our Insights</h2>
            <p className="text-lg mb-12 text-white/90 max-w-2xl mx-auto">
              Get brand strategy tips, design insights, and industry perspectives delivered to your inbox monthly. Stay
              informed about what's shaping the creative industry.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-4 rounded-lg w-full sm:flex-1 text-foreground bg-white border-2 border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--copernicus-orange)]"
              />
              <Button
                size="lg"
                className="bg-white text-[var(--copernicus-orange)] hover:bg-white/90 font-semibold px-8 w-full sm:w-auto border-2 border-white"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
