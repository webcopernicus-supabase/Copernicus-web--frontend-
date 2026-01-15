"use client"

import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight } from "lucide-react"
import { BreadcrumbSchema, FAQSchema } from "@/lib/schema"

const services = [
  {
    id: "brand-strategy",
    number: "01",
    title: "Brand Strategy & Identity",
    shortDesc: "Strategic foundations that define who you are",
    description:
      "Strategic brand positioning, visual identity systems, and comprehensive guidelines that establish your market presence and differentiate your brand in competitive landscapes.",
    capabilities: [
      "Brand positioning & architecture",
      "Visual identity design system",
      "Brand voice & messaging",
      "Comprehensive brand guidelines",
      "Market research & analysis",
      "Brand asset libraries",
    ],
    cta: "Build brand identity",
  },
  {
    id: "advertising",
    number: "02",
    title: "Advertising Campaigns",
    shortDesc: "Integrated campaigns that drive results",
    description:
      "Multi-channel advertising campaigns that combine strategic planning, creative excellence, and data-driven optimization to maximize reach and ROI across digital and traditional media.",
    capabilities: [
      "Integrated campaign strategy",
      "Digital & social media advertising",
      "Print & out-of-home campaigns",
      "Creative concept & copywriting",
      "Media planning & buying",
      "Performance optimization",
    ],
    cta: "Launch campaign",
  },
  {
    id: "brand-consultancy",
    number: "03",
    title: "Brand Consultancy",
    shortDesc: "Expert guidance for brand challenges",
    description:
      "Strategic consulting services that help navigate complex brand decisions, unlock growth opportunities, and align organizational vision with market realities through data and insights.",
    capabilities: [
      "Brand health audits",
      "Strategic positioning workshops",
      "Competitive analysis",
      "Brand extension planning",
      "Naming & nomenclature",
      "Leadership alignment sessions",
    ],
    cta: "Get expert guidance",
  },
  {
    id: "print-media",
    number: "04",
    title: "Print & Media Design",
    shortDesc: "Premium materials that bring brands to life",
    description:
      "Expertly crafted print collateral, packaging design, and environmental graphics that extend your brand into physical spaces with precision and attention to detail.",
    capabilities: [
      "Marketing collateral design",
      "Packaging & product design",
      "Editorial & magazine layout",
      "Environmental graphics",
      "Signage & wayfinding",
      "Print production management",
    ],
    cta: "Create print materials",
  },
  {
    id: "event-management",
    number: "05",
    title: "Event Management",
    shortDesc: "Memorable experiences that engage",
    description:
      "End-to-end event planning and execution services that create impactful brand experiences, from intimate gatherings to large-scale productions with seamless coordination.",
    capabilities: [
      "Event strategy & concept",
      "Venue selection & management",
      "Event branding & collateral",
      "Production & logistics",
      "Vendor coordination",
      "On-site management",
    ],
    cta: "Plan your event",
  },
  {
    id: "media-production",
    number: "06",
    title: "Media Production",
    shortDesc: "Cinematic content across all platforms",
    description:
      "Professional video, photography, and motion graphics production that tells compelling brand stories with high production values and strategic content planning.",
    capabilities: [
      "Brand film & commercial production",
      "Social media content series",
      "Product & lifestyle photography",
      "Animation & motion graphics",
      "Content strategy & calendars",
      "Post-production & color grading",
    ],
    cta: "Start production",
  },
]

const processSteps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description: "Deep dive into your business, audience, and market to develop a strategic foundation",
  },
  {
    number: "02",
    title: "Concept & Creative",
    description: "Rapid concept development with iterative refinement and client collaboration",
  },
  {
    number: "03",
    title: "Execution & Production",
    description: "Meticulous production management ensuring quality and timeline adherence",
  },
  {
    number: "04",
    title: "Launch & Optimization",
    description: "Strategic rollout with performance monitoring and continuous improvement",
  },
]

const proofStats = [
  { number: "15+", label: "Years of Excellence" },
  { number: "500+", label: "Projects Delivered" },
  { number: "12+", label: "Markets Served" },
  { number: "98%", label: "Client Satisfaction" },
]

const faqs = [
  {
    question: "What services does Copernicus offer?",
    answer:
      "We're a full-service branding and creative agency offering brand strategy and positioning, identity design, advertising campaigns, digital marketing, print and packaging design, event production, and media content creation. Each service is designed to deliver strategic value and creative excellence.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines vary by scope. Brand strategy projects typically take 6-8 weeks, complete identity systems 8-12 weeks, and advertising campaigns 4-6 weeks. We pride ourselves on fast turnaround—concepts often delivered within 4-5 days of kickoff.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes, while based in Dubai, we serve clients across the GCC, Middle East, and internationally. We have experience across 12+ markets and navigate cultural nuances, time zones, and regional requirements seamlessly.",
  },
  {
    question: "What makes Copernicus different?",
    answer:
      "We combine strategic rigor with creative excellence and seamless execution. Our integrated team works collaboratively to deliver solutions that are both beautiful and effective. We're not just an agency—we're your strategic partner.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We serve diverse sectors including retail and fashion, food and beverage, corporate services, real estate, hospitality, events, entertainment, and lifestyle brands. Our strategic approach adapts to any industry.",
  },
  {
    question: "How do you measure project success?",
    answer:
      "Success metrics are defined collaboratively at project outset based on your objectives—brand awareness, engagement, conversion, market share, or qualitative feedback. We provide detailed reporting with actionable insights.",
  },
  {
    question: "Can you handle complete end-to-end projects?",
    answer:
      "Absolutely. We offer comprehensive end-to-end services from initial strategy through final production and launch. This integrated approach ensures consistency, quality, and alignment at every project stage.",
  },
  {
    question: "What's your pricing structure?",
    answer:
      "We offer project-based and retainer pricing depending on your needs. After understanding your requirements, we provide transparent proposals outlining scope, timeline, deliverables, and investment.",
  },
]

