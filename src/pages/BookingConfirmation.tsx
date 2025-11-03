import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Mail, Calendar, MapPin } from "lucide-react";

const BookingConfirmation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <Card className="max-w-2xl mx-auto p-12 text-center border-border">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Booking Confirmed!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for choosing Faro Holidays
          </p>

          <div className="bg-secondary rounded-xl p-6 mb-8 text-left space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Confirmation Email Sent</p>
                <p className="text-sm text-muted-foreground">
                  We've sent your booking details to your email address
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold mb-1">What's Next?</p>
                <p className="text-sm text-muted-foreground">
                  Our team will contact you within 24 hours to finalize details
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Need Help?</p>
                <p className="text-sm text-muted-foreground">
                  Contact us anytime at support@faroholidays.com
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent">
              <Link to="/">Back to Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/explore">Explore More</Link>
            </Button>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;
