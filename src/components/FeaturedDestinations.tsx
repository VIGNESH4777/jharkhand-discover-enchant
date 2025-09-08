import DestinationCard from "./DestinationCard";
import heroImage from "@/assets/hero-jharkhand.jpg";
import netarhatImage from "@/assets/netarhat-hills.jpg";
import betlaImage from "@/assets/betla-national-park.jpg";

const FeaturedDestinations = () => {
  const destinations = [
    {
      name: "Hundru Falls",
      image: heroImage,
      description: "Experience the thunderous cascade of Jharkhand's most spectacular waterfall, plunging 98 meters into pristine pools surrounded by lush forests.",
      distance: "45 km from Ranchi",
      duration: "Half day trip",
      category: "Waterfall",
      rating: 4.8,
      visitors: "50k+ visitors",
      highlights: ["98m high fall", "Photography spot", "Trekking trails"]
    },
    {
      name: "Netarhat Hills",
      image: netarhatImage,
      description: "Known as the 'Queen of Chotanagpur', Netarhat offers breathtaking sunrise views, dense forests, and serene hill station vibes.",
      distance: "156 km from Ranchi",
      duration: "2-3 days",
      category: "Hill Station",
      rating: 4.6,
      visitors: "30k+ visitors",
      highlights: ["Sunrise point", "Dense forests", "Cool climate"]
    },
    {
      name: "Betla National Park",
      image: betlaImage,
      description: "Discover Jharkhand's wildlife sanctuary home to elephants, tigers, leopards, and over 180 bird species in their natural habitat.",
      distance: "170 km from Ranchi",
      duration: "2-3 days",
      category: "Wildlife",
      rating: 4.7,
      visitors: "25k+ visitors",
      highlights: ["Wild elephants", "Safari tours", "Bird watching"]
    }
  ];

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
          {destinations.map((destination, index) => (
            <DestinationCard key={index} {...destination} />
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