"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { AuditLog } from "@/lib/types/database"

interface AuditLogClientProps {
  activities: AuditLog[]
  iconMap: Record<string, any>
  getActionColor: (type: string) => "default" | "secondary" | "outline" | "destructive"
}

export function AuditLogClient({ activities, iconMap, getActionColor }: AuditLogClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch =
        searchQuery === "" ||
        activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.entity_type.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType = filterType === "all" || activity.entity_type === filterType

      return matchesSearch && matchesType
    })
  }, [searchQuery, filterType, activities])

  return (
    <Card>
      <CardHeader className="border-b border-border">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48 bg-input">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="pages">Pages</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="blog">Blog</SelectItem>
              <SelectItem value="case_studies">Case Studies</SelectItem>
              <SelectItem value="media">Media</SelectItem>
              <SelectItem value="users">Users</SelectItem>
              <SelectItem value="settings">Settings</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => {
              const Icon = iconMap[activity.action] || iconMap.update
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="mt-1">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div className="flex-1">
                        <p className="text-sm text-foreground">
                          <span className="text-muted-foreground">{activity.action}</span>{" "}
                          <span className="font-medium">{activity.entity_type}</span>
                        </p>
                      </div>
                      <Badge variant={getActionColor(activity.entity_type)} className="text-xs">
                        {activity.entity_type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-center text-muted-foreground py-8">No activities found matching your filters</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
