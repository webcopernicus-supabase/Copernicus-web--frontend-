-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name TEXT NOT NULL DEFAULT 'Copernicus',
  site_tagline TEXT DEFAULT 'Digital Transformation Experts',
  contact_email TEXT DEFAULT 'hello@copernicus.com',
  primary_color TEXT DEFAULT '#f05a22',
  secondary_color TEXT DEFAULT '#1e1e1e',
  accent_color TEXT DEFAULT '#ffffff',
  heading_font TEXT DEFAULT 'geist',
  body_font TEXT DEFAULT 'geist',
  navigation JSONB DEFAULT '[]'::jsonb,
  footer_text TEXT DEFAULT '© 2026 Copernicus. All rights reserved.',
  show_social_links BOOLEAN DEFAULT true,
  announcement_banner_enabled BOOLEAN DEFAULT false,
  announcement_banner_text TEXT DEFAULT '',
  seo_title TEXT DEFAULT 'Copernicus - Digital Transformation',
  seo_description TEXT DEFAULT 'We help businesses transform digitally.',
  seo_og_image TEXT DEFAULT '',
  enable_sitemap BOOLEAN DEFAULT true,
  robots_txt TEXT DEFAULT 'User-agent: *
Allow: /',
  new_lead_notifications BOOLEAN DEFAULT true,
  weekly_reports BOOLEAN DEFAULT true,
  seo_alerts BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (id) 
VALUES ('00000000-0000-0000-0000-000000000001')
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update settings"
  ON site_settings FOR UPDATE
  USING (auth.role() = 'authenticated');
