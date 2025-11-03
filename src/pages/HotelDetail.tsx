import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { MapPin, Star, Calendar, Users, ArrowLeft, Wifi, Coffee, Waves, Dumbbell } from "lucide-react";
import hotelImage from "@/assets/hotel-luxury.jpg";

const HotelDetail = () => {
  const { id } = useParams();

  const hotel = {
    id: "1",
    name: "Luxury Sky Resort",
    location: "Dubai, UAE",
    image: hotelImage,
    pricePerNight: 450,
    rating: 4.9,
    description:
      "Experience unparalleled luxury at our five-star resort featuring world-class amenities, breathtaking views, and exceptional service. Each room is designed with elegance and comfort in mind, offering a perfect blend of modern sophistication and traditional hospitality.",
    amenities: [
      { icon: Wifi, name: "Free High-Speed WiFi" },
      { icon: Waves, name: "Infinity Pool" },
      { icon: Coffee, name: "Restaurant & Bar" },
      { icon: Dumbbell, name: "Fitness Center" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20">
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
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
                  <span className="text-lg">{hotel.location}</span>
                </div>
                <h1 className="text-5xl font-bold mb-4">{hotel.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    <span className="font-semibold">{hotel.rating}</span>
                    <span className="text-muted-foreground">(256 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="bg-secondary rounded-xl p-6 md:min-w-[280px]">
                <div className="text-sm text-muted-foreground mb-2">Per night from</div>
                <div className="text-4xl font-bold text-primary mb-6">
                  ${hotel.pricePerNight.toLocaleString()}
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-accent mb-3" size="lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Users className="w-5 h-5 mr-2" />
                  Check Availability
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">About this Hotel</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {hotel.description}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="amenities">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <amenity.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="font-medium">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="gallery">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={hotel.image}
                        alt={`Gallery ${i}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HotelDetail;
