"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { logAuditAction } from "@/lib/audit-logger"

export async function deleteService(id: string) {
  const supabase = await createServerClient()

  const { data: service } = await supabase.from("services").select("title").eq("id", id).single()

  const { error } = await supabase.from("services").delete().eq("id", id)

  if (error) {
    console.error("Error deleting service:", error)
    throw new Error("Failed to delete service")
  }

  await logAuditAction("delete", "services", id, service?.title || "Service")

  revalidatePath("/admin/services")
}

export async function duplicateService(id: string) {
  const supabase = await createServerClient()

  const { data: original, error: fetchError } = await supabase.from("services").select("*").eq("id", id).single()

  if (fetchError || !original) {
    console.error("Error fetching service:", fetchError)
    throw new Error("Failed to fetch service")
  }

  const { id: _, created_at, updated_at, ...serviceData } = original

  const { data: newService, error: insertError } = await supabase
    .from("services")
    .insert({
      ...serviceData,
      title: `${serviceData.title} (Copy)`,
      slug: `${serviceData.slug}-copy`,
      status: "draft",
    })
    .select()
    .single()

  if (insertError) {
    console.error("Error duplicating service:", insertError)
    throw new Error("Failed to duplicate service")
  }

  await logAuditAction("create", "services", newService?.id, `Duplicated: ${newService?.title}`)

  revalidatePath("/admin/services")
}

export async function createService(data: {
  title: string
  slug: string
  description: string
  content: string
  icon?: string
  status: string
  seo_title?: string
  seo_description?: string
}) {
  const supabase = await createServerClient()

  const { data: newService, error } = await supabase
    .from("services")
    .insert([
      {
        ...data,
        seo_score: 0,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("Error creating service:", error)
    throw new Error("Failed to create service")
  }

  await logAuditAction("create", "services", newService?.id, data.title)

  revalidatePath("/admin/services")
}

export async function updateService(
  id: string,
  data: {
    title: string
    slug: string
    description: string
    content: string
    icon?: string
    status: string
    seo_title?: string
    seo_description?: string
  },
) {
  const supabase = await createServerClient()

  const { error } = await supabase
    .from("services")
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating service:", error)
    throw new Error("Failed to update service")
  }

  await logAuditAction("update", "services", id, data.title)

  revalidatePath("/admin/services")
  revalidatePath(`/admin/services/${id}/edit`)
}
