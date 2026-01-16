import { createServerClient } from "@/lib/supabase/server"
import CaseStudiesClient from "@/components/admin/case-studies-client"

export const dynamic = "force-dynamic"

export default async function CaseStudiesPage() {
  const supabase = await createServerClient()

  const { data: caseStudies, error } = await supabase
    .from("case_studies")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching case studies:", error)
  }

  return <CaseStudiesClient initialCaseStudies={caseStudies || []} />
}
