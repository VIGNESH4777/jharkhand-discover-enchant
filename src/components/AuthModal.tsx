import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn, useSignUp } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
}

export const AuthModal = ({ isOpen, onClose, defaultTab = 'signin' }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const signIn = useSignIn();
  const signUp = useSignUp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'signin') {
      signIn.mutate({ 
        email: formData.email, 
        password: formData.password 
      }, {
        onSuccess: () => onClose()
      });
    } else {
      signUp.mutate({ 
        email: formData.email, 
        password: formData.password, 
        name: formData.name 
      }, {
        onSuccess: () => onClose()
      });
    }
  };

  const isLoading = signIn.isPending || signUp.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-playfair">
            {activeTab === 'signin' ? 'Welcome Back' : 'Join Jharkhand Tourism'}
          </DialogTitle>
        </DialogHeader>

        {/* Tab Switcher */}
        <div className="flex rounded-lg bg-muted p-1 mb-6">
          <button
            onClick={() => setActiveTab('signin')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === 'signin'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === 'signup'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full"
              placeholder="Enter your password"
              minLength={6}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          {activeTab === 'signin' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setActiveTab('signup')}
                className="text-primary hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setActiveTab('signin')}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};