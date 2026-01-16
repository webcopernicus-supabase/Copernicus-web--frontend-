"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { logAuditAction } from "@/lib/audit-logger"

export async function inviteUser(formData: FormData) {
  const email = formData.get("email") as string
  const role = formData.get("role") as string

  const supabase = await createServerClient()

  const { data: existingUser } = await supabase.from("profiles").select("id").eq("email", email).single()

  if (existingUser) {
    return { error: "User already exists" }
  }

  const { data: newUser, error } = await supabase
    .from("profiles")
    .insert({
      email,
      role,
      full_name: email.split("@")[0],
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  await logAuditAction("invite_user", "users", newUser?.id, email)

  revalidatePath("/admin/users")
  return { success: true }
}

export async function updateUserRole(userId: string, role: string) {
  const supabase = await createServerClient()

  const { data: user } = await supabase.from("profiles").select("email, role").eq("id", userId).single()

  const { error } = await supabase.from("profiles").update({ role }).eq("id", userId)

  if (error) {
    return { error: error.message }
  }

  await logAuditAction("change_role", "users", userId, `${user?.email}: ${user?.role} → ${role}`)

  revalidatePath("/admin/users")
  return { success: true }
}

export async function deleteUser(userId: string) {
  const supabase = await createServerClient()

  const { data: user } = await supabase.from("profiles").select("email").eq("id", userId).single()

  const { error } = await supabase.from("profiles").delete().eq("id", userId)

  if (error) {
    return { error: error.message }
  }

  await logAuditAction("delete", "users", userId, user?.email || "User")

  revalidatePath("/admin/users")
  return { success: true }
}
