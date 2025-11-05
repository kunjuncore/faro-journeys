import { useEffect, useState } from "react";
import { createServiceClient } from "@codewords/client";

const client = createServiceClient(import.meta.env.VITE_CODEWORDS_API_KEY!);

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    setLoading(true);
    const response: any = await client.runService("bookings_5e5b40a2", "", {
      action: "list",
      filters: {}
    });
    setBookings(response.data || []);
    setLoading(false);
  }

  async function handleStatusChange(bookingId: string, newStatus: string) {
    setLoading(true);
    await client.runService("bookings_5e5b40a2", "", {
      action: "update_status",
      booking_id: bookingId,
      status: newStatus
    });
    await loadBookings();
    alert(`Booking status updated to ${newStatus}`);
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Bookings</h1>

      <div className="bg-white rounded-lg shadow overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Booking ID</th>
              <th className="px-6 py-3 text-left">Item Type</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Guests</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking: any) => (
              <tr key={booking.id} className="border-t">
                <td className="px-6 py-4 font-mono text-sm">{booking.id.substring(0, 8)}...</td>
                <td className="px-6 py-4 capitalize">{booking.item_type}</td>
                <td className="px-6 py-4">{booking.booking_date}</td>
                <td className="px-6 py-4">{booking.guests}</td>
                <td className="px-6 py-4">${booking.total_amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    className="border px-3 py-1 rounded text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}