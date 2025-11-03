import { useState, useEffect } from "react";
import { codewordsClient, SERVICES, DestinationRequest } from "@/lib/codewords";

export interface Destination {
  destination_id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  rating: number;
  featured: boolean;
}

export const useDestinations = (featured?: boolean) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        setError(null);

        const request: DestinationRequest = {
          action: "list",
          filters: featured !== undefined ? { featured } : undefined,
        };

        const response = await codewordsClient.runService(
          SERVICES.DESTINATIONS,
          "",
          request
        ) as any;

        setDestinations(response.destinations || []);
      } catch (err) {
        setError("Failed to load destinations. Please try again.");
        console.error("Error fetching destinations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [featured]);

  return { destinations, loading, error };
};

export const useDestination = (id: string) => {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setLoading(true);
        setError(null);

        const request: DestinationRequest = {
          action: "get_one",
          destination_id: id,
        };

        const response = await codewordsClient.runService(
          SERVICES.DESTINATIONS,
          "",
          request
        ) as any;

        setDestination(response.destination || null);
      } catch (err) {
        setError("Failed to load destination details. Please try again.");
        console.error("Error fetching destination:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDestination();
    }
  }, [id]);

  return { destination, loading, error };
};
