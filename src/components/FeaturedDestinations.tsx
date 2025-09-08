import DestinationCard from "./DestinationCard";
import { useDestinations } from "@/hooks/useDestinations";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedDestinations = () => {
  const { data: destinations, isLoading } = useDestinations();

  if (isLoading) {
    return (
      <section id="destinations" className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-4">
              Featured Destinations
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore Jharkhand's most captivating natural wonders, from thundering waterfalls 
              to pristine wildlife sanctuaries and mystical hill stations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-96 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const featuredDestinations = destinations?.slice(0, 6) || [];

  return (
    <section id="destinations" className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-4">
            Featured Destinations
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore Jharkhand's most captivating natural wonders, from thundering waterfalls 
            to pristine wildlife sanctuaries and mystical hill stations.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredDestinations.map((destination) => (
            <DestinationCard 
              key={destination.id} 
              name={destination.name}
              image={destination.images[0] || "/src/assets/hero-jharkhand.jpg"}
              description={destination.description}
              distance={`${Math.round(Math.random() * 200) + 45} km from Ranchi`}
              duration="Full day trip"
              category={destination.category}
              rating={destination.rating}
              visitors={`${Math.round(Math.random() * 50 + 10)}k+ visitors`}
              highlights={destination.facilities.slice(0, 3)}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Ready to explore more hidden gems?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary hover:bg-primary-glow text-primary-foreground px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              View All Destinations
            </button>
            <button className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-lg font-medium transition-all duration-300">
              Create Custom Itinerary
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;