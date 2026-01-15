"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useLoading } from "@/lib/loading-context"

export function PageLoader() {
  const { isLoading } = useLoading()
  const [displayLoader, setDisplayLoader] = useState(isLoading)

  useEffect(() => {
    if (isLoading) {
      setDisplayLoader(true)
    } else {
      const timer = setTimeout(() => {
        setDisplayLoader(false)
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (!displayLoader) return null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        backgroundColor: "var(--copernicus-orange)",
        opacity: isLoading ? 1 : 0,
        transition: "opacity 200ms ease-out",
        pointerEvents: isLoading ? "auto" : "none",
      }}
    >
      <div className="relative w-80 h-80 flex items-center justify-center mb-16">
        {/* Center icon - larger and white */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Image
            src="/copernicus-icon-orange.svg"
            alt="Copernicus"
            width={180}
            height={180}
            className="drop-shadow-2xl"
            priority
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>

        {/* Orbital rings */}
        <div
          className="absolute w-56 h-56 border-2 border-white/30 rounded-full"
          style={
            {
              animation: "orbit 4s linear infinite",
            } as React.CSSProperties
          }
        />
        <div
          className="absolute w-64 h-64 border-2 border-white/20 standard-full"
          style={
            {
              animation: "orbit-reverse 6s linear infinite",
            } as React.CSSProperties
          }
        />
        <div
          className="absolute w-72 h-72 border-2 border-white/10 rounded-full"
          style={
            {
              animation: "orbit 8s linear infinite",
            } as React.CSSProperties
          }
        />

        {/* Animated dots on inner ring */}
        <div className="absolute w-56 h-56 rounded-full" style={{ animation: "orbit 4s linear infinite" }}>
          <div className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg" />
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-white text-3xl font-semibold mb-2">Copernicus</h2>
        <p className="text-white/70 text-sm tracking-widest uppercase">Initializing Experience</p>
      </div>
    </div>
  )
}
