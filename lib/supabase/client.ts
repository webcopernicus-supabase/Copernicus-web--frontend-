import { createBrowserClient as createClient } from "@supabase/ssr"

let client: ReturnType<typeof createClient> | null = null

export function createBrowserClient() {
  if (client) {
    return client
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[v0] Supabase environment variables not configured. Using mock client.")
    // Return a mock client that won't break the app
    return createClient("https://placeholder.supabase.co", "placeholder-anon-key")
  }

  try {
    client = createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error("[v0] Failed to create Supabase client:", error)
    // Return mock client on error
    return createClient("https://placeholder.supabase.co", "placeholder-anon-key")
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
