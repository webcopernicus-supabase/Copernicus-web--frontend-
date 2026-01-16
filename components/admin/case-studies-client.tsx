"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2, Calendar } from "lucide-react"
import { deleteCaseStudy } from "@/app/admin/case-studies/actions"
import { useRouter } from "next/navigation"
import type { CaseStudy } from "@/lib/types/database"
import { CaseStudyFormDialog } from "./case-study-form-dialog"
import { useToast } from "@/hooks/use-toast"

export default function CaseStudiesClient({ initialCaseStudies }: { initialCaseStudies: CaseStudy[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | undefined>()
  const router = useRouter()
  const { toast } = useToast()

  const filteredCaseStudies = initialCaseStudies.filter((study) => {
    const matchesSearch =
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (study.client || "").toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || study.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this case study?")) {
      try {
        await deleteCaseStudy(id)
        toast({
          title: "Success",
          description: "Case study deleted successfully",
        })
        router.refresh()
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete case study",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Case Studies</h1>
          <p className="text-muted-foreground mt-1">Manage your client success stories and project showcases</p>
        </div>
        <Button
          onClick={() => {
            setEditingCaseStudy(undefined)
            setDialogOpen(true)
          }}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Case Study
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search case studies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Published Date</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCaseStudies.map((study) => (
              <TableRow key={study.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{study.title}</span>
                    {study.featured && (
                      <Badge variant="secondary" className="text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{study.client || "—"}</TableCell>
                <TableCell>
                  <Badge variant="outline">{study.industry || "—"}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={study.status === "published" ? "default" : "secondary"}
                    className={
                      study.status === "published" ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" : ""
                    }
                  >
                    {study.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {study.published_at ? (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(study.published_at).toLocaleDateString()}
                    </div>
                  ) : (
                    <span className="text-muted-foreground/50">—</span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">{(study.views || 0).toLocaleString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingCaseStudy(study)
                          setDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(study.id)} className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredCaseStudies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No case studies found matching your criteria.</p>
        </div>
      )}

      <CaseStudyFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        caseStudy={editingCaseStudy}
        onSuccess={() => router.refresh()}
      />
    </div>
  )
}
