"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { logAuditAction } from "@/lib/audit-logger"

export async function updateLeadStatus(leadId: string, status: string) {
  const supabase = await createServerClient()

  const { error } = await supabase
    .from("leads")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", leadId)

  if (error) {
    throw new Error(error.message)
  }

  await logAuditAction("update", "leads", leadId, `Status changed to ${status}`)

  revalidatePath("/admin/leads")
  return { success: true }
}

export async function addLeadNote(leadId: string, note: string) {
  const supabase = await createServerClient()

  const { data: lead } = await supabase.from("leads").select("notes").eq("id", leadId).single()

  const notes = lead?.notes
    ? [...lead.notes, { text: note, date: new Date().toISOString() }]
    : [{ text: note, date: new Date().toISOString() }]

  const { error } = await supabase
    .from("leads")
    .update({
      notes,
      updated_at: new Date().toISOString(),
    })
    .eq("id", leadId)

  if (error) {
    throw new Error(error.message)
  }

  await logAuditAction("update", "leads", leadId, "Added note")

  revalidatePath("/admin/leads")
  return { success: true }
}

export async function deleteLead(leadId: string) {
  const supabase = await createServerClient()

  const { data: lead } = await supabase.from("leads").select("email, name").eq("id", leadId).single()

  const { error } = await supabase.from("leads").delete().eq("id", leadId)

  if (error) {
    throw new Error(error.message)
  }

  await logAuditAction("delete", "leads", leadId, `${lead?.name || lead?.email || "Lead"}`)

  revalidatePath("/admin/leads")
  return { success: true }
}
