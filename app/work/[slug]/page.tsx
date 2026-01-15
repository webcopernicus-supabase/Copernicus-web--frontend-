import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { BreadcrumbSchema } from "@/lib/schema"

const projects = [
  {
    id: "pizza-creatives-branding",
    title: "Pizza Creatives Visual Identity",
    client: "Pizza Creatives",
    category: "Brand Strategy",
    year: "2024",
    description:
      "Complete visual identity and brand strategy for Pizza Creatives, a modern food brand targeting millennials and Gen Z. The project encompassed brand positioning, logo design, color system, typography, and comprehensive brand guidelines.",
    challenge:
      "Pizza Creatives needed to stand out in a saturated food delivery market while appealing to a younger, design-conscious audience.",
    solution:
      "We developed a bold, playful brand identity with vibrant colors and dynamic typography that captures the energy and creativity of modern food culture.",
    results: [
      "40% increase in social media engagement",
      "Brand recognition up by 65%",
      "Successfully launched in 3 markets",
    ],
    services: ["Brand Strategy", "Visual Identity", "Brand Guidelines", "Content Creation"],
    images: ["/pizza-creatives.jpg"],
    mainImage: "/pizza-creatives.jpg",
  },
  {
    id: "yu-taekwondo-campaign",
    title: "YU Taekwondo Marketing Campaign",
    client: "YU Taekwondo Dubai",
    category: "Advertising",
    year: "2024",
    description:
      "Integrated marketing campaign for YU Taekwondo's Dubai studio, focusing on family enrollment and community building through multicultural messaging.",
    challenge:
      "YU Taekwondo needed to increase studio membership while positioning themselves as a premium family-friendly martial arts destination.",
    solution:
      "Multi-channel campaign featuring dynamic lifestyle photography, motivational messaging, and targeted promotions across digital, print, and OOH channels.",
    results: [
      "120% increase in trial class bookings",
      "85% conversion rate from trial to membership",
      "Successful launch event with 200+ attendees",
    ],
    services: ["Campaign Strategy", "Art Direction", "Print Design", "Digital Marketing"],
    images: ["/yu-taekwondo.jpg"],
    mainImage: "/yu-taekwondo.jpg",
  },
  {
    id: "fasttrack-brand-identity",
    title: "Fasttrack Emarat Brand System",
    client: "Fasttrack Automotive Services",
    category: "Brand Strategy",
    year: "2024",
    description:
      "Comprehensive brand identity system for Fasttrack, Emarat's premium automotive services division, including strategy, visual identity, and brand collateral.",
    challenge:
      "Fasttrack needed a distinct brand identity that conveyed premium quality while maintaining alignment with Emarat's established equity.",
    solution:
      "Bold, tech-forward brand system with dynamic motion graphics, sophisticated color palette, and comprehensive touchpoint applications.",
    results: [
      "Brand launched across 25+ service centers",
      "Customer satisfaction scores up 35%",
      "Premium service tier uptake increased 50%",
    ],
    services: ["Brand Strategy", "Identity Design", "Guidelines", "Collateral System"],
    images: ["/fasttrack-proposal.webp", "/fasttrack-billboard.png", "/fasttrack-brochure.webp"],
    mainImage: "/fasttrack-proposal.webp",
  },
  {
    id: "vasmed-exhibition-design",
    title: "Vasmed Exhibition Stand Design",
    client: "Vasmed Medical Devices",
    category: "Events",
    year: "2024",
    description:
      "Modular exhibition stand design for Vasmed's participation in international medical trade shows, emphasizing product innovation and brand authority.",
    challenge:
      "Create a flexible, eye-catching exhibition presence that works across multiple show formats while highlighting technical product benefits.",
    solution:
      "Sophisticated modular stand design with interactive product displays, clean aesthetic, and strategic messaging hierarchy.",
    results: [
      "Generated 300+ qualified leads",
      "Secured 8 new distribution partnerships",
      "Stand won 'Best in Show' design award",
    ],
    services: ["Exhibition Design", "Spatial Planning", "Graphics Production", "On-site Management"],
    images: ["/vasmed-exhibition.png"],
    mainImage: "/vasmed-exhibition.png",
  },
  {
    id: "copernicus-social-content",
    title: "Copernicus Social Media Series",
    client: "Copernicus Agency",
    category: "Content",
    year: "2024",
    description:
      "Strategic social media content series showcasing Copernicus's agency culture, philosophy, and thought leadership across LinkedIn and Instagram.",
    challenge:
      "Establish Copernicus as a thought leader in brand strategy while maintaining authentic, engaging social presence.",
    solution:
      "Multi-format content strategy mixing bold visual statements, agency insights, and behind-the-scenes storytelling.",
    results: ["250% increase in profile engagement", "40+ inbound project inquiries", "LinkedIn followers grew 180%"],
    services: ["Content Strategy", "Art Direction", "Copywriting", "Social Media Management"],
    images: ["/copernicus-social-carousel.jpg"],
    mainImage: "/copernicus-social-carousel.jpg",
  },
  {
    id: "powerbox-product-launch",
    title: "Power Box Product Launch Campaign",
    client: "Power Solutions",
    category: "Advertising",
    year: "2024",
    description:
      "Product launch campaign for Power Box portable power stations, targeting outdoor enthusiasts and emergency preparedness market.",
    challenge:
      "Launch a new product in a competitive category with limited brand awareness and establish clear differentiation.",
    solution:
      "Lifestyle-focused campaign emphasizing freedom, adventure, and reliability through compelling photography and clear benefit messaging.",
    results: [
      "Exceeded first-quarter sales targets by 165%",
      "Secured retail distribution in 50+ stores",
      "Campaign reached 2M+ impressions",
    ],
    services: ["Campaign Strategy", "Photography", "Digital Advertising", "Content Production"],
    images: ["/powerbox-campaign.jpg"],
    mainImage: "/powerbox-campaign.jpg",
  },
  {
    id: "fasttrack-ooh-campaign",
    title: "Fasttrack OOH Billboard Campaign",
    client: "Fasttrack Automotive Services",
    category: "Advertising",
    year: "2024",
    description:
      "Out-of-home billboard campaign across Dubai and Abu Dhabi promoting Fasttrack's comprehensive automotive care services.",
    challenge: "Cut through highway advertising clutter with clear, memorable messaging that drives action.",
    solution:
      "Bold, Arabic-English bilingual designs with strong visual metaphors and clear CTAs optimized for quick highway viewing.",
    results: [
      "30% increase in appointment bookings",
      "Brand recall testing showed 72% recognition",
      "Campaign extended for additional 6 months",
    ],
    services: ["OOH Strategy", "Creative Concepting", "Production Management", "Media Planning"],
    images: ["/fasttrack-billboard.png"],
    mainImage: "/fasttrack-billboard.png",
  },
  {
    id: "fasttrack-collateral-system",
    title: "Fasttrack Marketing Collateral",
    client: "Fasttrack Automotive Services",
    category: "Print",
    year: "2024",
    description:
      "Comprehensive print collateral system including trifold brochures, service menus, promotional materials, and branded stationery.",
    challenge:
      "Create a flexible collateral system that works across diverse touchpoints while maintaining brand consistency.",
    solution:
      "Modular design system with clear information hierarchy, engaging visuals, and Arabic-English layouts optimized for local market.",
    results: [
      "Collateral deployed across 25+ locations",
      "Customer inquiries increased 45%",
      "Print materials inform 60% of service bookings",
    ],
    services: ["Print Design", "Copywriting", "Production Management", "Distribution Coordination"],
    images: ["/fasttrack-brochure.webp"],
    mainImage: "/fasttrack-brochure.webp",
  },
]

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: project.title,
    description: project.description,
  }
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.id === params.slug)

  if (!project) {
    notFound()
  }

  const currentIndex = projects.findIndex((p) => p.id === params.slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://copernicus.com" },
          { name: "Work", url: "https://copernicus.com/work" },
          { name: project.title, url: `https://copernicus.com/work/${project.id}` },
        ]}
      />
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 mb-8 text-sm font-semibold hover:gap-3 transition-all"
              style={{ color: "var(--copernicus-orange)" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Work
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge
                    variant="outline"
                    className="border-[var(--copernicus-orange)]"
                    style={{ color: "var(--copernicus-orange)" }}
                  >
                    {project.category}
                  </Badge>
                  <span className="text-sm font-medium" style={{ color: "var(--copernicus-text-secondary)" }}>
                    {project.year}
                  </span>
                </div>

                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-balance"
                  style={{ color: "var(--copernicus-text-primary)" }}
                >
                  {project.title}
                </h1>

                <p className="text-xl mb-4" style={{ color: "var(--copernicus-text-secondary)" }}>
                  {project.client}
                </p>

                <p className="text-lg leading-relaxed" style={{ color: "var(--copernicus-text-secondary)" }}>
                  {project.description}
                </p>
              </div>

              <div className="lg:sticky lg:top-32">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={project.mainImage || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--copernicus-section-bg)]">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--copernicus-text-primary)" }}>
                  The Challenge
                </h2>
                <p className="leading-relaxed" style={{ color: "var(--copernicus-text-secondary)" }}>
                  {project.challenge}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--copernicus-text-primary)" }}>
                  Our Solution
                </h2>
                <p className="leading-relaxed" style={{ color: "var(--copernicus-text-secondary)" }}>
                  {project.solution}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Results & Services */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--copernicus-text-primary)" }}>
                  Results
                </h2>
                <ul className="space-y-3">
                  {project.results.map((result, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: "var(--copernicus-orange-soft)" }}
                      >
                        <span className="text-xs font-bold" style={{ color: "var(--copernicus-orange)" }}>
                          ✓
                        </span>
                      </span>
                      <span style={{ color: "var(--copernicus-text-secondary)" }}>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--copernicus-text-primary)" }}>
                  Services Provided
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <Badge
                      key={service}
                      variant="outline"
                      className="px-4 py-2 border-[var(--copernicus-border)]"
                      style={{ color: "var(--copernicus-text-primary)" }}
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Images */}
        {project.images.length > 1 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--copernicus-section-bg)]">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.images.slice(1).map((image, index) => (
                  <div key={index} className="rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} - Image ${index + 2}`}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Navigation */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between gap-8">
              {prevProject ? (
                <Link
                  href={`/work/${prevProject.id}`}
                  className="group flex items-center gap-3 hover:gap-4 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" style={{ color: "var(--copernicus-orange)" }} />
                  <div>
                    <div className="text-sm font-medium mb-1" style={{ color: "var(--copernicus-text-secondary)" }}>
                      Previous Project
                    </div>
                    <div className="font-semibold" style={{ color: "var(--copernicus-text-primary)" }}>
                      {prevProject.title}
                    </div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextProject ? (
                <Link
                  href={`/work/${nextProject.id}`}
                  className="group flex items-center gap-3 hover:gap-4 transition-all text-right"
                >
                  <div>
                    <div className="text-sm font-medium mb-1" style={{ color: "var(--copernicus-text-secondary)" }}>
                      Next Project
                    </div>
                    <div className="font-semibold" style={{ color: "var(--copernicus-text-primary)" }}>
                      {nextProject.title}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5" style={{ color: "var(--copernicus-orange)" }} />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--copernicus-orange)" }}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">Let's Create Your Success Story</h2>
            <p className="text-lg mb-10 text-white/90 max-w-2xl mx-auto">
              Ready to elevate your brand? Get in touch and let's discuss how we can help you achieve your goals.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-[var(--copernicus-orange)] hover:bg-white/90 font-semibold px-8"
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
