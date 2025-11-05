import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HotelCard from "@/components/HotelCard";
import ActivityCard from "@/components/ActivityCard";
import BookingModal from "@/components/BookingModal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Star, Calendar, Users, ArrowLeft } from "lucide-react";
import { getHotelsFromSupabase, getActivitiesFromSupabase, getDestinationsFromSupabase } from "@/lib/supabaseOperations";
import santoriniImage from "@/assets/destination-santorini.jpg";

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState<any>(null);
  const [hotels, setHotels] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDestinationData();
  }, [id]);

  async function loadDestinationData() {
    try {
      setLoading(true);
      const [destinationsData, hotelsData, activitiesData] = await Promise.all([
        getDestinationsFromSupabase(),
        getHotelsFromSupabase({ destination_id: id }),
        getActivitiesFromSupabase({ destination_id: id })
      ]);
      
      const foundDestination = destinationsData.find((d: any) => d.id === id);
      setDestination(foundDestination || {
        id: id,
        name: "Destination Not Found",
        location: "Unknown",
        description: "This destination could not be found.",
        price: 0,
        rating: 0,
        image_url: santoriniImage
      });
      
      setHotels(hotelsData || []);
      setActivities(activitiesData || []);
    } catch (error) {
      console.error('Error loading destination data:', error);
    } finally {
      setLoading(false);
    }
  }

  function calculateTotalPrice() {
    if (!destination) return 0;
    let total = destination.price || 0;
    
    selectedHotels.forEach(hotelId => {
      const hotel = hotels.find((h: any) => h.id === hotelId);
      if (hotel) total += hotel.price || 0;
    });
    
    selectedActivities.forEach(activityId => {
      const activity = activities.find((a: any) => a.id === activityId);
      if (activity) total += activity.price || 0;
    });
    
    return total;
  }

  function getSelectedItems() {
    if (!destination) return [];
    const items = [{ id: destination.id, name: destination.name, type: 'destination', price: destination.price || 0 }];
    
    selectedHotels.forEach(hotelId => {
      const hotel = hotels.find((h: any) => h.id === hotelId);
      if (hotel) items.push({ id: hotel.id, name: hotel.name, type: 'hotel', price: hotel.price });
    });
    
    selectedActivities.forEach(activityId => {
      const activity = activities.find((a: any) => a.id === activityId);
      if (activity) items.push({ id: activity.id, name: activity.name, type: 'activity', price: activity.price });
    });
    
    return items;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 flex items-center justify-center h-96">
          <div className="text-2xl font-semibold">Loading destination...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-2xl font-semibold mb-4">Destination not found</div>
            <Button asChild>
              <Link to="/destinations">Browse Destinations</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20">
        {/* Hero Image */}
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={destination.image_url || santoriniImage}
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
                  ${(destination.price || 0).toLocaleString()}
                </div>
                <Button 
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-gradient-to-r from-primary to-accent mb-3" 
                  size="lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
                <div className="text-sm text-muted-foreground text-center">
                  Total: ${calculateTotalPrice().toLocaleString()}
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="customize">Customize Package</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">About this Destination</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {destination.description || 'No description available for this destination.'}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="customize" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Customize Your Package</h2>
                  <p className="text-muted-foreground mb-6">
                    Select additional hotels and activities to create your perfect trip
                  </p>
                  
                  {/* Hotels Selection */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Add Hotels</h3>
                    <div className="space-y-4">
                      {hotels.map((hotel: any) => (
                        <div key={hotel.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <Checkbox
                            checked={selectedHotels.includes(hotel.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedHotels([...selectedHotels, hotel.id]);
                              } else {
                                setSelectedHotels(selectedHotels.filter(id => id !== hotel.id));
                              }
                            }}
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{hotel.name}</h4>
                            <p className="text-sm text-muted-foreground">{hotel.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">${hotel.price}</div>
                            <div className="text-sm text-muted-foreground">per night</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Activities Selection */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Add Activities</h3>
                    <div className="space-y-4">
                      {activities.map((activity: any) => (
                        <div key={activity.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <Checkbox
                            checked={selectedActivities.includes(activity.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedActivities([...selectedActivities, activity.id]);
                              } else {
                                setSelectedActivities(selectedActivities.filter(id => id !== activity.id));
                              }
                            }}
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{activity.name}</h4>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                            <p className="text-sm text-muted-foreground">Duration: {activity.duration}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">${activity.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-secondary p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Package Price:</span>
                      <span className="text-2xl font-bold text-primary">${calculateTotalPrice().toLocaleString()}</span>
                    </div>
                  </div>
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
          {!loading && hotels.length > 0 && (
            <section className="py-16">
              <h2 className="text-3xl font-bold mb-8">Hotels in {destination.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hotels.map((hotel: any) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            </section>
          )}

          {/* Related Activities */}
          {!loading && activities.length > 0 && (
            <section className="py-16">
              <h2 className="text-3xl font-bold mb-8">Activities in {destination.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activities.map((activity: any) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <Footer />
      
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        item={{
          id: destination.id,
          name: destination.name,
          type: 'destination',
          price: destination.price || 0
        }}
        selectedItems={getSelectedItems()}
        totalAmount={calculateTotalPrice()}
      />
    </div>
  );
};

export default DestinationDetail;
