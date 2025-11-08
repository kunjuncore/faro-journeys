-- Supabase Storage Setup for Image Management
-- Run these commands in your Supabase SQL Editor

-- 1. First, create the storage bucket manually in Supabase Dashboard:
--    Go to Storage > Create Bucket > Name: "travel-images" > Public: Yes

-- 2. Then run these RLS policies:

-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'travel-images' 
  AND auth.role() = 'authenticated'
);

-- Allow public access to view files
CREATE POLICY "Allow public access" ON storage.objects
FOR SELECT USING (bucket_id = 'travel-images');

-- Allow authenticated users to delete their uploads
CREATE POLICY "Allow authenticated deletes" ON storage.objects
FOR DELETE USING (
  bucket_id = 'travel-images' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update files
CREATE POLICY "Allow authenticated updates" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'travel-images' 
  AND auth.role() = 'authenticated'
);