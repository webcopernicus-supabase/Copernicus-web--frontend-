import { createServerClient } from "@/lib/supabase/server"
import { FileText, Users, Trash2, Edit, Plus, LogIn, LogOut, UserPlus } from "lucide-react"
import { AuditLogClient } from "@/components/admin/audit-log-client"

export default async function AuditLog() {
  const supabase = await createServerClient()

  const { data: activities } = await supabase
    .from("audit_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100)

  const iconMap: Record<string, any> = {
    create: Plus,
    update: Edit,
    delete: Trash2,
    publish: FileText,
    unpublish: FileText,
    login: LogIn,
    logout: LogOut,
    invite_user: UserPlus,
    change_role: Users,
  }

  const getActionColor = (type: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (type) {
      case "pages":
      case "services":
      case "blog":
      case "case_studies":
        return "default"
      case "media":
        return "secondary"
      case "users":
        return "outline"
      case "settings":
      case "seo":
      case "redirects":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-1">Audit Log</h1>
        <p className="text-sm text-muted-foreground">Timeline of all changes made to your website</p>
      </div>

      <AuditLogClient activities={activities || []} iconMap={iconMap} getActionColor={getActionColor} />
    </div>
  )
}
