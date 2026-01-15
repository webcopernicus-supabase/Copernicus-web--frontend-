"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useLoading } from "@/lib/loading-context"

const navigation = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Gallery", href: "/gallery" },
  { name: "Insights", href: "/insights" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkBackground, setIsDarkBackground] = useState(false)
  const pathname = usePathname()
  const { showLoadingColors } = useLoading()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const heroSection = document.querySelector('section[class*="bg-[#0b0b0b]"]')
      const eventsSection = document.querySelector('section[class*="bg-black"]')
      const testimonialsSection = document.querySelector('section[class*="bg-[var(--copernicus-text-primary)]"]')

      if (heroSection || eventsSection || testimonialsSection) {
        const headerHeight = 80
        const scrollPos = window.scrollY

        const isOverDark =
          (heroSection && scrollPos < heroSection.getBoundingClientRect().bottom + scrollPos) ||
          (eventsSection &&
            scrollPos >= eventsSection.getBoundingClientRect().top + scrollPos - headerHeight &&
            scrollPos < eventsSection.getBoundingClientRect().bottom + scrollPos) ||
          (testimonialsSection &&
            scrollPos >= testimonialsSection.getBoundingClientRect().top + scrollPos - headerHeight &&
            scrollPos < testimonialsSection.getBoundingClientRect().bottom + scrollPos)

        setIsDarkBackground(isOverDark)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const textColor = showLoadingColors || isDarkBackground ? "white" : "var(--copernicus-text-secondary)"
  const activeTextColor = showLoadingColors || isDarkBackground ? "white" : "var(--copernicus-orange)"

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center group">
            <Image
              src={showLoadingColors || isDarkBackground ? "/copernicus-logo-white.svg" : "/copernicus-logo-orange.svg"}
              alt="Copernicus"
              width={130}
              height={54}
              className="transition-all duration-1000 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold transition-all duration-300 hover:text-[var(--copernicus-orange)] relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--copernicus-orange)] after:transition-transform after:duration-300 ${
                  isActive(item.href) ? "after:scale-x-100" : "after:scale-x-0"
                } hover:after:scale-x-100`}
                style={{
                  color: isActive(item.href) ? activeTextColor : textColor,
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button
              asChild
              className="font-semibold transition-all duration-300"
              style={{
                backgroundColor: showLoadingColors || isDarkBackground ? "white" : "var(--copernicus-orange)",
                color: showLoadingColors || isDarkBackground ? "var(--copernicus-orange)" : "white",
              }}
            >
              <Link href="/contact">Start a Project</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6 transition-colors duration-300" style={{ color: textColor }} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80">
              <div className="flex flex-col gap-8 mt-8">
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <Image src="/copernicus-logo-orange.svg" alt="Copernicus" width={120} height={50} />
                </Link>

                <nav className="flex flex-col gap-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-semibold transition-colors hover:text-[var(--copernicus-orange)] py-2 ${
                        isActive(item.href) ? "text-[var(--copernicus-orange)]" : ""
                      }`}
                      style={{
                        color: isActive(item.href) ? "var(--copernicus-orange)" : "var(--copernicus-text-primary)",
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <Button
                  asChild
                  className="font-semibold w-full"
                  style={{
                    backgroundColor: "var(--copernicus-orange)",
                    color: "white",
                  }}
                >
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Start a Project
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
