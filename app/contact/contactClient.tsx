"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MessageSquare, Phone } from "lucide-react"
import { BreadcrumbSchema } from "@/lib/schema"

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Drop us a line anytime",
    action: "hello@copernicus.com",
    href: "mailto:hello@copernicus.com",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    description: "Quick response guaranteed",
    action: "Chat with us",
    href: "https://wa.me/",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Mon-Fri, 9AM-6PM",
    action: "+971 XX XXX XXXX",
    href: "tel:+971",
  },
]

export function ContactClientPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://copernicus.com" },
          { name: "Contact", url: "https://copernicus.com/contact" },
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
                Let's Start a Conversation
              </h1>
              <p className="text-xl sm:text-2xl leading-relaxed" style={{ color: "var(--copernicus-text-secondary)" }}>
                Whether you have a project in mind or just want to explore possibilities, we're here to help. Reach out
                and let's create something extraordinary together.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method) => {
                const Icon = method.icon
                return (
                  <Card
                    key={method.title}
                    className="border-[var(--copernicus-border)] hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-8 text-center">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: "var(--copernicus-orange-soft)" }}
                      >
                        <Icon className="w-7 h-7" style={{ color: "var(--copernicus-orange)" }} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--copernicus-text-primary)" }}>
                        {method.title}
                      </h3>
                      <p className="text-sm mb-4" style={{ color: "var(--copernicus-text-secondary)" }}>
                        {method.description}
                      </p>
                      <Link
                        href={method.href}
                        className="text-sm font-semibold hover:underline"
                        style={{ color: "var(--copernicus-orange)" }}
                      >
                        {method.action}
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--copernicus-text-primary)" }}>
                Send Us a Message
              </h2>
              <p className="text-lg" style={{ color: "var(--copernicus-text-secondary)" }}>
                Tell us about your project and we'll get back to you within 24 hours.
              </p>
            </div>

            <Card className="border-[var(--copernicus-border)]">
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@company.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Your Company" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service Interest</Label>
                    <select
                      id="service"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select a service</option>
                      <option value="brand-strategy">Brand Strategy & Identity Systems</option>
                      <option value="advertising">Advertising & Brand Activations</option>
                      <option value="brand-governance">Brand Governance & Compliance</option>
                      <option value="print-production">Print & Production Studio</option>
                      <option value="events">Events & Experiences</option>
                      <option value="film-content">Film & Content Production</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project, goals, and timeline..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full font-semibold"
                    style={{
                      backgroundColor: "var(--copernicus-orange)",
                      color: "white",
                    }}
                  >
                    Send Message
                  </Button>

                  <p className="text-sm text-center" style={{ color: "var(--copernicus-text-secondary)" }}>
                    We typically respond within 24 hours. For urgent inquiries, please{" "}
                    <Link href="https://wa.me/" className="font-semibold" style={{ color: "var(--copernicus-orange)" }}>
                      WhatsApp us
                    </Link>
                    .
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Snippet */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--copernicus-section-bg)]">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: "var(--copernicus-text-primary)" }}>
              Have Questions?
            </h2>
            <p className="text-lg mb-8" style={{ color: "var(--copernicus-text-secondary)" }}>
              Check out our frequently asked questions for quick answers about our services, process, and pricing.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-semibold px-8 border-[var(--copernicus-border)] hover:border-[var(--copernicus-orange)] hover:bg-[var(--copernicus-orange-soft)] bg-transparent"
            >
              <Link href="/services#faqs">View FAQs</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
