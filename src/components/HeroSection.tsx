import { Button } from "@/components/ui/button";
import { MapPin, Play, ArrowRight, Compass } from "lucide-react";
import heroImage from "@/assets/hero-jharkhand.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Breathtaking view of Jharkhand's natural beauty with Hundru Falls and lush forests"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-playfair font-bold text-white leading-tight">
            Discover the
            <span className="block hero-text bg-gradient-to-r from-yellow-300 via-orange-300 to-white bg-clip-text text-transparent">
              Heart of India
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in Jharkhand's pristine forests, majestic waterfalls, 
            rich tribal culture, and untouched natural wonders. Experience eco-tourism 
            like never before.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button variant="hero" size="lg" className="group">
              <Compass className="w-5 h-5 mr-2" />
              Start Your Journey
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="outline" size="lg" className="glass-effect text-white border-white/30 hover:bg-white/10">
              <Play className="w-5 h-5 mr-2" />
              Watch Experience Video
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            <div className="text-center glass-effect p-6 rounded-xl">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-white/80">Tourist Destinations</div>
            </div>
            <div className="text-center glass-effect p-6 rounded-xl">
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-white/80">Tribal Communities</div>
            </div>
            <div className="text-center glass-effect p-6 rounded-xl">
              <div className="text-3xl font-bold text-white mb-2">100+</div>
              <div className="text-white/80">Eco Experiences</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="floating-element">
          <MapPin className="w-8 h-8 text-white/60" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;