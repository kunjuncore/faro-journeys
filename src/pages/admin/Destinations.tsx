import { useEffect, useState } from "react";
import { createDestinationInSupabase, getDestinationsFromSupabase, updateDestinationInSupabase, deleteDestinationFromSupabase } from "@/lib/supabaseOperations";
import RichTextEditor from "@/components/RichTextEditor";
import ImageUploader from "@/components/ImageUploader";
import '@/styles/quill.css';

export default function AdminDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    price: 0,
    category: "",
    image_url: "",
    featured: false
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    location: "",
    description: "",
    price: 0,
    category: "",
    image_url: "",
    featured: false
  });

  useEffect(() => {
    loadDestinations();
  }, []);

  async function loadDestinations() {
    try {
      setLoading(true);
      const data = await getDestinationsFromSupabase({});
      setDestinations(data || []);
    } catch (error) {
      console.error('Error loading destinations:', error);
      alert('Failed to load destinations');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    if (!formData.name || !formData.location) {
      alert('Name and location are required!');
      return;
    }
    try {
      setLoading(true);
      const created = await createDestinationInSupabase(formData);
      setDestinations([...(destinations as any), created]);
      setShowForm(false);
      setFormData({ name: "", location: "", description: "", price: 0, category: "", image_url: "", featured: false });
      alert("Destination created successfully!");
    } catch (error: any) {
      console.error('Error creating destination:', error);
      alert('Failed to create destination: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this destination?")) return;
    try {
      setLoading(true);
      await deleteDestinationFromSupabase(id);
      setDestinations((destinations as any).filter((d: any) => d.id !== id));
      alert("Destination deleted!");
    } catch (error: any) {
      console.error('Error deleting destination:', error);
      alert('Failed to delete destination: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  function startEdit(dest: any) {
    setEditingId(dest.id);
    setEditFormData({
      name: dest.name || "",
      location: dest.location || "",
      description: dest.description || "",
      price: dest.price || 0,
      category: dest.category || "",
      image_url: dest.image_url || "",
      featured: !!dest.featured
    });
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function saveEdit(id: string) {
    if (!editFormData.name || !editFormData.location) {
      alert('Name and location are required!');
      return;
    }
    try {
      setLoading(true);
      const updated = await updateDestinationInSupabase(id, editFormData);
      setDestinations((prev: any) => prev.map((d: any) => d.id === id ? updated : d));
      setEditingId(null);
      alert("Destination updated!");
    } catch (error: any) {
      console.error('Error updating destination:', error);
      alert('Failed to update destination: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Destinations</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "Add New Destination"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-bold mb-4">Create New Destination</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="border px-4 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="border px-4 py-2 rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price || ''}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
              className="border px-4 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="border px-4 py-2 rounded"
            />
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Image</label>
              <ImageUploader
                entity="destinations"
                currentImageUrl={formData.image_url}
                onImageChange={(url) => setFormData({...formData, image_url: url})}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <RichTextEditor
                value={formData.description}
                onChange={(value) => setFormData({...formData, description: value})}
                placeholder="Enter destination description..."
              />
            </div>
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
            Create Destination
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Location</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((dest: any) => (
              <tr key={dest.id} className="border-t">
                <td className="px-6 py-4">
                  {editingId === dest.id ? (
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    dest.name
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === dest.id ? (
                    <input
                      type="text"
                      value={editFormData.location}
                      onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    dest.location
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === dest.id ? (
                    <input
                      type="number"
                      value={editFormData.price || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, price: parseFloat(e.target.value) || 0 })}
                      className="border px-2 py-1 rounded w-24"
                    />
                  ) : (
                    `$${dest.price}`
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === dest.id ? (
                    <input
                      type="text"
                      value={editFormData.category}
                      onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    dest.category
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === dest.id ? (
                    <div className="w-48">
                      <ImageUploader
                        entity="destinations"
                        currentImageUrl={editFormData.image_url}
                        onImageChange={(url) => setEditFormData({ ...editFormData, image_url: url })}
                      />
                    </div>
                  ) : (
                    dest.image_url && (
                      <img src={dest.image_url} alt={dest.name} className="w-16 h-16 object-cover rounded" />
                    )
                  )}
                </td>
                <td className="px-6 py-4 flex gap-3">
                  {editingId === dest.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(dest.id)}
                        className="text-green-600 hover:text-green-800"
                        disabled={loading}
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-gray-600 hover:text-gray-800"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(dest)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(dest.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}