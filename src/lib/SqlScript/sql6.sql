-- Drop table if exists and recreate
DROP TABLE IF EXISTS leads;

-- Create simple leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  item_type TEXT,
  item_id TEXT,
  item_name TEXT,
  item_price NUMERIC,
  total_amount NUMERIC,
  selected_items TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);