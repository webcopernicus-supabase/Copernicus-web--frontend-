import { createServerClient } from "@/lib/supabase/server"
import { MediaLibraryClient } from "@/components/admin/media-library-client"

export default async function MediaLibrary() {
  const supabase = await createServerClient()

  // Fetch all media from database
  const { data: mediaItems, error } = await supabase
    .from("media") // Fixed table name from "media_library" to "media" to match database schema
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching media:", error)
  }

  // Get folder stats
  const folders =
    mediaItems?.reduce(
      (acc, item) => {
        const folder = item.folder || "uncategorized"
        acc[folder] = (acc[folder] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ) || {}

  return <MediaLibraryClient initialMedia={mediaItems || []} folders={folders} />
}
