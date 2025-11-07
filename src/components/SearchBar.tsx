import { Search, MapPin, Calendar, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDestinationsFromSupabase } from "@/lib/supabaseOperations";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");
  const [destinations, setDestinations] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    try {
      const data = await getDestinationsFromSupabase();
      setDestinations(data);
    } catch (error) {
      console.error('Error loading destinations:', error);
    }
  };

  const handleSearch = () => {
    if (selectedDestination) {
      navigate(`/destination/${selectedDestination}`);
    }
  };

  return (
    <div className="bg-background/95 backdrop-blur-md rounded-2xl shadow-hover p-6 border border-border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary cursor-pointer h-12" onClick={() => setShowDropdown(!showDropdown)}>
            <MapPin className="w-5 h-5 text-primary shrink-0" />
            <span className="flex-1 text-left text-black leading-none">
              {selectedDestination ? destinations.find(d => d.id === selectedDestination)?.name : "Select Destination"}
            </span>
            <ChevronDown className="w-4 h-4 text-primary" />
          </div>
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {destinations.map((dest) => (
                <div
                  key={dest.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                  onClick={() => {
                    setSelectedDestination(dest.id);
                    setShowDropdown(false);
                  }}
                >
                  {dest.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary">
          <Calendar className="w-5 h-5 text-primary shrink-0" />
          <Input
            type="date"
            placeholder="dd-mm-yyyy"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
          />
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary">
          <Users className="w-5 h-5 text-primary shrink-0" />
          <Input
            type="number"
            placeholder="Guests"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
          />
        </div>

        <Button
          onClick={handleSearch}
          className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all h-full"
          size="lg"
        >
          <Search className="w-5 h-5 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
