import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Lightbulb, Award, Quote, Star, ArrowRight } from "lucide-react"
import { OrganizationSchema, WebSiteSchema } from "@/lib/schema"
import { ClientLogos } from "@/components/client-logos"

export const metadata: Metadata = {
  title: "Copernicus - Premium Brand & Creative Agency",
  description:
    "Full-service brand and creative agency specializing in brand strategy, identity design, advertising, events, and content production.",
}

const capabilities = [
  "Brand Strategy & Identity",
  "Advertising & Campaigns",
  "Print & Production",
  "Event Management",
  "Film & Content",
  "Brand Consultancy",
]

const testimonials = [
  {
    quote:
      "Copernicus transformed our brand completely. The strategy was clear, the creative was bold, and the execution was flawless. They're true partners in growth.",
    author: "Sarah Al-Maktoum",
    role: "CEO",
    company: "Luxe Retail Group",
    rating: 5,
  },
  {
    quote:
      "What impressed us most was their integrated approach. Strategy, design, and production working in perfect harmony. Our brand has never been stronger.",
    author: "Mohammed Hassan",
    role: "Founder",
    company: "TechVenture",
    rating: 5,
  },
  {
    quote:
      "The team's creativity combined with strategic thinking delivered results we didn't expect. Our sales increased 40% in the first six months post-launch.",
    author: "Fatima Al-Sayed",
    role: "Marketing Director",
    company: "Premium Hospitality Group",
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0b0b0b]">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <h1 className="text-[2.75rem] leading-[1.1] md:text-[44px] font-semibold text-white">
                  Brands That Resonate. <span className="block mt-2">Experiences</span>
                  <span className="block mt-2">That Endure.</span>
                </h1>

                <p className="text-base leading-[1.6] text-white/70 max-w-xl">
                  We're a premium creative agency crafting compelling brand experiences from strategy to production.
                  From vision to reality, we bring brands to life.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full font-medium px-8 bg-white hover:bg-white/90 text-black border-0"
                  >
                    <Link href="/work">Explore Our Work</Link>
                  </Button>
                </div>
              </div>

              {/* Right Side - Vertical Grid with Animation */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-2 gap-4 h-[600px] overflow-hidden">
                  {/* Left Column - Scroll Down */}
                  <div className="space-y-4 animate-scroll-down">
                    <div className="aspect-square rounded-lg overflow-hidden bg-white/5">
                      <img
                        src="/.jpg?height=400&width=400&query=Brand strategy design mockup colorful"
                        alt="Brand strategy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-[4/5] rounded-lg overflow-hidden bg-white/5">
                      <img
                        src="/.jpg?height=500&width=400&query=Mobile app interface modern design"
                        alt="Mobile app"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-square rounded-lg overflow-hidden bg-white/5">
                      <img
                        src="/.jpg?height=400&width=400&query=Website design laptop mockup"
                        alt="Website design"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Duplicate for seamless loop */}
                    <div className="aspect-square rounded-lg overflow-hidden bg-white/5">
                      <img
                        src="/.jpg?height=400&width=400&query=Brand strategy design mockup colorful"
                        alt="Brand strategy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-[4/5] rounded-lg overflow-hidden bg-white/5">
                      <img
                        src="/.jpg?height=500&width=400&query=Mobile app interface modern design"
                        alt="Mobile app"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Right Column - Scroll Up */}
                  <div className="space-y-4 pt-20 animate-scroll-up">
                    <div className="aspect-[4/5] rounded-lg overflow-hidden bg-white/5">
                      <img
                        src="/.jpg?height=500&width=400&query=Team collaboration office workspace"
                        alt="Team collaboration"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-square rounded-lg overflow-hidden bg-white/5">
                      <img
                        src="/.jpg?height=400&width=400&query=Creative design process sketches"
                        alt="Design process"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-[4/5] rounded-lg overflow-hidden bg-white/5">
                      <img
                        src="/.jpg?height=500&width=400&query=Professional photography equipment studio"
                        alt="Photography"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Duplicate for seamless loop */}
                    <div className="aspect-[4/5] rounded-lg overflow-hidden bg-white/5">
                      <img
                        src="/.jpg?height=500&width=400&query=Team collaboration office workspace"
                        alt="Team collaboration"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-square rounded-lg overflow-hidden bg-white/5">
                      <img
                        src="/.jpg?height=400&width=400&query=Creative design process sketches"
                        alt="Design process"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scrolling Marquee Bar */}
        <section className="py-8 overflow-hidden" style={{ backgroundColor: "var(--copernicus-orange)" }}>
          <div className="relative">
            <div className="flex items-center gap-12 animate-scroll-left whitespace-nowrap">
              {[...Array(10)].map((_, i) => (
                <span
                  key={i}
                  className={`text-5xl md:text-6xl font-semibold italic ${i % 2 === 0 ? "text-black" : "text-white"}`}
                >
                  #WEARECOPERNICUS
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Client Logos Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2
                className="text-[36px] leading-[1.15] font-semibold mb-4"
                style={{ color: "var(--copernicus-text-primary)" }}
              >
                Trusted by Leading Brands
              </h2>
              <p
                className="text-base leading-[1.6] max-w-2xl mx-auto"
                style={{ color: "var(--copernicus-text-secondary)" }}
              >
                We're proud to partner with forward-thinking organizations across industries
              </p>
            </div>
            <ClientLogos />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--copernicus-text-primary)]">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-[36px] leading-[1.15] font-semibold mb-4 text-white">What Our Clients Say</h2>
              <p className="text-base leading-[1.6] max-w-2xl mx-auto text-white/80">
                Don't just take our word for it. Hear from brands we've partnered with.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
                >
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="w-12 h-12 text-[var(--copernicus-orange)] opacity-50" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[var(--copernicus-orange)]"
                        style={{ color: "var(--copernicus-orange)" }}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-white text-base leading-[1.6] mb-8">"{testimonial.quote}"</p>

                  {/* Author Info */}
                  <div className="pt-6 border-t border-white/10">
                    <p className="font-medium text-white text-base mb-1">{testimonial.author}</p>
                    <p className="text-white/70 text-sm">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WeAreCopernicus Culture Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--copernicus-section-bg)]">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2
                className="text-[36px] leading-[1.15] font-semibold mb-6"
                style={{ color: "var(--copernicus-text-primary)" }}
              >
                #WeAreCopernicus
              </h2>
              <p
                className="text-base leading-[1.6] max-w-3xl mx-auto"
                style={{ color: "var(--copernicus-text-secondary)" }}
              >
                A collective of strategists, designers, and storytellers united by our passion for creating brands that
                matter. We don't just work together—we build, inspire, and grow together.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white border-[var(--copernicus-border)] hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: "var(--copernicus-orange-soft)" }}
                  >
                    <Users className="w-7 h-7" style={{ color: "var(--copernicus-orange)" }} />
                  </div>
                  <h3
                    className="text-[28px] leading-[1.2] font-medium mb-4"
                    style={{ color: "var(--copernicus-text-primary)" }}
                  >
                    Diverse Perspectives
                  </h3>
                  <p className="text-[15.5px] leading-[1.6]" style={{ color: "var(--copernicus-text-secondary)" }}>
                    Our team brings together talents from around the world, each contributing unique insights that make
                    our work richer and more impactful.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-[var(--copernicus-border)] hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: "var(--copernicus-orange-soft)" }}
                  >
                    <Lightbulb className="w-7 h-7" style={{ color: "var(--copernicus-orange)" }} />
                  </div>
                  <h3
                    className="text-[28px] leading-[1.2] font-medium mb-4"
                    style={{ color: "var(--copernicus-text-primary)" }}
                  >
                    Creative Excellence
                  </h3>
                  <p className="text-[15.5px] leading-[1.6]" style={{ color: "var(--copernicus-text-secondary)" }}>
                    We push boundaries, challenge conventions, and never settle for good enough. Every project is an
                    opportunity to create something extraordinary.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-[var(--copernicus-border)] hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: "var(--copernicus-orange-soft)" }}
                  >
                    <Award className="w-7 h-7" style={{ color: "var(--copernicus-orange)" }} />
                  </div>
                  <h3
                    className="text-[28px] leading-[1.2] font-medium mb-4"
                    style={{ color: "var(--copernicus-text-primary)" }}
                  >
                    Shared Success
                  </h3>
                  <p className="text-[15.5px] leading-[1.6]" style={{ color: "var(--copernicus-text-secondary)" }}>
                    When our clients win, we win. We measure our success by the impact we create and the relationships
                    we build along the way.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-semibold border-[var(--copernicus-border)] bg-transparent"
                style={{
                  borderColor: "var(--copernicus-orange)",
                  color: "var(--copernicus-orange)",
                }}
              >
                <Link href="/about">Meet the Team</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16 max-w-4xl mx-auto">
              <h2 className="text-[36px] leading-[1.15] font-semibold mb-4">
                <span style={{ color: "var(--copernicus-text-primary)" }}>Discover Our Services</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Link href="/services/brand-strategy" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                  <div className="text-sm font-semibold mb-4" style={{ color: "var(--copernicus-orange)" }}>
                    /01
                  </div>
                  <h3
                    className="text-[28px] leading-[1.2] font-semibold mb-4 group-hover:text-[var(--copernicus-orange)] transition-colors"
                    style={{ color: "var(--copernicus-text-primary)" }}
                  >
                    Brand Strategy & Identity
                  </h3>
                  <p className="text-[15.5px] leading-[1.6] mb-6" style={{ color: "var(--copernicus-text-secondary)" }}>
                    Strategic foundations and visual systems that define who you are and how you show up in the world.
                  </p>
                  <div
                    className="flex items-center text-sm font-medium group-hover:translate-x-2 transition-transform"
                    style={{ color: "var(--copernicus-orange)" }}
                  >
                    Learn more <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>

              <Link href="/services/advertising" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                  <div className="text-sm font-semibold mb-4" style={{ color: "var(--copernicus-orange)" }}>
                    /02
                  </div>
                  <h3
                    className="text-[28px] leading-[1.2] font-semibold mb-4 group-hover:text-[var(--copernicus-orange)] transition-colors"
                    style={{ color: "var(--copernicus-text-primary)" }}
                  >
                    Advertising Campaigns
                  </h3>
                  <p className="text-[15.5px] leading-[1.6] mb-6" style={{ color: "var(--copernicus-text-secondary)" }}>
                    Integrated campaigns that break through the noise and drive measurable results across all channels.
                  </p>
                  <div
                    className="flex items-center text-sm font-medium group-hover:translate-x-2 transition-transform"
                    style={{ color: "var(--copernicus-orange)" }}
                  >
                    Learn more <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>

              <Link href="/services/print-media" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                  <div className="text-sm font-semibold mb-4" style={{ color: "var(--copernicus-orange)" }}>
                    /03
                  </div>
                  <h3
                    className="text-[28px] leading-[1.2] font-semibold mb-4 group-hover:text-[var(--copernicus-orange)] transition-colors"
                    style={{ color: "var(--copernicus-text-primary)" }}
                  >
                    Print & Media Design
                  </h3>
                  <p className="text-[15.5px] leading-[1.6] mb-6" style={{ color: "var(--copernicus-text-secondary)" }}>
                    Premium print materials and media assets that bring your brand to life in physical and digital
                    spaces.
                  </p>
                  <div
                    className="flex items-center text-sm font-medium group-hover:translate-x-2 transition-transform"
                    style={{ color: "var(--copernicus-orange)" }}
                  >
                    Learn more <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>

              <Link href="/services/event-management" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                  <div className="text-sm font-semibold mb-4" style={{ color: "var(--copernicus-orange)" }}>
                    /04
                  </div>
                  <h3
                    className="text-[28px] leading-[1.2] font-semibold mb-4 group-hover:text-[var(--copernicus-orange)] transition-colors"
                    style={{ color: "var(--copernicus-text-primary)" }}
                  >
                    Event Management
                  </h3>
                  <p className="text-[15.5px] leading-[1.6] mb-6" style={{ color: "var(--copernicus-text-secondary)" }}>
                    Memorable brand experiences and flawlessly executed events that engage audiences and create lasting
                    impressions.
                  </p>
                  <div
                    className="flex items-center text-sm font-medium group-hover:translate-x-2 transition-transform"
                    style={{ color: "var(--copernicus-orange)" }}
                  >
                    Learn more <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>

              <Link href="/services/media-production" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                  <div className="text-sm font-semibold mb-4" style={{ color: "var(--copernicus-orange)" }}>
                    /05
                  </div>
                  <h3
                    className="text-[28px] leading-[1.2] font-semibold mb-4 group-hover:text-[var(--copernicus-orange)] transition-colors"
                    style={{ color: "var(--copernicus-text-primary)" }}
                  >
                    Media Production
                  </h3>
                  <p className="text-[15.5px] leading-[1.6] mb-6" style={{ color: "var(--copernicus-text-secondary)" }}>
                    Professional video, photography, and motion graphics production that tells compelling brand stories
                    with high production values.
                  </p>
                  <div
                    className="flex items-center text-sm font-medium group-hover:translate-x-2 transition-transform"
                    style={{ color: "var(--copernicus-orange)" }}
                  >
                    Learn more <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>

              <Link href="/services/brand-consultancy" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                  <div className="text-sm font-semibold mb-4" style={{ color: "var(--copernicus-orange)" }}>
                    /06
                  </div>
                  <h3
                    className="text-[28px] leading-[1.2] font-semibold mb-4 group-hover:text-[var(--copernicus-orange)] transition-colors"
                    style={{ color: "var(--copernicus-text-primary)" }}
                  >
                    Brand Consultancy
                  </h3>
                  <p className="text-[15.5px] leading-[1.6] mb-6" style={{ color: "var(--copernicus-text-secondary)" }}>
                    Expert guidance to navigate complex brand challenges and unlock new growth opportunities.
                  </p>
                  <div
                    className="flex items-center text-sm font-medium group-hover:translate-x-2 transition-transform"
                    style={{ color: "var(--copernicus-orange)" }}
                  >
                    Learn more <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
            </div>

            <div className="mt-12 text-center">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-semibold border-[var(--copernicus-orange)] text-[var(--copernicus-orange)] hover:bg-[var(--copernicus-orange)] hover:text-white bg-transparent"
              >
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--copernicus-orange)" }}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">Let's Create Something Extraordinary</h2>
            <p className="text-lg mb-10 text-white/90 max-w-2xl mx-auto">
              Ready to transform your brand? Let's discuss how we can bring your vision to life and create measurable
              impact together.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-[var(--copernicus-orange)] hover:bg-white/90 font-semibold px-10"
            >
              <Link href="/contact">Start Your Project</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
