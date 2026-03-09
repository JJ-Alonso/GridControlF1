import { createContext, useContext, useEffect, useMemo, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const STORAGE_KEY = "gridcontrol_mobile_favoritos"
const FavoritosContext = createContext(null)

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([])
  const [hydrating, setHydrating] = useState(true)

  useEffect(() => {
    async function hydrate() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY)
        setFavoritos(raw ? JSON.parse(raw) : [])
      } finally {
        setHydrating(false)
      }
    }

    hydrate()
  }, [])

  const value = useMemo(
    () => ({
      favoritos,
      hydrating,
      toggleFavorito: async (id) => {
        const next = favoritos.includes(id)
          ? favoritos.filter((fav) => fav !== id)
          : [...favoritos, id]
        setFavoritos(next)
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      },
      clearFavoritos: async () => {
        setFavoritos([])
        await AsyncStorage.removeItem(STORAGE_KEY)
      },
    }),
    [favoritos, hydrating]
  )

  return (
    <FavoritosContext.Provider value={value}>{children}</FavoritosContext.Provider>
  )
}

export function useFavoritos() {
  const context = useContext(FavoritosContext)
  if (!context) {
    throw new Error("useFavoritos debe usarse dentro de FavoritosProvider")
  }
  return context
}
