import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, User, MapPin, Calendar, Clock, Star } from "lucide-react";
import Navigation from "@/components/Navigation";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIGuide = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Namaste! I\'m your AI guide for exploring Jharkhand. I can help you discover destinations, plan itineraries, learn about local culture, and find authentic experiences. What would you like to explore today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickSuggestions = [
    "Show me waterfalls near Ranchi",
    "Plan a 3-day cultural tour",
    "Best time to visit Hundru Falls",
    "Tribal festivals this month",
    "Budget-friendly accommodations",
    "Local food recommendations"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('waterfall') || input.includes('hundru')) {
      return 'Hundru Falls is absolutely stunning! It\'s about 45km from Ranchi and is 98 meters high. Best time to visit is during monsoon (July-October) when the water flow is maximum. The trek is moderate difficulty. Would you like me to suggest nearby attractions or help you plan the route?';
    } else if (input.includes('cultural') || input.includes('tribe')) {
      return 'For a cultural experience, I recommend visiting Santhal villages near Dumka, the Tribal Research Institute in Ranchi, and attending a local Sarhul festival. You can also explore Sohrai paintings in Hazaribagh. Shall I create a detailed 3-day cultural itinerary for you?';
    } else if (input.includes('food') || input.includes('eat')) {
      return 'You must try authentic Jharkhand cuisine! Don\'t miss Dhuska (rice pancakes), Chilka Roti, Bamboo shoots curry, and Mahua flowers. For sweets, try Anarsa and Thekua. I can recommend restaurants serving traditional food or connect you with homestays for authentic cooking experiences.';
    } else if (input.includes('budget') || input.includes('cheap')) {
      return 'Jharkhand offers great budget travel options! Homestays cost ₹800-1500/night, local transport is very affordable, and street food is delicious and cheap. I can suggest a complete budget itinerary with costs breakdown. What\'s your preferred budget range?';
    } else {
      return 'That\'s a great question! Based on your interest, I\'d recommend exploring our diverse destinations. Jharkhand has amazing waterfalls, rich tribal culture, and beautiful forests. Would you like specific recommendations based on your preferences for adventure, culture, or nature?';
    }
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              <span className="hero-text">AI Travel Guide</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get personalized recommendations, instant answers, and expert guidance for your Jharkhand adventure
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Jharkhand AI Guide</CardTitle>
                      <CardDescription>Your personal travel assistant</CardDescription>
                    </div>
                    <Badge variant="secondary" className="ml-auto">
                      Online
                    </Badge>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'ai' && (
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {message.type === 'user' && (
                        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="w-4 h-4 text-secondary-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>

                {/* Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask me anything about Jharkhand..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Ask</CardTitle>
                  <CardDescription>Popular questions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left h-auto p-2 whitespace-normal"
                      onClick={() => handleQuickSuggestion(suggestion)}
                    >
                      <MessageCircle className="w-3 h-3 mr-2 flex-shrink-0" />
                      {suggestion}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* AI Capabilities */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">I can help with</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm">Destination recommendations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm">Itinerary planning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm">Best time to visit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" />
                    <span className="text-sm">Local experiences</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGuide;