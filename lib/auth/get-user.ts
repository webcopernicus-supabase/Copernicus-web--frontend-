import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function getUser() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin")
  }

  // Get user profile with role
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile || !["super_admin", "admin", "editor", "viewer"].includes(profile.role)) {
    redirect("/admin")
  }

  return { user, profile }
}

export async function requireRole(allowedRoles: string[]) {
  const { profile } = await getUser()

  if (!allowedRoles.includes(profile.role)) {
    redirect("/admin/dashboard")
  }

  return profile
}
