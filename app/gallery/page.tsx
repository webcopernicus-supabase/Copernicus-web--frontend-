import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { BreadcrumbSchema } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Life at Copernicus | Company Culture & Team",
  description:
    "Get a glimpse into life at Copernicus. See our team in action, behind-the-scenes moments, and the culture that drives our creative excellence.",
}

const galleryImages = [
  {
    id: 1,
    src: "/images/img-7454.jpg",
  },
  {
    id: 2,
    src: "/images/img-8651.jpg",
  },
  {
    id: 3,
    src: "/images/img-1807.jpg",
  },
  {
    id: 4,
    src: "/images/2256e393-16c0-4a21-bcff.jpeg",
  },
  {
    id: 5,
    src: "/images/3d0aed85-0658-4a79-b50b.jpeg",
  },
  {
    id: 6,
    src: "/images/img-1805-202.jpg",
  },
  {
    id: 7,
    src: "/images/img-1819.jpg",
  },
  {
    id: 8,
    src: "/images/img-6438.jpg",
  },
  {
    id: 9,
    src: "/images/8e7642fa-3235-482e-9065.jpeg",
  },
]

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://copernicus.com" },
          { name: "Gallery", url: "https://copernicus.com/gallery" },
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
                Life at Copernicus
              </h1>
              <p
                className="text-xl sm:text-2xl leading-relaxed mb-8"
                style={{ color: "var(--copernicus-text-secondary)" }}
              >
                Behind every great project is a team of passionate people collaborating, creating, and pushing
                boundaries together. Take a look at the culture and creativity that drives everything we do.
              </p>
              <p className="text-lg" style={{ color: "var(--copernicus-orange)" }}>
                #we_are_copernicus
              </p>
            </div>
          </div>
        </section>

        {/* Culture Statement */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--copernicus-section-bg)]">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: "var(--copernicus-text-primary)" }}>
              Where Creativity Meets Collaboration
            </h2>
            <p className="text-xl leading-relaxed" style={{ color: "var(--copernicus-text-secondary)" }}>
              At Copernicus, we believe the best work happens when talented people come together in an environment that
              values curiosity, experimentation, and mutual respect. We're a diverse team united by our passion for
              creating exceptional brand experiences.
            </p>
          </div>
        </section>

        {/* Gallery Grid - Enhanced masonry layout */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {galleryImages.map((image, index) => (
                <div key={image.id} className="break-inside-avoid">
                  <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                    <Image
                      src={image.src || "/placeholder.svg?height=400&width=400"}
                      alt="Copernicus team moment"
                      width={800}
                      height={800}
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                      priority={index < 4}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--copernicus-orange)" }}>
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">What Drives Us</h2>
              <p className="text-lg max-w-2xl mx-auto text-white/90">
                The values that shape our culture and inspire our work every single day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: "01",
                  title: "Creative Excellence",
                  description:
                    "We push boundaries, challenge conventions, and never settle for good enough. Excellence is a mindset.",
                },
                {
                  number: "02",
                  title: "Collaborative Spirit",
                  description:
                    "Great ideas come from diverse perspectives working in harmony. We succeed together or not at all.",
                },
                {
                  number: "03",
                  title: "Continuous Growth",
                  description:
                    "We invest in learning, experimentation, and personal development for every single team member.",
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-colors"
                >
                  <div className="text-6xl font-black mb-6 text-white/30">{value.number}</div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{value.title}</h3>
                  <p className="text-base leading-relaxed text-white/80">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--copernicus-section-bg)]">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: "var(--copernicus-text-primary)" }}>
              Join Our Team
            </h2>
            <p className="text-lg mb-12" style={{ color: "var(--copernicus-text-secondary)" }}>
              We're always looking for talented individuals who share our passion for creating exceptional brand
              experiences. If you're ready to do the best work of your career, we'd love to hear from you.
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
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[var(--copernicus-border)] bg-transparent font-semibold px-8"
              >
                <Link href="/services">Learn About Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
