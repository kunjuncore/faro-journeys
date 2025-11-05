import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationCard from "@/components/DestinationCard";
import HotelCard from "@/components/HotelCard";
import ActivityCard from "@/components/ActivityCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import santoriniImage from "@/assets/destination-santorini.jpg";
import baliImage from "@/assets/destination-bali.jpg";
import maldivesImage from "@/assets/destination-maldives.jpg";
import hotelImage from "@/assets/hotel-luxury.jpg";
import divingImage from "@/assets/activity-diving.jpg";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  // Mock data
  const destinations = [
    {
      id: "1",
      name: "Santorini",
      location: "Greece",
      image_url: santoriniImage,
      price: 2499,
      rating: 4.9,
    },
    {
      id: "2",
      name: "Bali",
      location: "Indonesia",
      image_url: baliImage,
      price: 1899,
      rating: 4.8,
    },
    {
      id: "3",
      name: "Maldives",
      location: "Indian Ocean",
      image_url: maldivesImage,
      price: 3499,
      rating: 5.0,
    },
  ];

  const hotels = [
    {
      id: "1",
      name: "Luxury Sky Resort",
      location: "Dubai, UAE",
      image_url: hotelImage,
      price: 450,
      rating: 4.9,
    },
  ];

  const activities = [
    {
      id: "1",
      name: "Scuba Diving Adventure",
      category: "Water Sports",
      image_url: divingImage,
      price: 199,
      duration: "4 hours",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Explore</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover amazing destinations, hotels, and activities
          </p>

          {/* Search and Filters */}
          <div className="bg-card rounded-xl shadow-card p-6 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search destinations, hotels, or activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="beach">Beach</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="budget">Budget ($0-$1000)</SelectItem>
                  <SelectItem value="mid">Mid-range ($1000-$2500)</SelectItem>
                  <SelectItem value="luxury">Luxury ($2500+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="destinations" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="hotels">Hotels</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>

          <TabsContent value="destinations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {destinations.length} Destinations Found
              </h2>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hotels" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{hotels.length} Hotels Found</h2>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {activities.length} Activities Found
              </h2>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Explore;
