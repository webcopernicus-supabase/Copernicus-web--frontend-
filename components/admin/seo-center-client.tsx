"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, CheckCircle2, TrendingUp, Search, FileText } from "lucide-react"
import { useState, useTransition } from "react"
import { saveSEOSettings } from "@/app/admin/seo/actions"
import { useToast } from "@/hooks/use-toast"
import type { Database } from "@/lib/types/database"

type Page = Database["public"]["Tables"]["pages"]["Row"]

interface SEOCenterClientProps {
  pages: Page[]
  seoSettings: {
    title_template: string
    separator: string
    default_description: string
    allow_indexing: boolean
    allow_follow: boolean
  }
}

function calculateSEOScore(page: Page): number {
  let score = 100
  if (!page.meta_title || page.meta_title.length < 30) score -= 20
  if (!page.meta_description || page.meta_description.length < 120) score -= 20
  if (!page.slug || page.slug === "") score -= 10
  if (page.status !== "published") score -= 10
  return Math.max(0, score)
}

export default function SEOCenterClient({ pages, seoSettings: initialSettings }: SEOCenterClientProps) {
  const [settings, setSettings] = useState(initialSettings)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const totalPages = pages.length
  const publishedPages = pages.filter((p) => p.status === "published").length
  const avgScore =
    pages.length > 0 ? Math.round(pages.reduce((sum, p) => sum + calculateSEOScore(p), 0) / pages.length) : 0

  const issuesCount = pages.filter((p) => {
    return !p.meta_title || !p.meta_description || calculateSEOScore(p) < 80
  }).length

  const seoIssues = pages
    .filter((p) => !p.meta_title || !p.meta_description || calculateSEOScore(p) < 80)
    .slice(0, 4)
    .map((page) => ({
      page: page.title,
      issue: !page.meta_title
        ? "Missing meta title"
        : !page.meta_description
          ? "Missing meta description"
          : "SEO optimization needed",
      priority: !page.meta_title || !page.meta_description ? "high" : "medium",
      impact:
        !page.meta_title || !page.meta_description ? "High - reduces visibility" : "Medium - minor improvements needed",
      pageId: page.id,
    }))

  const handleSaveSettings = () => {
    startTransition(async () => {
      try {
        await saveSEOSettings(settings)
        toast({
          title: "Success",
          description: "SEO settings saved successfully",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save SEO settings",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-1">SEO Center</h1>
        <p className="text-sm text-muted-foreground">Comprehensive SEO management and optimization tools</p>
      </div>

      {/* SEO Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Overall Score</p>
                <p className="text-3xl font-semibold text-foreground">{avgScore}</p>
              </div>
              <div className="p-2 rounded-md bg-muted text-primary">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Issues Found</p>
                <p className="text-3xl font-semibold text-foreground">{issuesCount}</p>
              </div>
              <div className="p-2 rounded-md bg-muted text-destructive">
                <AlertCircle className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pages Optimized</p>
                <p className="text-3xl font-semibold text-foreground">{publishedPages}</p>
              </div>
              <div className="p-2 rounded-md bg-muted text-chart-4">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Pages</p>
                <p className="text-3xl font-semibold text-foreground">{totalPages}</p>
              </div>
              <div className="p-2 rounded-md bg-muted text-chart-2">
                <FileText className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SEO Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Issues & Recommendations</CardTitle>
            <CardDescription>SEO problems that need attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {seoIssues.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No SEO issues found. Great job!</p>
            ) : (
              seoIssues.map((item, i) => (
                <div key={i} className="p-4 rounded-md bg-muted/50 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertCircle
                          className={`h-4 w-4 ${item.priority === "high" ? "text-destructive" : "text-primary"}`}
                        />
                        <span className="font-medium text-sm">{item.page}</span>
                      </div>
                      <p className="text-sm text-foreground">{item.issue}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.impact}</p>
                    </div>
                    <Badge variant={item.priority === "high" ? "destructive" : "default"} className="text-xs">
                      {item.priority}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => (window.location.href = `/admin/pages/${item.pageId}/edit`)}
                  >
                    Fix Issue
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Page SEO Scores */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Page SEO Analysis</CardTitle>
            <CardDescription>SEO performance by page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pages.slice(0, 4).map((page, i) => {
              const score = calculateSEOScore(page)
              return (
                <div key={i} className="p-4 rounded-md bg-muted/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{page.title}</span>
                    <Badge
                      variant={score >= 90 ? "default" : score >= 75 ? "secondary" : "destructive"}
                      className="text-xs"
                    >
                      Score: {score}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">SEO Score</span>
                      <span className="text-foreground font-medium">{score}%</span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                  {page.meta_description && (
                    <div className="flex items-center gap-2">
                      <Search className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground line-clamp-1">{page.meta_description}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Global SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Global SEO Settings</CardTitle>
          <CardDescription>Default settings applied across the site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Default Meta Title Template</Label>
              <Input
                value={settings.title_template}
                onChange={(e) => setSettings({ ...settings, title_template: e.target.value })}
                className="bg-input"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Separator</Label>
              <Input
                value={settings.separator}
                onChange={(e) => setSettings({ ...settings, separator: e.target.value })}
                className="bg-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Default Meta Description</Label>
            <Textarea
              value={settings.default_description}
              onChange={(e) => setSettings({ ...settings, default_description: e.target.value })}
              className="bg-input"
              rows={2}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Robots & Crawling</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Allow search engines to index site</Label>
                  <p className="text-xs text-muted-foreground mt-1">Controls robots meta tag</p>
                </div>
                <Switch
                  checked={settings.allow_indexing}
                  onCheckedChange={(checked) => setSettings({ ...settings, allow_indexing: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Allow search engines to follow links</Label>
                  <p className="text-xs text-muted-foreground mt-1">Controls nofollow directive</p>
                </div>
                <Switch
                  checked={settings.allow_follow}
                  onCheckedChange={(checked) => setSettings({ ...settings, allow_follow: checked })}
                />
              </div>
            </div>
          </div>

          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleSaveSettings}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save SEO Settings"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
