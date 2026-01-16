import { createServerClient } from "@/lib/supabase/server"
import { getUser } from "@/lib/auth/get-user"
import { PagesClient } from "@/components/admin/pages-client"

export const dynamic = "force-dynamic"

export default async function PagesManager() {
  await getUser()
  const supabase = await createServerClient()

  const { data: pages } = await supabase.from("pages").select("*").order("updated_at", { ascending: false })

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-1">Pages</h1>
          <p className="text-sm text-muted-foreground">Manage all pages on your website</p>
        </div>
      </div>

      <PagesClient pages={pages || []} />
    </div>
  )
}
