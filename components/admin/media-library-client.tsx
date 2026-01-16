"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Upload,
  Search,
  Grid3x3,
  List,
  Folder,
  ImageIcon,
  Film,
  FileText,
  Trash2,
  Edit,
  Copy,
  ExternalLink,
} from "lucide-react"
import { uploadMedia, deleteMedia, updateMediaMetadata } from "@/app/admin/media/actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface MediaItem {
  id: string
  filename: string
  file_path: string
  file_type: string
  file_size: number
  alt_text: string | null
  folder: string
  url: string
  created_at: string
}

interface Props {
  initialMedia: MediaItem[]
  folders: Record<string, number>
}

export function MediaLibraryClient({ initialMedia, folders }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [uploading, setUploading] = useState(false)

  const filteredMedia = initialMedia.filter((item) => {
    const matchesSearch = item.filename.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || item.file_type.startsWith(typeFilter.replace("s", ""))
    const matchesFolder = !selectedFolder || item.folder === selectedFolder
    return matchesSearch && matchesType && matchesFolder
  })

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUploading(true)

    const formData = new FormData(e.currentTarget)
    const result = await uploadMedia(formData)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "File uploaded successfully",
      })
      setUploadDialogOpen(false)
      router.refresh()
    }
    setUploading(false)
  }

  const handleDelete = async (id: string, filePath: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return

    const result = await deleteMedia(id, filePath)
    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "File deleted successfully",
      })
      router.refresh()
    }
  }

  const handleUpdateMetadata = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedItem) return

    const formData = new FormData(e.currentTarget)
    const altText = formData.get("altText") as string
    const folder = formData.get("folder") as string

    const result = await updateMediaMetadata(selectedItem.id, altText, folder)
    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Media metadata updated successfully",
      })
      setEditDialogOpen(false)
      setSelectedItem(null)
      router.refresh()
    }
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "Success",
      description: "URL copied to clipboard",
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image")) return ImageIcon
    if (type.startsWith("video")) return Film
    return FileText
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-1">Media Library</h1>
          <p className="text-sm text-muted-foreground">
            {filteredMedia.length} {filteredMedia.length === 1 ? "file" : "files"}
          </p>
        </div>
        <Button
          onClick={() => setUploadDialogOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Files
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search media..."
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
                <SelectItem value="images">Images</SelectItem>
                <SelectItem value="videos">Videos</SelectItem>
                <SelectItem value="applications">Documents</SelectItem>
              </SelectContent>
            </Select>
            {selectedFolder && (
              <Button variant="outline" onClick={() => setSelectedFolder(null)}>
                Clear Folder Filter
              </Button>
            )}
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "list")}>
              <TabsList>
                <TabsTrigger value="grid">
                  <Grid3x3 className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list">
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Folders */}
      {!selectedFolder && (
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(folders).map(([folderName, count]) => (
            <Card
              key={folderName}
              className="cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => setSelectedFolder(folderName)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                  <Folder className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm capitalize">{folderName}</p>
                  <p className="text-xs text-muted-foreground">{count} files</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Media Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-4 gap-4">
          {filteredMedia.map((item) => {
            const Icon = getFileIcon(item.file_type)
            const isImage = item.file_type.startsWith("image")

            return (
              <Card
                key={item.id}
                className="cursor-pointer hover:border-primary/50 transition-colors overflow-hidden group"
              >
                <div className="aspect-square bg-muted flex items-center justify-center relative">
                  {isImage ? (
                    <img
                      src={item.url || "/placeholder.svg"}
                      alt={item.alt_text || item.filename}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon className="h-12 w-12 text-muted-foreground" />
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="icon" variant="secondary" onClick={() => copyUrl(item.url)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" onClick={() => window.open(item.url, "_blank")}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => {
                        setSelectedItem(item)
                        setEditDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="destructive" onClick={() => handleDelete(item.id, item.file_path)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3 space-y-1">
                  <p className="text-sm font-medium truncate">{item.filename}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatFileSize(item.file_size)}</span>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {item.folder}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filteredMedia.map((item) => {
                const Icon = getFileIcon(item.file_type)
                const isImage = item.file_type.startsWith("image")

                return (
                  <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-muted/50">
                    <div className="h-12 w-12 rounded bg-muted flex items-center justify-center overflow-hidden">
                      {isImage ? (
                        <img
                          src={item.url || "/placeholder.svg"}
                          alt={item.alt_text || item.filename}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.filename}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(item.file_size)} • {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {item.folder}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => copyUrl(item.url)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedItem(item)
                          setEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(item.id, item.file_path)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <form onSubmit={handleUpload}>
            <DialogHeader>
              <DialogTitle>Upload Media</DialogTitle>
              <DialogDescription>Upload images, videos, or documents to your media library</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input id="file" name="file" type="file" required accept="image/*,video/*,application/pdf" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="folder">Folder</Label>
                <Select name="folder" defaultValue="uncategorized">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uncategorized">Uncategorized</SelectItem>
                    <SelectItem value="images">Images</SelectItem>
                    <SelectItem value="videos">Videos</SelectItem>
                    <SelectItem value="documents">Documents</SelectItem>
                    <SelectItem value="icons">Icons</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="altText">Alt Text (Optional)</Label>
                <Textarea id="altText" name="altText" placeholder="Describe the image for accessibility" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <form onSubmit={handleUpdateMetadata}>
            <DialogHeader>
              <DialogTitle>Edit Media</DialogTitle>
              <DialogDescription>Update media metadata and organization</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Filename</Label>
                <p className="text-sm">{selectedItem?.filename}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-folder">Folder</Label>
                <Select name="folder" defaultValue={selectedItem?.folder}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uncategorized">Uncategorized</SelectItem>
                    <SelectItem value="images">Images</SelectItem>
                    <SelectItem value="videos">Videos</SelectItem>
                    <SelectItem value="documents">Documents</SelectItem>
                    <SelectItem value="icons">Icons</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-altText">Alt Text</Label>
                <Textarea
                  id="edit-altText"
                  name="altText"
                  defaultValue={selectedItem?.alt_text || ""}
                  placeholder="Describe the image for accessibility"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
