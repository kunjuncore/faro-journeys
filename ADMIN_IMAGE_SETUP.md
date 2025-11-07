# Admin Image Upload Setup Guide

## Supabase Storage Setup

To enable image uploads in the admin panel, you need to set up Supabase Storage:

### 1. Run the Storage Setup SQL

Execute the SQL script in your Supabase SQL editor:
```sql
-- Run the contents of src/lib/SqlScript/storage_setup.sql
```

### 2. Verify Storage Bucket

1. Go to your Supabase dashboard
2. Navigate to Storage
3. Confirm the 'images' bucket exists and is public

### 3. Test Image Upload

1. Login to admin panel at `/admin/login`
2. Go to any section (Destinations, Hotels, Activities, Travel Themes)
3. Create or edit an item
4. Upload an image using the file input
5. Verify the image appears in the table after saving

## Troubleshooting

### If uploads fail:
1. Check browser console for errors
2. Verify Supabase environment variables in `.env`
3. Ensure admin user has proper permissions
4. Check Supabase Storage policies are correctly set

### If images don't appear:
1. Verify the image URL is saved in the database
2. Check if the Supabase storage bucket is public
3. Test the image URL directly in browser

## Features Added

- ✅ Image upload for Destinations
- ✅ Image upload for Hotels  
- ✅ Image upload for Activities/Experiences
- ✅ Image upload for Travel Themes
- ✅ File selection feedback
- ✅ Error handling for failed uploads
- ✅ Fallback to URL input if upload fails