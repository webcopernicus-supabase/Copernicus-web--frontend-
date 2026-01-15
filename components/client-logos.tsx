"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

const clients = [
  "/clients/cop1.svg",
  "/clients/cop2.svg",
  "/clients/cop3.svg",
  "/clients/cop4.svg",
  "/clients/cop5.svg",
  "/clients/cop6.svg",
  "/clients/cop7.svg",
  "/clients/cop8-1.svg",
  "/clients/cop9.svg", // Updated from cop9-1.svg to cop9.svg
]

export function ClientLogos() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0

    const animate = () => {
      scrollPosition += 0.5 // Scroll speed
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }
      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(animate)
    }

    // Start animation
    animationId = requestAnimationFrame(animate)

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId)
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate)
    }

    scrollContainer.addEventListener("mouseenter", handleMouseEnter)
    scrollContainer.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter)
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-12 items-center overflow-hidden"
        style={{
          scrollBehavior: "auto",
        }}
      >
        {/* First set of logos */}
        {clients.map((logo, index) => (
          <div
            key={`logo-1-${index}`}
            className="flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            <Image
              src={logo || "/placeholder.svg"}
              alt={`Client ${index + 1}`}
              width={120}
              height={60}
              className="h-12 w-auto object-contain"
            />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {clients.map((logo, index) => (
          <div
            key={`logo-2-${index}`}
            className="flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            <Image
              src={logo || "/placeholder.svg"}
              alt={`Client ${index + 1}`}
              width={120}
              height={60}
              className="h-12 w-auto object-contain"
            />
          </div>
        ))}
      </div>

      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />
    </div>
  )
}
