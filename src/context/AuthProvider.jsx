import { useEffect, useMemo, useState } from "react"
import { AuthContext } from "./auth-context"

const STORAGE_KEY = "gridcontrol_user"

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      return
    }

    localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: (nextUser) => setUser(nextUser),
      logout: () => setUser(null),
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
