import { useState, useEffect } from "react";
import { codewordsClient, SERVICES, HotelRequest } from "@/lib/codewords";

export interface Hotel {
  hotel_id: string;
  name: string;
  destination_id: string;
  description: string;
  price_per_night: number;
  image_url: string;
  rating: number;
  amenities: string[];
}

export const useHotels = (destinationId?: string) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError(null);

        const request: HotelRequest = {
          action: "list",
          filters: destinationId ? { destination_id: destinationId } : undefined,
        };

        const response = await codewordsClient.runService(
          SERVICES.HOTELS,
          "",
          request
        ) as any;

        setHotels(response.hotels || []);
      } catch (err) {
        setError("Failed to load hotels. Please try again.");
        console.error("Error fetching hotels:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [destinationId]);

  return { hotels, loading, error };
};

export const useHotel = (id: string) => {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true);
        setError(null);

        const request: HotelRequest = {
          action: "get_one",
          hotel_id: id,
        };

        const response = await codewordsClient.runService(
          SERVICES.HOTELS,
          "",
          request
        ) as any;

        setHotel(response.hotel || null);
      } catch (err) {
        setError("Failed to load hotel details. Please try again.");
        console.error("Error fetching hotel:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHotel();
    }
  }, [id]);

  return { hotel, loading, error };
};
