"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  GripVertical,
  ChevronDown,
  ChevronUp,
  Trash2,
  Save,
  Eye,
  Clock,
  SettingsIcon,
  BarChart3,
  History,
  ImageIcon,
  Type,
  List,
  Grid3x3,
  MessageSquare,
  Star,
  HelpCircle,
} from "lucide-react"

type SectionType = "hero" | "text" | "bullets" | "image" | "gallery" | "cta" | "testimonials" | "faq" | "stats"

interface Section {
  id: string
  type: SectionType
  title: string
  expanded: boolean
}

export default function PageEditor() {
  const [sections, setSections] = useState<Section[]>([
    { id: "1", type: "hero", title: "Hero Section", expanded: true },
    { id: "2", type: "text", title: "Text Content", expanded: false },
  ])

  const sectionIcons: Record<SectionType, any> = {
    hero: ImageIcon,
    text: Type,
    bullets: List,
    image: ImageIcon,
    gallery: Grid3x3,
    cta: MessageSquare,
    testimonials: Star,
    faq: HelpCircle,
    stats: BarChart3,
  }

  const [selectedTab, setSelectedTab] = useState("settings")

  const addSection = (type: SectionType) => {
    setSections([
      ...sections,
      {
        id: Date.now().toString(),
        type,
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
        expanded: true,
      },
    ])
  }

  const toggleSection = (id: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, expanded: !s.expanded } : s)))
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Main Editor Area */}
      <div className="flex-1 overflow-y-auto bg-background/50 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="space-y-4">
            <Input placeholder="Page Title" defaultValue="Homepage" className="text-2xl font-semibold bg-card" />
            <Input placeholder="/page-slug" defaultValue="/" className="bg-card text-muted-foreground" />
          </div>

          {/* Section Builder */}
          <div className="space-y-4">
            {sections.map((section, index) => {
              const Icon = sectionIcons[section.type]
              return (
                <Card key={section.id} className="border-2 border-border/50 hover:border-primary/30 transition-colors">
                  <div className="p-4 flex items-center gap-3 border-b border-border">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-move">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm flex-1">{section.title}</span>
                    <Badge variant="secondary" className="text-xs">
                      {section.type}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toggleSection(section.id)}>
                      {section.expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {section.expanded && (
                    <CardContent className="p-6 space-y-4">
                      {section.type === "hero" && (
                        <>
                          <div className="space-y-2">
                            <Label>Headline</Label>
                            <Input placeholder="Enter headline..." defaultValue="Welcome to Copernicus" />
                          </div>
                          <div className="space-y-2">
                            <Label>Subheadline</Label>
                            <Textarea
                              placeholder="Enter subheadline..."
                              defaultValue="We help businesses transform digitally"
                              rows={2}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Background Image</Label>
                            <Button variant="outline" className="w-full bg-transparent">
                              <ImageIcon className="h-4 w-4 mr-2" />
                              Select Image
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <Label>CTA Button Text</Label>
                            <Input placeholder="Button text..." defaultValue="Get Started" />
                          </div>
                        </>
                      )}
                      {section.type === "text" && (
                        <>
                          <div className="space-y-2">
                            <Label>Heading</Label>
                            <Input placeholder="Section heading..." />
                          </div>
                          <div className="space-y-2">
                            <Label>Content</Label>
                            <Textarea placeholder="Enter your content..." rows={6} />
                          </div>
                        </>
                      )}
                    </CardContent>
                  )}
                </Card>
              )
            })}

            {/* Add Section */}
            <Card className="border-2 border-dashed border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="grid grid-cols-4 gap-3">
                  {["hero", "text", "bullets", "image", "gallery", "cta", "testimonials", "faq"].map((type) => {
                    const Icon = sectionIcons[type as SectionType]
                    return (
                      <Button
                        key={type}
                        variant="outline"
                        className="h-auto py-4 flex-col gap-2 bg-transparent hover:bg-muted"
                        onClick={() => addSection(type as SectionType)}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-xs capitalize">{type}</span>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Right Inspector Panel */}
      <div className="w-96 border-l border-border bg-card overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Clock className="h-4 w-4" />
            </Button>
          </div>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="settings" className="text-xs">
                <SettingsIcon className="h-3 w-3 mr-1" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="seo" className="text-xs">
                <BarChart3 className="h-3 w-3 mr-1" />
                SEO
              </TabsTrigger>
              <TabsTrigger value="history" className="text-xs">
                <History className="h-3 w-3 mr-1" />
                History
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="p-6 space-y-6">
          <Tabs value={selectedTab}>
            <TabsContent value="settings" className="space-y-6 mt-0">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Page Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Published</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Featured</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Show in Navigation</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Layout</h3>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Container Width</Label>
                  <Select defaultValue="default">
                    <SelectTrigger className="bg-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="wide">Wide</SelectItem>
                      <SelectItem value="full">Full Width</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Spacing</Label>
                  <Select defaultValue="normal">
                    <SelectTrigger className="bg-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tight">Tight</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="relaxed">Relaxed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Background</h3>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Background Color</Label>
                  <Input type="color" defaultValue="#1e1e1e" className="h-10" />
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Background Image
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6 mt-0">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Search Engine Optimization</h3>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Meta Title</Label>
                  <Input
                    placeholder="Page title for search engines..."
                    defaultValue="Copernicus - Digital Transformation"
                  />
                  <p className="text-xs text-muted-foreground">48 characters</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Meta Description</Label>
                  <Textarea
                    placeholder="Page description..."
                    rows={3}
                    defaultValue="Transform your business with our digital solutions"
                  />
                  <p className="text-xs text-muted-foreground">52 characters</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Focus Keyword</Label>
                  <Input placeholder="Primary keyword..." defaultValue="digital transformation" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Open Graph</h3>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">OG Image</Label>
                  <Button variant="outline" className="w-full bg-transparent">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Select Image
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Advanced</h3>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Canonical URL</Label>
                  <Input placeholder="https://..." />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Index Page</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Follow Links</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4 mt-0">
              <h3 className="text-sm font-semibold text-foreground">Version History</h3>
              {[
                { version: "Current", date: "Just now", user: "Super Admin" },
                { version: "v1.3", date: "2 hours ago", user: "Super Admin" },
                { version: "v1.2", date: "1 day ago", user: "Editor" },
                { version: "v1.1", date: "3 days ago", user: "Super Admin" },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-md bg-muted/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.version}</span>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      Restore
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {item.date} by {item.user}
                  </p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
