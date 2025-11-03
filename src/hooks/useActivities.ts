import { useState, useEffect } from "react";
import { codewordsClient, SERVICES, ActivityRequest } from "@/lib/codewords";

export interface Activity {
  activity_id: string;
  name: string;
  destination_id: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  duration: string;
}

export const useActivities = (category?: string, destinationId?: string) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        setError(null);

        const filters: any = {};
        if (category) filters.category = category;
        if (destinationId) filters.destination_id = destinationId;

        const request: ActivityRequest = {
          action: "list",
          filters: Object.keys(filters).length > 0 ? filters : undefined,
        };

        const response = await codewordsClient.runService(
          SERVICES.ACTIVITIES,
          "",
          request
        ) as any;

        setActivities(response.activities || []);
      } catch (err) {
        setError("Failed to load activities. Please try again.");
        console.error("Error fetching activities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [category, destinationId]);

  return { activities, loading, error };
};

export const useActivity = (id: string) => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        setError(null);

        const request: ActivityRequest = {
          action: "get_one",
          activity_id: id,
        };

        const response = await codewordsClient.runService(
          SERVICES.ACTIVITIES,
          "",
          request
        ) as any;

        setActivity(response.activity || null);
      } catch (err) {
        setError("Failed to load activity details. Please try again.");
        console.error("Error fetching activity:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchActivity();
    }
  }, [id]);

  return { activity, loading, error };
};
