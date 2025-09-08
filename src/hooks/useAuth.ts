import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { userService } from '@/services/database'
import { useToast } from '@/hooks/use-toast'

export const useAuth = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession()
      return session
    },
  })
}

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null
      return userService.getProfile(user.id)
    },
  })
}

export const useSignIn = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive",
      })
    },
  })
}

export const useSignUp = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async ({ email, password, name }: { email: string; password: string; name: string }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })
      if (error) throw error
      
      // Create user profile
      if (data.user) {
        await userService.createProfile(data.user.id, {
          name,
          email,
          preferences: {
            language: 'en',
            interests: [],
            budget_range: 'medium'
          }
        })
      }
      
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account.",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      })
    },
  })
}

export const useSignOut = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.clear()
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      })
    },
  })
}