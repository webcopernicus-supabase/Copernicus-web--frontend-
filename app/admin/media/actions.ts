"use server"

import { revalidatePath } from "next/cache"
import { createServerClient } from "@/lib/supabase/server"
import { logAuditAction } from "@/lib/audit-logger"

export async function uploadMedia(formData: FormData) {
  const supabase = await createServerClient()

  const file = formData.get("file") as File
  const folder = (formData.get("folder") as string) || "uncategorized"
  const altText = (formData.get("altText") as string) || ""

  if (!file) {
    return { error: "No file provided" }
  }

  const fileExt = file.name.split(".").pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const filePath = `${folder}/${fileName}`

  const { data: uploadData, error: uploadError } = await supabase.storage.from("media").upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  })

  if (uploadError) {
    return { error: uploadError.message }
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(filePath)

  const { data: newMedia, error: dbError } = await supabase
    .from("media")
    .insert({
      filename: file.name,
      original_filename: file.name,
      file_path: filePath,
      file_type: file.type,
      file_size: file.size,
      mime_type: file.type,
      alt_text: altText,
      folder: folder,
      url: publicUrl,
    })
    .select()
    .single()

  if (dbError) {
    await supabase.storage.from("media").remove([filePath])
    return { error: dbError.message }
  }

  await logAuditAction("create", "media", newMedia?.id, file.name)

  revalidatePath("/admin/media")
  return { success: true, url: publicUrl }
}

export async function deleteMedia(id: string, filePath: string) {
  const supabase = await createServerClient()

  const { data: media } = await supabase.from("media").select("filename").eq("id", id).single()

  const { error: storageError } = await supabase.storage.from("media").remove([filePath])

  if (storageError) {
    return { error: storageError.message }
  }

  const { error: dbError } = await supabase.from("media").delete().eq("id", id)

  if (dbError) {
    return { error: dbError.message }
  }

  await logAuditAction("delete", "media", id, media?.filename || "File")

  revalidatePath("/admin/media")
  return { success: true }
}

export async function updateMediaMetadata(id: string, altText: string, folder: string) {
  const supabase = await createServerClient()

  const { data: media } = await supabase.from("media").select("filename").eq("id", id).single()

  const { error } = await supabase.from("media").update({ alt_text: altText, folder: folder }).eq("id", id)

  if (error) {
    return { error: error.message }
  }

  await logAuditAction("update", "media", id, media?.filename || "File")

  revalidatePath("/admin/media")
  return { success: true }
}
