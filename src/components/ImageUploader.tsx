import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, Link, X, Check } from "lucide-react";

interface ImageUploaderProps {
  entity: "destinations" | "hotels" | "activities" | "travel_themes";
  currentImageUrl?: string;
  onImageChange: (imageUrl: string) => void;
}

export default function ImageUploader({ entity, currentImageUrl = "", onImageChange }: ImageUploaderProps) {
  const [uploadMode, setUploadMode] = useState<"upload" | "url">("upload");
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState(currentImageUrl);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImageUrl = (url: string): boolean => {
    const imageExtensions = /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i;
    return imageExtensions.test(url) || url.includes('unsplash.com') || url.includes('pexels.com');
  };

  const uploadToSupabase = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${entity}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('travel-images')
      .upload(fileName, file, { upsert: true });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('travel-images')
      .getPublicUrl(data.path);

    return publicUrl;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB");
      return;
    }

    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
      setError("Only JPG, PNG, and WebP formats are allowed");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const uploadedUrl = await uploadToSupabase(file);
      setPreviewUrl(uploadedUrl);
      onImageChange(uploadedUrl);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      setError("Please enter an image URL");
      return;
    }

    if (!validateImageUrl(urlInput)) {
      setError("Please enter a valid image URL (.jpg, .jpeg, .png, .webp)");
      return;
    }

    setError("");
    setPreviewUrl(urlInput);
    onImageChange(urlInput);
  };

  const clearImage = () => {
    setPreviewUrl("");
    setUrlInput("");
    onImageChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setUploadMode("upload")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
            uploadMode === "upload" ? "bg-blue-50 border-blue-500 text-blue-700" : "border-gray-300"
          }`}
        >
          <Upload className="w-4 h-4" />
          Upload from Device
        </button>
        <button
          type="button"
          onClick={() => setUploadMode("url")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
            uploadMode === "url" ? "bg-blue-50 border-blue-500 text-blue-700" : "border-gray-300"
          }`}
        >
          <Link className="w-4 h-4" />
          Use Image URL
        </button>
      </div>

      {/* Upload Mode */}
      {uploadMode === "upload" && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            disabled={uploading}
          />
          {uploading && (
            <div className="mt-2 text-sm text-blue-600">Uploading...</div>
          )}
        </div>
      )}

      {/* URL Mode */}
      {uploadMode === "url" && (
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://images.unsplash.com/photo-..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Use URL
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>
      )}

      {/* Image Preview */}
      {previewUrl && (
        <div className="relative inline-block">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border"
            onError={() => setError("Failed to load image")}
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}