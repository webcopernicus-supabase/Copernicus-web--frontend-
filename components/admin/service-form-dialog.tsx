"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createService, updateService } from "@/app/admin/services/actions"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ServiceFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service?: {
    id: string
    title: string
    slug: string
    description: string
    content: string
    icon?: string
    status: string
    seo_title?: string
    seo_description?: string
  }
  onSuccess?: () => void
}

export function ServiceFormDialog({ open, onOpenChange, service, onSuccess }: ServiceFormDialogProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: service?.title || "",
    slug: service?.slug || "",
    description: service?.description || "",
    content: service?.content || "",
    icon: service?.icon || "Wrench",
    status: service?.status || "draft",
    seo_title: service?.seo_title || "",
    seo_description: service?.seo_description || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (service) {
        await updateService(service.id, formData)
        toast({
          title: "Success",
          description: "Service updated successfully",
        })
      } else {
        await createService(formData)
        toast({
          title: "Success",
          description: "Service created successfully",
        })
      }
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error("Error saving service:", error)
      toast({
        title: "Error",
        description: "Failed to save service. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    setFormData({ ...formData, slug })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{service ? "Edit Service" : "Create New Service"}</DialogTitle>
          <DialogDescription>
            {service ? "Update service details and content." : "Add a new service to your website."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                onBlur={generateSlug}
                required
                placeholder="AI Integration Services"
              />
            </div>

            <div>
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                placeholder="ai-integration-services"
              />
            </div>

            <div>
              <Label htmlFor="description">Short Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={2}
                placeholder="Brief overview of the service..."
              />
            </div>

            <div>
              <Label htmlFor="content">Full Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                rows={8}
                placeholder="Detailed service description, benefits, process..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="icon">Icon</Label>
                <Input
                  id="icon"
                  value={formData.icon || ""}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="Wrench"
                />
              </div>

              <div>
                <Label htmlFor="status">Status *</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3">SEO Settings</h4>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="seo_title">SEO Title</Label>
                  <Input
                    id="seo_title"
                    value={formData.seo_title || ""}
                    onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                    placeholder="Leave empty to use page title"
                  />
                </div>

                <div>
                  <Label htmlFor="seo_description">SEO Description</Label>
                  <Textarea
                    id="seo_description"
                    value={formData.seo_description || ""}
                    onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                    rows={2}
                    placeholder="Meta description for search engines..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {service ? "Update Service" : "Create Service"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
