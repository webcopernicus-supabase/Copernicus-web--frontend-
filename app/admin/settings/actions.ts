"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getSettings() {
  const supabase = await createServerClient()

  const { data, error } = await supabase.from("site_settings").select("*").single()

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching settings:", error)
    return null
  }

  return data
}

export async function updateSettings(formData: FormData) {
  const supabase = await createServerClient()

  let navigation = []
  try {
    const navigationString = formData.get("navigation") as string
    navigation = navigationString ? JSON.parse(navigationString) : []
  } catch {
    navigation = []
  }

  const settings = {
    site_name: formData.get("site_name") as string,
    site_tagline: formData.get("site_tagline") as string,
    contact_email: formData.get("contact_email") as string,
    primary_color: formData.get("primary_color") as string,
    secondary_color: formData.get("secondary_color") as string,
    accent_color: formData.get("accent_color") as string,
    heading_font: formData.get("heading_font") as string,
    body_font: formData.get("body_font") as string,
    navigation,
    footer_text: formData.get("footer_text") as string,
    show_social_links: formData.get("show_social_links") === "true",
    announcement_banner_enabled: formData.get("announcement_banner_enabled") === "true",
    announcement_banner_text: formData.get("announcement_banner_text") as string,
    seo_title: formData.get("seo_title") as string,
    seo_description: formData.get("seo_description") as string,
    seo_og_image: formData.get("seo_og_image") as string,
    enable_sitemap: formData.get("enable_sitemap") === "true",
    robots_txt: formData.get("robots_txt") as string,
    new_lead_notifications: formData.get("new_lead_notifications") === "true",
    weekly_reports: formData.get("weekly_reports") === "true",
    seo_alerts: formData.get("seo_alerts") === "true",
  }

  const { data: existing } = await supabase.from("site_settings").select("id").maybeSingle()

  if (existing) {
    // Update existing settings
    const { error } = await supabase.from("site_settings").update(settings).eq("id", existing.id)

    if (error) {
      console.error("Error updating settings:", error)
      return { success: false, error: error.message }
    }
  } else {
    // Insert new settings
    const { error } = await supabase.from("site_settings").insert(settings)

    if (error) {
      console.error("Error creating settings:", error)
      return { success: false, error: error.message }
    }
  }

  revalidatePath("/admin/settings")
  return { success: true }
}
