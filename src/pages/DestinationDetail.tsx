import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HotelCard from "@/components/HotelCard";
import ActivityCard from "@/components/ActivityCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { MapPin, Star, Calendar, Users, ArrowLeft } from "lucide-react";
import santoriniImage from "@/assets/destination-santorini.jpg";
import hotelImage from "@/assets/hotel-luxury.jpg";
import divingImage from "@/assets/activity-diving.jpg";

const DestinationDetail = () => {
  const { id } = useParams();

  // Mock data - will be fetched from API
  const destination = {
    id: "1",
    name: "Santorini",
    location: "Greece",
    image: santoriniImage,
    price: 2499,
    rating: 4.9,
    description:
      "Santorini is the ultimate romantic getaway, with stunning sunsets, white-washed buildings, and crystal-clear waters. Experience the magic of this Greek island paradise with its unique volcanic beaches, world-class wines, and breathtaking caldera views.",
    highlights: [
      "Iconic white and blue architecture",
      "World-famous sunset views in Oia",
      "Volcanic beaches with unique colors",
      "Exceptional local wines and cuisine",
      "Ancient archaeological sites",
    ],
  };

  const relatedHotels = [
    {
      id: "1",
      name: "Luxury Sky Resort",
      location: "Santorini, Greece",
      image: hotelImage,
      pricePerNight: 450,
      rating: 4.9,
    },
  ];

  const relatedActivities = [
    {
      id: "1",
      name: "Scuba Diving Adventure",
      category: "Water Sports",
      image: divingImage,
      price: 199,
      duration: "4 hours",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20">
        {/* Hero Image */}
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <Button asChild variant="ghost" className="mb-4 bg-background/80 backdrop-blur-sm">
            <Link to="/explore">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Explore
            </Link>
          </Button>

          <Card className="p-8 border-border">
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{destination.location}</span>
                </div>
                <h1 className="text-5xl font-bold mb-4">{destination.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    <span className="font-semibold">{destination.rating}</span>
                    <span className="text-muted-foreground">(128 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="bg-secondary rounded-xl p-6 md:min-w-[280px]">
                <div className="text-sm text-muted-foreground mb-2">Package from</div>
                <div className="text-4xl font-bold text-primary mb-6">
                  ${destination.price.toLocaleString()}
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-accent mb-3" size="lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Users className="w-5 h-5 mr-2" />
                  Customize Package
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">About this Destination</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {destination.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Highlights</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {destination.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        </div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="gallery">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={destination.image}
                        alt={`Gallery ${i}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Related Hotels */}
          <section className="py-16">
            <h2 className="text-3xl font-bold mb-8">Hotels in {destination.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedHotels.map((hotel) => (
                <HotelCard key={hotel.id} {...hotel} />
              ))}
            </div>
          </section>

          {/* Related Activities */}
          <section className="py-16">
            <h2 className="text-3xl font-bold mb-8">Activities in {destination.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedActivities.map((activity) => (
                <ActivityCard key={activity.id} {...activity} />
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DestinationDetail;
