import { useEffect, useState } from "react";
import { getTravelThemesFromSupabase, createTravelThemeInSupabase, updateTravelThemeInSupabase, deleteTravelThemeFromSupabase, getDestinationsFromSupabase, getActivitiesFromSupabase } from "@/lib/supabaseOperations";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/RichTextEditor";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

export default function AdminTravelThemes() {
  const [themes, setThemes] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTheme, setEditingTheme] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image_url: "",
    featured: false,
    selectedDestinations: [],
    selectedActivities: []
  });

  useEffect(() => {
    loadThemes();
    loadDestinations();
    loadActivities();
  }, []);

  async function loadThemes() {
    try {
      const data = await getTravelThemesFromSupabase();
      setThemes(data);
    } catch (error) {
      console.error("Error loading themes:", error);
    } finally {
      setLoading(false);
    }
  }

  async function loadDestinations() {
    try {
      const data = await getDestinationsFromSupabase();
      setDestinations(data || []);
    } catch (error) {
      console.error("Error loading destinations:", error);
    }
  }

  async function loadActivities() {
    try {
      const data = await getActivitiesFromSupabase();
      setActivities(data || []);
    } catch (error) {
      console.error("Error loading activities:", error);
    }
  }

  function handleEdit(theme: any) {
    setEditingTheme(theme);
    setFormData({
      name: theme.name,
      slug: theme.slug || "",
      description: theme.description || "",
      image_url: theme.image_url || "",
      featured: theme.featured || false,
      selectedDestinations: [],
      selectedActivities: []
    });
    setShowForm(true);
  }

  function resetForm() {
    setFormData({
      name: "",
      slug: "",
      description: "",
      image_url: "",
      featured: false,
      selectedDestinations: [],
      selectedActivities: []
    });
    setEditingTheme(null);
    setShowForm(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      // Prepare clean data object
      const themeData = {
        name: formData.name.trim(),
        slug: formData.slug.trim() || formData.name.toLowerCase().replace(/\s+/g, '-'),
        description: formData.description.trim(),
        image_url: formData.image_url.trim(),
        featured: formData.featured
      };

      let result;
      
      if (editingTheme) {
        // Update existing theme
        const { data, error } = await supabase
          .from('travel_themes')
          .update(themeData)
          .eq('id', editingTheme.id)
          .select()
          .single();
        
        if (error) throw error;
        result = data;
      } else {
        // Create new theme
        const { data, error } = await supabase
          .from('travel_themes')
          .insert([themeData])
          .select()
          .single();
        
        if (error) throw error;
        result = data;
      }

      // Handle destination relationships
      if (formData.selectedDestinations?.length > 0) {
        await supabase.from('travel_theme_destinations').delete().eq('travel_theme_id', result.id);
        const destRelationships = formData.selectedDestinations.map(destId => ({
          travel_theme_id: result.id,
          destination_id: destId
        }));
        await supabase.from('travel_theme_destinations').insert(destRelationships);
      }

      // Handle activity relationships
      if (formData.selectedActivities?.length > 0) {
        await supabase.from('travel_theme_activities').delete().eq('travel_theme_id', result.id);
        const activityRelationships = formData.selectedActivities.map(activityId => ({
          travel_theme_id: result.id,
          activity_id: activityId
        }));
        await supabase.from('travel_theme_activities').insert(activityRelationships);
      }

      // Reload themes and reset form
      await loadThemes();
      resetForm();
      
    } catch (error: any) {
      console.error("Error saving theme:", error);
      
      // Handle specific errors
      if (error.code === 'PGRST205') {
        alert('Table not found. Please refresh the page and try again.');
      } else if (error.code === '23505') {
        alert('A theme with this slug already exists.');
      } else {
        alert(`Error: ${error.message || 'Failed to save theme'}`);
      }
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this theme?")) {
      try {
        await deleteTravelThemeFromSupabase(id);
        await loadThemes();
      } catch (error) {
        console.error("Error deleting theme:", error);
      }
    }
  }

  if (loading) return <div className="p-8">Loading themes...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Travel Themes</h1>
        <Button onClick={() => setShowForm(true)}>Add New Theme</Button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingTheme ? "Edit Theme" : "Add New Theme"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Theme Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              placeholder="Slug (URL-friendly name)"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <RichTextEditor
                value={formData.description}
                onChange={(value) => setFormData({ ...formData, description: value })}
                placeholder="Enter theme description..."
              />
            </div>
            <Input
              placeholder="Image URL"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              <label>Featured Theme</label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Select Destinations</label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded p-2">
                {destinations.map((dest: any) => (
                  <div key={dest.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.selectedDestinations.includes(dest.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            selectedDestinations: [...formData.selectedDestinations, dest.id]
                          });
                        } else {
                          setFormData({
                            ...formData,
                            selectedDestinations: formData.selectedDestinations.filter(id => id !== dest.id)
                          });
                        }
                      }}
                    />
                    <label className="text-sm">{dest.name}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Select Activities</label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded p-2">
                {activities.map((activity: any) => (
                  <div key={activity.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.selectedActivities.includes(activity.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            selectedActivities: [...formData.selectedActivities, activity.id]
                          });
                        } else {
                          setFormData({
                            ...formData,
                            selectedActivities: formData.selectedActivities.filter(id => id !== activity.id)
                          });
                        }
                      }}
                    />
                    <label className="text-sm">{activity.name}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button type="submit">
                {editingTheme ? "Update" : "Create"} Theme
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme: any) => (
          <div key={theme.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src={theme.image_url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"}
                alt={theme.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold">{theme.name}</h3>
                {theme.featured && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-4">
                {theme.description?.substring(0, 100)}...
              </p>
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => handleEdit(theme)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(theme.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}