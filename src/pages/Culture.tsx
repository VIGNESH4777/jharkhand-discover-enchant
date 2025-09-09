import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Music, Palette, Camera } from "lucide-react";
import Navigation from "@/components/Navigation";

const Culture = () => {
  const [selectedTab, setSelectedTab] = useState("festivals");

  const festivals = [
    {
      id: 1,
      title: "Sarhul Festival",
      description: "The most important festival of Jharkhand, celebrating the spring season and Sal trees",
      date: "March 15-17, 2025",
      location: "Various tribal villages",
      category: "Traditional",
      image: "/lovable-uploads/3a818645-a0d1-4c82-b8a7-75a7bfc38d78.png",
      highlights: ["Sacred grove worship", "Traditional dance", "Folk music", "Community feast"]
    },
    {
      id: 2,
      title: "Karma Festival",
      description: "Harvest festival celebrating prosperity and good fortune",
      date: "September 20-22, 2025",
      location: "Ranchi, Chaibasa",
      category: "Harvest",
      image: "/lovable-uploads/3a818645-a0d1-4c82-b8a7-75a7bfc38d78.png",
      highlights: ["Karma dance", "Traditional songs", "Cultural performances", "Local delicacies"]
    },
    {
      id: 3,
      title: "Tusu Parab",
      description: "Winter harvest festival with beautiful folk songs and dances",
      date: "December 28-31, 2024",
      location: "Jamshedpur, Dhanbad",
      category: "Cultural",
      image: "/lovable-uploads/3a818645-a0d1-4c82-b8a7-75a7bfc38d78.png",
      highlights: ["Tusu idols", "Folk songs", "Traditional crafts", "Cultural competition"]
    }
  ];

  const artForms = [
    {
      id: 1,
      title: "Sohrai Painting",
      description: "Traditional wall art painted during harvest festivals with natural pigments",
      origin: "Hazaribagh district",
      materials: "Natural ochre, charcoal, clay",
      image: "/lovable-uploads/3a818645-a0d1-4c82-b8a7-75a7bfc38d78.png",
      workshops: "Available year-round"
    },
    {
      id: 2,
      title: "Paitkar Paintings",
      description: "Narrative scroll paintings depicting local myths and legends",
      origin: "Santhal Parganas",
      materials: "Handmade paper, natural colors",
      image: "/lovable-uploads/3a818645-a0d1-4c82-b8a7-75a7bfc38d78.png",
      workshops: "Monthly workshops"
    },
    {
      id: 3,
      title: "Dokra Metal Craft",
      description: "Ancient lost-wax casting technique creating beautiful bronze artifacts",
      origin: "Khunti, Ranchi",
      materials: "Bronze, beeswax, clay",
      image: "/lovable-uploads/3a818645-a0d1-4c82-b8a7-75a7bfc38d78.png",
      workshops: "Weekend sessions"
    }
  ];

  const tribes = [
    {
      id: 1,
      name: "Santhal",
      population: "2.7 million",
      language: "Santhali",
      location: "Santhal Parganas, Godda",
      culture: "Agriculture-based society with rich oral traditions and distinctive dance forms",
      specialties: ["Baha dance", "Traditional medicine", "Bamboo crafts"]
    },
    {
      id: 2,
      name: "Oraon",
      population: "1.8 million",
      language: "Kurukh",
      location: "Ranchi, Gumla, Simdega",
      culture: "Known for their vibrant festivals and agricultural practices",
      specialties: ["Karma dance", "Traditional songs", "Organic farming"]
    },
    {
      id: 3,
      name: "Munda",
      population: "1.2 million",
      language: "Mundari",
      location: "Ranchi, Khunti, West Singhbhum",
      culture: "Forest-dwelling community with strong environmental conservation practices",
      specialties: ["Forest conservation", "Herbal medicine", "Traditional governance"]
    }
  ];

  const tabs = [
    { id: "festivals", label: "Festivals & Events", icon: Calendar },
    { id: "arts", label: "Traditional Arts", icon: Palette },
    { id: "tribes", label: "Tribal Heritage", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
              <span className="hero-text">Rich Cultural Heritage</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the vibrant traditions, ancient art forms, and diverse tribal communities of Jharkhand
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-muted rounded-lg p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all ${
                      selectedTab === tab.id
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          {selectedTab === "festivals" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {festivals.map((festival) => (
                <Card key={festival.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={festival.image}
                      alt={festival.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-tribal/90 text-tribal-foreground">
                      {festival.category}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl font-playfair">{festival.title}</CardTitle>
                    <CardDescription>{festival.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {festival.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {festival.location}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {festival.highlights.map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full mt-4 bg-tribal hover:bg-tribal/90">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedTab === "arts" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artForms.map((art) => (
                <Card key={art.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl font-playfair">{art.title}</CardTitle>
                    <CardDescription>{art.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Origin:</span>
                        <span className="font-medium">{art.origin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Materials:</span>
                        <span className="font-medium">{art.materials}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Workshops:</span>
                        <span className="font-medium text-primary">{art.workshops}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1 bg-primary hover:bg-primary-glow">
                        <Camera className="w-4 h-4 mr-2" />
                        Gallery
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Palette className="w-4 h-4 mr-2" />
                        Workshop
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedTab === "tribes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tribes.map((tribe) => (
                <Card key={tribe.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-2xl font-playfair">{tribe.name} Tribe</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {tribe.population}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {tribe.language}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Primary Regions</h4>
                      <p className="text-sm text-muted-foreground">{tribe.location}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Culture & Traditions</h4>
                      <p className="text-sm text-muted-foreground">{tribe.culture}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {tribe.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full mt-4 bg-secondary hover:bg-secondary/90">
                      <Music className="w-4 h-4 mr-2" />
                      Explore Culture
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Culture;