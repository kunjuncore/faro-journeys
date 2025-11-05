import { useEffect, useState } from "react";
import { createActivityInSupabase, getActivitiesFromSupabase, updateActivityInSupabase, deleteActivityFromSupabase, getDestinationsFromSupabase } from "@/lib/supabaseOperations";

export default function AdminActivities() {
  const [activities, setActivities] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    destination_id: "",
    category: "",
    description: "",
    price: 0,
    duration: ""
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    destination_id: "",
    category: "",
    description: "",
    price: 0,
    duration: ""
  });

  useEffect(() => {
    loadActivities();
    loadDestinations();
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
      const created = await createActivityInSupabase(formData);
      setActivities([...(activities as any), created]);
      setShowForm(false);
      setFormData({ name: "", destination_id: "", category: "", description: "", price: 0, duration: "" });
      alert("Activity created successfully!");
    } catch (error: any) {
      console.error('Error creating activity:', error);
      alert('Failed to create activity: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this activity?")) return;
    try {
      setLoading(true);
      await deleteActivityFromSupabase(id);
      setActivities((activities as any).filter((a: any) => a.id !== id));
      alert("Activity deleted!");
    } catch (error: any) {
      console.error('Error deleting activity:', error);
      alert('Failed to delete activity: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  function startEdit(activity: any) {
    setEditingId(activity.id);
    setEditFormData({
      name: activity.name || "",
      destination_id: activity.destination_id || "",
      category: activity.category || "",
      description: activity.description || "",
      price: activity.price || 0,
      duration: activity.duration || ""
    });
  }

  async function saveEdit(id: string) {
    if (!editFormData.name || !editFormData.destination_id) {
      alert('Name and destination are required!');
      return;
    }
    try {
      setLoading(true);
      const updated = await updateActivityInSupabase(id, editFormData);
      setActivities((prev: any) => prev.map((a: any) => a.id === id ? updated : a));
      setEditingId(null);
      alert("Activity updated!");
    } catch (error: any) {
      console.error('Error updating activity:', error);
      alert('Failed to update activity: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Activities</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "Add New Activity"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-bold mb-4">Create New Activity</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Activity Name"
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
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="border px-4 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Duration (e.g., 2 hours)"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              className="border px-4 py-2 rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price || ''}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
              className="border px-4 py-2 rounded"
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="border px-4 py-2 rounded col-span-2"
              rows={3}
            />

          </div>
          <button
            onClick={handleCreate}
            disabled={loading}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Create Activity
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Destination</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Duration</th>

              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity: any) => {
              const destination = destinations.find((d: any) => d.id === activity.destination_id);
              return (
                <tr key={activity.id} className="border-t">
                  <td className="px-6 py-4">
                    {editingId === activity.id ? (
                      <input
                        type="text"
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      activity.name
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === activity.id ? (
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
                    {editingId === activity.id ? (
                      <input
                        type="text"
                        value={editFormData.category}
                        onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      activity.category
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === activity.id ? (
                      <input
                        type="number"
                        value={editFormData.price}
                        onChange={(e) => setEditFormData({ ...editFormData, price: parseFloat(e.target.value) || 0 })}
                        className="border px-2 py-1 rounded w-24"
                      />
                    ) : (
                      `$${activity.price}`
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === activity.id ? (
                      <input
                        type="text"
                        value={editFormData.duration}
                        onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      activity.duration
                    )}
                  </td>

                  <td className="px-6 py-4 flex gap-3">
                    {editingId === activity.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(activity.id)}
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
                          onClick={() => startEdit(activity)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(activity.id)}
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