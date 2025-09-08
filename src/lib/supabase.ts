import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database Types
export interface Destination {
  id: string
  name: string
  description: string
  location: string
  latitude: number
  longitude: number
  category: 'natural' | 'cultural' | 'religious' | 'adventure' | 'wildlife'
  images: string[]
  rating: number
  difficulty_level: 'easy' | 'moderate' | 'difficult'
  best_time_to_visit: string
  entry_fee?: number
  facilities: string[]
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  preferences: {
    language: string
    interests: string[]
    budget_range: string
  }
  created_at: string
}

export interface Booking {
  id: string
  user_id: string
  destination_id: string
  guide_id?: string
  booking_date: string
  visit_date: string
  group_size: number
  total_amount: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  special_requests?: string
  created_at: string
}

export interface Guide {
  id: string
  name: string
  email: string
  phone: string
  languages: string[]
  specializations: string[]
  rating: number
  hourly_rate: number
  verified: boolean
  bio: string
  profile_image?: string
  created_at: string
}

export interface Review {
  id: string
  user_id: string
  destination_id: string
  guide_id?: string
  rating: number
  comment: string
  images?: string[]
  created_at: string
}

export interface CulturalEvent {
  id: string
  title: string
  description: string
  location: string
  event_date: string
  category: 'festival' | 'cultural_show' | 'tribal_art' | 'music_dance'
  ticket_price?: number
  contact_info: string
  images: string[]
  created_at: string
}