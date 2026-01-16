-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Pages policies
CREATE POLICY "Anyone can view published pages" ON public.pages
  FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert pages" ON public.pages
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authors can update own pages" ON public.pages
  FOR UPDATE USING (auth.uid() = author_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin')
  ));

CREATE POLICY "Admins can delete pages" ON public.pages
  FOR DELETE USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin')
  ));

-- Services policies
CREATE POLICY "Anyone can view published services" ON public.services
  FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage services" ON public.services
  FOR ALL USING (auth.role() = 'authenticated');

-- Case Studies policies
CREATE POLICY "Anyone can view published case studies" ON public.case_studies
  FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage case studies" ON public.case_studies
  FOR ALL USING (auth.role() = 'authenticated');

-- Blog posts policies
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts
  FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage blog posts" ON public.blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Leads policies
CREATE POLICY "Authenticated users can view leads" ON public.leads
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can insert leads" ON public.leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update leads" ON public.leads
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Media policies
CREATE POLICY "Authenticated users can view media" ON public.media
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload media" ON public.media
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete own media" ON public.media
  FOR DELETE USING (auth.uid() = uploaded_by OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin')
  ));

-- Redirects policies
CREATE POLICY "Authenticated users can manage redirects" ON public.redirects
  FOR ALL USING (auth.role() = 'authenticated');

-- SEO settings policies
CREATE POLICY "Authenticated users can manage SEO settings" ON public.seo_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- Site settings policies
CREATE POLICY "Authenticated users can view site settings" ON public.site_settings
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage site settings" ON public.site_settings
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin')
  ));

-- Audit log policies
CREATE POLICY "Authenticated users can view audit log" ON public.audit_log
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "System can insert audit log" ON public.audit_log
  FOR INSERT WITH CHECK (true);
