import { createContext, useContext, useEffect, useMemo, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const STORAGE_KEY = "gridcontrol_mobile_user"
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [hydrating, setHydrating] = useState(true)

  useEffect(() => {
    async function hydrate() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY)
        setUser(raw ? JSON.parse(raw) : null)
      } finally {
        setHydrating(false)
      }
    }

    hydrate()
  }, [])

  const value = useMemo(
    () => ({
      user,
      hydrating,
      isAuthenticated: Boolean(user),
      login: async (nextUser) => {
        setUser(nextUser)
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
      },
      logout: async () => {
        setUser(null)
        await AsyncStorage.removeItem(STORAGE_KEY)
      },
    }),
    [user, hydrating]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider")
  }
  return context
}
