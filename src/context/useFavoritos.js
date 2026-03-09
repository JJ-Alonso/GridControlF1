import { useContext } from "react"
import { FavoritosContext } from "./favoritos-context"

export function useFavoritos() {
  const context = useContext(FavoritosContext)

  if (!context) {
    throw new Error("useFavoritos debe usarse dentro de FavoritosProvider")
  }

  return context
}
