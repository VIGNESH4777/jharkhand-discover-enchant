import { useState, useEffect } from "react";
import { useDestinations } from "@/hooks/useDestinations";
import DestinationCard from "@/components/DestinationCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";

const Destinations = () => {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: destinations, isLoading } = useDestinations();

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const calculateDistance = (destLat: number, destLng: number) => {
    if (!location) return null;
    
    const R = 6371; // Earth's radius in km
    const dLat = (destLat - location.lat) * Math.PI / 180;
    const dLng = (destLng - location.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(location.lat * Math.PI / 180) * Math.cos(destLat * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return Math.round(distance);
  };

  const filteredDestinations = destinations?.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
              <span className="hero-text">Discover Destinations</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore Jharkhand's breathtaking landscapes, from pristine waterfalls to ancient forests
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="natural">Natural</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="religious">Religious</SelectItem>
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="wildlife">Wildlife</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location Status */}
          {location && (
            <div className="mb-6 p-4 bg-primary/10 rounded-lg flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">
                Showing distances from your current location
              </span>
            </div>
          )}

          {/* Destinations Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg h-64 mb-4"></div>
                  <div className="bg-muted rounded h-4 mb-2"></div>
                  <div className="bg-muted rounded h-4 w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((destination) => {
                const distance = calculateDistance(destination.latitude, destination.longitude);
                return (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    distance={distance}
                  />
                );
              })}
            </div>
          )}

          {filteredDestinations.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-playfair font-bold mb-4">No destinations found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or explore all destinations
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Destinations;