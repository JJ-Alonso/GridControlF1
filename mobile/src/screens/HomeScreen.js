import { StyleSheet, Text, View } from "react-native"
import { theme } from "../utils/theme"

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GridControl F1 Mobile</Text>
      <Text style={styles.subtitle}>
        App React Native conectada a la misma API del proyecto web.
      </Text>
      <Text style={styles.card}>1. Login por rol usuario/admin</Text>
      <Text style={styles.card}>2. Catalogo de coches + detalle + favoritos</Text>
      <Text style={styles.card}>3. Panel admin con CRUD (GET/POST/PUT/PATCH/DELETE)</Text>
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
    fontSize: 30,
    fontWeight: "800",
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 14,
    marginBottom: 8,
  },
  card: {
    backgroundColor: theme.colors.card,
    color: theme.colors.text,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
})
