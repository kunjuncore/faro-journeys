-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  category TEXT DEFAULT 'general',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);