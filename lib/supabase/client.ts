import { createBrowserClient as createClient } from "@supabase/ssr"

let client: ReturnType<typeof createClient> | null = null

export function createBrowserClient() {
  if (client) {
    return client
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[v0] Missing Supabase environment variables")
    throw new Error("Missing Supabase environment variables. Please check your Supabase integration setup.")
  }

  try {
    client = createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error("[v0] Failed to create Supabase client:", error)
    throw error
  }

  return client
}

// Keep backwards compatibility
export function getSupabaseBrowserClient() {
  return createBrowserClient()
}

export function createClientComponentClient() {
  return createBrowserClient()
}
