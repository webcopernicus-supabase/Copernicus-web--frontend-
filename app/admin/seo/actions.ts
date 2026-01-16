"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { logAuditAction } from "@/lib/audit-logger"

export async function saveSEOSettings(data: {
  title_template: string
  separator: string
  default_description: string
  allow_indexing: boolean
  allow_follow: boolean
  og_image?: string
}) {
  const supabase = await createServerClient()

  const { error } = await supabase.from("site_settings").upsert({
    key: "seo_settings",
    value: data,
    updated_at: new Date().toISOString(),
  })

  if (error) throw new Error(error.message)

  await logAuditAction("update", "settings", "seo_settings", { settings: data })

  revalidatePath("/admin/seo")
  return { success: true }
}

export async function updatePageSEO(
  pageId: string,
  data: {
    meta_title?: string
    meta_description?: string
    og_image?: string
  },
) {
  const supabase = await createServerClient()

  const { error } = await supabase
    .from("pages")
    .update({
      meta_title: data.meta_title,
      meta_description: data.meta_description,
      og_image: data.og_image,
      updated_at: new Date().toISOString(),
    })
    .eq("id", pageId)

  if (error) throw new Error(error.message)

  await logAuditAction("update", "page", pageId, { seo: data })

  revalidatePath("/admin/seo")
  revalidatePath("/admin/pages")
  return { success: true }
}
