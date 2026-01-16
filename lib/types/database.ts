export type UserRole = "super_admin" | "admin" | "editor" | "viewer"

export type ContentStatus = "draft" | "published" | "scheduled" | "archived"

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Page {
  id: string
  title: string
  slug: string
  status: ContentStatus
  template: string
  content: any[]
  meta_title: string | null
  meta_description: string | null
  og_image: string | null
  seo_score: number
  scheduled_at: string | null
  published_at: string | null
  author_id: string | null
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  title: string
  slug: string
  status: ContentStatus
  icon: string | null
  description: string | null
  content: string | any[]
  featured: boolean
  meta_title: string | null
  meta_description: string | null
  seo_score: number
  author_id: string | null
  created_at: string
  updated_at: string
}

export interface CaseStudy {
  id: string
  title: string
  slug: string
  status: ContentStatus
  client: string | null
  client_name?: string | null
  industry: string | null
  featured_image: string | null
  excerpt: string | null
  content: any[]
  results: any
  meta_title: string | null
  meta_description: string | null
  featured: boolean
  views: number
  published_at: string | null
  seo_score: number
  author_id: string | null
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  status: ContentStatus
  category: string | null
  tags: string[]
  featured_image: string | null
  excerpt: string | null
  content: any[]
  author: string | null
  featured: boolean
  views: number
  seo_score: number
  read_time: number | null
  scheduled_at: string | null
  published_at: string | null
  author_id: string | null
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  message: string | null
  service: string | null
  notes: Array<{ text: string; date: string }> | null
  source: string
  status: "new" | "contacted" | "qualified" | "converted" | "closed"
  assigned_to: string | null
  created_at: string
  updated_at: string
}

export interface Media {
  id: string
  filename: string
  original_filename: string
  file_path: string
  file_type: string
  file_size: number
  mime_type: string
  url: string
  width: number | null
  height: number | null
  alt_text: string | null
  caption: string | null
  folder: string
  uploaded_by: string | null
  created_at: string
}

export interface Redirect {
  id: string
  source_path: string
  destination_path: string
  redirect_type: "301" | "302" | "307" | "308"
  hit_count: number
  is_active: boolean
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface AuditLog {
  id: string
  user_id: string | null
  action: string
  entity_type: string
  entity_id: string | null
  changes: any
  ip_address: string | null
  user_agent: string | null
  created_at: string
}

export interface SiteSettings {
  id: string
  site_name: string
  site_tagline: string
  contact_email: string
  primary_color: string
  secondary_color: string
  accent_color: string
  heading_font: string
  body_font: string
  navigation: NavItem[]
  footer_text: string
  show_social_links: boolean
  announcement_banner_enabled: boolean
  announcement_banner_text: string
  seo_title: string
  seo_description: string
  seo_og_image: string
  enable_sitemap: boolean
  robots_txt: string
  new_lead_notifications: boolean
  weekly_reports: boolean
  seo_alerts: boolean
  created_at: string
  updated_at: string
}

export interface NavItem {
  label: string
  url: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Profile, "id" | "created_at">>
      }
      pages: {
        Row: Page
        Insert: Omit<Page, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Page, "id" | "created_at">>
      }
      services: {
        Row: Service
        Insert: Omit<Service, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Service, "id" | "created_at">>
      }
      case_studies: {
        Row: CaseStudy
        Insert: Omit<CaseStudy, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<CaseStudy, "id" | "created_at">>
      }
      blog_posts: {
        Row: BlogPost
        Insert: Omit<BlogPost, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<BlogPost, "id" | "created_at">>
      }
      leads: {
        Row: Lead
        Insert: Omit<Lead, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Lead, "id" | "created_at">>
      }
      media: {
        Row: Media
        Insert: Omit<Media, "id" | "created_at">
        Update: Partial<Omit<Media, "id" | "created_at">>
      }
      redirects: {
        Row: Redirect
        Insert: Omit<Redirect, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Redirect, "id" | "created_at">>
      }
      audit_logs: {
        Row: AuditLog
        Insert: Omit<AuditLog, "id" | "created_at">
        Update: never
      }
      site_settings: {
        Row: SiteSettings
        Insert: Omit<SiteSettings, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<SiteSettings, "id" | "created_at">>
      }
    }
  }
}
