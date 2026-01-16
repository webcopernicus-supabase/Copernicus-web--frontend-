import { createServerClient } from "@/lib/supabase/server"
import { RedirectsClient } from "@/components/admin/redirects-client"

export default async function RedirectsPage() {
  const supabase = await createServerClient()

  // Fetch all redirects from database
  const { data: redirects, error } = await supabase
    .from("redirects")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching redirects:", error)
  }

  // Calculate stats
  const total = redirects?.length || 0
  const permanent = redirects?.filter((r) => r.redirect_type === "301").length || 0
  const temporary = redirects?.filter((r) => r.redirect_type === "302").length || 0

  return <RedirectsClient initialRedirects={redirects || []} stats={{ total, permanent, temporary }} />
}
