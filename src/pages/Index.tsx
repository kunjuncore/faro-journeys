import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import DestinationCard from "@/components/DestinationCard";
import ActivityCard from "@/components/ActivityCard";
import HotelCard from "@/components/HotelCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-beach.jpg";
import santoriniImage from "@/assets/destination-santorini.jpg";
import baliImage from "@/assets/destination-bali.jpg";
import maldivesImage from "@/assets/destination-maldives.jpg";
import hotelImage from "@/assets/hotel-luxury.jpg";
import divingImage from "@/assets/activity-diving.jpg";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock data - will be replaced with API calls
  const featuredDestinations = [
    {
      id: "1",
      name: "Santorini",
      location: "Greece",
      image: santoriniImage,
      price: 2499,
      rating: 4.9,
    },
    {
      id: "2",
      name: "Bali",
      location: "Indonesia",
      image: baliImage,
      price: 1899,
      rating: 4.8,
    },
    {
      id: "3",
      name: "Maldives",
      location: "Indian Ocean",
      image: maldivesImage,
      price: 3499,
      rating: 5.0,
    },
  ];

  const popularActivities = [
    {
      id: "1",
      name: "Scuba Diving Adventure",
      category: "Water Sports",
      image: divingImage,
      price: 199,
      duration: "4 hours",
    },
  ];

  const topHotels = [
    {
      id: "1",
      name: "Luxury Sky Resort",
      location: "Dubai, UAE",
      image: hotelImage,
      pricePerNight: 450,
      rating: 4.9,
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((dest) => (
            <DestinationCard key={dest.id} {...dest} />
          ))}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularActivities.map((activity) => (
              <ActivityCard key={activity.id} {...activity} />
            ))}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topHotels.map((hotel) => (
            <HotelCard key={hotel.id} {...hotel} />
          ))}
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
