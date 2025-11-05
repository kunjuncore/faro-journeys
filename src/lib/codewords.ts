import { createServiceClient } from "@codewords/client";
import { mockDestinations, mockHotels, mockActivities } from "./mockData";
import { getStoredDestinations } from "./localStorage";

// Validate environment variable
const apiKey = import.meta.env.VITE_CODEWORDS_API_KEY;
if (!apiKey) {
  throw new Error('VITE_CODEWORDS_API_KEY environment variable is required');
}

// Export client for direct use if needed
export const codewordsClient = createServiceClient(apiKey);

// SERVICE IDS
export const SERVICES = {
  DESTINATIONS: "destinations_crud_96f71d6d",
  HOTELS: "hotels_crud_1cadbba8",
  ACTIVITIES: "activities_crud_35c2129f",
  BOOKINGS: "bookings_5e5b40a2",
  CONTACTS: "contacts_leads_4dece96c"
};

// ============================================
// DESTINATIONS API
// ============================================
export async function getDestinations(filters?: { category?: string; featured?: boolean }) {
  try {
    const response: any = await codewordsClient.runService(SERVICES.DESTINATIONS, "", {
      action: "list",
      filters: filters || {}
    });
    return response.data || [];
  } catch (error: any) {
    console.error("Error fetching destinations:", error);
    // Fallback to mock data + localStorage if API fails
    if (error.status === 403) {
      console.warn("API access denied, using mock data + localStorage");
      const stored = getStoredDestinations();
      const allDestinations = [...mockDestinations, ...stored];
      return allDestinations.filter(dest => 
        (!filters?.featured || dest.featured) &&
        (!filters?.category || dest.category === filters.category)
      );
    }
    return [];
  }
}

export async function createDestination(data: any) {
  try {
    const response: any = await codewordsClient.runService(SERVICES.DESTINATIONS, "", {
      action: "create",
      data
    });
    return response.data;
  } catch (error: any) {
    console.error("Error creating destination:", error);
    if (error.status === 403) {
      throw new Error("API access denied. Please check your API key permissions.");
    }
    throw error;
  }
}

export async function updateDestination(id: string, data: any) {
  try {
    const response: any = await codewordsClient.runService(SERVICES.DESTINATIONS, "", {
      action: "update",
      destination_id: id,
      data
    });
    return response.data;
  } catch (error) {
    console.error("Error updating destination:", error);
    throw error;
  }
}

export async function deleteDestination(id: string) {
  try {
    const response: any = await codewordsClient.runService(SERVICES.DESTINATIONS, "", {
      action: "delete",
      destination_id: id
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting destination:", error);
    throw error;
  }
}

// ============================================
// HOTELS API
// ============================================
export async function getHotels(filters?: { destination_id?: string }) {
  try {
    const response: any = await codewordsClient.runService(SERVICES.HOTELS, "", {
      action: "list",
      filters: filters || {}
    });
    return response.data || [];
  } catch (error: any) {
    console.error("Error fetching hotels:", error);
    if (error.status === 403) {
      console.warn("API access denied, using mock data");
      return mockHotels.filter(hotel => 
        !filters?.destination_id || hotel.destination_id === filters.destination_id
      );
    }
    return [];
  }
}

export async function createHotel(data: any) {
  try {
    const response: any = await codewordsClient.runService(SERVICES.HOTELS, "", {
      action: "create",
      data
    });
    return response.data;
  } catch (error) {
    console.error("Error creating hotel:", error);
    throw error;
  }
}

export async function deleteHotel(id: string) {
  try {
    const response: any = await codewordsClient.runService(SERVICES.HOTELS, "", {
      action: "delete",
      hotel_id: id
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting hotel:", error);
    throw error;
  }
}

// ============================================
// ACTIVITIES API
// ============================================
export async function getActivities(filters?: { destination_id?: string; category?: string }) {
  try {
    const response: any = await codewordsClient.runService(SERVICES.ACTIVITIES, "", {
      action: "list",
      filters: filters || {}
    });
    return response.data || [];
  } catch (error: any) {
    console.error("Error fetching activities:", error);
    if (error.status === 403) {
      console.warn("API access denied, using mock data");
      return mockActivities.filter(activity => 
        (!filters?.destination_id || activity.destination_id === filters.destination_id) &&
        (!filters?.category || activity.category === filters.category)
      );
    }
    return [];
  }
}

export async function createActivity(data: any) {
  try {
    const response: any = await codewordsClient.runService(SERVICES.ACTIVITIES, "", {
      action: "create",
      data
    });
    return response.data;
  } catch (error) {
    console.error("Error creating activity:", error);
    throw error;
  }
}

export async function deleteActivity(id: string) {
  try {
    const response: any = await codewordsClient.runService(SERVICES.ACTIVITIES, "", {
      action: "delete",
      activity_id: id
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting activity:", error);
    throw error;
  }
}

// ============================================
// BOOKINGS API
// ============================================
export async function getBookings(filters?: { user_id?: string; status?: string }) {
  try {
    const response: any = await codewordsClient.runService(SERVICES.BOOKINGS, "", {
      action: "list",
      filters: filters || {}
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
}

export async function createBooking(data: {
  item_type: "destination" | "hotel" | "activity";
  item_id: string;
  booking_date: string;
  guests: number;
  total_amount: number;
  user_id?: string;
}) {
  try {
    const response: any = await codewordsClient.runService(SERVICES.BOOKINGS, "", {
      action: "create",
      data
    });
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

export async function updateBookingStatus(id: string, status: "pending" | "confirmed" | "cancelled") {
  try {
    const response: any = await codewordsClient.runService(SERVICES.BOOKINGS, "", {
      action: "update_status",
      booking_id: id,
      status
    });
    return response.data;
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
}

// ============================================
// CONTACTS API
// ============================================
export async function getContacts(filters?: { status?: string; category?: string }) {
  try {
    const response: any = await codewordsClient.runService(SERVICES.CONTACTS, "", {
      action: "list",
      filters: filters || {}
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
}

export async function submitContact(data: {
  name: string;
  email: string;
  message: string;
  category?: string;
}) {
  try {
    const response: any = await codewordsClient.runService(SERVICES.CONTACTS, "", {
      action: "create",
      data
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting contact:", error);
    throw error;
  }
}

export async function updateContactStatus(id: string, status: "pending" | "contacted" | "closed") {
  try {
    const response: any = await codewordsClient.runService(SERVICES.CONTACTS, "", {
      action: "update_status",
      contact_id: id,
      status
    });
    return response.data;
  } catch (error) {
    console.error("Error updating contact status:", error);
    throw error;
  }
}