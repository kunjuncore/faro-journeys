import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDestinationsFromSupabase, getHotelsFromSupabase, getActivitiesFromSupabase } from "@/lib/supabaseOperations";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, MapPin } from "lucide-react";

export default function HomePage() {
  const [destinations, setDestinations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadDestinations() {
    try {
      const data = await getDestinationsFromSupabase({ featured: true });
      setDestinations(data);
    } catch (error) {
      console.error('Error loading destinations:', error);
      setDestinations([]);
    }
  }

  async function loadHotels() {
    try {
      const data = await getHotelsFromSupabase();
      setHotels(data || []);
    } catch (error) {
      console.error('Error loading hotels:', error);
      setHotels([]);
    }
  }

  async function loadActivities() {
    try {
      const data = await getActivitiesFromSupabase();
      setActivities(data || []);
    } catch (error) {
      console.error('Error loading activities:', error);
      setActivities([]);
    }
  }

  async function loadData() {
    try {
      setLoading(true);
      setError(null);
      await Promise.all([loadDestinations(), loadHotels(), loadActivities()]);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load content. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();

    const destChannel = supabase
      .channel('destinations-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'destinations' }, () => loadDestinations())
      .subscribe();

    const hotelsChannel = supabase
      .channel('hotels-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'hotels' }, () => loadHotels())
      .subscribe();

    const activitiesChannel = supabase
      .channel('activities-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'activities' }, () => loadActivities())
      .subscribe();

    return () => {
      supabase.removeChannel(destChannel);
      supabase.removeChannel(hotelsChannel);
      supabase.removeChannel(activitiesChannel);
    };
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-2xl font-semibold">Loading amazing destinations...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-semibold text-red-600 mb-4">{error}</div>
            <button 
              onClick={loadData}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16">  {/* pt-16 for fixed navbar spacing */}
        
        {/* Hero Section */}
        <section className="relative h-[600px] bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800')"}}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
            <h1 className="text-6xl font-bold mb-4 text-center">Discover Your Next Dream Destination</h1>
            <p className="text-xl mb-8">Curated holiday experiences to the world's most beautiful destinations</p>
            
            {/* Trip Search Section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 w-full max-w-4xl mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Find Your Perfect Trip</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Where to?"
                    className="pl-10 h-12 text-gray-800"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="date"
                    placeholder="Check-in"
                    className="pl-10 h-12 text-gray-800"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="date"
                    placeholder="Check-out"
                    className="pl-10 h-12 text-gray-800"
                  />
                </div>
                <Button className="h-12 bg-gradient-to-r from-primary to-accent hover:shadow-lg">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Destinations - REAL DATA */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-4xl font-bold">Featured Destinations</h2>
                <p className="text-gray-600 mt-2">Handpicked locations for unforgettable experiences</p>
              </div>
              <Link to="/explore" className="text-blue-600 hover:underline font-semibold">View All →</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {destinations.length === 0 ? (
                <p className="col-span-3 text-center text-gray-500">No featured destinations yet. Add some in the admin panel!</p>
              ) : (
                destinations.map((dest: any) => (
                  <Link
                    key={dest.id}
                    to={`/destination/${dest.id}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={dest.image_url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                        ⭐ {dest.rating || "5.0"}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2">{dest.name}</h3>
                      <p className="text-gray-600 mb-4">📍 {dest.location}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">From</span>
                        <span className="text-2xl font-bold text-blue-600">${dest.price}</span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Popular Activities - REAL DATA */}
        <section className="py-16 px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-4xl font-bold">Popular Activities</h2>
                <p className="text-gray-600 mt-2">Exciting experiences for every traveler</p>
              </div>
              <Link to="/activities" className="text-blue-600 hover:underline font-semibold">View All →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {activities.length === 0 ? (
                <p className="col-span-4 text-center text-gray-500">No featured activities yet. Add some in the admin panel!</p>
              ) : (
                activities.slice(0, 4).map((activity: any) => (
                  <Link key={activity.id} to={`/activity/${activity.id}`} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={activity.image_url || "https://images.unsplash.com/photo-1544551763-46a013bb70d5"}
                        alt={activity.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-gray-500 uppercase">{activity.category}</span>
                      <h3 className="text-lg font-bold mt-1">{activity.name}</h3>
                      <p className="text-sm text-gray-600 mt-2">⏱️ {activity.duration || "Varies"}</p>
                      <p className="text-lg font-bold text-blue-600 mt-3">From ${activity.price}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Top Hotels - REAL DATA */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-4xl font-bold">Top Hotels</h2>
                <p className="text-gray-600 mt-2">Luxury accommodations for your perfect stay</p>
              </div>
              <Link to="/hotels" className="text-blue-600 hover:underline font-semibold">View All →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {hotels.length === 0 ? (
                <p className="col-span-3 text-center text-gray-500">No featured hotels yet. Add some in the admin panel!</p>
              ) : (
                hotels.slice(0, 3).map((hotel: any) => (
                  <Link key={hotel.id} to={`/hotel/${hotel.id}`} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                    <div className="h-56 overflow-hidden">
                      <img
                        src={hotel.image_url || "https://images.unsplash.com/photo-1566073771259-6a8506099945"}
                        alt={hotel.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{hotel.name}</h3>
                        <span className="text-sm">⭐ {hotel.rating || "5.0"}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{hotel.description?.substring(0, 100) || 'Luxury accommodation with world-class amenities'}...</p>
                      <p className="text-sm text-gray-500">Per night</p>
                      <p className="text-2xl font-bold text-blue-600">${hotel.price}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-blue-600 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Let us help you create memories that will last a lifetime</p>
          <Link to="/contact" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
            Get in Touch
          </Link>
        </section>
      </div>

      <Footer />
    </>
  );
}