import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface ActivityCardProps {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  duration: string;
}

const ActivityCard = ({ id, name, category, image, price, duration }: ActivityCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-hover transition-all duration-300 hover:-translate-y-1 border-border">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-accent-foreground">{category}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-1 text-muted-foreground mb-4">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{duration}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-muted-foreground">From</span>
            <p className="text-2xl font-bold text-primary">
              ${price.toLocaleString()}
            </p>
          </div>
          <Button asChild className="bg-gradient-to-r from-primary to-accent">
            <Link to={`/activity/${id}`}>Explore</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ActivityCard;
