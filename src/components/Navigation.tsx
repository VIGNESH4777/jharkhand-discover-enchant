import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Menu, X, Globe, MessageCircle, Search } from "lucide-react";
import { UserMenu } from "./UserMenu";
import { AuthModal } from "./AuthModal";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const { data: session } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <MapPin className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-playfair font-bold text-foreground">
                Discover Jharkhand
              </h1>
              <p className="text-sm text-muted-foreground">Eco & Cultural Tourism</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/destinations" 
              className={`text-foreground hover:text-primary transition-colors ${
                location.pathname === '/destinations' ? 'text-primary font-medium' : ''
              }`}
            >
              Destinations
            </Link>
            <Link 
              to="/experiences" 
              className={`text-foreground hover:text-primary transition-colors ${
                location.pathname === '/experiences' ? 'text-primary font-medium' : ''
              }`}
            >
              Experiences
            </Link>
            <Link 
              to="/culture" 
              className={`text-foreground hover:text-primary transition-colors ${
                location.pathname === '/culture' ? 'text-primary font-medium' : ''
              }`}
            >
              Culture
            </Link>
            <Link 
              to="/marketplace" 
              className={`text-foreground hover:text-primary transition-colors ${
                location.pathname === '/marketplace' ? 'text-primary font-medium' : ''
              }`}
            >
              Marketplace
            </Link>
            <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
              <Globe className="w-4 h-4 mr-2" />
              EN
            </Button>
            <Link to="/ai-guide">
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                AI Guide
              </Button>
            </Link>
            {session ? (
              <UserMenu />
            ) : (
              <Button onClick={() => setIsAuthModalOpen(true)} size="sm">
                Sign In
              </Button>
            )}
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
              <Link
                to="/destinations"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Destinations
              </Link>
              <Link
                to="/experiences"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Experiences
              </Link>
              <Link
                to="/culture"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Culture
              </Link>
              <Link
                to="/marketplace"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Marketplace
              </Link>
              <div className="px-3 py-2 space-y-2">
                <Link to="/ai-guide" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    AI Guide
                  </Button>
                </Link>
                <Link to="/plan-trip" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary-glow text-primary-foreground">
                    Plan Your Trip
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </nav>
  );
};

export default Navigation;