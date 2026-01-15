import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BreadcrumbSchema } from "@/lib/schema"
import { CounterAnimation } from "@/components/counter-animation"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Copernicus is a premium brand and creative agency with over 15 years of experience crafting compelling brand experiences across strategy, design, and production.",
}

const values = [
  {
    title: "Strategic Rigor",
    description:
      "We believe great work starts with deep understanding. Every project begins with thorough research and strategic thinking.",
  },
  {
    title: "Creative Excellence",
    description: "Beautiful work that performs. We marry aesthetic sophistication with commercial effectiveness.",
  },
  {
    title: "Collaborative Partnership",
    description: "Your success is our success. We work as an extension of your team, not just a vendor.",
  },
  {
    title: "Flawless Execution",
    description: "From concept to delivery, we obsess over every detail to ensure perfect execution.",
  },
]

const stats = [
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 12, suffix: "+", label: "Global Markets" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
]

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://copernicus.com" },
          { name: "About", url: "https://copernicus.com/about" },
        ]}
      />
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[var(--copernicus-section-bg)]">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 text-balance"
                style={{ color: "var(--copernicus-text-primary)" }}
              >
                We Build Brands That Matter
              </h1>
              <p className="text-xl sm:text-2xl leading-relaxed" style={{ color: "var(--copernicus-text-secondary)" }}>
                Copernicus is a premium brand and creative agency dedicated to crafting compelling experiences that
                resonate, endure, and drive real business impact.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8" style={{ color: "var(--copernicus-text-primary)" }}>
              Our Story
            </h2>
            <div className="space-y-6 text-lg leading-relaxed" style={{ color: "var(--copernicus-text-secondary)" }}>
              <p>
                Founded over 15 years ago, Copernicus began with a simple belief: brands are more than logos and
                taglines. They're living systems that need strategic thinking, creative excellence, and meticulous
                execution to thrive.
              </p>
              <p>
                Today, we're a full-service agency with deep expertise across brand strategy, identity systems,
                advertising, events, and content production. We've worked with brands across retail, F&B, corporate
                services, real estate, and lifestyle sectors in over 12 markets worldwide.
              </p>
              <p>
                What sets us apart is our integrated approach. We don't just hand off strategy to execution teams. Our
                strategists, designers, and producers work together from day one, ensuring consistency, quality, and
                impact at every stage.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--copernicus-section-bg)]">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <CounterAnimation
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={2500}
                    className="text-4xl sm:text-5xl font-black mb-2"
                    style={{ color: "var(--copernicus-orange)" }}
                  />
                  <div className="text-sm font-medium" style={{ color: "var(--copernicus-text-secondary)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--copernicus-text-primary)" }}>
                Our Values
              </h2>
              <p className="text-lg" style={{ color: "var(--copernicus-text-secondary)" }}>
                The principles that guide every project and partnership.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value) => (
                <Card key={value.title} className="border-[var(--copernicus-border)]">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-4" style={{ color: "var(--copernicus-text-primary)" }}>
                      {value.title}
                    </h3>
                    <p className="leading-relaxed" style={{ color: "var(--copernicus-text-secondary)" }}>
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--copernicus-section-bg)]">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl" style={{ backgroundColor: "var(--copernicus-orange-soft)" }}>
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Copernicus team"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: "var(--copernicus-text-primary)" }}>
                  A Multidisciplinary Team
                </h2>
                <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--copernicus-text-secondary)" }}>
                  Our team brings together brand strategists, creative directors, designers, copywriters, producers, and
                  technologists—all working in close collaboration to deliver exceptional results.
                </p>
                <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--copernicus-text-secondary)" }}>
                  We're passionate about what we do, curious about your industry, and committed to your success. Every
                  project is an opportunity to push boundaries and create work we're proud of.
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
                  <Link href="/gallery">Life at Copernicus</Link>
                </Button>
              </div>
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
              Whether you're building a new brand from scratch or refreshing an established one, we're here to help you
              achieve your vision.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
              <Button
                asChild
                size="lg"
                variant="outline"
                className="font-semibold px-8 border-[var(--copernicus-border)] bg-transparent"
              >
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
