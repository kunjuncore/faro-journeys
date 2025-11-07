-- Travel Themes table
DROP TABLE IF EXISTS travel_themes CASCADE;
CREATE TABLE travel_themes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_travel_themes_featured ON travel_themes(featured);
CREATE INDEX IF NOT EXISTS idx_travel_themes_slug ON travel_themes(slug);

-- Enable RLS
ALTER TABLE travel_themes ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access" ON travel_themes FOR SELECT USING (true);
CREATE POLICY "Admin full access" ON travel_themes FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Insert sample travel themes (only if they don't exist)
INSERT INTO travel_themes (name, slug, description, image_url, featured) 
SELECT * FROM (
  VALUES 
  ('Adventure & Outdoor', 'adventure-outdoor', 'Thrilling adventures and outdoor experiences for adrenaline seekers', 'https://images.unsplash.com/photo-1551632811-561732d1e306', true),
  ('Luxury & Wellness', 'luxury-wellness', 'Premium spa retreats and luxury accommodations for ultimate relaxation', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef', true),
  ('Cultural Heritage', 'cultural-heritage', 'Explore rich history, traditions, and cultural landmarks around the world', 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e', true),
  ('Beach & Island', 'beach-island', 'Tropical paradise destinations with pristine beaches and crystal waters', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19', true),
  ('Mountain & Nature', 'mountain-nature', 'Scenic mountain ranges and natural wonders for nature enthusiasts', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', false),
  ('City & Urban', 'city-urban', 'Vibrant city experiences with modern attractions and urban culture', 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df', false)
) AS v(name, slug, description, image_url, featured)
WHERE NOT EXISTS (SELECT 1 FROM travel_themes WHERE travel_themes.slug = v.slug);