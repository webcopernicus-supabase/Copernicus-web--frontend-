"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { logAuditAction } from "@/lib/audit-logger"

export async function deleteBlogPost(id: string) {
  const supabase = await createServerClient()

  const { data: post } = await supabase.from("blog_posts").select("title").eq("id", id).single()

  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    console.error("Error deleting blog post:", error)
    throw new Error("Failed to delete blog post")
  }

  await logAuditAction("delete", "blog", id, post?.title || "Blog post")

  revalidatePath("/admin/blog")
}

export async function createBlogPost(data: {
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  featured_image?: string
  status: string
  seo_title?: string
  seo_description?: string
}) {
  const supabase = await createServerClient()

  const { data: newPost, error } = await supabase
    .from("blog_posts")
    .insert([
      {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: [{ type: "text", content: data.content }],
        author: data.author,
        category: data.category,
        tags: data.tags,
        featured_image: data.featured_image,
        status: data.status,
        meta_title: data.seo_title,
        meta_description: data.seo_description,
        seo_score: 0,
        featured: false,
        views: 0,
        read_time: Math.ceil(data.content.split(" ").length / 200),
        published_at: data.status === "published" ? new Date().toISOString() : null,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("Error creating blog post:", error)
    throw new Error("Failed to create blog post")
  }

  await logAuditAction("create", "blog", newPost?.id, data.title)

  revalidatePath("/admin/blog")
}

export async function updateBlogPost(
  id: string,
  data: {
    title: string
    slug: string
    excerpt: string
    content: string
    author: string
    category: string
    tags: string[]
    featured_image?: string
    status: string
    seo_title?: string
    seo_description?: string
  },
) {
  const supabase = await createServerClient()

  const { error } = await supabase
    .from("blog_posts")
    .update({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: [{ type: "text", content: data.content }],
      author: data.author,
      category: data.category,
      tags: data.tags,
      featured_image: data.featured_image,
      status: data.status,
      meta_title: data.seo_title,
      meta_description: data.seo_description,
      read_time: Math.ceil(data.content.split(" ").length / 200),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating blog post:", error)
    throw new Error("Failed to update blog post")
  }

  await logAuditAction("update", "blog", id, data.title)

  revalidatePath("/admin/blog")
  revalidatePath(`/admin/blog/${id}/edit`)
}
