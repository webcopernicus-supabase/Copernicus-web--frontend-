import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, CheckCircle2, Eye, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createServerClient } from "@/lib/supabase/server"
import { getUser } from "@/lib/auth/get-user"

export const dynamic = "force-dynamic"

export default async function Dashboard() {
  const { user, profile } = await getUser()
  const supabase = await createServerClient()

  // Fetch real statistics
  const { count: pagesCount } = await supabase.from("pages").select("*", { count: "exact", head: true })
  const { count: servicesCount } = await supabase
    .from("services")
    .select("*", { count: "exact", head: true })
    .eq("status", "published")
  const { count: leadsCount } = await supabase.from("leads").select("*", { count: "exact", head: true })

  // Fetch recent pages
  const { data: recentPages } = await supabase
    .from("pages")
    .select("id, title, status, seo_score, updated_at")
    .order("updated_at", { ascending: false })
    .limit(4)

  // Fetch recent leads
  const { data: recentLeads } = await supabase
    .from("leads")
    .select("id, name, service, status, created_at")
    .order("created_at", { ascending: false })
    .limit(3)

  // Fetch SEO issues (pages with low scores)
  const { data: seoIssues } = await supabase
    .from("pages")
    .select("id, title, seo_score")
    .lt("seo_score", 85)
    .order("seo_score", { ascending: true })
    .limit(3)

  const siteHealthStats = [
    { label: "Total Pages", value: String(pagesCount || 0), change: "+3 this week", icon: Eye, color: "text-chart-2" },
    {
      label: "Active Services",
      value: String(servicesCount || 0),
      change: "All published",
      icon: CheckCircle2,
      color: "text-chart-4",
    },
    { label: "New Leads", value: String(leadsCount || 0), change: "+8 today", icon: Users, color: "text-primary" },
    { label: "Avg. SEO Score", value: "87", change: "+5 this month", icon: TrendingUp, color: "text-chart-2" },
  ]

  const formatTimeAgo = (date: string) => {
    const now = new Date()
    const past = new Date(date)
    const diffMs = now.getTime() - past.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} min ago`
    if (diffHours < 24) return `${diffHours} hours ago`
    return `${diffDays} days ago`
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-1">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, {profile.full_name || user.email}!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {siteHealthStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </div>
                <div className={`p-2 rounded-md bg-muted ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SEO Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">SEO Tasks & Warnings</CardTitle>
            <CardDescription>Issues that need your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {seoIssues && seoIssues.length > 0 ? (
              seoIssues.map((page) => (
                <div key={page.id} className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                  <AlertCircle
                    className={`h-5 w-5 mt-0.5 ${
                      page.seo_score < 70
                        ? "text-destructive"
                        : page.seo_score < 80
                          ? "text-primary"
                          : "text-muted-foreground"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{page.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      SEO score needs improvement ({page.seo_score}/100)
                    </p>
                  </div>
                  <Badge variant={page.seo_score < 70 ? "destructive" : "secondary"} className="text-xs">
                    {page.seo_score < 70 ? "high" : "medium"}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No SEO issues found</p>
            )}
            <Button variant="outline" className="w-full bg-transparent" size="sm">
              View All SEO Issues
            </Button>
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Latest Leads</CardTitle>
            <CardDescription>New inquiries from your website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentLeads && recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium">
                    {lead.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.service}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-xs mb-1">
                      {lead.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{formatTimeAgo(lead.created_at)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No leads yet</p>
            )}
            <Button variant="outline" className="w-full bg-transparent" size="sm">
              View All Leads
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recently Edited Pages</CardTitle>
          <CardDescription>Pages you've worked on recently</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SEO Score</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPages && recentPages.length > 0 ? (
                recentPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant={page.status === "published" ? "default" : "secondary"}
                        className="text-xs capitalize"
                      >
                        {page.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${page.seo_score}%` }} />
                        </div>
                        <span className="text-sm text-muted-foreground">{page.seo_score}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatTimeAgo(page.updated_at)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No pages found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
