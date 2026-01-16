"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { logAuditAction } from "@/lib/audit-logger"

export async function deleteCaseStudy(id: string) {
  const supabase = await createServerClient()

  const { data: caseStudy } = await supabase.from("case_studies").select("title").eq("id", id).single()

  const { error } = await supabase.from("case_studies").delete().eq("id", id)

  if (error) {
    console.error("Error deleting case study:", error)
    throw new Error("Failed to delete case study")
  }

  await logAuditAction("delete", "case_studies", id, caseStudy?.title || "Case study")

  revalidatePath("/admin/case-studies")
}

export async function createCaseStudy(data: {
  title: string
  slug: string
  client_name: string
  industry: string
  challenge: string
  solution: string
  results: string
  testimonial?: string
  featured_image?: string
  status: string
  seo_title?: string
  seo_description?: string
}) {
  const supabase = await createServerClient()

  const { data: newCaseStudy, error } = await supabase
    .from("case_studies")
    .insert([
      {
        title: data.title,
        slug: data.slug,
        client: data.client_name,
        industry: data.industry,
        content: [
          { type: "challenge", content: data.challenge },
          { type: "solution", content: data.solution },
        ],
        results: { text: data.results, testimonial: data.testimonial },
        featured_image: data.featured_image,
        status: data.status,
        meta_title: data.seo_title,
        meta_description: data.seo_description,
        seo_score: 0,
        featured: false,
        views: 0,
        published_at: data.status === "published" ? new Date().toISOString() : null,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("Error creating case study:", error)
    throw new Error("Failed to create case study")
  }

  await logAuditAction("create", "case_studies", newCaseStudy?.id, data.title)

  revalidatePath("/admin/case-studies")
}

export async function updateCaseStudy(
  id: string,
  data: {
    title: string
    slug: string
    client_name: string
    industry: string
    challenge: string
    solution: string
    results: string
    testimonial?: string
    featured_image?: string
    status: string
    seo_title?: string
    seo_description?: string
  },
) {
  const supabase = await createServerClient()

  const { error } = await supabase
    .from("case_studies")
    .update({
      title: data.title,
      slug: data.slug,
      client: data.client_name,
      industry: data.industry,
      content: [
        { type: "challenge", content: data.challenge },
        { type: "solution", content: data.solution },
      ],
      results: { text: data.results, testimonial: data.testimonial },
      featured_image: data.featured_image,
      status: data.status,
      meta_title: data.seo_title,
      meta_description: data.seo_description,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating case study:", error)
    throw new Error("Failed to update case study")
  }

  await logAuditAction("update", "case_studies", id, data.title)

  revalidatePath("/admin/case-studies")
  revalidatePath(`/admin/case-studies/${id}/edit`)
}
