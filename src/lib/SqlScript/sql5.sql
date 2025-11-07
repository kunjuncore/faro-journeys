-- Create leads table for booking inquiries
CREATE TABLE leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  item_type TEXT CHECK (item_type IN ('destination', 'hotel', 'activity')),
  item_id UUID,
  item_name TEXT,
  item_price DECIMAL(10,2),
  total_amount DECIMAL(10,2),
  selected_items JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for better performance
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at);