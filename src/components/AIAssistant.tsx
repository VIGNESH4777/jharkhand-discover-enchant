import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Globe, 
  MapPin, 
  Calendar,
  X 
} from "lucide-react";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = [
    "English", "Hindi", "Bengali", "Santhali", "Nagpuri", 
    "French", "German", "Japanese", "Spanish"
  ];

  const quickActions = [
    { icon: MapPin, text: "Find nearby attractions", variant: "outline" as const },
    { icon: Calendar, text: "Plan itinerary", variant: "outline" as const },
    { icon: MessageCircle, text: "Cultural insights", variant: "outline" as const },
  ];

  const sampleConversation = [
    {
      type: "bot",
      message: "Namaste! I'm your AI guide for Jharkhand. How can I help you explore our beautiful state today?",
      timestamp: "2 min ago"
    },
    {
      type: "user",
      message: "What are the best waterfalls to visit?",
      timestamp: "1 min ago"
    },
    {
      type: "bot",
      message: "Great choice! Jharkhand has stunning waterfalls. Here are the top ones:\n\n🏞️ **Hundru Falls** - 98m high, 45km from Ranchi\n🏞️ **Jonha Falls** - Perfect for picnics, 40km from Ranchi\n🏞️ **Dassam Falls** - Year-round flow, 40km from Ranchi\n\nWould you like detailed directions to any of these?",
      timestamp: "Just now"
    }
  ];

  return (
    <>
      {/* Floating AI Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-primary hover:bg-primary-glow shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
          size="lg"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      </div>

      {/* AI Assistant Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-card border border-border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-glow rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">AI Tourism Guide</h3>
                <p className="text-xs opacity-90">Multilingual Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-glow"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Language Selector */}
          <div className="p-3 border-b bg-muted/50">
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Language</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {languages.slice(0, 4).map((lang) => (
                <Badge
                  key={lang}
                  variant={selectedLanguage === lang ? "default" : "outline"}
                  className="cursor-pointer text-xs"
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {sampleConversation.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="p-3 border-t bg-muted/30">
            <div className="grid grid-cols-1 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  size="sm"
                  className="justify-start text-xs h-8"
                >
                  <action.icon className="w-3 h-3 mr-2" />
                  {action.text}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about Jharkhand tourism..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsListening(!isListening)}
                className={isListening ? "bg-destructive text-destructive-foreground" : ""}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary-glow">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Powered by AI • Supports 9+ languages
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;