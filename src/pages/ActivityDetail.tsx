import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Users, Calendar, ArrowLeft, CheckCircle } from "lucide-react";
import divingImage from "@/assets/activity-diving.jpg";

const ActivityDetail = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const activity = {
    id: "1",
    name: "Scuba Diving Adventure",
    category: "Water Sports",
    image: divingImage,
    price: 199,
    duration: "4 hours",
    description:
      "Dive into an unforgettable underwater adventure! Explore vibrant coral reefs teeming with tropical fish, encounter fascinating marine life, and discover the breathtaking beauty beneath the waves. Perfect for both beginners and experienced divers.",
    includes: [
      "Professional diving instructor",
      "All diving equipment provided",
      "Underwater photography",
      "Light refreshments",
      "Hotel pickup and drop-off",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20">
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={activity.image}
            alt={activity.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute top-8 left-8 bg-accent/90 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="font-semibold text-accent-foreground">{activity.category}</span>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <Button asChild variant="ghost" className="mb-4 bg-background/80 backdrop-blur-sm">
            <Link to="/activities">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Explore
            </Link>
          </Button>

          <Card className="p-8 border-border">
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
              <div className="flex-1">
                <h1 className="text-5xl font-bold mb-6">{activity.name}</h1>
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>{activity.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-5 h-5 text-primary" />
                    <span>Group activity</span>
                  </div>
                </div>
              </div>

              <div className="bg-secondary rounded-xl p-6 md:min-w-[280px]">
                <div className="text-sm text-muted-foreground mb-2">Price per person</div>
                <div className="text-4xl font-bold text-primary mb-6">
                  ${activity.price.toLocaleString()}
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-accent mb-3" size="lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Users className="w-5 h-5 mr-2" />
                  Group Booking
                </Button>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">About this Activity</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {activity.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ActivityDetail;
