import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(destination);
    }
  };

  return (
    <div className="bg-background/95 backdrop-blur-md rounded-2xl shadow-hover p-6 border border-border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary">
          <MapPin className="w-5 h-5 text-primary shrink-0" />
          <Input
            placeholder="Where to?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary">
          <Calendar className="w-5 h-5 text-primary shrink-0" />
          <Input
            type="date"
            placeholder="Check in - Check out"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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
            className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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
