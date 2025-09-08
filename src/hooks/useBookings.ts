import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bookingService } from '@/services/database'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'

export const useCreateBooking = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: bookingService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      toast({
        title: "Booking Confirmed!",
        description: "Your booking has been successfully created.",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to create booking. Please try again.",
        variant: "destructive",
      })
    },
  })
}

export const useUserBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')
      return bookingService.getUserBookings(user.id)
    },
  })
}

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: ({ bookingId, status }: { bookingId: string; status: string }) =>
      bookingService.updateStatus(bookingId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      toast({
        title: "Booking Updated",
        description: "Booking status has been updated successfully.",
      })
    },
  })
}