import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { supabase } from "@/lib/supabase";

export default function ExampleDestinationForm() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    price: 0,
    image_url: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location) {
      alert('Name and location are required!');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('destinations')
        .insert([formData])
        .select()
        .single();

      if (error) throw error;
      
      alert('Destination created successfully!');
      setFormData({ name: "", location: "", description: "", price: 0, image_url: "" });
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Destination</h2>
      
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Destination Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />
        
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />
        
        <input
          type="number"
          placeholder="Price"
          value={formData.price || ''}
          onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
          className="w-full border px-4 py-2 rounded-lg"
        />
        
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full border px-4 py-2 rounded-lg h-24"
        />
        
        <div>
          <label className="block text-sm font-medium mb-2">Destination Image</label>
          <ImageUploader
            entity="destinations"
            currentImageUrl={formData.image_url}
            onImageChange={(url) => setFormData({...formData, image_url: url})}
          />
        </div>
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Destination"}
      </button>
    </form>
  );
}