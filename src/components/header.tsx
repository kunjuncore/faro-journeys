import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Faro Holidays
        </Link>
        <nav className="flex gap-8">
          <Link to="/explore" className="hover:text-blue-600">Explore</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          <Link to="/admin/dashboard" className="text-gray-400 text-sm">Admin</Link>
        </nav>
      </div>
    </header>
  );
}