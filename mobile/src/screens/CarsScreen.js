import { useEffect, useMemo, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { useFavoritos } from "../context/FavoritosContext"
import { useAuth } from "../context/AuthContext"
import { CocheCard } from "../components/CocheCard"
import { carsService } from "../services/carsService"
import { api } from "../services/api"
import { theme } from "../utils/theme"

export function CarsScreen({ navigation }) {
  const { favoritos, toggleFavorito } = useFavoritos()
  const { isAuthenticated } = useAuth()
  const [cars, setCars] = useState([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadCars() {
      try {
        setLoading(true)
        const data = await carsService.getAll()
        setCars(data)
      } catch {
        setError("No se pudieron cargar los coches")
      } finally {
        setLoading(false)
      }
    }

    loadCars()
  }, [])

  const filteredCars = useMemo(() => {
    const term = query.toLowerCase().trim()
    if (!term) return cars
    return cars.filter(
      (car) =>
        car.nombre.toLowerCase().includes(term) ||
        car.escuderia.toLowerCase().includes(term)
    )
  }, [cars, query])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coches F1</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar coche o escuderia"
        placeholderTextColor={theme.colors.textMuted}
        style={styles.input}
      />

      {loading ? <ActivityIndicator color={theme.colors.primary} /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={filteredCars}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CocheCard
            coche={item}
            apiBaseUrl={api.baseUrl}
            isFavorito={favoritos.includes(item.id)}
            onToggleFavorito={() => {
              if (!isAuthenticated) {
                navigation.navigate("Login")
                return
              }
              toggleFavorito(item.id)
            }}
            onPress={() => navigation.navigate("CocheDetalle", { id: item.id })}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    padding: 16,
    gap: 10,
  },
  title: {
    color: theme.colors.primary,
    fontSize: 28,
    fontWeight: "800",
  },
  input: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: 10,
    color: theme.colors.text,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  error: {
    color: "#f87171",
  },
})
