import { useEffect, useState } from "react";
import { getLeadsFromSupabase, updateLeadStatusInSupabase } from "@/lib/supabaseOperations";
import { supabase } from "@/lib/supabase";

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    try {
      setLoading(true);
      const data = await getLeadsFromSupabase();
      setLeads(data || []);
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateLeadStatus(id: string, status: string) {
    try {
      await updateLeadStatusInSupabase(id, status);
      setLeads((prev: any) => prev.map((lead: any) => 
        lead.id === id ? { ...lead, status } : lead
      ));
      alert("Lead status updated!");
    } catch (error: any) {
      console.error('Error updating lead:', error);
      alert('Failed to update lead status');
    }
  }

  async function deleteLead(id: string) {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (error) throw error;
      setLeads((prev: any) => prev.filter((lead: any) => lead.id !== id));
      alert('Lead deleted successfully!');
    } catch (error) {
      console.error('Error deleting lead:', error);
      alert('Failed to delete lead');
    }
  }

  const filteredLeads = leads.filter((lead: any) => {
    if (filter === "all") return true;
    return lead.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Leads</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            All ({leads.length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded ${filter === "pending" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Pending ({leads.filter((l: any) => l.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter("contacted")}
            className={`px-4 py-2 rounded ${filter === "contacted" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Contacted ({leads.filter((l: any) => l.status === 'contacted').length})
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Booking Details</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead: any) => (
              <tr key={lead.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-semibold">{lead.name}</div>
                    <div className="text-sm text-gray-600">{lead.email}</div>
                    {lead.phone && <div className="text-sm text-gray-600">{lead.phone}</div>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 max-w-xs">
                    {lead.message}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {lead.status === 'pending' && (
                      <button
                        onClick={() => updateLeadStatus(lead.id, 'contacted')}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Mark Contacted
                      </button>
                    )}
                    {lead.status === 'contacted' && (
                      <>
                        <button
                          onClick={() => updateLeadStatus(lead.id, 'converted')}
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          Convert
                        </button>
                        <button
                          onClick={() => updateLeadStatus(lead.id, 'closed')}
                          className="text-gray-600 hover:text-gray-800 text-sm"
                        >
                          Close
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => deleteLead(lead.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredLeads.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No leads found for the selected filter.
          </div>
        )}
      </div>

      {/* Lead Details Modal could be added here */}
    </div>
  );
}