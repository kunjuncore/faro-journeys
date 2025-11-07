# Supabase Storage Setup

## Quick Setup Instructions

1. **Go to your Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard
   - Select your project: `hvbppjgbcarkfgbyesrs`

2. **Run Storage Setup SQL**
   - Go to SQL Editor
   - Copy and paste the following SQL:

```sql
-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for the images bucket
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Admin upload access" ON storage.objects;
DROP POLICY IF EXISTS "Admin update access" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete access" ON storage.objects;

CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Admin upload access" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'images' AND 
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

CREATE POLICY "Admin update access" ON storage.objects FOR UPDATE USING (
  bucket_id = 'images' AND 
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

CREATE POLICY "Admin delete access" ON storage.objects FOR DELETE USING (
  bucket_id = 'images' AND 
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
```

3. **Click "Run"**

4. **Verify Setup**
   - Go to Storage in your Supabase dashboard
   - You should see an "images" bucket
   - The bucket should be marked as "Public"

## Troubleshooting

If you get errors:
- Make sure you're logged in as the project owner
- Ensure the `profiles` table exists with admin users
- Check that RLS is enabled on the `profiles` table

After setup, image uploads in the admin panel should work without errors.