import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import DestinationCard from "@/components/DestinationCard";
import ActivityCard from "@/components/ActivityCard";
import HotelCard from "@/components/HotelCard";
import LoadingCard from "@/components/LoadingCard";
import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useDestinations } from "@/hooks/useDestinations";
import { useHotels } from "@/hooks/useHotels";
import { useActivities } from "@/hooks/useActivities";
import heroImage from "@/assets/hero-beach.jpg";
import santoriniImage from "@/assets/destination-santorini.jpg";
import baliImage from "@/assets/destination-bali.jpg";
import maldivesImage from "@/assets/destination-maldives.jpg";
import hotelImage from "@/assets/hotel-luxury.jpg";
import divingImage from "@/assets/activity-diving.jpg";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Fetch real data from API
  const { 
    destinations: featuredDestinations, 
    loading: loadingDestinations, 
    error: errorDestinations 
  } = useDestinations(true);
  
  const { 
    hotels: topHotels, 
    loading: loadingHotels, 
    error: errorHotels 
  } = useHotels();
  
  const { 
    activities: popularActivities, 
    loading: loadingActivities, 
    error: errorActivities 
  } = useActivities();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fallback data for when API is unavailable or returns empty
  const fallbackDestinations = [
    {
      destination_id: "1",
      name: "Santorini",
      location: "Greece",
      image_url: santoriniImage,
      price: 2499,
      rating: 4.9,
      description: "",
      category: "Beach",
      featured: true,
    },
    {
      destination_id: "2",
      name: "Bali",
      location: "Indonesia",
      image_url: baliImage,
      price: 1899,
      rating: 4.8,
      description: "",
      category: "Cultural",
      featured: true,
    },
    {
      destination_id: "3",
      name: "Maldives",
      location: "Indian Ocean",
      image_url: maldivesImage,
      price: 3499,
      rating: 5.0,
      description: "",
      category: "Beach",
      featured: true,
    },
  ];

  const fallbackActivities = [
    {
      activity_id: "1",
      name: "Scuba Diving Adventure",
      category: "Water Sports",
      image_url: divingImage,
      price: 199,
      duration: "4 hours",
      description: "",
      destination_id: "",
    },
  ];

  const fallbackHotels = [
    {
      hotel_id: "1",
      name: "Luxury Sky Resort",
      destination_id: "",
      description: "",
      image_url: hotelImage,
      price_per_night: 450,
      rating: 4.9,
      amenities: [],
    },
  ];

  const displayDestinations = featuredDestinations.length > 0 ? featuredDestinations : fallbackDestinations;
  const displayActivities = popularActivities.length > 0 ? popularActivities : fallbackActivities;
  const displayHotels = topHotels.length > 0 ? topHotels : fallbackHotels;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-accent/60" />

        <div
          className={`relative z-10 container mx-auto px-4 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-accent" />
            <span className="text-white/90 font-medium">Premium Travel Experiences</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Discover Your Next
            <br />
            <span className="bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
              Dream Destination
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Curated holiday experiences to the world's most beautiful destinations
          </p>

          <div className="max-w-5xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-3">Featured Destinations</h2>
            <p className="text-muted-foreground text-lg">
              Handpicked locations for unforgettable experiences
            </p>
          </div>
          <Button asChild variant="ghost" className="group">
            <Link to="/explore">
              View All
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {errorDestinations && (
          <ErrorMessage message={errorDestinations} />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {loadingDestinations ? (
            <>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </>
          ) : (
            displayDestinations.map((dest) => (
              <DestinationCard 
                key={dest.destination_id} 
                id={dest.destination_id}
                name={dest.name}
                location={dest.location}
                image={dest.image_url}
                price={dest.price}
                rating={dest.rating}
              />
            ))
          )}
        </div>
      </section>

      {/* Popular Activities */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-3">Popular Activities</h2>
              <p className="text-muted-foreground text-lg">
                Adventure awaits at every destination
              </p>
            </div>
            <Button asChild variant="ghost" className="group">
              <Link to="/explore">
                View All
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {errorActivities && (
            <ErrorMessage message={errorActivities} />
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {loadingActivities ? (
              <>
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
              </>
            ) : (
              displayActivities.map((activity) => (
                <ActivityCard 
                  key={activity.activity_id}
                  id={activity.activity_id}
                  name={activity.name}
                  category={activity.category}
                  image={activity.image_url}
                  price={activity.price}
                  duration={activity.duration}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Top Hotels */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-3">Top Hotels</h2>
            <p className="text-muted-foreground text-lg">
              Luxury accommodations for your perfect stay
            </p>
          </div>
          <Button asChild variant="ghost" className="group">
            <Link to="/explore">
              View All
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {errorHotels && (
          <ErrorMessage message={errorHotels} />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {loadingHotels ? (
            <>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </>
          ) : (
            displayHotels.map((hotel) => (
              <HotelCard 
                key={hotel.hotel_id}
                id={hotel.hotel_id}
                name={hotel.name}
                location="Location"
                image={hotel.image_url}
                pricePerNight={hotel.price_per_night}
                rating={hotel.rating}
              />
            ))
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let us help you create memories that will last a lifetime
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent text-lg">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
