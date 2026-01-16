"use server" // Added missing "use server" directive

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { logAuditAction } from "@/lib/audit-logger"

export async function createRedirect(data: {
  source: string
  destination: string
  type: "301" | "302" | "307" | "308"
  active: boolean
}) {
  const supabase = await createServerClient()

  const { error } = await supabase.from("redirects").insert({
    source_path: data.source,
    destination_path: data.destination,
    redirect_type: data.type,
    is_active: data.active,
    hit_count: 0,
  })

  if (error) throw error

  await logAuditAction("create", "redirect", null, data)

  revalidatePath("/admin/redirects")
  return { success: true }
}

export async function updateRedirect(
  id: string,
  data: {
    source: string
    destination: string
    type: "301" | "302" | "307" | "308"
    active: boolean
  },
) {
  const supabase = await createServerClient()

  const { error } = await supabase
    .from("redirects")
    .update({
      source_path: data.source,
      destination_path: data.destination,
      redirect_type: data.type,
      is_active: data.active,
    })
    .eq("id", id)

  if (error) throw error

  await logAuditAction("update", "redirect", id, data)

  revalidatePath("/admin/redirects")
  return { success: true }
}

export async function deleteRedirect(id: string) {
  const supabase = await createServerClient()

  const { error } = await supabase.from("redirects").delete().eq("id", id)

  if (error) throw error

  await logAuditAction("delete", "redirect", id, null)

  revalidatePath("/admin/redirects")
  return { success: true }
}

export async function toggleRedirect(id: string) {
  const supabase = await createServerClient()

  const { data: redirect } = await supabase.from("redirects").select("is_active").eq("id", id).single()

  const { error } = await supabase.from("redirects").update({ is_active: !redirect?.is_active }).eq("id", id)

  if (error) throw error

  await logAuditAction("toggle", "redirect", id, { is_active: !redirect?.is_active })

  revalidatePath("/admin/redirects")
  return { success: true }
}
