"use client"

import { useState, useTransition } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Copy, Edit, Search, Trash, Plus } from "lucide-react"
import Link from "next/link"
import { PageFormDialog } from "./page-form-dialog"
import { deletePage, duplicatePage } from "@/app/admin/pages/actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import type { Database } from "@/lib/types/database"

type Page = Database["public"]["Tables"]["pages"]["Row"]

export function PagesClient({ pages }: { pages: Page[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [editingPage, setEditingPage] = useState<Page | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { toast } = useToast()

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreate = () => {
    setEditingPage(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (page: Page) => {
    setEditingPage(page)
    setIsDialogOpen(true)
  }

  const handleDuplicate = (pageId: string) => {
    startTransition(async () => {
      const result = await duplicatePage(pageId)
      if (result.success) {
        toast({
          title: "Page duplicated",
          description: "The page has been duplicated successfully.",
        })
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to duplicate page",
          variant: "destructive",
        })
      }
    })
  }

  const handleDelete = (pageId: string, pageTitle: string) => {
    if (confirm(`Are you sure you want to delete "${pageTitle}"? This action cannot be undone.`)) {
      startTransition(async () => {
        const result = await deletePage(pageId)
        if (result.success) {
          toast({
            title: "Page deleted",
            description: "The page has been deleted successfully.",
          })
          router.refresh()
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to delete page",
            variant: "destructive",
          })
        }
      })
    }
  }

  const getStatusColor = (status: string): "default" | "secondary" | "outline" => {
    switch (status) {
      case "published":
        return "default"
      case "draft":
        return "secondary"
      case "scheduled":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getSeoScoreColor = (score: number) => {
    if (score >= 90) return "text-chart-4"
    if (score >= 75) return "text-primary"
    return "text-destructive"
  }

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
    <>
      <div className="flex items-center justify-between mb-6">
        <Button onClick={handleCreate} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Page
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input type="checkbox" className="rounded border-border" />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SEO Score</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPages && filteredPages.length > 0 ? (
                filteredPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell>
                      <input type="checkbox" className="rounded border-border" />
                    </TableCell>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{page.slug}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(page.status)} className="text-xs capitalize">
                        {page.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              page.seo_score >= 90
                                ? "bg-chart-4"
                                : page.seo_score >= 75
                                  ? "bg-primary"
                                  : "bg-destructive"
                            }`}
                            style={{ width: `${page.seo_score}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${getSeoScoreColor(page.seo_score)}`}>
                          {page.seo_score}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatTimeAgo(page.updated_at)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={isPending}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(page)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/pages/${page.id}/edit`} className="flex items-center cursor-pointer">
                              <Eye className="h-4 w-4 mr-2" />
                              Edit Content
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(page.id)} disabled={isPending}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(page.id, page.title)}
                            disabled={isPending}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No pages found. Create your first page!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <PageFormDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) setEditingPage(null)
        }}
        page={editingPage}
      />
    </>
  )
}
