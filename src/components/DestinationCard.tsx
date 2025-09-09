import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Star } from "lucide-react";

interface DestinationCardProps {
  destination: any;
  distance?: number | null;
}

const DestinationCard = ({ destination, distance }: DestinationCardProps) => {
  return (
    <div className="group relative bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={destination.images?.[0] || '/lovable-uploads/3a818645-a0d1-4c82-b8a7-75a7bfc38d78.png'}
          alt={`Beautiful view of ${destination.name} in Jharkhand`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
          {destination.category}
        </Badge>
        
        {/* Rating */}
        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-white text-sm font-medium">{destination.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-playfair font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
          {destination.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {destination.description}
        </p>

        {distance && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <MapPin className="w-3 h-3" />
            <span>{distance} km from your location</span>
          </div>
        )}

        {/* Details */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{destination.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{destination.difficulty_level}</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3">
          <Button variant="forest" size="sm" className="flex-1">
            Explore Now
          </Button>
          <Button variant="outline" size="sm">
            Add to Plan
          </Button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

export default DestinationCard;