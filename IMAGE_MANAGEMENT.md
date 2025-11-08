# Image Management System

## Overview
Dual image management system allowing admins to either upload images to Supabase Storage or use external image URLs.

## Components

### ImageUploader
Reusable component for handling both upload and URL input modes.

```tsx
<ImageUploader
  entity="destinations" // "destinations" | "hotels" | "activities" | "travel_themes"
  currentImageUrl={formData.image_url}
  onImageChange={(url) => setFormData({...formData, image_url: url})}
/>
```

## Features

### Upload Mode
- File validation (JPG, PNG, WebP, max 2MB)
- Upload to Supabase Storage bucket `travel-images`
- Automatic unique filename generation
- Upload progress indication
- Image preview

### URL Mode
- External URL input
- URL validation for image formats
- Support for popular image services (Unsplash, Pexels)
- Live preview

### Common Features
- Toggle between upload/URL modes
- Image preview with remove option
- Error handling and validation
- Responsive design

## Setup

### 1. Supabase Storage Bucket
The system automatically creates a `travel-images` bucket with:
- Public access
- 2MB file size limit
- Allowed formats: JPG, PNG, WebP

### 2. Database Schema
All entities use the same `image_url` column (TEXT) to store either:
- Supabase Storage public URL
- External image URL

### 3. Usage in Forms
Replace existing image URL inputs with the ImageUploader component:

```tsx
// Before
<input
  type="text"
  placeholder="Image URL"
  value={formData.image_url}
  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
/>

// After
<ImageUploader
  entity="destinations"
  currentImageUrl={formData.image_url}
  onImageChange={(url) => setFormData({...formData, image_url: url})}
/>
```

## File Structure
```
src/
├── components/
│   ├── ImageUploader.tsx      # Main component
│   └── ExampleForm.tsx        # Usage example
├── lib/
│   ├── imageUpload.ts         # Upload utilities
│   └── storageSetup.ts        # Bucket setup
└── pages/admin/
    ├── Destinations.tsx       # Updated with ImageUploader
    ├── Hotels.tsx            # Updated with ImageUploader
    ├── Activities.tsx        # Updated with ImageUploader
    └── TravelThemes.tsx      # Updated with ImageUploader
```

## Validation Rules
- **File Size**: Maximum 2MB
- **File Types**: JPG, JPEG, PNG, WebP only
- **URL Format**: Must end with image extension or be from trusted domains
- **Required**: At least one image source must be provided

## Error Handling
- File size validation
- File type validation
- Upload failure handling
- Invalid URL detection
- Network error recovery