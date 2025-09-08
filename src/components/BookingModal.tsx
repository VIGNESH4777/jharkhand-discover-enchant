import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCreateBooking } from "@/hooks/useBookings";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";
import { CalendarIcon, Users, MapPin, Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: {
    id: string;
    name: string;
    location: string;
    entry_fee?: number;
  };
}

export const BookingModal = ({ isOpen, onClose, destination }: BookingModalProps) => {
  const [visitDate, setVisitDate] = useState<Date>();
  const [groupSize, setGroupSize] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');

  const { data: session } = useAuth();
  const createBooking = useCreateBooking();

  const basePrice = destination.entry_fee || 100;
  const totalAmount = basePrice * groupSize;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user || !visitDate) return;

    createBooking.mutate({
      user_id: session.user.id,
      destination_id: destination.id,
      booking_date: new Date().toISOString().split('T')[0],
      visit_date: visitDate.toISOString().split('T')[0],
      group_size: groupSize,
      total_amount: totalAmount,
      status: 'pending',
      special_requests: specialRequests || undefined,
    }, {
      onSuccess: () => {
        onClose();
        setVisitDate(undefined);
        setGroupSize(1);
        setSpecialRequests('');
      }
    });
  };

  if (!session?.user) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground mb-4">
            Please sign in to make a booking for {destination.name}.
          </p>
          <Button onClick={onClose} variant="outline" className="w-full">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Book Your Visit to {destination.name}
          </DialogTitle>
        </DialogHeader>

        <div className="bg-muted/50 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Location:</span>
            <span className="font-medium">{destination.location}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-muted-foreground">Entry Fee:</span>
            <span className="font-medium">₹{basePrice} per person</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Visit Date */}
          <div className="space-y-2">
            <Label>Visit Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !visitDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {visitDate ? format(visitDate, "PPP") : "Select visit date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={visitDate}
                  onSelect={setVisitDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Group Size */}
          <div className="space-y-2">
            <Label htmlFor="groupSize" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Group Size
            </Label>
            <Input
              id="groupSize"
              type="number"
              min="1"
              max="20"
              value={groupSize}
              onChange={(e) => setGroupSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="requests">Special Requests (Optional)</Label>
            <Textarea
              id="requests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Any special requirements, accessibility needs, or preferences..."
              className="w-full"
              rows={3}
            />
          </div>

          {/* Total Amount */}
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium">
                <DollarSign className="w-4 h-4" />
                Total Amount:
              </span>
              <span className="text-xl font-bold text-primary">
                ₹{totalAmount}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {groupSize} person{groupSize > 1 ? 's' : ''} × ₹{basePrice}
            </p>
          </div>

          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={!visitDate || createBooking.isPending}
            >
              {createBooking.isPending ? 'Booking...' : 'Confirm Booking'}
            </Button>
          </div>
        </form>

        <p className="text-xs text-muted-foreground text-center">
          Your booking will be confirmed within 24 hours. Payment can be made on arrival.
        </p>
      </DialogContent>
    </Dialog>
  );
};