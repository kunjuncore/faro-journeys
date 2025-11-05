import { useEffect, useState } from "react";
import { createHotelInSupabase, getHotelsFromSupabase, updateHotelInSupabase, deleteHotelFromSupabase, getDestinationsFromSupabase } from "@/lib/supabaseOperations";

export default function AdminHotels() {
  const [hotels, setHotels] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    destination_id: "",
    description: "",
    price: 0,
    image_url: "",
    rating: 5,
    featured: false
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    destination_id: "",
    description: "",
    price: 0,
    image_url: "",
    rating: 5,
    featured: false
  });

  useEffect(() => {
    loadHotels();
    loadDestinations();
  }, []);

  async function loadHotels() {
    try {
      setLoading(true);
      const data = await getHotelsFromSupabase();
      setHotels(data || []);
    } catch (error) {
      console.error('Error loading hotels:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadDestinations() {
    try {
      const data = await getDestinationsFromSupabase();
      setDestinations(data || []);
    } catch (error) {
      console.error('Error loading destinations:', error);
    }
  }

  async function handleCreate() {
    if (!formData.name || !formData.destination_id) {
      alert('Name and destination are required!');
      return;
    }
    try {
      setLoading(true);
      const created = await createHotelInSupabase(formData);
      setHotels([...(hotels as any), created]);
      setShowForm(false);
      setFormData({ name: "", destination_id: "", description: "", price: 0, image_url: "", rating: 5, featured: false });
      alert("Hotel created successfully!");
    } catch (error: any) {
      console.error('Error creating hotel:', error);
      alert('Failed to create hotel: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this hotel?")) return;
    try {
      setLoading(true);
      await deleteHotelFromSupabase(id);
      setHotels((hotels as any).filter((h: any) => h.id !== id));
      alert("Hotel deleted!");
    } catch (error: any) {
      console.error('Error deleting hotel:', error);
      alert('Failed to delete hotel: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  function startEdit(hotel: any) {
    setEditingId(hotel.id);
    setEditFormData({
      name: hotel.name || "",
      destination_id: hotel.destination_id || "",
      description: hotel.description || "",
      price: hotel.price || 0,
      image_url: hotel.image_url || "",
      rating: hotel.rating || 5,
      featured: !!hotel.featured
    });
  }

  async function saveEdit(id: string) {
    if (!editFormData.name || !editFormData.destination_id) {
      alert('Name and destination are required!');
      return;
    }
    try {
      setLoading(true);
      const updated = await updateHotelInSupabase(id, editFormData);
      setHotels((prev: any) => prev.map((h: any) => h.id === id ? updated : h));
      setEditingId(null);
      alert("Hotel updated!");
    } catch (error: any) {
      console.error('Error updating hotel:', error);
      alert('Failed to update hotel: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Hotels</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "Add New Hotel"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-bold mb-4">Create New Hotel</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Hotel Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="border px-4 py-2 rounded"
            />
            <select
              value={formData.destination_id}
              onChange={(e) => setFormData({...formData, destination_id: e.target.value})}
              className="border px-4 py-2 rounded"
            >
              <option value="">Select Destination</option>
              {destinations.map((dest: any) => (
                <option key={dest.id} value={dest.id}>{dest.name}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Price per night"
              value={formData.price || ''}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
              className="border px-4 py-2 rounded"
            />
            <input
              type="number"
              placeholder="Rating (1-5)"
              min="1"
              max="5"
              step="0.1"
              value={formData.rating || 5}
              onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value) || 5})}
              className="border px-4 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.image_url}
              onChange={(e) => setFormData({...formData, image_url: e.target.value})}
              className="border px-4 py-2 rounded col-span-2"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="border px-4 py-2 rounded col-span-2"
              rows={3}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
              />
              Featured
            </label>
          </div>
          <button
            onClick={handleCreate}
            disabled={loading}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Create Hotel
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Destination</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Rating</th>
              <th className="px-6 py-3 text-left">Featured</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel: any) => {
              const destination = destinations.find((d: any) => d.id === hotel.destination_id);
              return (
                <tr key={hotel.id} className="border-t">
                  <td className="px-6 py-4">
                    {editingId === hotel.id ? (
                      <input
                        type="text"
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      hotel.name
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === hotel.id ? (
                      <select
                        value={editFormData.destination_id}
                        onChange={(e) => setEditFormData({ ...editFormData, destination_id: e.target.value })}
                        className="border px-2 py-1 rounded w-full"
                      >
                        <option value="">Select Destination</option>
                        {destinations.map((dest: any) => (
                          <option key={dest.id} value={dest.id}>{dest.name}</option>
                        ))}
                      </select>
                    ) : (
                      destination?.name || 'Unknown'
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === hotel.id ? (
                      <input
                        type="number"
                        value={editFormData.price}
                        onChange={(e) => setEditFormData({ ...editFormData, price: parseFloat(e.target.value) || 0 })}
                        className="border px-2 py-1 rounded w-24"
                      />
                    ) : (
                      `$${hotel.price}`
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === hotel.id ? (
                      <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={editFormData.rating}
                        onChange={(e) => setEditFormData({ ...editFormData, rating: parseFloat(e.target.value) || 5 })}
                        className="border px-2 py-1 rounded w-20"
                      />
                    ) : (
                      hotel.rating
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === hotel.id ? (
                      <input
                        type="checkbox"
                        checked={editFormData.featured}
                        onChange={(e) => setEditFormData({ ...editFormData, featured: e.target.checked })}
                      />
                    ) : (
                      hotel.featured ? 'Yes' : 'No'
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    {editingId === hotel.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(hotel.id)}
                          className="text-green-600 hover:text-green-800"
                          disabled={loading}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-gray-600 hover:text-gray-800"
                          disabled={loading}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(hotel)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(hotel.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}