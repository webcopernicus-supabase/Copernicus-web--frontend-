-- Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES
  ('brand_colors', '{"primary": "#f05a22", "secondary": "#1a1a1a", "accent": "#ff6b35"}'::jsonb),
  ('site_name', '"Copernicus"'::jsonb),
  ('site_tagline', '"Transform Your Digital Presence"'::jsonb),
  ('default_meta_description', '"Copernicus - Leading digital solutions provider"'::jsonb),
  ('social_links', '{"twitter": "", "linkedin": "", "facebook": ""}'::jsonb),
  ('contact_email', '"hello@copernicus.com"'::jsonb),
  ('maintenance_mode', 'false'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Note: First user will need to be created through Supabase Auth sign up
-- Then you can manually update their role in the profiles table to 'super_admin'
