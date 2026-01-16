"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Mail, MoreHorizontal, Shield, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { inviteUser, updateUserRole, deleteUser } from "@/app/admin/users/actions"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"

interface User {
  id: string
  full_name: string | null
  email: string
  role: string
  created_at: string
  last_sign_in_at?: string | null
}

export function UsersClient({ users }: { users: User[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [inviteOpen, setInviteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { toast } = useToast()

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const roleColors: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
    super_admin: "default",
    admin: "secondary",
    editor: "outline",
    viewer: "secondary",
  }

  const roleCounts = {
    super_admin: users.filter((u) => u.role === "super_admin").length,
    admin: users.filter((u) => u.role === "admin").length,
    editor: users.filter((u) => u.role === "editor").length,
    viewer: users.filter((u) => u.role === "viewer").length,
  }

  async function handleInvite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await inviteUser(formData)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "User invited successfully",
      })
      setInviteOpen(false)
    }
  }

  async function handleRoleChange(userId: string, newRole: string) {
    const result = await updateUserRole(userId, newRole)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Role updated successfully",
      })
      setEditOpen(false)
    }
  }

  async function handleDelete(userId: string) {
    if (!confirm("Are you sure you want to remove this user?")) return

    const result = await deleteUser(userId)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "User removed successfully",
      })
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-1">Users & Roles</h1>
          <p className="text-sm text-muted-foreground">Manage team members and their permissions</p>
        </div>
        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Invite User
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>Invite New User</DialogTitle>
              <DialogDescription>Send an invitation to join your team</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInvite} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Email Address</Label>
                <Input type="email" name="email" placeholder="user@example.com" className="bg-input" required />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Role</Label>
                <Select name="role" defaultValue="editor">
                  <SelectTrigger className="bg-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setInviteOpen(false)} className="bg-transparent">
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Invitation
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Roles Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            role: "Super Admin",
            description: "Full access to all features",
            icon: Shield,
            count: roleCounts.super_admin,
          },
          {
            role: "Admin",
            description: "Manage content and users",
            icon: Shield,
            count: roleCounts.admin,
          },
          {
            role: "Editor",
            description: "Edit content and media",
            icon: Edit,
            count: roleCounts.editor,
          },
          {
            role: "Viewer",
            description: "Read-only access",
            icon: Search,
            count: roleCounts.viewer,
          },
        ].map((item) => (
          <Card key={item.role}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-md bg-muted">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-2xl font-semibold text-foreground">{item.count}</span>
              </div>
              <h3 className="font-medium text-sm text-foreground mb-1">{item.role}</h3>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-40 bg-input">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium">
                        {(user.full_name || user.email)
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <span className="font-medium">{user.full_name || user.email.split("@")[0]}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={roleColors[user.role] || "outline"} className="text-xs capitalize">
                      {user.role.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.last_sign_in_at
                      ? formatDistanceToNow(new Date(user.last_sign_in_at), { addSuffix: true })
                      : "Never"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedUser(user)
                            setEditOpen(true)
                          }}
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(user.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Role Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>Update the role for {selectedUser?.email}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Role</Label>
              <Select
                defaultValue={selectedUser?.role}
                onValueChange={(value) => {
                  if (selectedUser) {
                    handleRoleChange(selectedUser.id, value)
                  }
                }}
              >
                <SelectTrigger className="bg-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Permissions Matrix */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Role Permissions</h2>
          <p className="text-sm text-muted-foreground">Overview of what each role can do</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Permission</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Super Admin</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Admin</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Editor</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Viewer</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { permission: "View Dashboard", roles: [true, true, true, true] },
                  { permission: "Edit Pages", roles: [true, true, true, false] },
                  { permission: "Publish Pages", roles: [true, true, false, false] },
                  { permission: "Manage Users", roles: [true, true, false, false] },
                  { permission: "Manage Settings", roles: [true, false, false, false] },
                  { permission: "View Analytics", roles: [true, true, true, true] },
                  { permission: "Manage Media", roles: [true, true, true, false] },
                  { permission: "Manage SEO", roles: [true, true, true, false] },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-3 px-4 text-foreground">{row.permission}</td>
                    {row.roles.map((has, j) => (
                      <td key={j} className="py-3 px-4 text-center">
                        {has ? (
                          <div className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          </div>
                        ) : (
                          <div className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted">
                            <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
