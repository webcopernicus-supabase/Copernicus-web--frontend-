"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Search, Trash2, Edit } from "lucide-react"
import { createRedirect, updateRedirect, deleteRedirect, toggleRedirect } from "@/app/admin/redirects/actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import type { Database } from "@/lib/types/database"

type Redirect = Database["public"]["Tables"]["redirects"]["Row"]

interface RedirectsClientProps {
  initialRedirects: Redirect[]
  stats: { total: number; permanent: number; temporary: number }
}

export function RedirectsClient({ initialRedirects, stats }: RedirectsClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRedirect, setEditingRedirect] = useState<Redirect | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    type: "301" as "301" | "302" | "307" | "308",
    active: true,
  })

  const filteredRedirects = initialRedirects.filter((redirect) => {
    const matchesSearch =
      redirect.source_path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      redirect.destination_path.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || redirect.redirect_type === typeFilter
    return matchesSearch && matchesType
  })

  const handleOpenDialog = (redirect?: Redirect) => {
    if (redirect) {
      setEditingRedirect(redirect)
      setFormData({
        source: redirect.source_path,
        destination: redirect.destination_path,
        type: redirect.redirect_type as "301" | "302" | "307" | "308",
        active: redirect.is_active,
      })
    } else {
      setEditingRedirect(null)
      setFormData({ source: "", destination: "", type: "301", active: true })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      if (editingRedirect) {
        await updateRedirect(editingRedirect.id, formData)
        toast({ title: "Redirect updated successfully" })
      } else {
        await createRedirect(formData)
        toast({ title: "Redirect created successfully" })
      }
      setIsDialogOpen(false)
      router.refresh()
    } catch (error) {
      toast({ title: "Error saving redirect", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this redirect?")) return

    try {
      await deleteRedirect(id)
      toast({ title: "Redirect deleted successfully" })
      router.refresh()
    } catch (error) {
      toast({ title: "Error deleting redirect", variant: "destructive" })
    }
  }

  const handleToggle = async (id: string) => {
    try {
      await toggleRedirect(id)
      router.refresh()
    } catch (error) {
      toast({ title: "Error toggling redirect", variant: "destructive" })
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-1">Redirects</h1>
          <p className="text-sm text-muted-foreground">Manage 301 and 302 redirects for your website</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Redirect
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Redirects", value: stats.total },
          { label: "301 Permanent", value: stats.permanent },
          { label: "302 Temporary", value: stats.temporary },
          { label: "Conflicts", value: 0 },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl font-semibold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Redirects Table */}
      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search redirects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40 bg-input">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="301">301 Only</SelectItem>
                <SelectItem value="302">302 Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Hits</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRedirects.map((redirect) => (
                <TableRow key={redirect.id}>
                  <TableCell className="font-mono text-sm">{redirect.source_path}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{redirect.destination_path}</TableCell>
                  <TableCell>
                    <Badge
                      variant={redirect.redirect_type === "301" ? "default" : "secondary"}
                      className="text-xs font-mono"
                    >
                      {redirect.redirect_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{redirect.hit_count}</TableCell>
                  <TableCell>
                    <Badge
                      variant={redirect.is_active ? "outline" : "secondary"}
                      className="text-xs cursor-pointer"
                      onClick={() => handleToggle(redirect.id)}
                    >
                      {redirect.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(redirect.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleOpenDialog(redirect)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(redirect.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingRedirect ? "Edit Redirect" : "Create New Redirect"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>From (Old URL)</Label>
              <Input
                placeholder="/old-page"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>To (New URL)</Label>
              <Input
                placeholder="/new-page"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Redirect Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "301" | "302" | "307" | "308") => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="301">301 Permanent</SelectItem>
                  <SelectItem value="302">302 Temporary</SelectItem>
                  <SelectItem value="307">307 Temporary (Preserve Method)</SelectItem>
                  <SelectItem value="308">308 Permanent (Preserve Method)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Saving..." : editingRedirect ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
