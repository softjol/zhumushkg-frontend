import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { jwtDecode } from 'jwt-decode'
import { User } from './types'
import { getProfile } from '@/entities/auth/api'

type TokenPayload = {
  phoneNumber: string
  id: number
  role: string
  phoneConfirmed: boolean
  firstName: string
  iat: number
  exp: number
}

function isTokenExpired(token: string): boolean {
  try {
    const { exp } = jwtDecode<TokenPayload>(token)
    return Date.now() >= exp * 1000
  } catch {
    return true
  }
}

interface UserStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  token: string | null
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setIsAuthenticated: (value: boolean) => void
  setIsLoading: (value: boolean) => void
  fetchProfile: () => Promise<void>
  logout: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      token: null,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setToken: (token) => {
        if (!token) {
          set({ token: null, user: null, isAuthenticated: false })
          return
        }
        const decoded = jwtDecode<TokenPayload>(token)
        const user: User = {
          id: String(decoded.id),
          firstName: decoded.firstName,
          lastName: '',
          email: '',
          phone: decoded.phoneNumber,
          role: decoded.role as User['role'],
          createdAt: '',
          updatedAt: '',
        }
        set({ token, user, isAuthenticated: true })
      },

      fetchProfile: async () => {
        const { token, user } = get()
        if (!token || !user) return
        try {
          const data = await getProfile(Number(user.id), token)
          set({
            user: {
              ...user,
              firstName: data.firstName,
              phone: data.phoneNumber,
              role: data.role.role.toLowerCase() as User['role'],
            },
          })
        } catch {
          get().logout()
        }
      },

      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setIsLoading: (isLoading) => set({ isLoading }),

      logout: () => set({ user: null, isAuthenticated: false, token: null }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return
        if (state.token && isTokenExpired(state.token)) {
          state.logout()
        } else if (state.token) {
          state.fetchProfile()
        }
      },
    },
  ),
)
