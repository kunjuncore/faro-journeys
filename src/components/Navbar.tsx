import { Link } from "react-router-dom";
import { Plane, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="group">
    <div>
        <img 
            src="assets/img/favicon.ico" 
            alt="FaroHolidays" 
            className="w-12 h-12"
        />
        {/* Note: If you want to change the color of the image, the image needs to be an SVG. */}
    </div>
</div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Faro Holidays
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/destinations" className="text-foreground hover:text-primary transition-colors font-medium">
              Destinations
            </Link>
            <Link to="/hotels" className="text-foreground hover:text-primary transition-colors font-medium">
              Hotels
            </Link>
            <Link to="/activities" className="text-foreground hover:text-primary transition-colors font-medium">
              Experiences
            </Link>
            <Link to="/themes" className="text-foreground hover:text-primary transition-colors font-medium">
              Travel Themes
            </Link>
            {/* <Link to="/reviews" className="text-foreground hover:text-primary transition-colors font-medium">
              Reviews
            </Link> */}
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 animate-fade-in">
            <Link
              to="/destinations"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Destinations
            </Link>
            <Link
              to="/hotels"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hotels
            </Link>
            <Link
              to="/activities"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Activities
            </Link>
            <Link
              to="/themes"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Travel Themes
            </Link>
            <Link
              to="/reviews"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reviews
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
