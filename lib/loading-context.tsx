"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"

type LoadingContextType = {
  isLoading: boolean
  isFirstLoad: boolean
  showLoadingColors: boolean
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  isFirstLoad: false,
  showLoadingColors: false,
})

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [showLoadingColors, setShowLoadingColors] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("copernicus-visited")

    if (!hasVisited) {
      setIsFirstLoad(true)
      setIsLoading(true)
      setShowLoadingColors(true)
      sessionStorage.setItem("copernicus-visited", "true")

      const loaderTimer = setTimeout(() => {
        setIsLoading(false)
      }, 3500)

      const colorsTimer = setTimeout(() => {
        setShowLoadingColors(false)
      }, 5500) // 3500ms loading + 2000ms delay

      return () => {
        clearTimeout(loaderTimer)
        clearTimeout(colorsTimer)
      }
    } else {
      // On subsequent navigations, skip the loader
      setIsFirstLoad(false)
      setIsLoading(false)
      setShowLoadingColors(false)
    }
  }, [])

  useEffect(() => {
    // Don't show loader on route changes after initial load
    if (!isFirstLoad) {
      setIsLoading(false)
      setShowLoadingColors(false)
    }
  }, [pathname, isFirstLoad])

  return (
    <LoadingContext.Provider value={{ isLoading, isFirstLoad, showLoadingColors }}>{children}</LoadingContext.Provider>
  )
}

export function useLoading() {
  return useContext(LoadingContext)
}
