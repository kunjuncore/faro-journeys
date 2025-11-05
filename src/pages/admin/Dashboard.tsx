import { useEffect, useState } from "react";
import { getDestinations, getHotels, getActivities, getBookings, getContacts } from "@/lib/codewords";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    destinations: 0,
    hotels: 0,
    activities: 0,
    bookings: 0,
    leads: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const [dest, hotels, activities, bookings, contacts] = await Promise.all([
        getDestinations({}),
        getHotels({}),
        getActivities({}),
        getBookings({}),
        getContacts({})
      ]);
      setStats({
        destinations: dest.length,
        hotels: hotels.length,
        activities: activities.length,
        bookings: bookings.length,
        leads: contacts.length
      });
      setLoading(false);
    }
    loadStats();
  }, []);

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Destinations</h3>
          <p className="text-4xl font-bold text-blue-600">{stats.destinations}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Hotels</h3>
          <p className="text-4xl font-bold text-green-600">{stats.hotels}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Activities</h3>
          <p className="text-4xl font-bold text-purple-600">{stats.activities}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Bookings</h3>
          <p className="text-4xl font-bold text-orange-600">{stats.bookings}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Leads</h3>
          <p className="text-4xl font-bold text-red-600">{stats.leads}</p>
        </div>
      </div>
    </div>
  );
}