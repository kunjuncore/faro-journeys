import { supabase } from './supabase';

export async function checkStorageSetup() {
  try {
    // Test actual upload capability instead of just listing buckets
    const testBlob = new Blob(['test'], { type: 'text/plain' });
    const testFile = new File([testBlob], 'test.txt', { type: 'text/plain' });
    
    const { error } = await supabase.storage
      .from('images')
      .upload('test-connection.txt', testFile, { upsert: true });
    
    if (error && error.message.includes('Bucket not found')) {
      console.warn('⚠️ Storage bucket "images" not found.');
      return false;
    }
    
    // Clean up test file
    await supabase.storage.from('images').remove(['test-connection.txt']);
    
    console.log('✅ Storage bucket "images" is configured');
    return true;
  } catch (error) {
    console.error('Storage check error:', error);
    return false;
  }
}

// Check storage setup on import
checkStorageSetup();