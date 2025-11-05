// Mock data for development when API is not available
export const mockDestinations = [
  {
    id: "1",
    name: "Bali Paradise",
    location: "Bali, Indonesia",
    description: "Experience the magic of Bali with pristine beaches and cultural wonders",
    price: 1299,
    category: "Beach",
    image_url: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
    rating: 4.8,
    featured: true
  },
  {
    id: "2", 
    name: "Swiss Alps Adventure",
    location: "Switzerland",
    description: "Breathtaking mountain views and alpine adventures",
    price: 2199,
    category: "Mountain",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    rating: 4.9,
    featured: true
  }
];

export const mockHotels = [
  {
    id: "1",
    name: "Ocean View Resort",
    destination_id: "1",
    description: "Luxury beachfront resort with stunning ocean views",
    price: 299,
    image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    rating: 4.7
  }
];

export const mockActivities = [
  {
    id: "1",
    name: "Snorkeling Adventure",
    destination_id: "1",
    category: "Water Sports",
    description: "Explore vibrant coral reefs and marine life",
    price: 89,
    duration: "3 hours"
  }
];