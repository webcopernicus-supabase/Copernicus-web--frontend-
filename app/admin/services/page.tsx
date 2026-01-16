import { createServerClient } from "@/lib/supabase/server"
import ServicesClient from "@/components/admin/services-client"

export default async function ServicesManager() {
  const supabase = await createServerClient()

  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .order("updated_at", { ascending: false })

  if (error) {
    console.error("Error fetching services:", error)
  }

  return <ServicesClient initialServices={services || []} />
}
