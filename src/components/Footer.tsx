import { Link } from "react-router-dom";
import { Plane, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Faro Holidays */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div>
        <img 
            src="assets/img/favicon.ico" 
            alt="Custom Icon" 
            className="w-12 h-12"
        />
      </div>
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Faro Holidays
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your trusted travel companion for discovering amazing destinations and creating unforgettable memories around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/activities" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Activities
                </Link>
              </li>
              <li>
                <Link to="/themes" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Travel Themes
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cancellation" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@faroholidays.com</li>
              <li>+1 (234) 567-890</li>
              <li>123 Travel Street, Suite 100</li>
              <li>New York, NY 10001</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Faro Holidays. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Button size="icon" variant="ghost" className="hover:text-primary">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-primary">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-primary">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="text-center">
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <Link to="/sitemap" className="hover:text-primary transition-colors">
                Sitemap
              </Link>
              <span>|</span>
              <Link to="/accessibility" className="hover:text-primary transition-colors">
                Accessibility
              </Link>
              <span>|</span>
              <Link to="/cookies" className="hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
