import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { PageLoader } from "@/components/page-loader"
import { LoadingProvider } from "@/lib/loading-context"
import { LocalBusinessSchema } from "@/lib/schema"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

// Use the same font for headings to keep it clean + avoid big typography jumps
const interHeading = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Copernicus - Premium Brand & Creative Agency Dubai",
    template: "%s | Copernicus",
  },
  description:
    "Full-service brand and creative agency in Dubai specializing in brand strategy, identity design, advertising campaigns, event management, and content production. 500+ projects delivered. 98% client satisfaction.",
  keywords: [
    "brand agency Dubai",
    "creative agency UAE",
    "brand strategy",
    "branding agency",
    "advertising agency",
    "brand identity design",
    "events management",
    "content production",
    "marketing agency Dubai",
    "design agency",
  ],
  authors: [{ name: "Copernicus" }],
  creator: "Copernicus",
  publisher: "Copernicus",
  formatDetection: { email: false, telephone: false, address: false },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Copernicus",
    title: "Copernicus - Premium Brand & Creative Agency Dubai",
    description:
      "Full-service brand and creative agency specializing in brand strategy, identity design, advertising campaigns, and content production.",
    url: "https://copernicus.com",
    images: [
      {
        url: "https://copernicus.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Copernicus - Premium Brand & Creative Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Copernicus - Premium Brand & Creative Agency Dubai",
    description:
      "Full-service brand and creative agency specializing in brand strategy, identity design, and advertising campaigns.",
    images: ["https://copernicus.com/og-image.png"],
    creator: "@CopernicusHQ",
  },
  icons: {
    icon: "/copernicus-icon.svg",
    apple: "/copernicus-icon.svg",
    other: [{ rel: "apple-touch-icon", url: "/copernicus-icon.svg" }],
  },
  manifest: "/site.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Copernicus" },
  category: "business",
  classification: "Branding Agency",
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F97316" },
    { media: "(prefers-color-scheme: dark)", color: "#F97316" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${interHeading.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://cdn.vercel-analytics.com" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Copernicus" />
        <meta name="application-name" content="Copernicus" />
        <meta name="msapplication-TileColor" content="#F97316" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
      </head>
      <body className="font-sans antialiased">
        <LoadingProvider>
          <PageLoader />
          <LocalBusinessSchema />
          {children}
        </LoadingProvider>
        <Analytics />
      </body>
    </html>
  )
}

