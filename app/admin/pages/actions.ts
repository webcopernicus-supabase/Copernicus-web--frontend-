"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { logAuditAction } from "@/lib/audit-logger"

export async function createPage(formData: FormData) {
  const supabase = await createServerClient()

  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const status = formData.get("status") as string
  const metaTitle = formData.get("metaTitle") as string
  const metaDescription = formData.get("metaDescription") as string

  const { data: newPage, error } = await supabase
    .from("pages")
    .insert({
      title,
      slug,
      status,
      meta_title: metaTitle,
      meta_description: metaDescription,
      seo_score: 0,
      content: {},
    })
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  await logAuditAction("create", "pages", newPage?.id, title)

  revalidatePath("/admin/pages")
  return { success: true }
}

export async function updatePage(id: string, formData: FormData) {
  const supabase = await createServerClient()

  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const status = formData.get("status") as string
  const metaTitle = formData.get("metaTitle") as string
  const metaDescription = formData.get("metaDescription") as string

  const { error } = await supabase
    .from("pages")
    .update({
      title,
      slug,
      status,
      meta_title: metaTitle,
      meta_description: metaDescription,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  await logAuditAction("update", "pages", id, title)

  revalidatePath("/admin/pages")
  return { success: true }
}

export async function deletePage(id: string) {
  const supabase = await createServerClient()

  const { data: page } = await supabase.from("pages").select("title").eq("id", id).single()

  const { error } = await supabase.from("pages").delete().eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  await logAuditAction("delete", "pages", id, page?.title || "Page")

  revalidatePath("/admin/pages")
  return { success: true }
}

export async function duplicatePage(id: string) {
  const supabase = await createServerClient()

  const { data: page, error: fetchError } = await supabase.from("pages").select("*").eq("id", id).single()

  if (fetchError || !page) {
    return { success: false, error: "Page not found" }
  }

  const { data: newPage, error } = await supabase
    .from("pages")
    .insert({
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      status: "draft",
      meta_title: page.meta_title,
      meta_description: page.meta_description,
      content: page.content,
      seo_score: page.seo_score,
    })
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  await logAuditAction("create", "pages", newPage?.id, `Duplicated: ${newPage?.title}`)

  revalidatePath("/admin/pages")
  return { success: true }
}
