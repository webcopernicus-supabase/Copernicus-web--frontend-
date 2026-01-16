import { createServerClient as createClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[v0] Supabase environment variables not configured. Using mock client.")
    const cookieStore = await cookies()
    // Return a mock client that won't break the app
    return createClient("https://placeholder.supabase.co", "placeholder-anon-key", {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // Ignore cookie setting errors
          }
        },
      },
    })
  }

  const cookieStore = await cookies()

  return createClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}

// Keep backwards compatibility
export async function getSupabaseServerClient() {
  return createServerClient()
}
