import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { destinationsService } from '@/services/database'
import { useToast } from '@/hooks/use-toast'

export const useDestinations = () => {
  return useQuery({
    queryKey: ['destinations'],
    queryFn: destinationsService.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useDestinationsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['destinations', 'category', category],
    queryFn: () => destinationsService.getByCategory(category),
    enabled: !!category,
  })
}

export const useNearbyDestinations = (latitude?: number, longitude?: number, radius?: number) => {
  return useQuery({
    queryKey: ['destinations', 'nearby', latitude, longitude, radius],
    queryFn: () => destinationsService.getNearby(latitude!, longitude!, radius),
    enabled: !!latitude && !!longitude,
  })
}

export const useSearchDestinations = (query: string) => {
  return useQuery({
    queryKey: ['destinations', 'search', query],
    queryFn: () => destinationsService.search(query),
    enabled: query.length > 2,
  })
}