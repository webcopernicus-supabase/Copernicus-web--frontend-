import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, ArrowRight } from "lucide-react"
import { BreadcrumbSchema, ServiceSchema } from "@/lib/schema"

const servicesData = {
  "brand-strategy": {
    title: "Brand Strategy & Identity",
    description: "Strategic foundations and visual systems that define your brand and create lasting market impact.",
    hero: {
      tagline: "Strategic foundations for enduring brands",
      overview:
        "Great brands aren't accidents—they're built on strategic clarity, deep audience understanding, and a compelling vision. We create brand identities that define who you are, what you stand for, and how you show up in the market.",
    },
    whatWeDo: [
      {
        title: "Brand Positioning",
        description:
          "Define your unique market space with clear positioning that differentiates you from competitors and resonates with your target audience.",
      },
      {
        title: "Visual Identity",
        description:
          "Create distinctive visual systems including logos, color palettes, typography, and graphic elements that bring your brand to life.",
      },
      {
        title: "Brand Architecture",
        description:
          "Structure your brand portfolio with clarity, establishing relationships between brands and product lines.",
      },
      {
        title: "Brand Guidelines",
        description:
          "Comprehensive documentation ensuring consistent brand application across all touchpoints and teams.",
      },
    ],
    deliverables: [
      "Brand strategy document and positioning framework",
      "Visual identity system with logo and color palette",
      "Typography system and graphic elements",
      "Comprehensive brand guidelines documentation",
      "Messaging framework and tone of voice guide",
      "Brand architecture and portfolio strategy",
      "Asset libraries and digital templates",
      "Stakeholder alignment presentations",
    ],
    process: [
      {
        step: "Discovery",
        description:
          "Stakeholder interviews, market research, and competitive analysis to understand your context and opportunity.",
      },
      {
        step: "Strategy",
        description:
          "Define positioning, value proposition, and strategic direction based on insights and opportunities.",
      },
      {
        step: "Identity Development",
        description:
          "Create visual and verbal identity systems that bring your strategy to life with confidence and clarity.",
      },
      {
        step: "Guidelines & Launch",
        description: "Document standards and create tools for consistent application across your organization.",
      },
    ],
    outcomes: [
      "Clear strategic direction and market positioning",
      "Distinctive visual identity that stands out",
      "Consistent brand experience across all touchpoints",
      "Increased brand recognition and market equity",
    ],
    relatedServices: ["advertising", "brand-consultancy"],
    faqs: [
      {
        question: "How long does a brand strategy project take?",
        answer:
          "A comprehensive brand strategy and identity project typically takes 8-12 weeks from kickoff to final delivery, depending on project scope, stakeholder availability, and revision rounds.",
      },
      {
        question: "Do we need a full rebrand or just a refresh?",
        answer:
          "It depends on your current situation. During discovery, we assess your existing brand and recommend whether you need a complete rebrand or strategic refresh. We provide honest guidance based on your business needs.",
      },
      {
        question: "What's included in brand guidelines?",
        answer:
          "Our guidelines cover logo usage, color palettes, typography, imagery style, graphic elements, tone of voice, and application examples. We also include digital guidelines for web and social, plus print specifications.",
      },
      {
        question: "Will the new brand require training?",
        answer:
          "Yes, we recommend training your team on the new brand guidelines and toolkit. We can facilitate workshops to ensure everyone understands and applies the brand consistently.",
      },
    ],
  },
  "brand-regulatory": {
    title: "Brand Strategy & Identity",
    description: "Strategic foundations and visual systems that define your brand and create lasting market impact.",
    hero: {
      tagline: "Strategic foundations for enduring brands",
      overview:
        "Great brands aren't accidents—they're built on strategic clarity, deep audience understanding, and a compelling vision. We create brand identities that define who you are, what you stand for, and how you show up in the market.",
    },
    whatWeDo: [
      {
        title: "Brand Positioning",
        description:
          "Define your unique market space with clear positioning that differentiates you from competitors and resonates with your target audience.",
      },
      {
        title: "Visual Identity",
        description:
          "Create distinctive visual systems including logos, color palettes, typography, and graphic elements that bring your brand to life.",
      },
      {
        title: "Brand Architecture",
        description:
          "Structure your brand portfolio with clarity, establishing relationships between brands and product lines.",
      },
      {
        title: "Brand Guidelines",
        description:
          "Comprehensive documentation ensuring consistent brand application across all touchpoints and teams.",
      },
    ],
    deliverables: [
      "Brand strategy document and positioning framework",
      "Visual identity system with logo and color palette",
      "Typography system and graphic elements",
      "Comprehensive brand guidelines documentation",
      "Messaging framework and tone of voice guide",
      "Brand architecture and portfolio strategy",
      "Asset libraries and digital templates",
      "Stakeholder alignment presentations",
    ],
    process: [
      {
        step: "Discovery",
        description:
          "Stakeholder interviews, market research, and competitive analysis to understand your context and opportunity.",
      },
      {
        step: "Strategy",
        description:
          "Define positioning, value proposition, and strategic direction based on insights and opportunities.",
      },
      {
        step: "Identity Development",
        description:
          "Create visual and verbal identity systems that bring your strategy to life with confidence and clarity.",
      },
      {
        step: "Guidelines & Launch",
        description: "Document standards and create tools for consistent application across your organization.",
      },
    ],
    outcomes: [
      "Clear strategic direction and market positioning",
      "Distinctive visual identity that stands out",
      "Consistent brand experience across all touchpoints",
      "Increased brand recognition and market equity",
    ],
    relatedServices: ["advertising", "brand-consultancy"],
    faqs: [
      {
        question: "How long does a brand strategy project take?",
        answer:
          "A comprehensive brand strategy and identity project typically takes 8-12 weeks from kickoff to final delivery, depending on project scope, stakeholder availability, and revision rounds.",
      },
      {
        question: "Do we need a full rebrand or just a refresh?",
        answer:
          "It depends on your current situation. During discovery, we assess your existing brand and recommend whether you need a complete rebrand or strategic refresh. We provide honest guidance based on your business needs.",
      },
      {
        question: "What's included in brand guidelines?",
        answer:
          "Our guidelines cover logo usage, color palettes, typography, imagery style, graphic elements, tone of voice, and application examples. We also include digital guidelines for web and social, plus print specifications.",
      },
      {
        question: "Will the new brand require training?",
        answer:
          "Yes, we recommend training your team on the new brand guidelines and toolkit. We can facilitate workshops to ensure everyone understands and applies the brand consistently.",
      },
    ],
  },
  advertising: {
    title: "Advertising & Campaigns",
    description:
      "Integrated campaigns that break through the noise and drive measurable business results across all channels.",
    hero: {
      tagline: "Campaigns that connect and convert",
      overview:
        "In a crowded marketplace, breaking through requires campaigns that truly resonate. We combine strategic thinking with creative excellence to create campaigns that capture attention, engage audiences, and drive measurable results.",
    },
    whatWeDo: [
      {
        title: "Campaign Strategy",
        description:
          "Develop integrated strategies that align with objectives and reach your audience where they are across channels.",
      },
      {
        title: "Creative Development",
        description: "Create compelling campaign concepts and assets that stand out in cluttered media environments.",
      },
      {
        title: "Media Planning",
        description:
          "Strategic planning across digital, social, print, and out-of-home channels for maximum impact and ROI.",
      },
      {
        title: "Brand Activations",
        description:
          "Design experiential activations that create memorable brand moments and drive consumer engagement.",
      },
    ],
    deliverables: [
      "Campaign strategy and creative briefs",
      "Multi-channel concept development",
      "Creative assets for digital, print, and OOH",
      "Media strategy and channel planning",
      "Social media content and copywriting",
      "Activation design and execution plans",
      "Performance tracking and optimization",
      "Post-campaign analysis and reporting",
    ],
    process: [
      {
        step: "Brief & Objectives",
        description: "Align on campaign goals, audience, channels, and success metrics for clear direction.",
      },
      {
        step: "Strategy & Concepting",
        description: "Develop campaign strategy, creative direction, and multi-channel approach.",
      },
      {
        step: "Production & Execution",
        description: "Produce campaign assets across all channels with quality oversight and approval.",
      },
      {
        step: "Launch & Optimization",
        description: "Coordinate rollout, monitor performance, and optimize in real-time for maximum impact.",
      },
    ],
    outcomes: [
      "Increased brand awareness and recall metrics",
      "Higher engagement rates across channels",
      "Improved conversion and ROI performance",
      "Memorable brand experiences that drive loyalty",
    ],
    relatedServices: ["brand-regulatory", "media-production"],
    faqs: [
      {
        question: "What channels do you work with?",
        answer:
          "We plan and create for all channels including digital (social, display, search), traditional (TV, radio, print), out-of-home (billboards, transit), and experiential (events, activations).",
      },
      {
        question: "How do you measure campaign success?",
        answer:
          "Success metrics are defined upfront based on your objectives. We track awareness (reach, impressions), engagement (clicks, interactions), and conversion (leads, sales) with regular reporting.",
      },
      {
        question: "Can you run the full campaign or just creative?",
        answer:
          "We can handle complete campaigns from strategy through execution, or partner on specific elements. We're flexible to meet your needs.",
      },
    ],
  },
  "brand-consultancy": {
    title: "Brand Consultancy",
    description:
      "Strategic advisory for brand transformation, expansion, and market opportunities with clarity and confidence.",
    hero: {
      tagline: "Strategic guidance for brand growth",
      overview:
        "Every brand faces crossroads—moments where strategic clarity and expert guidance matter most. We provide advisory services that help you navigate transformation, expansion, and market opportunities with confidence.",
    },
    whatWeDo: [
      {
        title: "Brand Health Assessments",
        description: "Evaluate current brand equity, positioning, and performance across markets and touchpoints.",
      },
      {
        title: "Market & Competitive Analysis",
        description: "Deep research into market trends, competitor strategies, and emerging opportunities for growth.",
      },
      {
        title: "Strategic Positioning",
        description: "Develop or refine positioning strategy to capitalize on market opportunities and differentiate.",
      },
      {
        title: "Executive Advisory",
        description: "Ongoing strategic guidance and advisory support for brand leadership and decision-making.",
      },
    ],
    deliverables: [
      "Brand health assessment and equity analysis",
      "Market research and competitive intelligence",
      "Strategic positioning recommendations",
      "Brand portfolio optimization strategy",
      "Go-to-market plans for new initiatives",
      "Executive advisory and guidance",
      "Crisis communication planning",
      "Brand evolution and roadmap planning",
    ],
    process: [
      {
        step: "Assessment",
        description: "Comprehensive analysis of current brand, market position, and competitive landscape.",
      },
      {
        step: "Research & Insight",
        description: "Deep research into market trends, consumer behavior, and strategic opportunities.",
      },
      {
        step: "Strategic Recommendations",
        description: "Develop strategic recommendations aligned with business objectives and market reality.",
      },
      {
        step: "Implementation & Support",
        description: "Support implementation of recommendations and provide ongoing strategic guidance.",
      },
    ],
    outcomes: [
      "Clear strategic direction for brand growth",
      "Market-aligned positioning and strategy",
      "Identified opportunities for expansion",
      "Confident leadership decision-making",
    ],
    relatedServices: ["brand-regulatory", "advertising"],
    faqs: [
      {
        question: "When do you need brand consultancy?",
        answer:
          "Brand consultancy is valuable during transformation, expansion into new markets, product line extensions, competitive pressures, or when strategic clarity is needed for major decisions.",
      },
      {
        question: "How is this different from a rebrand?",
        answer:
          "Consultancy provides strategic guidance and analysis; rebranding involves executing a new identity. Often consultancy informs rebrand decisions, but they're distinct services.",
      },
      {
        question: "Can you help with crisis communication?",
        answer:
          "Yes, we develop crisis communication plans and provide guidance on protecting brand reputation during challenging situations.",
      },
    ],
  },
  "print-media": {
    title: "Print & Media Production",
    description:
      "Premium print production and visual content that brings your brand to life across physical and digital touchpoints.",
    hero: {
      tagline: "Crafting tangible brand experiences",
      overview:
        "In a digital world, physical brand touchpoints create lasting impressions. Our print and production studio delivers exceptional quality across all applications—from packaging to environmental graphics.",
    },
    whatWeDo: [
      {
        title: "Packaging Design",
        description: "Create packaging that protects, presents, and promotes your products on shelf and online.",
      },
      {
        title: "Print Collateral",
        description:
          "Business cards, brochures, presentations, and marketing materials that represent your brand with excellence.",
      },
      {
        title: "Environmental Graphics",
        description: "Signage, wayfinding, and large-format graphics that bring physical spaces to life.",
      },
      {
        title: "Production Management",
        description:
          "End-to-end production management ensuring quality standards and on-time delivery of all materials.",
      },
    ],
    deliverables: [
      "Packaging design and production coordination",
      "Marketing collateral and print materials",
      "Signage and environmental graphics",
      "Brand photography and visual content",
      "Production files and printing specifications",
      "Vendor management and quality control",
      "Fulfillment and delivery coordination",
      "Asset organization and inventory management",
    ],
    process: [
      {
        step: "Brief & Specifications",
        description: "Define requirements, quantities, specifications, and timelines for production.",
      },
      {
        step: "Design & Approval",
        description: "Create print-ready designs with attention to production details and quality standards.",
      },
      {
        step: "Production & QC",
        description: "Manage printing and production with quality oversight and proofs at each stage.",
      },
      {
        step: "Delivery & Fulfillment",
        description: "Coordinate delivery, installation, and inventory management as needed.",
      },
    ],
    outcomes: [
      "High-quality print materials that impress",
      "Consistent brand representation across materials",
      "Efficient production processes and timelines",
      "Cost-effective solutions without quality compromise",
    ],
    relatedServices: ["brand-regulatory", "event-management"],
    faqs: [
      {
        question: "What print services do you offer?",
        answer:
          "We offer comprehensive services including packaging, collateral, large-format printing, signage, and specialty printing. We work with trusted partners to deliver highest quality.",
      },
      {
        question: "Can you manage the entire production?",
        answer:
          "Yes, we handle complete production management from design through delivery, including vendor coordination, quality control, and fulfillment.",
      },
      {
        question: "What file formats do you require?",
        answer:
          "We work with all standard formats (PDF, AI, PSD, etc.) and provide detailed specifications for printing. We ensure files meet print production requirements.",
      },
    ],
  },
  "event-management": {
    title: "Event & Experience Design",
    description:
      "Unforgettable brand experiences that engage audiences, create memorable moments, and amplify brand message.",
    hero: {
      tagline: "Experiences that create lasting connections",
      overview:
        "Events and experiences create powerful brand moments that digital cannot replicate. We design and produce events that engage audiences, generate buzz, and leave lasting impressions.",
    },
    whatWeDo: [
      {
        title: "Event Concept",
        description:
          "Develop creative concepts that align with your brand strategy and resonate deeply with attendees.",
      },
      {
        title: "Spatial Design",
        description: "Design event spaces that tell your brand story and create immersive, memorable experiences.",
      },
      {
        title: "Production & Execution",
        description: "Manage all aspects of event production from fabrication to technology integration.",
      },
      {
        title: "On-Site Management",
        description: "Coordinate all on-site operations to ensure flawless execution and attendee experience.",
      },
    ],
    deliverables: [
      "Event strategy and creative concept",
      "Spatial design and architectural renderings",
      "Production planning and fabrication",
      "Technology and AV integration plans",
      "Branding and activation elements",
      "On-site event management and coordination",
      "Post-event analysis and documentation",
      "Photography and social media coverage",
    ],
    process: [
      {
        step: "Concept & Strategy",
        description: "Develop event concept and experience design that aligns with brand objectives.",
      },
      {
        step: "Design & Planning",
        description: "Create detailed spatial designs, production plans, and logistics.",
      },
      {
        step: "Fabrication & Preparation",
        description: "Fabricate and prepare all event elements with quality oversight.",
      },
      {
        step: "Execution & Management",
        description: "Manage on-site setup, event flow, and operations for seamless execution.",
      },
    ],
    outcomes: [
      "Memorable brand experiences that resonate",
      "Strong attendee engagement and participation",
      "Social media buzz and earned coverage",
      "Measurable event success and ROI",
    ],
    relatedServices: ["media-production", "advertising"],
    faqs: [
      {
        question: "What types of events do you produce?",
        answer:
          "We produce all types including product launches, brand activations, conferences, trade shows, retail experiences, corporate events, and experiential campaigns.",
      },
      {
        question: "Do you handle all logistics and coordination?",
        answer:
          "Yes, we manage complete event execution including venue coordination, vendor management, setup, on-site operations, and breakdown.",
      },
      {
        question: "Can you incorporate technology?",
        answer:
          "Absolutely. We integrate AV, interactive displays, lighting, sound, and other technologies to enhance the experience.",
      },
    ],
  },
  "media-production": {
    title: "Film & Content Production",
    description:
      "Cinematic brand stories and compelling content that engage audiences across all platforms with professional quality.",
    hero: {
      tagline: "Stories that engage and inspire",
      overview:
        "Video content is essential for modern brand communication. Our production services create compelling visual stories that connect with audiences across platforms and drive engagement.",
    },
    whatWeDo: [
      {
        title: "Brand Films",
        description:
          "Create cinematic brand stories that communicate your values, vision, and unique brand positioning.",
      },
      {
        title: "Commercial Production",
        description: "Produce attention-grabbing commercials for broadcast, digital, and social media channels.",
      },
      {
        title: "Content & Social Media",
        description: "Develop platform-optimized content series for sustained social media engagement and reach.",
      },
      {
        title: "Photography & Imagery",
        description: "Capture lifestyle and product photography that elevates your brand and creates visual assets.",
      },
    ],
    deliverables: [
      "Brand films and commercials (broadcast quality)",
      "Social media content series and reels",
      "Product and lifestyle photography",
      "Animation and motion graphics",
      "Content strategy and editorial calendars",
      "Post-production and color grading",
      "Sound design and music licensing",
      "Multi-format delivery and optimization",
    ],
    process: [
      {
        step: "Strategy & Concepts",
        description: "Define content strategy, creative concepts, and distribution plan.",
      },
      {
        step: "Pre-Production",
        description: "Script development, storyboarding, shot planning, and production logistics.",
      },
      {
        step: "Production",
        description: "Professional filming or shooting with experienced crew and high-end equipment.",
      },
      {
        step: "Post-Production & Delivery",
        description: "Editing, color grading, sound design, and delivery in all required formats.",
      },
    ],
    outcomes: [
      "Engaging visual content that resonates",
      "Higher social engagement and reach",
      "Stronger brand storytelling across platforms",
      "Versatile content library for ongoing use",
    ],
    relatedServices: ["advertising", "event-management"],
    faqs: [
      {
        question: "What's included in video production?",
        answer:
          "Full production includes strategy and scripting, pre-production planning, on-location filming, post-production, color grading, sound design, and delivery in all required formats.",
      },
      {
        question: "Can you produce for social media?",
        answer:
          "Absolutely. We specialize in creating platform-optimized content for Instagram, TikTok, LinkedIn, YouTube, and other platforms.",
      },
      {
        question: "What equipment and team do you use?",
        answer:
          "We use professional cinematography equipment and work with experienced directors, cinematographers, editors, and colorists to ensure broadcast-quality output.",
      },
    ],
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = servicesData[params.slug as keyof typeof servicesData]

  if (!service) {
    return {
      title: "Service Not Found",
    }
  }

  return {
    title: `${service.title} | Copernicus`,
    description: service.description,
  }
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = servicesData[params.slug as keyof typeof servicesData]

  if (!service) {
    notFound()
  }

  const relatedServices = service.relatedServices
    .map((id) => servicesData[id as keyof typeof servicesData])
    .filter(Boolean)

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://copernicus.com" },
          { name: "Services", url: "https://copernicus.com/services" },
          { name: service.title, url: `https://copernicus.com/services/${params.slug}` },
        ]}
      />
      <ServiceSchema name={service.title} description={service.description} />
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[var(--copernicus-section-bg)]">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6">
              <Link
                href="/services"
                className="text-sm font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
                style={{ color: "var(--copernicus-orange)" }}
              >
                ← Back to Services
              </Link>
            </div>

            <div className="max-w-4xl">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-balance"
                style={{ color: "var(--copernicus-text-primary)" }}
              >
                {service.title}
              </h1>
              <p className="text-xl sm:text-2xl mb-4" style={{ color: "var(--copernicus-orange)" }}>
                {service.hero.tagline}
              </p>
              <p className="text-lg leading-relaxed max-w-3xl" style={{ color: "var(--copernicus-text-secondary)" }}>
                {service.hero.overview}
              </p>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12" style={{ color: "var(--copernicus-text-primary)" }}>
              What We Do
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.whatWeDo.map((item) => (
                <Card key={item.title} className="border-[var(--copernicus-border)] hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--copernicus-text-primary)" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--copernicus-text-secondary)" }}>
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--copernicus-section-bg)]">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12" style={{ color: "var(--copernicus-text-primary)" }}>
              Deliverables
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.deliverables.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: "var(--copernicus-orange)" }} />
                  <span className="text-base leading-relaxed" style={{ color: "var(--copernicus-text-secondary)" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12" style={{ color: "var(--copernicus-text-primary)" }}>
              Our Process
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.process.map((step, index) => (
                <div key={step.step}>
                  <div className="text-4xl font-black mb-4 opacity-10" style={{ color: "var(--copernicus-orange)" }}>
                    {step.step.split(" ")[0]}
                  </div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--copernicus-text-primary)" }}>
                    {step.step}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--copernicus-text-secondary)" }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--copernicus-section-bg)]">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-8" style={{ color: "var(--copernicus-text-primary)" }}>
                  Measurable Outcomes
                </h2>
                <ul className="space-y-6">
                  {service.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-4">
                      <div
                        className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: "var(--copernicus-orange)" }}
                      />
                      <span style={{ color: "var(--copernicus-text-secondary)" }}>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="aspect-square rounded-2xl" style={{ backgroundColor: "var(--copernicus-orange-soft)" }}>
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Project outcomes"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-4xl">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-12 text-center"
              style={{ color: "var(--copernicus-text-primary)" }}
            >
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {service.faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-[var(--copernicus-border)] rounded-lg px-6 py-4"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <span className="text-left font-semibold" style={{ color: "var(--copernicus-text-primary)" }}>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--copernicus-text-secondary)" }}>
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--copernicus-section-bg)]">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12" style={{ color: "var(--copernicus-text-primary)" }}>
                Complementary Services
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedServices.map((relatedService) => (
                  <Card key={relatedService.title} className="border-[var(--copernicus-border)]">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--copernicus-text-primary)" }}>
                        {relatedService.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--copernicus-text-secondary)" }}>
                        {relatedService.description}
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="bg-white text-[var(--copernicus-orange)] hover:bg-white/90 font-semibold px-8"
                      >
                        <Link
                          href={`/services/${Object.keys(servicesData).find((k) => servicesData[k as keyof typeof servicesData].title === relatedService.title)}`}
                        >
                          Explore Service
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--copernicus-orange)" }}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">Ready to Get Started?</h2>
            <p className="text-lg mb-12 text-white/90 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your goals and transform your brand.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-[var(--copernicus-orange)] hover:bg-white/90 font-semibold px-8"
              >
                <Link href="/contact">Start a Project</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[var(--copernicus-orange)] bg-transparent font-semibold px-8"
              >
                <Link href="/services">Explore All Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
