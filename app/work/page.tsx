import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BreadcrumbSchema } from "@/lib/schema"
import { WorkClientPage } from "./work-client"

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore Copernicus portfolio of brand strategy, identity systems, advertising campaigns, events, and content production projects across diverse industries.",
}

export default function WorkPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://copernicus.com" },
          { name: "Work", url: "https://copernicus.com/work" },
        ]}
      />
      <Header />
      <WorkClientPage />
      <Footer />
    </>
  )
}
