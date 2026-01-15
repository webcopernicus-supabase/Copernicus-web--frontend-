import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Calendar } from "lucide-react"
import { BreadcrumbSchema } from "@/lib/schema"

const posts = [
  {
    id: "building-authentic-brands",
    title: "Building Authentic Brands in a Digital Age",
    excerpt:
      "Authenticity is no longer optional in brand building. Learn how to create genuine connections with your audience in an increasingly digital world.",
    category: "Brand Strategy",
    date: "2024-01-15",
    readTime: "5 min read",
    image: "/authentic-brand-design.jpg",
    author: "Copernicus Team",
    content: `
      <p>In today's hyper-connected digital landscape, consumers are more discerning than ever. They can spot inauthenticity from a mile away, and they're quick to call it out. Building authentic brands has shifted from being a nice-to-have to an absolute necessity for long-term success.</p>

      <h2>The Authenticity Imperative</h2>
      <p>Authenticity in branding means staying true to your core values, being transparent about your operations, and consistently delivering on your promises. It's about creating a brand that people can trust and relate to on a human level.</p>

      <p>In the digital age, where every interaction can be shared, scrutinized, and amplified, authenticity becomes even more critical. Social media has given consumers a powerful voice, and brands that don't live up to their stated values face swift and public consequences.</p>

      <h2>Key Principles of Authentic Branding</h2>
      <p><strong>1. Know Your Why:</strong> Start with a clear understanding of your brand's purpose beyond profit. Why does your brand exist? What problems are you solving? What impact do you want to have?</p>

      <p><strong>2. Be Consistent:</strong> Authenticity requires consistency across all touchpoints. Your messaging, visual identity, customer service, and product quality should all align with your brand values.</p>

      <p><strong>3. Show Your Human Side:</strong> Don't be afraid to show vulnerability, admit mistakes, and share the real stories behind your brand. People connect with people, not corporate facades.</p>

      <p><strong>4. Listen and Respond:</strong> Engage genuinely with your audience. Listen to their feedback, respond to their concerns, and involve them in your brand journey.</p>

      <h2>Practical Steps Forward</h2>
      <p>Building an authentic brand doesn't happen overnight. It requires ongoing commitment and intentional action. Start by auditing your current brand touchpoints for consistency and authenticity. Involve your team in defining and living your brand values. And most importantly, be patient—authentic brands are built through consistent action over time.</p>
    `,
  },
  {
    id: "effective-brand-activations",
    title: "The Art of Effective Brand Activations",
    excerpt:
      "Brand activations create memorable experiences that drive engagement. Discover the key principles behind successful activations.",
    category: "Marketing",
    date: "2024-01-10",
    readTime: "7 min read",
    image: "/brand-activation-event.jpg",
    author: "Copernicus Team",
    content: `
      <p>Brand activations are experiential marketing campaigns that bring brands to life through immersive, interactive experiences. When done right, they create lasting memories, generate buzz, and forge deep emotional connections with your audience.</p>

      <h2>What Makes a Great Brand Activation?</h2>
      <p>The most effective brand activations share several key characteristics. They're memorable, shareable, aligned with brand values, and designed to create genuine engagement rather than just passive observation.</p>

      <h2>The Strategic Framework</h2>
      <p><strong>Define Clear Objectives:</strong> Start with specific, measurable goals. Are you building awareness, driving trial, or deepening loyalty? Your objectives will shape every aspect of your activation.</p>

      <p><strong>Know Your Audience:</strong> Successful activations are designed with deep audience insight. What motivates them? What experiences do they value? Where do they spend their time?</p>

      <p><strong>Create Shareability:</strong> In the digital age, the impact of your activation extends far beyond those who attend. Design Instagram-worthy moments and give people reasons to share their experience.</p>

      <p><strong>Measure Everything:</strong> Track engagement metrics, social shares, media coverage, and post-event sentiment to understand impact and refine future activations.</p>

      <h2>Case in Point</h2>
      <p>Consider the most successful brand activations in recent years—they all created experiences that people wanted to be part of and share. They aligned perfectly with brand identity while offering genuine value or entertainment to participants.</p>
    `,
  },
  {
    id: "visual-identity-systems",
    title: "Creating Cohesive Visual Identity Systems",
    excerpt:
      "A strong visual identity goes beyond a logo. Learn how to build comprehensive systems that work across all touchpoints.",
    category: "Design",
    date: "2024-01-05",
    readTime: "6 min read",
    image: "/brand-identity-design.png",
    author: "Copernicus Team",
    content: `
      <p>A logo is just the beginning. True visual identity systems are comprehensive frameworks that ensure consistency, flexibility, and recognition across every brand touchpoint.</p>

      <h2>Beyond the Logo</h2>
      <p>While your logo is important, a complete visual identity system includes typography, color palettes, imagery styles, iconography, patterns, layouts, and usage guidelines. Together, these elements create a cohesive visual language that makes your brand instantly recognizable.</p>

      <h2>The Components of Strong Systems</h2>
      <p><strong>Typography:</strong> Choose typefaces that reflect your brand personality and work well across all applications—from mobile screens to billboards.</p>

      <p><strong>Color System:</strong> Develop a primary, secondary, and accent color palette with clear usage guidelines for different contexts.</p>

      <p><strong>Photography & Imagery:</strong> Define the style, mood, composition, and subject matter that aligns with your brand.</p>

      <p><strong>Grid Systems & Layouts:</strong> Create flexible layout templates that maintain consistency while allowing creativity.</p>

      <h2>Building for Scale</h2>
      <p>Great identity systems anticipate future needs. They're flexible enough to adapt to new channels and applications while maintaining core consistency. Document everything clearly so that anyone working with your brand can apply it correctly.</p>

      <p>Remember: consistency builds recognition, and recognition builds trust.</p>
    `,
  },
]

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.id,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = posts.find((p) => p.id === params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.id === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://copernicus.com" },
          { name: "Insights", url: "https://copernicus.com/insights" },
          { name: post.title, url: `https://copernicus.com/insights/${post.id}` },
        ]}
      />
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 mb-8 text-sm font-semibold hover:gap-3 transition-all"
              style={{ color: "var(--copernicus-orange)" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>

            <Badge
              variant="outline"
              className="mb-4 border-[var(--copernicus-orange)]"
              style={{ color: "var(--copernicus-orange)" }}
            >
              {post.category}
            </Badge>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-balance"
              style={{ color: "var(--copernicus-text-primary)" }}
            >
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-sm mb-8" style={{ color: "var(--copernicus-text-secondary)" }}>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg mb-12">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <article
              className="prose prose-lg max-w-none"
              style={{ color: "var(--copernicus-text-secondary)" }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--copernicus-section-bg)]">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold mb-8" style={{ color: "var(--copernicus-text-primary)" }}>
              More Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts
                .filter((p) => p.id !== post.id)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/insights/${relatedPost.id}`}
                    className="group block overflow-hidden rounded-lg border border-[var(--copernicus-border)] hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6" style={{ backgroundColor: "var(--copernicus-bg)" }}>
                      <Badge
                        variant="outline"
                        className="text-xs border-[var(--copernicus-border)] mb-3"
                        style={{ color: "var(--copernicus-orange)" }}
                      >
                        {relatedPost.category}
                      </Badge>
                      <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--copernicus-text-primary)" }}>
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm" style={{ color: "var(--copernicus-text-secondary)" }}>
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: "var(--copernicus-text-primary)" }}>
              Let's Work Together
            </h2>
            <p className="text-lg mb-10" style={{ color: "var(--copernicus-text-secondary)" }}>
              Ready to elevate your brand? Get in touch and let's create something extraordinary.
            </p>
            <Button
              asChild
              size="lg"
              className="font-semibold px-8"
              style={{
                backgroundColor: "var(--copernicus-orange)",
                color: "white",
              }}
            >
              <Link href="/contact">Start a Project</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
