"use client"

import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  LayoutDashboard,
  FileText,
  ImageIcon,
  Mail,
  SearchIcon,
  BarChart3,
  ArrowLeftRight,
  Settings,
  Users,
  ClipboardList,
  Bell,
  ChevronDown,
  LogOut,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import type React from "react"
import { Suspense, useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [signingOut, setSigningOut] = useState(false)

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      const supabase = createBrowserClient()
      await supabase.auth.signOut()
      router.push("/admin")
      router.refresh()
    } catch (error) {
      console.error("Sign out error:", error)
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSigningOut(false)
    }
  }

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    {
      name: "Content",
      icon: FileText,
      children: [
        { name: "Pages", href: "/admin/pages" },
        { name: "Services", href: "/admin/services" },
        { name: "Case Studies", href: "/admin/case-studies" },
        { name: "Blog", href: "/admin/blog" },
      ],
    },
    { name: "Media Library", href: "/admin/media", icon: ImageIcon },
    { name: "Leads", href: "/admin/leads", icon: Mail },
    { name: "SEO Center", href: "/admin/seo", icon: BarChart3 },
    { name: "Redirects", href: "/admin/redirects", icon: ArrowLeftRight },
    { name: "Settings", href: "/admin/settings", icon: Settings },
    { name: "Users & Roles", href: "/admin/users", icon: Users },
    { name: "Audit Log", href: "/admin/audit-log", icon: ClipboardList },
  ]

  return (
    <Suspense>
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
          <div className="p-6 border-b border-sidebar-border">
            <Image src="/copernicus-logo-white.svg" alt="Copernicus" width={140} height={32} className="h-8 w-auto" />
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navigation.map((item) => {
              if ("children" in item) {
                return (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center px-3 py-2 text-sm font-medium text-sidebar-foreground/70">
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.name}
                    </div>
                    <div className="ml-8 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                            pathname.startsWith(child.href)
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === item.href
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  }`}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <div className="flex items-center flex-1 max-w-xl">
              <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search pages, content, media..." className="pl-10 bg-input" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button size="sm" variant="ghost" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs">
                  3
                </Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium">
                      SA
                    </div>
                    <span className="text-sm">Super Admin</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                  <DropdownMenuItem>Preferences</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} disabled={signingOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {signingOut ? "Signing out..." : "Sign Out"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </Suspense>
  )
}
