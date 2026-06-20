"use client"
import { createContext, useContext, useEffect, useState, useCallback, ReactNode, createElement } from 'react'

export interface AuthUser {
  id: string
  email: string
  name: string | null
  avatar: string | null
  credits: number
}

interface AuthState {
  user: AuthUser | null
  unlockedPages: string[]
  loading: boolean
  refresh: () => Promise<void>
  logout: () => void
  isUnlocked: (slug: string) => boolean
}

const AuthContext = createContext<AuthState>({
  user: null, unlockedPages: [], loading: true,
  refresh: async () => {}, logout: () => {}, isUnlocked: () => false,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [unlockedPages, setUnlockedPages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' })
      const data = await res.json()
      setUser(data.user ?? null)
      setUnlockedPages(data.unlockedPages ?? [])
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    document.cookie = 'auth_access_token=; Max-Age=0; path=/'
    setUser(null)
    setUnlockedPages([])
  }, [])

  const isUnlocked = useCallback((slug: string) => {
    return unlockedPages.includes('all') || unlockedPages.includes(slug)
  }, [unlockedPages])

  useEffect(() => { refresh() }, [refresh])

  return createElement(AuthContext.Provider, { value: { user, unlockedPages, loading, refresh, logout, isUnlocked } }, children)
}

export const useAuth = () => useContext(AuthContext)
