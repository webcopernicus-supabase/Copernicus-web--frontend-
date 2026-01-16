import { createServerClient } from "@/lib/supabase/server"
import { UsersClient } from "@/components/admin/users-client"

export default async function UsersManager() {
  const supabase = await createServerClient()

  const { data: users } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  return (
    <div className="p-8 space-y-6">
      <UsersClient users={users || []} />
    </div>
  )
}
