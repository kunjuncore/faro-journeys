// Manual Supabase Storage Setup Required:
// 1. Go to Supabase Dashboard > Storage
// 2. Create bucket 'travel-images' (public)
// 3. Add RLS policies in SQL Editor:

/*
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'travel-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow public access" ON storage.objects
FOR SELECT USING (bucket_id = 'travel-images');

CREATE POLICY "Allow authenticated deletes" ON storage.objects
FOR DELETE USING (bucket_id = 'travel-images' AND auth.role() = 'authenticated');
*/

export const STORAGE_BUCKET = 'travel-images';