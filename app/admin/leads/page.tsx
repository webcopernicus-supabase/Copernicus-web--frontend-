import { createServerClient } from "@/lib/supabase/server"
import LeadsClient from "@/components/admin/leads-client"

export const dynamic = "force-dynamic"

export default async function LeadsPage() {
  const supabase = await createServerClient()

  const { data: leads, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching leads:", error)
  }

  return <LeadsClient leads={leads || []} />
}
