"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createPage, updatePage } from "@/app/admin/pages/actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import type { Database } from "@/lib/types/database"

type Page = Database["public"]["Tables"]["pages"]["Row"]

interface PageFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  page?: Page | null
}

export function PageFormDialog({ open, onOpenChange, page }: PageFormDialogProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: page?.title || "",
    slug: page?.slug || "",
    status: page?.status || "draft",
    metaTitle: page?.meta_title || "",
    metaDescription: page?.meta_description || "",
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: page ? prev.slug : generateSlug(title),
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = new FormData()
    form.append("title", formData.title)
    form.append("slug", formData.slug)
    form.append("status", formData.status)
    form.append("metaTitle", formData.metaTitle)
    form.append("metaDescription", formData.metaDescription)

    startTransition(async () => {
      const result = page ? await updatePage(page.id, form) : await createPage(form)

      if (result.success) {
        toast({
          title: page ? "Page updated" : "Page created",
          description: page ? "The page has been updated successfully." : "The page has been created successfully.",
        })
        onOpenChange(false)
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.error || "Something went wrong",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{page ? "Edit Page" : "Create New Page"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="About Us"
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="about-us"
                required
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
              >
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

            <div>
              <Label htmlFor="metaTitle">SEO Title</Label>
              <Input
                id="metaTitle"
                value={formData.metaTitle}
                onChange={(e) => setFormData((prev) => ({ ...prev, metaTitle: e.target.value }))}
                placeholder="About Us | Copernicus"
              />
            </div>

            <div>
              <Label htmlFor="metaDescription">SEO Description</Label>
              <Textarea
                id="metaDescription"
                value={formData.metaDescription}
                onChange={(e) => setFormData((prev) => ({ ...prev, metaDescription: e.target.value }))}
                placeholder="Learn more about our company and mission..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : page ? "Update Page" : "Create Page"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
