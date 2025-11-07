-- Create travel_theme_activities junction table
CREATE TABLE IF NOT EXISTS travel_theme_activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  travel_theme_id UUID REFERENCES travel_themes(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(travel_theme_id, activity_id)
);

-- Enable RLS
ALTER TABLE travel_theme_activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access" ON travel_theme_activities FOR SELECT USING (true);
CREATE POLICY "Admin full access" ON travel_theme_activities FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);