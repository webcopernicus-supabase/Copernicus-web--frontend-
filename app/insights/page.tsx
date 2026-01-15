import type { Metadata } from "next"
import InsightsClientPage from "./insights-client"

export const metadata: Metadata = {
  title: "Insights | Copernicus - Brand Strategy & Design Articles",
  description:
    "Explore articles, case studies, and perspectives on brand strategy, design, and creative excellence from the Copernicus team.",
  keywords: ["brand strategy", "design insights", "creative marketing", "branding tips"],
}

export default function InsightsPage() {
  return <InsightsClientPage />
}
