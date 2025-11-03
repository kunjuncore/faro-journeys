import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import LazyImage from "@/components/LazyImage";

interface HotelCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  pricePerNight: number;
  rating: number;
}

const HotelCard = ({ id, name, location, image, pricePerNight, rating }: HotelCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-hover transition-all duration-300 hover:-translate-y-1 border-border">
      <div className="relative overflow-hidden aspect-[4/3]">
        <LazyImage
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 fill-accent text-accent" />
          <span className="text-sm font-semibold">{rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-1 text-muted-foreground mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-muted-foreground">Per night</span>
            <p className="text-2xl font-bold text-primary">
              ${pricePerNight.toLocaleString()}
            </p>
          </div>
          <Button asChild className="bg-gradient-to-r from-primary to-accent">
            <Link to={`/hotel/${id}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default HotelCard;