export default function ServicesClientPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://copernicus.com" },
          { name: "Services", url: "https://copernicus.com/services" },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <Header />
      <main className="min-h-screen bg-white">
        {/* Image Grid Showcase */}
        <section className="pt-24 pb-0 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-0">
            {/* Row 1 */}
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="/brand-strategy-concept-abstract.jpg"
                alt="Brand Strategy"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="/creative-design-workspace.jpg"
                alt="Creative Design"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="/advertising-campaign-vibrant.jpg"
                alt="Advertising"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="/brand-identity-colorful.jpg"
                alt="Brand Identity"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="/digital-marketing-modern.jpg"
                alt="Digital Marketing"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="/creative-illustration-vibrant-purple.jpg"
                alt="Creative Work"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="/metallic-design-futuristic.jpg"
                alt="Design"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Row 2 */}
            <div className="aspect-square relative overflow-hidden bg-yellow-300" />
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="/sunset-landscape-artistic.jpg"
                alt="Landscape"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="/stylized-bird-pink-vibrant.jpg"
                alt="Bird Art"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="/fantasy-creature-blue-purple.jpg"
                alt="Fantasy Art"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square relative overflow-hidden bg-neutral-100" />
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="/portrait-neon-lighting.jpg"
                alt="Portrait"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="/robot-colorful-vibrant-purple.jpg"
                alt="Robot"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square relative overflow-hidden bg-yellow-300" />
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="/cyberpunk-cityscape-neon.jpg"
                alt="Cityscape"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h1
              className="text-5xl sm:text-6xl font-semibold mb-12 leading-tight"
              style={{ color: "var(--copernicus-text-primary)" }}
            >
              Services
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed" style={{ color: "var(--copernicus-text-secondary)" }}>
              Our services encompass strategy, creative, branding, and development. Backed by our proven processes,
              experience, and unwavering stability, we deliver impactful results. We work efficiently and proactively to
              mitigate risks and timeline disruptions. This ensures your investment continues to deliver value for years
              to come.
            </p>
          </div>
        </section>

        {/* Services Sections */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl space-y-24">
            {services.map((service, index) => (
              <div key={service.id} id={service.id} className="scroll-mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  {/* Left Column: Title and Description */}
                  <div>
                    <h2
                      className="text-4xl sm:text-5xl font-semibold mb-6 leading-tight"
                      style={{ color: "var(--copernicus-text-primary)" }}
                    >
                      {service.title}
                    </h2>
                    <p className="text-base leading-relaxed mb-6" style={{ color: "var(--copernicus-text-secondary)" }}>
                      {service.description}
                    </p>
                    <Link
                      href={`/services/${service.id}`}
                      className="inline-flex items-center gap-2 text-[var(--copernicus-orange)] font-medium hover:gap-3 transition-all"
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Right Column: Capabilities List */}
                  <div>
                    <ul className="space-y-3" style={{ color: "var(--copernicus-text-secondary)" }}>
                      {service.capabilities.map((capability) => (
                        <li key={capability} className="flex items-start text-base">
                          <span className="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-[var(--copernicus-orange)] flex-shrink-0" />
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--copernicus-section-bg)]">
          <div className="mx-auto max-w-5xl">
            <h2
              className="text-4xl sm:text-5xl font-semibold mb-16"
              style={{ color: "var(--copernicus-text-primary)" }}
            >
              Our Process
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {processSteps.map((step) => (
                <div key={step.number} className="group">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 flex-shrink-0 rounded-full bg-[var(--copernicus-orange)] text-white flex items-center justify-center text-lg font-semibold">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--copernicus-text-primary)" }}>
                        {step.title}
                      </h3>
                      <p className="text-base leading-relaxed" style={{ color: "var(--copernicus-text-secondary)" }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-4xl">
            <h2
              className="text-4xl sm:text-5xl font-semibold mb-12"
              style={{ color: "var(--copernicus-text-primary)" }}
            >
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-[var(--copernicus-border)] rounded-lg px-6 py-4"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <span
                      className="text-left font-semibold text-lg"
                      style={{ color: "var(--copernicus-text-primary)" }}
                    >
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base leading-relaxed pt-2" style={{ color: "var(--copernicus-text-secondary)" }}>
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--copernicus-orange)" }}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl sm:text-5xl font-semibold mb-6 text-white">Shake things up, take a sip!</h2>
            <p className="text-lg mb-12 text-white/90 max-w-2xl mx-auto">
              We bring clarity & flavor to help you reach your goals.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-[var(--copernicus-orange)] hover:bg-white/90 font-semibold px-8"
            >
              <Link href="/work">See the results</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
