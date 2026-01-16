import { createServerClient } from "@/lib/supabase/server"
import SEOCenterClient from "@/components/admin/seo-center-client"

export default async function SEOCenter() {
  const supabase = await createServerClient()

  const { data: pages } = await supabase.from("pages").select("*").order("created_at", { ascending: false })

  const { data: settingsData } = await supabase.from("site_settings").select("value").eq("key", "seo_settings").single()

  const seoSettings = settingsData?.value || {
    title_template: "%page_title% | Copernicus",
    separator: "|",
    default_description:
      "Copernicus provides digital transformation services including web development, SEO, and brand strategy.",
    allow_indexing: true,
    allow_follow: true,
  }

  return <SEOCenterClient pages={pages || []} seoSettings={seoSettings} />
}
