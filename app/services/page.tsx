import type { Metadata } from "next"
import ServicesClientPage from "./services-client"

export const metadata: Metadata = {
  title: "Services | Copernicus - Brand & Creative Agency Dubai",
  description:
    "Comprehensive branding agency services including brand strategy, identity design, advertising, content production, and event management.",
}

export default function ServicesPage() {
  return <ServicesClientPage />
}
