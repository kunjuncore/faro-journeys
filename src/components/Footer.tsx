import { Link } from "react-router-dom";
import { Plane, Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-lg">
                <Plane className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Faro Holidays
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your gateway to unforgettable travel experiences around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Activities
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: info@faroholidays.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Available 24/7</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Subscribe for exclusive travel deals
            </p>
            <div className="flex gap-2">
              <Input placeholder="Your email" type="email" className="text-sm" />
              <Button size="icon" className="bg-gradient-to-r from-primary to-accent shrink-0">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
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
      </div>
    </footer>
  );
};

export default Footer;
