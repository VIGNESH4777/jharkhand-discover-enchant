import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import InteractiveMap from "@/components/InteractiveMap";
import AIAssistant from "@/components/AIAssistant";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturedDestinations />
      <InteractiveMap />
      <AIAssistant />
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-playfair font-bold mb-4">Discover Jharkhand</h3>
              <p className="text-primary-foreground/80 mb-4 max-w-md">
                Your gateway to Jharkhand's pristine natural beauty, rich tribal culture, 
                and sustainable eco-tourism experiences.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-primary-glow rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">JH</span>
                </div>
                <div>
                  <p className="font-semibold">Government of Jharkhand</p>
                  <p className="text-sm text-primary-foreground/70">Tourism Department</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#destinations" className="hover:text-white transition-colors">Destinations</a></li>
                <li><a href="#experiences" className="hover:text-white transition-colors">Experiences</a></li>
                <li><a href="#culture" className="hover:text-white transition-colors">Culture</a></li>
                <li><a href="#marketplace" className="hover:text-white transition-colors">Marketplace</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Emergency</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Feedback</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-primary-foreground/80">
              © 2025 Jharkhand Tourism. All rights reserved. | Built with ❤️ for sustainable tourism
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
