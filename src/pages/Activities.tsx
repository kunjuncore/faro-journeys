import { useEffect, useState } from "react";
import { getActivitiesFromSupabase } from "@/lib/supabaseOperations";
import ActivityCard from "@/components/ActivityCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadActivities();
  }, []);

  async function loadActivities() {
    try {
      setLoading(true);
      const data = await getActivitiesFromSupabase();
      setActivities(data || []);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredActivities = activities.filter((activity: any) =>
    activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Amazing Activities</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience thrilling adventures and unique activities at every destination
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Activities Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity: any) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        )}

        {!loading && filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No activities found matching your search.</p>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}