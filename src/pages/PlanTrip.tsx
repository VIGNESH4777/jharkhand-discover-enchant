import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPin, Users, Clock, DollarSign, Heart, Camera, Mountain, TreePine } from "lucide-react";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";

const PlanTrip = () => {
  const [formData, setFormData] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
    groupSize: "",
    budget: "",
    interests: [] as string[],
    accommodationType: "",
    transportMode: ""
  });

  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const interests = [
    { id: "nature", label: "Nature & Wildlife", icon: TreePine },
    { id: "culture", label: "Tribal Culture", icon: Heart },
    { id: "adventure", label: "Adventure Sports", icon: Mountain },
    { id: "photography", label: "Photography", icon: Camera },
    { id: "spiritual", label: "Spiritual Sites", icon: Heart },
    { id: "food", label: "Local Cuisine", icon: Heart }
  ];

  const handleInterestChange = (interestId: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interestId]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        interests: prev.interests.filter(id => id !== interestId)
      }));
    }
  };

  const generateItinerary = () => {
    setIsGenerating(true);
    
    // Simulate AI itinerary generation
    setTimeout(() => {
      const sampleItinerary = {
        title: `${formData.groupSize || '2'}-Person Jharkhand Adventure`,
        duration: formData.startDate && formData.endDate 
          ? Math.ceil((formData.endDate.getTime() - formData.startDate.getTime()) / (1000 * 3600 * 24))
          : 3,
        totalBudget: formData.budget === "budget" ? "₹8,000-12,000" : 
                    formData.budget === "mid" ? "₹15,000-25,000" : "₹30,000-50,000",
        days: [
          {
            day: 1,
            title: "Arrival & Ranchi Exploration",
            activities: [
              { time: "10:00 AM", activity: "Arrive in Ranchi, check into accommodation" },
              { time: "2:00 PM", activity: "Visit Jagannath Temple" },
              { time: "4:00 PM", activity: "Explore Rock Garden" },
              { time: "7:00 PM", activity: "Traditional dinner at local restaurant" }
            ],
            accommodation: "Hotel/Homestay in Ranchi",
            meals: "Lunch, Dinner"
          },
          {
            day: 2,
            title: "Hundru Falls Adventure",
            activities: [
              { time: "7:00 AM", activity: "Early breakfast and departure to Hundru Falls" },
              { time: "9:30 AM", activity: "Trek to Hundru Falls viewpoint" },
              { time: "12:00 PM", activity: "Photography and exploration" },
              { time: "2:00 PM", activity: "Lunch at local eatery" },
              { time: "4:00 PM", activity: "Visit nearby tribal village" },
              { time: "7:00 PM", activity: "Return to Ranchi" }
            ],
            accommodation: "Hotel/Homestay in Ranchi",
            meals: "Breakfast, Lunch, Dinner"
          },
          {
            day: 3,
            title: "Cultural Immersion",
            activities: [
              { time: "9:00 AM", activity: "Visit Tribal Research Institute" },
              { time: "11:00 AM", activity: "Sohrai painting workshop" },
              { time: "1:00 PM", activity: "Traditional tribal lunch" },
              { time: "3:00 PM", activity: "Shopping at local markets" },
              { time: "5:00 PM", activity: "Departure preparation" }
            ],
            accommodation: "Check-out",
            meals: "Breakfast, Lunch"
          }
        ]
      };
      
      setGeneratedPlan(sampleItinerary);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
              <span className="hero-text">Plan Your Perfect Trip</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Create a personalized itinerary tailored to your interests, budget, and travel style
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Planning Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair">Trip Details</CardTitle>
                  <CardDescription>Tell us about your ideal Jharkhand experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.startDate ? format(formData.startDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.startDate}
                            onSelect={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.endDate ? format(formData.endDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.endDate}
                            onSelect={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Group Size and Budget */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Group Size</Label>
                      <Input
                        placeholder="Number of travelers"
                        value={formData.groupSize}
                        onChange={(e) => setFormData(prev => ({ ...prev, groupSize: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Budget Range</Label>
                      <Select 
                        value={formData.budget} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                      >
                        <SelectTrigger>
                          <DollarSign className="w-4 h-4 mr-2" />
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budget">Budget (₹5,000-15,000)</SelectItem>
                          <SelectItem value="mid">Mid-range (₹15,000-30,000)</SelectItem>
                          <SelectItem value="luxury">Luxury (₹30,000+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Interests */}
                  <div className="space-y-3">
                    <Label>What interests you? (Select multiple)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {interests.map((interest) => {
                        const Icon = interest.icon;
                        return (
                          <div key={interest.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={interest.id}
                              checked={formData.interests.includes(interest.id)}
                              onCheckedChange={(checked) => 
                                handleInterestChange(interest.id, checked as boolean)
                              }
                            />
                            <label
                              htmlFor={interest.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 cursor-pointer"
                            >
                              <Icon className="w-4 h-4" />
                              {interest.label}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Accommodation and Transport */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Accommodation Type</Label>
                      <Select 
                        value={formData.accommodationType}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, accommodationType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select accommodation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hotel">Hotels</SelectItem>
                          <SelectItem value="homestay">Tribal Homestays</SelectItem>
                          <SelectItem value="resort">Eco Resorts</SelectItem>
                          <SelectItem value="guest_house">Guest Houses</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Transport Mode</Label>
                      <Select 
                        value={formData.transportMode}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, transportMode: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="How will you travel?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="car">Private Car</SelectItem>
                          <SelectItem value="bus">Public Bus</SelectItem>
                          <SelectItem value="train">Train + Local Transport</SelectItem>
                          <SelectItem value="taxi">Taxi/Cab</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={generateItinerary}
                    className="w-full bg-primary hover:bg-primary-glow"
                    disabled={isGenerating || !formData.startDate || !formData.endDate}
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating Your Perfect Itinerary...
                      </>
                    ) : (
                      "Generate Personalized Itinerary"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Generated Itinerary */}
            <div>
              {generatedPlan ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-playfair">{generatedPlan.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="secondary">
                        <Clock className="w-3 h-3 mr-1" />
                        {generatedPlan.duration} days
                      </Badge>
                      <Badge variant="outline">
                        <DollarSign className="w-3 h-3 mr-1" />
                        {generatedPlan.totalBudget}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {generatedPlan.days.map((day: any) => (
                      <div key={day.day} className="border rounded-lg p-4">
                        <h4 className="font-semibold text-primary mb-2">
                          Day {day.day}: {day.title}
                        </h4>
                        <div className="space-y-2 text-sm">
                          {day.activities.slice(0, 3).map((activity: any, index: number) => (
                            <div key={index} className="flex gap-2">
                              <span className="text-muted-foreground font-mono text-xs">
                                {activity.time}
                              </span>
                              <span>{activity.activity}</span>
                            </div>
                          ))}
                          {day.activities.length > 3 && (
                            <p className="text-muted-foreground text-xs">
                              +{day.activities.length - 3} more activities...
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1">
                        Download PDF
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Customize
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-playfair">Your Itinerary</CardTitle>
                    <CardDescription>
                      Fill in your preferences and we'll create a personalized travel plan
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-12">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Your custom itinerary will appear here
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanTrip;