import BlogClient from "@/components/admin/blog-client"
import { createServerClient } from "@/lib/supabase/server"

export default async function BlogPage() {
  const supabase = await createServerClient()

  const { data: posts, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
  }

  return <BlogClient initialPosts={posts || []} />
}
