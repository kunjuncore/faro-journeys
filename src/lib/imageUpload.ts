import { supabase } from './supabase';

export async function uploadImage(file: File, bucket: string = 'images'): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    console.log('Attempting upload to bucket:', bucket, 'filename:', fileName);
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Upload error details:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    console.log('Upload successful:', data);
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    console.log('Public URL generated:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
}