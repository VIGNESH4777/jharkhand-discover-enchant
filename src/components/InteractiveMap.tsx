import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Navigation, 
  Layers, 
  Compass, 
  Mountain,
  TreePine,
  Camera,
  Clock
} from "lucide-react";

interface Destination {
  id: string;
  name: string;
  type: "waterfall" | "park" | "temple" | "hill" | "cultural";
  coordinates: [number, number];
  distance: string;
  estimatedTime: string;
  description: string;
}

const InteractiveMap = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapView, setMapView] = useState<"2d" | "3d">("2d");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const destinations: Destination[] = [
    {
      id: "1",
      name: "Hundru Falls",
      type: "waterfall",
      coordinates: [23.4241, 85.5950],
      distance: "45 km",
      estimatedTime: "1h 30m",
      description: "Spectacular 98m high waterfall"
    },
    {
      id: "2", 
      name: "Netarhat Hills",
      type: "hill",
      coordinates: [23.4667, 84.2667],
      distance: "156 km",
      estimatedTime: "4h 20m",
      description: "Queen of Chotanagpur"
    },
    {
      id: "3",
      name: "Betla National Park",
      type: "park",
      coordinates: [23.8833, 84.1833],
      distance: "170 km", 
      estimatedTime: "4h 45m",
      description: "Wildlife sanctuary with elephants and tigers"
    },
    {
      id: "4",
      name: "Baidyanath Dham",
      type: "temple",
      coordinates: [24.4833, 86.7000],
      distance: "250 km",
      estimatedTime: "6h 15m",
      description: "Sacred Jyotirlinga temple"
    }
  ];

  const categories = [
    { id: "all", name: "All Places", icon: MapPin, color: "bg-primary" },
    { id: "waterfall", name: "Waterfalls", icon: Mountain, color: "bg-accent" },
    { id: "park", name: "National Parks", icon: TreePine, color: "bg-primary" },
    { id: "temple", name: "Temples", icon: Compass, color: "bg-tribal" },
    { id: "hill", name: "Hill Stations", icon: Mountain, color: "bg-secondary" }
  ];

  useEffect(() => {
    // Simulate getting user location (Ranchi coordinates as default)
    setUserLocation([23.3441, 85.3096]);
  }, []);

  const filteredDestinations = selectedCategory === "all" 
    ? destinations 
    : destinations.filter(dest => dest.type === selectedCategory);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-4">
            Interactive Tourism Map
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover destinations with real-time GPS tracking and personalized distance calculations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="relative bg-card rounded-2xl shadow-lg overflow-hidden h-96 lg:h-[500px]">
              {/* Map Controls */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <Button
                  variant={mapView === "2d" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMapView("2d")}
                >
                  2D View
                </Button>
                <Button
                  variant={mapView === "3d" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMapView("3d")}
                >
                  3D View
                </Button>
              </div>

              {/* Location Button */}
              <div className="absolute top-4 right-4 z-10">
                <Button variant="outline" size="sm">
                  <Navigation className="w-4 h-4 mr-2" />
                  My Location
                </Button>
              </div>

              {/* Map Placeholder with Interactive Elements */}
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-gradient-to-br from-primary via-secondary to-accent"></div>
                </div>

                {/* User Location Marker */}
                {userLocation && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="w-6 h-6 bg-destructive rounded-full animate-pulse shadow-lg"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        Your Location
                      </div>
                    </div>
                  </div>
                )}

                {/* Destination Markers */}
                {filteredDestinations.map((dest, index) => (
                  <div
                    key={dest.id}
                    className={`absolute ${
                      index === 0 ? "top-1/4 right-1/4" :
                      index === 1 ? "bottom-1/4 left-1/4" :
                      index === 2 ? "top-3/4 right-1/3" :
                      "bottom-1/3 right-1/6"
                    } transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group`}
                  >
                    <div className="relative">
                      <MapPin className="w-8 h-8 text-primary drop-shadow-lg group-hover:scale-125 transition-transform" />
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card shadow-lg rounded-lg p-3 w-48">
                        <h4 className="font-semibold text-sm">{dest.name}</h4>
                        <p className="text-xs text-muted-foreground">{dest.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-primary">{dest.distance}</span>
                          <span className="text-xs text-muted-foreground">{dest.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Route Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <pattern id="routePattern" patternUnits="userSpaceOnUse" width="4" height="4">
                      <circle cx="2" cy="2" r="1" fill="hsl(var(--primary))" opacity="0.6" />
                    </pattern>
                  </defs>
                  {userLocation && filteredDestinations.map((_, index) => (
                    <line
                      key={index}
                      x1="50%"
                      y1="50%"
                      x2={index === 0 ? "75%" : index === 1 ? "25%" : index === 2 ? "66%" : "83%"}
                      y2={index === 0 ? "25%" : index === 1 ? "75%" : index === 2 ? "75%" : "66%"}
                      stroke="url(#routePattern)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category Filters */}
            <div className="bg-card rounded-2xl shadow-lg p-6">
              <h3 className="font-playfair font-semibold text-lg mb-4">Explore Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <category.icon className="w-5 h-5" />
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="secondary" className="ml-auto">
                      {category.id === "all" ? destinations.length : destinations.filter(d => d.type === category.id).length}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            {/* Nearby Destinations */}
            <div className="bg-card rounded-2xl shadow-lg p-6">
              <h3 className="font-playfair font-semibold text-lg mb-4">Nearest Attractions</h3>
              <div className="space-y-3">
                {filteredDestinations.slice(0, 3).map((dest) => (
                  <div key={dest.id} className="flex items-center space-x-3 p-3 hover:bg-muted rounded-xl transition-colors">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{dest.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Navigation className="w-3 h-3" />
                          {dest.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {dest.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Legend */}
            <div className="bg-card rounded-2xl shadow-lg p-6">
              <h3 className="font-playfair font-semibold text-lg mb-4">Map Legend</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-destructive rounded-full"></div>
                  <span>Your Current Location</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Tourist Destinations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-1 bg-primary opacity-60 border-dashed border border-primary"></div>
                  <span>Route Path</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;