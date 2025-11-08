import { supabase } from "./supabase";

export interface UploadResult {
  url: string;
  path: string;
}

export async function uploadImage(file: File, bucket: string = 'travel-images'): Promise<UploadResult> {
  // Validate file
  if (file.size > 2 * 1024 * 1024) {
    throw new Error('File size must be less than 2MB');
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Only JPG, PNG, and WebP formats are allowed');
  }

  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  
  // Upload to Supabase
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, { upsert: true });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return {
    url: publicUrl,
    path: data.path
  };
}

export async function deleteImage(path: string, bucket: string = 'travel-images'): Promise<void> {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) {
    console.error('Failed to delete image:', error);
  }
}

export function validateImageUrl(url: string): boolean {
  if (!url) return false;
  
  // Check for common image extensions
  const imageExtensions = /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i;
  if (imageExtensions.test(url)) return true;
  
  // Allow popular image hosting services
  const allowedDomains = ['unsplash.com', 'pexels.com', 'pixabay.com', 'images.unsplash.com'];
  return allowedDomains.some(domain => url.includes(domain));
}