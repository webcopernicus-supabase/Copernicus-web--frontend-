"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface CounterAnimationProps {
  end: number
  duration?: number
  suffix?: string
  className?: string
  style?: React.CSSProperties
}

export function CounterAnimation({ end, duration = 2000, suffix = "", className = "", style }: CounterAnimationProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = countRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)

          const startTime = Date.now()
          const endTime = startTime + duration

          const updateCount = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / duration, 1)

            // Easing function for smooth animation
            const easeOutQuad = (t: number) => t * (2 - t)
            const easedProgress = easeOutQuad(progress)

            const currentCount = Math.floor(easedProgress * end)
            setCount(currentCount)

            if (now < endTime) {
              requestAnimationFrame(updateCount)
            } else {
              setCount(end)
            }
          }

          requestAnimationFrame(updateCount)
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <div ref={countRef} className={className} style={style}>
      {count}
      {suffix}
    </div>
  )
}
