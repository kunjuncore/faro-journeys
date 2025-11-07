import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import LazyImage from "@/components/LazyImage";
import BookingModal from "@/components/BookingModal";

interface DestinationCardProps {
  destination: {
    id: string;
    name: string;
    location: string;
    image_url?: string;
    price: number;
    rating?: number;
  };
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  if (!destination) return null;
  
  return (
    <>
      <Card className="group overflow-hidden hover:shadow-hover transition-all duration-300 hover:-translate-y-1 border-border">
        <div className="relative overflow-hidden aspect-[4/3]">
          <LazyImage
            src={destination.image_url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {destination.name}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground mb-4">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{destination.location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">From</span>
              <p className="text-2xl font-bold text-primary">
                ${destination.price?.toLocaleString() || 0}
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to={`/destination/${destination.id}`}>Details</Link>
              </Button>
              <Button 
                onClick={() => setShowBookingModal(true)}
                className="bg-gradient-to-r from-primary to-accent"
                size="sm"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        item={{
          id: destination.id,
          name: destination.name,
          type: 'destination',
          price: destination.price || 0
        }}
      />
    </>
  );
};

export default DestinationCard;
