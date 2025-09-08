import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Settings, BookOpen, LogOut, Heart } from "lucide-react";
import { useAuth, useUserProfile, useSignOut } from "@/hooks/useAuth";
import { AuthModal } from "./AuthModal";

export const UserMenu = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');
  
  const { data: session } = useAuth();
  const { data: profile } = useUserProfile();
  const signOut = useSignOut();

  if (!session) {
    return (
      <>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setAuthTab('signin');
              setShowAuthModal(true);
            }}
          >
            Sign In
          </Button>
          <Button
            onClick={() => {
              setAuthTab('signup');
              setShowAuthModal(true);
            }}
          >
            Sign Up
          </Button>
        </div>
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultTab={authTab}
        />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {profile?.name?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{profile?.name || 'User'}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BookOpen className="mr-2 h-4 w-4" />
          <span>My Bookings</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Heart className="mr-2 h-4 w-4" />
          <span>Favorites</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => signOut.mutate()}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};