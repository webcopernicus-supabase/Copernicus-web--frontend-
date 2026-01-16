-- Add missing fields to existing tables

-- Add missing fields to case_studies table
ALTER TABLE case_studies
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS seo_score INTEGER DEFAULT 0;

-- Add missing fields to blog_posts table  
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS author TEXT,
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

-- Add missing fields to leads table
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS service TEXT,
ADD COLUMN IF NOT EXISTS notes JSONB DEFAULT '[]'::jsonb;

-- Add missing fields to services table
ALTER TABLE services
ADD COLUMN IF NOT EXISTS seo_score INTEGER DEFAULT 0;

-- Add missing fields to pages table
ALTER TABLE pages
ADD COLUMN IF NOT EXISTS seo_score INTEGER DEFAULT 0;

-- Add missing fields to media table
ALTER TABLE media
ADD COLUMN IF NOT EXISTS url TEXT,
ADD COLUMN IF NOT EXISTS original_filename TEXT,
ADD COLUMN IF NOT EXISTS mime_type TEXT;

-- Update existing media records to set url from file_path
UPDATE media SET url = file_path WHERE url IS NULL;
UPDATE media SET original_filename = filename WHERE original_filename IS NULL;
UPDATE media SET mime_type = file_type WHERE mime_type IS NULL;
