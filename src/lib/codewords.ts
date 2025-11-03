import { createServiceClient } from "@codewords/client";

// Initialize Codewords client with API key from environment
const apiKey = import.meta.env.VITE_CODEWORDS_API_KEY;

if (!apiKey) {
  console.warn("VITE_CODEWORDS_API_KEY is not set in environment variables");
}

export const codewordsClient = createServiceClient(apiKey || "");

// Service IDs
export const SERVICES = {
  DESTINATIONS: "destinations_crud_96f71d6d",
  HOTELS: "hotels_crud_1cadbba8",
  ACTIVITIES: "activities_crud_35c2129f",
  BOOKINGS: "bookings_5e5b40a2",
  CONTACTS: "contacts_leads_4dece96c",
} as const;

// Type definitions for API requests
export interface DestinationRequest {
  action: "create" | "list" | "get_one" | "update" | "delete";
  destination_id?: string;
  data?: {
    name?: string;
    location?: string;
    description?: string;
    price?: number;
    image_url?: string;
    category?: string;
    rating?: number;
    featured?: boolean;
  };
  filters?: { category?: string; featured?: boolean };
}

export interface HotelRequest {
  action: "create" | "list" | "get_one" | "update" | "delete";
  hotel_id?: string;
  data?: {
    name?: string;
    destination_id?: string;
    description?: string;
    price_per_night?: number;
    image_url?: string;
    rating?: number;
    amenities?: string[];
  };
  filters?: { destination_id?: string };
}

export interface ActivityRequest {
  action: "create" | "list" | "get_one" | "update" | "delete";
  activity_id?: string;
  data?: {
    name?: string;
    destination_id?: string;
    description?: string;
    price?: number;
    image_url?: string;
    category?: string;
    duration?: string;
  };
  filters?: { category?: string; destination_id?: string };
}

export interface BookingRequest {
  action: "create" | "list" | "get_one" | "update" | "delete";
  booking_id?: string;
  data?: {
    item_type?: "destination" | "hotel" | "activity";
    item_id?: string;
    booking_date?: string;
    guests?: number;
    total_amount?: number;
    customer_name?: string;
    customer_email?: string;
    status?: string;
  };
}

export interface ContactRequest {
  action: "create" | "list" | "get_one";
  contact_id?: string;
  data?: {
    name?: string;
    email?: string;
    message?: string;
    category?: string;
  };
}
