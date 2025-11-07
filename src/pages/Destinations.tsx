import { useEffect, useState } from "react";
import { getDestinationsFromSupabase } from "@/lib/supabaseOperations";
import DestinationCard from "@/components/DestinationCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    loadDestinations();
  }, [category]);

  async function loadDestinations() {
    try {
      setLoading(true);
      const data = await getDestinationsFromSupabase({ category: category || undefined });
      setDestinations(data || []);
    } catch (error) {
      console.error('Error loading destinations:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredDestinations = destinations.filter((dest: any) =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Explore Destinations</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover amazing places around the world and create unforgettable memories
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={category === "" ? "default" : "outline"}
              onClick={() => setCategory("")}
            >
              All
            </Button>
            <Button
              variant={category === "beach" ? "default" : "outline"}
              onClick={() => setCategory("beach")}
            >
              Beach
            </Button>
            <Button
              variant={category === "mountain" ? "default" : "outline"}
              onClick={() => setCategory("mountain")}
            >
              Mountain
            </Button>
            <Button
              variant={category === "city" ? "default" : "outline"}
              onClick={() => setCategory("city")}
            >
              City
            </Button>
          </div>
        </div>

        {/* Destinations Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination: any) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}

        {!loading && filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No destinations found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}