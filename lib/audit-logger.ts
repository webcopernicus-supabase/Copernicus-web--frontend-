"use server"

import { createServerClient } from "@/lib/supabase/server"

export type AuditAction =
  | "create"
  | "update"
  | "delete"
  | "publish"
  | "unpublish"
  | "login"
  | "logout"
  | "invite_user"
  | "change_role"

export async function logAuditAction(
  action: AuditAction,
  entityType: string,
  entityId?: string | null,
  changes?: Record<string, unknown>,
) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from("audit_logs").insert({
      user_id: user.id,
      action,
      entity_type: entityType,
      entity_id: entityId || null,
      changes: changes || {},
      ip_address: null,
      user_agent: null,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("[v0] Audit log error:", errorMessage)
  }
}
