import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationCard from "@/components/DestinationCard";
import HotelCard from "@/components/HotelCard";
import ActivityCard from "@/components/ActivityCard";
import { getTravelThemesFromSupabase, getDestinationsFromSupabase, getHotelsFromSupabase, getActivitiesFromSupabase } from "@/lib/supabaseOperations";
import { supabase } from "@/lib/supabase";
import { ArrowLeft } from "lucide-react";

export default function TravelThemeDetail() {
  const { id } = useParams();
  const [theme, setTheme] = useState<any>(null);
  const [destinations, setDestinations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadThemeData();
  }, [id]);

  async function loadThemeData() {
    try {
      setLoading(true);
      
      // Get theme details
      const themes = await getTravelThemesFromSupabase();
      const foundTheme = themes.find((t: any) => t.id === id);
      setTheme(foundTheme);

      if (foundTheme) {
        // Get theme relationships
        const [themeDestinations, themeActivities] = await Promise.all([
          supabase.from('travel_theme_destinations').select('destination_id').eq('travel_theme_id', id),
          supabase.from('travel_theme_activities').select('activity_id').eq('travel_theme_id', id)
        ]);

        const destinationIds = themeDestinations.data?.map(td => td.destination_id) || [];
        const activityIds = themeActivities.data?.map(ta => ta.activity_id) || [];
        
        // Get all data
        const [allDestinations, allHotels, allActivities] = await Promise.all([
          getDestinationsFromSupabase(),
          getHotelsFromSupabase(),
          getActivitiesFromSupabase()
        ]);

        // Filter by theme relationships
        const themeDestinationsData = allDestinations.filter((d: any) => destinationIds.includes(d.id));
        const themeHotels = allHotels.filter((h: any) => destinationIds.includes(h.destination_id));
        const directThemeActivities = allActivities.filter((a: any) => activityIds.includes(a.id));
        const destinationActivities = allActivities.filter((a: any) => destinationIds.includes(a.destination_id));
        
        // Combine direct theme activities with destination activities
        const combinedActivities = [...directThemeActivities, ...destinationActivities.filter(da => !directThemeActivities.find(ta => ta.id === da.id))];

        setDestinations(themeDestinationsData);
        setHotels(themeHotels);
        setActivities(combinedActivities);
      }
    } catch (error) {
      console.error('Error loading theme data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20 pb-12 flex items-center justify-center">
          <div className="text-2xl font-semibold">Loading theme...</div>
        </div>
      </div>
    );
  }

  if (!theme) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20 pb-12 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-semibold mb-4">Theme not found</div>
            <Link to="/themes" className="text-blue-600 hover:underline">
              Back to Travel Themes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={theme.image_url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"}
            alt={theme.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-5xl font-bold mb-4">{theme.name}</h1>
            <p className="text-xl max-w-2xl">{theme.description}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Link to="/themes" className="inline-flex items-center text-blue-600 hover:underline mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Travel Themes
          </Link>

          {/* Destinations */}
          {destinations.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Featured Destinations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {destinations.map((destination: any) => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>
            </section>
          )}

          {/* Hotels */}
          {hotels.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Recommended Hotels</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hotels.map((hotel: any) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            </section>
          )}

          {/* Activities */}
          {activities.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Theme Experiences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activities.map((activity: any) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </section>
          )}

          {destinations.length === 0 && hotels.length === 0 && activities.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No content available for this theme yet.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}