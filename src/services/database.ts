import { supabase } from '@/lib/supabase'
import type { Destination, User, Booking, Guide, Review, CulturalEvent } from '@/lib/supabase'

// Destinations Services
export const destinationsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .order('rating', { ascending: false })
    
    if (error) throw error
    return data as Destination[]
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('category', category)
      .order('rating', { ascending: false })
    
    if (error) throw error
    return data as Destination[]
  },

  async getNearby(latitude: number, longitude: number, radius: number = 50) {
    // This would use PostGIS functions in a real implementation
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
    
    if (error) throw error
    
    // Simple distance calculation (in km)
    const destinations = (data as Destination[]).map(dest => ({
      ...dest,
      distance: Math.sqrt(
        Math.pow((dest.latitude - latitude) * 111, 2) + 
        Math.pow((dest.longitude - longitude) * 111, 2)
      )
    })).filter(dest => dest.distance <= radius)
    .sort((a, b) => a.distance - b.distance)
    
    return destinations
  },

  async search(query: string) {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${query}%`)
    
    if (error) throw error
    return data as Destination[]
  }
}

// User Services
export const userService = {
  async createProfile(userId: string, userData: Partial<User>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert({
        id: userId,
        ...userData
      })
      .select()
      .single()
    
    if (error) throw error
    return data as User
  },

  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data as User
  },

  async updatePreferences(userId: string, preferences: any) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ preferences })
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data as User
  }
}

// Booking Services
export const bookingService = {
  async create(bookingData: Omit<Booking, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select()
      .single()
    
    if (error) throw error
    return data as Booking
  },

  async getUserBookings(userId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        destinations(name, location, images),
        guides(name, phone)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async updateStatus(bookingId: string, status: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select()
      .single()
    
    if (error) throw error
    return data as Booking
  }
}

// Guide Services
export const guideService = {
  async getAll() {
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .eq('verified', true)
      .order('rating', { ascending: false })
    
    if (error) throw error
    return data as Guide[]
  },

  async getBySpecialization(specialization: string) {
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .contains('specializations', [specialization])
      .eq('verified', true)
    
    if (error) throw error
    return data as Guide[]
  }
}

// Review Services
export const reviewService = {
  async create(reviewData: Omit<Review, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(reviewData)
      .select()
      .single()
    
    if (error) throw error
    return data as Review
  },

  async getForDestination(destinationId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        user_profiles(name)
      `)
      .eq('destination_id', destinationId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}

// Cultural Events Services
export const eventsService = {
  async getUpcoming() {
    const { data, error } = await supabase
      .from('cultural_events')
      .select('*')
      .gte('event_date', new Date().toISOString())
      .order('event_date', { ascending: true })
    
    if (error) throw error
    return data as CulturalEvent[]
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('cultural_events')
      .select('*')
      .eq('category', category)
      .gte('event_date', new Date().toISOString())
    
    if (error) throw error
    return data as CulturalEvent[]
  }
}

// AI Itinerary Services
export const itineraryService = {
  async generateAI(userPreferences: any, destinations: string[], duration: number) {
    // This would call an AI service to generate personalized itineraries
    const itinerary = {
      title: `${duration}-Day Jharkhand Adventure`,
      description: 'AI-generated personalized itinerary based on your preferences',
      duration_days: duration,
      destinations,
      preferences: userPreferences,
      ai_generated: true
    }
    
    const { data, error } = await supabase
      .from('itineraries')
      .insert(itinerary)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserItineraries(userId: string) {
    const { data, error } = await supabase
      .from('itineraries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}