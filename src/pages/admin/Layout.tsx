import { Link, Outlet } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import AdminGuard from "@/components/AdminGuard";

export default function AdminLayout() {
  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  return (
    <AdminGuard>
      <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Faro Admin</h2>
        </div>
        <nav className="mt-6">
          <Link to="/admin/dashboard" className="block px-6 py-3 hover:bg-gray-800">
            📊 Dashboard
          </Link>
          <Link to="/admin/destinations" className="block px-6 py-3 hover:bg-gray-800">
            🌍 Destinations
          </Link>
          <Link to="/admin/hotels" className="block px-6 py-3 hover:bg-gray-800">
            🏨 Hotels
          </Link>
          <Link to="/admin/activities" className="block px-6 py-3 hover:bg-gray-800">
            🎯 Activities
          </Link>
          <Link to="/admin/bookings" className="block px-6 py-3 hover:bg-gray-800">
            📅 Bookings
          </Link>
          <Link to="/admin/leads" className="block px-6 py-3 hover:bg-gray-800">
            📧 Leads
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
      </div>
    </AdminGuard>
  );
}