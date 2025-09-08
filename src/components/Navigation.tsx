import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Menu, X, Globe, MessageCircle, Search } from "lucide-react";
import { UserMenu } from "./UserMenu";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <MapPin className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-playfair font-bold text-foreground">
                Discover Jharkhand
              </h1>
              <p className="text-sm text-muted-foreground">Eco & Cultural Tourism</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#destinations" className="text-foreground hover:text-primary transition-colors">
              Destinations
            </a>
            <a href="#experiences" className="text-foreground hover:text-primary transition-colors">
              Experiences
            </a>
            <a href="#culture" className="text-foreground hover:text-primary transition-colors">
              Culture
            </a>
            <a href="#marketplace" className="text-foreground hover:text-primary transition-colors">
              Marketplace
            </a>
            <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
              <Globe className="w-4 h-4 mr-2" />
              EN
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              AI Guide
            </Button>
            <UserMenu />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card/95 backdrop-blur-lg rounded-lg mt-2">
              <a
                href="#destinations"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
              >
                Destinations
              </a>
              <a
                href="#experiences"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
              >
                Experiences
              </a>
              <a
                href="#culture"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
              >
                Culture
              </a>
              <a
                href="#marketplace"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
              >
                Marketplace
              </a>
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  AI Guide
                </Button>
                <Button className="w-full bg-primary hover:bg-primary-glow text-primary-foreground">
                  Plan Your Trip
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;