"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createCaseStudy, updateCaseStudy } from "@/app/admin/case-studies/actions"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CaseStudyFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  caseStudy?: {
    id: string
    title: string
    slug: string
    client_name: string
    industry: string
    challenge: string
    solution: string
    results: string
    testimonial?: string
    featured_image?: string
    status: string
    seo_title?: string
    seo_description?: string
  }
  onSuccess?: () => void
}

export function CaseStudyFormDialog({ open, onOpenChange, caseStudy, onSuccess }: CaseStudyFormDialogProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: caseStudy?.title || "",
    slug: caseStudy?.slug || "",
    client_name: caseStudy?.client_name || "",
    industry: caseStudy?.industry || "",
    challenge: caseStudy?.challenge || "",
    solution: caseStudy?.solution || "",
    results: caseStudy?.results || "",
    testimonial: caseStudy?.testimonial || "",
    featured_image: caseStudy?.featured_image || "",
    status: caseStudy?.status || "draft",
    seo_title: caseStudy?.seo_title || "",
    seo_description: caseStudy?.seo_description || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (caseStudy) {
        await updateCaseStudy(caseStudy.id, formData)
        toast({
          title: "Success",
          description: "Case study updated successfully",
        })
      } else {
        await createCaseStudy(formData)
        toast({
          title: "Success",
          description: "Case study created successfully",
        })
      }
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error("Error saving case study:", error)
      toast({
        title: "Error",
        description: "Failed to save case study. Please try again.",
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{caseStudy ? "Edit Case Study" : "Create New Case Study"}</DialogTitle>
          <DialogDescription>
            {caseStudy ? "Update case study details and results." : "Add a new client success story."}
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
                placeholder="How We Helped Company X Achieve Y"
              />
            </div>

            <div>
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                placeholder="company-x-case-study"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client_name">Client Name *</Label>
                <Input
                  id="client_name"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  required
                  placeholder="Acme Corporation"
                />
              </div>

              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  required
                  placeholder="Technology, Healthcare, Finance..."
                />
              </div>
            </div>

            <div>
              <Label htmlFor="challenge">Challenge *</Label>
              <Textarea
                id="challenge"
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                required
                rows={4}
                placeholder="Describe the client's challenges and pain points..."
              />
            </div>

            <div>
              <Label htmlFor="solution">Solution *</Label>
              <Textarea
                id="solution"
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                required
                rows={5}
                placeholder="Explain how you solved the problem..."
              />
            </div>

            <div>
              <Label htmlFor="results">Results *</Label>
              <Textarea
                id="results"
                value={formData.results}
                onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                required
                rows={4}
                placeholder="Quantifiable outcomes and impact..."
              />
            </div>

            <div>
              <Label htmlFor="testimonial">Client Testimonial</Label>
              <Textarea
                id="testimonial"
                value={formData.testimonial}
                onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                rows={3}
                placeholder="Optional quote from the client..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="featured_image">Featured Image URL</Label>
                <Input
                  id="featured_image"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  placeholder="/images/case-studies/client.jpg"
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
                    value={formData.seo_title}
                    onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                    placeholder="Leave empty to use case study title"
                  />
                </div>

                <div>
                  <Label htmlFor="seo_description">SEO Description</Label>
                  <Textarea
                    id="seo_description"
                    value={formData.seo_description}
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
              {caseStudy ? "Update Case Study" : "Create Case Study"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
