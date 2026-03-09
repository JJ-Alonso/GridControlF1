import { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { carsService } from "../services/carsService"
import { api } from "../services/api"
import { theme } from "../utils/theme"

function toImageUrl(path) {
  if (!path) return null
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  if (!path.startsWith("/")) return `${api.baseUrl}/${path}`
  return `${api.baseUrl}${path}`
}

export function CarDetailScreen({ route }) {
  const { id } = route.params
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadCar() {
      try {
        setLoading(true)
        const data = await carsService.getById(id)
        setCar(data)
      } catch {
        setError("No se pudo cargar el detalle")
      } finally {
        setLoading(false)
      }
    }

    loadCar()
  }, [id])

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={theme.colors.primary} />
      </View>
    )
  }

  if (error || !car) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error || "Coche no encontrado"}</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: toImageUrl(car.imagen) }} style={styles.image} />
      <Text style={styles.title}>{car.nombre}</Text>
      <Text style={styles.meta}>{car.escuderia}</Text>
      <Text style={styles.meta}>Temporada {car.año}</Text>
      <Text style={styles.metaMuted}>Pilotos: {car.piloto}</Text>
      <Pressable style={styles.badge}>
        <Text style={styles.badgeText}>{car.tipo?.toUpperCase()}</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    padding: 16,
    gap: 8,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 14,
    backgroundColor: theme.colors.card,
  },
  title: {
    color: theme.colors.primary,
    fontSize: 28,
    fontWeight: "800",
  },
  meta: {
    color: theme.colors.text,
    fontSize: 16,
  },
  metaMuted: {
    color: theme.colors.textMuted,
  },
  badge: {
    marginTop: 8,
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    color: "#111",
    fontWeight: "700",
  },
  centered: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "#f87171",
  },
})
