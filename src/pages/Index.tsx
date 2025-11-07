import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDestinationsFromSupabase, getHotelsFromSupabase, getActivitiesFromSupabase, getTravelThemesFromSupabase } from "@/lib/supabaseOperations";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  const [destinations, setDestinations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [activities, setActivities] = useState([]);
  const [themes, setThemes] = useState([]);
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

  async function loadThemes() {
    try {
      const data = await getTravelThemesFromSupabase({ featured: true });
      setThemes(data || []);
    } catch (error) {
      console.error('Error loading themes:', error);
      setThemes([]);
    }
  }

  async function loadData() {
    try {
      setLoading(true);
      setError(null);
      await Promise.all([loadDestinations(), loadHotels(), loadActivities(), loadThemes()]);
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
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition"
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
        <section className="relative h-[600px] group overflow-hidden">
            
    {/* Background Image 1 (The default image, visible first) */}
    <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{
            backgroundImage: "url('/assets/img/bg/img1.jpg')"
        }}
    />

    {/* Background Image 2 (The hover image, opacity: 0 by default) */}
    <div
        className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
            backgroundImage: "url('/assets/img/bg/img2.jpg')"
        }}
    />

    {/* Dark Overlay - z-10 ensures it is above the images */}
    <div className="absolute inset-0 bg-black/40 z-10" />
    
    {/* Content Area - z-20 ensures it is above the overlay and images */}
    <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-6xl font-bold mb-4 text-center">Discover Your Next Dream Destination</h1>
        <p className="text-xl mb-8">Curated holiday experiences to the world's most beautiful destinations</p>
        
        {/* Trip Search Section */}
        <SearchBar />
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
              <Link to="/" className="text-primary hover:underline font-semibold">View All →</Link>
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

                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2">{dest.name}</h3>
                      <p className="text-gray-600 mb-4">📍 {dest.location}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">From</span>
                        <span className="text-2xl font-bold text-primary">${dest.price}</span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Popular Experiences - REAL DATA */}
        <section className="py-16 px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-4xl font-bold">Popular Experiences</h2>
                <p className="text-gray-600 mt-2">Exciting experiences for every traveler</p>
              </div>
              <Link to="/experiences" className="text-primary hover:underline font-semibold">View All →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {activities.length === 0 ? (
                <p className="col-span-4 text-center text-gray-500">No featured experiences yet. Add some in the admin panel!</p>
              ) : (
                activities.slice(0, 4).map((experience: any) => (
                  <Link key={experience.id} to={`/activity/${experience.id}`} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={experience.image_url || "https://images.unsplash.com/photo-1544551763-46a013bb70d5"}
                        alt={experience.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-gray-500 uppercase">{experience.category}</span>
                      <h3 className="text-lg font-bold mt-1">{experience.name}</h3>
                      <p className="text-sm text-gray-600 mt-2">⏱️ {experience.duration || "Varies"}</p>
                      <p className="text-lg font-bold text-blue-600 mt-3">From ${experience.price}</p>
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
                      <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
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

        {/* Travel Themes - REAL DATA */}
        <section className="py-16 px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-4xl font-bold">Travel Themes</h2>
                <p className="text-gray-600 mt-2">Discover curated experiences by theme</p>
              </div>
              <Link to="/themes" className="text-primary hover:underline font-semibold">View All →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {themes.length === 0 ? (
                <p className="col-span-4 text-center text-gray-500">No featured themes yet. Add some in the admin panel!</p>
              ) : (
                themes.slice(0, 4).map((theme: any) => (
                  <Link key={theme.id} to="/themes" className="group bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={theme.image_url}
                        alt={theme.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg font-bold">{theme.name}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600">{theme.description?.substring(0, 80)}...</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#3499C5] text-white text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Let us help you create memories that will last a lifetime</p>
          <Link to="/contact" className="inline-block bg-white text-[#3499C5] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
            Get in Touch
          </Link>
</section>
      </div>

      <Footer />
    </>
  );
}