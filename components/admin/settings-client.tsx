"use client"

import { useState, useTransition } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette, Layout, SettingsIcon, Globe, FileCode, Plus, X } from "lucide-react"
import { updateSettings } from "@/app/admin/settings/actions"
import { useToast } from "@/hooks/use-toast"
import type { Database } from "@/lib/types/database"

type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"]

interface NavItem {
  label: string
  url: string
}

export default function SettingsClient({ initialSettings }: { initialSettings: SiteSettings | null }) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const [siteName, setSiteName] = useState(initialSettings?.site_name || "Copernicus")
  const [tagline, setTagline] = useState(initialSettings?.site_tagline || "Digital Transformation Experts")
  const [contactEmail, setContactEmail] = useState(initialSettings?.contact_email || "hello@copernicus.com")
  const [primaryColor, setPrimaryColor] = useState(initialSettings?.primary_color || "#f05a22")
  const [secondaryColor, setSecondaryColor] = useState(initialSettings?.secondary_color || "#1e1e1e")
  const [accentColor, setAccentColor] = useState(initialSettings?.accent_color || "#ffffff")
  const [headingFont, setHeadingFont] = useState(initialSettings?.heading_font || "geist")
  const [bodyFont, setBodyFont] = useState(initialSettings?.body_font || "geist")
  const [navigation, setNavigation] = useState<NavItem[]>(
    (initialSettings?.navigation as NavItem[]) || [
      { label: "Home", url: "/" },
      { label: "About", url: "/about" },
      { label: "Services", url: "/services" },
      { label: "Case Studies", url: "/case-studies" },
      { label: "Blog", url: "/blog" },
      { label: "Contact", url: "/contact" },
    ],
  )
  const [footerText, setFooterText] = useState(
    initialSettings?.footer_text || "© 2026 Copernicus. All rights reserved.",
  )
  const [showSocialLinks, setShowSocialLinks] = useState(initialSettings?.show_social_links ?? true)
  const [bannerEnabled, setBannerEnabled] = useState(initialSettings?.announcement_banner_enabled ?? false)
  const [bannerText, setBannerText] = useState(initialSettings?.announcement_banner_text || "")
  const [seoTitle, setSeoTitle] = useState(initialSettings?.seo_title || "Copernicus - Digital Transformation")
  const [seoDescription, setSeoDescription] = useState(
    initialSettings?.seo_description ||
      "We help businesses transform digitally with web development, SEO, and brand strategy.",
  )
  const [seoOgImage, setSeoOgImage] = useState(initialSettings?.seo_og_image || "https://copernicus.com/og-image.jpg")
  const [enableSitemap, setEnableSitemap] = useState(initialSettings?.enable_sitemap ?? true)
  const [robotsTxt, setRobotsTxt] = useState(
    initialSettings?.robots_txt || `User-agent: *\nAllow: /\nSitemap: https://copernicus.com/sitemap.xml`,
  )
  const [newLeadNotifications, setNewLeadNotifications] = useState(initialSettings?.new_lead_notifications ?? true)
  const [weeklyReports, setWeeklyReports] = useState(initialSettings?.weekly_reports ?? true)
  const [seoAlerts, setSeoAlerts] = useState(initialSettings?.seo_alerts ?? true)

  const addNavItem = () => {
    setNavigation([...navigation, { label: "", url: "" }])
  }

  const removeNavItem = (index: number) => {
    setNavigation(navigation.filter((_, i) => i !== index))
  }

  const updateNavItem = (index: number, field: "label" | "url", value: string) => {
    const updated = [...navigation]
    updated[index][field] = value
    setNavigation(updated)
  }

  const handleSave = () => {
    startTransition(async () => {
      const formData = new FormData()
      formData.append("site_name", siteName)
      formData.append("site_tagline", tagline)
      formData.append("contact_email", contactEmail)
      formData.append("primary_color", primaryColor)
      formData.append("secondary_color", secondaryColor)
      formData.append("accent_color", accentColor)
      formData.append("heading_font", headingFont)
      formData.append("body_font", bodyFont)
      formData.append("navigation", JSON.stringify(navigation))
      formData.append("footer_text", footerText)
      formData.append("show_social_links", showSocialLinks.toString())
      formData.append("announcement_banner_enabled", bannerEnabled.toString())
      formData.append("announcement_banner_text", bannerText)
      formData.append("seo_title", seoTitle)
      formData.append("seo_description", seoDescription)
      formData.append("seo_og_image", seoOgImage)
      formData.append("enable_sitemap", enableSitemap.toString())
      formData.append("robots_txt", robotsTxt)
      formData.append("new_lead_notifications", newLeadNotifications.toString())
      formData.append("weekly_reports", weeklyReports.toString())
      formData.append("seo_alerts", seoAlerts.toString())

      const result = await updateSettings(formData)

      if (result.success) {
        toast({ title: "Settings saved successfully" })
      } else {
        toast({ title: "Failed to save settings", description: result.error, variant: "destructive" })
      }
    })
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-1">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure global website settings and preferences</p>
      </div>

      <Tabs defaultValue="brand" className="w-full">
        <TabsList className="w-full justify-start border-b border-border rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="brand"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            <Palette className="h-4 w-4 mr-2" />
            Brand Tokens
          </TabsTrigger>
          <TabsTrigger
            value="navigation"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            <Layout className="h-4 w-4 mr-2" />
            Navigation
          </TabsTrigger>
          <TabsTrigger
            value="general"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            <SettingsIcon className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger
            value="seo"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            <Globe className="h-4 w-4 mr-2" />
            SEO Defaults
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            <FileCode className="h-4 w-4 mr-2" />
            Advanced
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="brand" className="space-y-6 mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Colors</CardTitle>
                <CardDescription>Define your brand color palette</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Primary",
                      value: primaryColor,
                      setValue: setPrimaryColor,
                      description: "Main brand color",
                    },
                    {
                      name: "Secondary",
                      value: secondaryColor,
                      setValue: setSecondaryColor,
                      description: "Supporting color",
                    },
                    { name: "Accent", value: accentColor, setValue: setAccentColor, description: "Highlight color" },
                  ].map((color) => (
                    <div key={color.name} className="space-y-2">
                      <Label className="text-sm text-muted-foreground">{color.name}</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={color.value}
                          onChange={(e) => color.setValue(e.target.value)}
                          className="h-10 w-20"
                        />
                        <Input
                          value={color.value}
                          onChange={(e) => color.setValue(e.target.value)}
                          className="flex-1 bg-input font-mono text-sm"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{color.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Typography</CardTitle>
                <CardDescription>Font families and type scale</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Heading Font</Label>
                    <Select value={headingFont} onValueChange={setHeadingFont}>
                      <SelectTrigger className="bg-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="geist">Geist</SelectItem>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Body Font</Label>
                    <Select value={bodyFont} onValueChange={setBodyFont}>
                      <SelectTrigger className="bg-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="geist">Geist</SelectItem>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="navigation" className="space-y-6 mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Header Navigation</CardTitle>
                <CardDescription>Configure main navigation menu</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {navigation.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-md bg-muted/30">
                    <div className="grid grid-cols-2 gap-3 flex-1">
                      <Input
                        value={item.label}
                        onChange={(e) => updateNavItem(i, "label", e.target.value)}
                        placeholder="Label"
                        className="bg-input"
                      />
                      <Input
                        value={item.url}
                        onChange={(e) => updateNavItem(i, "url", e.target.value)}
                        placeholder="URL"
                        className="bg-input font-mono text-sm"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeNavItem(i)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addNavItem} className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Menu Item
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Footer</CardTitle>
                <CardDescription>Footer content and links</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Footer Text</Label>
                  <Textarea
                    value={footerText}
                    onChange={(e) => setFooterText(e.target.value)}
                    className="bg-input"
                    rows={2}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">Show Social Links</Label>
                    <p className="text-xs text-muted-foreground mt-1">Display social media icons in footer</p>
                  </div>
                  <Switch checked={showSocialLinks} onCheckedChange={setShowSocialLinks} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">CTAs & Banners</CardTitle>
                <CardDescription>Global call-to-actions and announcement banners</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">Announcement Banner</Label>
                    <p className="text-xs text-muted-foreground mt-1">Show banner at top of site</p>
                  </div>
                  <Switch checked={bannerEnabled} onCheckedChange={setBannerEnabled} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Banner Text</Label>
                  <Input
                    value={bannerText}
                    onChange={(e) => setBannerText(e.target.value)}
                    placeholder="Special offer: 20% off all services!"
                    className="bg-input"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="general" className="space-y-6 mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Site Information</CardTitle>
                <CardDescription>Basic website details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Site Name</Label>
                  <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} className="bg-input" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Tagline</Label>
                  <Input value={tagline} onChange={(e) => setTagline(e.target.value)} className="bg-input" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Contact Email</Label>
                  <Input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="bg-input"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription>Email notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">New Lead Notifications</Label>
                    <p className="text-xs text-muted-foreground mt-1">Get notified when new leads submit</p>
                  </div>
                  <Switch checked={newLeadNotifications} onCheckedChange={setNewLeadNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">Weekly Reports</Label>
                    <p className="text-xs text-muted-foreground mt-1">Receive weekly analytics summary</p>
                  </div>
                  <Switch checked={weeklyReports} onCheckedChange={setWeeklyReports} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">SEO Alerts</Label>
                    <p className="text-xs text-muted-foreground mt-1">Alert when SEO issues are detected</p>
                  </div>
                  <Switch checked={seoAlerts} onCheckedChange={setSeoAlerts} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6 mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Default SEO Settings</CardTitle>
                <CardDescription>Global SEO configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Default Site Title</Label>
                  <Input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="bg-input" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Default Meta Description</Label>
                  <Textarea
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    className="bg-input"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Default OG Image URL</Label>
                  <Input
                    value={seoOgImage}
                    onChange={(e) => setSeoOgImage(e.target.value)}
                    className="bg-input font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6 mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sitemap</CardTitle>
                <CardDescription>XML sitemap configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">Enable XML Sitemap</Label>
                    <p className="text-xs text-muted-foreground mt-1">Auto-generate sitemap.xml</p>
                  </div>
                  <Switch checked={enableSitemap} onCheckedChange={setEnableSitemap} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Sitemap URL</Label>
                  <Input value="https://copernicus.com/sitemap.xml" className="bg-input font-mono text-sm" readOnly />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Robots.txt</CardTitle>
                <CardDescription>Configure robots.txt file</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Robots.txt Content</Label>
                  <Textarea
                    value={robotsTxt}
                    onChange={(e) => setRobotsTxt(e.target.value)}
                    className="bg-input font-mono text-sm"
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isPending}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isPending ? "Saving..." : "Save All Settings"}
        </Button>
      </div>
    </div>
  )
}
