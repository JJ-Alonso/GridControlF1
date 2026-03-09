import { useEffect, useMemo, useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { useFavoritos } from "../context/FavoritosContext"
import { useAuth } from "../context/AuthContext"
import { CocheCard } from "../components/CocheCard"
import { carsService } from "../services/carsService"
import { api } from "../services/api"
import { theme } from "../utils/theme"

export function FavoritesScreen({ navigation }) {
  const { isAuthenticated } = useAuth()
  const { favoritos, toggleFavorito } = useFavoritos()
  const [cars, setCars] = useState([])

  useEffect(() => {
    async function loadCars() {
      try {
        const data = await carsService.getAll()
        setCars(data)
      } catch {
        setCars([])
      }
    }

    loadCars()
  }, [])

  const favoriteCars = useMemo(
    () => cars.filter((car) => favoritos.includes(car.id)),
    [cars, favoritos]
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      {!isAuthenticated ? (
        <Text style={styles.empty}>
          Inicia sesion para guardar y ver tus coches favoritos.
        </Text>
      ) : null}
      {isAuthenticated && favoriteCars.length === 0 ? (
        <Text style={styles.empty}>No tienes favoritos todavia.</Text>
      ) : null}
      {isAuthenticated ? (
        <FlatList
          data={favoriteCars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <CocheCard
              coche={item}
              apiBaseUrl={api.baseUrl}
              isFavorito={favoritos.includes(item.id)}
              onToggleFavorito={() => toggleFavorito(item.id)}
              onPress={() => navigation.navigate("CocheDetalle", { id: item.id })}
            />
          )}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    padding: 16,
    gap: 12,
  },
  title: {
    color: theme.colors.primary,
    fontSize: 28,
    fontWeight: "800",
  },
  empty: {
    color: theme.colors.textMuted,
  },
})
