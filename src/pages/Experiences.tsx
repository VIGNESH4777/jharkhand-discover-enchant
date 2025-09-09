import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Star, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";

const Experiences = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const experiences = [
    {
      id: 1,
      title: "Tribal Village Homestay",
      description: "Live with local tribal families and experience authentic Jharkhand culture",
      category: "cultural",
      duration: "2-3 days",
      groupSize: "2-6 people",
      rating: 4.9,
      price: "₹2,500/person",
      image: "/lovable-uploads/3a818645-a0d1-4c82-b8a7-75a7bfc38d78.png",
      highlights: ["Traditional cooking", "Folk dance", "Handicraft making", "Forest walks"]
    },
    {
      id: 2,
      title: "Waterfall Trekking Adventure",
      description: "Trek through pristine forests to hidden waterfalls and natural pools",
      category: "adventure",
      duration: "1 day",
      groupSize: "4-12 people",
      rating: 4.7,
      price: "₹1,800/person",
      image: "/lovable-uploads/3a818645-a0d1-4c82-b8a7-75a7bfc38d78.png",
      highlights: ["Guided trekking", "Swimming", "Photography", "Local lunch"]
    },
    {
      id: 3,
      title: "Wildlife Safari Experience",
      description: "Spot elephants, tigers, and exotic birds in their natural habitat",
      category: "wildlife",
      duration: "Half day",
      groupSize: "2-8 people",
      rating: 4.6,
      price: "₹3,200/person",
      image: "/lovable-uploads/3a818645-a0d1-4c82-b8a7-75a7bfc38d78.png",
      highlights: ["Jeep safari", "Bird watching", "Nature guide", "Equipment provided"]
    },
    {
      id: 4,
      title: "Traditional Craft Workshop",
      description: "Learn traditional Jharkhand arts like Sohrai painting and bamboo crafts",
      category: "cultural",
      duration: "4 hours",
      groupSize: "1-15 people",
      rating: 4.8,
      price: "₹1,200/person",
      image: "/lovable-uploads/3a818645-a0d1-4c82-b8a7-75a7bfc38d78.png",
      highlights: ["Hands-on learning", "Take home crafts", "Local artisans", "Materials included"]
    },
    {
      id: 5,
      title: "Sunrise Hill Station Trek",
      description: "Watch the spectacular sunrise from Jharkhand's highest peaks",
      category: "adventure",
      duration: "8 hours",
      groupSize: "3-10 people",
      rating: 4.9,
      price: "₹2,800/person",
      image: "/lovable-uploads/3a818645-a0d1-4c82-b8a7-75a7bfc38d78.png",
      highlights: ["Early morning trek", "Panoramic views", "Breakfast included", "Professional guide"]
    },
    {
      id: 6,
      title: "Tribal Food Experience",
      description: "Taste authentic tribal cuisine prepared with traditional methods",
      category: "culinary",
      duration: "3 hours",
      groupSize: "2-12 people",
      rating: 4.7,
      price: "₹1,500/person",
      image: "/lovable-uploads/3a818645-a0d1-4c82-b8a7-75a7bfc38d78.png",
      highlights: ["Multi-course meal", "Cooking demonstration", "Local ingredients", "Recipe sharing"]
    }
  ];

  const categories = [
    { value: "all", label: "All Experiences" },
    { value: "cultural", label: "Cultural" },
    { value: "adventure", label: "Adventure" },
    { value: "wildlife", label: "Wildlife" },
    { value: "culinary", label: "Culinary" }
  ];

  const filteredExperiences = selectedCategory === "all" 
    ? experiences 
    : experiences.filter(exp => exp.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
              <span className="hero-text">Unique Experiences</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Immerse yourself in authentic Jharkhand culture through unforgettable experiences
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.value)}
                className="rounded-full"
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Experiences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((experience) => (
              <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground">
                    {experience.category}
                  </Badge>
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl font-playfair">{experience.title}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{experience.rating}</span>
                    </div>
                  </div>
                  <CardDescription>{experience.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {experience.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {experience.groupSize}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {experience.highlights.slice(0, 3).map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between">
                  <div className="text-lg font-bold text-primary">
                    {experience.price}
                  </div>
                  <Button className="bg-primary hover:bg-primary-glow">
                    Book Experience
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experiences;